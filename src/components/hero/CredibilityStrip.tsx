import React from "react";
import { Terminal, Network, Zap, Server, Sparkles } from "lucide-react";

export const CredibilityStrip: React.FC = () => {
  const categories = [
    { label: "PERSONAL TRADING BOTS", icon: Terminal },
    { label: "QUANT & PROP SYSTEMS", icon: Network },
    { label: "MEV & ON-CHAIN SNIPERS", icon: Zap },
    { label: "SELF-HOSTED RUNTIMES", icon: Server },
    { label: "AI-ASSISTED DEV", icon: Sparkles },
  ];

  return (
    <section className="relative z-20 border-y border-border bg-surface/70 backdrop-blur-md py-4 sm:py-5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-extrabold text-slate-900 dark:text-accent uppercase tracking-widest whitespace-nowrap">
              COMPATIBLE ECOSYSTEM
            </span>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5 font-mono text-[11px] text-text-secondary w-full lg:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 dark:bg-white/[0.03] border border-border hover:border-accent/40 hover:text-slate-900 dark:hover:text-white transition-all group shadow-sm whitespace-nowrap shrink-0"
                >
                  <Icon className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors shrink-0" />
                  <span className="tracking-wider">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

