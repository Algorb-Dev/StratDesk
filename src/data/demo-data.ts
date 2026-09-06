export interface Position {
  id: string;
  symbol: string;
  side: "LONG" | "SHORT";
  size: string;
  entryPrice: number;
  markPrice: number;
  unrealizedPnl: number;
  pnlPercentage: number;
  leverage: string;
  liquidationPrice: number;
  liquidationBuffer: string;
  strategy: string;
}

export interface TradeLog {
  id: string;
  timestamp: string;
  type: "SIGNAL" | "ORDER" | "FILL" | "RISK" | "HEARTBEAT" | "CONTROL";
  level: "info" | "success" | "warning" | "error";
  message: string;
  latencyMs?: number;
}

export interface ChartPoint {
  time: string;
  equity: number;
  benchmark?: number;
}

export const DEMO_METRICS = {
  equity: 24821.64,
  equityFormatted: "$24,821.64",
  dailyPnl: 482.17,
  dailyPnlFormatted: "+$482.17",
  dailyPnlPercent: "+1.98%",
  totalReturn: "+148.2%",
  drawdown: "4.21%",
  maxDrawdown: "6.85%",
  winRate: "72.4%",
  profitFactor: "2.41",
  sharpeRatio: "2.84",
  openPositionsCount: 4,
  activeStrategiesCount: 3,
  botStatus: "RUNNING" as const,
  uptime: "99.98%",
  executionLatencyMs: 14.2,
  heartbeatMs: 12,
  environment: "SELF-HOSTED / VPS-01",
  adapterVersion: "v1.4.2",
  disclaimer: "All data shown is simulated demonstration telemetry.",
};

export const DEMO_POSITIONS: Position[] = [
  {
    id: "pos-1",
    symbol: "BTC-PERP",
    side: "LONG",
    size: "0.85 BTC",
    entryPrice: 62450.0,
    markPrice: 63120.5,
    unrealizedPnl: 569.92,
    pnlPercentage: 1.07,
    leverage: "5x",
    liquidationPrice: 50400.0,
    liquidationBuffer: "20.1%",
    strategy: "Momentum Alpha-V2",
  },
  {
    id: "pos-2",
    symbol: "ETH-PERP",
    side: "LONG",
    size: "6.20 ETH",
    entryPrice: 3390.4,
    markPrice: 3445.8,
    unrealizedPnl: 343.48,
    pnlPercentage: 1.63,
    leverage: "3x",
    liquidationPrice: 2310.0,
    liquidationBuffer: "32.9%",
    strategy: "Mean Reversion IV",
  },
  {
    id: "pos-3",
    symbol: "SOL-PERP",
    side: "SHORT",
    size: "42.0 SOL",
    entryPrice: 154.2,
    markPrice: 151.8,
    unrealizedPnl: 100.8,
    pnlPercentage: 1.55,
    leverage: "2x",
    liquidationPrice: 228.0,
    liquidationBuffer: "50.2%",
    strategy: "Spread Arbitrage",
  },
  {
    id: "pos-4",
    symbol: "AVAX-PERP",
    side: "LONG",
    size: "95.0 AVAX",
    entryPrice: 28.45,
    markPrice: 28.12,
    unrealizedPnl: -31.35,
    pnlPercentage: -1.16,
    leverage: "2x",
    liquidationPrice: 14.5,
    liquidationBuffer: "48.4%",
    strategy: "Momentum Alpha-V2",
  },
];

export const DEMO_LOGS: TradeLog[] = [
  {
    id: "log-1",
    timestamp: "19:42:15.821",
    type: "FILL",
    level: "success",
    message: "Limit fill confirmed: BUY 0.25 BTC-PERP @ $63,118.00 (Maker 0 bps)",
    latencyMs: 11.4,
  },
  {
    id: "log-2",
    timestamp: "19:42:14.310",
    type: "ORDER",
    level: "info",
    message: "Order dispatched to exchange: BUY LIMIT #88491 Post-Only",
    latencyMs: 14.1,
  },
  {
    id: "log-3",
    timestamp: "19:42:13.902",
    type: "RISK",
    level: "info",
    message: "Risk verification passed: Margin utilization 34.2% < max 50%",
    latencyMs: 4.8,
  },
  {
    id: "log-4",
    timestamp: "19:42:12.115",
    type: "SIGNAL",
    level: "info",
    message: "Strategy [Momentum Alpha-V2] generated entry signal score: +0.84",
    latencyMs: 2.1,
  },
  {
    id: "log-5",
    timestamp: "19:42:08.500",
    type: "HEARTBEAT",
    level: "info",
    message: "WebSocket IPC frame synced (tick_drift: 0.8ms, memory: 78.4MB)",
    latencyMs: 12.0,
  },
  {
    id: "log-6",
    timestamp: "19:41:52.412",
    type: "CONTROL",
    level: "info",
    message: "Kill-switch armed: Auto-deleveraging standby threshold at -3.5% intraday",
  },
];

export const TIMEFRAME_CHARTS: Record<string, ChartPoint[]> = {
  "1D": [
    { time: "00:00", equity: 24339 },
    { time: "03:00", equity: 24410 },
    { time: "06:00", equity: 24380 },
    { time: "09:00", equity: 24520 },
    { time: "12:00", equity: 24490 },
    { time: "15:00", equity: 24680 },
    { time: "18:00", equity: 24740 },
    { time: "21:00", equity: 24821 },
  ],
  "1W": [
    { time: "Mon", equity: 23150 },
    { time: "Tue", equity: 23420 },
    { time: "Wed", equity: 23290 },
    { time: "Thu", equity: 23880 },
    { time: "Fri", equity: 24190 },
    { time: "Sat", equity: 24510 },
    { time: "Sun", equity: 24821 },
  ],
  "1M": [
    { time: "Week 1", equity: 20400 },
    { time: "Week 2", equity: 21850 },
    { time: "Week 3", equity: 23200 },
    { time: "Week 4", equity: 24821 },
  ],
  "YTD": [
    { time: "Jan", equity: 10000 },
    { time: "Mar", equity: 13200 },
    { time: "May", equity: 16400 },
    { time: "Jul", equity: 19800 },
    { time: "Sep", equity: 24821 },
  ],
  "ALL": [
    { time: "2024-Q1", equity: 10000 },
    { time: "2024-Q2", equity: 14500 },
    { time: "2024-Q3", equity: 19200 },
    { time: "2024-Q4", equity: 24821 },
  ],
};
