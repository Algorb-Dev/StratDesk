export type ArchitectureCategory =
  | "asset-class"
  | "strategy"
  | "risk-ops"
  | "presentation"
  | "specialized-utility";

export interface KillerWidgetSpec {
  name: string;
  description: string;
  badge: string;
  simulationType:
    | "spread-heatmap"
    | "mempool-sniper"
    | "vwap-scatter"
    | "options-greeks"
    | "zscore-reversion"
    | "grid-density"
    | "ai-monitor"
    | "momentum-waterfall"
    | "drawdown-halo"
    | "cro-redline"
    | "pi-node"
    | "monte-carlo"
    | "obs-ticker"
    | "glass-summary"
    | "raw-cli"
    | "bloomberg-macro"
    | "social-sharecard"
    | "nlp-sentiment"
    | "mobile-pager"
    | "modular-grid";
}

export interface ArchitectureBlueprint {
  id: string;
  number: string;
  title: string;
  category: ArchitectureCategory;
  categoryLabel: string;
  targetAudience: string;
  layoutDescription: string;
  killerWidget: KillerWidgetSpec;
  recommendedTier: "core" | "pro" | "view" | "control";
  tags: string[];
  specs: {
    latencyRequirement: string;
    keyMetrics: string[];
    alertVectors: string[];
  };
  summary: string;
}

export const ARCHITECTURE_CATEGORIES: { id: ArchitectureCategory | "all"; label: string; count: number }[] = [
  { id: "all", label: "ALL BLUEPRINTS", count: 20 },
  { id: "asset-class", label: "ASSET-CLASS SPECIFIC", count: 4 },
  { id: "strategy", label: "STRATEGY-SPECIFIC", count: 4 },
  { id: "risk-ops", label: "OPERATIONAL & RISK", count: 4 },
  { id: "presentation", label: "PRESENTATION & DISPLAY", count: 4 },
  { id: "specialized-utility", label: "SPECIALIZED UTILITY", count: 4 },
];

export const ARCHITECTURES_DATA: ArchitectureBlueprint[] = [
  // ==========================================
  // ASSET-CLASS SPECIFIC ARCHETYPES (01 - 04)
  // ==========================================
  {
    id: "crypto-arbitrage-matrix",
    number: "01",
    title: "The Crypto Arbitrage & Cross-Exchange Matrix",
    category: "asset-class",
    categoryLabel: "Asset-Class Specific",
    targetAudience: "Cross-market crypto latency arbitrageurs & funding rate harvesters.",
    layoutDescription:
      "Split-screen or dual-column institutional topology. Left column anchors Venue A (Binance), Right column anchors Venue B (Bybit), linked via synchronized orderbook depth ladders.",
    killerWidget: {
      name: "Spread Heatmap & Dual-Ping Telemetry",
      description:
        "Real-time cross-venue spread matrix displaying bid-ask disparities in basis points alongside microsecond dual-socket API ping latency meters.",
      badge: "SPREAD HEATMAP",
      simulationType: "spread-heatmap",
    },
    recommendedTier: "pro",
    tags: ["#cross-exchange", "#basis-arb", "#sub-millisecond", "#dual-socket"],
    specs: {
      latencyRequirement: "< 1.5ms IPC / < 12ms cross-venue ping",
      keyMetrics: ["Spread (bps)", "Venue A Depth", "Venue B Depth", "Maker Rebate Delta"],
      alertVectors: ["Spread Compression Alert", "Execution Desync", "Socket Ping Spike"],
    },
    summary:
      "Engineered for latency arbitrageurs capturing microsecond basis dislocations across Binance, Bybit, and OKX simultaneously.",
  },
  {
    id: "on-chain-dex-sniper",
    number: "02",
    title: "The On-Chain DEX Sniper",
    category: "asset-class",
    categoryLabel: "Asset-Class Specific",
    targetAudience: "DeFi token snipers and liquidity-pool front-runners (Solana & EVM).",
    layoutDescription:
      "Pure execution velocity topology with zero historical charting bloat. Maximizes block-confirmation logs, gas price priority ladders, and mempool transaction queues.",
    killerWidget: {
      name: "Mempool Scanner & Contract Safety Audit",
      description:
        "Streaming raw block mempool listener with dynamic Gwei/Priority-Fee sliders and real-time Honeypot / Rug-Check contract validation badges.",
      badge: "MEMPOOL SCANNER",
      simulationType: "mempool-sniper",
    },
    recommendedTier: "pro",
    tags: ["#solana-evm", "#mempool-sniping", "#honeypot-guard", "#priority-fee"],
    specs: {
      latencyRequirement: "Direct RPC WebSocket / Block time < 400ms",
      keyMetrics: ["Block Confirmations", "Pending Mempool Tx", "Effective Slippage", "Gas Priority"],
      alertVectors: ["Malicious Bytecode Warning", "Liquidity Removal Drain", "Failed Simulation"],
    },
    summary:
      "Stripped-down, pure-speed interface for mempool snipers requiring automated contract safety audits and micro-second block execution.",
  },
  {
    id: "equities-vwap-twap-terminal",
    number: "03",
    title: "The Equities VWAP/TWAP Execution Terminal",
    category: "asset-class",
    categoryLabel: "Asset-Class Specific",
    targetAudience: "Institutional equity execution desks and systematic block order traders.",
    layoutDescription:
      "Parent/child hierarchical order tree displaying large institutional block parent tickets subdivided into algorithmic child slices scheduled across the trading day.",
    killerWidget: {
      name: "Arrival vs. Fill Slippage Scatter Plot",
      description:
        "Real-time scatter plot correlating arrival benchmark prices against actual fill prices, mapped over an intraday volume profile histogram.",
      badge: "SLIPPAGE SCATTER",
      simulationType: "vwap-scatter",
    },
    recommendedTier: "pro",
    tags: ["#block-orders", "#vwap-benchmark", "#twap-slicer", "#equity-execution"],
    specs: {
      latencyRequirement: "< 10ms FIX protocol / Market-on-Close",
      keyMetrics: ["VWAP Slippage (bps)", "Parent Order Fill %", "Participation Rate", "Volume Curve"],
      alertVectors: ["Volume Participation Drift", "Severe Arrival Slippage", "Exchange Reject"],
    },
    summary:
      "Tailored for equity block execution quants who need granular proof that child slices are strictly outperforming volume-weighted benchmarks.",
  },
  {
    id: "options-volatility-surface",
    number: "04",
    title: "The Options Volatility Surface",
    category: "asset-class",
    categoryLabel: "Asset-Class Specific",
    targetAudience: "Options market makers, delta-neutral sellers, and gamma scalping bots.",
    layoutDescription:
      "Replaces traditional linear price charts with interactive 3D/2D volatility smiles and multi-leg risk matrix curves across strike ladders and expiration expiries.",
    killerWidget: {
      name: "Dynamic Greeks Cockpit & Vol Surface Heatmap",
      description:
        "Color-shifting gauges monitoring portfolio Delta, Gamma, Theta, and Vega with real-time implied volatility skew tracking.",
      badge: "GREEKS COCKPIT",
      simulationType: "options-greeks",
    },
    recommendedTier: "pro",
    tags: ["#options-greeks", "#vol-surface", "#gamma-scalp", "#delta-neutral"],
    specs: {
      latencyRequirement: "< 5ms Black-Scholes continuous re-eval",
      keyMetrics: ["Net Portfolio Delta", "Gamma Risk", "Theta Decay / hr", "Vega Exposure"],
      alertVectors: ["Gamma Inversion Alert", "Delta Threshold Breach", "Vol Spike Dislocation"],
    },
    summary:
      "A complete mathematical visualization suite built for systematic derivatives traders managing Greeks sensitivity rather than directional spot price.",
  },

  // ==========================================
  // STRATEGY-SPECIFIC ARCHETYPES (05 - 08)
  // ==========================================
  {
    id: "pair-trading-statarb-console",
    number: "05",
    title: "The Pair Trading / Statistical Arbitrage Console",
    category: "strategy",
    categoryLabel: "Strategy-Specific",
    targetAudience: "Quantitative quants trading cointegrated asset pairs (BTC/ETH, Gold/Silver, Tech Equities).",
    layoutDescription:
      "Dual overlaid normalized asset trajectories on top, coupled with an expansive statistical Z-score spread oscillation oscillator along the primary viewport.",
    killerWidget: {
      name: "Spread Reversion Target & Z-Score Tracker",
      description:
        "Standard deviation divergence tracker showing exact 2.0σ entry barriers, historical mean-reversion bands, and cointegration half-life decay timers.",
      badge: "Z-SCORE REVERSION",
      simulationType: "zscore-reversion",
    },
    recommendedTier: "pro",
    tags: ["#stat-arb", "#cointegration", "#z-score", "#mean-reversion"],
    specs: {
      latencyRequirement: "< 5ms multi-leg atomic dispatch",
      keyMetrics: ["Spread Z-Score", "Residual Half-Life", "Hedge Ratio (Beta)", "Cointegration P-Value"],
      alertVectors: ["3.0σ Extreme Divergence", "Cointegration Breakdown", "Unbalanced Leg Fill"],
    },
    summary:
      "Designed specifically for statistical arbitrageurs whose primary edge is mean reversion of spreads rather than absolute market direction.",
  },
  {
    id: "grid-market-maker-topology",
    number: "06",
    title: "The Grid / Market Maker Topology",
    category: "strategy",
    categoryLabel: "Strategy-Specific",
    targetAudience: "Passive liquidity providers, neutral grid operators, and AMM range managers.",
    layoutDescription:
      "Orderbook-centric multi-tier visualization mapping the bot's limit-order net cast across upper and lower liquidity layers around the spot price.",
    killerWidget: {
      name: "Orderbook Layering Net & Impermanent Loss Gauge",
      description:
        "Depth density heatmap revealing layered bid/ask walls paired with a real-time 'Impermanent Loss vs. Accumulated Maker Fees' profit gauge.",
      badge: "ORDERBOOK NET",
      simulationType: "grid-density",
    },
    recommendedTier: "pro",
    tags: ["#grid-bot", "#passive-maker", "#impermanent-loss", "#range-liquidity"],
    specs: {
      latencyRequirement: "< 10ms post-only order replacement",
      keyMetrics: ["Grid Range Cushion", "Net Accumulated Rebates", "Impermanent Loss %", "Inventory Imbalance"],
      alertVectors: ["Grid Range Breakout", "Single-Sided Fill Exhaustion", "Maker Fee Deficit"],
    },
    summary:
      "Provides passive liquidity algorithms with a comprehensive visual map of active limit orders and exact net profitability after fees.",
  },
  {
    id: "ai-reinforcement-learning-monitor",
    number: "07",
    title: "The AI / Reinforcement Learning Monitor",
    category: "strategy",
    categoryLabel: "Strategy-Specific",
    targetAudience: "Machine learning engineers running neural network, LSTM, or deep RL execution agents.",
    layoutDescription:
      "Data science workstation aesthetic featuring loss-curve telemetry, policy distribution histograms, and active regime classification badges.",
    killerWidget: {
      name: "Model Confidence Scatter & Drift Detector",
      description:
        "Real-time correlation plot tracking predicted action confidence versus realized outcome, with automated model drift warnings and regime badges.",
      badge: "MODEL DRIFT RADAR",
      simulationType: "ai-monitor",
    },
    recommendedTier: "pro",
    tags: ["#deep-learning", "#reinforcement-learning", "#model-drift", "#policy-entropy"],
    specs: {
      latencyRequirement: "Inference cycle < 25ms GPU/ONNX runtime",
      keyMetrics: ["Action Confidence", "Policy Entropy", "Reward Signal", "Feature Drift (PSI)"],
      alertVectors: ["Out-of-Distribution Input", "Severe Model Decay", "Confidence Floor Breach"],
    },
    summary:
      "Transforms complex deep-learning inference telemetry into actionable trading monitors, alerting operators when live markets drift from training sets.",
  },
  {
    id: "momentum-breakout-scanner",
    number: "08",
    title: "The Momentum / Breakout Scanner",
    category: "strategy",
    categoryLabel: "Strategy-Specific",
    targetAudience: "Systematic trend-following algorithms and opening-range breakout traders.",
    layoutDescription:
      "High-density multi-asset tile array monitoring 40+ tickers concurrently, dynamically sorting assets by volume expansion delta and directional impulse.",
    killerWidget: {
      name: "Time-in-Trade vs. R-Multiple Waterfall",
      description:
        "Performance waterfall chart exposing whether trades immediately accelerate into profit or decay into stagnant sideways churn.",
      badge: "R-MULTIPLE WATERFALL",
      simulationType: "momentum-waterfall",
    },
    recommendedTier: "pro",
    tags: ["#trend-following", "#momentum-scanner", "#breakout-filter", "#multi-ticker"],
    specs: {
      latencyRequirement: "< 20ms multi-feed WebSocket aggregation",
      keyMetrics: ["Volume Expansion Multiplier", "Time to +1R", "Momentum Velocity", "ATR Expansion"],
      alertVectors: ["False Breakout Whipsaw", "Volume Exhaustion Trap", "Dynamic Trailing Stop Trigger"],
    },
    summary:
      "Built for momentum traders who need to instantly differentiate between explosive follow-throughs and stagnant, capital-draining false breaks.",
  },

  // ==========================================
  // OPERATIONAL & RISK ARCHETYPES (09 - 12)
  // ==========================================
  {
    id: "prop-firm-evaluator-console",
    number: "09",
    title: "The Prop-Firm Evaluator Console",
    category: "risk-ops",
    categoryLabel: "Operational & Risk",
    targetAudience: "Automated traders running challenge accounts on FTMO, Topstep, The5ers, or FundedNext.",
    layoutDescription:
      "Strict, gamified compliance interface built to eliminate account breach anxiety through oversized safety halos and progress meters.",
    killerWidget: {
      name: "The Daily Drawdown Halo & Hard-Kill Lockout",
      description:
        "High-contrast circular radial meter displaying exact dollar distance from daily breach thresholds, with an automated hardware-level kill switch that locks trading at 1% cushion.",
      badge: "DRAWDOWN HALO",
      simulationType: "drawdown-halo",
    },
    recommendedTier: "pro",
    tags: ["#prop-firm", "#drawdown-halo", "#ftmo-rules", "#emergency-lockout"],
    specs: {
      latencyRequirement: "Real-time tick-level equity reconciliation",
      keyMetrics: ["Buffer to Daily Breach ($)", "Max Trailing Cushion", "Profit Target %", "Permitted Open Risk"],
      alertVectors: ["1.5% Buffer Warning", "Auto-Lockout Activated", "Trailing Limit Violation"],
    },
    summary:
      "An institutional safety net for automated prop traders that prevents catastrophic account breaches with hard-coded emergency execution halts.",
  },
  {
    id: "chief-risk-officer-red-line",
    number: "10",
    title: "The Chief Risk Officer 'Red Line' Dashboard",
    category: "risk-ops",
    categoryLabel: "Operational & Risk",
    targetAudience: "Multi-bot fund managers, capital allocators, and quantitative treasury supervisors.",
    layoutDescription:
      "Completely eliminates distraction price charts in favor of raw capital allocation metrics, counterparty leverage exposures, and margin saturation gauges.",
    killerWidget: {
      name: "Value-at-Risk (VaR) Matrix & Slide-to-Flatten Switch",
      description:
        "Real-time 99% parametric VaR monitor paired with a prominent, safety-guarded 'Slide to Confirm: FLATTEN ALL & REVOKE KEYS' master switch.",
      badge: "EMERGENCY FLATTEN",
      simulationType: "cro-redline",
    },
    recommendedTier: "pro",
    tags: ["#fund-governance", "#cro-oversight", "#var-risk", "#master-kill-switch"],
    specs: {
      latencyRequirement: "< 100ms global multi-venue flatten dispatch",
      keyMetrics: ["99% Daily VaR", "Gross Leverage Factor", "Liquidation Distance", "Free Margin Ratio"],
      alertVectors: ["VaR Ceiling Exceeded", "Margin Call Warning", "API Revocation Triggered"],
    },
    summary:
      "The ultimate risk supervisory hub for operators managing pooled capital across multiple automated execution instances.",
  },
  {
    id: "hardware-raspberry-pi-node-screen",
    number: "11",
    title: "The Hardware / Raspberry Pi Node Screen",
    category: "risk-ops",
    categoryLabel: "Operational & Risk",
    targetAudience: "Self-hosting developers running dedicated 24/7 desk displays (e.g. 7-inch 800x480 Pi monitors).",
    layoutDescription:
      "High-contrast, high-readability layout optimized for glanceability from across the room on low-resolution hardware displays without mouse interaction.",
    killerWidget: {
      name: "Desk Glance Vitals & Monospace PnL Billboard",
      description:
        "Displays real-time hardware vitals (CPU temperature, RAM leak monitor, WiFi heartbeat) alongside an oversized monospace current-state PnL tracker.",
      badge: "GLANCEABLE VITALS",
      simulationType: "pi-node",
    },
    recommendedTier: "pro",
    tags: ["#raspberry-pi", "#desk-display", "#800x480", "#hardware-vitals"],
    specs: {
      latencyRequirement: "Low-footprint DOM, < 30MB browser RAM usage",
      keyMetrics: ["CPU Core Temp", "Process Memory (RSS)", "Heartbeat Latency", "Session Net PnL"],
      alertVectors: ["Node Overheating", "Process Crash Recovery", "Network Desync"],
    },
    summary:
      "A lightweight, glanceable dashboard purpose-built for low-power micro-controllers and dedicated ambient desktop hardware displays.",
  },
  {
    id: "walk-forward-backtest-lab",
    number: "12",
    title: "The Walk-Forward / Backtest Lab",
    category: "risk-ops",
    categoryLabel: "Operational & Risk",
    targetAudience: "Strategy researchers verifying whether a live bot is adhering to historical statistical edges.",
    layoutDescription:
      "Split-screen analytical comparison: Left panel visualizes historical in-sample backtest curves; Right panel streams live out-of-sample execution.",
    killerWidget: {
      name: "Monte Carlo Edge Decay Divergence Monitor",
      description:
        "Plots live cumulative equity directly against Monte Carlo probability confidence cones, sounding an alert if live execution deviates beyond 2 standard deviations.",
      badge: "EDGE DECAY RADAR",
      simulationType: "monte-carlo",
    },
    recommendedTier: "pro",
    tags: ["#monte-carlo", "#backtest-verification", "#edge-decay", "#walk-forward"],
    specs: {
      latencyRequirement: "Continuous rolling statistical comparison",
      keyMetrics: ["Live vs. Backtest Sharpe", "Max Monte Carlo Drawdown", "Rolling Information Ratio", "Edge Decay (Z)"],
      alertVectors: ["Edge Extinction Alert", "2σ Negative Divergence", "Regime Shift Failure"],
    },
    summary:
      "Scientifically verifies whether your trading bot is still operating within its historical edge or decaying due to changing market structure.",
  },

  // ==========================================
  // PRESENTATION & DISPLAY ARCHETYPES (13 - 16)
  // ==========================================
  {
    id: "streamer-obs-hud-overlay",
    number: "13",
    title: "The Streamer / OBS 'HUD' Overlay",
    category: "presentation",
    categoryLabel: "Presentation & Display",
    targetAudience: "YouTube, Twitch, and Kick creators who live-stream algorithmic bot operations to audiences.",
    layoutDescription:
      "Chroma-key transparent backdrop (`bg-transparent`) optimized for OBS browser-source docking directly over TradingView or video cameras.",
    killerWidget: {
      name: "Cinematic Realized PnL Ticker & Particle Wins",
      description:
        "Rolling monospace ticker tape of closed positions with particle burst visual effects on breakout wins and discreet censorship mode for private balances.",
      badge: "OBS HUD OVERLAY",
      simulationType: "obs-ticker",
    },
    recommendedTier: "pro",
    tags: ["#obs-studio", "#twitch-trading", "#livestream-hud", "#privacy-mode"],
    specs: {
      latencyRequirement: "Smooth 60 FPS CSS rendering / Transparent DOM",
      keyMetrics: ["Stream Session PnL", "Win Streak Counter", "Top Alpha Ticker", "Viewer Proof Code"],
      alertVectors: ["Big Win Particle Trigger", "Balance Censorship Guard", "IPC Stream Disconnect"],
    },
    summary:
      "A slick, broadcast-ready HUD designed to sit seamlessly over livestream video feeds while safeguarding sensitive API keys and account sizes.",
  },
  {
    id: "glassmorphic-executive-summary",
    number: "14",
    title: "The Glassmorphic 'Executive Summary'",
    category: "presentation",
    categoryLabel: "Presentation & Display",
    targetAudience: "Hands-off capital allocators and retail clients who desire calm, sophisticated yield tracking.",
    layoutDescription:
      "Modern luxury glassmorphism featuring frosted backdrops, subtle gradients, and generous whitespace with zero intimidating terminal logs.",
    killerWidget: {
      name: "Compounding Yield Projection & NAV Trajectory",
      description:
        "A smoothed, calming cumulative net asset value curve with forward-looking compounding APY sliders that abstracts away micro-tick chaos.",
      badge: "EXECUTIVE SUMMARY",
      simulationType: "glass-summary",
    },
    recommendedTier: "pro",
    tags: ["#glassmorphism", "#executive-view", "#calm-ui", "#apy-projector"],
    specs: {
      latencyRequirement: "Buffered periodic tick updates (1s refresh)",
      keyMetrics: ["Current Account Value", "Cumulative Net Return", "Annualized APY Yield", "Calm Risk Score"],
      alertVectors: ["Milestone Achieved", "Weekly Audit Summary", "Rebalance Notification"],
    },
    summary:
      "A serene, reassuring visual presentation that elevates automated bots into polished, wealth-management calibre assets for investors.",
  },
  {
    id: "raw-developer-terminal-cli",
    number: "15",
    title: "The Raw Developer Terminal (CLI Aesthetic)",
    category: "presentation",
    categoryLabel: "Presentation & Display",
    targetAudience: "Hardcore command-line aficionados and Unix engineers who prefer terminal aesthetics.",
    layoutDescription:
      "Pure pitch-black viewport, phosphor green/amber monospace typography, subtle CRT scanline filters, and zero bloated graphical buttons.",
    killerWidget: {
      name: "Interactive In-Browser CLI Command Shell",
      description:
        "Fully functional interactive command shell where operators type `> /status`, `> /kill_bot --force`, or `> /set_risk 0.5` directly to the bot API.",
      badge: "INTERACTIVE CLI",
      simulationType: "raw-cli",
    },
    recommendedTier: "pro",
    tags: ["#cli-terminal", "#crt-scanlines", "#keyboard-shortcuts", "#raw-monospace"],
    specs: {
      latencyRequirement: "< 0.5ms terminal buffer render",
      keyMetrics: ["IPC Bus Uptime", "Command Latency", "Daemon Status", "Active Socket Streams"],
      alertVectors: ["SIGTERM Intercepted", "Malformed Syntax Alert", "Buffer Overflow Warning"],
    },
    summary:
      "The purist's command deck: a nostalgic CRT terminal interface packed with modern interactive CLI dispatch tools for keyboard-driven operators.",
  },
  {
    id: "institutional-bloomberg-refinitiv-clone",
    number: "16",
    title: "The Institutional 'Bloomberg/Refinitiv' Terminal",
    category: "presentation",
    categoryLabel: "Presentation & Display",
    targetAudience: "Traditional finance quants and prop desks accustomed to Wall Street terminal density.",
    layoutDescription:
      "Ultra-dense, zero-rounded-corner HTML tables styled in classic dark slate, institutional amber, and sharp cobalt with maximum information per pixel.",
    killerWidget: {
      name: "Macroeconomic Event Overlays & High-Density Tables",
      description:
        "Direct overlays of CPI, FOMC, and Non-Farm Payrolls announcement markers onto execution tick markers with institutional data tables.",
      badge: "INSTITUTIONAL DENSITY",
      simulationType: "bloomberg-macro",
    },
    recommendedTier: "pro",
    tags: ["#bloomberg-style", "#macro-calendar", "#maximum-density", "#wall-street"],
    specs: {
      latencyRequirement: "Zero-latency virtualized table rendering (10,000+ rows)",
      keyMetrics: ["Fed Funds Delta", "Implied Volatility Index", "Sector Correlation", "Beta to SPX"],
      alertVectors: ["High-Impact Macro Event Imminent", "Fed Policy Deviation", "Liquidity Gap"],
    },
    summary:
      "Maximum information density with zero fluff, designed for Wall Street veterans who expect the rigorous layout of a trading floor terminal.",
  },

  // ==========================================
  // SPECIALIZED UTILITY ARCHETYPES (17 - 20)
  // ==========================================
  {
    id: "social-copy-trade-leaderboard",
    number: "17",
    title: "The Social Copy-Trade Leaderboard",
    category: "specialized-utility",
    categoryLabel: "Specialized Utility",
    targetAudience: "Quant influencers and signal providers monetizing their bot strategies with public followers.",
    layoutDescription:
      "Centred around Assets Under Management (AUM), subscriber follower counts, performance fees accrued, and multi-tenant signal dispatch queues.",
    killerWidget: {
      name: "Watermarked Social Share Card & Whop QR Generator",
      description:
        "One-click dynamic generator creating high-res Twitter/Instagram performance proof cards embedded with a verified QR code linking to the creator's Whop checkout.",
      badge: "SHARE CARD GENERATOR",
      simulationType: "social-sharecard",
    },
    recommendedTier: "pro",
    tags: ["#copy-trading", "#whop-monetization", "#social-proof", "#viral-marketing"],
    specs: {
      latencyRequirement: "Synchronized multi-account order mirror < 50ms",
      keyMetrics: ["Total Copy AUM", "Active Subscribers", "Performance Fee Pool", "Strategy Sharpe"],
      alertVectors: ["Follower Slippage Drift", "Subscriber Cap Reached", "Payout Available"],
    },
    summary:
      "Empowers bot creators to market their automated edge socially with instant, verifiable performance cards that drive new Whop memberships.",
  },
  {
    id: "sentiment-nlp-headline-dashboard",
    number: "18",
    title: "The Sentiment & NLP Headline Dashboard",
    category: "specialized-utility",
    categoryLabel: "Specialized Utility",
    targetAudience: "News-trading bots and social sentiment algorithms scraping Twitter/X, Bloomberg, and SEC filings.",
    layoutDescription:
      "Multi-column real-time feed resembling TweetDeck, color-coding incoming news bulletins by algorithmic sentiment score and topic clusters.",
    killerWidget: {
      name: "Real-Time NLP Fear/Greed Meter & Execution Triggers",
      description:
        "Real-time sentiment polarity meter with inline execution flags pinpointing the exact news headline that triggered an algorithmic long or short.",
      badge: "NLP SENTIMENT RADAR",
      simulationType: "nlp-sentiment",
    },
    recommendedTier: "pro",
    tags: ["#nlp-sentiment", "#news-trading", "#twitter-scraping", "#headline-triggers"],
    specs: {
      latencyRequirement: "Headline ingestion to NLP classification < 200ms",
      keyMetrics: ["Sentiment Polarity Score", "Headline Velocity / min", "Key Topic Heatmap", "News Impact Alpha"],
      alertVectors: ["Breaking High-Impact News", "Extreme Sentiment Surge", "Fake News Filter Alert"],
    },
    summary:
      "Connects natural language processing pipelines directly to market execution, showing exactly why an AI bot made a move based on breaking news.",
  },
  {
    id: "mobile-pager-remote-control",
    number: "19",
    title: "The Mobile 'Pager' Remote Control",
    category: "specialized-utility",
    categoryLabel: "Specialized Utility",
    targetAudience: "On-the-go algorithmic operators who need emergency intervention access from their phone.",
    layoutDescription:
      "100% thumb-optimized vertical mobile layout featuring haptic-ready swipeable cards and critical position metrics with zero horizontal scrolling.",
    killerWidget: {
      name: "Swipeable Emergency Action Cards",
      description:
        "Push-card interface where an anomalous position triggers a card: swipe right to close at market, swipe left to widen stop, or hold to kill instance.",
      badge: "SWIPEABLE ACTIONS",
      simulationType: "mobile-pager",
    },
    recommendedTier: "pro",
    tags: ["#mobile-first", "#remote-kill", "#swipe-actions", "#push-intervene"],
    specs: {
      latencyRequirement: "Mobile WebSocket with cellular reconnection recovery",
      keyMetrics: ["Active Positions", "Risk at Stake", "Heartbeat Ping", "Emergency Action Status"],
      alertVectors: ["Position Drawdown Threshold", "Bot Stalled Notification", "API Reconnect Required"],
    },
    summary:
      "Gives automated traders peace of mind when stepping away from the desk, providing immediate swipe-to-kill intervention from any mobile browser.",
  },
  {
    id: "drag-and-drop-modular-grid",
    number: "20",
    title: "The 'Drag & Drop' Modular Power Grid",
    category: "specialized-utility",
    categoryLabel: "Specialized Utility",
    targetAudience: "The ultimate power user seeking a bespoke trading cockpit tailored to their exact multi-monitor setup.",
    layoutDescription:
      "Completely customizable CSS/Canvas grid system allowing traders to drag, resize, dock, and split widgets across single or multi-monitor configurations.",
    killerWidget: {
      name: "Interactive Workspace Canvas & LocalStorage Presets",
      description:
        "Allows operators to rearrange orderbooks, ledgers, and telemetry gauges into infinite configurations, with one-click export/import JSON presets.",
      badge: "MODULAR CANVAS",
      simulationType: "modular-grid",
    },
    recommendedTier: "pro",
    tags: ["#drag-drop", "#modular-grid", "#multi-monitor", "#power-customization"],
    specs: {
      latencyRequirement: "Zero-lag re-flow on layout resize",
      keyMetrics: ["Active Docked Widgets", "Canvas Layout ID", "Monitor Workspace Count", "Memory Footprint"],
      alertVectors: ["Layout Unsaved Warning", "Screen Resolution Discrepancy", "Widget Dock Conflict"],
    },
    summary:
      "StratDesk's crown jewel: an infinitely configurable modular cockpit enabling quants to design, save, and share their ultimate command center.",
  },
];
