import React from "react";
import { Terminal, Cpu, Network, Server, Sparkles } from "lucide-react";

export const CredibilityStrip: React.FC = () => {
  const categories = [
    { label: "PERSONAL TRADING BOTS", icon: Terminal },
    { label: "ALGORITHMIC SYSTEMS", icon: Cpu },
    { label: "QUANT PROJECTS", icon: Network },
    { label: "SELF-HOSTED INFRASTRUCTURE", icon: Server },
    { label: "AI-ASSISTED DEVELOPMENT", icon: Sparkles },
  ];

  return (
    <section className="relative z-20 border-y border-white/10 bg-surface/60 backdrop-blur-md py-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest whitespace-nowrap">
              BUILT FOR
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-6 font-mono text-xs text-text-secondary">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:text-white transition-all group"
                >
                  <Icon className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
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
