"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { GlowField } from "@/components/effects/GlowField";
import { TradingGrid } from "@/components/effects/TradingGrid";
import { ArrowRight, Terminal, Sparkles, SlidersHorizontal } from "lucide-react";

export const Hero: React.FC = () => {
  const [heroProduct, setHeroProduct] = useState<"view" | "control">("view");

  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient Visual Effects */}
      <TradingGrid dense={false} fadeEdges={true} />
      <GlowField color="cyan" position="top" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="accent" size="sm" dot={true} pulse={true}>
            INTERFACE LAYER FOR CUSTOM TRADING BOTS
          </Badge>
        </div>

        {/* Dramatic Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans text-white max-w-5xl leading-[1.1] sm:leading-[1.08]">
          YOUR BOT DESERVES{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent glow-text">
            A BETTER INTERFACE.
          </span>
        </h1>

        {/* Technical Sub-copy */}
        <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-3xl font-sans leading-relaxed">
          Premium, self-hosted interfaces engineered for personal trading bots. Monitor live equity, positions, risk, and execution telemetry—or actively command your system from one unified interface.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
            href="/how-it-works"
            variant="outline"
            size="lg"
            icon={<Terminal className="w-4 h-4" />}
          >
            SEE HOW IT WORKS
          </Button>
        </div>

        {/* Interactive Mode Quick-Toggle above Hero Preview */}
        <div className="mt-14 mb-4 flex items-center gap-3 bg-surface-elevated/80 p-1 rounded-lg border border-white/10 backdrop-blur-md">
          <span className="text-[11px] font-mono text-text-muted px-2 hidden sm:inline">
            PREVIEW MODE:
          </span>
          <button
            onClick={() => setHeroProduct("view")}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all ${
              heroProduct === "view"
                ? "bg-accent text-background shadow-glow-cyan"
                : "text-text-secondary hover:text-white"
            }`}
          >
            ALGORB VIEW (MONITOR)
          </button>
          <button
            onClick={() => setHeroProduct("control")}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded transition-all ${
              heroProduct === "control"
                ? "bg-warning text-background shadow-lg"
                : "text-text-secondary hover:text-white"
            }`}
          >
            ALGORB CONTROL (COMMAND)
          </button>
        </div>

        {/* High-Fidelity Hero Dashboard Live Mockup */}
        <div className="w-full max-w-6xl mt-2 relative">
          {/* Subtle Ambient Radial Lighting under preview */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 via-transparent to-accent/10 blur-xl opacity-60 pointer-events-none" />

          {/* Floating Live Dashboard Mockup */}
          <div className="relative transform transition-transform duration-500">
            <DashboardPreview
              product={heroProduct}
              theme="obsidian"
              isHero={true}
              className="border-white/15"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
