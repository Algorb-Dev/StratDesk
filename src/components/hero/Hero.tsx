"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { GlowField } from "@/components/effects/GlowField";
import { TradingGrid } from "@/components/effects/TradingGrid";
import { ArrowRight, Terminal, FlaskConical, AlertTriangle, Sparkles, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Hero: React.FC = () => {
  const [activeView, setActiveView] = useState<"terminal" | "stratdesk">("terminal");

  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient Visual Effects */}
      <TradingGrid dense={false} fadeEdges={true} />
      <GlowField color="cyan" position="top" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="accent" size="sm" dot={true} pulse={true}>
            INTERFACE LAYER FOR CUSTOM TRADING BOTS
          </Badge>
        </div>

        {/* Dramatic Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white max-w-5xl leading-[1.1] sm:leading-[1.08]">
          YOUR BOT DESERVES{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 dark:from-accent dark:via-white dark:to-accent glow-text">
            A BETTER INTERFACE.
          </span>
        </h1>

        {/* Technical Sub-copy */}
        <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl font-sans leading-relaxed">
          You spent weeks engineering alpha models, backtesting slippage, and optimizing execution.
          Yet you still monitor live capital through raw terminal scrollback, scattered tmux panes, and print statements. StratDesk Pro gives your bot the institutional interface it deserves.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Button
            href="#products"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto text-sm font-bold shadow-glow-cyan"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            glow={true}
          >
            GET STRATDESK PRO • $49
          </Button>
          <Button
            href="/lab"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto text-sm font-bold"
            icon={<FlaskConical className="w-4 h-4" />}
            iconPosition="left"
          >
            OPEN LAB SIMULATOR ↗
          </Button>
        </div>

        {/* Social Proof & Trust Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-slate-700 dark:text-slate-200 font-semibold">4.9/5 Rating</span>
          </div>
          <span className="text-border">•</span>
          <span className="text-slate-700 dark:text-text-secondary">350+ Quantitative Traders</span>
          <span className="text-border">•</span>
          <span className="text-emerald-700 dark:text-success font-semibold">100% Self-Hosted & Private</span>
        </div>

        {/* Live System Specs Ticker */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary">
            ⚡ Sub-1ms Local Loopback IPC
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary">
            🛡️ 20 Specialized Archetypes
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary">
            📊 Automated Forensic Ledger
          </span>
          <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-text-secondary">
            🔒 HMAC-SHA256 Signed Bus
          </span>
        </div>

        {/* Interactive Before/After Toggle Pill */}
        <div className="mt-12 mb-6 inline-flex items-center gap-2 p-1.5 rounded-xl bg-surface border border-border shadow-lg">
          <button
            onClick={() => setActiveView("terminal")}
            className={cn(
              "px-4 py-2.5 text-xs font-mono font-bold rounded-lg flex items-center gap-2 transition-all cursor-pointer",
              activeView === "terminal"
                ? "bg-danger/20 text-danger border border-danger/40 shadow-sm"
                : "text-text-muted hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>TERMINAL CHAOS (WHAT YOU HAVE)</span>
          </button>
          <button
            onClick={() => setActiveView("stratdesk")}
            className={cn(
              "px-4 py-2.5 text-xs font-mono font-bold rounded-lg flex items-center gap-2 transition-all cursor-pointer",
              activeView === "stratdesk"
                ? "bg-accent text-slate-950 font-extrabold shadow-glow-cyan"
                : "text-text-muted hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>STRATDESK PRO COMMAND CENTER (THE UPGRADE)</span>
          </button>
        </div>

        {/* High-Fidelity Hero Container: Terminal Chaos vs StratDesk Pro */}
        <div className="w-full max-w-6xl relative">
          {/* Subtle Ambient Radial Lighting under preview */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-transparent to-accent/10 blur-xl opacity-60 pointer-events-none" />

          {/* Dynamic Display */}
          <div className="relative transform transition-transform duration-500 rounded-2xl border border-border overflow-hidden shadow-2xl bg-surface text-left">
            {activeView === "terminal" ? (
              /* Messy Terminal View */
              <div data-terminal="true" className="p-5 sm:p-8 font-mono text-xs sm:text-sm bg-black/95 min-h-[520px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-text-muted">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                      <span className="ml-2 text-text-secondary text-xs">user@vps-frankfurt-01: ~/trading-bot</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-danger font-bold uppercase tracking-wider">[UNSTRUCTURED STDERR/STDOUT]</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                        tmux pane 0:1
                      </span>
                    </div>
                  </div>

                  <div className="py-6 flex flex-col gap-2 font-mono text-text-secondary leading-relaxed overflow-x-auto">
                    <p className="text-text-muted"># Starting execution daemon at 2026-09-06T19:42:10Z</p>
                    <p className="text-white font-bold">[ BOT RUNNING ] PID: 49201 - workers: 4 - mem: 142MB</p>
                    <p className="text-sky-400">19:42:11 [INFO] signal detected: Momentum-Alpha score +0.84 on ETHUSDT</p>
                    <p className="text-text-primary">19:42:12 [DEBUG] position opened: LONG 6.20 ETH @ 3390.40</p>
                    <p className="text-amber-400">19:42:13 [WARN] risk allocation 0.34 approaching warning cap (0.35)</p>
                    <p className="text-text-primary">19:42:14 [INFO] order submitted: LIMIT #88491 Post-Only</p>
                    <p className="text-emerald-400">19:42:15 [INFO] position confirmed: 200 OK (exchange ack latency: 14.1ms)</p>
                    <p className="text-text-muted">19:42:18 [DEBUG] Heartbeat ping ok. Tick count: 184920</p>
                    <p className="text-red-400">
                      19:42:24 [WARN] ws ping drift 840ms on secondary book stream, retrying socket...
                    </p>
                    <p className="text-text-muted">{"19:42:29 [DEBUG] Current balance: { 'free': 18402.10, 'used': 6419.54, 'total': 24821.64, 'unrealized': 882.40 }"}</p>
                    <p className="text-text-muted">{"19:42:35 [DEBUG] Active orders: [{'id': 88491, 'symbol': 'ETHUSDT', 'side': 'BUY', 'size': 0.25, 'price': 3388.10}]"}</p>
                    <p className="text-yellow-300">19:42:41 [WARN] Terminal scrollback buffer overflow. Truncating 1000 lines...</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-danger">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>High cognitive load • No emergency kill-switch • Zero visual drawdown awareness</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveView("stratdesk")}
                    className="shadow-glow-cyan text-xs"
                    icon={<Sparkles className="w-3.5 h-3.5" />}
                    iconPosition="left"
                  >
                    TOGGLE STRATDESK PRO VIEW
                  </Button>
                </div>
              </div>
            ) : (
              /* StratDesk Pro Full Command Center View */
              <div className="p-2 sm:p-4 bg-background">
                <DashboardPreview
                  product="pro"
                  defaultTheme="obsidian"
                  isHero={true}
                  variant="full"
                  showArchitectureSwitcher={true}
                  showThemeSwitcher={true}
                  className="border-white/15"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

