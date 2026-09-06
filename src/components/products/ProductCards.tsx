"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, Activity, ShieldAlert } from "lucide-react";

export const ProductCards: React.FC = () => {

  return (
    <section id="products" className="relative py-28 border-b border-white/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            CHOOSE YOUR INTERFACE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            TWO ARCHITECTURES. <br />
            <span className="text-text-muted">TOTAL VISIBILITY OR TOTAL CONTROL.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            Select the interface that matches your operational requirements. From passive read-only telemetry to an active command bridge with an emergency kill-switch.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Algorb View */}
          <div className="relative rounded-2xl bg-surface/80 border border-white/10 hover:border-accent/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-xl">
            <div>
              {/* Product Badge & Type */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="accent" size="sm" dot={true}>
                  MONITORING ONLY
                </Badge>
                <span className="text-[10px] font-mono text-text-muted">
                  READ-ONLY ADAPTER
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-3">
                <span>{PRODUCTS.view.name}</span>
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed font-sans">
                {PRODUCTS.view.tagline}
              </p>

              {/* Visual Preview Shell */}
              <div className="my-6 p-4 rounded-xl bg-black/50 border border-white/10 group-hover:border-accent/30 transition-colors font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1.5 text-accent font-bold">
                    <Activity className="w-3 h-3" />
                    LIVE TELEMETRY STREAM
                  </span>
                  <span>ZERO WRITE KEYS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3">
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-[9px] text-text-muted">NAV</div>
                    <div className="text-sm font-bold text-white">$24,821.64</div>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-[9px] text-text-muted">DRAWDOWN</div>
                    <div className="text-sm font-bold text-success">4.21%</div>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-[9px] text-text-muted">WIN RATE</div>
                    <div className="text-sm font-bold text-white">72.4%</div>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted flex items-center justify-between pt-1">
                  <span>Open Positions: 4</span>
                  <span className="text-accent">Latency: 12ms</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 font-mono text-xs text-text-secondary mb-8">
                {PRODUCTS.view.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-white/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Price Placeholder */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">LAUNCH TIER</span>
                <div className="text-xl font-mono font-bold text-white">{PRODUCTS.view.pricePlaceholder}</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  href="/products/view"
                  variant="outline"
                  size="md"
                  className="flex-1 sm:flex-initial"
                >
                  DEEP SPECS
                </Button>
                <Button
                  href={PRODUCTS.view.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="flex-1 sm:flex-initial"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  GET ALGORB VIEW
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: Algorb Control */}
          <div className="relative rounded-2xl bg-surface/80 border border-warning/30 hover:border-warning transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group shadow-xl ring-1 ring-warning/10">
            <div>
              {/* Product Badge & Type */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="warning" size="sm" dot={true}>
                  MONITOR + COMMAND CENTER
                </Badge>
                <span className="text-[10px] font-mono text-warning font-semibold">
                  ACTIVE CONTROL BUS
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-3">
                <span>{PRODUCTS.control.name}</span>
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed font-sans">
                {PRODUCTS.control.tagline}
              </p>

              {/* Visual Preview Shell */}
              <div className="my-6 p-4 rounded-xl bg-black/50 border border-warning/20 group-hover:border-warning/50 transition-colors font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1.5 text-warning font-bold">
                    <ShieldAlert className="w-3 h-3" />
                    BIDIRECTIONAL COMMAND BUS
                  </span>
                  <span>HMAC-SHA256</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3">
                  <div className="p-2 rounded bg-danger/10 border border-danger/30 text-center">
                    <div className="text-[9px] text-danger font-bold">KILL-SWITCH</div>
                    <div className="text-xs font-bold text-white mt-0.5">ARMED</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 text-center">
                    <div className="text-[9px] text-text-muted">PAUSE / RESUME</div>
                    <div className="text-xs font-bold text-success mt-0.5">ACTIVE</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 text-center">
                    <div className="text-[9px] text-text-muted">HOT RELOAD</div>
                    <div className="text-xs font-bold text-white mt-0.5">READY</div>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted flex items-center justify-between pt-1">
                  <span>Strategy Toggles: 3 Online</span>
                  <span className="text-warning">Command Ping: 0.8ms</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 font-mono text-xs text-text-secondary mb-8">
                {PRODUCTS.control.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <span className="text-white/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Price Placeholder */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">LAUNCH TIER</span>
                <div className="text-xl font-mono font-bold text-white">{PRODUCTS.control.pricePlaceholder}</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  href="/products/control"
                  variant="outline"
                  size="md"
                  className="flex-1 sm:flex-initial"
                >
                  DEEP SPECS
                </Button>
                <Button
                  href={PRODUCTS.control.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="control"
                  size="md"
                  className="flex-1 sm:flex-initial"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  GET ALGORB CONTROL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
