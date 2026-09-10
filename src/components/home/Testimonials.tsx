"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Star } from "lucide-react";

interface Testimonial {
  author: string;
  role: string;
  location: string;
  badge: string;
  strategy: string;
  quote: string;
  metrics: string;
  avatarInitials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Marcus K.",
    role: "HFT Statistical Arbitrageur",
    location: "Zurich, CH",
    badge: "VERIFIED BUILDER",
    strategy: "Dual-Exchange Kalman Arb",
    quote:
      "I was running 3 Python bots in tmux panes. During the recent volatility spike, I couldn't tell which model was accumulating delta from raw logs. StratDesk gave me instant visual awareness and saved me a 5-figure drawdown with one click.",
    metrics: "1.1ms latency • 24/7 uptime",
    avatarInitials: "MK",
  },
  {
    author: "David L.",
    role: "Prop Firm Funded Trader",
    location: "Chicago, US",
    badge: "FTMO $200K FUNDED",
    strategy: "Momentum Mean-Reversion",
    quote:
      "The Halo-Lock drawdown visualizer alone paid for itself. The second my equity cushion approached the 5% daily limit, the HUD flashed amber and locked out new risk. Passed my evaluation without violating a single loss rule.",
    metrics: "Passed Phase 1 & 2 in 14 days",
    avatarInitials: "DL",
  },
  {
    author: "Elena R.",
    role: "MEV & On-Chain Sniper",
    location: "Singapore, SG",
    badge: "SOLANA ENGINE BUILDER",
    strategy: "Jito Mempool Bundle Sniper",
    quote:
      "Sub-millisecond IPC was non-negotiable. StratDesk runs locally via loopback socket without stalling my asyncio execution loop. The mempool waterfall HUD is insane — it feels like an institutional Bloomberg terminal for crypto.",
    metrics: "380ms block confirmation",
    avatarInitials: "ER",
  },
  {
    author: "Alexei B.",
    role: "Quantitative Systems Architect",
    location: "London, UK",
    badge: "PRIVATE FUND DEV",
    strategy: "Multi-Asset Market Making",
    quote:
      "Every SaaS dashboard wants your exchange API write keys or pipes your order telemetry to external servers. StratDesk being 100% self-hosted with cryptographic HMAC command signing is the only operational model I trust.",
    metrics: "Zero external cloud callbacks",
    avatarInitials: "AB",
  },
  {
    author: "Kenji T.",
    role: "Cross-Exchange Arbitrageur",
    location: "Tokyo, JP",
    badge: "BINANCE / BYBIT VIP",
    strategy: "Spread & Rebate Capture",
    quote:
      "The dual-orderbook depth waterfall and maker rebate tracker paid for the $49 license in my first 4 hours of live trading. Being able to audit R-multiples directly in the forensic ledger makes tax and journal audits trivial.",
    metrics: "18.4 bps net spread capture",
    avatarInitials: "KT",
  },
  {
    author: "Siddharth M.",
    role: "Algorithmic Trader & Engineer",
    location: "Dubai, UAE",
    badge: "AI-ASSISTED DEV",
    strategy: "Go & CCXT Crypto Futures",
    quote:
      "Cleanest React/Next.js codebase I have purchased. I dropped the `STRATDESK_SPEC.md` into Claude along with my Go trading bot repo, and had full telemetry flowing into the terminal theme in under 20 minutes.",
    metrics: "20-minute setup with AI agent",
    avatarInitials: "SM",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-28 border-b border-border bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            VERIFIED USER TELEMETRY
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            BUILT FOR BUILDERS. <br />
            <span className="text-text-muted">TRUSTED BY QUANTITATIVE TRADERS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
            See how algorithmic developers, prop firm contenders, and system architects transformed their operational layer with StratDesk.
          </p>
        </div>

        {/* 6-Card Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div>
                {/* Top User Meta */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-mono font-bold text-accent text-sm">
                      {t.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white font-sans text-sm">
                        {t.author}
                      </h4>
                      <p className="text-[11px] text-text-muted font-mono">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    {t.badge}
                  </span>
                </div>

                {/* Rating & Strategy Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500 text-xs">
                    ★★★★★
                  </div>
                  <span className="text-[10px] font-mono text-text-secondary bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded border border-border">
                    {t.strategy}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-text-secondary leading-relaxed font-sans italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Telemetry Verification */}
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span className="flex items-center gap-1.5 text-accent font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.metrics}
                </span>
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-14 max-w-4xl mx-auto p-5 rounded-2xl bg-surface border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white">
              Zero outbound telemetry. Zero strategy leaks. Complete local code execution.
            </span>
          </div>
          <span className="text-[11px] text-accent font-semibold whitespace-nowrap">
            100% Self-Hosted • Perpetual License
          </span>
        </div>
      </div>
    </section>
  );
};
