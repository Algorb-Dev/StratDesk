import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, HardDrive, Lock, Server, Cpu, EyeOff } from "lucide-react";

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: HardDrive,
      title: "100% Self-Hosted Runtime",
      description:
        "StratDesk runs directly on your hardware or private cloud instance. There are zero central StratDesk servers receiving your account balances, trade positions, or fills.",
    },
    {
      icon: EyeOff,
      title: "Zero Strategy Exposure",
      description:
        "Your proprietary quantitative models, signals, and math stay inside your execution container. StratDesk only renders the high-level output metrics you choose to stream.",
    },
    {
      icon: Lock,
      title: "No Exchange API Keys Required",
      description:
        "StratDesk never needs your exchange API secrets or withdrawal keys. Your trading bot connects directly to the exchange, keeping all credentials isolated.",
    },
    {
      icon: ShieldCheck,
      title: "HMAC Cryptographic Verification",
      description:
        "In StratDesk Pro, every dispatched action (such as emergency stop or strategy toggle) requires a locally generated HMAC-SHA256 signature to prevent unauthorized calls.",
    },
  ];

  return (
    <section className="relative py-28 border-b border-border bg-background overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            DATA OWNERSHIP
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            YOUR INFRASTRUCTURE. <br />
            <span className="text-slate-500 dark:text-text-muted">YOUR DATA. YOUR CONTROL.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
            We build software for developers who value autonomy. No third-party data aggregation, no external brokers, and no hidden telemetry callbacks.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-xl bg-surface/90 dark:bg-surface/70 border border-border flex items-start gap-4 group hover:border-accent/40 transition-colors shadow-sm dark:shadow-none"
              >
                <div className="p-3 rounded-lg bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent/20 transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Disclaimer Box */}
        <div className="mt-12 max-w-3xl mx-auto p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.02] border border-border text-center font-mono text-[11px] text-slate-600 dark:text-text-muted">
          <span>
            Transparent Architecture Guarantee: StratDesk is client-side software. We do not guarantee market profitability or eliminate financial trading risk. You retain full responsibility for your trading system execution.
          </span>
        </div>
      </div>
    </section>
  );
};
