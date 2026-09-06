import React from "react";
import { DEMO_POSITIONS, Position } from "@/data/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

interface PositionsTableProps {
  className?: string;
  positions?: Position[];
  compact?: boolean;
  isLight?: boolean;
}

export const PositionsTable: React.FC<PositionsTableProps> = ({
  className,
  positions = DEMO_POSITIONS,
  compact = false,
  isLight = false,
}) => {
  return (
    <div className={cn("w-full overflow-hidden flex flex-col", className)}>
      <div className={cn("flex items-center justify-between pb-2.5 border-b", isLight ? "border-slate-200" : "border-white/5")}>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-mono font-bold uppercase tracking-wider", isLight ? "text-slate-900" : "text-white")}>
            ACTIVE INVENTORY
          </span>
          <span className={cn("px-1.5 py-0.5 text-[9px] font-mono rounded border", isLight ? "bg-slate-100 text-slate-700 border-slate-200 font-semibold" : "text-text-muted bg-white/5 border-white/5")}>
            {positions.length} CONTRACTS
          </span>
        </div>
        <span className={cn("text-[10px] font-mono hidden sm:inline", isLight ? "text-slate-500 font-medium" : "text-text-muted")}>
          CROSS-MARGIN 5X CAP
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className={cn("text-[10px] uppercase border-b tracking-wider", isLight ? "text-slate-500 border-slate-200" : "text-text-muted border-white/5")}>
              <th className="py-2.5 font-medium">Market</th>
              <th className="py-2.5 font-medium">Size</th>
              <th className="py-2.5 font-medium">Entry</th>
              <th className="py-2.5 font-medium">Mark</th>
              <th className="py-2.5 font-medium">Liq. Buffer</th>
              <th className="py-2.5 font-medium text-right">Unrealized PnL</th>
            </tr>
          </thead>
          <tbody className={cn("divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {positions.map((pos) => {
              const isProfit = pos.unrealizedPnl >= 0;
              return (
                <tr
                  key={pos.id}
                  className={cn("transition-colors group", isLight ? "hover:bg-slate-50" : "hover:bg-white/[0.02]")}
                >
                  <td className="py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-1 py-0.5 text-[9px] font-bold rounded",
                          pos.side === "LONG"
                            ? isLight
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-success/15 text-success border border-success/30"
                            : isLight
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-danger/15 text-danger border border-danger/30"
                        )}
                      >
                        {pos.side}
                      </span>
                      <span className={cn("font-bold transition-colors", isLight ? "text-slate-900 group-hover:text-sky-600" : "text-white group-hover:text-accent")}>
                        {pos.symbol}
                      </span>
                      <span className={cn("text-[10px]", isLight ? "text-slate-400" : "text-text-muted")}>
                        {pos.leverage}
                      </span>
                    </div>
                  </td>
                  <td className={cn("py-2.5 whitespace-nowrap", isLight ? "text-slate-600 font-medium" : "text-text-secondary")}>
                    {pos.size}
                  </td>
                  <td className={cn("py-2.5 whitespace-nowrap", isLight ? "text-slate-600" : "text-text-secondary")}>
                    {formatCurrency(pos.entryPrice, pos.entryPrice < 100 ? 2 : 1)}
                  </td>
                  <td className={cn("py-2.5 whitespace-nowrap font-medium", isLight ? "text-slate-900" : "text-white")}>
                    {formatCurrency(pos.markPrice, pos.markPrice < 100 ? 2 : 1)}
                  </td>
                  <td className="py-2.5 whitespace-nowrap">
                    <span className={cn("text-[11px]", isLight ? "text-slate-500" : "text-text-muted")}>
                      {pos.liquidationBuffer}
                    </span>
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span
                        className={cn(
                          "font-bold",
                          isProfit
                            ? isLight ? "text-emerald-700" : "text-success"
                            : isLight ? "text-rose-700" : "text-danger"
                        )}
                      >
                        {isProfit ? "+" : ""}
                        {formatCurrency(pos.unrealizedPnl)}
                      </span>
                      <span
                        className={cn(
                          "text-[10px]",
                          isProfit
                            ? isLight ? "text-emerald-600 font-medium" : "text-success/80"
                            : isLight ? "text-rose-600 font-medium" : "text-danger/80"
                        )}
                      >
                        {isProfit ? "+" : ""}
                        {pos.pnlPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Recomposition */}
      <div className={cn("sm:hidden flex flex-col divide-y pt-1", isLight ? "divide-slate-100" : "divide-white/5")}>
        {positions.map((pos) => {
          const isProfit = pos.unrealizedPnl >= 0;
          return (
            <div key={pos.id} className="py-2.5 flex items-center justify-between gap-2 font-mono">
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "px-1 py-0.5 text-[8px] font-bold rounded",
                      pos.side === "LONG"
                        ? isLight ? "bg-emerald-50 text-emerald-700" : "bg-success/15 text-success"
                        : isLight ? "bg-rose-50 text-rose-700" : "bg-danger/15 text-danger"
                    )}
                  >
                    {pos.side}
                  </span>
                  <span className={cn("text-xs font-bold", isLight ? "text-slate-900" : "text-white")}>{pos.symbol}</span>
                  <span className={cn("text-[10px]", isLight ? "text-slate-400" : "text-text-muted")}>{pos.leverage}</span>
                </div>
                <div className={cn("text-[10px] mt-0.5", isLight ? "text-slate-500" : "text-text-muted")}>
                  Size: {pos.size} • Mark: {formatCurrency(pos.markPrice, 1)}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "text-xs font-bold",
                    isProfit
                      ? isLight ? "text-emerald-700" : "text-success"
                      : isLight ? "text-rose-700" : "text-danger"
                  )}
                >
                  {isProfit ? "+" : ""}
                  {formatCurrency(pos.unrealizedPnl)}
                </div>
                <div
                  className={cn(
                    "text-[10px]",
                    isProfit
                      ? isLight ? "text-emerald-600 font-medium" : "text-success/80"
                      : isLight ? "text-rose-600 font-medium" : "text-danger/80"
                  )}
                >
                  {isProfit ? "+" : ""}
                  {pos.pnlPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
