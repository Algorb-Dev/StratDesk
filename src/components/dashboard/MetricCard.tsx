import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  isPositive?: boolean;
  subtext?: string;
  badge?: string;
  pulse?: boolean;
  className?: string;
  accentColor?: string;
  isLight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  isPositive = true,
  subtext,
  badge,
  pulse = false,
  className,
  isLight = false,
}) => {
  // If badge exists (e.g. "ACTIVE"), show badge on top-right. If not, delta (e.g. "+1.98%") sits on top-right chip
  const topTag = badge || delta;
  const isBadge = !!badge;

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-3 sm:p-3.5 rounded-lg backdrop-blur-sm transition-all duration-200 group overflow-hidden min-w-0",
        isLight
          ? "bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md text-slate-900"
          : "bg-surface/80 border border-white/5 hover:border-white/15 hover:bg-surface-elevated/70 text-white",
        className
      )}
    >
      {/* Header: Metric Label and Status / Delta Tag */}
      <div className="flex items-center justify-between gap-1.5 mb-1.5 min-w-0">
        <span
          className={cn(
            "text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider truncate",
            isLight ? "text-slate-500" : "text-text-muted"
          )}
        >
          {label}
        </span>
        {topTag && (
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded tracking-wider font-semibold uppercase flex items-center gap-1 shrink-0 border",
              isBadge
                ? pulse
                  ? isLight
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-success/15 text-success border-success/30"
                  : isLight
                  ? "bg-slate-100 text-slate-700 border-slate-200"
                  : "bg-white/5 text-text-secondary border-white/10"
                : isPositive
                ? isLight
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-success/10 text-success border-success/20"
                : isLight
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-danger/10 text-danger border-danger/20"
            )}
          >
            {isBadge && pulse && (
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isLight ? "bg-emerald-500" : "bg-success"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-1.5 w-1.5",
                    isLight ? "bg-emerald-600" : "bg-success"
                  )}
                />
              </span>
            )}
            {topTag}
          </span>
        )}
      </div>

      {/* Primary Value */}
      <div className="flex items-baseline justify-between gap-1 min-w-0 my-0.5">
        <span
          className={cn(
            "text-base sm:text-lg xl:text-xl font-bold font-mono tracking-tight transition-colors truncate",
            isLight
              ? "text-slate-900 group-hover:text-sky-600"
              : "text-white group-hover:text-accent"
          )}
        >
          {value}
        </span>
      </div>

      {/* Subtext */}
      {subtext && (
        <span
          className={cn(
            "text-[10px] font-mono mt-1 truncate",
            isLight ? "text-slate-500" : "text-text-muted"
          )}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};
