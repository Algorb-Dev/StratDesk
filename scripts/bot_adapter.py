#!/usr/bin/env python3
"""
Algorb Control — Bot Adapter Pipeline
Demonstrates how an algorithmic trading bot or execution engine pushes
audited trade records and forensic telemetry directly to Algorb Control.

Protocol: HTTP/JSON REST to /api/ledger
"""

import asyncio
import json
import sys
from datetime import datetime, timezone
from typing import List, Literal, Optional, TypedDict, Union
import aiohttp
from pydantic import BaseModel, Field


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
    Pydantic model representing the exact Algorb Control TradeLedgerEntry interface.
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


# ==============================================================================
# 2. Async Transmission Pipeline
# ==============================================================================

async def push_trade_execution(
    trade_data: Union[TradeLedgerEntryModel, dict],
    endpoint_url: str = "http://localhost:3000/api/ledger",
    timeout_seconds: float = 10.0,
) -> dict:
    """
    Asynchronously transmits an executed trade payload to the Algorb Control ledger API.

    :param trade_data: TradeLedgerEntryModel instance or dictionary conforming to the schema
    :param endpoint_url: Full URL to the Next.js /api/ledger route
    :param timeout_seconds: Network request timeout
    :return: Ingestion response payload dict from Algorb
    """
    payload = trade_data.model_dump() if isinstance(trade_data, BaseModel) else trade_data

    timeout = aiohttp.ClientTimeout(total=timeout_seconds)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        headers = {
            "Content-Type": "application/json",
            "User-Agent": "Algorb-BotAdapter/1.0 (Python/aiohttp)",
        }
        async with session.post(endpoint_url, json=payload, headers=headers) as response:
            status = response.status
            response_json = await response.json()

            if status in (200, 201):
                print(f"[ALGORB INGESTION SUCCESS] HTTP {status} — Recorded ID: {response_json.get('recordedId')}")
                return response_json
            else:
                error_msg = f"HTTP {status}: {response_json}"
                print(f"[ALGORB INGESTION FAILED] {error_msg}")
                raise RuntimeError(error_msg)


# ==============================================================================
# 3. Main Demonstration Block
# ==============================================================================

async def main():
    print("\n==================================================================")
    print("  ALGORB CONTROL // BOT ADAPTER PIPELINE DEMO")
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
    print(f"\n[2] Transmitting execution to Algorb Command Bus ({target_endpoint})...")

    try:
        response = await push_trade_execution(mock_trade, endpoint_url=target_endpoint)
        print(f"\n[3] Ingestion Confirmed by Algorb Control:")
        print(f"    {json.dumps(response, indent=4)}")
        print("\nPipeline execution complete. Trade verified on dashboard.")
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
