"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { THEMES } from "@/data/themes";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { useTheme } from "@/hooks/useTheme";
import {
  ARCHITECTURES_DATA,
  ARCHITECTURE_CATEGORIES,
  ArchitectureCategory,
} from "@/data/architectures-data";
import {
  Cpu,
  Palette,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ARCHETYPE_ALIAS_MAP: Record<string, string> = {
  "prop-firm": "prop-firm-evaluator-console",
  "crypto-arbitrage": "crypto-arbitrage-matrix",
  "stat-arb": "pair-trading-statarb-console",
  "dex-sniper": "on-chain-dex-sniper",
  "raw-cli": "raw-developer-terminal-cli",
  "cro-redline": "chief-risk-officer-red-line",
  "options-cockpit": "options-volatility-surface",
};

const INTERACTIVE_SIMULATOR_IDS = new Set([
  "prop-firm-evaluator-console",
  "crypto-arbitrage-matrix",
  "pair-trading-statarb-console",
  "on-chain-dex-sniper",
  "raw-developer-terminal-cli",
  "chief-risk-officer-red-line",
  "options-volatility-surface",
]);

const VALID_THEMES = ["terminal", "obsidian", "quant", "command", "vector", "light"] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

function DashboardLabContent() {
  const searchParams = useSearchParams();
  const { theme: persistedTheme, setTheme } = useTheme();

  const initialArchetype = searchParams.get("archetype") || "default";
  const initialTierParam = searchParams.get("tier");
  const initialTier: "view" | "control" = initialTierParam === "control" ? "control" : "view";
  const initialThemeParam = searchParams.get("theme");
  const initialTheme: ValidTheme =
    initialThemeParam && (VALID_THEMES as readonly string[]).includes(initialThemeParam)
      ? (initialThemeParam as ValidTheme)
      : (persistedTheme as ValidTheme) || "obsidian";

  const [selectedProduct, setSelectedProduct] = useState<"view" | "control">(initialTier);
  const [selectedTheme, setSelectedTheme] = useState<ValidTheme>(initialTheme);
  const [selectedArchetype, setSelectedArchetype] = useState<string>(initialArchetype);
  const [selectedCategory, setSelectedCategory] = useState<ArchitectureCategory | "all">("all");

  // Sync state if URL query params change (e.g. from deep-link navigation)
  useEffect(() => {
    const archetypeParam = searchParams.get("archetype");
    if (archetypeParam) {
      setSelectedArchetype(archetypeParam);
    }
    const tierParam = searchParams.get("tier");
    if (tierParam === "view" || tierParam === "control") {
      setSelectedProduct(tierParam);
    }
    const themeParam = searchParams.get("theme");
    if (themeParam && (VALID_THEMES as readonly string[]).includes(themeParam)) {
      setSelectedTheme(themeParam as ValidTheme);
    }
  }, [searchParams]);

  const updateUrl = (tier: string, theme: string, archetype: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (tier) params.set("tier", tier);
    if (theme) params.set("theme", theme);
    if (archetype && archetype !== "default") {
      params.set("archetype", archetype);
    } else {
      params.delete("archetype");
    }
    const hash = window.location.hash || "#dashboard-lab";
    const newUrl = `${window.location.pathname}?${params.toString()}${hash}`;
    window.history.replaceState(null, "", newUrl);
  };

  const handleArchetypeSelect = (id: string, recommendedTier?: "view" | "control") => {
    setSelectedArchetype(id);
    const newTier = recommendedTier && id !== "default" ? recommendedTier : selectedProduct;
    if (newTier !== selectedProduct) {
      setSelectedProduct(newTier);
    }
    updateUrl(newTier, selectedTheme, id);
  };

  const handleTierSelect = (tier: "view" | "control") => {
    setSelectedProduct(tier);
    updateUrl(tier, selectedTheme, selectedArchetype);
  };

  const handleThemeSelect = (theme: ValidTheme) => {
    setSelectedTheme(theme);
    setTheme(theme);
    updateUrl(selectedProduct, theme, selectedArchetype);
  };

  const canonicalArchetypeId = ARCHETYPE_ALIAS_MAP[selectedArchetype] || selectedArchetype;
  const activeBlueprint = ARCHITECTURES_DATA.find(
    (b) => b.id === canonicalArchetypeId || b.id === selectedArchetype
  );
  const isDefault = !selectedArchetype || selectedArchetype === "default";

  const filteredBlueprints = selectedCategory === "all"
    ? ARCHITECTURES_DATA
    : ARCHITECTURES_DATA.filter((b) => b.category === selectedCategory);

  return (
    <section id="dashboard-lab" className="relative py-28 border-b border-white/10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            PRODUCT CONFIGURATOR
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            DASHBOARD LAB. <br />
            <span className="text-text-muted">EXPERIENCE THE RUNTIME BEFORE YOU BUY.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Test drive product tiers, specialized bot archetypes, and color themes interactively. Switch between live monitoring and active command bus in real time.
          </p>
        </div>

        {/* Configurator Controls Floating Panel */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-6 rounded-2xl bg-surface/90 border border-white/15 backdrop-blur-xl shadow-2xl font-mono text-xs flex flex-col gap-5">
          {/* ROW 1: ARCHETYPE BLUEPRINT SELECTOR */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-text-muted">
                <LayoutGrid className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold text-white uppercase tracking-wider">ARCHETYPE BLUEPRINT:</span>
                <span className="text-[10px] text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                  {isDefault ? "DEFAULT HUD" : `#${activeBlueprint?.number} ${activeBlueprint?.title.slice(0, 26)}...`}
                </span>
              </div>

              {/* Mobile / Quick Dropdown Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label htmlFor="blueprint-select" className="text-[10px] text-text-muted uppercase shrink-0 sm:hidden">
                  Jump to:
                </label>
                <select
                  id="blueprint-select"
                  aria-label="Select Architecture Blueprint"
                  value={canonicalArchetypeId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "default") {
                      handleArchetypeSelect("default");
                    } else {
                      const bp = ARCHITECTURES_DATA.find((b) => b.id === val);
                      handleArchetypeSelect(val, bp?.recommendedTier);
                    }
                  }}
                  className="w-full sm:w-72 bg-background text-white border border-white/20 rounded-lg px-2.5 py-1.5 text-[11px] font-mono uppercase focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="default">00: DEFAULT HUD (STANDARD TERMINAL)</option>
                  {ARCHITECTURE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <optgroup key={cat.id} label={`── ${cat.label} ──`}>
                      {ARCHITECTURES_DATA.filter((b) => b.category === cat.id).map((b) => (
                        <option key={b.id} value={b.id}>
                          #{b.number} {b.title} [{b.recommendedTier.toUpperCase()}]
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter Tabs + Default HUD */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-background border border-white/10">
              {/* Default HUD Button */}
              <button
                onClick={() => handleArchetypeSelect("default")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase transition-all flex items-center gap-1.5 border",
                  isDefault
                    ? "bg-accent text-background border-accent shadow-glow-cyan font-bold"
                    : "text-text-muted hover:text-white border-transparent hover:bg-white/5"
                )}
              >
                <span>DEFAULT HUD</span>
              </button>

              <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

              {/* Category Filter Buttons */}
              {ARCHITECTURE_CATEGORIES.map((cat) => {
                const isCatActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all border",
                      isCatActive
                        ? "bg-white/15 text-white border-white/30"
                        : "text-text-muted hover:text-white border-transparent hover:bg-white/5"
                    )}
                  >
                    {cat.label} ({cat.count})
                  </button>
                );
              })}
            </div>

            {/* Blueprints Grid/Pill List for Selected Category */}
            <div className="flex flex-wrap items-center gap-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredBlueprints.map((bp) => {
                const isSelected = canonicalArchetypeId === bp.id;
                const isInteractive = INTERACTIVE_SIMULATOR_IDS.has(bp.id);
                return (
                  <button
                    key={bp.id}
                    onClick={() => handleArchetypeSelect(bp.id, bp.recommendedTier)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-lg font-mono text-[11px] uppercase transition-all flex items-center gap-1.5 border group",
                      isSelected
                        ? "bg-accent text-background border-accent shadow-glow-cyan font-bold"
                        : "bg-background/80 text-text-muted hover:text-white border-white/10 hover:border-white/20 hover:bg-white/5"
                    )}
                    title={`${bp.title} (${bp.categoryLabel})`}
                  >
                    <span className={cn(
                      "text-[10px] font-bold px-1 rounded",
                      isSelected ? "bg-black/20 text-background" : "bg-white/5 text-text-secondary"
                    )}>
                      #{bp.number}
                    </span>
                    <span className="truncate max-w-[140px] sm:max-w-[200px]">{bp.title}</span>
                    {isInteractive ? (
                      <span className={cn(
                        "text-[8px] font-extrabold px-1 rounded uppercase tracking-wider",
                        isSelected ? "bg-black text-accent" : "bg-accent/20 text-accent"
                      )}>
                        LIVE
                      </span>
                    ) : (
                      <span className={cn(
                        "text-[8px] font-extrabold px-1 rounded uppercase tracking-wider opacity-60",
                        isSelected ? "bg-black/20 text-background" : "bg-white/10 text-text-muted"
                      )}>
                        SPEC
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Context bar if an archetype is active */}
            {!isDefault && activeBlueprint && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-background/50 border border-white/5 text-[11px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-accent font-bold">ACTIVE BLUEPRINT:</span>
                  <span className="text-white font-bold">#{activeBlueprint.number} {activeBlueprint.title}</span>
                  <span className="text-text-muted">• {activeBlueprint.categoryLabel}</span>
                  <span className="text-text-muted hidden md:inline">• Target: {activeBlueprint.targetAudience}</span>
                </div>
                <button
                  onClick={() => handleArchetypeSelect("default")}
                  className="flex items-center gap-1 text-[10px] text-text-muted hover:text-accent font-mono uppercase transition-colors ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default HUD</span>
                </button>
              </div>
            )}
          </div>

          {/* ROW 2: TIER & THEME CONTROLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-white/10">
            {/* PRODUCT TIER */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text-muted">
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold text-white uppercase tracking-wider">PRODUCT TIER:</span>
              </div>
              <div className="flex items-center gap-2 bg-background p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => handleTierSelect("view")}
                  className={cn(
                    "flex-1 px-3 py-2 rounded font-bold uppercase transition-all flex items-center justify-center gap-1.5",
                    selectedProduct === "view"
                      ? "bg-accent text-background shadow-glow-cyan"
                      : "text-text-secondary hover:text-white"
                  )}
                >
                  <span>ALGORB VIEW</span>
                  <span className="text-[9px] opacity-80">(MONITOR)</span>
                </button>
                <button
                  onClick={() => handleTierSelect("control")}
                  className={cn(
                    "flex-1 px-3 py-2 rounded font-bold uppercase transition-all flex items-center justify-center gap-1.5",
                    selectedProduct === "control"
                      ? "bg-warning text-background shadow-lg"
                      : "text-text-secondary hover:text-white"
                  )}
                >
                  <span>ALGORB CONTROL</span>
                  <span className="text-[9px] opacity-80">(COMMAND)</span>
                </button>
              </div>
            </div>

            {/* COLOR PALETTE */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-text-muted">
                <Palette className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold text-white uppercase tracking-wider">COLOR PALETTE:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 bg-background p-1 rounded-lg border border-white/10">
                {THEMES.map((theme) => {
                  const isSelected = selectedTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id as ValidTheme)}
                      className={cn(
                        "flex-1 min-w-[75px] px-2 py-1.5 rounded font-mono text-[10px] uppercase transition-all flex items-center justify-center gap-1.5",
                        isSelected
                          ? "bg-white/15 text-white border border-white/30 font-bold"
                          : "text-text-muted hover:text-white"
                      )}
                    >
                      <span
                        className="w-2 h-2 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <span className="truncate">{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Configured Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <DashboardPreview
            product={selectedProduct}
            theme={selectedTheme}
            archetypeId={selectedArchetype}
            className="border-white/15"
          />
        </div>

        {/* Action Callout below Lab */}
        <div className="mt-10 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface/50 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-success shrink-0" />
            <div>
              <span className="font-bold text-white block">
                {!isDefault && activeBlueprint
                  ? `Ready to deploy Blueprint #${activeBlueprint.number} (${activeBlueprint.title})?`
                  : "Ready to deploy with your trading bot?"}
              </span>
              <span className="text-text-muted">
                {!isDefault && activeBlueprint
                  ? `Optimized for Algorb ${activeBlueprint.recommendedTier.toUpperCase()} • Self-hosted perpetual license • Full source code`
                  : "Self-hosted perpetual license • No telemetry tracking • Full source code"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              href={`/products/${selectedProduct}`}
              variant="outline"
              size="md"
            >
              VIEW {selectedProduct === "view" ? "VIEW" : "CONTROL"} SPECS
            </Button>
            <Button
              href={PRODUCTS[selectedProduct].whopCheckoutUrl}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET ALGORB {selectedProduct.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardLabSkeleton() {
  return (
    <section id="dashboard-lab" className="relative py-28 border-b border-white/10 bg-background overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-white/10 rounded mx-auto" />
          <div className="h-10 w-96 bg-white/10 rounded mx-auto" />
          <div className="h-96 max-w-6xl bg-white/5 rounded-xl mx-auto border border-white/10" />
        </div>
      </div>
    </section>
  );
}

export const DashboardLab: React.FC = () => {
  return (
    <Suspense fallback={<DashboardLabSkeleton />}>
      <DashboardLabContent />
    </Suspense>
  );
};
