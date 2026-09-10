import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StratDeskSymbol } from "@/components/ui/Logo";
import { TradingGrid } from "@/components/effects/TradingGrid";
import { GlowField } from "@/components/effects/GlowField";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-background flex flex-col items-center justify-center text-center">
      {/* Background Visual Effects */}
      <TradingGrid dense={true} fadeEdges={true} />
      <GlowField color="cyan" position="center" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <StratDeskSymbol size={48} glow={true} />
        </div>

        <Badge variant="accent" size="sm" dot={true} pulse={true} className="mb-6">
          UPGRADE YOUR OPERATIONAL LAYER
        </Badge>

        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-tight">
          STOP WATCHING YOUR BOT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 dark:from-accent dark:via-white dark:to-accent glow-text">
            THROUGH A TERMINAL.
          </span>
        </h2>

        <p className="mt-6 text-xl sm:text-2xl text-slate-600 dark:text-text-secondary font-sans font-light">
          Give it an institutional command center.
        </p>

        {/* Pricing / Value Box */}
        <div className="mt-8 p-4 rounded-xl bg-surface border border-accent/30 max-w-md mx-auto flex items-center justify-between font-mono text-xs shadow-lg">
          <div>
            <span className="text-[10px] text-text-muted uppercase block">EARLY BIRD LICENSE</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">$49</span>
              <span className="text-sm line-through text-text-muted">$59</span>
              <span className="text-[10px] text-accent font-bold">PERPETUAL</span>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-500/30">
            SAVE $10 TODAY
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="https://whop.com/checkout/plan_stratdesk_pro"
            target="_blank"
            rel="noopener noreferrer"
            variant="control"
            size="lg"
            className="text-sm font-bold shadow-xl ring-2 ring-warning/30"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            GET STRATDESK PRO • $49
          </Button>

          <Button
            href="#dashboard-lab"
            variant="secondary"
            size="lg"
            className="text-sm font-bold"
          >
            EXPLORE LAB SIMULATOR
          </Button>

          <Button
            href="/docs"
            variant="outline"
            size="lg"
            icon={<BookOpen className="w-4 h-4" />}
          >
            READ DOCS
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-slate-500 dark:text-text-muted">
          <span>✓ 100% Self-Hosted & Private</span>
          <span>✓ Instant .zip Download</span>
          <span>✓ 20 Archetypes Unlocked</span>
          <span>✓ Perpetual Source Code License</span>
        </div>
      </div>
    </section>
  );
};
