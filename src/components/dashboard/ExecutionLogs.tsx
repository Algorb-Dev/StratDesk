"use client";

import React, { useState, useEffect } from "react";
import { DEMO_LOGS, TradeLog } from "@/data/demo-data";
import { cn } from "@/lib/utils";

interface ExecutionLogsProps {
  className?: string;
  maxLogs?: number;
  autoStream?: boolean;
}

export const ExecutionLogs: React.FC<ExecutionLogsProps> = ({
  className,
  maxLogs = 6,
  autoStream = true,
}) => {
  const [logs, setLogs] = useState<TradeLog[]>(DEMO_LOGS);
  const [isLive, setIsLive] = useState(true);

  // Periodic heartbeat simulation
  useEffect(() => {
    if (!autoStream || !isLive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${Math.floor(
        Math.random() * 900 + 100
      )}`;

      const simulatedEvents: Array<Omit<TradeLog, "id" | "timestamp">> = [
        {
          type: "FILL",
          level: "success",
          message: `Maker fill confirmed: BUY 0.12 BTC-PERP @ $63,124.50 (rebate 0.5 bps)`,
          latencyMs: +(Math.random() * 8 + 8).toFixed(1),
        },
        {
          type: "RISK",
          level: "info",
          message: `Portfolio delta recheck: Beta exposure 0.14 within limits`,
          latencyMs: +(Math.random() * 4 + 2).toFixed(1),
        },
        {
          type: "SIGNAL",
          level: "info",
          message: `Strategy [Spread Arbitrage] matched orderbook imbalance: 1.84x`,
          latencyMs: +(Math.random() * 3 + 1).toFixed(1),
        },
        {
          type: "HEARTBEAT",
          level: "info",
          message: `WebSocket IPC frame synced (tick_drift: 0.6ms, mem: 79.1MB)`,
          latencyMs: +(Math.random() * 10 + 8).toFixed(1),
        },
      ];

      const chosen = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];

      const newLog: TradeLog = {
        id: `live-${Date.now()}`,
        timestamp: timeStr,
        ...chosen,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, maxLogs - 1)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoStream, isLive, maxLogs]);

  const levelBadge = {
    info: "text-text-muted bg-white/5 border-white/10",
    success: "text-success bg-success/10 border-success/30",
    warning: "text-warning bg-warning/10 border-warning/30",
    error: "text-danger bg-danger/10 border-danger/30",
  };

  const typeColor = {
    FILL: "text-success font-bold",
    ORDER: "text-accent font-bold",
    RISK: "text-warning font-semibold",
    SIGNAL: "text-sky-400 font-semibold",
    HEARTBEAT: "text-text-muted",
    CONTROL: "text-amber-400 font-bold",
  };

  return (
    <div className={cn("flex flex-col h-full font-mono text-xs", className)}>
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            EXECUTION JOURNAL
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-1.5 px-1.5 py-0.5 text-[9px] bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isLive ? "bg-accent animate-pulse" : "bg-text-muted"
              )}
            />
            <span className="text-text-secondary">{isLive ? "STREAMING" : "PAUSED"}</span>
          </button>
        </div>
        <span className="text-[10px] text-text-muted hidden sm:inline">
          IPC WS://127.0.0.1:9042
        </span>
      </div>

      <div className="divide-y divide-white/5 overflow-y-auto max-h-[220px] pt-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className="py-2 px-1 hover:bg-white/[0.02] transition-colors flex items-start justify-between gap-3 text-[11px]"
          >
            <div className="flex items-start gap-2 min-w-0 flex-1">
              <span className="text-text-muted text-[10px] whitespace-nowrap pt-0.5">
                {log.timestamp}
              </span>
              <span
                className={cn(
                  "px-1 py-0.5 text-[9px] rounded border uppercase whitespace-nowrap",
                  levelBadge[log.level]
                )}
              >
                <span className={typeColor[log.type]}>{log.type}</span>
              </span>
              <span className="text-text-primary truncate">
                {log.message}
              </span>
            </div>
            {log.latencyMs && (
              <span className="text-[10px] text-text-muted whitespace-nowrap pl-2">
                {log.latencyMs}ms
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
