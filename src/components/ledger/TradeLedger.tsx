"use client";

import React, { useState, useMemo } from "react";
import {
  DEMO_TRADE_LEDGER,
  LEDGER_MACRO_METRICS,
  TradeLedgerEntry,
} from "@/data/ledger-data";
import { LedgerMacroStats } from "./LedgerMacroStats";
import { LedgerPeriodicity } from "./LedgerPeriodicity";
import { LedgerPerformanceChart } from "./LedgerPerformanceChart";
import { LedgerFilters } from "./LedgerFilters";
import { LedgerTable } from "./LedgerTable";
import { AlgorbSymbol } from "@/components/ui/Logo";
import { THEMES } from "@/data/themes";
import { cn } from "@/lib/utils";
import { ShieldCheck, BookOpen, Download, Share2, Sparkles, CheckCircle2 } from "lucide-react";

interface TradeLedgerProps {
  className?: string;
  theme?: "terminal" | "obsidian" | "quant" | "command" | "vector" | "light";
  isLight?: boolean;
}

export const TradeLedger: React.FC<TradeLedgerProps> = ({
  className,
  theme = "obsidian",
  isLight = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState<"ALL" | "LONG" | "SHORT">("ALL");
  const [strategyFilter, setStrategyFilter] = useState<string>("ALL");
  const [regimeFilter, setRegimeFilter] = useState<string>("ALL");
  const [outcomeFilter, setOutcomeFilter] = useState<"ALL" | "WINNERS" | "LOSERS">("ALL");
  const [periodFilter, setPeriodFilter] = useState<string | null>(null);
  const [expandedTradeId, setExpandedTradeId] = useState<string | null>("TRD-2026-0907-142");
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[1];

  // Helper to match dates to periods
  const matchesPeriod = (entryTime: string, filter: string): boolean => {
    if (filter.startsWith("2026-W")) {
      const weekNum = parseInt(filter.replace("2026-W", ""), 10);
      const dateStr = entryTime.slice(0, 10);
      if (weekNum === 36) return dateStr >= "2026-09-01" && dateStr <= "2026-09-07";
      if (weekNum === 35) return dateStr >= "2026-08-25" && dateStr <= "2026-08-31";
      if (weekNum === 34) return dateStr >= "2026-08-18" && dateStr <= "2026-08-24";
      if (weekNum === 33) return dateStr >= "2026-08-11" && dateStr <= "2026-08-17";
      if (weekNum === 32) return dateStr >= "2026-08-04" && dateStr <= "2026-08-10";
      if (weekNum === 31) return dateStr >= "2026-07-28" && dateStr <= "2026-08-03";
      return true;
    }
    return entryTime.startsWith(filter);
  };

  // Distinct strategies & regimes from dataset
  const availableStrategies = useMemo(() => {
    return Array.from(new Set(DEMO_TRADE_LEDGER.map((t) => t.strategy))).sort();
  }, []);

  const availableRegimes = useMemo(() => {
    return Array.from(new Set(DEMO_TRADE_LEDGER.map((t) => t.marketRegime))).sort();
  }, []);

  // Filtered dataset
  const filteredTrades = useMemo(() => {
    return DEMO_TRADE_LEDGER.filter((trade) => {
      // Periodic Drilldown filter
      if (periodFilter && !matchesPeriod(trade.entryTime, periodFilter)) {
        return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSymbol = trade.symbol.toLowerCase().includes(q);
        const matchesStrategy = trade.strategy.toLowerCase().includes(q);
        const matchesRegime = trade.marketRegime.toLowerCase().includes(q);
        const matchesTags = trade.tags.some((t) => t.toLowerCase().includes(q));
        const matchesNotes = trade.notes.toLowerCase().includes(q);
        if (!matchesSymbol && !matchesStrategy && !matchesRegime && !matchesTags && !matchesNotes) {
          return false;
        }
      }

      // Direction
      if (directionFilter !== "ALL" && trade.direction !== directionFilter) {
        return false;
      }

      // Strategy
      if (strategyFilter !== "ALL" && trade.strategy !== strategyFilter) {
        return false;
      }

      // Regime
      if (regimeFilter !== "ALL" && trade.marketRegime !== regimeFilter) {
        return false;
      }

      // Outcome
      if (outcomeFilter === "WINNERS" && trade.pnl <= 0) return false;
      if (outcomeFilter === "LOSERS" && trade.pnl > 0) return false;

      return true;
    });
  }, [periodFilter, searchQuery, directionFilter, strategyFilter, regimeFilter, outcomeFilter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDirectionFilter("ALL");
    setStrategyFilter("ALL");
    setRegimeFilter("ALL");
    setOutcomeFilter("ALL");
    setPeriodFilter(null);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedTradeId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border transition-all duration-300 font-mono flex flex-col gap-4 overflow-hidden",
        isScreenshotMode ? "p-4 sm:p-7 ring-2 ring-accent/50 shadow-2xl" : "p-3 sm:p-4",
        isLight
          ? "bg-[#f8fafc] border-slate-300 text-slate-900"
          : "bg-surface/40 border-white/10 text-white",
        className
      )}
    >
      {/* Ledger Top Brand Telemetry Header */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 pb-3 border-b", isLight ? "border-slate-200" : "border-white/10")}>
        <div className="flex items-center gap-3">
          <AlgorbSymbol size={22} glow={!isLight} />
          <div>
            <div className="flex items-center gap-2">
              <span className={cn("font-bold tracking-widest text-sm uppercase", isLight ? "text-slate-900" : "text-white")}>
                ALGORB CONTROL // TRADE LEDGER
              </span>
              <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded border uppercase", isLight ? "border-amber-300 text-amber-800 bg-amber-50" : "border-warning/30 text-warning bg-warning/10")}>
                CONTROL EDITION
              </span>
            </div>
            <span className={cn("text-[10px] hidden sm:inline", isLight ? "text-slate-500" : "text-text-muted")}>
              Audited Institutional Execution Journal • Real-Time Bot Telemetry
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 text-[10px]">
          <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded border", isLight ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white/[0.03] border-white/5 text-success")}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-bold">IPC SYNCED</span>
          </div>
          <span className={cn("hidden lg:inline", isLight ? "text-slate-500" : "text-text-muted")}>
            LOCAL BIND: 127.0.0.1:9042
          </span>
        </div>
      </div>

      {/* 1. Macro Metrics Grid */}
      <LedgerMacroStats metrics={LEDGER_MACRO_METRICS} isLight={isLight} />

      {/* 2. Visual Analytics Section: Equity Curve & Periodicity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        <LedgerPerformanceChart
          accentColor={isLight ? "#0284c7" : activeTheme.colors.accent}
          isLight={isLight}
        />
        <LedgerPeriodicity
          isLight={isLight}
          selectedPeriodFilter={periodFilter}
          onFilterByPeriod={setPeriodFilter}
        />
      </div>

      {/* 3. Search & Multi-Dimensional Filters */}
      <LedgerFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        directionFilter={directionFilter}
        onDirectionChange={setDirectionFilter}
        strategyFilter={strategyFilter}
        onStrategyChange={setStrategyFilter}
        regimeFilter={regimeFilter}
        onRegimeChange={setRegimeFilter}
        outcomeFilter={outcomeFilter}
        onOutcomeChange={setOutcomeFilter}
        isScreenshotMode={isScreenshotMode}
        onToggleScreenshotMode={() => setIsScreenshotMode(!isScreenshotMode)}
        availableStrategies={availableStrategies}
        availableRegimes={availableRegimes}
        totalFilteredCount={filteredTrades.length}
        totalCount={DEMO_TRADE_LEDGER.length}
        onResetFilters={handleResetFilters}
        isLight={isLight}
      />

      {/* Active Timeframe Filter Indicator */}
      {periodFilter && (
        <div
          className={cn(
            "px-3 py-2 rounded-lg border flex items-center justify-between text-xs font-mono",
            isLight
              ? "bg-sky-50 border-sky-200 text-sky-900"
              : "bg-accent/10 border-accent/30 text-white"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold">ACTIVE TIMEFRAME FILTER:</span>
            <span
              className={cn(
                "px-1.5 py-0.5 rounded font-bold text-[11px]",
                isLight ? "bg-sky-200 text-sky-900" : "bg-accent/20 text-accent"
              )}
            >
              {periodFilter}
            </span>
            <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>
              ({filteredTrades.length} audited trades matching)
            </span>
          </div>
          <button
            onClick={() => setPeriodFilter(null)}
            className={cn(
              "text-[10px] font-bold uppercase underline hover:no-underline",
              isLight ? "text-sky-800" : "text-accent"
            )}
          >
            Clear Timeframe Filter
          </button>
        </div>
      )}

      {/* 4. Interactive Ledger Table */}
      <div
        className={cn(
          "rounded-lg border overflow-hidden",
          isLight ? "bg-white border-slate-200 shadow-sm" : "bg-surface/50 border-white/5"
        )}
      >
        <LedgerTable
          trades={filteredTrades}
          expandedTradeId={expandedTradeId}
          onToggleExpand={handleToggleExpand}
          isLight={isLight}
        />
      </div>

      {/* Screenshot Mode Watermark Footer */}
      {isScreenshotMode && (
        <div className={cn("p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 text-[10px]", isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-black/40 border-accent/30 text-text-secondary")}>
          <div className="flex items-center gap-2 font-bold">
            <AlgorbSymbol size={16} glow={!isLight} />
            <span>ALGORB CONTROL VERIFIED RUNTIME REPORT</span>
          </div>
          <div>
            <span>Generated: {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC</span>
            <span className="mx-2">•</span>
            <span className="text-accent font-bold">Sharpe: 2.84</span>
          </div>
        </div>
      )}
    </div>
  );
};
