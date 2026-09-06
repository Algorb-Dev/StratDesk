"use client";

import React, { useState } from "react";
import { AlertOctagon, Play, Pause, ShieldCheck, Power, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlBarProps {
  className?: string;
  onKillSwitch?: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({ className }) => {
  const [botState, setBotState] = useState<"RUNNING" | "PAUSED" | "HALTED">("RUNNING");
  const [killArmed, setKillArmed] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState<Record<string, boolean>>({
    "Alpha-V2": true,
    "MeanRev": true,
    "Arbitrage": true,
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const toggleStrategy = (strat: string) => {
    setActiveStrategies((prev) => {
      const next = { ...prev, [strat]: !prev[strat] };
      setFeedbackMessage(`Strategy [${strat}] ${next[strat] ? "RESUMED" : "PAUSED"}`);
      setTimeout(() => setFeedbackMessage(null), 3000);
      return next;
    });
  };

  const handleStateToggle = () => {
    if (botState === "RUNNING") {
      setBotState("PAUSED");
      setFeedbackMessage("Command dispatched: PAUSE_EXECUTION (Soft-drain open orders)");
    } else {
      setBotState("RUNNING");
      setFeedbackMessage("Command dispatched: RESUME_EXECUTION (All workers active)");
    }
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleEmergencyHalt = () => {
    if (!killArmed) {
      setKillArmed(true);
      setFeedbackMessage("CONFIRM EMERGENCY KILL-SWITCH: Press again to flatten & cancel all");
      setTimeout(() => setKillArmed(false), 5000);
      return;
    }

    setBotState("HALTED");
    setKillArmed(false);
    setFeedbackMessage("EMERGENCY KILL-SWITCH ENGAGED: Resting orders canceled. Risk flattened.");
  };

  const handleReset = () => {
    setBotState("RUNNING");
    setFeedbackMessage("System state restored to normal execution.");
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <div className={cn("flex flex-col gap-3 p-3.5 rounded-lg bg-warning/5 border border-warning/20 font-mono", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-warning uppercase tracking-wider">
            <Power className="w-3.5 h-3.5" />
            CONTROL BUS INTERFACE
          </span>
          <span className="px-1.5 py-0.5 text-[9px] bg-warning/10 text-warning border border-warning/30 rounded font-semibold">
            HMAC-SHA256 SIGNED
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <ShieldCheck className="w-3 h-3 text-success" />
          <span>LOCAL BIND: 127.0.0.1:9042</span>
        </div>
      </div>

      {/* Interactive Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        {/* State Toggle */}
        <button
          onClick={handleStateToggle}
          disabled={botState === "HALTED"}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold transition-all border",
            botState === "RUNNING"
              ? "bg-white/5 border-white/10 text-white hover:border-warning/50 hover:text-warning"
              : "bg-success/15 border-success/40 text-success hover:bg-success/25"
          )}
        >
          {botState === "RUNNING" ? (
            <>
              <Pause className="w-3.5 h-3.5 text-warning" />
              <span>PAUSE ALL ORDERS</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>RESUME WORKERS</span>
            </>
          )}
        </button>

        {/* Strategy Toggles */}
        <div className="flex items-center justify-between gap-1 px-2 py-1 bg-surface-elevated rounded border border-white/5">
          {Object.entries(activeStrategies).map(([strat, isActive]) => (
            <button
              key={strat}
              onClick={() => toggleStrategy(strat)}
              className={cn(
                "px-2 py-1 text-[10px] rounded font-medium transition-colors flex-1",
                isActive
                  ? "bg-accent/15 text-accent border border-accent/30 font-bold"
                  : "bg-white/5 text-text-muted hover:text-white"
              )}
            >
              {strat}: {isActive ? "ON" : "OFF"}
            </button>
          ))}
        </div>

        {/* Emergency Kill Switch */}
        {botState === "HALTED" ? (
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/15"
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span>RESET TO STANDBY</span>
          </button>
        ) : (
          <button
            onClick={handleEmergencyHalt}
            className={cn(
              "flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold transition-all border",
              killArmed
                ? "bg-danger text-white border-danger animate-pulse shadow-lg"
                : "bg-danger/15 text-danger border-danger/40 hover:bg-danger/25"
            )}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{killArmed ? "CONFIRM EMERGENCY HALT" : "EMERGENCY KILL-SWITCH"}</span>
          </button>
        )}
      </div>

      {/* Realtime Feedback Strip */}
      {feedbackMessage && (
        <div className="px-2.5 py-1.5 text-[11px] bg-black/40 border border-white/10 rounded text-text-primary flex items-center justify-between">
          <span>{feedbackMessage}</span>
          <span className="text-[9px] text-text-muted">LATENCY: 0.8ms</span>
        </div>
      )}
    </div>
  );
};
