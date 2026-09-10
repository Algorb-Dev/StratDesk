import React from "react";
import { Badge } from "@/components/ui/Badge";
import { StratDeskSymbol } from "@/components/ui/Logo";
import { Shield, Lock, ArrowDown, ArrowRight, Server, Database, Key, Radio } from "lucide-react";

export const BotArchitecture: React.FC = () => {
  return (
    <section className="relative py-28 border-b border-border bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            SEPARATION OF CONCERNS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            YOUR BOT STAYS YOURS. <br />
            <span className="text-text-muted">WE ARE STRICTLY THE INTERFACE LAYER.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            StratDesk never asks for your exchange API private keys, never proxies your live order execution, and never stores your alpha code on external servers.
          </p>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="relative max-w-5xl mx-auto rounded-2xl bg-surface border border-border p-6 sm:p-10 font-mono text-xs shadow-2xl">
          {/* Top Security Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border">
            <div className="flex items-center gap-2 text-success font-bold">
              <Shield className="w-4 h-4" />
              <span>ZERO EXTERNAL CLOUD DEPENDENCIES</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Lock className="w-3.5 h-3.5" />
              <span>API Keys Never Leave Your Bot Process</span>
            </div>
          </div>

          {/* Architecture Pipeline Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
            {/* Step 1: Your Strategy */}
            <div className="p-5 rounded-xl bg-background border border-border flex flex-col justify-between hover:border-accent/40 transition-colors group shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-2">
                  <span>CUSTOMER INFRA</span>
                  <span className="text-slate-900 dark:text-white font-bold">01</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white font-sans group-hover:text-accent transition-colors">
                  YOUR STRATEGY
                </div>
                <p className="mt-2 text-[11px] text-text-secondary font-sans leading-relaxed">
                  Python, Rust, C++, Go, or TypeScript algorithms generating alpha and risk metrics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-[10px] text-text-muted">
                <Key className="w-3 h-3 text-warning" />
                <span>Proprietary IP</span>
              </div>
            </div>

            {/* Step 2: Your Execution Engine */}
            <div className="p-5 rounded-xl bg-background border border-border flex flex-col justify-between hover:border-accent/40 transition-colors group shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-2">
                  <span>CUSTOMER INFRA</span>
                  <span className="text-slate-900 dark:text-white font-bold">02</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white font-sans group-hover:text-accent transition-colors">
                  EXECUTION ENGINE
                </div>
                <p className="mt-2 text-[11px] text-text-secondary font-sans leading-relaxed">
                  CCXT, FIX engine, order router, or custom exchange connector managing resting orders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-[10px] text-text-muted">
                <Server className="w-3 h-3 text-accent" />
                <span>Runs on your VPS</span>
              </div>
            </div>

            {/* Step 3: Your Exchange */}
            <div className="p-5 rounded-xl bg-background border border-border flex flex-col justify-between hover:border-accent/40 transition-colors group shadow-sm">
              <div>
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-2">
                  <span>MARKET VENUE</span>
                  <span className="text-slate-900 dark:text-white font-bold">03</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white font-sans group-hover:text-accent transition-colors">
                  YOUR BROKER / EXCHANGE
                </div>
                <p className="mt-2 text-[11px] text-text-secondary font-sans leading-relaxed">
                  Direct connection via your own API keys to Binance, Bybit, Hyperliquid, Interactive Brokers, etc.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-1 text-[10px] text-text-muted">
                <Database className="w-3 h-3 text-text-secondary" />
                <span>Direct Liquidity</span>
              </div>
            </div>

            {/* Step 4: StratDesk Interface */}
            <div className="p-5 rounded-xl bg-accent/10 border-2 border-accent/60 flex flex-col justify-between shadow-glow-cyan">
              <div>
                <div className="flex items-center justify-between text-[10px] text-accent font-bold mb-2">
                  <span>PRESENTATION LAYER</span>
                  <span>04</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white font-sans flex items-center gap-2">
                  <StratDeskSymbol size={18} />
                  <span>STRATDESK INTERFACE</span>
                </div>
                <p className="mt-2 text-[11px] text-text-secondary font-sans leading-relaxed">
                  Local WebSocket telemetry bridge that renders high-density visual dashboards and optional command triggers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-accent/20 flex items-center gap-1 text-[10px] text-accent font-bold">
                <Radio className="w-3 h-3 text-accent" />
                <span>Local IPC Stream</span>
              </div>
            </div>
          </div>

          {/* Explanatory Technical Notes Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border text-xs text-text-secondary font-sans">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Zero Lock-In</span>
              If you turn off StratDesk, your bot continues trading without disruption. It has zero dependency on StratDesk staying online.
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Local Loopback</span>
              By default, the telemetry adapter binds to `127.0.0.1:9042`. No internet connection required for local monitoring.
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Encrypted Remote</span>
              Access your dashboard remotely using your existing Tailscale, WireGuard, or SSH tunneling infrastructure.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
