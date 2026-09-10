import React from "react";
import { Metadata } from "next";
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
  FileSpreadsheet,
  Share2,
  Lock,
  Zap,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Trade Ledger & Audit Journal | StratDesk Pro",
  description:
    "Institutional forensic trade execution ledger and automated journal for quantitative trading bots. R-multiple audits, slippage tracking in basis points, market regime classification, and cryptographically verified proof cards.",
  openGraph: {
    title: "StratDesk Pro Trade Ledger | Forensic Execution Journal",
    description:
      "Automated trade ledger for algorithmic trading bots. R-multiples, execution slippage, regime tagging, and batch CSV proof exports.",
  },
};

export default function TradeLedgerPage() {
  return (
    <div className="pt-28 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-4">
            STATE-OF-THE-ART FORENSIC JOURNAL
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-tight">
            INSTITUTIONAL TRADE LEDGER. <br />
            <span className="text-text-muted">AUTOMATED AUDITING FOR QUANT BOTS.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed font-sans max-w-3xl mx-auto">
            Stop recording algorithmic trades in spreadsheets or retail journals. StratDesk Pro includes a forensic execution audit engine that records tick-level execution quality, slippage in basis points, normalized R-multiples, and market regime tags automatically.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={PRODUCTS.pro.whopCheckoutUrl}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-sm font-bold shadow-glow-cyan"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              target="_blank"
              rel="noopener noreferrer"
              glow={true}
            >
              GET STRATDESK PRO • $49
            </Button>
            <Button
              href="/lab"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-sm font-bold"
              icon={<FlaskConical className="w-4 h-4" />}
              iconPosition="left"
            >
              OPEN LAB SIMULATOR ↗
            </Button>
          </div>

          {/* Micro Specs Bar */}
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
              <span>LOCAL INGESTION</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Ledger Workstation */}
        <div className="mb-20 rounded-2xl border border-sky-300 dark:border-accent/30 p-2 sm:p-6 bg-surface shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-border text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2 text-sky-700 dark:text-accent font-bold">
              <BookOpen className="w-4 h-4" />
              <span>LIVE INTERACTIVE WORKSTATION // FORENSIC TRADE JOURNAL</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-border">
              RFC-4180 CSV COMPLIANT • SHA-256 HASH VERIFIED
            </span>
          </div>

          <TradeLedger theme="obsidian" />
        </div>

        {/* 4 State-of-the-Art Feature Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              WHY RETAIL TRADING JOURNALS CANNOT COMPETE
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-secondary font-sans">
              Engineered specifically for automated algorithms, continuous execution loops, and high-frequency fill audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-3 font-mono">
              <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-1 border border-accent/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-[10px] text-accent font-bold uppercase tracking-wider">
                01 // RISK NORMALIZATION
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Automated R-Multiple Auditing
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Evaluates risk-adjusted expectancy across all strategies by normalizing realized PnL against initial stop-loss capital. Tracks average winner R (+2.84R) vs average loser R (-0.91R).
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-3 font-mono">
              <div className="p-3 rounded-xl bg-warning/10 text-warning w-fit mb-1 border border-warning/20">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-[10px] text-warning font-bold uppercase tracking-wider">
                02 // EXECUTION FORENSICS
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Microsecond Latency & Slippage
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Audits exchange ACK latencies (e.g. 14.2ms) and measures slippage basis points (-1.2 bps) against order book mid-prices, exposing adverse selection and exchange queue drift.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-3 font-mono">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-1 border border-emerald-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                03 // MACRO CLASSIFICATION
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Market Regime Tagging
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Automatically classifies fills against prevailing market regimes: Trending-Bull, Low-Vol-Range, Breakout, or High-Vol-Shock so you can pinpoint exactly when your strategy prints or decays.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col gap-3 font-mono">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-1 border border-purple-500/20">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                04 // CRYPTOGRAPHIC PROOF
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Proof Cards & Batch CSV Export
              </h3>
              <p className="text-xs text-text-secondary font-sans leading-relaxed">
                Generate high-resolution, screenshot-worthy trade proof cards with SHA-256 batch integrity hashes, or export complete RFC-4180 CSV logs directly into Python, R, or institutional risk models.
              </p>
            </div>
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl font-mono text-xs">
          <div className="flex items-center gap-3.5">
            <ShieldCheck className="w-6 h-6 text-success shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                Ready to deploy the institutional Trade Ledger with your bot?
              </span>
              <span className="text-text-muted">
                Self-hosted perpetual license • Full source code • Dedicated engineering support at stratdesk.pro@gmail.com
              </span>
            </div>
          </div>
          <Button
            href={PRODUCTS.pro.whopCheckoutUrl}
            variant="primary"
            size="lg"
            className="shrink-0 shadow-glow-cyan"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            target="_blank"
            rel="noopener noreferrer"
          >
            GET STRATDESK PRO • $49
          </Button>
        </div>
      </div>
    </div>
  );
}
