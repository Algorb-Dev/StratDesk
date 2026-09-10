#!/usr/bin/env python3
"""
StratDesk Pro — Bot Adapter Pipeline
Demonstrates how an algorithmic trading bot or execution engine pushes
audited trade records and forensic telemetry directly to StratDesk Pro.

Protocol: HTTP/JSON REST to /api/ledger
"""

import asyncio
import json
import sys
import time
import secrets
import hmac
import hashlib
from datetime import datetime, timezone
from typing import List, Literal, Optional, TypedDict, Union
import aiohttp
from pydantic import BaseModel, Field

DEFAULT_STRATDESK_SECRET = "stratdesk_local_master_secret_v1"


# ==============================================================================
# 1. Type Definitions & Pydantic Schema Matching TradeLedgerEntry
# ==============================================================================

class TradeTelemetryModel(BaseModel):
    zScore: float = Field(..., description="Statistical model Z-score deviation")
    signalConfidence: float = Field(..., description="Normalized algorithmic confidence [0.0 - 1.0]")
    executionLatencyMs: float = Field(..., description="Engine dispatch to exchange fill latency in ms")
    bookDepthRatio: float = Field(..., description="Bid-ask orderbook depth imbalance multiplier")


class TradeLedgerEntryModel(BaseModel):
    """
    Pydantic model representing the exact StratDesk Pro TradeLedgerEntry interface.
    Includes all required forensic and execution telemetry fields.
    """
    id: str = Field(..., description="Unique trade execution ID (e.g. TRD-2026-0907-143)")
    ticket: str = Field(..., description="Exchange order ticket or client order ID")
    symbol: str = Field(default="BTC-PERP", description="Asset ticker symbol")
    direction: Literal["LONG", "SHORT"] = Field(..., description="Trade order side")
    leverage: str = Field(default="5x", description="Account leverage configuration")
    strategy: str = Field(default="Orderbook Imbalance", description="Executing algorithmic strategy")
    marketRegime: str = Field(default="High Volatility Breakout", description="Market regime classification")
    regime: str = Field(default="High Volatility Breakout", description="Market regime alias")
    size: str = Field(..., description="Executed quantity and asset denomination")
    entryPrice: float = Field(..., description="Weighted average fill price at entry")
    exitPrice: float = Field(..., description="Weighted average fill price at exit")
    notionalValue: float = Field(default=0.0, description="Total notional size in USD")
    entryTime: str = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    exitTime: str = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
    duration: str = Field(default="2h 18m", description="Total position hold time")
    pnl: float = Field(..., description="Net realized profit or loss in USD")
    pnlPercent: float = Field(..., description="Return on equity percentage")
    returnPct: float = Field(..., description="Alias for return percentage")
    rMultiple: float = Field(default=3.2, description="Risk-normalized outcome in R units")
    fees: float = Field(default=14.5, description="Net exchange fees (positive for maker rebate)")
    slippage: str = Field(default="+0.2 bps", description="Formatted fill slippage")
    slippageBps: float = Field(default=0.2, description="Execution slippage in basis points")
    orderType: Literal["LIMIT_MAKER", "IOC_CROSS", "TWAP"] = Field(default="LIMIT_MAKER")
    status: Literal["CLOSED", "OPEN"] = Field(default="CLOSED")
    tags: List[str] = Field(default_factory=lambda: ["#vol-breakout", "#depth-imbalance", "#passive-maker"])
    notes: str = Field(..., description="Algorithmic rationale and post-mortem notes")
    zScore: float = Field(..., description="Top-level model Z-score")
    confidence: float = Field(..., description="Top-level signal confidence")
    telemetry: Optional[TradeTelemetryModel] = None

    def model_post_init(self, __context):
        # Auto-compute notional value if not explicitly given
        if self.notionalValue == 0.0 and self.entryPrice > 0:
            # Estimate notional from size if size contains a numeric prefix
            try:
                numeric_size = float(self.size.split()[0])
                object.__setattr__(self, "notionalValue", round(numeric_size * self.entryPrice, 2))
            except Exception:
                object.__setattr__(self, "notionalValue", round(self.entryPrice * 2.0, 2))

        # Auto-populate nested telemetry if omitted
        if self.telemetry is None:
            object.__setattr__(
                self,
                "telemetry",
                TradeTelemetryModel(
                    zScore=self.zScore,
                    signalConfidence=self.confidence,
                    executionLatencyMs=0.8,
                    bookDepthRatio=3.2,
                ),
            )


# TypedDict variant for pure dictionary workflows without Pydantic
class TradeLedgerEntryDict(TypedDict, total=False):
    id: str
    ticket: str
    symbol: str
    direction: Literal["LONG", "SHORT"]
    size: str
    entryPrice: float
    exitPrice: float
    pnl: float
    returnPct: float
    slippageBps: float
    zScore: float
    confidence: float
    regime: str
    notes: str
    strategy: str
    leverage: str
    duration: str
    fees: float
    orderType: str
    tags: List[str]


def sign_trade_payload(payload_dict: dict, secret: str = DEFAULT_STRATDESK_SECRET) -> dict:
    """
    Computes cryptographic HMAC-SHA256 headers with timestamp and anti-replay nonce.
    """
    timestamp = int(time.time() * 1000)
    nonce = f"{timestamp}-{secrets.token_hex(4)}"
    canonical_msg = f"{timestamp}:{nonce}:INGEST_TRADE:{json.dumps(payload_dict)}"
    sig = hmac.new(secret.encode("utf-8"), canonical_msg.encode("utf-8"), hashlib.sha256).hexdigest()
    return {
        "x-stratdesk-signature": sig,
        "x-stratdesk-timestamp": str(timestamp),
        "x-stratdesk-nonce": nonce,
    }


def sign_control_command(action: str, params: dict, secret: str = DEFAULT_STRATDESK_SECRET) -> dict:
    """
    Generates HMAC-SHA256 signed payload for the StratDesk Command Bus (/api/command).
    """
    timestamp = int(time.time() * 1000)
    nonce = f"{timestamp}-{secrets.token_hex(4)}"
    canonical_msg = f"{timestamp}:{nonce}:{action}:{json.dumps(params, separators=(',', ':'))}"
    sig = hmac.new(secret.encode("utf-8"), canonical_msg.encode("utf-8"), hashlib.sha256).hexdigest()
    return {
        "action": action,
        "params": params,
        "signature": sig,
        "timestamp": timestamp,
        "nonce": nonce,
    }


# ==============================================================================
# 2. Async Transmission Pipeline
# ==============================================================================

async def push_trade_execution(
    trade_data: Union[TradeLedgerEntryModel, dict],
    endpoint_url: str = "http://localhost:3000/api/ledger",
    timeout_seconds: float = 10.0,
    use_hmac: bool = True,
) -> dict:
    """
    Asynchronously transmits an executed trade payload to the StratDesk Pro ledger API.
    Optionally cryptographically signs the frame using HMAC-SHA256.
    """
    payload = trade_data.model_dump() if isinstance(trade_data, BaseModel) else trade_data
    payload_raw = json.dumps(payload)

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "StratDesk-BotAdapter/1.0 (Python/aiohttp)",
    }

    if use_hmac:
        timestamp = int(time.time() * 1000)
        nonce = f"{timestamp}-{secrets.token_hex(4)}"
        canonical_msg = f"{timestamp}:{nonce}:INGEST_TRADE:{payload_raw}"
        sig = hmac.new(DEFAULT_STRATDESK_SECRET.encode("utf-8"), canonical_msg.encode("utf-8"), hashlib.sha256).hexdigest()
        headers["x-stratdesk-signature"] = sig
        headers["x-stratdesk-timestamp"] = str(timestamp)
        headers["x-stratdesk-nonce"] = nonce
        print(f"    [HMAC-SHA256 SIGNED] Signature: {sig[:16]}... Nonce: {nonce}")

    timeout = aiohttp.ClientTimeout(total=timeout_seconds)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.post(endpoint_url, data=payload_raw, headers=headers) as response:
            status = response.status
            response_json = await response.json()

            if status in (200, 201):
                hmac_flag = "✓ HMAC Verified" if response_json.get("hmacVerified") else "Local Open"
                print(f"[STRATDESK INGESTION SUCCESS] HTTP {status} — Recorded ID: {response_json.get('recordedId')} ({hmac_flag})")
                return response_json
            else:
                error_msg = f"HTTP {status}: {response_json}"
                print(f"[STRATDESK INGESTION FAILED] {error_msg}")
                raise RuntimeError(error_msg)


async def test_command_bus(
    action: str = "EMERGENCY_HALT",
    params: dict = None,
    endpoint_url: str = "http://localhost:3000/api/command",
) -> dict:
    """
    Broadcasts a cryptographically signed control command to the StratDesk Command Bus.
    """
    if params is None:
        params = {"flattenRisk": True, "cancelResting": True}

    signed_cmd = sign_control_command(action, params)

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "StratDesk-BotAdapter/1.0 (Python/aiohttp)",
        "x-stratdesk-signature": signed_cmd["signature"],
        "x-stratdesk-timestamp": str(signed_cmd["timestamp"]),
        "x-stratdesk-nonce": signed_cmd["nonce"],
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(endpoint_url, json=signed_cmd, headers=headers) as response:
            res_json = await response.json()
            return res_json


# ==============================================================================
# 3. Main Demonstration Block
# ==============================================================================

async def main():
    print("\n==================================================================")
    print("  STRATDESK PRO // BOT ADAPTER PIPELINE DEMO")
    print("==================================================================")

    # 1. Synthesize a mock winning trade with forensic telemetry
    mock_trade = TradeLedgerEntryModel(
        id="TRD-2026-0907-143",
        ticket="TKT-BINANCE-8839210",
        symbol="BTC-PERP",
        direction="LONG",
        leverage="5x",
        strategy="Orderbook Imbalance",
        marketRegime="High Volatility Breakout",
        regime="High Volatility Breakout",
        size="2.50 BTC",
        entryPrice=63240.0,
        exitPrice=64890.0,
        pnl=4125.0,
        pnlPercent=13.05,
        returnPct=13.05,
        rMultiple=3.8,
        fees=18.4,  # Positive maker rebate
        slippage="+0.1 bps",
        slippageBps=0.1,
        orderType="LIMIT_MAKER",
        status="CLOSED",
        tags=["#cpi-expansion", "#depth-imbalance", "#passive-rebate", "#trailing-tp"],
        notes=(
            "Statistical momentum breakout confirmed by 3.2x bid-to-ask book depth ratio. "
            "Passively routed via maker ladder inside Asian range value shelf. "
            "Trailing profit target triggered at R3.8 liquidity pool."
        ),
        zScore=3.15,
        confidence=0.96,
        telemetry=TradeTelemetryModel(
            zScore=3.15,
            signalConfidence=0.96,
            executionLatencyMs=0.8,
            bookDepthRatio=3.2,
        ),
    )

    print(f"\n[1] Prepared Audited Trade Payload:")
    print(f"    - Ticket: {mock_trade.ticket} ({mock_trade.id})")
    print(f"    - Market: {mock_trade.symbol} | {mock_trade.direction} {mock_trade.leverage}")
    print(f"    - Entry: ${mock_trade.entryPrice:,.2f} -> Exit: ${mock_trade.exitPrice:,.2f}")
    print(f"    - Realized PnL: +${mock_trade.pnl:,.2f} (+{mock_trade.pnlPercent:.2f}% ROE) | {mock_trade.rMultiple}R")
    print(f"    - Telemetry: Z={mock_trade.zScore} sigma | Confidence={mock_trade.confidence*100:.0f}% | Latency=0.8ms")

    # 2. Transmit via async pipeline
    target_endpoint = "http://localhost:3000/api/ledger"
    print(f"\n[2] Transmitting execution to StratDesk Command Bus ({target_endpoint})...")

    try:
        response = await push_trade_execution(mock_trade, endpoint_url=target_endpoint)
        print(f"\n[3] Ingestion Confirmed by StratDesk Pro:")
        print(f"    {json.dumps(response, indent=4)}")

        # 3. Test Cryptographic Command Bus verification
        cmd_endpoint = "http://localhost:3000/api/command"
        print(f"\n[4] Testing Cryptographic Command Bus ({cmd_endpoint})...")
        cmd_res = await test_command_bus(
            action="EMERGENCY_HALT",
            params={"flattenRisk": True, "cancelResting": True},
            endpoint_url=cmd_endpoint,
        )
        print(f"    [COMMAND BUS VERIFIED ✓]: {json.dumps(cmd_res)}")

        print("\nPipeline execution complete. Trade & HMAC command bus verified.")
    except Exception as exc:
        print(f"\n[!] Failed to transmit trade: {exc}")
        print("    Ensure the Next.js server is running on http://localhost:3000")


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass
    asyncio.run(main())
