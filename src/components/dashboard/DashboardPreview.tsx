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
        isHero ? "shadow-surface ring-1 ring-white/10" : "",
        className
      )}
    >
      {/* Outer Shell Background & Border */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-300"
        style={{
          backgroundColor: activeTheme.colors.bg,
          borderColor: activeTheme.colors.border,
        }}
      />

      {/* Terminal CRT Scanline Overlay for 'terminal' theme */}
      {theme === "terminal" && (
        <div className="absolute inset-0 z-20 pointer-events-none scanline-overlay opacity-30" />
      )}

      {/* Outer Content Container */}
      <div className="relative z-10 p-3.5 sm:p-5 flex flex-col gap-4 text-white">
        {/* Top Telemetry Chrome / Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          {/* Left: Product & Brand Identifier */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlgorbSymbol size={22} glow={theme !== "vector"} />
              <span className="font-bold tracking-widest text-sm uppercase">
                ALGORB {product === "control" ? "CONTROL" : "VIEW"}
              </span>
            </div>
            <span
              className="px-2 py-0.5 text-[9px] font-bold tracking-wider rounded border uppercase"
              style={{
                borderColor: activeTheme.colors.border,
                color: activeTheme.colors.accent,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
            >
              {activeTheme.name}
            </span>
          </div>

          {/* Center/Right: Live System Indicators */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] text-text-muted">
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 rounded border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-bold text-success">BOT: {DEMO_METRICS.botStatus}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-accent" />
              <span>{DEMO_METRICS.heartbeatMs}ms IPC</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-text-secondary" />
              <span>{DEMO_METRICS.environment}</span>
            </div>

            <div className="text-[9px] text-text-muted border border-white/5 px-1.5 py-0.5 rounded bg-black/20">
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
          />
          <MetricCard
            label="TODAY'S P&L"
            value={DEMO_METRICS.dailyPnlFormatted}
            delta={DEMO_METRICS.dailyPnlPercent}
            isPositive={true}
            subtext="Unrealized: +$882"
          />
          <MetricCard
            label="TOTAL RETURN"
            value={DEMO_METRICS.totalReturn}
            delta="+14.2% mtd"
            isPositive={true}
            subtext="Annualized: 210%"
          />
          <MetricCard
            label="MAX DRAWDOWN"
            value={DEMO_METRICS.drawdown}
            delta="Safe"
            isPositive={true}
            subtext={`Ceiling: ${DEMO_METRICS.maxDrawdown}`}
          />
          <MetricCard
            label="WIN RATE"
            value={DEMO_METRICS.winRate}
            delta="72 / 100 trades"
            isPositive={true}
            subtext={`Profit Factor: ${DEMO_METRICS.profitFactor}`}
          />
          <MetricCard
            label="BOT STATUS"
            value={DEMO_METRICS.botStatus}
            badge="ACTIVE"
            pulse={true}
            subtext={`Uptime: ${DEMO_METRICS.uptime}`}
          />
        </div>

        {/* If Control Mode: Render Interactive Control Bus */}
        {product === "control" && <ControlBar />}

        {/* Middle Section: Equity Chart & Risk / Allocation Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {/* Main Interactive Chart */}
          <div className="lg:col-span-2 p-3 sm:p-4 rounded-lg bg-surface/50 border border-white/5 flex flex-col">
            <EquityChart accentColor={activeTheme.colors.accent} />
          </div>

          {/* Realtime Risk & Margin Radar */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-surface/50 border border-white/5 flex flex-col justify-between gap-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-warning" />
                RISK ALLOCATION
              </span>
              <span className="text-[10px] text-text-muted">PARAM LIMITS</span>
            </div>

            {/* Gauge 1: Margin Utilization */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-muted">Margin Utilization</span>
                <span className="font-bold text-white">34.2% / 50.0%</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: "34.2%", backgroundColor: activeTheme.colors.accent }}
                />
              </div>
            </div>

            {/* Gauge 2: Drawdown Tolerance */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-muted">Drawdown Cushion</span>
                <span className="font-bold text-success">4.21% / 10.0%</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded bg-success transition-all duration-500"
                  style={{ width: "42.1%" }}
                />
              </div>
            </div>

            {/* Gauge 3: Value at Risk (99% 1D) */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-muted">Value at Risk (99% 1D)</span>
                <span className="font-bold text-white">$842.10 (3.39%)</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded bg-warning transition-all duration-500"
                  style={{ width: "28.5%" }}
                />
              </div>
            </div>

            {/* Strategy Weights Breakdown */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-text-muted">
              <div>
                <span className="text-white font-bold">Alpha-V2:</span> 45%
              </div>
              <div>
                <span className="text-white font-bold">MeanRev:</span> 35%
              </div>
              <div>
                <span className="text-white font-bold">Arb:</span> 20%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Active Positions Table & Execution Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <div className="p-3 sm:p-4 rounded-lg bg-surface/50 border border-white/5">
            <PositionsTable />
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-surface/50 border border-white/5">
            <ExecutionLogs maxLogs={5} />
          </div>
        </div>

        {/* Footer Disclaimer Strip */}
        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-text-muted select-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span>DEMO ENVIRONMENT • LOCAL TELEMETRY MOCK</span>
          </div>
          <span>Algorb Interface Layer v1.0.0 • No live order risk</span>
        </div>
      </div>
    </div>
  );
};
