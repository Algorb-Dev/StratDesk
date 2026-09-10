# STRATDESK PRO — UNIVERSAL AI AUTO-MOULDING SPECIFICATION & INTEGRATION RULES

> **Specification Version:** 3.0.0  
> **Universal Compatibility:** Cursor, Claude Code, Windsurf, GitHub Copilot, OpenAI Codex, Google Antigravity, Open Code, Aider, ChatGPT, DeepSeek, Local LLMs.  
> **Target Software:** StratDesk Pro — Self-Hosted Institutional Command Center & Bidirectional Trading Terminal.  
> **Official Support:** `stratdesk.pro@gmail.com`

---

## 1. AGENT MISSION & UNIVERSAL DIRECTIVE

You are an expert quantitative software engineer and systems architect. The user has provided their personal algorithmic trading bot and tasked you with:
> *"Connect this dashboard to my trading bot."* (or *"Mould StratDesk for my trading bot."*)

### Primary Directive
**Analyze the user's trading bot codebase, preserve the institutional dark-themed terminal HUD, and automatically mould StratDesk Pro into a custom, dedicated command center tailored specifically to their bot's asset classes, strategy logic, risk parameters, and execution hooks.**

---

## 2. THE PRESERVATION INVARIANTS (WHAT YOU MUST NEVER BREAK)

StratDesk Pro is purchased specifically for its sleek, institutional-grade quantitative terminal aesthetic. Under NO circumstances should you degrade the UI into a generic, plain website or basic retail dashboard.

1. **Dark Mode Shell & 6 Dashboard Themes**:
   - The host application and marketing website are strictly dark-mode-only (`color-scheme: dark`, background `#0c1017` / `#05080e`, slate/cyan/amber/emerald text).
   - The bot dashboard HUD supports 6 precision themes: `terminal` (CRT Green), `obsidian` (Cyan), `quant` (Ultraviolet), `command` (Amber), `vector` (Emerald), and `light` (Daylight Studio high-contrast workstation).
   - Never whitewash dropdown menus or break dark mode contrast on the website.
2. **Institutional Monospace Typography**:
   - All telemetry headers, metric cards, order books, execution tables, and logs MUST use monospace font styling (`font-mono`, `text-xs`, uppercase tracking `tracking-wider`).
3. **Glassmorphic Surface Hierarchy**:
   - Maintain the semi-transparent panel architecture (`bg-surface/80 border border-white/10`, `backdrop-blur-md`).
4. **100% Self-Hosted & Private Local IPC**:
   - Never inject external telemetry, third-party tracking, or cloud servers.
   - All bot-to-dashboard communication occurs locally via loopback (`http://127.0.0.1:3000` or private LAN).
5. **Bidirectional Command Security (HMAC-SHA256)**:
   - Dispatched control actions (`EMERGENCY_HALT`, `PAUSE_EXECUTION`, `RELOAD_PARAMS`) MUST maintain cryptographic HMAC-SHA256 verification with timestamp freshness and anti-replay nonces.
6. **Support Integrity**:
   - The contact `stratdesk.pro@gmail.com` must remain intact across all legal and documentation files.

---

## 3. THE 4-STEP BOT PROFILING PROTOCOL

Before modifying any code, inspect the user's bot repository and extract this 4-point profile:

### Step 1: Language & Runtime Detection
- **Python:** Asyncio, CCXT, Pandas, FastAPI, WebSockets, PyTorch, Backtrader, Hummingbot.
- **TypeScript / JavaScript:** Ethers.js, Viem, CCXT, `@solana/web3.js`, Node.js child processes.
- **Go:** `go-binance`, Fiber, Gorilla WebSockets.
- **Rust:** `tokio`, `barter-rs`, `ethers-rs`.
- **C++ / C# / Java / Other:** Identify stdout/socket loop.

### Step 2: Strategy Archetype Mapping
Match the user's bot to the closest StratDesk archetype (from the 20 unlocked blueprints) or mould a hybrid:
1. **Crypto Arbitrage Matrix:** Cross-exchange or triangular latency arbitrage.
2. **Prop Firm Evaluator (FTMO):** Drawdown ceilings, daily loss limits, equity halo-lock.
3. **On-Chain DEX Sniper:** Mempool scanning, gas/gwei priority, Jito bundle latency, honeypot filters.
4. **Pair Trading / Stat-Arb:** Cointegration, Z-score thresholds, spread mean reversion.
5. **Options Volatility Surface:** Greeks (Delta, Gamma, Vega, Theta), IV smile, delta-neutral hedging.
6. **Market Maker:** Orderbook depth imbalance, bid-ask spread capture, inventory skew.
7. **Trend / Momentum Breakout:** Moving average crosses, breakout levels, ATR trailing stops.
8. **Multi-Bot Fleet Hub:** Multiple sub-strategies pooled across exchanges.

### Step 3: State Variable Identification
Identify where the bot stores:
- **Account Equity / Margin:** e.g. `bot.balance`, `portfolio.nav`, `account.equity`.
- **Open Positions:** e.g. `bot.positions`, `active_trades` (symbol, side, entry price, size, unrealized PnL).
- **Order Execution Events:** The callback or function triggered when an order fills (entry/exit price, slippage, fees).
- **Custom Indicators:** The mathematical outputs driving the strategy (e.g. `z_score`, `funding_rate`, `rsi`, `gas_price`).

### Step 4: Execution Control Hooks
Identify the bot functions that execute orders:
- **Emergency Cancel:** e.g. `cancel_all_orders()`, `exchange.cancel_all_orders()`.
- **Market Flatten:** e.g. `close_all_positions()`, `liquidate()`.
- **Pause Execution:** e.g. `is_paused = True`, `stop_trading()`.
- **Config Reload:** e.g. `reload_config()`, updating leverage or stop loss variables.

---

## 4. THE AUTO-MOULDING PROTOCOL (TAILORING THE DASHBOARD)

Once you understand the bot, mould the dashboard to reflect that bot's identity.

### A. Moulding the 6 Top Metric Cards
Open `src/data/architectures-data.ts` (or the active blueprint definition) and replace generic placeholder metrics with the 6 metrics critical to the user's bot:

```typescript
// Pattern for src/data/architectures-data.ts
metrics: [
  { label: "ACCOUNT EQUITY", value: "$48,920.50", change: "+5.14%", isPositive: true },
  { label: "<METRIC 2>", value: "<VALUE 2>", change: "<STATUS 2>", isPositive: true },
  { label: "<METRIC 3>", value: "<VALUE 3>", change: "<STATUS 3>", isPositive: true },
  { label: "<METRIC 4>", value: "<VALUE 4>", change: "<STATUS 4>", isPositive: true },
  { label: "<METRIC 5>", value: "<VALUE 5>", change: "<STATUS 5>", isPositive: true },
  { label: "<METRIC 6>", value: "<VALUE 6>", change: "<STATUS 6>", isPositive: true },
]
```

#### Archetype-Specific Metric Presets:
- **For Prop Firm / FTMO:**
  `PORTFOLIO EQUITY`, `DAILY LOSS REMAINING`, `MAX DRAWDOWN CEIL`, `PROFIT TARGET`, `REALIZED R:R`, `COMPLIANCE OK`.
- **For On-Chain DEX Sniper:**
  `SOL/ETH BALANCE`, `PRIORITY FEE (GWEI)`, `MEMPOOL DELAY (MS)`, `HONEYPOT SCORE`, `SLIPPAGE BPS`, `JITO STATUS`.
- **For Stat-Arb / Pairs:**
  `PAIRS SPREAD`, `Z-SCORE DEVIATION`, `COINTEG P-VALUE`, `ATOMIC DISPATCH`, `SHARPE (30D)`, `DELTA EXPOSURE`.
- **For Market Maker:**
  `NET SPREAD BPS`, `BOOK IMBALANCE`, `INVENTORY SKEW`, `24H MAKER VOLUME`, `REBATE YIELD`, `CANCEL/FILL RATIO`.

### B. Moulding Symbols & Market Watch
Replace default pairs (`BTC/USDT`, `ETH/USDT`) with the user's exact trading pairs (e.g. `SOL/USDC`, `PEPE/USDT`, `EUR/USD`, `NQ1!`).

### C. Moulding Strategy Parameters
Update the blueprint `parameters` array to match the user bot's tunable settings:
```typescript
parameters: [
  { name: "Max Leverage", key: "leverage", value: "5x", type: "number" },
  { name: "Stop Loss ATR", key: "stop_atr", value: "1.8x", type: "number" },
  { name: "Max Slippage", key: "max_slippage", value: "4 bps", type: "number" },
  { name: "Execution Mode", key: "mode", value: "Aggressive Maker", type: "select" }
]
```

---

## 5. AUTO-ADDING USER-DESIRED FEATURES

When the user expresses a desire for specific operational capabilities, implement them automatically using these proven patterns:

### Feature 1: Emergency Kill-Switch Wiring
When the user clicks `FLATTEN & HALT` on the dashboard, it dispatches an HMAC-signed POST request to `/api/command`.
Wire the user's bot to listen for this command and execute immediate cancellation + position flattening:
```python
# In bot's command listener
if action == "EMERGENCY_HALT":
    print("[CRITICAL] Kill switch triggered from StratDesk!")
    cancel_all_orders()
    flatten_positions()
    halt_bot_loop()
```

### Feature 2: Automated Daily Drawdown Halt
Add a rule in the bridge adapter that automatically triggers the kill-switch if the bot's daily drawdown crosses the user's threshold:
```python
# In bot's risk monitor
if daily_drawdown_pct >= max_allowed_daily_loss_pct:
    print("[ALERT] Daily loss limit breached. Self-triggering StratDesk emergency halt.")
    trigger_stratdesk_halt("Daily drawdown threshold reached")
```

### Feature 3: Telegram / Discord Webhook Notifications
If the user wants alerts, add an asynchronous webhook call in the bridge adapter whenever a trade is ingested or an emergency halt is triggered.

### Feature 4: Automated Trade Ledger Ingestion
Hook every order fill event into `POST http://127.0.0.1:3000/api/ledger` with normalized R-multiples and regime classification.

---

## 6. NON-INVASIVE ADAPTER GENERATION (DROP-IN BRIDGES)

Generate a single lightweight bridge file in the user's repository without modifying their proprietary execution algorithm.

### Python CCXT / AsyncIO Bridge (`stratdesk_bridge.py`)
```python
import requests
import time
from datetime import datetime, timezone

class StratDeskBridge:
    def __init__(self, endpoint="http://127.0.0.1:3000"):
        self.ledger_url = f"{endpoint}/api/ledger"
        self.command_url = f"{endpoint}/api/command"

    def push_trade(self, order, strategy_name="Alpha", initial_risk_usd=500.0):
        """Asynchronously dispatches execution to StratDesk Trade Ledger."""
        entry = float(order.get("price", order.get("average", 0)))
        exit_p = float(order.get("lastPrice", entry))
        qty = float(order.get("amount", order.get("filled", 1.0)))
        pnl = float(order.get("realizedPnl", (exit_p - entry) * qty))
        r_mult = round(pnl / initial_risk_usd, 2) if initial_risk_usd > 0 else 1.0

        payload = {
            "id": f"TRD-{int(time.time() * 1000)}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "symbol": order.get("symbol", "BTC/USDT"),
            "strategy": strategy_name,
            "side": order.get("side", "BUY").upper(),
            "entryPrice": entry,
            "exitPrice": exit_p,
            "size": qty,
            "pnl": pnl,
            "pnlPercent": round((pnl / (entry * qty)) * 100, 2) if (entry * qty) > 0 else 0.0,
            "rMultiple": r_mult,
            "regime": "trend_expansion",
            "exchange": order.get("exchange", "Binance Futures"),
            "slippageBps": float(order.get("slippageBps", 1.2)),
            "tags": [strategy_name.lower(), "live"]
        }
        try:
            requests.post(self.ledger_url, json=payload, timeout=0.8)
        except Exception as e:
            print(f"[StratDesk Bridge Warning] Telemetry dispatch failed: {e}")
```

### TypeScript / Node.js Bridge (`stratdesk_bridge.ts`)
```typescript
export interface TradeExecution {
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  exitPrice: number;
  amount: number;
  pnl: number;
  strategy?: string;
  initialRiskUsd?: number;
}

export async function pushTradeToStratDesk(trade: TradeExecution, endpoint = "http://127.0.0.1:3000") {
  const rMult = trade.initialRiskUsd && trade.initialRiskUsd > 0
    ? Number((trade.pnl / trade.initialRiskUsd).toFixed(2))
    : 1.0;

  const payload = {
    id: `TRD-${Date.now()}`,
    timestamp: new Date().toISOString(),
    symbol: trade.symbol,
    strategy: trade.strategy || "Core Strategy",
    side: trade.side,
    entryPrice: trade.price,
    exitPrice: trade.exitPrice,
    size: trade.amount,
    pnl: trade.pnl,
    pnlPercent: Number(((trade.pnl / (trade.price * trade.amount)) * 100).toFixed(2)),
    rMultiple: rMult,
    regime: "trend_expansion",
    exchange: "Live Bot",
    slippageBps: 1.0,
  };

  try {
    await fetch(`${endpoint}/api/ledger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[StratDesk Bridge] Telemetry send failed:", err);
  }
}
```

---

## 7. VERIFICATION CHECKLIST (MANDATORY BEFORE COMPLETING)

Whenever you finish moulding or customizing StratDesk Pro:
1. **Typecheck:** Run `npm run typecheck` (must pass with 0 errors).
2. **Linter:** Run `npm run lint` (must pass with 0 errors and 0 warnings).
3. **Runtime Check:** Ensure `http://localhost:3000/` and `http://localhost:3000/ledger` respond with HTTP 200.
4. **Style Check:** Verify the UI retains high contrast, dark slate surfaces, and monospace fonts without whitewashing.

---

*StratDesk Pro — Universal AI Moulding Engine. Engineering Support: `stratdesk.pro@gmail.com`.*
