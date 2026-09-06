export interface ProductTier {
  id: "view" | "control";
  slug: string;
  name: string;
  badge: string;
  headline: string;
  tagline: string;
  description: string;
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

export const PRODUCTS: Record<"view" | "control", ProductTier> = {
  view: {
    id: "view",
    slug: "view",
    name: "Algorb View",
    badge: "MONITORING SYSTEM",
    headline: "High-Fidelity Telemetry for Your Bot",
    tagline: "Total visibility into positions, equity, risk, and execution without touching your live order flow.",
    description: "Algorb View provides a high-density, real-time visual telemetry layer that connects to your existing personal trading bot. Designed for quants and bot developers who want institutional-grade monitoring with zero execution risk.",
    pricePlaceholder: "PRICE TBA",
    priceBillingNote: "One-time purchase / Perpetual license / Self-hosted",
    status: "WAITLIST",
    highlights: [
      "Sub-millisecond local telemetry stream",
      "Zero execution permissions required (Read-Only)",
      "Multi-timeframe equity & drawdown curves",
      "Live order book depth & fill slippage waterfall",
      "Multi-strategy allocation tracking",
      "Self-hosted, 100% offline-compatible UI",
    ],
    features: [
      {
        category: "Visual Telemetry",
        items: [
          "Live real-time equity & intraday PnL charts",
          "Drawdown radar & margin utilization meters",
          "Multi-asset open positions grid with real-time mark updates",
          "Execution order stream with slippage and maker/taker tags",
          "Live bot process health, heartbeat, and RAM/CPU usage",
        ],
      },
      {
        category: "Integration & Architecture",
        items: [
          "Lightweight local WebSocket & REST adapter",
          "Zero-dependency Python, TypeScript, and Go SDK wrappers",
          "Works with ccxt, custom exchange wrappers, or direct fix engines",
          "Tailscale & WireGuard ready for secure remote monitoring",
          "Runs in Docker or as a standalone binary",
        ],
      },
      {
        category: "Customization",
        items: [
          "6 switchable high-contrast color themes",
          "Modular widget layout configurator",
          "Custom audio alerts for fills and drawdown thresholds",
          "Exportable execution history and performance reports",
        ],
      },
    ],
    capabilities: {
      monitoring: true,
      control: false,
      readOnlyAdapter: true,
      emergencyStop: false,
      remotePause: false,
      parameterTuning: false,
      webSockets: true,
      restApi: true,
      selfHosted: true,
    },
    suitableFor: "Developers who run automated strategies and want pure observational visibility without exposing trade execution logic or secret write-keys to the interface.",
    whopCheckoutUrl: "https://whop.com/checkout/plan_algorb_view",
  },
  control: {
    id: "control",
    slug: "control",
    name: "Algorb Control",
    badge: "MONITORING + COMMAND CENTER",
    headline: "Command & Control for Autonomous Systems",
    tagline: "Institutional monitoring combined with low-latency interactive controls, emergency halts, and runtime switches.",
    description: "Algorb Control combines all the visual telemetry of View with a secure, bidirectional control bus. Pause strategies, toggle assets, adjust risk boundaries, or engage an instantaneous emergency kill-switch from any authorized device.",
    pricePlaceholder: "PRICE TBA",
    priceBillingNote: "One-time purchase / Perpetual license / Self-hosted",
    status: "WAITLIST",
    highlights: [
      "Everything in Algorb View included",
      "Automated Institutional Trade Ledger & Journal",
      "Bidirectional low-latency control bus",
      "Instant Emergency Kill-Switch (Flatten & Cancel)",
      "Runtime strategy pause, resume, and step-through",
      "Per-symbol trading toggle and dynamic risk throttling",
      "Cryptographically signed command verification",
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
        category: "Advanced Telemetry & Controls",
        items: [
          "All features from Algorb View included",
          "Custom hotkeys for immediate trading interventions",
          "Config hot-reloader without restarting your bot process",
          "Simulated paper mode vs live execution state toggles",
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
    suitableFor: "Quants and system builders who require hands-on intervention authority, emergency circuit breakers, and active strategy state management over live market capital.",
    whopCheckoutUrl: "https://whop.com/checkout/plan_algorb_control",
  },
};

export const COMPARISON_FEATURES = [
  { name: "Live Equity & PnL Telemetry", view: true, control: true },
  { name: "Real-Time Drawdown & Risk Radar", view: true, control: true },
  { name: "Positions & Unrealized Gain/Loss Table", view: true, control: true },
  { name: "Streaming Order Execution & Slippage Log", view: true, control: true },
  { name: "Bot Process Heartbeat & Latency Monitor", view: true, control: true },
  { name: "6 Built-in High-Contrast Themes", view: true, control: true },
  { name: "Read-Only Security Guarantee (No Write Keys)", view: true, control: false },
  { name: "Emergency Kill-Switch (Cancel All & Flatten)", view: false, control: true },
  { name: "Automated Trade Ledger & Execution Journal", view: false, control: true },
  { name: "Forensic R-Multiple & Expectancy Analytics", view: false, control: true },
  { name: "Strategy Pause, Resume & Soft-Drain", view: false, control: true },
  { name: "Dynamic Symbol Whitelist / Blacklist Toggle", view: false, control: true },
  { name: "Live Parameter & Risk Cap Hot-Reload", view: false, control: true },
  { name: "HMAC-SHA256 Cryptographic Command Signing", view: false, control: true },
  { name: "Audited Command Action Journal", view: false, control: true },
  { name: "100% Self-Hosted & Local Network Capable", view: true, control: true },
];
