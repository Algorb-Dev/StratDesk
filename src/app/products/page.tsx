"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS, COMPARISON_FEATURES } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X, ArrowRight } from "lucide-react";

export default function ProductsPage() {

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            PRODUCT CATALOG & ARCHITECTURES
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            CHOOSE YOUR INTERFACE.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-text-secondary leading-relaxed font-sans">
            Whether you need non-invasive visual telemetry or a low-latency command center with an emergency kill-switch, Algorb provides the dedicated presentation layer for your trading bot.
          </p>
        </div>

        {/* Side-by-Side Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Card: Algorb View */}
          <div className="rounded-2xl bg-surface/80 border border-white/10 p-6 sm:p-8 flex flex-col justify-between group hover:border-accent/40 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="accent" size="sm" dot={true}>
                  READ-ONLY TELEMETRY
                </Badge>
                <span className="text-xs font-mono text-text-muted">v1.0 PERPETUAL</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white font-sans">
                {PRODUCTS.view.name}
              </h2>
              <p className="text-xs font-mono text-accent mt-1 uppercase tracking-wider">
                {PRODUCTS.view.tagline}
              </p>
              <p className="mt-4 text-sm text-text-secondary font-sans leading-relaxed">
                {PRODUCTS.view.description}
              </p>

              <div className="my-6 space-y-2.5 font-mono text-xs text-text-secondary border-t border-b border-white/10 py-6">
                {PRODUCTS.view.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-white/90">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">LAUNCH PRICE</span>
                <div className="text-2xl font-mono font-bold text-white">{PRODUCTS.view.pricePlaceholder}</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button href="/products/view" variant="outline" size="md">
                  VIEW SPECS
                </Button>
                <Button
                  href={PRODUCTS.view.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  GET ALGORB VIEW
                </Button>
              </div>
            </div>
          </div>

          {/* Card: Algorb Control */}
          <div className="rounded-2xl bg-surface/80 border border-warning/30 p-6 sm:p-8 flex flex-col justify-between group hover:border-warning transition-all shadow-xl ring-1 ring-warning/10">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="warning" size="sm" dot={true}>
                  MONITOR + COMMAND BUS
                </Badge>
                <span className="text-xs font-mono text-warning font-semibold">v1.0 PERPETUAL</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white font-sans">
                {PRODUCTS.control.name}
              </h2>
              <p className="text-xs font-mono text-warning mt-1 uppercase tracking-wider">
                {PRODUCTS.control.tagline}
              </p>
              <p className="mt-4 text-sm text-text-secondary font-sans leading-relaxed">
                {PRODUCTS.control.description}
              </p>

              <div className="my-6 space-y-2.5 font-mono text-xs text-text-secondary border-t border-b border-white/10 py-6">
                {PRODUCTS.control.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <span className="text-white/90">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">LAUNCH PRICE</span>
                <div className="text-2xl font-mono font-bold text-white">{PRODUCTS.control.pricePlaceholder}</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button href="/products/control" variant="outline" size="md">
                  VIEW SPECS
                </Button>
                <Button
                  href={PRODUCTS.control.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="control"
                  size="md"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  GET ALGORB CONTROL
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="rounded-2xl bg-surface border border-white/10 p-6 sm:p-10 font-mono text-xs shadow-2xl">
          <div className="pb-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-sans text-white">
                DETAILED CAPABILITY MATRIX
              </h3>
              <p className="text-text-muted text-xs mt-1">
                Comparing Algorb View (Read-Only) vs Algorb Control (Command Center)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent" /> Algorb View
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-warning" /> Algorb Control
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/5 pt-4">
            {COMPARISON_FEATURES.map((item) => (
              <div
                key={item.name}
                className="py-3 flex items-center justify-between gap-4 hover:bg-white/[0.02] px-2 rounded transition-colors"
              >
                <span className="text-text-primary text-xs sm:text-sm font-sans">
                  {item.name}
                </span>
                <div className="flex items-center gap-12 sm:gap-20 text-center font-bold">
                  {/* View column */}
                  <span className="w-16 flex justify-center">
                    {item.view ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <X className="w-4 h-4 text-text-muted opacity-40" />
                    )}
                  </span>
                  {/* Control column */}
                  <span className="w-16 flex justify-center">
                    {item.control ? (
                      <Check className="w-4 h-4 text-warning" />
                    ) : (
                      <X className="w-4 h-4 text-text-muted opacity-40" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
