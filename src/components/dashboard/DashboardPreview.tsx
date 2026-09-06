import React, { useState } from "react";
import { THEMES } from "@/data/themes";
import { DEMO_METRICS } from "@/data/demo-data";
import { ARCHITECTURES_DATA, ArchitectureBlueprint } from "@/data/architectures-data";
import { KillerWidgetSimulator } from "@/components/architectures/KillerWidgetSimulator";
import { BlueprintSpecHud } from "@/components/architectures/BlueprintSpecHud";
import { MetricCard } from "./MetricCard";
import { EquityChart } from "./EquityChart";
import { PositionsTable } from "./PositionsTable";
import { ExecutionLogs } from "./ExecutionLogs";
import { ControlBar } from "./ControlBar";
import { TradeLedger } from "@/components/ledger/TradeLedger";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "@/hooks/useTheme";
import { AlgorbSymbol } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Activity, ShieldAlert, Cpu, Wifi, Power, BookOpen, Zap, Terminal, Layers, Clock } from "lucide-react";

export interface DashboardPreviewProps {
  product?: "view" | "control";
  theme?: "terminal" | "obsidian" | "quant" | "command" | "vector" | "light";
  className?: string;
  isHero?: boolean;
  initialControlTab?: "hud" | "ledger";
  archetypeId?: string;
  showThemeSwitcher?: boolean;
}

const ARCHETYPE_ALIAS_MAP: Record<string, string> = {
  "prop-firm": "prop-firm-evaluator-console",
  "crypto-arbitrage": "crypto-arbitrage-matrix",
  "stat-arb": "pair-trading-statarb-console",
  "dex-sniper": "on-chain-dex-sniper",
  "raw-cli": "raw-developer-terminal-cli",
  "cro-redline": "chief-risk-officer-red-line",
  "options-cockpit": "options-volatility-surface",
};

const INTERACTIVE_SIMULATOR_IDS = new Set([
  "prop-firm-evaluator-console",
  "crypto-arbitrage-matrix",
  "pair-trading-statarb-console",
  "on-chain-dex-sniper",
  "raw-developer-terminal-cli",
  "chief-risk-officer-red-line",
  "options-volatility-surface",
]);

function getArchetypeTelemetry(
  canonicalId: string,
  blueprint: ArchitectureBlueprint | null | undefined,
  isLight: boolean
) {
  switch (canonicalId) {
    case "crypto-arbitrage-matrix":
      return {
        status: "2 VENUES LIVE",
        metric1Icon: <Wifi className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />,
        metric1Text: "1.1ms BINANCE / 1.4ms BYBIT",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "DUAL-SOCKET ARB",
        badgeText: "ARB-V3 / SUB-MS",
      };
    case "prop-firm-evaluator-console":
      return {
        status: "COMPLIANCE OK",
        metric1Icon: <ShieldAlert className={cn("w-3 h-3", isLight ? "text-amber-600" : "text-warning")} />,
        metric1Text: "$3,150 CUSHION REMAINING",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "FTMO $5K LOSS CEIL",
        badgeText: "HALO-LOCK v2.1",
      };
    case "pair-trading-statarb-console":
      return {
        status: "Z-SCORE +2.18σ",
        metric1Icon: <Activity className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />,
        metric1Text: "0.8ms ATOMIC DISPATCH",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "BTC/ETH COINTEGRATED",
        badgeText: "STATARB-KALMAN v4.0",
      };
    case "on-chain-dex-sniper":
      return {
        status: "MEMPOOL SCANNING",
        metric1Icon: <Zap className={cn("w-3 h-3", isLight ? "text-amber-600" : "text-warning")} />,
        metric1Text: "32 GWEI • 380ms BLOCK",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "HONEYPOT GUARD 100/100",
        badgeText: "JITO-FAST v1.8",
      };
    case "raw-developer-terminal-cli":
      return {
        status: "CLI TTY ACTIVE",
        metric1Icon: <Terminal className={cn("w-3 h-3", isLight ? "text-slate-700" : "text-accent")} />,
        metric1Text: "4.2k LINES • 0.4ms IPC",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "HEADLESS DAEMON",
        badgeText: "C-SHM-PTY v1.0",
      };
    case "chief-risk-officer-red-line":
      return {
        status: "RED-LINE ARMED",
        metric1Icon: <ShieldAlert className={cn("w-3 h-3", isLight ? "text-red-600" : "text-danger")} />,
        metric1Text: "99% VaR: $842.10 (3.4%)",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "5 BOTS POOLED",
        badgeText: "KILL-SWITCH ARMED",
      };
    case "options-volatility-surface":
      return {
        status: "DELTA-NEUTRAL",
        metric1Icon: <Activity className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />,
        metric1Text: "Δ: +0.08 • Γ: +0.42",
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: "120Hz BLACK-SCHOLES",
        badgeText: "VOL-GREEKS v2.4",
      };
    default:
      if (blueprint) {
        return {
          status: `${blueprint.killerWidget.badge} ACTIVE`,
          metric1Icon: <Clock className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />,
          metric1Text: blueprint.specs.latencyRequirement.split("/")[0],
          metric2Icon: <Cpu className="w-3 h-3" />,
          metric2Text: blueprint.categoryLabel.toUpperCase(),
          badgeText: `PRESET #${blueprint.number}`,
        };
      }
      return {
        status: `BOT: ${DEMO_METRICS.botStatus}`,
        metric1Icon: <Wifi className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />,
        metric1Text: `${DEMO_METRICS.heartbeatMs}ms IPC`,
        metric2Icon: <Cpu className="w-3 h-3" />,
        metric2Text: DEMO_METRICS.environment,
        badgeText: DEMO_METRICS.adapterVersion,
      };
  }
}

function getArchetypeMetricCards(canonicalId: string) {
  switch (canonicalId) {
    case "prop-firm-evaluator-console":
      return [
        { label: "EQUITY (NAV)", value: "$102,450.00", delta: "+2.45%", isPositive: true, subtext: "Starting: $100,000" },
        { label: "DAILY P&L", value: "-$1,850.00", delta: "-1.85%", isPositive: false, subtext: "Daily Cap: -$5,000.00" },
        { label: "DRAWDOWN CUSHION", value: "$3,150.00", delta: "63% Buffer", isPositive: true, subtext: "Hard Lockout at -$4.5k" },
        { label: "PROFIT TARGET", value: "$2,450.00", delta: "24.5% Met", isPositive: true, subtext: "Target: $10,000 (10%)" },
        { label: "TRADING DAYS", value: "6 / 4 DAYS", delta: "Passed", isPositive: true, subtext: "Min Required: 4 Days" },
        { label: "COMPLIANCE", value: "SAFE ZONE", badge: "ACTIVE", pulse: true, subtext: "Phase 1 Verified" },
      ];
    case "crypto-arbitrage-matrix":
      return [
        { label: "NET SPREAD", value: "+18.4 BPS", delta: ">10 bps Min", isPositive: true, subtext: "Peak: 24.2 bps" },
        { label: "BINANCE (LEG A)", value: "$68,420.50", delta: "14.8 BTC", isPositive: true, subtext: "Ask: $68,421.20" },
        { label: "BYBIT (LEG B)", value: "$68,340.20", delta: "22.4 BTC", isPositive: true, subtext: "Bid: $68,339.80" },
        { label: "TODAY'S ARB P&L", value: "+$1,842.20", delta: "+14.2%", isPositive: true, subtext: "Maker Rebates: $412" },
        { label: "DUAL PING", value: "1.1ms / 1.4ms", delta: "Sync OK", isPositive: true, subtext: "AWS Tokyo Fastpath" },
        { label: "ARB ENGINE", value: "DUAL-MAKER", badge: "STREAMING", pulse: true, subtext: "Auto-Rebalance On" },
      ];
    case "pair-trading-statarb-console":
      return [
        { label: "SPREAD Z-SCORE", value: "+2.18σ", delta: "Revert Signal", isPositive: false, subtext: "Threshold: ±2.00σ" },
        { label: "PAIR RATIO", value: "0.0542", delta: "Beta: 1.24", isPositive: true, subtext: "BTC / ETH Spread" },
        { label: "HALF-LIFE", value: "14.2 MIN", delta: "Fast Decay", isPositive: true, subtext: "Cointegration p=0.01" },
        { label: "TODAY'S P&L", value: "+$1,420.00", delta: "18 Fills", isPositive: true, subtext: "Mean Reversion Fills" },
        { label: "IPC DISPATCH", value: "0.8ms", delta: "Atomic 2-Leg", isPositive: true, subtext: "Zero Leg Imbalance" },
        { label: "REGIME", value: "MEAN-REV", badge: "ARMED", pulse: true, subtext: "Target: 0.00σ Exit" },
      ];
    case "on-chain-dex-sniper":
      return [
        { label: "MEMPOOL QUEUE", value: "14 TX PEND", delta: "Block #2894", isPositive: true, subtext: "Solana / EVM RPC" },
        { label: "GAS PRIORITY", value: "32 GWEI", delta: "0.005 SOL", isPositive: true, subtext: "Slot Target: #1" },
        { label: "SAFETY AUDIT", value: "100/100", delta: "Passed", isPositive: true, subtext: "Honeypot / Mint Guard" },
        { label: "BLOCK CONFIRM", value: "380ms", delta: "Sub-Second", isPositive: true, subtext: "Jito MEV Stream" },
        { label: "SNIPE PROFIT", value: "+4.82 SOL", delta: "72% Win", isPositive: true, subtext: "5 Tokens Scanned" },
        { label: "SNIPER ENGINE", value: "LISTENING", badge: "ARMED", pulse: true, subtext: "Min Liq: 5.0 SOL" },
      ];
    case "raw-developer-terminal-cli":
      return [
        { label: "STDOUT BUFFER", value: "4,210 LINES", delta: "Ring 100%", isPositive: true, subtext: "115200 Baud PTY" },
        { label: "SHM IPC PING", value: "0.4ms", delta: "Zero-Copy", isPositive: true, subtext: "C Shared Memory" },
        { label: "HEAP ALLOC", value: "18.4 MB", delta: "Zero GC", isPositive: true, subtext: "Resident Set: 24MB" },
        { label: "SESSION P&L", value: "+$2,480.00", delta: "32 Fills", isPositive: true, subtext: "Peak: +$2,510.00" },
        { label: "DISPATCH RATE", value: "2,400 MSG/S", delta: "0% Drops", isPositive: true, subtext: "Pinned Core #4" },
        { label: "CLI RUNTIME", value: "HEADLESS", badge: "DAEMON", pulse: true, subtext: "PID: 49102 Live" },
      ];
    case "chief-risk-officer-red-line":
      return [
        { label: "PORTFOLIO VaR", value: "$842.10 (3.4%)", delta: "99% Conf 1D", isPositive: true, subtext: "Ceiling: 5.00%" },
        { label: "GROSS LEVERAGE", value: "3.2x", delta: "Max 5.0x", isPositive: true, subtext: "Liq Dist: 34%" },
        { label: "FREE MARGIN", value: "65.8%", delta: "Safe Margin", isPositive: true, subtext: "Used: $8,420.00" },
        { label: "ACTIVE BOTS", value: "5 RUNNING", delta: "Reconciled", isPositive: true, subtext: "Binance, Bybit, OKX" },
        { label: "DRAWDOWN CEIL", value: "-4.21%", delta: "Max -10%", isPositive: true, subtext: "Buffer: 5.8%" },
        { label: "RED LINE", value: "ARMED", badge: "RED LINE", pulse: true, subtext: "Slide to Flatten" },
      ];
    case "options-volatility-surface":
      return [
        { label: "PORTFOLIO DELTA", value: "+0.08 Δ", delta: "Neutral", isPositive: true, subtext: "Band: ±0.15" },
        { label: "NET GAMMA", value: "+0.42 Γ", delta: "Pos Gamma", isPositive: true, subtext: "Scalp Trigger: 0.50" },
        { label: "DAILY THETA", value: "+$420.00 Θ", delta: "Harvest", isPositive: true, subtext: "Annual: +$153k" },
        { label: "VEGA EXPOSURE", value: "-$180.00 ν", delta: "Short Vol", isPositive: true, subtext: "Per 1% IV Drop" },
        { label: "IMPLIED VOL", value: "54.2% IV", delta: "Skew +4.2%", isPositive: true, subtext: "HV 30D: 48.0%" },
        { label: "GREEKS ENGINE", value: "ACTIVE", badge: "120Hz", pulse: true, subtext: "Black-Scholes OK" },
      ];
    default:
      return null;
  }
}

function generateMetricValue(metricName: string, index: number): string {
  const lower = metricName.toLowerCase();
  if (lower.includes("bps") || lower.includes("slippage") || lower.includes("spread")) return "+14.2 bps";
  if (lower.includes("sharpe")) return "2.84";
  if (lower.includes("sortino")) return "3.42";
  if (lower.includes("confidence") || lower.includes("%") || lower.includes("rate") || lower.includes("ratio") || lower.includes("fill")) return "94.6%";
  if (lower.includes("pnl") || lower.includes("dollar") || lower.includes("aum") || lower.includes("yield")) return "+$3,420.00";
  if (lower.includes("latency") || lower.includes("ping") || lower.includes("time") || lower.includes("delay")) return "1.2ms";
  if (lower.includes("temp")) return "42.8°C";
  if (lower.includes("entropy") || lower.includes("drift")) return "0.042";
  if (lower.includes("var") || lower.includes("risk")) return "$842.10";
  if (lower.includes("zscore") || lower.includes("sigma") || lower.includes("z-score")) return "+2.18σ";
  if (lower.includes("loss")) return "-$140.20";
  if (lower.includes("depth") || lower.includes("multiplier") || lower.includes("imbalance") || lower.includes("leverage")) return "3.2x";
  if (lower.includes("queue") || lower.includes("trades") || lower.includes("lines")) return "4,210";
  return index === 0 ? "OPTIMAL" : index === 1 ? "+2.4%" : index === 2 ? "NOMINAL" : "IN SPEC";
}

function getDynamicArchetypeCards(blueprint: ArchitectureBlueprint) {
  const custom = getArchetypeMetricCards(blueprint.id);
  if (custom) return custom;

  const metrics = blueprint.specs.keyMetrics;
  return [
    {
      label: (metrics[0] || "PRIMARY METRIC").toUpperCase(),
      value: generateMetricValue(metrics[0] || "", 0),
      delta: "+1.8%",
      isPositive: true,
      subtext: "Target: Nominal",
    },
    {
      label: (metrics[1] || "SECONDARY METRIC").toUpperCase(),
      value: generateMetricValue(metrics[1] || "", 1),
      delta: "Active",
      isPositive: true,
      subtext: "Optimal Band",
    },
    {
      label: (metrics[2] || "SYSTEM EFFICIENCY").toUpperCase(),
      value: generateMetricValue(metrics[2] || "", 2),
      delta: "In Spec",
      isPositive: true,
      subtext: blueprint.specs.latencyRequirement.split("/")[0],
    },
    {
      label: (metrics[3] || "EXECUTION STATE").toUpperCase(),
      value: generateMetricValue(metrics[3] || "", 3),
      delta: "Nominal",
      isPositive: true,
      subtext: "Live Feed",
    },
    {
      label: "LATENCY BUDGET",
      value: blueprint.specs.latencyRequirement.split("/")[0] || "< 5ms",
      delta: "Verified",
      isPositive: true,
      subtext: "Local IPC",
    },
    {
      label: "ARCHETYPE TIER",
      value: blueprint.recommendedTier === "control" ? "CONTROL" : "VIEW",
      badge: blueprint.killerWidget.badge,
      pulse: true,
      subtext: `Preset #${blueprint.number}`,
    },
  ];
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  product = "view",
  theme: propTheme,
  className,
  isHero = false,
  initialControlTab = "hud",
  archetypeId = "default",
  showThemeSwitcher = true,
}) => {
  const [controlView, setControlView] = useState<"hud" | "ledger">(initialControlTab);
  const { theme: hookTheme } = useTheme();
  const activeThemeId = propTheme || hookTheme;
  const activeTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];
  const theme = activeTheme.id;
  const isLight = theme === "light";

  const canonicalArchetypeId = ARCHETYPE_ALIAS_MAP[archetypeId] || archetypeId;
  const activeBlueprint = ARCHITECTURES_DATA.find(
    (b) => b.id === canonicalArchetypeId || b.id === archetypeId
  );
  const isArchetypeActive = Boolean(activeBlueprint && archetypeId !== "default");
  const hasInteractiveSimulator = INTERACTIVE_SIMULATOR_IDS.has(canonicalArchetypeId);

  const themeStyle = {
    "--theme-bg": activeTheme.colors.bg,
    "--theme-surface": activeTheme.colors.surface,
    "--theme-border": activeTheme.colors.border,
    "--theme-accent": activeTheme.colors.accent,
    "--theme-text": activeTheme.colors.text,
    "--theme-muted": activeTheme.colors.muted,
  } as React.CSSProperties;

  const telemetry = getArchetypeTelemetry(canonicalArchetypeId, activeBlueprint, isLight);
  const archetypeMetricCards = activeBlueprint ? getDynamicArchetypeCards(activeBlueprint) : null;

  return (
    <div
      data-dashboard="true"
      style={themeStyle}
      className={cn(
        "relative rounded-xl border transition-all duration-300 overflow-hidden shadow-2xl font-mono",
        isHero ? (isLight ? "ring-1 ring-slate-300 shadow-xl" : "shadow-surface ring-1 ring-white/10") : "",
        isLight ? "border-slate-300 shadow-xl" : "",
        className
      )}
    >
      {/* Outer Shell Background & Border */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-300"
        style={{
          backgroundColor: activeTheme.colors.bg,
          borderColor: isLight ? "#cbd5e1" : activeTheme.colors.border,
        }}
      />

      {/* Terminal CRT Scanline Overlay for 'terminal' theme */}
      {theme === "terminal" && (
        <div className="absolute inset-0 z-20 pointer-events-none scanline-overlay opacity-30" />
      )}

      {/* Outer Content Container */}
      <div className={cn("relative z-10 p-3.5 sm:p-5 flex flex-col gap-4 transition-colors", isLight ? "text-slate-900" : "text-white")}>
        {/* Top Telemetry Chrome / Header */}
        <div className={cn("flex flex-wrap items-center justify-between gap-3 pb-3 border-b", isLight ? "border-slate-200" : "border-white/10")}>
          {/* Left: Product & Brand Identifier */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlgorbSymbol size={22} glow={theme !== "vector" && !isLight} />
              <span className={cn("font-bold tracking-widest text-sm uppercase", isLight ? "text-slate-900" : "text-white")}>
                ALGORB {product === "control" ? "CONTROL" : "VIEW"}
              </span>
            </div>
            <span
              className={cn(
                "px-2 py-0.5 text-[9px] font-bold tracking-wider rounded border uppercase",
                isLight
                  ? "border-sky-300 text-sky-700 bg-sky-50"
                  : "border-[var(--theme-border)] text-[var(--theme-accent)] bg-white/[0.03]"
              )}
            >
              {activeTheme.name}
            </span>
          </div>

          {/* Center/Right: Live System Indicators & Theme Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px]">
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded border",
              isLight ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white/[0.03] border-white/5 text-success"
            )}>
              <span className="relative flex h-2 w-2">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isLight ? "bg-emerald-500" : "bg-success")} />
                <span className={cn("relative inline-flex rounded-full h-2 w-2", isLight ? "bg-emerald-600" : "bg-success")} />
              </span>
              <span className="font-bold">{telemetry.status}</span>
            </div>

            <div className={cn("hidden md:flex items-center gap-1.5", isLight ? "text-slate-600 font-medium" : "text-text-muted")}>
              {telemetry.metric1Icon}
              <span>{telemetry.metric1Text}</span>
            </div>

            <div className={cn("hidden lg:flex items-center gap-1.5", isLight ? "text-slate-600 font-medium" : "text-text-secondary")}>
              {telemetry.metric2Icon}
              <span>{telemetry.metric2Text}</span>
            </div>

            <div className={cn(
              "text-[9px] px-1.5 py-0.5 rounded border font-medium",
              isLight ? "text-slate-700 bg-slate-100 border-slate-200" : "text-text-muted bg-black/20 border-white/5"
            )}>
              {telemetry.badgeText}
            </div>

            {/* Mount interactive ThemeSwitcher */}
            {showThemeSwitcher && (
              <ThemeSwitcher variant="compact" activeThemeId={theme} />
            )}
          </div>
        </div>

        {/* If Control Mode: View Switcher (Live Command HUD vs Audit & Trade Ledger) */}
        {product === "control" && (
          <div className={cn("flex flex-wrap items-center justify-between gap-3 p-1 rounded-lg border", isLight ? "bg-slate-100 border-slate-200" : "bg-surface-elevated/70 border-white/10")}>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setControlView("hud")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 border",
                  controlView === "hud"
                    ? isLight
                      ? "bg-white text-amber-900 border-amber-300 shadow-sm font-extrabold"
                      : "bg-warning text-background border-warning shadow-lg font-extrabold"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900 border-transparent"
                    : "text-text-muted hover:text-white border-transparent"
                )}
              >
                <Power className="w-3.5 h-3.5" />
                <span>COMMAND BUS & HUD</span>
              </button>

              <button
                onClick={() => setControlView("ledger")}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 border",
                  controlView === "ledger"
                    ? isLight
                      ? "bg-white text-sky-800 border-sky-300 shadow-sm font-extrabold"
                      : "bg-accent text-background border-accent shadow-glow-cyan font-extrabold"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900 border-transparent"
                    : "text-text-muted hover:text-white border-transparent"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>AUDIT TRADE LEDGER</span>
                <span className={cn("px-1.5 py-0.2 text-[9px] rounded font-bold", controlView === "ledger" ? (isLight ? "bg-sky-100 text-sky-900" : "bg-black/30 text-background") : "bg-white/10 text-text-secondary")}>
                  142 TRADES
                </span>
              </button>
            </div>

            <span className={cn("text-[10px] hidden md:inline px-2", isLight ? "text-slate-500" : "text-text-muted")}>
              {controlView === "hud" ? "Live Telemetry & Intervention Bus" : "Forensic Execution History & R-Multiples"}
            </span>
          </div>
        )}

        {/* If Control Mode & Ledger Tab Active: Render Full Institutional Trade Ledger */}
        {product === "control" && controlView === "ledger" ? (
          <TradeLedger theme={theme} isLight={isLight} />
        ) : (
          <>
            {/* Metric Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {archetypeMetricCards ? (
                archetypeMetricCards.map((card, idx) => (
                  <MetricCard
                    key={idx}
                    label={card.label}
                    value={card.value}
                    delta={card.delta}
                    isPositive={card.isPositive ?? true}
                    subtext={card.subtext}
                    badge={card.badge}
                    pulse={card.pulse}
                    isLight={isLight}
                  />
                ))
              ) : (
                <>
                  <MetricCard
                    label="EQUITY (NAV)"
                    value={DEMO_METRICS.equityFormatted}
                    delta={DEMO_METRICS.dailyPnlPercent}
                    isPositive={true}
                    subtext="Peak: $25,120.00"
                    isLight={isLight}
                  />
                  <MetricCard
                    label="TODAY'S P&L"
                    value={DEMO_METRICS.dailyPnlFormatted}
                    delta={DEMO_METRICS.dailyPnlPercent}
                    isPositive={true}
                    subtext="Unrealized: +$882"
                    isLight={isLight}
                  />
                  <MetricCard
                    label="TOTAL RETURN"
                    value={DEMO_METRICS.totalReturn}
                    delta="+14.2%"
                    isPositive={true}
                    subtext="Annualized: 210%"
                    isLight={isLight}
                  />
                  <MetricCard
                    label="MAX DRAWDOWN"
                    value={DEMO_METRICS.drawdown}
                    delta="Safe"
                    isPositive={true}
                    subtext={`Ceiling: ${DEMO_METRICS.maxDrawdown}`}
                    isLight={isLight}
                  />
                  <MetricCard
                    label="WIN RATE"
                    value={DEMO_METRICS.winRate}
                    delta="72/100"
                    isPositive={true}
                    subtext={`Profit Factor: ${DEMO_METRICS.profitFactor}`}
                    isLight={isLight}
                  />
                  <MetricCard
                    label="BOT STATUS"
                    value={DEMO_METRICS.botStatus}
                    badge="ACTIVE"
                    pulse={true}
                    subtext={`Uptime: ${DEMO_METRICS.uptime}`}
                    isLight={isLight}
                  />
                </>
              )}
            </div>

            {/* If Control Mode: Render Interactive Control Bus */}
            {product === "control" && <ControlBar isLight={isLight} />}

            {/* Middle Section: Equity Chart & Risk / Allocation Gauges OR Blueprint Spec HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
              {/* Main Interactive Chart OR Killer Widget Simulator OR Blueprint Spec HUD */}
              <div className={cn(
                (hasInteractiveSimulator || !isArchetypeActive) ? "lg:col-span-2" : "lg:col-span-3",
                "p-3 sm:p-4 rounded-lg flex flex-col border transition-colors",
                isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
              )}>
                {isArchetypeActive && activeBlueprint ? (
                  hasInteractiveSimulator ? (
                    <div className="flex flex-col gap-3">
                      <div className={cn(
                        "flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b",
                        isLight ? "border-slate-200" : "border-white/10"
                      )}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                            {activeBlueprint.killerWidget.badge}
                          </span>
                          <span className={cn("text-xs font-bold uppercase", isLight ? "text-slate-900" : "text-white")}>
                            {activeBlueprint.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-muted font-bold font-mono">
                          LIVE INTERACTIVE SIMULATION
                        </span>
                      </div>
                      <KillerWidgetSimulator blueprint={activeBlueprint} isLight={isLight} />
                    </div>
                  ) : (
                    <BlueprintSpecHud blueprint={activeBlueprint} isLight={isLight} />
                  )
                ) : (
                  <EquityChart accentColor={isLight ? "#0284c7" : activeTheme.colors.accent} isLight={isLight} />
                )}
              </div>

              {/* Realtime Risk & Margin Radar (shown when on default HUD or when interactive simulator is active) */}
              {(hasInteractiveSimulator || !isArchetypeActive) && (
                <div className={cn(
                  "p-3.5 sm:p-4 rounded-lg flex flex-col justify-between gap-3 text-xs border transition-colors",
                  isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
                )}>
                  <div className={cn("flex items-center justify-between pb-2 border-b", isLight ? "border-slate-200" : "border-white/5")}>
                    <span className={cn("font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5", isLight ? "text-slate-900" : "text-white")}>
                      <ShieldAlert className={cn("w-3.5 h-3.5", isLight ? "text-amber-600" : "text-warning")} />
                      RISK ALLOCATION
                    </span>
                    <span className={cn("text-[10px]", isLight ? "text-slate-400 font-semibold" : "text-text-muted")}>PARAM LIMITS</span>
                  </div>

                  {/* Gauge 1: Margin Utilization */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className={isLight ? "text-slate-500 font-medium" : "text-text-muted"}>Margin Utilization</span>
                      <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>34.2% / 50.0%</span>
                    </div>
                    <div className={cn("w-full h-2 rounded overflow-hidden", isLight ? "bg-slate-100 border border-slate-200/60" : "bg-white/5")}>
                      <div
                        className="h-full rounded transition-all duration-500"
                        style={{ width: "34.2%", backgroundColor: isLight ? "#0284c7" : activeTheme.colors.accent }}
                      />
                    </div>
                  </div>

                  {/* Gauge 2: Drawdown Tolerance */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className={isLight ? "text-slate-500 font-medium" : "text-text-muted"}>Drawdown Cushion</span>
                      <span className={cn("font-bold", isLight ? "text-emerald-700" : "text-success")}>4.21% / 10.0%</span>
                    </div>
                    <div className={cn("w-full h-2 rounded overflow-hidden", isLight ? "bg-slate-100 border border-slate-200/60" : "bg-white/5")}>
                      <div
                        className={cn("h-full rounded transition-all duration-500", isLight ? "bg-emerald-600" : "bg-success")}
                        style={{ width: "42.1%" }}
                      />
                    </div>
                  </div>

                  {/* Gauge 3: Value at Risk (99% 1D) */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className={isLight ? "text-slate-500 font-medium" : "text-text-muted"}>Value at Risk (99% 1D)</span>
                      <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>$842.10 (3.39%)</span>
                    </div>
                    <div className={cn("w-full h-2 rounded overflow-hidden", isLight ? "bg-slate-100 border border-slate-200/60" : "bg-white/5")}>
                      <div
                        className={cn("h-full rounded transition-all duration-500", isLight ? "bg-amber-500" : "bg-warning")}
                        style={{ width: "28.5%" }}
                      />
                    </div>
                  </div>

                  {/* Strategy Weights Breakdown */}
                  <div className={cn("pt-2 border-t flex items-center justify-between text-[10px]", isLight ? "border-slate-200 text-slate-500" : "border-white/5 text-text-muted")}>
                    <div>
                      <span className={cn("font-bold mr-1", isLight ? "text-slate-900" : "text-white")}>Alpha-V2:</span> 45%
                    </div>
                    <div>
                      <span className={cn("font-bold mr-1", isLight ? "text-slate-900" : "text-white")}>MeanRev:</span> 35%
                    </div>
                    <div>
                      <span className={cn("font-bold mr-1", isLight ? "text-slate-900" : "text-white")}>Arb:</span> 20%
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section: Active Positions Table & Execution Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              <div className={cn(
                "p-3 sm:p-4 rounded-lg border transition-colors",
                isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
              )}>
                <PositionsTable isLight={isLight} />
              </div>

              <div className={cn(
                "p-3 sm:p-4 rounded-lg border transition-colors",
                isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
              )}>
                <ExecutionLogs maxLogs={5} isLight={isLight} />
              </div>
            </div>
          </>
        )}

        {/* Footer Disclaimer Strip */}
        <div className={cn(
          "pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] select-none",
          isLight ? "border-slate-200 text-slate-500" : "border-white/5 text-text-muted"
        )}>
          <div className="flex items-center gap-2">
            <span className={cn("inline-block w-1.5 h-1.5 rounded-full", isLight ? "bg-sky-600" : "bg-accent")} />
            <span>DEMO ENVIRONMENT • LOCAL TELEMETRY MOCK</span>
          </div>
          <span>Algorb Interface Layer v1.0.0 • No live order risk</span>
        </div>
      </div>
    </div>
  );
};
