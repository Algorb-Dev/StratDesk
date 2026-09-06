"use client";

import React from "react";
import { LedgerMacroMetrics } from "@/data/ledger-data";
import { cn } from "@/lib/utils";
import { TrendingUp, Award, ShieldCheck, BarChart2, Activity, Zap } from "lucide-react";

interface LedgerMacroStatsProps {
  metrics: LedgerMacroMetrics;
  isLight?: boolean;
}

export const LedgerMacroStats: React.FC<LedgerMacroStatsProps> = ({ metrics, isLight = false }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono">
      {/* 1. TOTAL NET P&L */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            NET REALIZED P&L
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20"
            )}
          >
            {metrics.totalPnlPercent}
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.totalPnlFormatted}
          </div>
        </div>
        <div className={cn("text-[10px] truncate mt-1 flex items-center gap-1", isLight ? "text-slate-500" : "text-text-muted")}>
          <TrendingUp className={cn("w-3 h-3 shrink-0", isLight ? "text-emerald-600" : "text-success")} />
          <span>Sharpe: {metrics.sharpeRatio.toFixed(2)}</span>
        </div>
      </div>

      {/* 2. WIN RATE */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            WIN RATE
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-accent/10 text-accent border-accent/20"
            )}
          >
            {metrics.winningTrades}W / {metrics.losingTrades}L
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.winRateFormatted}
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-white/5 mt-1">
          <div className="h-full bg-success transition-all" style={{ width: `${metrics.winRate}%` }} />
          <div className="h-full bg-danger transition-all" style={{ width: `${100 - metrics.winRate}%` }} />
        </div>
      </div>

      {/* 3. PROFIT FACTOR */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            PROFIT FACTOR
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20"
            )}
          >
            EXCELLENT
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.profitFactor.toFixed(2)}
          </div>
        </div>
        <div className={cn("text-[10px] truncate mt-1 flex items-center gap-1", isLight ? "text-slate-500" : "text-text-muted")}>
          <Award className={cn("w-3 h-3 shrink-0", isLight ? "text-sky-600" : "text-accent")} />
          <span>Expectancy: {metrics.expectancy}</span>
        </div>
      </div>

      {/* 4. MAX DRAWDOWN */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            MAX DRAWDOWN
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20"
            )}
          >
            CONTROLLED
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.maxDrawdown}
          </div>
        </div>
        <div className={cn("text-[10px] truncate mt-1 flex items-center gap-1", isLight ? "text-slate-500" : "text-text-muted")}>
          <ShieldCheck className={cn("w-3 h-3 shrink-0", isLight ? "text-emerald-600" : "text-success")} />
          <span>Ceiling Limit: 10.0%</span>
        </div>
      </div>

      {/* 5. TOTAL TRADES */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            TOTAL TRADES
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-text-secondary border-white/10"
            )}
          >
            AUDITED
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.totalTrades}
          </div>
        </div>
        <div className={cn("text-[10px] truncate mt-1 flex items-center gap-1", isLight ? "text-slate-500" : "text-text-muted")}>
          <Zap className={cn("w-3 h-3 shrink-0", isLight ? "text-amber-600" : "text-warning")} />
          <span>100% Bot Executed</span>
        </div>
      </div>

      {/* 6. AVERAGE TRADE */}
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-lg border transition-all flex flex-col justify-between overflow-hidden min-w-0 group",
          isLight
            ? "bg-white border-slate-200/90 shadow-sm hover:border-slate-300"
            : "bg-surface/80 border-white/5 hover:border-white/15"
        )}
      >
        <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold truncate", isLight ? "text-slate-500" : "text-text-muted")}>
            AVERAGE TRADE
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded border shrink-0",
              isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-success/10 text-success border-success/20"
            )}
          >
            +2.08:1 R:R
          </span>
        </div>
        <div className="my-0.5">
          <div className={cn("text-base sm:text-lg xl:text-xl font-bold tracking-tight truncate", isLight ? "text-slate-900" : "text-white")}>
            {metrics.avgTradeFormatted}
          </div>
        </div>
        <div className={cn("text-[10px] truncate mt-1 flex items-center justify-between", isLight ? "text-slate-500" : "text-text-muted")}>
          <span className="text-success">{metrics.avgWinFormatted}</span>
          <span>/</span>
          <span className="text-danger">{metrics.avgLossFormatted}</span>
        </div>
      </div>
    </div>
  );
};
