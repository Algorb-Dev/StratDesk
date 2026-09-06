import React from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import {
  ShieldAlert,
  Zap,
  Activity,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Sliders,
  ExternalLink,
  Layers,
  Cpu,
  Lock,
} from "lucide-react";

export const metadata = {
  title: "Algorb — Archetype-Specific SDK Adapters & Telemetry Payloads",
  description:
    "Learn how to format specialized telemetry payloads for Algorb bot archetypes: Prop-Firm Drawdown Halo, Crypto Arbitrage Matrix, Stat-Arb Z-Score, and DEX Snipers.",
};

export default function ArchetypesDocsPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
          <Link href="/docs" className="hover:text-white transition-colors">
            Documentation
          </Link>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-accent font-bold">Archetype SDKs</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
          Archetype-Specific SDK Adapters
        </h1>
        <p className="text-sm text-text-secondary font-sans max-w-3xl leading-relaxed">
          Each of Algorb&apos;s 20 specialized bot archetypes is powered by targeted telemetry vectors. Format your payloads according to these archetype specifications to feed custom HUD widgets like the Drawdown Halo, Spread Heatmap, and Z-Score Reversion Oscillator.
        </p>
      </div>

      {/* Archetype 1: Prop-Firm Halo */}
      <section id="prop-firm" className="p-6 sm:p-8 rounded-2xl bg-surface/70 border border-white/10 space-y-6 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-warning font-bold uppercase text-[11px]">
                ARCHETYPE 09 // FTMO & PROP-FIRM COMPLIANCE
              </span>
            </div>
            <h2 className="text-xl font-bold text-white font-sans">
              The Prop-Firm Evaluator Halo
            </h2>
          </div>

          <Link
            href="/?archetype=prop-firm-evaluator-console&tier=control#dashboard-lab"
            className="px-3 py-1.5 rounded-lg border border-warning/40 text-warning hover:bg-warning/10 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>TEST IN LAB</span>
          </Link>
        </div>

        <p className="text-text-secondary font-sans leading-relaxed text-sm">
          To drive the circular <strong>Daily Drawdown Halo</strong> and emergency hard-kill lockout, report your account&apos;s distance from daily and max breach ceilings. When current drawdown reaches within 10% of the daily limit, Algorb automatically illuminates the red alert halo.
        </p>

        <div className="space-y-3">
          <div className="text-white font-bold text-xs uppercase flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-warning" />
            <span>Python Compliance Wrapper & Halo Dispatch</span>
          </div>
          <CodeBlock
            code={`import aiohttp
import asyncio

async def push_prop_firm_trade(
    ticket: str,
    pnl: float,
    current_drawdown: float,   # e.g. -1850.00
    daily_limit: float = -5000.00, # FTMO $5k daily loss rule
    account_size: float = 100000.00
):
    """
    Transmits execution fill and daily compliance telemetry to Algorb Control.
    The Drawdown Halo computes: buffer_remaining = daily_limit - current_drawdown
    """
    cushion_remaining = daily_limit - current_drawdown  # e.g. $3,150.00
    cushion_pct = round((abs(cushion_remaining) / abs(daily_limit)) * 100, 1)

    payload = {
        "id": f"TRD-{ticket}",
        "ticket": ticket,
        "symbol": "EUR-USD",
        "direction": "LONG",
        "size": "5.00 LOTS",
        "entryPrice": 1.0850,
        "exitPrice": 1.0887,
        "pnl": pnl,
        "pnlPercent": round((pnl / account_size) * 100, 2),
        "strategy": "Asian Session Breakout",
        "marketRegime": "Low Volatility Range Retest",
        "orderType": "LIMIT_MAKER",
        "notes": f"FTMO Challenge compliance check. Cushion: \${abs(cushion_remaining):,.2f} ({cushion_pct}%).",
        "tags": ["#prop-firm", "#ftmo-rules", "#drawdown-halo", "#phase-1"],
        "zScore": 1.45,
        "confidence": 0.94,
        "telemetry": {
            "zScore": 1.45,
            "signalConfidence": 0.94,
            "executionLatencyMs": 1.1,
            "bookDepthRatio": 2.4
        }
    }

    async with aiohttp.ClientSession() as session:
        async with session.post("http://localhost:3000/api/ledger", json=payload) as resp:
            data = await resp.json()
            print(f"[HALO IPC] Verified Trade ID: {data.get('recordedId')} | Cushion: \${abs(cushion_remaining)}")`}
            language="python"
            filename="prop_firm_adapter.py"
            badge="PROP-FIRM HALO"
          />
        </div>
      </section>

      {/* Archetype 2: Crypto Arbitrage Matrix */}
      <section id="crypto-arbitrage" className="p-6 sm:p-8 rounded-2xl bg-surface/70 border border-white/10 space-y-6 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-bold uppercase text-[11px]">
                ARCHETYPE 01 // CROSS-EXCHANGE BASIS ARBITRAGE
              </span>
            </div>
            <h2 className="text-xl font-bold text-white font-sans">
              Crypto Arbitrage & Dual-Ping Telemetry
            </h2>
          </div>

          <Link
            href="/?archetype=crypto-arbitrage-matrix&tier=control#dashboard-lab"
            className="px-3 py-1.5 rounded-lg border border-accent/40 text-accent hover:bg-accent/10 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>TEST IN LAB</span>
          </Link>
        </div>

        <p className="text-text-secondary font-sans leading-relaxed text-sm">
          Arbitrage bots operate across two or more venues simultaneously (e.g. Binance and Bybit). To populate the live <strong>Spread Heatmap</strong> and <strong>Dual Ping Visualizer</strong>, transmit microsecond round-trip latency measurements and basis point spread capture.
        </p>

        <div className="space-y-3">
          <div className="text-white font-bold text-xs uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>Python Dual-Socket Latency & Arbitrage Dispatch</span>
          </div>
          <CodeBlock
            code={`import aiohttp
import asyncio
import time

async def push_arbitrage_execution(
    ticket: str,
    binance_price: float,   # Venue A entry
    bybit_price: float,     # Venue B hedge fill
    size_btc: float,
    binance_ping_ms: float = 1.1,
    bybit_ping_ms: float = 1.4
):
    """
    Reports synchronized 2-leg arbitrage fill with cross-exchange ping metrics.
    Spread in bps: ((bybit_price - binance_price) / binance_price) * 10,000
    """
    spread_bps = round(((bybit_price - binance_price) / binance_price) * 10000, 1)
    gross_pnl = round((bybit_price - binance_price) * size_btc, 2)

    payload = {
        "id": f"ARB-{ticket}",
        "ticket": ticket,
        "symbol": "BTC-USDT",
        "direction": "LONG",  # Leg A direction (Leg B is paired hedge)
        "size": f"{size_btc:.3f} BTC",
        "entryPrice": binance_price,
        "exitPrice": bybit_price,
        "pnl": gross_pnl,
        "pnlPercent": round((spread_bps / 100), 2),
        "strategy": "Cross-Exchange Basis Arb",
        "marketRegime": "Liquidity Imbalance",
        "orderType": "LIMIT_MAKER",
        "fees": 4.12,  # Positive value indicates maker rebate received
        "slippage": "+0.1 bps",
        "slippageBps": 0.1,
        "notes": f"Dislocation captured. Spread: +{spread_bps} bps. Binance: {binance_ping_ms}ms, Bybit: {bybit_ping_ms}ms.",
        "tags": ["#cross-exchange", "#basis-arb", "#sub-millisecond", "#dual-ping"],
        "zScore": 3.12,
        "confidence": 0.98,
        "telemetry": {
            "zScore": 3.12,
            "signalConfidence": 0.98,
            "executionLatencyMs": binance_ping_ms,
            "bookDepthRatio": 3.4
        }
    }

    async with aiohttp.ClientSession() as session:
        async with session.post("http://localhost:3000/api/ledger", json=payload) as resp:
            data = await resp.json()
            print(f"[ARB IPC] Recorded Dislocation Fill: {data.get('recordedId')} (+{spread_bps} bps)")`}
            language="python"
            filename="crypto_arb_adapter.py"
            badge="SPREAD HEATMAP"
          />
        </div>
      </section>

      {/* Archetype 3: Pair Trading / Stat-Arb Z-Score */}
      <section id="stat-arb" className="p-6 sm:p-8 rounded-2xl bg-surface/70 border border-white/10 space-y-6 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-bold uppercase text-[11px]">
                ARCHETYPE 05 // COINTEGRATED PAIR TRADING
              </span>
            </div>
            <h2 className="text-xl font-bold text-white font-sans">
              Stat-Arb Z-Score & Mean Reversion
            </h2>
          </div>

          <Link
            href="/?archetype=pair-trading-statarb-console&tier=control#dashboard-lab"
            className="px-3 py-1.5 rounded-lg border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>TEST IN LAB</span>
          </Link>
        </div>

        <p className="text-text-secondary font-sans leading-relaxed text-sm">
          Statistical arbitrageurs trade spread oscillations between cointegrated pairs (e.g. BTC vs ETH). To feed the <strong>Z-Score Oscillation Tracker</strong> and mean-reversion bands, transmit the live standard deviation distance (<code className="text-accent">zScore</code>) and half-life decay.
        </p>

        <div className="space-y-3">
          <div className="text-white font-bold text-xs uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Python Kalman Filter Z-Score Dispatch</span>
          </div>
          <CodeBlock
            code={`import aiohttp
import asyncio

async def push_statarb_trade(
    ticket: str,
    pair_symbol: str,    # e.g. "BTC-ETH"
    z_score: float,      # e.g. +2.18 standard deviations
    pnl: float,
    beta_hedge_ratio: float = 1.24,
    half_life_min: float = 14.2
):
    """
    Pushes mean-reversion execution with mathematical model confidence.
    Algorb uses zScore to plot 2.0σ entry triggers and 0.0σ exit reversions.
    """
    payload = {
        "id": f"STAT-{ticket}",
        "ticket": ticket,
        "symbol": pair_symbol,
        "direction": "SHORT" if z_score > 0 else "LONG",  # Short when spread expands > +2σ
        "size": "0.0542 RATIO",
        "entryPrice": 0.05420,
        "exitPrice": 0.05310,
        "pnl": pnl,
        "pnlPercent": 2.03,
        "strategy": "Kalman Filter Pair Mean-Reversion",
        "marketRegime": "Mean-Reverting Stationary",
        "orderType": "LIMIT_MAKER",
        "notes": f"Spread expanded to {z_score:.2f}σ. Mean reversion filled. Beta: {beta_hedge_ratio}, Half-Life: {half_life_min}m.",
        "tags": ["#stat-arb", "#cointegration", "#z-score", "#mean-reversion"],
        "zScore": z_score,
        "confidence": 0.95,
        "telemetry": {
            "zScore": z_score,
            "signalConfidence": 0.95,
            "executionLatencyMs": 0.8,
            "bookDepthRatio": 2.7
        }
    }

    async with aiohttp.ClientSession() as session:
        async with session.post("http://localhost:3000/api/ledger", json=payload) as resp:
            data = await resp.json()
            print(f"[STATARB IPC] Recorded Z-Score Fill: {data.get('recordedId')} ({z_score}σ)")`}
            language="python"
            filename="statarb_adapter.py"
            badge="Z-SCORE REVERSION"
          />
        </div>
      </section>

      {/* Archetype 4 & 5 Grid: DEX Sniper & CRO Red-Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DEX Sniper */}
        <section id="dex-sniper" className="p-6 rounded-2xl bg-surface/70 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-accent font-bold text-[11px] uppercase">ARCHETYPE 02 // DEX SNIPER</span>
            <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[9px] font-bold">SOLANA / EVM</span>
          </div>

          <h3 className="text-base font-bold text-white font-sans">
            On-Chain DEX Mempool & Honeypot Guard
          </h3>

          <p className="text-text-secondary font-sans text-xs leading-relaxed">
            Report pending transaction queues, Gwei priority fees, and contract audit checklists:
          </p>

          <CodeBlock
            code={`payload = {
    "id": "SNIPE-SOL-092",
    "ticket": "TX-5Jv8L...9aQ",
    "symbol": "SOL-TOKEN",
    "direction": "LONG",
    "size": "5.00 SOL",
    "entryPrice": 142.20,
    "exitPrice": 158.40,
    "pnl": 81.00,
    "pnlPercent": 11.39,
    "strategy": "Mempool Liquidity Snipe",
    "marketRegime": "High Volatility DEX Token",
    "notes": "Honeypot scan: 100/100. Jito MEV tip: 0.005 SOL. Block time: 380ms.",
    "tags": ["#solana-sniper", "#mempool", "#honeypot-guard"],
    "zScore": 2.80,
    "confidence": 0.99,
    "telemetry": {
        "zScore": 2.80,
        "signalConfidence": 0.99,
        "executionLatencyMs": 380.0,
        "bookDepthRatio": 4.2
    }
}`}
            language="python"
            filename="dex_sniper_payload.py"
            showLineNumbers={false}
          />
        </section>

        {/* CRO Red-Line */}
        <section id="cro-redline" className="p-6 rounded-2xl bg-surface/70 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-bold text-[11px] uppercase">ARCHETYPE 10 // RISK GOVERNANCE</span>
            <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[9px] font-bold">RED-LINE VaR</span>
          </div>

          <h3 className="text-base font-bold text-white font-sans">
            Chief Risk Officer & VaR Red-Line
          </h3>

          <p className="text-text-secondary font-sans text-xs leading-relaxed">
            Report pooled capital leverage, 99% parametric Value at Risk, and emergency lockout state:
          </p>

          <CodeBlock
            code={`payload = {
    "id": "CRO-RISK-441",
    "ticket": "FUND-ALLOC-04",
    "symbol": "PORTFOLIO-AGG",
    "direction": "SHORT",
    "size": "POOL-NAV",
    "entryPrice": 100000.00,
    "exitPrice": 102450.00,
    "pnl": 2450.00,
    "pnlPercent": 2.45,
    "strategy": "Multi-Bot Quantitative Treasury",
    "marketRegime": "Balanced Hedged",
    "notes": "99% 1D VaR: $842.10 (3.39%). Gross leverage: 3.2x. 5 instances running.",
    "tags": ["#cro-redline", "#var-risk", "#master-kill-switch"],
    "zScore": 1.15,
    "confidence": 0.92,
    "telemetry": {
        "zScore": 1.15,
        "signalConfidence": 0.92,
        "executionLatencyMs": 0.6,
        "bookDepthRatio": 2.9
    }
}`}
            language="python"
            filename="cro_redline_payload.py"
            showLineNumbers={false}
          />
        </section>
      </div>

      {/* Bottom Launch Callout */}
      <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-white font-bold block mb-1">
            Need to see these archetypes in action?
          </span>
          <span className="text-text-muted">
            Launch any of the 20 blueprints in the interactive Dashboard Lab with live simulated data.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/architectures"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold uppercase transition-colors"
          >
            Explore 20 Blueprints
          </Link>
          <Link
            href="/#dashboard-lab"
            className="px-4 py-2 rounded-lg bg-accent text-background font-bold uppercase shadow-glow-cyan transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch Dashboard Lab</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
