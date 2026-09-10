"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StratDeskSymbol } from "@/components/ui/Logo";
import { TradingGrid } from "@/components/effects/TradingGrid";
import { GlowField } from "@/components/effects/GlowField";
import {
  AlertTriangle,
  ArrowRight,
  Home,
  Terminal,
  Compass,
  BookOpen,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden bg-background select-none font-mono">
      {/* Background Visual Effects */}
      <TradingGrid dense={true} fadeEdges={true} />
      <GlowField color="amber" position="center" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-6">
        {/* Brand Icon with Error Pulse */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <StratDeskSymbol size={48} glow={true} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>SYS_ERR 0x00000194 // ENDPOINT UNREACHABLE</span>
        </div>

        {/* Main Error Headline */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight leading-tight">
            404 // ROUTE DISCONNECTED
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-text-secondary font-sans max-w-lg mx-auto leading-relaxed">
            The requested telemetry endpoint or control route could not be resolved. Packets were dropped at the loopback boundary.
          </p>
        </div>

        {/* Diagnostic Terminal Card */}
        <div
          data-terminal="true"
          className="w-full text-left rounded-xl border border-slate-800 dark:border-white/10 bg-[#080b11] overflow-hidden text-xs shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 dark:bg-white/[0.03] border-b border-slate-800 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] text-slate-400 font-bold ml-2">
                ipc_diagnostic.log
              </span>
            </div>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
              CONNECTION_REFUSED
            </span>
          </div>

          <div className="p-4 space-y-1.5 font-mono text-[11px] leading-relaxed text-slate-300">
            <div>
              <span className="text-red-400 font-bold">[ERR 404]:</span>{" "}
              <span className="text-slate-400">URI routing failed to locate valid controller.</span>
            </div>
            <div>
              <span className="text-amber-400 font-bold">[GATEWAY]:</span>{" "}
              <span className="text-slate-400">Inbound socket request timed out after 1,000ms.</span>
            </div>
            <div>
              <span className="text-sky-400 font-bold">[DIAGNOSTIC]:</span>{" "}
              <span className="text-slate-400">Verify client route path or return to primary dashboard HUD.</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-slate-500 text-[10px]">
              <Terminal className="w-3 h-3 text-accent" />
              <span>RUNTIME: StratDesk v1.0.4 • HOST: localhost • IPC: Loopback</span>
            </div>
          </div>
        </div>

        {/* Recovery Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            href="/"
            variant="primary"
            size="lg"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
            glow={true}
          >
            RETURN TO COMMAND CENTER
          </Button>

          <Button
            href="/architectures"
            variant="outline"
            size="lg"
            icon={<Compass className="w-4 h-4" />}
            iconPosition="left"
          >
            EXPLORE 20 BLUEPRINTS
          </Button>

          <Button
            href="/docs"
            variant="outline"
            size="lg"
            icon={<BookOpen className="w-4 h-4" />}
            iconPosition="left"
          >
            READ DOCS
          </Button>
        </div>

        {/* Footer Note */}
        <div className="pt-6 text-[11px] text-slate-500 dark:text-text-muted flex items-center justify-center gap-4">
          <span>• 100% Self-Hosted</span>
          <span>• Zero Data Tracking</span>
          <span>• Active Health Nominal</span>
        </div>
      </div>
    </div>
  );
}
