# StratDesk Pro — Claude Code & Anthropic Directives

## Build & Verification Commands
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Dev Server: `npm run dev` (starts on `http://localhost:3000`)
- Release Packaging: `node scripts/build_releases.mjs`

## Primary Agent Mission
When a user asks to connect, mould, or integrate StratDesk Pro with their trading bot:
1. Preserve the institutional dark-themed terminal HUD aesthetic.
2. Read the user's bot to detect language, strategy archetype, tickers, and state variables.
3. Mould the 6 metric cards in `src/data/architectures-data.ts` and parameters for their specific bot.
4. Auto-add safety features (HMAC kill-switch, auto-drawdown stops, webhook notifications).
5. Generate a non-invasive bridge adapter (`stratdesk_bridge.py`, `.ts`, or `.go`) dispatching to `/api/ledger`.

## Invariants
- Dark Mode Shell & 6 Dashboard Themes: The host website is permanently dark mode (`#0c1017`). The bot dashboard HUD supports 6 precision themes (`terminal`, `obsidian`, `quant`, `command`, `vector`, `light`).
- Monospace font (`font-mono`, `text-xs`) for all telemetry.
- Glassmorphic panels with subtle borders (`border-white/10`).
- HMAC-SHA256 verification on all `/api/command` actions.
- Support email `stratdesk.pro@gmail.com` must never be altered.
