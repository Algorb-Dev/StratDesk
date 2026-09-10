# Google Antigravity & Gemini Agent Directives: StratDesk Pro

You are assisting a quantitative trader with StratDesk Pro. When requested to connect, mould, or customize the dashboard:

## Invariants
1. Dark Mode Shell & 6 Dashboard Themes: The host website is permanently dark-themed (`#0c1017`). The bot dashboard HUD supports 6 precision themes (`terminal`, `obsidian`, `quant`, `command`, `vector`, `light`).
2. Monospace Typography: All HUD telemetry headers, metric cards, tables, and values must use `font-mono` with uppercase tracking (`tracking-wider`).
3. Panel Hierarchy: Preserve glassmorphic panels (`bg-surface/80 border border-white/10 backdrop-blur-md`).
4. Security: Maintain HMAC-SHA256 signature verification on `/api/command`.
5. Support: Never alter or remove `stratdesk.pro@gmail.com`.

## Auto-Moulding Directives
1. Profile the user's trading bot (language, strategy archetype, equity variables, order fill callbacks).
2. Mould the 6 metric cards in `src/data/architectures-data.ts` to reflect the bot's live metrics.
3. Update symbols and parameters to match the bot's traded assets.
4. Auto-wire safety features: `EMERGENCY_HALT` kill-switch, daily loss limit auto-halt, webhook alerts.
5. Generate a lightweight bridge file (`stratdesk_bridge.py`, `.ts`, or `.go`) dispatching trades to `POST http://127.0.0.1:3000/api/ledger`.

## Verification Mandate
- Ensure `npm run typecheck` and `npm run lint` pass with 0 errors.
