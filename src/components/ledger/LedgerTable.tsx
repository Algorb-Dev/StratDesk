"use client";

import React, { useState } from "react";
import { TradeLedgerEntry } from "@/data/ledger-data";
import { TradeDetailDrawer } from "./TradeDetailDrawer";
import { formatCurrency, cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Clock, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface LedgerTableProps {
  trades: TradeLedgerEntry[];
  expandedTradeId: string | null;
  onToggleExpand: (id: string) => void;
  isLight?: boolean;
}

export const LedgerTable: React.FC<LedgerTableProps> = ({
  trades,
  expandedTradeId,
  onToggleExpand,
  isLight = false,
}) => {
  if (trades.length === 0) {
    return (
      <div
        className={cn(
          "p-8 rounded-lg border text-center font-mono text-xs",
          isLight ? "bg-white border-slate-200 text-slate-500" : "bg-surface/50 border-white/5 text-text-muted"
        )}
      >
        No trades matched your active filter parameters. Try broadening your search or resetting filters.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-mono text-xs">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={cn(
                "text-[10px] uppercase border-b tracking-wider select-none",
                isLight ? "text-slate-500 border-slate-200 bg-slate-50/70" : "text-text-muted border-white/5 bg-white/[0.01]"
              )}
            >
              <th className="py-2.5 px-3 font-medium">Time / ID</th>
              <th className="py-2.5 px-3 font-medium">Market & Side</th>
              <th className="py-2.5 px-3 font-medium">Strategy & Regime</th>
              <th className="py-2.5 px-3 font-medium">Entry → Exit</th>
              <th className="py-2.5 px-3 font-medium">Duration</th>
              <th className="py-2.5 px-3 font-medium text-right">R-Multiple</th>
              <th className="py-2.5 px-3 font-medium text-right">Realized Net P&L</th>
              <th className="py-2.5 px-3 text-center w-8"></th>
            </tr>
          </thead>
          <tbody className={cn("divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {trades.map((trade) => {
              const isExpanded = expandedTradeId === trade.id;
              const isProfit = trade.pnl >= 0;

              return (
                <React.Fragment key={trade.id}>
                  <tr
                    onClick={() => onToggleExpand(trade.id)}
                    className={cn(
                      "cursor-pointer transition-all duration-150 group",
                      isExpanded
                        ? isLight ? "bg-sky-50/60" : "bg-white/[0.05]"
                        : isLight ? "hover:bg-slate-50" : "hover:bg-white/[0.02]"
                    )}
                  >
                    {/* Timestamp & ID */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={cn("text-[11px] font-bold", isLight ? "text-slate-900" : "text-white")}>
                          {trade.entryTime.split(" ")[1]}
                        </span>
                        <span className={cn("text-[9px]", isLight ? "text-slate-400" : "text-text-muted")}>
                          {trade.id.replace("TRD-2026-", "#")}
                        </span>
                      </div>
                    </td>

                    {/* Market & Direction */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "px-1 py-0.5 text-[8px] font-bold rounded",
                            trade.direction === "LONG"
                              ? isLight ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-success/15 text-success border border-success/30"
                              : isLight ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-danger/15 text-danger border border-danger/30"
                          )}
                        >
                          {trade.direction}
                        </span>
                        <span className={cn("font-bold text-xs transition-colors", isLight ? "text-slate-900 group-hover:text-sky-600" : "text-white group-hover:text-accent")}>
                          {trade.symbol}
                        </span>
                        <span className={cn("text-[9px]", isLight ? "text-slate-400" : "text-text-muted")}>
                          {trade.leverage}
                        </span>
                      </div>
                    </td>

                    {/* Strategy & Regime */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className={cn("text-[11px] font-medium truncate max-w-[150px]", isLight ? "text-slate-800" : "text-white")}>
                          {trade.strategy}
                        </span>
                        <span className={cn("text-[9px] truncate max-w-[150px]", isLight ? "text-sky-700" : "text-accent")}>
                          {trade.marketRegime}
                        </span>
                      </div>
                    </td>

                    {/* Entry → Exit */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className={cn(isLight ? "text-slate-600" : "text-text-secondary")}>
                          {formatCurrency(trade.entryPrice, trade.entryPrice < 100 ? 2 : 1)}
                        </span>
                        <span className="text-text-muted">→</span>
                        <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>
                          {formatCurrency(trade.exitPrice, trade.exitPrice < 100 ? 2 : 1)}
                        </span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={cn("text-[11px] flex items-center gap-1", isLight ? "text-slate-600" : "text-text-muted")}>
                        <Clock className="w-3 h-3 text-text-muted shrink-0" />
                        <span>{trade.duration}</span>
                      </span>
                    </td>

                    {/* R-Multiple */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-[10px] font-bold rounded border inline-block",
                          trade.rMultiple >= 0
                            ? isLight ? "bg-sky-50 text-sky-800 border-sky-200" : "bg-accent/15 text-accent border-accent/30"
                            : isLight ? "bg-rose-50 text-rose-800 border-rose-200" : "bg-danger/15 text-danger border-danger/30"
                        )}
                      >
                        {trade.rMultiple >= 0 ? "+" : ""}{trade.rMultiple.toFixed(1)}R
                      </span>
                    </td>

                    {/* Realized Net P&L */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex flex-col items-end">
                        <span
                          className={cn(
                            "font-bold text-xs",
                            isProfit
                              ? isLight ? "text-emerald-700" : "text-success"
                              : isLight ? "text-rose-700" : "text-danger"
                          )}
                        >
                          {isProfit ? "+" : ""}{formatCurrency(trade.pnl)}
                        </span>
                        <span
                          className={cn(
                            "text-[10px]",
                            isProfit
                              ? isLight ? "text-emerald-600" : "text-success/80"
                              : isLight ? "text-rose-600" : "text-danger/80"
                          )}
                        >
                          {isProfit ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>

                    {/* Expand Trigger Icon */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className={cn("w-5 h-5 rounded flex items-center justify-center transition-colors", isLight ? "text-slate-400 group-hover:text-slate-900" : "text-text-muted group-hover:text-white")}>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </td>
                  </tr>

                  {/* Expandable Forensic Audit Drawer */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={8} className="p-2 sm:p-3 bg-transparent">
                        <TradeDetailDrawer
                          trade={trade}
                          onClose={() => onToggleExpand(trade.id)}
                          isLight={isLight}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Recomposition */}
      <div className={cn("md:hidden flex flex-col divide-y", isLight ? "divide-slate-200" : "divide-white/5")}>
        {trades.map((trade) => {
          const isExpanded = expandedTradeId === trade.id;
          const isProfit = trade.pnl >= 0;

          return (
            <div key={trade.id} className="py-3 flex flex-col gap-2">
              <div
                onClick={() => onToggleExpand(trade.id)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={cn(
                      "px-1 py-0.5 text-[8px] font-bold rounded shrink-0",
                      trade.direction === "LONG"
                        ? isLight ? "bg-emerald-50 text-emerald-700" : "bg-success/20 text-success"
                        : isLight ? "bg-rose-50 text-rose-700" : "bg-danger/20 text-danger"
                    )}
                  >
                    {trade.direction}
                  </span>
                  <div className="truncate">
                    <div className={cn("font-bold text-xs truncate", isLight ? "text-slate-900" : "text-white")}>
                      {trade.symbol} <span className={cn("text-[10px] font-normal", isLight ? "text-slate-500" : "text-text-muted")}>{trade.leverage}</span>
                    </div>
                    <div className={cn("text-[9px] truncate", isLight ? "text-slate-500" : "text-text-muted")}>
                      {trade.strategy} • {trade.duration}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-2">
                  <div>
                    <div className={cn("text-xs font-bold", isProfit ? (isLight ? "text-emerald-700" : "text-success") : (isLight ? "text-rose-700" : "text-danger"))}>
                      {isProfit ? "+" : ""}{formatCurrency(trade.pnl)}
                    </div>
                    <div className={cn("text-[10px]", trade.rMultiple >= 0 ? "text-accent" : "text-danger")}>
                      {trade.rMultiple >= 0 ? "+" : ""}{trade.rMultiple.toFixed(1)}R ({trade.pnlPercent.toFixed(1)}%)
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-text-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-text-muted" />}
                </div>
              </div>

              {isExpanded && (
                <div className="pt-2">
                  <TradeDetailDrawer
                    trade={trade}
                    onClose={() => onToggleExpand(trade.id)}
                    isLight={isLight}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
