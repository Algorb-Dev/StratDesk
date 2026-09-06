"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { THEMES } from "@/data/themes";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Cpu, Palette, ArrowRight, ShieldCheck, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const ARCHETYPE_OPTIONS = [
  { id: "default", label: "DEFAULT HUD", canonicalId: "default", tier: "view" as const },
  { id: "prop-firm", label: "PROP-FIRM HALO", canonicalId: "prop-firm-evaluator-console", tier: "control" as const },
  { id: "crypto-arbitrage", label: "CRYPTO ARBITRAGE", canonicalId: "crypto-arbitrage-matrix", tier: "control" as const },
  { id: "stat-arb", label: "STAT-ARB Z-SCORE", canonicalId: "pair-trading-statarb-console", tier: "control" as const },
  { id: "dex-sniper", label: "DEX SNIPER", canonicalId: "on-chain-dex-sniper", tier: "control" as const },
  { id: "raw-cli", label: "RAW CLI", canonicalId: "raw-developer-terminal-cli", tier: "view" as const },
  { id: "cro-redline", label: "CRO RED LINE", canonicalId: "chief-risk-officer-red-line", tier: "control" as const },
];

const VALID_THEMES = ["terminal", "obsidian", "quant", "command", "vector", "light"] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

function DashboardLabContent() {
  const searchParams = useSearchParams();

  const initialArchetype = searchParams.get("archetype") || "default";
  const initialTierParam = searchParams.get("tier");
  const initialTier: "view" | "control" = initialTierParam === "control" ? "control" : "view";
  const initialThemeParam = searchParams.get("theme");
  const initialTheme: ValidTheme =
    initialThemeParam && (VALID_THEMES as readonly string[]).includes(initialThemeParam)
      ? (initialThemeParam as ValidTheme)
      : "obsidian";

  const [selectedProduct, setSelectedProduct] = useState<"view" | "control">(initialTier);
  const [selectedTheme, setSelectedTheme] = useState<ValidTheme>(initialTheme);
  const [selectedArchetype, setSelectedArchetype] = useState<string>(initialArchetype);

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
    updateUrl(selectedProduct, theme, selectedArchetype);
  };

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
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <LayoutGrid className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold text-white uppercase tracking-wider">ARCHETYPE BLUEPRINT:</span>
              </div>
              <span className="text-[10px] text-accent font-bold hidden sm:inline">HOT-SWAP SPECIALIZED TELEMETRY & KILLER WIDGET</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-background p-1.5 rounded-xl border border-white/10">
              {ARCHETYPE_OPTIONS.map((opt) => {
                const isSelected =
                  selectedArchetype === opt.id ||
                  selectedArchetype === opt.canonicalId ||
                  (opt.id === "default" && (!selectedArchetype || selectedArchetype === "default"));
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleArchetypeSelect(opt.id, opt.tier)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase transition-all flex items-center gap-1.5 border",
                      isSelected
                        ? "bg-accent text-background border-accent shadow-glow-cyan font-bold"
                        : "text-text-muted hover:text-white border-transparent hover:bg-white/5"
                    )}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
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
                {selectedArchetype !== "default"
                  ? `Ready to deploy this architecture blueprint?`
                  : "Ready to deploy with your trading bot?"}
              </span>
              <span className="text-text-muted">Self-hosted perpetual license • No telemetry tracking • Full source code</span>
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
