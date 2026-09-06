"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Terminal, ArrowRight, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const TheProblem: React.FC = () => {
  const [activeView, setActiveView] = useState<"terminal" | "algorb">("algorb");

  return (
    <section className="relative py-28 bg-background-secondary border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Badge variant="warning" size="sm" className="mb-4">
            THE DEVELOPER&apos;S BOT DILEMMA
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
            YOUR BOT IS SMART. <br />
            <span className="text-text-muted">ITS INTERFACE SHOULDN&apos;T LOOK LIKE THIS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            You spent weeks engineering alpha models, backtesting slippage, and optimizing execution.
            Yet you still monitor your live capital through raw terminal scrollback, scattered tmux panes, and print statements.
          </p>

          {/* Interactive Toggle Pill */}
          <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-lg bg-surface border border-white/10">
            <button
              onClick={() => setActiveView("terminal")}
              className={cn(
                "px-4 py-2 text-xs font-mono font-bold rounded flex items-center gap-2 transition-all",
                activeView === "terminal"
                  ? "bg-danger/20 text-danger border border-danger/40"
                  : "text-text-muted hover:text-white"
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>TERMINAL CHAOS</span>
            </button>
            <button
              onClick={() => setActiveView("algorb")}
              className={cn(
                "px-4 py-2 text-xs font-mono font-bold rounded flex items-center gap-2 transition-all",
                activeView === "algorb"
                  ? "bg-accent text-background font-extrabold shadow-glow-cyan"
                  : "text-text-muted hover:text-white"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ALGORB COMMAND CENTER</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-surface">
          {activeView === "terminal" ? (
            /* Messy Terminal View */
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm bg-black/90 min-h-[500px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-text-secondary text-xs">user@vps-frankfurt-01: ~/trading-bot</span>
                </div>
                <span className="text-[10px] text-danger font-bold">[UNSTRUCTURED STDERR/STDOUT]</span>
              </div>

              <div className="py-6 flex flex-col gap-2 font-mono text-text-secondary leading-relaxed overflow-x-auto">
                <p className="text-text-muted"># Starting execution daemon at 2026-09-06T19:42:10Z</p>
                <p className="text-white font-bold">[ BOT RUNNING ] PID: 49201 - workers: 4</p>
                <p className="text-sky-400">19:42:11 [INFO] signal detected: Momentum-Alpha score +0.84 on ETHUSDT</p>
                <p className="text-text-primary">19:42:12 [DEBUG] position opened: LONG 6.20 ETH @ 3390.40</p>
                <p className="text-warning">19:42:13 [WARN] risk allocation 0.34 approaching warning cap</p>
                <p className="text-text-primary">19:42:14 [INFO] order submitted: LIMIT #88491 Post-Only</p>
                <p className="text-emerald-400">19:42:15 [INFO] position confirmed: 200 OK (latency: 14.1ms)</p>
                <p className="text-text-muted">19:42:18 [DEBUG] Heartbeat ping ok. Tick count: 184920</p>
                <p className="text-danger">
                  19:42:24 [WARN] ws ping drift 840ms on secondary book stream, retrying...
                </p>
                <p className="text-text-muted">{"19:42:29 [DEBUG] Current balance: { 'free': 18402.10, 'used': 6419.54, 'total': 24821.64 }"}</p>
                <p className="text-text-muted">{"19:42:35 [DEBUG] Active orders: [{'id': 88491, 'status': 'open', 'size': 0.25}]"}</p>
                <p className="text-yellow-300">19:42:41 [WARN] Terminal scrollback overflow. Truncating 1000 lines...</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-danger font-mono">
                <span>⚠️ High cognitive load. No instant kill-switch. Zero visual drawdown awareness.</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveView("algorb")}
                >
                  UPGRADE TO ALGORB
                </Button>
              </div>
            </div>
          ) : (
            /* Algorb Command Center View */
            <div className="p-3 sm:p-6 bg-background">
              <DashboardPreview product="control" theme="obsidian" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
