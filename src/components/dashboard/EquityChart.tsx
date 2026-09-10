"use client";

import React, { useState } from "react";
import { TIMEFRAME_CHARTS, ChartPoint } from "@/data/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

interface EquityChartProps {
  className?: string;
  accentColor?: string;
  showTimeframes?: boolean;
  isLight?: boolean;
}

interface HoverState {
  x: number;
  y: number;
  equity: number;
  time: string;
}

export const EquityChart: React.FC<EquityChartProps> = ({
  className,
  accentColor = "#00f0ff",
  showTimeframes = true,
  isLight = false,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<string>("1D");
  const [hoverState, setHoverState] = useState<HoverState | null>(null);

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

  // Build SVG path with smooth cubic bezier curves
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

  // Continuous pointer move handler tracking anywhere along the line curve
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    if (!svgRect.width) return;

    const relX = ((e.clientX - svgRect.left) / svgRect.width) * width;
    const clampedX = Math.max(paddingX, Math.min(width - paddingX, relX));
    const progress = (clampedX - paddingX) / (width - paddingX * 2);

    const exactIndex = progress * (points.length - 1);
    const i0 = Math.floor(exactIndex);
    const i1 = Math.min(points.length - 1, Math.ceil(exactIndex));
    const t = exactIndex - i0;

    const p0 = points[i0];
    const p1 = points[i1];
    const c0 = coords[i0];
    const c1 = coords[i1];

    // Smooth cubic Hermite interpolation matching the bezier line curve exactly
    const cy = (1 - 3 * t * t + 2 * t * t * t) * c0.y + (3 * t * t - 2 * t * t * t) * c1.y;
    const interpEquity = p0.equity + t * (p1.equity - p0.equity);
    const interpTime = t > 0.5 ? p1.time : p0.time;

    setHoverState({
      x: clampedX,
      y: cy,
      equity: interpEquity,
      time: interpTime,
    });
  };

  const handlePointerLeave = () => {
    setHoverState(null);
  };

  const initialEquity = points[0].equity;
  const currentEquity = hoverState ? hoverState.equity : points[points.length - 1].equity;
  const currentTime = hoverState ? hoverState.time : points[points.length - 1].time;
  const delta = currentEquity - initialEquity;
  const deltaPct = ((delta / initialEquity) * 100).toFixed(2);

  const gridStroke = isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.04)";

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Chart Header with Live Values & Timeframes */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 pb-3 border-b", isLight ? "border-slate-200" : "border-white/5")}>
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("text-[10px] font-mono uppercase tracking-wider", isLight ? "text-slate-500 font-semibold" : "text-text-muted")}>
              PORTFOLIO NAV ({activeTimeframe})
            </span>
            <span className={cn("text-[10px] font-mono", isLight ? "text-slate-400" : "text-text-muted")}>
              • {currentTime}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mt-0.5 min-w-0">
            <span className={cn("text-xl sm:text-2xl font-mono font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>
              {formatCurrency(currentEquity)}
            </span>
            <span
              className={cn(
                "text-xs font-mono font-semibold whitespace-nowrap shrink-0 px-1.5 py-0.5 rounded border",
                delta >= 0
                  ? isLight
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "text-success bg-success/10 border-success/20"
                  : isLight
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "text-danger bg-danger/10 border-danger/20"
              )}
            >
              {delta >= 0 ? `+${formatCurrency(delta)}` : formatCurrency(delta)} ({delta >= 0 ? "+" : ""}{deltaPct}%)
            </span>
          </div>
        </div>

        {showTimeframes && (
          <div className={cn("flex items-center gap-1 p-0.5 rounded border", isLight ? "bg-slate-100 border-slate-200" : "bg-surface-elevated/70 border-white/5")}>
            {["1D", "1W", "1M", "YTD", "ALL"].map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setActiveTimeframe(tf);
                  setHoverState(null);
                }}
                className={cn(
                  "px-2 py-1 text-[10px] font-mono font-medium rounded transition-colors",
                  activeTimeframe === tf
                    ? isLight
                      ? "bg-white text-sky-700 border border-sky-300 font-bold shadow-sm"
                      : "bg-accent/20 text-accent border border-accent/40 font-bold"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SVG Canvas with Continuous Hover scrub */}
      <div className="relative flex-1 w-full pt-2 min-h-[140px] sm:min-h-[170px] select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            <linearGradient id={`equity-gradient-${activeTimeframe}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity={isLight ? "0.2" : "0.35"} />
              <stop offset="85%" stopColor={accentColor} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id={`line-gradient-${activeTimeframe}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Background Reference Grid Lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke={gridStroke} strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke={gridStroke} strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke={gridStroke} strokeDasharray="3 3" />

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

          {/* Vertical Crosshair Guide */}
          {hoverState && (
            <line
              x1={hoverState.x}
              y1={0}
              x2={hoverState.x}
              y2={height}
              stroke={isLight ? "#0284c7" : accentColor}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.65"
            />
          )}

          {/* Continuous Tracking Point on the Curve */}
          {hoverState ? (
            <g className="transition-transform duration-75">
              <circle
                cx={hoverState.x}
                cy={hoverState.y}
                r="7"
                fill={accentColor}
                opacity="0.35"
              />
              <circle
                cx={hoverState.x}
                cy={hoverState.y}
                r="4.5"
                fill={accentColor}
                opacity="0.6"
              />
              <circle
                cx={hoverState.x}
                cy={hoverState.y}
                r="2.8"
                fill="#ffffff"
                stroke={isLight ? "#0284c7" : accentColor}
                strokeWidth="1.8"
              />
            </g>
          ) : (
            /* Pulsing Latest Point when not hovering */
            <circle
              cx={coords[coords.length - 1].x}
              cy={coords[coords.length - 1].y}
              r="4"
              fill={accentColor}
              className="animate-pulse"
            />
          )}

          {/* Floating Hover Pill Tooltip right above/below curve */}
          {hoverState && (() => {
            const tooltipWidth = 114;
            const tooltipHeight = 36;
            let tx = hoverState.x - tooltipWidth / 2;
            if (tx < 6) tx = 6;
            if (tx + tooltipWidth > width - 6) tx = width - tooltipWidth - 6;

            const ty = hoverState.y > 48 ? hoverState.y - tooltipHeight - 10 : hoverState.y + 12;
            const currentDelta = hoverState.equity - initialEquity;
            const currentDeltaPct = ((currentDelta / initialEquity) * 100).toFixed(2);
            const isPositive = currentDelta >= 0;

            return (
              <g transform={`translate(${tx}, ${ty})`} className="pointer-events-none select-none">
                <rect
                  width={tooltipWidth}
                  height={tooltipHeight}
                  rx="6"
                  ry="6"
                  fill={isLight ? "#ffffff" : "#090d16"}
                  stroke={isLight ? "rgba(2, 132, 199, 0.45)" : "rgba(0, 240, 255, 0.55)"}
                  strokeWidth="1.2"
                />
                <text
                  x={tooltipWidth / 2}
                  y="15"
                  textAnchor="middle"
                  className={isLight ? "fill-slate-900" : "fill-white"}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {formatCurrency(hoverState.equity)}
                </text>
                <text
                  x={tooltipWidth / 2}
                  y="28"
                  textAnchor="middle"
                  className={
                    isPositive
                      ? isLight
                        ? "fill-emerald-700"
                        : "fill-emerald-400"
                      : isLight
                      ? "fill-rose-700"
                      : "fill-rose-400"
                  }
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {hoverState.time} • {isPositive ? "+" : ""}{currentDeltaPct}%
                </text>
              </g>
            );
          })()}

          {/* Full Interactive Hitbox Surface */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="transparent"
            className="cursor-crosshair"
          />
        </svg>
      </div>
    </div>
  );
};
