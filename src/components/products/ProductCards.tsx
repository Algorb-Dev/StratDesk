"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Check,
  ArrowRight,
  Activity,
  ShieldAlert,
  Power,
  ShieldCheck,
  Layers,
  Terminal,
  Zap,
} from "lucide-react";

export const ProductCards: React.FC = () => {
  const product = PRODUCTS.pro;

  return (
    <section id="products" className="relative py-28 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            FLAGSHIP RUNTIME
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            STRATDESK PRO. <br />
            <span className="text-text-muted">TOTAL VISIBILITY & ACTIVE CONTROL.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
            The complete, self-hosted operational runtime for algorithmic trading bots. All 20 specialized blueprints, bidirectional IPC command bus, and forensic trade ledger included in a single perpetual license.
          </p>
        </div>

        {/* Unified Flagship Product Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-surface border border-warning/40 hover:border-warning transition-all duration-300 p-6 sm:p-10 shadow-2xl ring-1 ring-warning/10 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-warning/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Badge variant="warning" size="sm" dot={true}>
                {product.badge}
              </Badge>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                VERSION 1.0 PERPETUAL
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-accent/10 text-accent border border-accent/20">
                <Layers className="w-3 h-3" />
                20 BLUEPRINTS UNLOCKED
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-warning/10 text-warning border border-warning/20">
                <Zap className="w-3 h-3" />
                ACTIVE COMMAND BUS
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start">
            {/* Left 7 Columns: Product Highlights & Terminal Shell */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-warning">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed font-sans">
                  {product.description}
                </p>

                {/* Interactive Simulated Command HUD Box */}
                <div data-terminal="true" className="my-6 p-4 rounded-xl bg-slate-950 dark:bg-black/60 border border-warning/30 font-mono text-xs text-white shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] text-text-muted">
                    <span className="flex items-center gap-1.5 text-warning font-bold">
                      <ShieldAlert className="w-3 h-3" />
                      BIDIRECTIONAL COMMAND BUS // ACTIVE
                    </span>
                    <span className="text-emerald-400 font-bold">HMAC-SHA256 SIGNED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-3">
                    <div className="p-2 rounded bg-danger/10 border border-danger/30 text-center">
                      <div className="text-[9px] text-danger font-bold">KILL-SWITCH</div>
                      <div className="text-xs font-bold text-white mt-0.5">ARMED</div>
                    </div>
                    <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                      <div className="text-[9px] text-text-muted">PAUSE / RESUME</div>
                      <div className="text-xs font-bold text-success mt-0.5">ACTIVE</div>
                    </div>
                    <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                      <div className="text-[9px] text-text-muted">HOT RELOAD</div>
                      <div className="text-xs font-bold text-white mt-0.5">READY</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-text-muted flex items-center justify-between pt-1">
                    <span>Active Telemetry: 20 Archetypes</span>
                    <span className="text-warning font-bold">IPC Latency: 0.8ms</span>
                  </div>
                </div>
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-2.5 font-mono text-xs text-text-secondary">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <span className="text-slate-800 dark:text-white/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Pricing & Action Box */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-100/90 dark:bg-surface-elevated border border-border p-6 sm:p-8 flex flex-col justify-between h-full shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-text-muted uppercase tracking-wider font-semibold">
                    LAUNCH SPECIAL
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    EARLY BIRD -$10
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-mono font-extrabold text-slate-900 dark:text-white">
                    ${product.price}
                  </span>
                  <span className="text-xl font-mono line-through text-slate-500 dark:text-text-muted">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-text-muted uppercase">USD</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
                  One-time payment. Perpetual self-hosted license with zero recurring subscription fees. Full source code included.
                </p>

                {/* Key Guarantees */}
                <div className="mt-6 space-y-2.5 pt-6 border-t border-border font-mono text-[11px] text-slate-700 dark:text-text-muted">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-slate-200">100% Self-hosted on your machine or VPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span>Zero telemetry, zero external tracking, private IPC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span>Instant .zip source download (React 19 + Next.js)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span>Python (ccxt/asyncio), TypeScript, & Go SDK adapters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span className="text-amber-700 dark:text-warning font-semibold">Perpetual Code Ownership & Dedicated Support</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Button
                  href={product.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="control"
                  size="lg"
                  className="w-full justify-center text-sm font-bold shadow-xl ring-2 ring-warning/30"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  GET STRATDESK PRO • $49
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    href="/products/pro"
                    variant="outline"
                    size="md"
                    className="w-full justify-center text-xs"
                  >
                    VIEW SPECS & FILES
                  </Button>
                  <Button
                    href="/#dashboard-lab"
                    variant="secondary"
                    size="md"
                    className="w-full justify-center text-xs"
                  >
                    TEST IN LAB
                  </Button>
                </div>
                <p className="text-[10px] text-center font-mono text-text-muted pt-1">
                  🔒 Instant Whop Checkout • Perpetual License • No Recurring Fees
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
