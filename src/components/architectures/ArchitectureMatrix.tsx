"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ARCHITECTURES_DATA,
  ARCHITECTURE_CATEGORIES,
  ArchitectureBlueprint,
  ArchitectureCategory,
} from "@/data/architectures-data";
import { PRODUCTS } from "@/data/products";
import { ArchitectureModal } from "./ArchitectureModal";
import { useSiteTheme } from "@/hooks/useSiteTheme";
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
  Sliders,
} from "lucide-react";

interface ArchitectureMatrixProps {
  isLight?: boolean;
}

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({
  isLight: propIsLight,
}) => {
  const { isLight: themeIsLight } = useSiteTheme();
  const isLight = propIsLight ?? themeIsLight;
  const [selectedCategory, setSelectedCategory] = useState<ArchitectureCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalBlueprint, setActiveModalBlueprint] = useState<ArchitectureBlueprint | null>(null);

  const filteredBlueprints = useMemo(() => {
    return ARCHITECTURES_DATA.filter((bp) => {
      // Category Filter
      if (selectedCategory !== "all" && bp.category !== selectedCategory) {
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
  }, [selectedCategory, searchQuery]);

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
        {/* Row 1: Search and Status Badge */}
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

          {/* Unlocked Status Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-warning/10 text-amber-600 dark:text-warning border border-warning/20">
              <Sparkles className="w-3.5 h-3.5" />
              ALL 20 BLUEPRINTS UNLOCKED // STRATDESK PRO
            </span>
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
                      isLight
                        ? "bg-amber-50 text-amber-900 border-amber-300"
                        : "bg-warning/10 text-warning border-warning/30"
                    )}
                  >
                    STRATDESK PRO
                  </span>
                </div>

                {/* Title */}
                <h3 className={cn(
                  "font-bold text-sm sm:text-base group-hover:text-accent transition-colors leading-snug",
                  isLight ? "text-slate-900" : "text-white"
                )}>
                  {blueprint.title}
                </h3>

                {/* Target Persona */}
                <div
                  className={cn(
                    "p-2.5 rounded-lg border text-[11px]",
                    isLight ? "border-slate-200 bg-slate-50 text-slate-600" : "border-white/5 bg-black/20 text-text-secondary"
                  )}
                >
                  <span className={cn("text-[9px] font-bold uppercase block mb-0.5", isLight ? "text-slate-500" : "text-text-muted")}>
                    Target Operator:
                  </span>
                  <p className="line-clamp-2 leading-relaxed font-sans">{blueprint.targetAudience}</p>
                </div>

                {/* Killer Widget Spotlight */}
                <div
                  className={cn(
                    "p-3 rounded-lg border space-y-1",
                    isLight ? "border-sky-200 bg-sky-50/70" : "border-accent/20 bg-accent/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[9px] font-bold uppercase tracking-wider flex items-center gap-1", isLight ? "text-sky-700" : "text-accent")}>
                      <Zap className="w-3 h-3" />
                      KILLER WIDGET
                    </span>
                    <span className={cn("text-[8px] font-bold px-1.5 py-0.2 rounded uppercase", isLight ? "bg-sky-100 text-sky-800" : "bg-accent/20 text-accent")}>
                      {blueprint.killerWidget.badge}
                    </span>
                  </div>
                  <div className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>{blueprint.killerWidget.name}</div>
                  <p className={cn("text-[10px] line-clamp-2 font-sans", isLight ? "text-slate-600" : "text-text-muted")}>
                    {blueprint.killerWidget.description}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className={cn("flex items-center justify-between text-[10px] border-t pt-2", isLight ? "border-slate-200 text-slate-500" : "border-white/5 text-text-muted")}>
                  <span>Latency: {blueprint.specs.latencyRequirement.split("/")[0]}</span>
                  <span className="truncate max-w-[140px] text-right">
                    {blueprint.specs.keyMetrics[0]}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                className={cn(
                  "p-3.5 border-t flex flex-wrap items-center justify-between gap-2 select-none",
                  isLight ? "border-slate-200 bg-slate-50/70" : "border-white/5 bg-black/30"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveModalBlueprint(blueprint)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-lg border font-bold text-[10px] uppercase transition-all flex items-center gap-1",
                      isLight
                        ? "border-slate-300 bg-white hover:bg-slate-100 text-slate-800 hover:border-slate-400"
                        : "border-white/10 hover:border-accent text-white hover:bg-white/5"
                    )}
                  >
                    <span>TEST WIDGET</span>
                    <ChevronRight className={cn("w-3 h-3", isLight ? "text-sky-600" : "text-accent")} />
                  </button>
                  <Link
                    href={`/?archetype=${blueprint.id}#dashboard-lab`}
                    className={cn(
                      "px-2.5 py-1.5 rounded-lg border font-bold text-[10px] uppercase transition-all flex items-center gap-1",
                      isLight
                        ? "border-sky-300 text-sky-700 bg-sky-50 hover:bg-sky-100"
                        : "border-accent/30 text-accent hover:bg-accent/10"
                    )}
                    title="Launch in Dashboard Lab"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>LAB</span>
                  </Link>
                </div>

                <a
                  href={productTier.whopCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all flex items-center gap-1 shadow-md",
                    isLight
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-accent text-black hover:bg-accent/80 shadow-accent/10"
                  )}
                >
                  <span>GET STRATDESK PRO</span>
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
