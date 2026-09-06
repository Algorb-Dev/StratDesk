"use client";

import React, { useState } from "react";
import { PERIODIC_PERFORMANCE, PeriodicMetric } from "@/data/ledger-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface LedgerPeriodicityProps {
  isLight?: boolean;
}

export const LedgerPeriodicity: React.FC<LedgerPeriodicityProps> = ({ isLight = false }) => {
  const [activePeriod, setActivePeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const data: PeriodicMetric[] = PERIODIC_PERFORMANCE[activePeriod];
  const maxPnl = Math.max(...data.map((d) => Math.abs(d.pnl))) || 1;

  const totalPeriodPnl = data.reduce((acc, curr) => acc + curr.pnl, 0);
  const totalPeriodTrades = data.reduce((acc, curr) => acc + curr.trades, 0);

  return (
    <div
      className={cn(
        "p-3.5 sm:p-4 rounded-lg border transition-colors font-mono flex flex-col justify-between gap-3",
        isLight
          ? "bg-white border-slate-200/90 shadow-sm"
          : "bg-surface/60 border-white/5"
      )}
    >
      {/* Header: Title & Timeframe Selector */}
      <div className={cn("flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b", isLight ? "border-slate-200" : "border-white/5")}>
        <div className="flex items-center gap-2">
          <Calendar className={cn("w-3.5 h-3.5", isLight ? "text-sky-600" : "text-accent")} />
          <span className={cn("text-xs font-bold uppercase tracking-wider", isLight ? "text-slate-900" : "text-white")}>
            PERIODIC DRILLDOWN
          </span>
          <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded border", totalPeriodPnl >= 0 ? (isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20") : (isLight ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-danger/10 text-danger border-danger/20"))}>
            {totalPeriodPnl >= 0 ? "+" : ""}{formatCurrency(totalPeriodPnl)} ({totalPeriodTrades} trades)
          </span>
        </div>

        {/* Segmented Switcher */}
        <div className={cn("flex items-center gap-1 p-0.5 rounded border text-[10px]", isLight ? "bg-slate-100 border-slate-200" : "bg-surface-elevated border-white/5")}>
          {(["daily", "weekly", "monthly"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActivePeriod(mode)}
              className={cn(
                "px-2.5 py-1 rounded font-bold uppercase transition-all",
                activePeriod === mode
                  ? isLight
                    ? "bg-white text-sky-800 shadow-sm border border-slate-300"
                    : "bg-accent/20 text-accent border border-accent/40 shadow-sm"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-text-muted hover:text-white"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Period Bars Display */}
      <div className="space-y-2 pt-1">
        {data.map((item, idx) => {
          const barWidthPercent = Math.min(100, Math.max(12, (Math.abs(item.pnl) / maxPnl) * 100));

          return (
            <div
              key={idx}
              className={cn(
                "p-2 rounded border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs",
                isLight ? "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-2 min-w-[150px]">
                {item.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-success shrink-0" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-danger shrink-0" />
                )}
                <span className={cn("font-bold text-[11px]", isLight ? "text-slate-900" : "text-white")}>
                  {item.period}
                </span>
              </div>

              {/* Progress Visual Bar */}
              <div className="flex-1 mx-0 sm:mx-3 flex items-center gap-2">
                <div className={cn("flex-1 h-2 rounded-full overflow-hidden", isLight ? "bg-slate-200" : "bg-white/5")}>
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      item.isPositive ? "bg-success" : "bg-danger"
                    )}
                    style={{ width: `${barWidthPercent}%` }}
                  />
                </div>
                <span className={cn("text-[10px] whitespace-nowrap", isLight ? "text-slate-500 font-medium" : "text-text-muted")}>
                  {item.trades} trds • {item.winRate}% WR
                </span>
              </div>

              {/* PnL Value */}
              <div className="text-right whitespace-nowrap min-w-[100px]">
                <span
                  className={cn(
                    "font-bold text-xs",
                    item.isPositive
                      ? isLight ? "text-emerald-700" : "text-success"
                      : isLight ? "text-rose-700" : "text-danger"
                  )}
                >
                  {item.isPositive ? "+" : ""}{formatCurrency(item.pnl)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
