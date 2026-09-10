export interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  category: "TELEMETRY" | "RISK" | "EXECUTION" | "SYSTEM" | "CONTROL";
  interactiveDemoType:
    | "equity"
    | "risk"
    | "positions"
    | "execution"
    | "strategies"
    | "health"
    | "control"
    | "mobile"
    | "csvexport"
    | "shortcuts"
    | "multibot"
    | "alerts";
  technicalSpecs: string[];
}

export const FEATURES: FeatureItem[] = [
  {
    id: "performance",
    title: "Performance Telemetry",
    badge: "SUB-SECOND SYNC",
    tagline: "Track equity, cumulative returns, and intraday P&L in real time.",
    description: "Stream tick-level net asset value directly from your broker or exchange adapter. Switch between timeframes without waiting for slow server roundtrips.",
    category: "TELEMETRY",
    interactiveDemoType: "equity",
    technicalSpecs: ["Tick-level NAV smoothing", "Benchmark overlay (BTC/SPY)", "Multi-currency normalization"],
  },
  {
    id: "risk",
    title: "Dynamic Risk Surveillance",
    badge: "MARGIN & DRAWDOWN",
    tagline: "Monitor peak-to-trough drawdown and gross exposure limits.",
    description: "Instantaneous visual warning when current margin utilization approaches custom risk thresholds. Real-time value-at-risk and liquidation buffer gauges.",
    category: "RISK",
    interactiveDemoType: "risk",
    technicalSpecs: ["Intraday drawdown alarms", "Margin cushion percentage", "Gross vs net leverage calculation"],
  },
  {
    id: "positions",
    title: "Live Position Surface",
    badge: "MULTI-ASSET & DERIVATIVES",
    tagline: "Total inventory awareness across every connected market.",
    description: "Aggregates perp contracts, spot bags, and options deltas in a unified high-density table with real-time mark updates and ROE color-grading.",
    category: "EXECUTION",
    interactiveDemoType: "positions",
    technicalSpecs: ["Multi-exchange position aggregation", "Dynamic distance-to-liquidation", "Real-time basis & funding rate tracking"],
  },
  {
    id: "execution",
    title: "Execution & Fill Analytics",
    badge: "SLIPPAGE WATERFALL",
    tagline: "Audit order routing, maker/taker ratios, and latency.",
    description: "Visualize every order transition: Dispatch → Ack → Partial Fill → Closed. Track microsecond slippage relative to mid-price at time of order creation.",
    category: "EXECUTION",
    interactiveDemoType: "execution",
    technicalSpecs: ["Round-trip order execution latency", "Maker vs Taker distribution", "Slippage basis point auditing"],
  },
  {
    id: "strategies",
    title: "Multi-Strategy Attribution",
    badge: "PORTFOLIO SLICES",
    tagline: "Distinguish which sub-models generate alpha vs drag.",
    description: "Tag orders by strategy ID. Instantly compare Sharpe ratios, win rates, and capital allocations across concurrent algorithmic threads.",
    category: "TELEMETRY",
    interactiveDemoType: "strategies",
    technicalSpecs: ["Sub-account tag routing", "Independent PnL decomposition", "Dynamic capital re-weighting"],
  },
  {
    id: "health",
    title: "Bot Process Health & Heartbeat",
    badge: "RUNTIME OBSERVER",
    tagline: "Monitor memory drift, event loop lag, and API error spikes.",
    description: "A continuous low-overhead heartbeat ping keeps you certain your bot is healthy, connected to exchange websockets, and processing market ticks.",
    category: "SYSTEM",
    interactiveDemoType: "health",
    technicalSpecs: ["Process memory leak detection", "WebSocket reconnect counter", "Event loop latency tracker (<2ms)"],
  },
  {
    id: "control",
    title: "Command Bus & Kill-Switch",
    badge: "STRATDESK PRO",
    tagline: "Emergency stop and active runtime parameters at your fingertips.",
    description: "Flatten risk in one click. Disengage failing models, cancel resting limit orders, and adjust max exposure caps without editing configuration files or restarting your daemon.",
    category: "CONTROL",
    interactiveDemoType: "control",
    technicalSpecs: ["One-click Emergency Halt", "Symbol whitelist/blacklist toggles", "HMAC cryptographically signed actions"],
  },
  {
    id: "mobile",
    title: "Responsive Telemetry",
    badge: "DESKTOP TO MOBILE",
    tagline: "Inspect your system from your phone with zero compromise.",
    description: "Engineered specifically for handheld viewports. No miniaturized desktop tables — layouts dynamically recompose into crisp, high-contrast mobile cards.",
    category: "SYSTEM",
    interactiveDemoType: "mobile",
    technicalSpecs: ["Touch-optimized kill-switches", "Tailscale VPN mobile friendly", "Hardware-accelerated CSS rendering"],
  },
  {
    id: "csvexport",
    title: "Forensic Ledger & CSV",
    badge: "INSTITUTIONAL AUDIT",
    tagline: "Generate cryptographic proof-of-fill records and tax-ready CSVs.",
    description: "Instantly export full execution histories with timestamps, fee tiers, and R-multiples. Watermarked forensic receipts ready for investor scrutiny or tax accounting.",
    category: "EXECUTION",
    interactiveDemoType: "csvexport",
    technicalSpecs: ["RFC-4180 compliant CSV export", "SHA-256 batch report hashes", "Realized R-multiple accounting"],
  },
  {
    id: "shortcuts",
    title: "Quant Keyboard Hotkeys",
    badge: "SUB-10MS ACTION",
    tagline: "Navigate archetypes, toggle positions, and arm kill-switch via keys.",
    description: "Engineered for rapid response under volatility. Instant hotkeys (Ctrl+K, Esc, Space to pause, Shift+X to flatten) allow rapid hands-free operation.",
    category: "CONTROL",
    interactiveDemoType: "shortcuts",
    technicalSpecs: ["Zero event loop blocking", "Hardware keyboard debounce", "Custom keybinding profiles"],
  },
  {
    id: "multibot",
    title: "Multi-Bot Topology Hub",
    badge: "FLEET MANAGEMENT",
    tagline: "Monitor multiple independent bot daemons in a unified view.",
    description: "Aggregate telemetry from cross-exchange market makers, DEX snipers, and grid bots simultaneously. Reconcile margin utilization across accounts in real time.",
    category: "SYSTEM",
    interactiveDemoType: "multibot",
    technicalSpecs: ["Pooled portfolio VaR", "Isolated IPC channels", "Multi-venue heartbeat tracker"],
  },
  {
    id: "alerts",
    title: "Live Volatility Radar",
    badge: "AUDIO & VISUAL",
    tagline: "Immediate visual & audio pings when risk limits or fills breach thresholds.",
    description: "Configurable threshold alerts for unexpected drawdown, slippage spikes, or WebSocket disconnects. Streamlined sound synthesis and visual flashes keep you vigilant.",
    category: "RISK",
    interactiveDemoType: "alerts",
    technicalSpecs: ["Low-latency WebAudio synthesized beeps", "Webhook notification dispatch", "Configurable drawdown triggers"],
  },
];
