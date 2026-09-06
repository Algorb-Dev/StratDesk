"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ARCHITECTURES_DATA, ArchitectureBlueprint } from "@/data/architectures-data";
import { KillerWidgetSimulator } from "@/components/architectures/KillerWidgetSimulator";
import { cn } from "@/lib/utils";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  ChevronRight,
} from "lucide-react";

export const ArchitecturesShowcase: React.FC = () => {
  // Select 5 premier archetypes for homepage interactive showcase
  const showcaseIds = [
    "prop-firm-evaluator-console",
    "crypto-arbitrage-matrix",
    "pair-trading-statarb-console",
    "on-chain-dex-sniper",
    "raw-developer-terminal-cli",
  ];

  const showcaseBlueprints = ARCHITECTURES_DATA.filter((bp) =>
    showcaseIds.includes(bp.id)
  );

  const [activeId, setActiveId] = useState<string>(showcaseBlueprints[0]?.id || "prop-firm-evaluator-console");
  const activeBlueprint =
    showcaseBlueprints.find((bp) => bp.id === activeId) || showcaseBlueprints[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>20 TAILORED ARCHITECTURES // ZERO GENERIC DASHBOARDS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-white">
            CHOOSE YOUR ARCHETYPE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
              BUILT FOR YOUR EXACT ALPHA.
            </span>
          </h2>

          <p className="text-sm text-text-secondary font-sans leading-relaxed">
            Every trading strategy operates under distinct constraints. A DEX sniper cannot use the same interface as a prop-firm challenge trader. Test-drive live interactive widgets from our 20 specialized architectures.
          </p>
        </div>

        <Link
          href="/architectures"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider transition-all self-start md:self-end shrink-0 shadow-lg shadow-accent/10"
        >
          <span>VIEW ALL 20 ARCHITECTURES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Interactive Showcase Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Archetype Switcher List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 font-mono">
          {showcaseBlueprints.map((bp) => {
            const isActive = bp.id === activeId;
            return (
              <div
                key={bp.id}
                onClick={() => setActiveId(bp.id)}
                role="button"
                tabIndex={0}
                className={cn(
                  "p-3.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 select-none flex items-center justify-between gap-3",
                  isActive
                    ? "bg-surface-elevated border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30"
                    : "bg-surface/50 border-white/5 hover:border-white/15 hover:bg-surface-elevated/50 text-text-secondary"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={cn(
                      "w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center shrink-0 border",
                      isActive
                        ? "bg-accent text-black border-accent"
                        : "bg-white/5 text-text-muted border-white/10"
                    )}
                  >
                    {bp.number}
                  </span>
                  <div className="truncate">
                    <div className={cn("font-bold text-xs truncate", isActive ? "text-white" : "text-slate-300")}>
                      {bp.title}
                    </div>
                    <div className="text-[10px] text-text-muted truncate">
                      {bp.killerWidget.name}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform",
                    isActive ? "text-accent translate-x-0.5" : "text-text-muted opacity-50"
                  )}
                />
              </div>
            );
          })}

          <div className="p-3 rounded-lg border border-white/5 bg-black/20 text-[11px] text-text-muted flex items-center justify-between">
            <span>+15 More Specialized Architectures</span>
            <Link href="/architectures" className="text-accent font-bold underline hover:no-underline">
              Browse Full Catalog
            </Link>
          </div>
        </div>

        {/* Right Column: Live Interactive Simulation Stage (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md p-5 sm:p-6 font-mono space-y-4 shadow-2xl">
          {/* Active Archetype Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-accent font-bold">ARCHETYPE {activeBlueprint.number}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 text-text-secondary border border-white/10 uppercase">
                  {activeBlueprint.categoryLabel}
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{activeBlueprint.title}</h3>
            </div>

            <Link
              href="/architectures"
              className="text-[10px] text-text-muted hover:text-white uppercase font-bold flex items-center gap-1 transition-colors"
            >
              <span>Inspect Full Blueprint</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Description & Target Persona */}
          <p className="text-xs text-text-secondary font-sans leading-relaxed">
            {activeBlueprint.summary}
          </p>

          {/* Live Interactive Simulator */}
          <div className="pt-1">
            <KillerWidgetSimulator blueprint={activeBlueprint} isLight={false} />
          </div>

          {/* Bottom Specs Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[10px] text-text-muted border-t border-white/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Recommended Tier: <strong className="text-white">Algorb {activeBlueprint.recommendedTier.toUpperCase()}</strong></span>
            </div>
            <Link
              href="/architectures"
              className="text-accent font-bold uppercase hover:underline flex items-center gap-1"
            >
              <span>Explore All 20 Presets</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
