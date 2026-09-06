"use client";

import React, { useState, useMemo } from "react";
import {
  ARCHITECTURES_DATA,
  ARCHITECTURE_CATEGORIES,
  ArchitectureBlueprint,
  ArchitectureCategory,
} from "@/data/architectures-data";
import { PRODUCTS } from "@/data/products";
import { ArchitectureModal } from "./ArchitectureModal";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  Zap,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";

interface ArchitectureMatrixProps {
  isLight?: boolean;
}

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({
  isLight = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ArchitectureCategory | "all">("all");
  const [selectedTier, setSelectedTier] = useState<"all" | "view" | "control">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalBlueprint, setActiveModalBlueprint] = useState<ArchitectureBlueprint | null>(null);

  const filteredBlueprints = useMemo(() => {
    return ARCHITECTURES_DATA.filter((bp) => {
      // Category Filter
      if (selectedCategory !== "all" && bp.category !== selectedCategory) {
        return false;
      }
      // Tier Filter
      if (selectedTier !== "all" && bp.recommendedTier !== selectedTier) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = bp.title.toLowerCase().includes(q);
        const matchesTarget = bp.targetAudience.toLowerCase().includes(q);
        const matchesSummary = bp.summary.toLowerCase().includes(q);
        const matchesTags = bp.tags.some((t) => t.toLowerCase().includes(q));
        const matchesWidget = bp.killerWidget.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTarget && !matchesSummary && !matchesTags && !matchesWidget) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Filter Control Bar */}
      <div
        className={cn(
          "p-4 rounded-xl border font-mono transition-colors flex flex-col gap-4 shadow-lg",
          isLight
            ? "bg-white border-slate-200"
            : "bg-surface/80 border-white/10 backdrop-blur-md"
        )}
      >
        {/* Row 1: Search and Tier Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Live Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bot type, strategy, or widget (e.g. 'arbitrage', 'mempool', 'Z-score')..."
              className={cn(
                "w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono outline-none border transition-all",
                isLight
                  ? "bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500"
                  : "bg-black/40 border-white/10 text-white focus:border-accent"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Tier Filter Switcher */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-text-muted text-[10px] uppercase font-bold mr-1 hidden sm:inline">
              Tier:
            </span>
            {(["all", "view", "control"] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border",
                  selectedTier === tier
                    ? isLight
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-accent/20 text-accent border-accent/40 shadow-sm"
                    : isLight
                    ? "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                    : "bg-white/[0.02] text-text-muted border-white/5 hover:text-white hover:bg-white/5"
                )}
              >
                {tier === "all" ? "All Tiers" : `Algorb ${tier}`}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Category Segmented Tabs */}
        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
          {ARCHITECTURE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 border",
                  isActive
                    ? isLight
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : "bg-white text-black border-white shadow-lg shadow-white/10"
                    : isLight
                    ? "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    : "bg-white/[0.03] text-text-muted border-white/5 hover:text-white hover:bg-white/10"
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.2 text-[8px] rounded font-bold",
                    isActive
                      ? isLight
                        ? "bg-white/20 text-white"
                        : "bg-black/20 text-black"
                      : isLight
                      ? "bg-slate-100 text-slate-500"
                      : "bg-white/10 text-text-muted"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprint Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlueprints.map((blueprint) => {
          const productTier = PRODUCTS[blueprint.recommendedTier];

          return (
            <div
              key={blueprint.id}
              className={cn(
                "group relative rounded-xl border font-mono text-xs flex flex-col justify-between transition-all duration-300 hover:shadow-2xl overflow-hidden",
                isLight
                  ? "bg-white border-slate-200 hover:border-sky-400/80 shadow-sm"
                  : "bg-surface/50 border-white/10 hover:border-accent/50 hover:bg-surface-elevated/70"
              )}
            >
              {/* Card Top Strip */}
              <div className="p-4 sm:p-5 flex flex-col gap-3">
                {/* Header: Number & Category & Tier */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-accent/10 border border-accent/25 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                      {blueprint.number}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                      {blueprint.categoryLabel}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "px-2 py-0.5 text-[9px] font-bold rounded uppercase border",
                      blueprint.recommendedTier === "control"
                        ? isLight
                          ? "bg-sky-50 text-sky-800 border-sky-300"
                          : "bg-accent/10 text-accent border-accent/30"
                        : isLight
                        ? "bg-slate-100 text-slate-700 border-slate-300"
                        : "bg-white/5 text-text-secondary border-white/10"
                    )}
                  >
                    ALGORB {blueprint.recommendedTier.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-accent transition-colors leading-snug">
                  {blueprint.title}
                </h3>

                {/* Target Persona */}
                <div className="p-2.5 rounded-lg border border-white/5 bg-black/20 text-[11px] text-text-secondary">
                  <span className="text-[9px] font-bold text-text-muted uppercase block mb-0.5">
                    Target Operator:
                  </span>
                  <p className="line-clamp-2 leading-relaxed font-sans">{blueprint.targetAudience}</p>
                </div>

                {/* Killer Widget Spotlight */}
                <div className="p-3 rounded-lg border border-accent/20 bg-accent/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      KILLER WIDGET
                    </span>
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-accent/20 text-accent uppercase">
                      {blueprint.killerWidget.badge}
                    </span>
                  </div>
                  <div className="font-bold text-white text-xs">{blueprint.killerWidget.name}</div>
                  <p className="text-[10px] text-text-muted line-clamp-2 font-sans">
                    {blueprint.killerWidget.description}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className="flex items-center justify-between text-[10px] text-text-muted border-t border-white/5 pt-2">
                  <span>Latency: {blueprint.specs.latencyRequirement.split("/")[0]}</span>
                  <span className="truncate max-w-[140px] text-right">
                    {blueprint.specs.keyMetrics[0]}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                className={cn(
                  "p-3.5 border-t flex items-center justify-between gap-2 select-none",
                  isLight ? "border-slate-200 bg-slate-50/70" : "border-white/5 bg-black/30"
                )}
              >
                <button
                  onClick={() => setActiveModalBlueprint(blueprint)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-accent text-white font-bold text-[10px] uppercase hover:bg-white/5 transition-all flex items-center gap-1"
                >
                  <span>TEST WIDGET</span>
                  <ChevronRight className="w-3 h-3 text-accent" />
                </button>

                <a
                  href={productTier.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-accent text-black font-bold text-[10px] uppercase hover:bg-accent/80 transition-all flex items-center gap-1 shadow-md shadow-accent/10"
                >
                  <span>DEPLOY {productTier.name.toUpperCase()}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBlueprints.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-surface/50 font-mono space-y-3">
          <div className="text-accent text-base font-bold">NO ARCHITECTURES MATCHED</div>
          <p className="text-xs text-text-muted max-w-md mx-auto">
            No blueprints match your filter criteria. Try searching for &apos;arbitrage&apos;, &apos;mempool&apos;, &apos;Z-score&apos;, or resetting filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedTier("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-white/10 text-white font-bold text-xs uppercase hover:bg-white/20 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Modal Inspector */}
      <ArchitectureModal
        blueprint={activeModalBlueprint}
        onClose={() => setActiveModalBlueprint(null)}
        isLight={isLight}
      />
    </div>
  );
};
