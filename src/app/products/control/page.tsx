"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, ShieldAlert, Power, ArrowRight, Activity, Terminal, Key, ShieldCheck } from "lucide-react";

export default function ProductControlPage() {
  const product = PRODUCTS.control;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Top Tag */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link href="/products" className="hover:text-white transition-colors">
            PRODUCTS
          </Link>
          <span>/</span>
          <span className="text-warning font-bold">ALGORB CONTROL</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <Badge variant="warning" size="sm" dot={true} className="mb-4">
              {product.badge}
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-sans tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-text-secondary font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-warning/30 flex flex-col gap-4 min-w-[280px] ring-1 ring-warning/10">
            <div>
              <span className="text-[10px] text-text-muted uppercase">LICENSE MODEL</span>
              <div className="text-sm font-bold text-white">Perpetual / Self-Hosted</div>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase">LAUNCH TIER</span>
              <div className="text-2xl font-bold text-warning">{product.pricePlaceholder}</div>
            </div>
            <Button
              href={product.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="control"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              GET ALGORB CONTROL
            </Button>
          </div>
        </div>

        {/* Live Interactive Product Preview */}
        <div className="my-12 rounded-2xl border border-warning/30 p-2 sm:p-6 bg-surface shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-text-muted">
            <span className="flex items-center gap-2 text-warning font-bold">
              <Power className="w-4 h-4" />
              INTERACTIVE RUNTIME PREVIEW: ALGORB CONTROL
            </span>
            <span>COMMAND BUS ACTIVE • HMAC VERIFIED</span>
          </div>
          <DashboardPreview product="control" theme="command" />
        </div>

        {/* Deep Dive Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="p-6 rounded-xl bg-surface/70 border border-warning/20">
            <Power className="w-6 h-6 text-danger mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Emergency Kill-Switch</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Dispatches an immediate atomic command to your bot process: cancels all open limit orders across exchanges and market-flattens high-risk inventory.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-warning/20">
            <Key className="w-6 h-6 text-warning mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Cryptographic HMAC Verification</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Every dispatched control payload is signed using a local shared secret with HMAC-SHA256, guaranteeing that unauthorized network requests cannot trigger actions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-warning/20">
            <ShieldCheck className="w-6 h-6 text-accent mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Hot Parameter Reloading</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Adjust leverage caps, slippage tolerances, and per-symbol allocations on the fly without stopping your background process or clearing state caches.
            </p>
          </div>
        </div>

        {/* Feature Spotlight: Institutional Trade Ledger & Journal */}
        <div className="my-20 p-6 sm:p-10 rounded-2xl bg-surface/90 border border-accent/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <Badge variant="accent" size="sm" className="mb-3">
              EXCLUSIVE TO ALGORB CONTROL
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              INSTITUTIONAL TRADE LEDGER & JOURNAL.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
              Stop logging automated trades in spreadsheets or retail journals. Algorb Control includes an institutional trade ledger with forensic execution telemetry, automated R-multiple audits, market regime classification, and screenshot-worthy proof cards.
            </p>
          </div>

          {/* Interactive Ledger Preview */}
          <div className="mb-10">
            <DashboardPreview product="control" theme="obsidian" initialControlTab="ledger" />
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-background/80 border border-white/10">
              <div className="text-accent font-bold mb-1.5">01 // R-MULTIPLE AUDITS</div>
              <div className="font-bold text-white mb-1">Expectancy & Skew</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Normalized risk accounting tracking realized R-multiples, profit factor, and Sharpe ratio automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-white/10">
              <div className="text-warning font-bold mb-1.5">02 // FORENSIC TELEMETRY</div>
              <div className="font-bold text-white mb-1">Microsecond Fills</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Inspect Z-score triggers, book depth imbalance ratios, maker rebates, and execution latency for every trade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-white/10">
              <div className="text-success font-bold mb-1.5">03 // REGIME ANALYSIS</div>
              <div className="font-bold text-white mb-1">Market Condition Tagging</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Correlate strategy win rates across trend expansion, range compression, and liquidity hunt market regimes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-white/10">
              <div className="text-sky-400 font-bold mb-1.5">04 // PROOF CARDS</div>
              <div className="font-bold text-white mb-1">Screenshot-Ready Output</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                One-click watermarked proof cards formatted for LP reports, trader communities, and social media.
              </p>
            </div>
          </div>
        </div>

        {/* What's Included & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10">
            <h3 className="text-xl font-bold text-white font-sans mb-6">What&apos;s Included</h3>
            <div className="space-y-3 text-xs text-text-secondary">
              {product.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <span className="text-white/90 font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 font-mono text-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-sans mb-6">Technical Architecture</h3>
              <div className="space-y-4 text-text-secondary">
                <div>
                  <span className="text-white font-bold block">Command Dispatch Latency:</span>
                  <span>Average sub-1ms local loopback IPC transmission</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Security Handshake:</span>
                  <span>Time-based nonce + HMAC-SHA256 signature verification</span>
                </div>
                <div>
                  <span className="text-white font-bold block">Action Journaling:</span>
                  <span>Immutable local audit log recording every user intervention</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-text-muted text-[11px]">Deploy the command bridge:</span>
              <Button
                href={product.whopCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="control"
                size="sm"
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
  );
}
