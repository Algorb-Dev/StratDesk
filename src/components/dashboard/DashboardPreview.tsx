"use client";

import React from "react";
import { THEMES } from "@/data/themes";
import { DEMO_METRICS } from "@/data/demo-data";
import { MetricCard } from "./MetricCard";
import { EquityChart } from "./EquityChart";
import { PositionsTable } from "./PositionsTable";
import { ExecutionLogs } from "./ExecutionLogs";
import { ControlBar } from "./ControlBar";
import { AlgorbSymbol } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Activity, ShieldAlert, Cpu, Wifi } from "lucide-react";

export interface DashboardPreviewProps {
  product?: "view" | "control";
  theme?: "terminal" | "obsidian" | "quant" | "command" | "vector" | "light";
  className?: string;
  isHero?: boolean;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  product = "view",
  theme = "obsidian",
  className,
  isHero = false,
}) => {
  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[1]; // fallback to Obsidian
  const isLight = theme === "light";

  const themeStyle = {
    "--theme-bg": activeTheme.colors.bg,
    "--theme-surface": activeTheme.colors.surface,
    "--theme-border": activeTheme.colors.border,
    "--theme-accent": activeTheme.colors.accent,
    "--theme-text": activeTheme.colors.text,
    "--theme-muted": activeTheme.colors.muted,
  } as React.CSSProperties;

  return (
    <div
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

          {/* Center/Right: Live System Indicators */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px]">
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded border",
              isLight ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white/[0.03] border-white/5 text-success"
            )}>
              <span className="relative flex h-2 w-2">
                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isLight ? "bg-emerald-500" : "bg-success")} />
                <span className={cn("relative inline-flex rounded-full h-2 w-2", isLight ? "bg-emerald-600" : "bg-success")} />
              </span>
              <span className="font-bold">BOT: {DEMO_METRICS.botStatus}</span>
            </div>

            <div className={cn("hidden md:flex items-center gap-1.5", isLight ? "text-slate-600 font-medium" : "text-text-muted")}>
              <Wifi className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />
              <span>{DEMO_METRICS.heartbeatMs}ms IPC</span>
            </div>

            <div className={cn("hidden lg:flex items-center gap-1.5", isLight ? "text-slate-600 font-medium" : "text-text-secondary")}>
              <Cpu className="w-3 h-3" />
              <span>{DEMO_METRICS.environment}</span>
            </div>

            <div className={cn(
              "text-[9px] px-1.5 py-0.5 rounded border font-medium",
              isLight ? "text-slate-700 bg-slate-100 border-slate-200" : "text-text-muted bg-black/20 border-white/5"
            )}>
              {DEMO_METRICS.adapterVersion}
            </div>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
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
        </div>

        {/* If Control Mode: Render Interactive Control Bus */}
        {product === "control" && <ControlBar isLight={isLight} />}

        {/* Middle Section: Equity Chart & Risk / Allocation Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {/* Main Interactive Chart */}
          <div className={cn(
            "lg:col-span-2 p-3 sm:p-4 rounded-lg flex flex-col border transition-colors",
            isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
          )}>
            <EquityChart accentColor={isLight ? "#0284c7" : activeTheme.colors.accent} isLight={isLight} />
          </div>

          {/* Realtime Risk & Margin Radar */}
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
