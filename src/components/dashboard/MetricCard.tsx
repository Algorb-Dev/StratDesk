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
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-3.5 sm:p-4 rounded-lg bg-surface/80 border border-white/5 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-surface-elevated/70 group",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[10px] sm:text-xs font-mono font-medium text-text-muted uppercase tracking-wider">
          {label}
        </span>
        {badge && (
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-mono rounded tracking-wider font-semibold uppercase flex items-center gap-1",
              pulse ? "bg-success/15 text-success border border-success/30" : "bg-white/5 text-text-secondary border border-white/10"
            )}
          >
            {pulse && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
            )}
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tight group-hover:text-accent transition-colors">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-xs font-mono font-semibold",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <span className="text-[10px] font-mono text-text-muted mt-1 truncate">
          {subtext}
        </span>
      )}
    </div>
  );
};
