import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlgorbSymbol } from "@/components/ui/Logo";
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
          <AlgorbSymbol size={48} glow={true} />
        </div>

        <Badge variant="accent" size="sm" dot={true} pulse={true} className="mb-6">
          UPGRADE YOUR OPERATIONAL LAYER
        </Badge>

        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans leading-tight">
          STOP WATCHING YOUR BOT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent glow-text">
            THROUGH A TERMINAL.
          </span>
        </h2>

        <p className="mt-6 text-xl sm:text-2xl text-text-secondary font-sans font-light">
          Give it an interface.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="#dashboard-lab"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            glow={true}
          >
            EXPLORE DASHBOARDS
          </Button>

          <Button
            href="/docs"
            variant="outline"
            size="lg"
            icon={<BookOpen className="w-4 h-4" />}
          >
            READ DOCUMENTATION
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 font-mono text-xs text-text-muted">
          <span>• 100% Self-Hosted</span>
          <span>• Zero Write Keys Required</span>
          <span>• 6 Built-in Themes</span>
        </div>
      </div>
    </section>
  );
};
