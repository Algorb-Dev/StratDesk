"use client";

import React, { useState } from "react";
import { TIMEFRAME_CHARTS, ChartPoint } from "@/data/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

interface EquityChartProps {
  className?: string;
  accentColor?: string;
  showTimeframes?: boolean;
}

export const EquityChart: React.FC<EquityChartProps> = ({
  className,
  accentColor = "#00f0ff",
  showTimeframes = true,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<string>("1D");
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  const points = TIMEFRAME_CHARTS[activeTimeframe] || TIMEFRAME_CHARTS["1D"];

  // SVG dimensions
  const width = 600;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;

  const minEquity = Math.min(...points.map((p) => p.equity));
  const maxEquity = Math.max(...points.map((p) => p.equity));
  const range = maxEquity - minEquity || 1;

  // Compute SVG coordinates
  const coords = points.map((p, i) => {
    const x = paddingX + (i / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((p.equity - minEquity) / range) * (height - paddingY * 2);
    return { x, y, point: p };
  });

  // Build SVG path
  const linePath = coords.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    // Smooth bezier curve
    const prev = coords[idx - 1];
    const cpX1 = prev.x + (curr.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) / 2;
    const cpY2 = curr.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  const displayPoint = hoveredPoint || points[points.length - 1];
  const initialEquity = points[0].equity;
  const currentEquity = displayPoint.equity;
  const delta = currentEquity - initialEquity;
  const deltaPct = ((delta / initialEquity) * 100).toFixed(2);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Chart Header with Live Values & Timeframes */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
              PORTFOLIO NAV ({activeTimeframe})
            </span>
            <span className="text-[10px] font-mono text-text-muted">
              • {displayPoint.time}
            </span>
          </div>
          <div className="flex items-baseline gap-2.5 mt-0.5">
            <span className="text-xl sm:text-2xl font-mono font-bold text-white">
              {formatCurrency(currentEquity)}
            </span>
            <span
              className={cn(
                "text-xs font-mono font-semibold",
                delta >= 0 ? "text-success" : "text-danger"
              )}
            >
              {delta >= 0 ? `+${formatCurrency(delta)}` : formatCurrency(delta)} ({delta >= 0 ? "+" : ""}{deltaPct}%)
            </span>
          </div>
        </div>

        {showTimeframes && (
          <div className="flex items-center gap-1 bg-surface-elevated/70 p-0.5 rounded border border-white/5">
            {["1D", "1W", "1M", "YTD", "ALL"].map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setActiveTimeframe(tf);
                  setHoveredPoint(null);
                }}
                className={cn(
                  "px-2 py-1 text-[10px] font-mono font-medium rounded transition-colors",
                  activeTimeframe === tf
                    ? "bg-accent/20 text-accent border border-accent/40 font-bold"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 w-full pt-2 min-h-[140px] sm:min-h-[170px] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`equity-gradient-${activeTimeframe}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
              <stop offset="85%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id={`line-gradient-${activeTimeframe}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Background Reference Grid Lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#equity-gradient-${activeTimeframe})`} />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke={`url(#line-gradient-${activeTimeframe})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Hover Nodes */}
          {coords.map((c, i) => (
            <g key={i} className="cursor-crosshair">
              <circle
                cx={c.x}
                cy={c.y}
                r="4"
                className={cn(
                  "transition-all duration-150",
                  hoveredPoint?.time === c.point.time
                    ? "fill-accent stroke-white stroke-2 r-6"
                    : "fill-surface stroke-accent stroke-1 opacity-0 hover:opacity-100"
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

          {/* Pulsing Latest Point */}
          <circle
            cx={coords[coords.length - 1].x}
            cy={coords[coords.length - 1].y}
            r="4"
            fill={accentColor}
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};
