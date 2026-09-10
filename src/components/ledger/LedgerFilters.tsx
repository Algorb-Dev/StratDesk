"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, Filter, Camera, X, RotateCcw } from "lucide-react";

interface LedgerFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  directionFilter: "ALL" | "LONG" | "SHORT";
  onDirectionChange: (d: "ALL" | "LONG" | "SHORT") => void;
  strategyFilter: string;
  onStrategyChange: (s: string) => void;
  regimeFilter: string;
  onRegimeChange: (r: string) => void;
  outcomeFilter: "ALL" | "WINNERS" | "LOSERS";
  onOutcomeChange: (o: "ALL" | "WINNERS" | "LOSERS") => void;
  isScreenshotMode: boolean;
  onToggleScreenshotMode: () => void;
  availableStrategies: string[];
  availableRegimes: string[];
  totalFilteredCount: number;
  totalCount: number;
  onResetFilters: () => void;
  isLight?: boolean;
}

export const LedgerFilters: React.FC<LedgerFiltersProps> = ({
  searchQuery,
  onSearchChange,
  directionFilter,
  onDirectionChange,
  strategyFilter,
  onStrategyChange,
  regimeFilter,
  onRegimeChange,
  outcomeFilter,
  onOutcomeChange,
  isScreenshotMode,
  onToggleScreenshotMode,
  availableStrategies,
  availableRegimes,
  totalFilteredCount,
  totalCount,
  onResetFilters,
  isLight = false,
}) => {
  const hasActiveFilters =
    searchQuery !== "" ||
    directionFilter !== "ALL" ||
    strategyFilter !== "ALL" ||
    regimeFilter !== "ALL" ||
    outcomeFilter !== "ALL";

  return (
    <div
      className={cn(
        "p-3.5 sm:p-4 rounded-lg border transition-colors font-mono flex flex-col gap-3",
        isLight
          ? "bg-white border-slate-200/90 shadow-sm"
          : "bg-surface/70 border-white/5"
      )}
    >
      {/* Top Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Live Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5", isLight ? "text-slate-400" : "text-text-muted")} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by symbol, strategy, or tag (e.g. BTC, Spread, #rebate)..."
            className={cn(
              "w-full pl-9 pr-8 py-2 text-xs rounded-lg border outline-none transition-all font-mono",
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                : "bg-black/30 border-white/10 text-white placeholder:text-text-muted focus:border-accent/60 focus:bg-black/50"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-semibold transition-colors border",
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                  : "bg-white/5 border-white/10 text-text-muted hover:text-white hover:border-white/20"
              )}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Screenshot Mode Toggle */}
          <button
            onClick={onToggleScreenshotMode}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-all border shrink-0",
              isScreenshotMode
                ? "bg-accent text-background border-accent shadow-glow-cyan"
                : isLight
                ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                : "bg-white/5 border-white/10 text-text-secondary hover:text-white hover:border-white/20"
            )}
            title="Toggle screenshot-optimized card layout"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isScreenshotMode ? "EXIT PROOF CARD" : "PROOF CARD"}</span>
            <span className="sm:hidden">{isScreenshotMode ? "EXIT" : "PROOF"}</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px]">
        <div className="flex flex-wrap items-center gap-2">
          {/* DIRECTION */}
          <div className="flex items-center gap-1">
            <span className={cn("font-bold uppercase tracking-wider mr-1", isLight ? "text-slate-500" : "text-text-muted")}>
              SIDE:
            </span>
            {(["ALL", "LONG", "SHORT"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => onDirectionChange(dir)}
                className={cn(
                  "px-2 py-1 rounded font-bold uppercase transition-all border",
                  directionFilter === dir
                    ? isLight
                      ? "bg-sky-50 text-sky-800 border-sky-300"
                      : "bg-accent/20 text-accent border-accent/40"
                    : isLight
                    ? "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
                    : "bg-white/[0.02] text-text-muted border-white/5 hover:text-white"
                )}
              >
                {dir}
              </button>
            ))}
          </div>

          {/* OUTCOME */}
          <div className="flex items-center gap-1">
            <span className={cn("font-bold uppercase tracking-wider mr-1", isLight ? "text-slate-500" : "text-text-muted")}>
              RESULT:
            </span>
            {(["ALL", "WINNERS", "LOSERS"] as const).map((out) => (
              <button
                key={out}
                onClick={() => onOutcomeChange(out)}
                className={cn(
                  "px-2 py-1 rounded font-bold uppercase transition-all border",
                  outcomeFilter === out
                    ? out === "WINNERS"
                      ? isLight ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-success/20 text-success border-success/40"
                      : out === "LOSERS"
                      ? isLight ? "bg-rose-50 text-rose-800 border-rose-300" : "bg-danger/20 text-danger border-danger/40"
                      : isLight ? "bg-sky-50 text-sky-800 border-sky-300" : "bg-accent/20 text-accent border-accent/40"
                    : isLight
                    ? "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
                    : "bg-white/[0.02] text-text-muted border-white/5 hover:text-white"
                )}
              >
                {out}
              </button>
            ))}
          </div>

          {/* STRATEGY DROPDOWN */}
          <div className="flex items-center gap-1">
            <select
              value={strategyFilter}
              onChange={(e) => onStrategyChange(e.target.value)}
              style={{ colorScheme: "dark" }}
              className="px-2.5 py-1 rounded border text-[10px] font-bold font-mono outline-none cursor-pointer bg-[#0c1017] border-white/15 text-slate-200 focus:border-accent shadow-sm"
            >
              <option value="ALL" className="bg-[#0c1017] text-slate-200 py-1 font-mono">ALL STRATEGIES</option>
              {availableStrategies.map((strat) => (
                <option key={strat} value={strat} className="bg-[#0c1017] text-slate-200 py-1 font-mono">
                  {strat}
                </option>
              ))}
            </select>
          </div>

          {/* REGIME DROPDOWN */}
          <div className="flex items-center gap-1">
            <select
              value={regimeFilter}
              onChange={(e) => onRegimeChange(e.target.value)}
              style={{ colorScheme: "dark" }}
              className="px-2.5 py-1 rounded border text-[10px] font-bold font-mono outline-none cursor-pointer bg-[#0c1017] border-white/15 text-slate-200 focus:border-accent shadow-sm"
            >
              <option value="ALL" className="bg-[#0c1017] text-slate-200 py-1 font-mono">ALL REGIMES</option>
              {availableRegimes.map((reg) => (
                <option key={reg} value={reg} className="bg-[#0c1017] text-slate-200 py-1 font-mono">
                  {reg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Matches Counter */}
        <div className={cn("text-[10px] shrink-0 font-medium", isLight ? "text-slate-500" : "text-text-muted")}>
          Showing <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>{totalFilteredCount}</span> of {totalCount} trades
        </div>
      </div>
    </div>
  );
};
