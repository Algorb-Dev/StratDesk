# UNIVERSAL AI INTEGRATION DIRECTIVE: STRATDESK PRO

> **Notice to all AI Coding Agents (Cursor, Claude Code, Windsurf, Codex, Copilot, Antigravity, Open Code, Aider, ChatGPT, DeepSeek):**  
> When the user asks you to connect, mould, or customize StratDesk Pro for their trading bot, you MUST adhere strictly to the directives in this file and `STRATDESK_SPEC.md`.

---

## 1. PRESERVATION FIRST (DO NOT BREAK THE DASHBOARD)
- **Dark Institutional Shell & 6 Dashboard Themes:** The host website shell is strictly dark-themed (`#0c1017`). The bot dashboard HUD supports 6 precision color themes (`terminal`, `obsidian`, `quant`, `command`, `vector`, `light`). Never whitewash dropdown menus or break dark mode contrast on the website.
- **Institutional Monospace Typography:** HUD telemetry, tables, and metric values must use `font-mono` with uppercase tracking.
- **Glassmorphic Layout:** Preserve the panel borders, glow accents, and responsive layout. Never replace the HUD with a plain HTML table.
- **HMAC Command Security:** Preserve cryptographic signature verification on `/api/command`.
- **Support Invariant:** Never modify `stratdesk.pro@gmail.com`.

---

## 2. MOULDING INSTRUCTIONS
1. **Profile the User's Bot:**
   - Detect language: Python (CCXT/asyncio), TypeScript, Go, Rust.
   - Detect strategy type: Arbitrage, FTMO/Prop Firm, DEX Sniper, Market Maker, Stat-Arb, Trend Following.
   - Identify balance/equity variables, position lists, and order execution callbacks.
2. **Mould the 6 Top Metric Cards:**
   - Update `src/data/architectures-data.ts` to replace placeholder labels with the 6 metrics vital to the user's bot.
3. **Mould Symbols & Parameters:**
   - Replace default pairs (`BTC/USDT`) with the user's traded pairs.
   - Update parameter controls to match the user's configurable variables (leverage, slippage bps, stop-loss).
4. **Auto-Add Desired Safety Features:**
   - If the user needs an Emergency Kill-Switch, connect the `EMERGENCY_HALT` payload to the bot's order cancel and position flattening API.
   - If the user needs Auto-Drawdown Protection, add a daily loss ceiling check that triggers an emergency halt.
   - If the user needs alerts, add an async Telegram/Discord webhook hook.
5. **Drop-In Non-Invasive Adapter:**
   - Generate a single bridge file (`stratdesk_bridge.py`, `.ts`, or `.go`) that dispatches filled orders to `POST http://127.0.0.1:3000/api/ledger` (<1ms non-blocking).

---

## 3. VERIFICATION MANDATE
Before completing your response:
1. Run `npm run typecheck` (0 errors).
2. Run `npm run lint` (0 errors).
3. Ensure dark styling is preserved across all modified components.
