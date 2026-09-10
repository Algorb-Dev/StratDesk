# StratDesk — Official Storefront

> Premium, self-hosted dashboards and command centers for personal algorithmic trading systems.

StratDesk provides the interface layer for custom trading bots. Your bot keeps its strategy, execution engine, exchange connections, and private keys. StratDesk gives it an institutional command center.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint
npm run lint

# Compile optimized production build
npm run build

# Start production server
npm start
```

Default local URL: `http://localhost:3000`

---

## 🏛️ Brand & Design System

### Brand Name
- **StratDesk** (and **StratDesk Pro** for the software toolkit).

### Design Tokens
Centralized in `tailwind.config.ts` and `src/app/globals.css`:
- **Background**: Near-black `#07090e`, graphite `#0c0f17`, charcoal `#10141f`.
- **Surfaces**: Layered glass `#131722`, elevated hover `#19202f`.
- **Borders**: Subtle technical borders `rgba(255, 255, 255, 0.08)`, active `rgba(0, 240, 255, 0.4)`.
- **Accents**: Electric Cyan `#00f0ff`, Technical Emerald `#00e599`, Amber `#f59e0b`.
- **Typography**: Inter (display/marketing) + JetBrains Mono (data, coordinates, orders, timestamps).

To change the global accent color, update `accent.DEFAULT` in `tailwind.config.ts` and `--accent-color` in `src/app/globals.css`.

---

## 📖 Developer Quickstart
For a practical guide to connecting your bot, pushing trades to `/api/ledger`, and testing interactive HUDs, see:
👉 [**QUICKSTART.md**](./QUICKSTART.md)

---

## 🧩 Architecture & Key Features

### 1. Dashboard Preview & In-HUD Switchers
Located at `src/components/dashboard/DashboardPreview.tsx`:
```tsx
<DashboardPreview product="pro" theme="obsidian" archetypeId="default" />
```
- **In-HUD Architecture Switcher**: Hot-swap between all **20 specialized bot blueprints** directly in the top header chrome with `localStorage` persistence and URL deep-linking support.
- **In-HUD Theme Switcher**: Instant switching between 6 high-contrast themes: `terminal`, `obsidian`, `quant`, `command`, `vector`, `light`.
- **Professional Command Center**: Bidirectional HMAC-signed command bus, emergency kill-switch (`FLATTEN & HALT`), runtime strategy pauses, and forensic trade ledger unlocked for all users.

### 2. Centralized Configuration Files
- **`src/data/products.ts`**: StratDesk Pro product tier ($49 Early Bird, $59 original), full capability list, and Whop checkout link.
- **`src/data/architectures-data.ts`**: 20 comprehensive quant bot architecture blueprints across 5 categories with killer widget specs (all unlocked).
- **`src/data/themes.ts`**: 6 dashboard themes with custom palette tokens.
- **`src/data/features.ts`**: Interactive capability showcase with live mini-demos.
- **`src/data/demo-data.ts`**: Simulated telemetry figures (NAV `$24,821.64`, Win Rate `72.4%`, active positions, log streams).
- **`src/data/faq.ts`**: Technical answers and architecture clarifications.

### 3. Automated Trade Ledger Ingestion (`/api/ledger`)
StratDesk includes an automated server route at `POST /api/ledger` to ingest trade executions directly from Python (`ccxt`), Node.js, or direct fix engines into the frontend trade journal with R-multiple analysis and forensic execution telemetry.

### 4. Payment & Merchant of Record Integration (Whop)
Payments and fulfillment are handled natively by Whop via direct hosted checkout links:
- `PRODUCTS.pro.whopCheckoutUrl`
All purchase actions link directly to your Whop checkout in a new tab (`target="_blank"` with `rel="noopener noreferrer"`).

---

## 🗺️ Routes

- `/`: Main Storefront (Hero with live floating command center, Credibility strip, Problem morph, Flagship Product Showcase, 8-card feature matrix, Architecture pipeline, How It Works, AI integration, Themes Gallery, Dashboard Lab, Developer specs, Security, FAQ, Final CTA, Footer).
- `/products`: Product catalog, Early Bird pricing ($49), & complete capability matrix.
- `/products/pro`: StratDesk Pro command center detail page ($49 Early Bird).
- `/architectures`: Interactive catalog of all 20 specialized trading bot blueprints with interactive simulators and filters.
- `/lab`: Dedicated interactive Dashboard Lab simulator workstation.
- `/themes`: Interactive themes exploration gallery.
- `/how-it-works`: 4-step workflow, dataflow sequence, adapter examples.
- `/docs`: Developer documentation hub, Python CCXT boilerplate, WebSocket JSON-RPC spec, REST schema, AI prompt spec.
- `/faq`: Standalone searchable FAQ hub.
- `/legal/terms`: Software license grant, non-custodial guarantee, and financial risk disclosures.
- `/legal/privacy`: Zero cloud telemetry tracking, non-custodial privacy pillars.

---

## 🔒 Security & Data Integrity
StratDesk is 100% self-hosted client-side software:
- Zero external tracking on customer portfolio data or orders.
- Does not touch or store exchange API secret keys.
- Local loopback telemetry binding on `127.0.0.1:9042`.
- HMAC-SHA256 authenticated command verification on StratDesk Pro.
