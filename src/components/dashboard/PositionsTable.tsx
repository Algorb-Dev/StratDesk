import React from "react";
import { DEMO_POSITIONS, Position } from "@/data/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

interface PositionsTableProps {
  className?: string;
  positions?: Position[];
  compact?: boolean;
}

export const PositionsTable: React.FC<PositionsTableProps> = ({
  className,
  positions = DEMO_POSITIONS,
  compact = false,
}) => {
  return (
    <div className={cn("w-full overflow-hidden flex flex-col", className)}>
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            ACTIVE INVENTORY
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-mono text-text-muted bg-white/5 rounded border border-white/5">
            {positions.length} CONTRACTS
          </span>
        </div>
        <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
          CROSS-MARGIN 5X CAP
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="text-[10px] text-text-muted uppercase border-b border-white/5 tracking-wider">
              <th className="py-2.5 font-medium">Market</th>
              <th className="py-2.5 font-medium">Size</th>
              <th className="py-2.5 font-medium">Entry</th>
              <th className="py-2.5 font-medium">Mark</th>
              <th className="py-2.5 font-medium">Liq. Buffer</th>
              <th className="py-2.5 font-medium text-right">Unrealized PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {positions.map((pos) => {
              const isProfit = pos.unrealizedPnl >= 0;
              return (
                <tr
                  key={pos.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-1 py-0.5 text-[9px] font-bold rounded",
                          pos.side === "LONG"
                            ? "bg-success/15 text-success border border-success/30"
                            : "bg-danger/15 text-danger border border-danger/30"
                        )}
                      >
                        {pos.side}
                      </span>
                      <span className="font-bold text-white group-hover:text-accent transition-colors">
                        {pos.symbol}
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {pos.leverage}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-text-secondary whitespace-nowrap">
                    {pos.size}
                  </td>
                  <td className="py-2.5 text-text-secondary whitespace-nowrap">
                    {formatCurrency(pos.entryPrice, pos.entryPrice < 100 ? 2 : 1)}
                  </td>
                  <td className="py-2.5 text-white whitespace-nowrap">
                    {formatCurrency(pos.markPrice, pos.markPrice < 100 ? 2 : 1)}
                  </td>
                  <td className="py-2.5 whitespace-nowrap">
                    <span className="text-text-muted text-[11px]">
                      {pos.liquidationBuffer}
                    </span>
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span
                        className={cn(
                          "font-bold",
                          isProfit ? "text-success" : "text-danger"
                        )}
                      >
                        {isProfit ? "+" : ""}
                        {formatCurrency(pos.unrealizedPnl)}
                      </span>
                      <span
                        className={cn(
                          "text-[10px]",
                          isProfit ? "text-success/80" : "text-danger/80"
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
      <div className="sm:hidden flex flex-col divide-y divide-white/5 pt-1">
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
                        ? "bg-success/15 text-success"
                        : "bg-danger/15 text-danger"
                    )}
                  >
                    {pos.side}
                  </span>
                  <span className="text-xs font-bold text-white">{pos.symbol}</span>
                  <span className="text-[10px] text-text-muted">{pos.leverage}</span>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Size: {pos.size} • Mark: {formatCurrency(pos.markPrice, 1)}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "text-xs font-bold",
                    isProfit ? "text-success" : "text-danger"
                  )}
                >
                  {isProfit ? "+" : ""}
                  {formatCurrency(pos.unrealizedPnl)}
                </div>
                <div
                  className={cn(
                    "text-[10px]",
                    isProfit ? "text-success/80" : "text-danger/80"
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
