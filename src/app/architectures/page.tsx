import React from "react";
import { Metadata } from "next";
import { ArchitectureMatrix } from "@/components/architectures/ArchitectureMatrix";
import { FinalCta } from "@/components/cta/FinalCta";
import { Compass, ShieldCheck, Zap, Layers, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "20 Specialized Trading Bot Dashboard Architectures",
  description:
    "Explore 20 distinct, production-grade dashboard architectures built specifically for quantitative, algorithmic, and automated trading bots across crypto, equities, and derivatives.",
};

export default function ArchitecturesPage() {
  return (
    <div className="flex flex-col w-full pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center space-y-6 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>BLUEPRINT DIRECTORY // 20 PRE-CONFIGURED TOPOLOGIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          20 SPECIALIZED ARCHITECTURES. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 dark:from-accent dark:via-white dark:to-accent/80">
            ZERO GENERIC DASHBOARDS.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-text-secondary max-w-3xl mx-auto font-sans leading-relaxed">
          Generic SaaS dashboards fail algorithmic traders. A mempool sniper requires gas priority queues, not multi-year candlestick charts. A prop trader lives or dies by the <span className="text-slate-900 dark:text-white font-mono font-bold">Daily Drawdown Halo</span>. Explore 20 distinct, purpose-built architectures ready to connect directly to your execution engine.
        </p>

        {/* Feature Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs text-slate-600 dark:text-text-muted">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-slate-100/80 dark:bg-white/[0.02]">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>Sub-Millisecond IPC Streaming</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-slate-100/80 dark:bg-white/[0.02]">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Zero Remote Keys / 100% Localhost</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-slate-100/80 dark:bg-white/[0.02]">
            <Layers className="w-3.5 h-3.5 text-warning" />
            <span>6 Precision Themes Supported</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Matrix Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        <ArchitectureMatrix />
      </section>

      {/* Bottom Conversion CTA */}
      <FinalCta />
    </div>
  );
}
