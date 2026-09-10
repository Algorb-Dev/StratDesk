"use client";

import React, { useState } from "react";
import { PERIODIC_PERFORMANCE, PeriodicMetric } from "@/data/ledger-data";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  Check,
} from "lucide-react";

interface LedgerPeriodicityProps {
  isLight?: boolean;
  selectedPeriodFilter?: string | null;
  onFilterByPeriod?: (periodKey: string | null) => void;
}

export const LedgerPeriodicity: React.FC<LedgerPeriodicityProps> = ({
  isLight = false,
  selectedPeriodFilter,
  onFilterByPeriod,
}) => {
  const [activePeriod, setActivePeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  // Default first row expanded so drill-down demo data is immediately prominent
  const [expandedPeriodKey, setExpandedPeriodKey] = useState<string | null>(
    PERIODIC_PERFORMANCE["daily"][0]?.periodKey || null
  );

  const data: PeriodicMetric[] = PERIODIC_PERFORMANCE[activePeriod];
  const maxPnl = Math.max(...data.map((d) => Math.abs(d.pnl))) || 1;

  const totalPeriodPnl = data.reduce((acc, curr) => acc + curr.pnl, 0);
  const totalPeriodTrades = data.reduce((acc, curr) => acc + curr.trades, 0);

  const handlePeriodTabChange = (mode: "daily" | "weekly" | "monthly") => {
    setActivePeriod(mode);
    // Automatically expand the top item of the newly selected timeframe
    setExpandedPeriodKey(PERIODIC_PERFORMANCE[mode][0]?.periodKey || null);
  };

  const toggleExpand = (periodKey: string) => {
    setExpandedPeriodKey((prev) => (prev === periodKey ? null : periodKey));
  };

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
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b",
          isLight ? "border-slate-200" : "border-white/5"
        )}
      >
        <div className="flex items-center gap-2">
          <Calendar className={cn("w-3.5 h-3.5", isLight ? "text-sky-600" : "text-accent")} />
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-wider",
              isLight ? "text-slate-900" : "text-white"
            )}
          >
            PERIODIC DRILLDOWN
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border",
              totalPeriodPnl >= 0
                ? isLight
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-success/10 text-success border-success/20"
                : isLight
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-danger/10 text-danger border-danger/20"
            )}
          >
            {totalPeriodPnl >= 0 ? "+" : ""}
            {formatCurrency(totalPeriodPnl)} ({totalPeriodTrades} trades)
          </span>
        </div>

        {/* Segmented Switcher */}
        <div
          className={cn(
            "flex items-center gap-1 p-0.5 rounded border text-[10px]",
            isLight ? "bg-slate-100 border-slate-200" : "bg-surface-elevated border-white/5"
          )}
        >
          {(["daily", "weekly", "monthly"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handlePeriodTabChange(mode)}
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

      {/* Period Rows with Deep Drilldown Expansion */}
      <div className="space-y-2 pt-1">
        {data.map((item) => {
          const isExpanded = expandedPeriodKey === item.periodKey;
          const isFilterActive = selectedPeriodFilter === item.periodKey;
          const barWidthPercent = Math.min(
            100,
            Math.max(12, (Math.abs(item.pnl) / maxPnl) * 100)
          );

          return (
            <div
              key={item.periodKey}
              className={cn(
                "rounded-lg border transition-all duration-200 overflow-hidden",
                isExpanded
                  ? isLight
                    ? "border-sky-300 bg-sky-50/20 shadow-sm"
                    : "border-accent/40 bg-white/[0.03] shadow-md shadow-accent/5"
                  : isLight
                  ? "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
              )}
            >
              {/* Main Period Row Header (Clickable) */}
              <div
                onClick={() => toggleExpand(item.periodKey)}
                role="button"
                tabIndex={0}
                className="p-2.5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs select-none"
              >
                {/* Period Label & Trend */}
                <div className="flex items-center gap-2 min-w-[160px]">
                  {item.isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-danger shrink-0" />
                  )}
                  <span
                    className={cn(
                      "font-bold text-[11px]",
                      isLight ? "text-slate-900" : "text-white"
                    )}
                  >
                    {item.period}
                  </span>
                  {item.topSymbol && (
                    <span
                      className={cn(
                        "hidden md:inline-block px-1.5 py-0.2 text-[9px] rounded font-bold border",
                        isLight
                          ? "bg-slate-100 text-slate-700 border-slate-300"
                          : "bg-white/5 text-text-muted border-white/10"
                      )}
                    >
                      {item.topSymbol}
                    </span>
                  )}
                </div>

                {/* Progress Visual Bar & Summary */}
                <div className="flex-1 mx-0 sm:mx-3 flex items-center gap-2">
                  <div
                    className={cn(
                      "flex-1 h-2 rounded-full overflow-hidden",
                      isLight ? "bg-slate-200" : "bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        item.isPositive ? "bg-success" : "bg-danger"
                      )}
                      style={{ width: `${barWidthPercent}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] whitespace-nowrap font-medium",
                      isLight ? "text-slate-500" : "text-text-muted"
                    )}
                  >
                    {item.trades} trds • {item.winRate}% WR
                  </span>
                </div>

                {/* PnL & Expand Caret */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 min-w-[130px]">
                  <span
                    className={cn(
                      "font-bold text-xs",
                      item.isPositive
                        ? isLight
                          ? "text-emerald-700"
                          : "text-success"
                        : isLight
                        ? "text-rose-700"
                        : "text-danger"
                    )}
                  >
                    {item.pnl >= 0 ? "+" : ""}
                    {formatCurrency(item.pnl)}
                  </span>
                  <div
                    className={cn(
                      "p-1 rounded transition-colors",
                      isExpanded
                        ? isLight
                          ? "bg-sky-100 text-sky-700"
                          : "bg-accent/20 text-accent"
                        : isLight
                        ? "text-slate-400 hover:text-slate-700"
                        : "text-text-muted hover:text-white"
                    )}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Granular Sub-Period Drilldown Drawer */}
              {isExpanded && (
                <div
                  className={cn(
                    "p-3 border-t text-[11px] transition-colors space-y-3",
                    isLight
                      ? "bg-slate-50/90 border-sky-200/80"
                      : "bg-black/30 border-white/5"
                  )}
                >
                  {/* Period Macro Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div
                      className={cn(
                        "p-2 rounded border",
                        isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
                      )}
                    >
                      <div className={cn("text-[9px] uppercase", isLight ? "text-slate-400" : "text-text-muted")}>
                        Profit Factor
                      </div>
                      <div className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>
                        {item.profitFactor ? `${item.profitFactor.toFixed(2)}x` : "2.42x"}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "p-2 rounded border",
                        isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
                      )}
                    >
                      <div className={cn("text-[9px] uppercase", isLight ? "text-slate-400" : "text-text-muted")}>
                        Notional Volume
                      </div>
                      <div className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>
                        {item.volume || "$1.2M"}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "p-2 rounded border",
                        isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
                      )}
                    >
                      <div className={cn("text-[9px] uppercase", isLight ? "text-slate-400" : "text-text-muted")}>
                        Top Strategy
                      </div>
                      <div className={cn("font-bold text-xs truncate", isLight ? "text-sky-700" : "text-accent")}>
                        {item.topStrategy || "Spread Arbitrage"}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "p-2 rounded border",
                        isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
                      )}
                    >
                      <div className={cn("text-[9px] uppercase", isLight ? "text-slate-400" : "text-text-muted")}>
                        {item.bestDay ? "Peak Day" : "Top Pair"}
                      </div>
                      <div className={cn("font-bold text-xs truncate", isLight ? "text-slate-900" : "text-white")}>
                        {item.bestDay || item.topSymbol || "BTC-PERP"}
                      </div>
                    </div>
                  </div>

                  {/* Hierarchical Sub-Breakdown (Weeks in Month, Days in Week, Sessions in Day) */}
                  {item.subBreakdown && item.subBreakdown.length > 0 && (
                    <div className="space-y-1.5">
                      <div
                        className={cn(
                          "flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider",
                          isLight ? "text-slate-500" : "text-text-muted"
                        )}
                      >
                        <Layers className="w-3 h-3" />
                        <span>
                          {activePeriod === "monthly"
                            ? "Weekly Decomposition Breakdown"
                            : activePeriod === "weekly"
                            ? "Daily Intraday Breakdown"
                            : "Algorithmic Session Breakdown"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {item.subBreakdown.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className={cn(
                              "p-2 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors",
                              isLight
                                ? "bg-white border-slate-200/80 hover:bg-slate-50"
                                : "bg-surface-elevated/40 border-white/5 hover:bg-white/[0.04]"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              <span
                                className={cn(
                                  "font-bold text-[10px]",
                                  isLight ? "text-slate-800" : "text-white"
                                )}
                              >
                                {sub.label}
                              </span>
                              {sub.strategy && (
                                <span
                                  className={cn(
                                    "px-1 py-0.2 text-[8px] rounded border font-mono",
                                    isLight
                                      ? "bg-slate-100 text-slate-600 border-slate-200"
                                      : "bg-white/5 text-text-secondary border-white/5"
                                  )}
                                >
                                  {sub.strategy}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 text-[10px]">
                              <span className={cn(isLight ? "text-slate-500" : "text-text-muted")}>
                                {sub.trades} trades • {sub.winRate}% WR
                              </span>
                              <span
                                className={cn(
                                  "font-bold",
                                  sub.pnl >= 0
                                    ? isLight
                                      ? "text-emerald-700"
                                      : "text-success"
                                    : isLight
                                    ? "text-rose-700"
                                    : "text-danger"
                                )}
                              >
                                {sub.pnl >= 0 ? "+" : ""}
                                {formatCurrency(sub.pnl)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Filter Sync Action Button */}
                  {onFilterByPeriod && (
                    <div className="pt-1 flex items-center justify-between">
                      <span className={cn("text-[9px]", isLight ? "text-slate-400" : "text-text-muted")}>
                        Synced to StratDesk Bot Audit Bus
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isFilterActive) {
                            onFilterByPeriod(null);
                          } else {
                            onFilterByPeriod(item.periodKey);
                          }
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 border",
                          isFilterActive
                            ? isLight
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-success/20 text-success border-success/40"
                            : isLight
                            ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            : "bg-white/5 text-text-secondary border-white/10 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {isFilterActive ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>FILTERED ({item.period})</span>
                          </>
                        ) : (
                          <>
                            <Filter className="w-3 h-3" />
                            <span>FILTER AUDIT TABLE TO THIS PERIOD</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
