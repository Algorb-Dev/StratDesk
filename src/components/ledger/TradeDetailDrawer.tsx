"use client";

import React, { useState } from "react";
import { TradeLedgerEntry } from "@/data/ledger-data";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Check,
  Copy,
  Cpu,
  Zap,
  Activity,
  Tag,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";

interface TradeDetailDrawerProps {
  trade: TradeLedgerEntry;
  onClose?: () => void;
  isLight?: boolean;
}

export const TradeDetailDrawer: React.FC<TradeDetailDrawerProps> = ({
  trade,
  onClose,
  isLight = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const isProfit = trade.pnl >= 0;

  const handleCopyReceipt = (activeTrade: TradeLedgerEntry = trade) => {
    const ticketId = activeTrade.ticket || activeTrade.id;
    const zScoreVal = activeTrade.telemetry?.zScore ?? activeTrade.zScore ?? 0;
    const confVal = activeTrade.telemetry?.signalConfidence ?? activeTrade.confidence ?? 0;
    const latencyVal = activeTrade.telemetry?.executionLatencyMs ?? 1.2;
    const bookDepthVal = activeTrade.telemetry?.bookDepthRatio ?? 2.4;
    const regimeVal = activeTrade.marketRegime || activeTrade.regime || "Unspecified";
    const returnVal = activeTrade.pnlPercent ?? activeTrade.returnPct ?? 0;
    const slippageVal =
      activeTrade.slippage ||
      (activeTrade.slippageBps !== undefined ? `${activeTrade.slippageBps} bps` : "0.0 bps");

    const receipt = `
[ STRATDESK FORENSIC AUDIT ]
Ticket:       ${ticketId}
Symbol:       ${activeTrade.symbol}
Direction:    ${activeTrade.direction}
Leverage:     ${activeTrade.leverage}
Strategy:     ${activeTrade.strategy}
Regime:       ${regimeVal}
Size:         ${activeTrade.size}
Notional:     ${formatCurrency(activeTrade.notionalValue)}
Entry Price:  ${formatCurrency(activeTrade.entryPrice, activeTrade.entryPrice < 100 ? 2 : 1)}
Exit Price:   ${formatCurrency(activeTrade.exitPrice, activeTrade.exitPrice < 100 ? 2 : 1)}
Entry Time:   ${activeTrade.entryTime}
Exit Time:    ${activeTrade.exitTime}
Duration:     ${activeTrade.duration}
Realized P&L: ${activeTrade.pnl >= 0 ? "+" : ""}${formatCurrency(activeTrade.pnl)} (${returnVal >= 0 ? "+" : ""}${returnVal.toFixed(2)}%)
R-Multiple:   ${activeTrade.rMultiple > 0 ? "+" : ""}${activeTrade.rMultiple.toFixed(1)}R
Order Type:   ${activeTrade.orderType}
Slippage:     ${slippageVal}
Fees/Rebate:  ${activeTrade.fees >= 0 ? "+" : ""}${formatCurrency(activeTrade.fees)}
Z-Score:      ${zScoreVal}σ
Confidence:   ${(confVal * 100).toFixed(1)}%
IPC Latency:  ${latencyVal}ms
Book Depth:   ${bookDepthVal}x
Notes:        ${activeTrade.notes}
Tags:         ${activeTrade.tags?.join(" ") || ""}
----------------------------------
Verified by StratDesk Pro Telemetry Bus
Timestamp:    ${new Date().toISOString()}
`.trim();

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(receipt);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-xl border transition-all font-mono text-xs flex flex-col gap-4 animate-in fade-in-50 duration-200",
        isLight
          ? "bg-slate-50/90 border-slate-300 shadow-md text-slate-900"
          : "bg-surface-elevated/90 border-accent/40 shadow-2xl text-white ring-1 ring-accent/20"
      )}
    >
      {/* Header Bar */}
      <div className={cn("flex flex-wrap items-center justify-between gap-3 pb-3 border-b", isLight ? "border-slate-200" : "border-white/10")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("font-bold text-sm tracking-wider", isLight ? "text-slate-900" : "text-white")}>
            FORENSIC AUDIT: {trade.ticket || trade.id}
          </span>
          <span
            className={cn(
              "px-1.5 py-0.5 text-[9px] font-bold rounded uppercase",
              trade.direction === "LONG"
                ? isLight ? "bg-emerald-50 text-emerald-700 border border-emerald-300" : "bg-success/20 text-success border border-success/40"
                : isLight ? "bg-rose-50 text-rose-700 border border-rose-300" : "bg-danger/20 text-danger border border-danger/40"
            )}
          >
            {trade.direction} {trade.leverage}
          </span>
          <span className={cn("px-2 py-0.5 text-[10px] rounded font-semibold border", isLight ? "bg-white text-slate-700 border-slate-300" : "bg-white/5 text-text-secondary border-white/10")}>
            {trade.strategy}
          </span>
          <span className={cn("px-2 py-0.5 text-[10px] rounded font-semibold border", isLight ? "bg-sky-50 text-sky-800 border-sky-200" : "bg-accent/10 text-accent border-accent/20")}>
            {trade.marketRegime || trade.regime}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopyReceipt(trade)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase transition-all border",
              isCopied
                ? "bg-success text-black border-success"
                : isLight
                ? "bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-sm"
                : "bg-white/10 text-white border-white/20 hover:bg-white/15"
            )}
          >
            {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{isCopied ? "Copied!" : "Copy Audit Receipt"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className={cn("p-1.5 rounded border transition-colors", isLight ? "hover:bg-slate-200 border-slate-300" : "hover:bg-white/10 border-white/10")}
              title="Close details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={cn("p-2.5 rounded-lg border", isLight ? "bg-white border-slate-200" : "bg-black/30 border-white/5")}>
          <span className={cn("text-[10px] uppercase font-semibold", isLight ? "text-slate-500" : "text-text-muted")}>
            REALIZED NET P&L
          </span>
          <div className={cn("text-lg font-bold mt-0.5", isProfit ? (isLight ? "text-emerald-700" : "text-success") : (isLight ? "text-rose-700" : "text-danger"))}>
            {isProfit ? "+" : ""}{formatCurrency(trade.pnl)}
          </div>
          <span className={cn("text-[10px]", isProfit ? "text-success" : "text-danger")}>
            {isProfit ? "+" : ""}{trade.pnlPercent.toFixed(2)}% ROE
          </span>
        </div>

        <div className={cn("p-2.5 rounded-lg border", isLight ? "bg-white border-slate-200" : "bg-black/30 border-white/5")}>
          <span className={cn("text-[10px] uppercase font-semibold", isLight ? "text-slate-500" : "text-text-muted")}>
            R-MULTIPLE UNIT
          </span>
          <div className={cn("text-lg font-bold mt-0.5", trade.rMultiple >= 0 ? (isLight ? "text-sky-700" : "text-accent") : (isLight ? "text-rose-700" : "text-danger"))}>
            {trade.rMultiple >= 0 ? "+" : ""}{trade.rMultiple.toFixed(1)}R
          </div>
          <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>
            Risk normalized
          </span>
        </div>

        <div className={cn("p-2.5 rounded-lg border", isLight ? "bg-white border-slate-200" : "bg-black/30 border-white/5")}>
          <span className={cn("text-[10px] uppercase font-semibold", isLight ? "text-slate-500" : "text-text-muted")}>
            EXECUTION DURATION
          </span>
          <div className={cn("text-lg font-bold mt-0.5 flex items-center gap-1", isLight ? "text-slate-900" : "text-white")}>
            <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
            <span>{trade.duration}</span>
          </div>
          <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>
            Entry: {trade.entryTime.split(" ")[1]}
          </span>
        </div>

        <div className={cn("p-2.5 rounded-lg border", isLight ? "bg-white border-slate-200" : "bg-black/30 border-white/5")}>
          <span className={cn("text-[10px] uppercase font-semibold", isLight ? "text-slate-500" : "text-text-muted")}>
            FEES & SLIPPAGE
          </span>
          <div className={cn("text-lg font-bold mt-0.5", trade.fees >= 0 ? "text-success" : (isLight ? "text-slate-800" : "text-white"))}>
            {trade.fees >= 0 ? `+${formatCurrency(trade.fees)} (Rebate)` : formatCurrency(trade.fees)}
          </div>
          <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>
            Slippage: {trade.slippage}
          </span>
        </div>
      </div>

      {/* Execution Timeline & Telemetry Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Execution Prices & Fills */}
        <div className={cn("p-3 rounded-lg border flex flex-col justify-between gap-2.5", isLight ? "bg-white border-slate-200" : "bg-black/20 border-white/5")}>
          <span className={cn("font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5", isLight ? "text-slate-800" : "text-white")}>
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            FILL ARCHITECTURE & NOTIONAL
          </span>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className={isLight ? "text-slate-500" : "text-text-muted"}>Entry Fill:</span>
              <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>
                {formatCurrency(trade.entryPrice, trade.entryPrice < 100 ? 2 : 1)} @ {trade.entryTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isLight ? "text-slate-500" : "text-text-muted"}>Exit Fill:</span>
              <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>
                {formatCurrency(trade.exitPrice, trade.exitPrice < 100 ? 2 : 1)} @ {trade.exitTime}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isLight ? "text-slate-500" : "text-text-muted"}>Executed Size / Notional:</span>
              <span className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>
                {trade.size} ({formatCurrency(trade.notionalValue)})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isLight ? "text-slate-500" : "text-text-muted"}>Routing Order Type:</span>
              <span className="font-bold text-accent">{trade.orderType}</span>
            </div>
          </div>
        </div>

        {/* Right: Algorithmic Telemetry */}
        <div className={cn("p-3 rounded-lg border flex flex-col justify-between gap-2.5", isLight ? "bg-white border-slate-200" : "bg-black/20 border-white/5")}>
          <span className={cn("font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5", isLight ? "text-slate-800" : "text-white")}>
            <Cpu className="w-3.5 h-3.5 text-warning" />
            BOT TELEMETRY & DECISION SIGNALS
          </span>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/5")}>
              <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>Model Z-Score</span>
              <div className={cn("font-bold text-xs mt-0.5", isLight ? "text-slate-900" : "text-white")}>
                {trade.telemetry.zScore.toFixed(2)}σ
              </div>
            </div>
            <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/5")}>
              <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>Signal Confidence</span>
              <div className="font-bold text-xs text-success mt-0.5">
                {(trade.telemetry.signalConfidence * 100).toFixed(1)}%
              </div>
            </div>
            <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/5")}>
              <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>IPC Order Latency</span>
              <div className="font-bold text-xs text-accent mt-0.5">
                {trade.telemetry.executionLatencyMs.toFixed(1)}ms
              </div>
            </div>
            <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/5")}>
              <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>Book Depth Imbalance</span>
              <div className="font-bold text-xs text-warning mt-0.5">
                {trade.telemetry.bookDepthRatio.toFixed(1)}x Ratio
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Bot Notes & Tags */}
      <div className={cn("p-3 rounded-lg border flex flex-col gap-2", isLight ? "bg-white border-slate-200" : "bg-black/20 border-white/5")}>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted">
          <Tag className="w-3 h-3 text-accent" />
          <span>ALGORITHMIC EXECUTION NOTES & BOT POST-MORTEM</span>
        </div>
        <p className={cn("text-[11px] leading-relaxed font-sans", isLight ? "text-slate-700" : "text-text-secondary")}>
          {trade.notes}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {trade.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-0.5 text-[9px] font-bold rounded border uppercase",
                isLight ? "bg-slate-100 text-slate-700 border-slate-300" : "bg-white/5 text-accent border-white/10"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
