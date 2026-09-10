"use client";

import React from "react";
import { PRODUCTS } from "@/data/products";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Check,
  Power,
  ArrowRight,
  Key,
  ShieldCheck,
  Zap,
  Lock,
  ExternalLink,
} from "lucide-react";

export const ProHeroSection: React.FC = () => {
  const product = PRODUCTS.pro;

  return (
    <section className="pt-28 sm:pt-36 pb-16 bg-background font-mono overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Live Specs Ticker */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-text-muted mb-8 pb-4 border-b border-border">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-accent font-semibold">
            <Zap className="w-3 h-3 text-accent animate-pulse" />
            SUB-1MS LOCAL IPC
          </span>
          <span className="text-text-muted/40">•</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-text-secondary">
            <ShieldCheck className="w-3 h-3 text-success" />
            20 UNLOCKED ARCHETYPES
          </span>
          <span className="text-text-muted/40">•</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface border border-border text-text-secondary">
            <Lock className="w-3 h-3 text-warning" />
            HMAC-SHA256 SIGNED
          </span>
          <span className="text-text-muted/40">•</span>
          <span className="text-emerald-400 font-semibold">100% SELF-HOSTED // PERPETUAL LICENSE</span>
        </div>

        {/* Hero Header & Sticky Pricing Box */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="warning" size="sm" dot={true}>
                {product.badge}
              </Badge>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="text-amber-400">★★★★★</span> 4.9/5 (350+ QUANT TRADERS)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-sans tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-text-secondary font-sans leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-6 rounded-2xl bg-surface border border-warning/30 flex flex-col gap-4 min-w-[280px] w-full sm:w-auto ring-1 ring-warning/10 shadow-2xl">
            <div>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                LICENSE MODEL
              </span>
              <div className="text-sm font-bold text-white">Perpetual / Self-Hosted</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-text-muted uppercase font-mono font-semibold">
                  LAUNCH SPECIAL
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  EARLY BIRD -$10
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-extrabold text-warning">
                  ${product.price}
                </span>
                <span className="text-base font-mono line-through text-text-muted">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-mono text-text-muted">USD</span>
              </div>
            </div>
            <Button
              href={product.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="control"
              size="lg"
              className="font-bold shadow-glow-amber justify-center"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              GET STRATDESK PRO
            </Button>
            <div className="text-[10px] text-text-muted text-center flex items-center justify-center gap-1.5 pt-1 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Full source code • No monthly fees</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Product Preview */}
        <div className="my-12 rounded-2xl border border-warning/30 p-2 sm:p-6 bg-surface shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border text-xs text-text-muted">
            <span className="flex items-center gap-2 text-warning font-bold">
              <Power className="w-4 h-4" />
              INTERACTIVE RUNTIME PREVIEW: STRATDESK PRO
            </span>
            <span className="hidden sm:inline font-semibold text-emerald-400">
              COMMAND BUS ACTIVE • HMAC-SHA256 VERIFIED
            </span>
          </div>
          <DashboardPreview product="pro" defaultTheme="command" />
        </div>

        {/* Deep Dive Breakdown (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="p-6 rounded-xl bg-surface/70 border border-border hover:border-danger/40 transition-colors">
            <Power className="w-6 h-6 text-danger mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Emergency Kill-Switch</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Dispatches an immediate atomic command to your bot process: cancels all open limit orders across exchanges and market-flattens high-risk inventory.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-border hover:border-warning/40 transition-colors">
            <Key className="w-6 h-6 text-warning mb-3" />
            <h3 className="text-lg font-bold text-white font-sans">Cryptographic HMAC Verification</h3>
            <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
              Every dispatched control payload is signed using a local shared secret with HMAC-SHA256, guaranteeing that unauthorized network requests cannot trigger actions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface/70 border border-border hover:border-accent/40 transition-colors">
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
              EXCLUSIVE TO STRATDESK PRO
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              INSTITUTIONAL TRADE LEDGER & JOURNAL.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
              Stop logging automated trades in spreadsheets or retail journals. StratDesk Pro includes an institutional trade ledger with forensic execution telemetry, automated R-multiple audits, market regime classification, and screenshot-worthy proof cards.
            </p>
          </div>

          {/* Interactive Ledger Preview */}
          <div className="mb-10">
            <DashboardPreview product="pro" defaultTheme="obsidian" initialControlTab="ledger" />
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-background/80 border border-border">
              <div className="text-accent font-bold mb-1.5">01 // R-MULTIPLE AUDITS</div>
              <div className="font-bold text-white mb-1">Expectancy & Skew</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Normalized risk accounting tracking realized R-multiples, profit factor, and Sharpe ratio automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-border">
              <div className="text-warning font-bold mb-1.5">02 // FORENSIC TELEMETRY</div>
              <div className="font-bold text-white mb-1">Microsecond Fills</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Inspect Z-score triggers, book depth imbalance ratios, maker rebates, and execution latency for every trade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-border">
              <div className="text-success font-bold mb-1.5">03 // REGIME ANALYSIS</div>
              <div className="font-bold text-white mb-1">Market Condition Tagging</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                Correlate strategy win rates across trend expansion, range compression, and liquidity hunt market regimes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/80 border border-border">
              <div className="text-sky-400 font-bold mb-1.5">04 // PROOF CARDS</div>
              <div className="font-bold text-white mb-1">Screenshot-Ready Output</div>
              <p className="text-text-secondary text-[11px] leading-relaxed font-sans">
                One-click watermarked proof cards formatted for LP reports, trader communities, and social media.
              </p>
            </div>
          </div>
        </div>

        {/* What's Included & Package File Tree */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
          {/* Left: Key Highlights */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-sans mb-6">Key Highlights</h3>
              <div className="space-y-3 text-xs text-text-secondary">
                {product.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                    <span className="text-white/90 font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-text-muted">
              <span>Perpetual license • Zero recurring fees</span>
              <span className="text-accent font-bold">ALL 20 BLUEPRINTS UNLOCKED</span>
            </div>
          </div>

          {/* Right: Package Contents / File Tree */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border font-mono text-xs flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-sans">What&apos;s in the Download</h3>
                <span className="text-[10px] text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20 font-bold">
                  ZIP ARCHIVE (0.32 MB)
                </span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-border text-white text-[11px] space-y-1.5 overflow-x-auto">
                <div className="text-accent font-bold">stratdesk-pro/</div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">src/components/</span>{" "}
                  <span className="text-text-muted">(20 archetypes + ledger + 6 themes)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">src/app/api/ledger/</span>{" "}
                  <span className="text-text-muted">(High-throughput local IPC route)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">scripts/bot_adapter.py</span>{" "}
                  <span className="text-emerald-400 font-semibold">(Drop-in Python CCXT bridge)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">STRATDESK_SPEC.md</span>{" "}
                  <span className="text-warning font-semibold">(Universal AI agent integration rules)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">docker-compose.yml</span>{" "}
                  <span className="text-text-muted">(Isolated container deployment)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">START_HERE.md</span>{" "}
                  <span className="text-emerald-400 font-semibold">(Step-by-step AI connection guide)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  ├── <span className="text-white font-semibold">QUICKSTART.md</span>{" "}
                  <span className="text-text-muted">(5-minute integration guide)</span>
                </div>
                <div className="pl-4 text-text-secondary">
                  └── <span className="text-white font-semibold">package.json</span>{" "}
                  <span className="text-text-muted">(React 19, Next.js 15, Tailwind CSS)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-text-muted text-[11px]">Instant download via Whop:</span>
              <Button
                href={product.whopCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="control"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                GET STRATDESK PRO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
