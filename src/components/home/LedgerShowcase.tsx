"use client";

import React from "react";
import { TradeLedger } from "@/components/ledger/TradeLedger";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity,
  Zap,
  Share2,
  ExternalLink,
} from "lucide-react";

export const LedgerShowcase: React.FC = () => {
  return (
    <section id="ledger" className="relative py-28 border-b border-border bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-4">
            STATE-OF-THE-ART FORENSIC AUDIT
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-tight">
            INSTITUTIONAL TRADE LEDGER. <br />
            <span className="text-text-muted">AUTOMATED AUDITING FOR QUANT BOTS.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed font-sans max-w-3xl mx-auto">
            Stop recording algorithmic trades in spreadsheets or retail journals. StratDesk Pro includes an institutional forensic execution ledger with automated R-multiple audits, microsecond latency tracking, market regime classification, and cryptographically verified proof cards.
          </p>

          {/* Micro Telemetry Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="text-success font-bold">142</span>
              <span>TRADES AUDITED</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-accent font-bold">+14.2%</span>
              <span>TOTAL RETURN</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-warning font-bold">2.42</span>
              <span>PROFIT FACTOR</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">72.1%</span>
              <span>WIN RATE</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-accent font-bold">&lt; 0.4ms</span>
              <span>LOCAL IPC</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Ledger Container */}
        <div className="mb-14 rounded-2xl border border-sky-300 dark:border-accent/30 p-2 sm:p-6 bg-surface shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-border text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2 text-sky-700 dark:text-accent font-bold">
              <BookOpen className="w-4 h-4" />
              <span>INTERACTIVE FORENSIC AUDIT WORKSTATION // LIVE FILTERING & DRILLDOWNS</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-border">
              RFC-4180 CSV EXPORT • SHA-256 INTEGRITY
            </span>
          </div>

          <TradeLedger theme="obsidian" />
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-2 font-mono">
            <div className="flex items-center gap-2 text-accent">
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold uppercase text-xs">R-Multiple Auditing</span>
            </div>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Normalizes trade PnL against initial risk capital (+2.84R avg winner vs -0.91R avg loser).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-2 font-mono">
            <div className="flex items-center gap-2 text-warning">
              <Zap className="w-4 h-4" />
              <span className="font-bold uppercase text-xs">Microsecond Telemetry</span>
            </div>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Audits exchange ACK latencies (14.2ms) and basis-point slippage (-1.2 bps) per order.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-2 font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <Activity className="w-4 h-4" />
              <span className="font-bold uppercase text-xs">Regime Classification</span>
            </div>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Auto-labels market regimes: Trending-Bull, Low-Vol-Range, or High-Vol-Shock.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border flex flex-col gap-2 font-mono">
            <div className="flex items-center gap-2 text-purple-400">
              <Share2 className="w-4 h-4" />
              <span className="font-bold uppercase text-xs">Proof Cards & CSV</span>
            </div>
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              Generate shareable proof cards with SHA-256 hashes and batch export to CSV.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface border border-border font-mono text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-success shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Included with StratDesk Pro • Full Unminified Source Code
              </span>
              <span className="text-text-muted">
                Self-hosted perpetual license • No cloud lock-in • 100% Private & Offline
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              href="/ledger"
              variant="outline"
              size="md"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              FULL WORKSTATION
            </Button>
            <Button
              href={PRODUCTS.pro.whopCheckoutUrl}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET STRATDESK PRO • $49
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
