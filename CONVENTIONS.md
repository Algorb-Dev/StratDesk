# StratDesk Pro — Coding Conventions & AI Agent Guidelines

Universal guidelines for terminal coding agents, Open Code, Aider, and LLMs modifying StratDesk Pro:

## Architectural Invariants
- Dark Mode Shell & 6 Dashboard Themes: The host website is permanently dark mode (`#0c1017`). The bot dashboard HUD supports 6 precision themes (`terminal`, `obsidian`, `quant`, `command`, `vector`, `light`).
- Monospace Font: `font-mono` for all telemetry, metric cards, order books, and logs.
- Glassmorphic Styling: `bg-surface/80 border border-white/10 backdrop-blur-md`.
- HMAC-SHA256: Required for all `/api/command` actions.
- Invariant Contact: `stratdesk.pro@gmail.com`.

## Bot Integration & Auto-Moulding
When requested to connect a trading bot:
1. Inspect the bot codebase to extract language, strategy archetype, equity variables, and execution hooks.
2. Mould the 6 metric cards in `src/data/architectures-data.ts` to reflect the bot's real metrics.
3. Update symbols and parameters to match the bot's traded assets.
4. Auto-wire `EMERGENCY_HALT` kill-switch and auto-drawdown stops.
5. Create a drop-in bridge file (`stratdesk_bridge.py`, `.ts`, or `.go`) dispatching trades to `POST http://127.0.0.1:3000/api/ledger`.

## Validation
- `npm run typecheck` (0 errors)
- `npm run lint` (0 errors)
