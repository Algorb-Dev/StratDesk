export type ProductTierId = "pro" | "stratdesk" | "control" | "core" | "view";

export interface ProductTier {
  id: "pro";
  slug: string;
  name: string;
  badge: string;
  headline: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  pricePlaceholder: string;
  priceBillingNote: string;
  status: "AVAILABLE_SOON" | "WAITLIST" | "ACTIVE";
  features: {
    category: string;
    items: string[];
  }[];
  highlights: string[];
  capabilities: {
    monitoring: boolean;
    control: boolean;
    readOnlyAdapter: boolean;
    emergencyStop: boolean;
    remotePause: boolean;
    parameterTuning: boolean;
    webSockets: boolean;
    restApi: boolean;
    selfHosted: boolean;
  };
  suitableFor: string;
  whopCheckoutUrl: string;
}

export const stratDeskProTier: ProductTier = {
  id: "pro",
  slug: "pro",
  name: "StratDesk Pro",
  badge: "PRO COMMAND CENTER",
  headline: "Institutional Command Center for Trading Bots",
  tagline: "Total telemetry monitoring combined with low-latency interactive controls, emergency halts, and runtime switches.",
  description: "StratDesk Pro provides an institutional-grade, real-time command center for algorithmic trading systems. Connect your personal bot for live telemetry, sub-millisecond execution logs, an automated forensic trade ledger, bidirectional HMAC-signed command bus, and 20 specialized trading architectures.",
  price: 49,
  originalPrice: 59,
  pricePlaceholder: "$49",
  priceBillingNote: "Early Bird Launch / Perpetual License / 100% Self-Hosted",
  status: "ACTIVE",
  highlights: [
    "Sub-millisecond local telemetry & execution stream",
    "Automated Institutional Trade Ledger & Journal",
    "Bidirectional low-latency control bus",
    "Instant Emergency Kill-Switch (Flatten & Cancel)",
    "Runtime strategy pause, resume, and step-through",
    "All 20 specialized trading bot architectures included",
    "6 switchable high-contrast color themes",
    "Cryptographically signed command verification (HMAC-SHA256)",
    "Zero external cloud servers; 100% self-hosted",
  ],
  features: [
    {
      category: "Trade Ledger & Algorithmic Journal",
      items: [
        "Automated R-multiple & risk-adjusted expectancy tracking",
        "Forensic execution telemetry (Z-score, book depth ratio, latency)",
        "Market regime classification & strategy performance correlation",
        "Daily, weekly, and monthly performance drilldown analytics",
        "Screenshot-ready proof cards with cryptographic report watermarks",
      ],
    },
    {
      category: "Active Command & Control",
      items: [
        "Global Emergency Kill-Switch (Cancel open orders + market flatten)",
        "Granular strategy toggles (Pause, Soft-drain, Resume)",
        "Per-symbol blacklist/whitelist controls in real-time",
        "Live leverage & max drawdown parameter tuning",
        "Manual order override and immediate position close",
      ],
    },
    {
      category: "Security & Command Verification",
      items: [
        "Cryptographically signed control payloads (HMAC-SHA256)",
        "Multi-factor confirmation for destructive operations",
        "Local-only command listener binding (127.0.0.1 or private VPN)",
        "Detailed audit trail log for every triggered action",
        "No external cloud servers; commands travel directly to your bot",
      ],
    },
    {
      category: "Visual Telemetry & Architectures",
      items: [
        "Live real-time equity & intraday PnL charts",
        "Drawdown radar & margin utilization meters",
        "Multi-asset open positions grid with real-time mark updates",
        "Execution order stream with slippage and maker/taker tags",
        "All 20 specialized quant architecture blueprints unlocked",
        "6 switchable themes: Terminal, Obsidian, Quant, Command, Vector, Light",
      ],
    },
    {
      category: "Integration & Architecture",
      items: [
        "Lightweight local WebSocket & REST adapter (POST /api/ledger)",
        "Zero-dependency Python CCXT, TypeScript, and Go SDK wrappers",
        "Works with ccxt, custom exchange wrappers, or direct FIX engines",
        "Tailscale & WireGuard ready for secure remote monitoring",
        "Runs in Docker or as a standalone Next.js binary",
      ],
    },
  ],
  capabilities: {
    monitoring: true,
    control: true,
    readOnlyAdapter: false,
    emergencyStop: true,
    remotePause: true,
    parameterTuning: true,
    webSockets: true,
    restApi: true,
    selfHosted: true,
  },
  suitableFor: "Quants, retail algorithmic traders, and system builders who require hands-on intervention authority, emergency circuit breakers, forensic trade journaling, and institutional telemetry over live capital.",
  whopCheckoutUrl: "https://whop.com/checkout/plan_stratdesk_pro",
};

export const PRODUCTS: Record<ProductTierId, ProductTier> = {
  pro: stratDeskProTier,
  stratdesk: stratDeskProTier,
  control: stratDeskProTier,
  core: stratDeskProTier,
  view: stratDeskProTier,
};

export const ALL_FEATURES = [
  "Live Equity & PnL Telemetry",
  "Real-Time Drawdown & Risk Radar",
  "Positions & Unrealized Gain/Loss Table",
  "Streaming Order Execution & Slippage Log",
  "Bot Process Heartbeat & Latency Monitor",
  "6 Built-in High-Contrast Themes",
  "All 20 Specialized Bot Architectures",
  "Emergency Kill-Switch (Cancel All & Flatten)",
  "Automated Trade Ledger & Execution Journal",
  "Forensic R-Multiple & Expectancy Analytics",
  "Strategy Pause, Resume & Soft-Drain",
  "Dynamic Symbol Whitelist / Blacklist Toggle",
  "Live Parameter & Risk Cap Hot-Reload",
  "HMAC-SHA256 Cryptographic Command Signing",
  "Audited Command Action Journal",
  "100% Self-Hosted & Local Network Capable",
];
