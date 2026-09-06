export interface TradeTelemetry {
  zScore: number;
  signalConfidence: number; // e.g. 0.94
  executionLatencyMs: number; // e.g. 1.4ms
  bookDepthRatio: number; // e.g. 2.1x
}

export interface TradeLedgerEntry {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  leverage: string;
  strategy: string;
  marketRegime: string;
  entryPrice: number;
  exitPrice: number;
  size: string;
  notionalValue: number;
  entryTime: string;
  exitTime: string;
  duration: string;
  pnl: number;
  pnlPercent: number;
  rMultiple: number; // in R units (e.g. +3.2, -1.0)
  fees: number; // negative for cost, positive for maker rebate
  slippage: string;
  orderType: "LIMIT_MAKER" | "IOC_CROSS" | "TWAP";
  status: "CLOSED" | "OPEN";
  tags: string[];
  notes: string;
  telemetry: TradeTelemetry;
}

export interface LedgerMacroMetrics {
  totalPnl: number;
  totalPnlFormatted: string;
  totalPnlPercent: string;
  winRate: number;
  winRateFormatted: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  profitFactor: number;
  maxDrawdown: string;
  avgTrade: number;
  avgTradeFormatted: string;
  avgWin: number;
  avgWinFormatted: string;
  avgLoss: number;
  avgLossFormatted: string;
  largestWin: number;
  largestWinFormatted: string;
  largestLoss: number;
  largestLossFormatted: string;
  expectancy: string;
  sharpeRatio: number;
}

export interface PeriodicMetric {
  period: string;
  pnl: number;
  trades: number;
  winRate: number;
  isPositive: boolean;
}

export interface LedgerEquityPoint {
  tradeIndex: number;
  tradeId: string;
  cumulativePnl: number;
  symbol: string;
  pnl: number;
}

export const LEDGER_MACRO_METRICS: LedgerMacroMetrics = {
  totalPnl: 18429.5,
  totalPnlFormatted: "+$18,429.50",
  totalPnlPercent: "+24.8%",
  winRate: 68.3,
  winRateFormatted: "68.3%",
  totalTrades: 142,
  winningTrades: 97,
  losingTrades: 45,
  profitFactor: 2.42,
  maxDrawdown: "4.12%",
  avgTrade: 129.78,
  avgTradeFormatted: "+$129.78",
  avgWin: 342.1,
  avgWinFormatted: "+$342.10",
  avgLoss: -164.5,
  avgLossFormatted: "-$164.50",
  largestWin: 2480.0,
  largestWinFormatted: "+$2,480.00",
  largestLoss: -580.0,
  largestLossFormatted: "-$580.00",
  expectancy: "+$184.20 / trade",
  sharpeRatio: 2.84,
};

export const PERIODIC_PERFORMANCE: Record<"daily" | "weekly" | "monthly", PeriodicMetric[]> = {
  daily: [
    { period: "Mon (Sep 01)", pnl: 2840.2, trades: 18, winRate: 72.2, isPositive: true },
    { period: "Tue (Sep 02)", pnl: -620.5, trades: 14, winRate: 50.0, isPositive: false },
    { period: "Wed (Sep 03)", pnl: 4120.8, trades: 22, winRate: 81.8, isPositive: true },
    { period: "Thu (Sep 04)", pnl: 1950.4, trades: 16, winRate: 68.7, isPositive: true },
    { period: "Fri (Sep 05)", pnl: 3410.0, trades: 20, winRate: 75.0, isPositive: true },
    { period: "Sat (Sep 06)", pnl: 890.1, trades: 11, winRate: 63.6, isPositive: true },
    { period: "Sun (Sep 07)", pnl: 1280.5, trades: 12, winRate: 66.7, isPositive: true },
  ],
  weekly: [
    { period: "Week 33 (Aug 11 - 17)", pnl: 3210.4, trades: 31, winRate: 64.5, isPositive: true },
    { period: "Week 34 (Aug 18 - 24)", pnl: 4890.2, trades: 38, winRate: 71.1, isPositive: true },
    { period: "Week 35 (Aug 25 - 31)", pnl: 2150.0, trades: 29, winRate: 62.0, isPositive: true },
    { period: "Week 36 (Sep 01 - 07)", pnl: 8178.9, trades: 44, winRate: 72.7, isPositive: true },
  ],
  monthly: [
    { period: "June 2026", pnl: 4890.0, trades: 84, winRate: 63.1, isPositive: true },
    { period: "July 2026", pnl: 6420.5, trades: 112, winRate: 66.9, isPositive: true },
    { period: "August 2026", pnl: 9240.2, trades: 128, winRate: 70.3, isPositive: true },
    { period: "September 2026 (MTD)", pnl: 8178.9, trades: 44, winRate: 72.7, isPositive: true },
  ],
};

export const LEDGER_EQUITY_CURVE: LedgerEquityPoint[] = [
  { tradeIndex: 1, tradeId: "TRD-001", cumulativePnl: 450, symbol: "BTC-PERP", pnl: 450 },
  { tradeIndex: 2, tradeId: "TRD-002", cumulativePnl: 1120, symbol: "ETH-PERP", pnl: 670 },
  { tradeIndex: 3, tradeId: "TRD-003", cumulativePnl: 940, symbol: "SOL-PERP", pnl: -180 },
  { tradeIndex: 4, tradeId: "TRD-004", cumulativePnl: 1820, symbol: "BTC-PERP", pnl: 880 },
  { tradeIndex: 5, tradeId: "TRD-005", cumulativePnl: 2450, symbol: "AVAX-PERP", pnl: 630 },
  { tradeIndex: 6, tradeId: "TRD-006", cumulativePnl: 2120, symbol: "LINK-PERP", pnl: -330 },
  { tradeIndex: 7, tradeId: "TRD-007", cumulativePnl: 3410, symbol: "NQ-FUT", pnl: 1290 },
  { tradeIndex: 8, tradeId: "TRD-008", cumulativePnl: 4280, symbol: "ETH-PERP", pnl: 870 },
  { tradeIndex: 9, tradeId: "TRD-009", cumulativePnl: 3950, symbol: "SOL-PERP", pnl: -330 },
  { tradeIndex: 10, tradeId: "TRD-010", cumulativePnl: 5410, symbol: "BTC-PERP", pnl: 1460 },
  { tradeIndex: 11, tradeId: "TRD-011", cumulativePnl: 6890, symbol: "BTC-PERP", pnl: 1480 },
  { tradeIndex: 12, tradeId: "TRD-012", cumulativePnl: 7420, symbol: "ETH-PERP", pnl: 530 },
  { tradeIndex: 13, tradeId: "TRD-013", cumulativePnl: 7180, symbol: "AVAX-PERP", pnl: -240 },
  { tradeIndex: 14, tradeId: "TRD-014", cumulativePnl: 8940, symbol: "SOL-PERP", pnl: 1760 },
  { tradeIndex: 15, tradeId: "TRD-015", cumulativePnl: 10420, symbol: "NQ-FUT", pnl: 1480 },
  { tradeIndex: 16, tradeId: "TRD-016", cumulativePnl: 11890, symbol: "BTC-PERP", pnl: 1470 },
  { tradeIndex: 17, tradeId: "TRD-017", cumulativePnl: 11410, symbol: "ETH-PERP", pnl: -480 },
  { tradeIndex: 18, tradeId: "TRD-018", cumulativePnl: 13240, symbol: "BTC-PERP", pnl: 1830 },
  { tradeIndex: 19, tradeId: "TRD-019", cumulativePnl: 14680, symbol: "SOL-PERP", pnl: 1440 },
  { tradeIndex: 20, tradeId: "TRD-020", cumulativePnl: 16120, symbol: "AVAX-PERP", pnl: 1440 },
  { tradeIndex: 21, tradeId: "TRD-021", cumulativePnl: 15840, symbol: "LINK-PERP", pnl: -280 },
  { tradeIndex: 22, tradeId: "TRD-022", cumulativePnl: 18429.5, symbol: "BTC-PERP", pnl: 2589.5 },
];

export const DEMO_TRADE_LEDGER: TradeLedgerEntry[] = [
  {
    id: "TRD-2026-0907-142",
    symbol: "BTC-PERP",
    direction: "LONG",
    leverage: "5x",
    strategy: "Spread Arbitrage",
    marketRegime: "Bullish Trend",
    entryPrice: 62450.0,
    exitPrice: 63890.0,
    size: "1.80 BTC",
    notionalValue: 112410.0,
    entryTime: "2026-09-07 14:12:04",
    exitTime: "2026-09-07 17:48:32",
    duration: "3h 36m",
    pnl: 2589.5,
    pnlPercent: 11.52,
    rMultiple: 3.8,
    fees: 14.8, // positive rebate
    slippage: "+0.1 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#orderbook-skew", "#passive-maker", "#trailing-tp"],
    notes:
      "Captured cross-venue funding disparity after 2.4x bid imbalance. Scale-in executed passively via post-only maker orders. Trailing take-profit hit at dynamic ATR band.",
    telemetry: {
      zScore: 2.84,
      signalConfidence: 0.94,
      executionLatencyMs: 1.2,
      bookDepthRatio: 2.4,
    },
  },
  {
    id: "TRD-2026-0907-141",
    symbol: "SOL-PERP",
    direction: "LONG",
    leverage: "3x",
    strategy: "Trend Volatility",
    marketRegime: "High Volatility",
    entryPrice: 142.1,
    exitPrice: 148.8,
    size: "220 SOL",
    notionalValue: 31262.0,
    entryTime: "2026-09-07 11:24:19",
    exitTime: "2026-09-07 13:08:44",
    duration: "1h 44m",
    pnl: 1440.0,
    pnlPercent: 14.14,
    rMultiple: 2.9,
    fees: -4.2,
    slippage: "-0.2 bps",
    orderType: "IOC_CROSS",
    status: "CLOSED",
    tags: ["#breakout-continuation", "#liquidity-absorption", "#momentum"],
    notes:
      "Broke out of Asian range consolidation with expanding volume delta. Momentum score cleared threshold 0.88. Stopped out at target liquidity pool.",
    telemetry: {
      zScore: 2.12,
      signalConfidence: 0.91,
      executionLatencyMs: 1.8,
      bookDepthRatio: 1.9,
    },
  },
  {
    id: "TRD-2026-0907-140",
    symbol: "LINK-PERP",
    direction: "SHORT",
    leverage: "5x",
    strategy: "Mean Reversion",
    marketRegime: "Range Compression",
    entryPrice: 12.84,
    exitPrice: 12.98,
    size: "2000 LINK",
    notionalValue: 25680.0,
    entryTime: "2026-09-07 09:15:30",
    exitTime: "2026-09-07 09:48:12",
    duration: "32m 42s",
    pnl: -280.0,
    pnlPercent: -5.45,
    rMultiple: -1.0,
    fees: -3.8,
    slippage: "0.0 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#failed-reversion", "#stop-loss-disciplined", "#range-break"],
    notes:
      "Statistical Z-score reversal faded at 2.2-sigma upper Bollinger band. Upward continuation broke supply shelf, triggering hard stop loss with zero slippage.",
    telemetry: {
      zScore: 2.21,
      signalConfidence: 0.76,
      executionLatencyMs: 2.1,
      bookDepthRatio: 1.1,
    },
  },
  {
    id: "TRD-2026-0906-139",
    symbol: "ETH-PERP",
    direction: "LONG",
    leverage: "4x",
    strategy: "Spread Arbitrage",
    marketRegime: "Bullish Trend",
    entryPrice: 2420.0,
    exitPrice: 2478.5,
    size: "25.0 ETH",
    notionalValue: 60500.0,
    entryTime: "2026-09-06 18:04:10",
    exitTime: "2026-09-06 21:32:00",
    duration: "3h 27m",
    pnl: 1462.5,
    pnlPercent: 9.67,
    rMultiple: 3.1,
    fees: 8.4,
    slippage: "+0.3 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#funding-capture", "#passive-maker", "#multi-leg"],
    notes:
      "Synthetically hedged spot/perp basis dislocation. Captured positive 8.4 bps maker rebate during block order fill auction.",
    telemetry: {
      zScore: 3.05,
      signalConfidence: 0.96,
      executionLatencyMs: 0.9,
      bookDepthRatio: 2.8,
    },
  },
  {
    id: "TRD-2026-0906-138",
    symbol: "NQ-FUT",
    direction: "LONG",
    leverage: "2x",
    strategy: "Trend Volatility",
    marketRegime: "High Volatility",
    entryPrice: 19480.0,
    exitPrice: 19628.0,
    size: "2 Contracts",
    notionalValue: 77920.0,
    entryTime: "2026-09-06 15:30:00",
    exitTime: "2026-09-06 16:54:15",
    duration: "1h 24m",
    pnl: 1480.0,
    pnlPercent: 7.6,
    rMultiple: 2.8,
    fees: -8.0,
    slippage: "-0.5 bps",
    orderType: "IOC_CROSS",
    status: "CLOSED",
    tags: ["#ny-open-auction", "#gamma-squeeze", "#vol-expansion"],
    notes:
      "NY cash open momentum sweep. Algorithmic trigger fired after initial 15-minute opening range high was reclaimed with aggressive ask-eating delta.",
    telemetry: {
      zScore: 2.65,
      signalConfidence: 0.92,
      executionLatencyMs: 1.1,
      bookDepthRatio: 2.2,
    },
  },
  {
    id: "TRD-2026-0905-137",
    symbol: "AVAX-PERP",
    direction: "LONG",
    leverage: "5x",
    strategy: "Orderbook Imbalance",
    marketRegime: "Liquidity Hunt",
    entryPrice: 22.4,
    exitPrice: 23.84,
    size: "1000 AVAX",
    notionalValue: 22400.0,
    entryTime: "2026-09-05 10:14:02",
    exitTime: "2026-09-05 12:40:19",
    duration: "2h 26m",
    pnl: 1440.0,
    pnlPercent: 32.14,
    rMultiple: 4.5,
    fees: 5.2,
    slippage: "+0.2 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#liquidity-flush", "#imbalance-ratio", "#asymmetric-r"],
    notes:
      "Front-ran cascade liquidation cluster on isolated margin venue. Filled entire tier via passive limit ladder below support, then scaled out into high liquidity bid wall.",
    telemetry: {
      zScore: 3.14,
      signalConfidence: 0.98,
      executionLatencyMs: 0.8,
      bookDepthRatio: 3.4,
    },
  },
  {
    id: "TRD-2026-0905-136",
    symbol: "BTC-PERP",
    direction: "SHORT",
    leverage: "5x",
    strategy: "Mean Reversion",
    marketRegime: "Range Compression",
    entryPrice: 63840.0,
    exitPrice: 63280.0,
    size: "2.50 BTC",
    notionalValue: 159600.0,
    entryTime: "2026-09-05 04:12:30",
    exitTime: "2026-09-05 06:05:44",
    duration: "1h 53m",
    pnl: 1400.0,
    pnlPercent: 4.39,
    rMultiple: 2.4,
    fees: 18.2,
    slippage: "+0.1 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#asian-range-fade", "#zscore-fade", "#vwap-anchor"],
    notes:
      "Mean reversion short at upper value area boundary. Zero slippage achieved through algorithmic passive quoting engine.",
    telemetry: {
      zScore: 2.42,
      signalConfidence: 0.89,
      executionLatencyMs: 1.4,
      bookDepthRatio: 1.8,
    },
  },
  {
    id: "TRD-2026-0904-135",
    symbol: "ETH-PERP",
    direction: "SHORT",
    leverage: "4x",
    strategy: "Orderbook Imbalance",
    marketRegime: "High Volatility",
    entryPrice: 2490.0,
    exitPrice: 2538.0,
    size: "10.0 ETH",
    notionalValue: 24900.0,
    entryTime: "2026-09-04 14:02:11",
    exitTime: "2026-09-04 14:26:00",
    duration: "23m 49s",
    pnl: -480.0,
    pnlPercent: -7.71,
    rMultiple: -1.0,
    fees: -4.5,
    slippage: "-0.8 bps",
    orderType: "IOC_CROSS",
    status: "CLOSED",
    tags: ["#stop-out", "#volatility-whipsaw", "#quick-cut"],
    notes:
      "Attempted breakdown short aborted after CPI print volatility sweep caused sudden 48-point bid reclaim. Risk circuit breaker halted trade cleanly at -1R.",
    telemetry: {
      zScore: 1.89,
      signalConfidence: 0.72,
      executionLatencyMs: 2.4,
      bookDepthRatio: 1.2,
    },
  },
  {
    id: "TRD-2026-0904-134",
    symbol: "BTC-PERP",
    direction: "LONG",
    leverage: "5x",
    strategy: "Trend Volatility",
    marketRegime: "Bullish Trend",
    entryPrice: 61890.0,
    exitPrice: 63720.0,
    size: "1.00 BTC",
    notionalValue: 61890.0,
    entryTime: "2026-09-04 08:30:19",
    exitTime: "2026-09-04 13:45:00",
    duration: "5h 14m",
    pnl: 1830.0,
    pnlPercent: 14.78,
    rMultiple: 3.5,
    fees: 6.8,
    slippage: "+0.1 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#trend-expansion", "#trailing-pivot", "#clean-fill"],
    notes:
      "London session trend continuation. Held smoothly throughout European market hours. Partial exits executed at R1, R2, and final trailing runner closed at R3.5.",
    telemetry: {
      zScore: 2.92,
      signalConfidence: 0.95,
      executionLatencyMs: 1.0,
      bookDepthRatio: 2.6,
    },
  },
  {
    id: "TRD-2026-0903-133",
    symbol: "SOL-PERP",
    direction: "LONG",
    leverage: "3x",
    strategy: "Spread Arbitrage",
    marketRegime: "Mean Reverting",
    entryPrice: 136.4,
    exitPrice: 144.1,
    size: "200 SOL",
    notionalValue: 27280.0,
    entryTime: "2026-09-03 16:10:00",
    exitTime: "2026-09-03 19:22:15",
    duration: "3h 12m",
    pnl: 1540.0,
    pnlPercent: 16.93,
    rMultiple: 3.2,
    fees: 7.2,
    slippage: "+0.2 bps",
    orderType: "LIMIT_MAKER",
    status: "CLOSED",
    tags: ["#basis-trade", "#positive-carry", "#maker-rebate"],
    notes:
      "Extreme basis discount captured across perpetual funding interval. Positive carry accrued throughout the holding duration.",
    telemetry: {
      zScore: 2.78,
      signalConfidence: 0.93,
      executionLatencyMs: 1.1,
      bookDepthRatio: 2.5,
    },
  },
];
