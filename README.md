# Algorb — Official Storefront

> Premium, self-hosted dashboards and interfaces for personal algorithmic trading systems.

Algorb provides the interface layer for custom trading bots. Your bot keeps its strategy, execution engine, exchange connections, and private keys. Algorb gives it an institutional command center.

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
- **Algorb** (always exact; no suffixes like Capital, Trading, AI, Labs).

### Design Tokens
Centralized in `tailwind.config.ts` and `src/app/globals.css`:
- **Background**: Near-black `#07090e`, graphite `#0c0f17`, charcoal `#10141f`.
- **Surfaces**: Layered glass `#131722`, elevated hover `#19202f`.
- **Borders**: Subtle technical borders `rgba(255, 255, 255, 0.08)`, active `rgba(0, 240, 255, 0.4)`.
- **Accents**: Electric Cyan `#00f0ff`, Technical Emerald `#00e599`, Amber `#f59e0b`.
- **Typography**: Inter (display/marketing) + JetBrains Mono (data, coordinates, orders, timestamps).

To change the global accent color, update `accent.DEFAULT` in `tailwind.config.ts` and `--accent-color` in `src/app/globals.css`.

---

## 🧩 Architecture & Future-Proofing

### 1. Dashboard Preview Abstraction
Located at `src/components/dashboard/DashboardPreview.tsx`:
```tsx
<DashboardPreview product="view" theme="terminal" />
```
- Supports `product="view" | "control"`.
- Supports 6 themes: `terminal`, `obsidian`, `quant`, `command`, `vector`, `light`.
- When real dashboards are developed, swap the mock internals or embed the real runtime component directly into this interface.

### 2. Centralized Configuration Files
- **`src/data/products.ts`**: Product tiers (`Algorb View`, `Algorb Control`), feature highlights, capability flags, launch pricing placeholders (`PRICE TBA`).
- **`src/data/themes.ts`**: Fictional dashboard themes with color tokens and traits.
- **`src/data/features.ts`**: 8 interactive features with dedicated mini-demo types.
- **`src/data/demo-data.ts`**: Fictional telemetry figures (Equity `$24,821.64`, Daily PnL `+$482.17`, Win Rate `72.4%`, active positions, log streams).
- **`src/data/faq.ts`**: Technical answers and architecture clarifications.

### 3. Payment Provider Integration
The waitlist / license reservation modal is abstracted in:
`src/components/products/PurchaseModal.tsx`
To plug in Stripe, Lemon Squeezy, or Gumroad:
1. Replace `handleSubmit` with your checkout session redirect or embedded iframe.
2. Pass the customer session ID to your licensing backend.

---

## 🗺️ Routes

- `/`: Main Storefront (Hero with live floating terminal, Credibility strip, Problem morph, Products, 8-card feature matrix, Architecture pipeline, How It Works, AI integration, Themes Gallery, Dashboard Lab, Developer specs, Security, FAQ, Final CTA, Footer).
- `/products`: Product catalog & side-by-side capability matrix.
- `/products/view`: Algorb View deep-dive detail page.
- `/products/control`: Algorb Control command center detail page.
- `/themes`: Interactive themes exploration.
- `/how-it-works`: 4-step workflow, dataflow sequence, adapter examples.
- `/docs`: Developer documentation, WebSocket JSON-RPC spec, REST schema, Python SDK snippet, AI agent prompt guide.
- `/faq`: Standalone searchable FAQ hub.

---

## 🔒 Security & Data Integrity
Algorb is 100% self-hosted client-side software:
- Zero external tracking on customer portfolio data or orders.
- Does not touch or store exchange API secret keys.
- Local loopback telemetry binding on `127.0.0.1:9042`.
- HMAC-SHA256 authenticated command verification on Algorb Control.
