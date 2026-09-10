# StratDesk — Developer Quickstart Guide

> Fast-track guide to running, testing, connecting, and deploying StratDesk trading bot dashboards.

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR TRADING BOT                     │
│  (Python / CCXT / Node.js / Rust / Go / Hummingbot)     │
│  - Proprietary alpha & logic                            │
│  - Exchange API write keys & secrets stay strictly here │
└───────────────────────────┬─────────────────────────────┘
                            │
               POST /api/ledger (HTTP REST)
                            OR
               Sub-millisecond WebSocket IPC (ws://127.0.0.1:9042)
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  STRATDESK DASHBOARD                    │
│               (Next.js App Router / React)              │
│  - Institutional Telemetry HUD                          │
│  - 20 Hot-Swappable Architectures                       │
│  - 6 High-Contrast Themes                               │
│  - Forensic Execution Trade Ledger                      │
│  - Cryptographic HMAC-SHA256 Command Bus (Kill-Switch)   │
└─────────────────────────────────────────────────────────┘
```

---

## 2. ⚡ Installation & Local Setup

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** or **pnpm** / **yarn**

### Quick Launch
```bash
# 1. Clone or extract the repository
cd Algorb

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser. The dashboard and interactive simulation environment are immediately live.

---

## 3. 🏷️ Product Tier & Early Bird Pricing

StratDesk Pro is distributed as a **self-hosted, perpetual license with 100% source code access** (no recurring SaaS fees, zero cloud telemetry tracking).

| Product Tier | Early Bird Launch Price | Regular Price | Capabilities |
| :--- | :---: | :---: | :--- |
| **StratDesk Pro** | **$49** | ~~$59~~ | Complete professional command center: 20 specialized architectures unlocked, 6 themes, bidirectional HMAC-signed command bus, emergency kill-switch (`FLATTEN & HALT`), runtime pauses, and forensic audit trade ledger. |

---

## 4. 🎛️ Exploring the Dashboard Lab (`/lab`)

Visit `http://localhost:3000/lab` to test-drive all runtime capabilities:

1. **Architecture Switcher**:
   - Located in the **top header chrome** of the dashboard HUD.
   - Hot-swap between **all 20 specialized architectures** (Crypto Arbitrage Matrix, On-Chain DEX Sniper, Pair Trading Stat-Arb, Prop Firm Evaluator, Options Volatility Surface, Chief Risk Officer Red-Line, Raw CLI Terminal, etc.).
   - Selections are automatically persisted to `localStorage` under `stratdesk_active_architecture` and sync across open tabs.
   - Deep-linking supported via URL query parameters (e.g. `http://localhost:3000/lab?archetype=options-cockpit`).

2. **Color Profile Switcher**:
   - Click the **Theme** button in the HUD chrome to toggle between:
     - `terminal` (CRT phosphor green with optional scanlines)
     - `obsidian` (Stealth carbon dark)
     - `quant` (Institutional high-density cyan)
     - `command` (Amber alert tactical HUD)
     - `vector` (Monochrome technical wireframe)
     - `light` (Daylight laboratory mode)

3. **Control Mode & Trade Ledger**:
   - Test the emergency kill-switch, parameter reloader, and strategy switches in real time.
   - Switch to the **AUDIT TRADE LEDGER** tab to explore forensic trade metrics, R-multiples, execution slippage, and date filters.

---

## 5. 🔌 Connecting Your Trading Bot

### Method A: Automated Ingestion via `/api/ledger` (Recommended)

When your bot executes an order, send a simple JSON payload to `http://localhost:3000/api/ledger`:

#### Python (CCXT / Requests)
```python
import time
import requests

payload = {
    "symbol": "BTC/USDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": 64280.50,
    "amount": 0.25,
    "strategy": "TrendSurge-v2",
    "rMultiple": 2.4,
    "realizedPnl": 380.20,
    "slippageBps": 1.2,
    "status": "CLOSED"
}

resp = requests.post("http://127.0.0.1:3000/api/ledger", json=payload)
print(f"[STRATDESK IPC] Trade dispatched: {resp.status_code} - {resp.json()}")
```

#### Node.js / TypeScript
```typescript
const trade = {
  symbol: "ETH/USDT",
  side: "SELL",
  type: "MARKET",
  price: 3450.00,
  amount: 2.0,
  strategy: "MeanReversion-15m",
  rMultiple: 1.85,
  realizedPnl: 185.00,
  slippageBps: 0.8,
  status: "CLOSED",
};

const response = await fetch("http://127.0.0.1:3000/api/ledger", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(trade),
});
console.log("Trade logged:", await response.json());
```

#### Quick cURL Test
```bash
curl -X POST http://localhost:3000/api/ledger \
  -H "Content-Type: application/json" \
  -d '{"symbol":"SOL/USDT","side":"BUY","price":142.50,"amount":10,"strategy":"Momentum-Breakout","realizedPnl":82.50,"status":"CLOSED"}'
```

---

### Method B: Sub-Millisecond Telemetry Loopback (`127.0.0.1:9042`)

For sub-millisecond local telemetry streaming (mark prices, order books, and bot heartbeats):
1. StratDesk binds to a local WebSocket server on `ws://127.0.0.1:9042`.
2. Telemetry packets are streamed directly in memory with zero cloud egress.
3. See [`src/components/docs/CodeTabs.tsx`](file:///C:/Users/razee/Desktop/Digital/Algorb/src/components/docs/CodeTabs.tsx) or visit `/docs` for complete async Python (`aiohttp`) and WebSocket schemas.

---

## 6. 🛡️ Verification & Build Commands

Always run code quality audits before deploying:

```bash
# Typecheck TypeScript definitions
npm run typecheck

# Run Next.js ESLint
npm run lint

# Build production bundle
npm run build
```

---

## 7. 🚀 Production Deployment

### Local Workstation / Headless Trading Server
Run StratDesk directly on the same machine or private VPS hosting your trading bot:
```bash
npm run build
npm run start -p 3000
```

### Private Remote Access
To access your dashboard securely from a phone, tablet, or remote laptop without exposing public open ports:
- **Tailscale**: `tailscale up` and access via your private Tailscale IP (e.g. `http://100.x.y.z:3000`).
- **WireGuard**: Bind StratDesk to your internal WireGuard interface (`10.0.0.x:3000`).
- **Reverse Proxy**: Place behind Nginx / Caddy with HTTP Basic Auth or mutual TLS.

---

## 8. 📚 Resources & Documentation

- **Documentation Hub**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **20 Architectures Catalog**: [http://localhost:3000/architectures](http://localhost:3000/architectures)
- **Interactive Dashboard Lab**: [http://localhost:3000/lab](http://localhost:3000/lab)
- **Terms & License Agreement**: [http://localhost:3000/legal/terms](http://localhost:3000/legal/terms)
- **Privacy Policy**: [http://localhost:3000/legal/privacy](http://localhost:3000/legal/privacy)
