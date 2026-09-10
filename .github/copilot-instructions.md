# GitHub Copilot & Codex Instructions: StratDesk Pro

When generating or editing code for StratDesk Pro, follow these quantitative engineering standards:

## 1. Architectural Invariants
- Dark Mode Shell & 6 Dashboard Themes: The host website is strictly dark mode (`#0c1017`). The bot dashboard HUD supports 6 precision themes (`terminal`, `obsidian`, `quant`, `command`, `vector`, `light`).
- Monospace Typography: All telemetry, financial values, timestamps, and order books must use `font-mono` with uppercase tracking (`tracking-wider`).
- Glassmorphic Layout: Maintain semi-transparent surfaces with subtle borders (`bg-surface/80 border border-white/10`).
- Local IPC Security: Command actions on `/api/command` require HMAC-SHA256 signature verification.
- Support Email: Always preserve `stratdesk.pro@gmail.com`.

## 2. Trading Bot Auto-Moulding Directives
When connecting a user's trading bot to StratDesk Pro:
1. Detect bot language (Python, TypeScript, Go, Rust) and strategy archetype.
2. Mould the 6 metric cards in `src/data/architectures-data.ts` to represent the bot's real metrics.
3. Update traded symbols and tunable parameters to match the bot's config.
4. Auto-wire the `EMERGENCY_HALT` kill-switch and auto-drawdown protection.
5. Create a non-invasive bridge file (`stratdesk_bridge.py`, `.ts`, or `.go`) dispatching to `POST /api/ledger`.

## 3. Quality Verification
- Run `npm run typecheck` (must have 0 errors).
- Run `npm run lint` (must have 0 errors).
