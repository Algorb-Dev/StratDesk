"use client";

import React, { useState } from "react";
import { LEDGER_EQUITY_CURVE, LedgerEquityPoint } from "@/data/ledger-data";
import { formatCurrency, cn } from "@/lib/utils";
import { LineChart, BarChart3, TrendingUp } from "lucide-react";

interface LedgerPerformanceChartProps {
  accentColor?: string;
  isLight?: boolean;
}

export const LedgerPerformanceChart: React.FC<LedgerPerformanceChartProps> = ({
  accentColor = "#00f0ff",
  isLight = false,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<LedgerEquityPoint | null>(null);

  const points = LEDGER_EQUITY_CURVE;
  const width = 600;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;

  const minPnl = Math.min(...points.map((p) => p.cumulativePnl));
  const maxPnl = Math.max(...points.map((p) => p.cumulativePnl));
  const range = maxPnl - minPnl || 1;

  const coords = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((p.cumulativePnl - minPnl) / range) * (height - paddingY * 2);
    return { x, y, point: p };
  });

  const linePath = coords.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = coords[idx - 1];
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) / 2;
    const cpY2 = curr.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const activePoint = hoveredPoint || points[points.length - 1];
  const gridStroke = isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.04)";

  // R-Multiple Distribution Stats
  const rDistribution = [
    { label: "Losses (-1R)", count: 45, pct: "31.7%", color: "bg-danger", isWin: false },
    { label: "0R to +1R", count: 22, pct: "15.5%", color: isLight ? "bg-sky-400" : "bg-sky-500", isWin: true },
    { label: "+1R to +2R", count: 38, pct: "26.8%", color: "bg-emerald-500", isWin: true },
    { label: "+2R to +4R", count: 29, pct: "20.4%", color: "bg-emerald-400", isWin: true },
    { label: "> +4R Runners", count: 8, pct: "5.6%", color: "bg-accent", isWin: true },
  ];

  return (
    <div
      className={cn(
        "p-3.5 sm:p-4 rounded-lg border transition-colors font-mono flex flex-col justify-between gap-4",
        isLight
          ? "bg-white border-slate-200/90 shadow-sm"
          : "bg-surface/60 border-white/5"
      )}
    >
      {/* Header */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 pb-3 border-b", isLight ? "border-slate-200" : "border-white/5")}>
        <div>
          <div className="flex items-center gap-2">
            <LineChart className={cn("w-3.5 h-3.5", isLight ? "text-sky-600" : "text-accent")} />
            <span className={cn("text-[10px] uppercase tracking-wider font-semibold", isLight ? "text-slate-500" : "text-text-muted")}>
              REALIZED PERFORMANCE CURVE
            </span>
            <span className={cn("text-[10px]", isLight ? "text-slate-400" : "text-text-muted")}>
              • Trade #{activePoint.tradeIndex} ({activePoint.symbol})
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mt-0.5 min-w-0">
            <span className={cn("text-xl sm:text-2xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
              +{formatCurrency(activePoint.cumulativePnl)}
            </span>
            <span
              className={cn(
                "text-xs font-semibold px-1.5 py-0.5 rounded border shrink-0 whitespace-nowrap",
                activePoint.pnl >= 0
                  ? isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20"
                  : isLight ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-danger/10 text-danger border-danger/20"
              )}
            >
              Trade: {activePoint.pnl >= 0 ? "+" : ""}{formatCurrency(activePoint.pnl)}
            </span>
          </div>
        </div>

        {/* Quick KPI badge */}
        <div className={cn("text-right text-[10px]", isLight ? "text-slate-600" : "text-text-muted")}>
          <div>Peak High: <span className="font-bold text-success">+$18,429.50</span></div>
          <div>Underwater Drawdown: <span className={cn("font-bold", isLight ? "text-slate-800" : "text-white")}>0.0% (At ATH)</span></div>
        </div>
      </div>

      {/* SVG Cumulative PnL Canvas */}
      <div className="relative w-full h-[150px] select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ledger-equity-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity={isLight ? "0.25" : "0.35"} />
              <stop offset="85%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="ledger-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke={gridStroke} strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke={gridStroke} strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke={gridStroke} strokeDasharray="3 3" />

          {/* Area */}
          <path d={areaPath} fill="url(#ledger-equity-gradient)" />

          {/* Curve */}
          <path d={linePath} fill="none" stroke="url(#ledger-line-gradient)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hover interactive markers */}
          {coords.map((c, i) => (
            <g key={i} className="cursor-crosshair">
              <circle
                cx={c.x}
                cy={c.y}
                r="3.5"
                className={cn(
                  "transition-all duration-150",
                  activePoint.tradeId === c.point.tradeId
                    ? isLight
                      ? "fill-sky-600 stroke-slate-900 stroke-2 r-5"
                      : "fill-accent stroke-white stroke-2 r-5"
                    : "fill-surface stroke-accent opacity-0 hover:opacity-100"
                )}
                onMouseEnter={() => setHoveredPoint(c.point)}
              />
              <rect
                x={c.x - (width / points.length) / 2}
                y="0"
                width={width / points.length}
                height={height}
                fill="transparent"
                onMouseEnter={() => setHoveredPoint(c.point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}

          {/* Pulsing latest point */}
          <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="4" fill={accentColor} className="animate-pulse" />
        </svg>
      </div>

      {/* R-Multiple Distribution Histogram Strip */}
      <div className={cn("pt-2.5 border-t", isLight ? "border-slate-200" : "border-white/5")}>
        <div className="flex items-center justify-between text-[10px] mb-1.5">
          <span className={cn("font-bold uppercase tracking-wider flex items-center gap-1", isLight ? "text-slate-700" : "text-white")}>
            <BarChart3 className="w-3 h-3 text-accent" />
            R-MULTIPLE SKEW (RISK-ADJUSTED REALIZATION)
          </span>
          <span className={cn(isLight ? "text-slate-500" : "text-text-muted")}>EXPECTANCY: +1.48R</span>
        </div>

        {/* Stacked Skew Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex gap-0.5 bg-white/5 mb-2">
          {rDistribution.map((r, idx) => (
            <div
              key={idx}
              className={cn("h-full transition-all", r.color)}
              style={{ width: r.pct }}
              title={`${r.label}: ${r.count} trades (${r.pct})`}
            />
          ))}
        </div>

        {/* Skew Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[9px]">
          {rDistribution.map((r, idx) => (
            <div key={idx} className={cn("flex items-center gap-1.5 p-1 rounded border", isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-white/[0.02] border-white/5 text-text-muted")}>
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", r.color)} />
              <span className="truncate">{r.label}:</span>
              <span className={cn("font-bold ml-auto", isLight ? "text-slate-900" : "text-white")}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
