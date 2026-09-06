"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, ShieldCheck, ArrowRight, Activity, Terminal } from "lucide-react";

export default function ProductViewPage() {
  const product = PRODUCTS.view;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Tag */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link href="/products" className="hover:text-white transition-colors">
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-accent">ALGORB VIEW</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <Badge variant="accent" size="sm" dot={true} className="mb-4">
              {product.badge}
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-sans tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-text-secondary font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-white/10 flex flex-col gap-4 min-w-[280px]">
            <div>
              <span className="text-[10px] text-text-muted uppercase">LICENSE MODEL</span>
              <div className="text-sm font-bold text-white">Perpetual / Self-Hosted</div>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase">LAUNCH TIER</span>
              <div className="text-2xl font-bold text-accent">{product.pricePlaceholder}</div>
            </div>
            <Button
              href={product.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              glow={true}
            >
              GET ALGORB VIEW
            </Button>
          </div>
        </div>

        {/* Live Interactive Product Preview */}
        <div className="my-12 rounded-2xl border border-white/10 p-2 sm:p-6 bg-surface shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-text-muted">
            <span className="flex items-center gap-2 text-accent font-bold">
              <Activity className="w-4 h-4" />
              INTERACTIVE RUNTIME PREVIEW: ALGORB VIEW
            </span>
            <span>OBSIDIAN THEME (DEFAULT)</span>
          </div>
          <DashboardPreview product="view" theme="obsidian" />
        </div>

        {/* Deep Dive Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="p-6 rounded-xl bg-surface/70 border border-white/10">
            <ShieldCheck className="w-6 h-6 text-accent mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Zero Execution Access</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Algorb View operates on a strictly read-only adapter. It does not accept trading actions, ensuring absolute protection against unintended orders.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-white/10">
            <Activity className="w-6 h-6 text-success mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Tick-Level NAV Smoothing</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Real-time portfolio net asset value calculation with sub-millisecond local serialization and multi-timeframe historical memory.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-white/10">
            <Terminal className="w-6 h-6 text-warning mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Zero Dependency SDK</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Drop-in lightweight Python and TypeScript wrappers requiring zero heavy external frameworks. Runs side-by-side with your bot daemon.
            </p>
          </div>
        </div>

        {/* What's Included & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10">
            <h3 className="text-xl font-bold text-white font-sans mb-6">What&apos;s Included</h3>
            <div className="space-y-3 text-xs text-text-secondary">
              {product.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-white/90 font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-sans mb-6">Technical Requirements</h3>
              <div className="space-y-4 text-text-secondary">
                <div>
                  <span className="text-white font-bold block">Operating System:</span>
                  <span>Linux (Ubuntu/Debian/Arch), macOS, or Windows (WSL2 supported)</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Runtime Environment:</span>
                  <span>Docker 20+ or Node.js 18+ (standalone binary also included)</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Network Binding:</span>
                  <span>Local loopback (127.0.0.1:9042) or private Tailscale/VPN interface</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-text-muted text-[11px]">Ready to integrate?</span>
              <Button
                href={product.whopCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                GET ALGORB VIEW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
