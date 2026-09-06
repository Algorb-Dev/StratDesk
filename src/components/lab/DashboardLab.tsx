"use client";

import React, { useState } from "react";
import { THEMES, ThemeDefinition } from "@/data/themes";
import { PRODUCTS, ProductTier } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Sliders, Cpu, Palette, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const DashboardLab: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<"view" | "control">("view");
  const [selectedTheme, setSelectedTheme] = useState<
    "terminal" | "obsidian" | "quant" | "command" | "vector" | "light"
  >("obsidian");

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
            Test drive product tiers and color themes interactively. Switch between monitoring telemetry and the active command bus in real time.
          </p>
        </div>

        {/* Configurator Controls Floating Panel */}
        <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-surface/90 border border-white/15 backdrop-blur-xl shadow-2xl font-mono text-xs flex flex-col md:flex-row items-center justify-between gap-6">
          {/* PRODUCT SELECTION */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 text-text-muted">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-white uppercase tracking-wider">PRODUCT TIER:</span>
            </div>
            <div className="flex items-center gap-2 bg-background p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setSelectedProduct("view")}
                className={cn(
                  "px-4 py-2 rounded font-bold uppercase transition-all flex items-center gap-1.5",
                  selectedProduct === "view"
                    ? "bg-accent text-background shadow-glow-cyan"
                    : "text-text-secondary hover:text-white"
                )}
              >
                <span>ALGORB VIEW</span>
                <span className="text-[9px] opacity-80">(MONITOR)</span>
              </button>
              <button
                onClick={() => setSelectedProduct("control")}
                className={cn(
                  "px-4 py-2 rounded font-bold uppercase transition-all flex items-center gap-1.5",
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

          {/* THEME SELECTION */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 text-text-muted">
              <Palette className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-white uppercase tracking-wider">COLOR PALETTE:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-background p-1 rounded-lg border border-white/10">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={cn(
                      "px-2.5 py-1.5 rounded font-mono text-[11px] uppercase transition-all flex items-center gap-1.5",
                      isSelected
                        ? "bg-white/15 text-white border border-white/30 font-bold"
                        : "text-text-muted hover:text-white"
                    )}
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span>{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Configured Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <DashboardPreview
            product={selectedProduct}
            theme={selectedTheme}
            className="border-white/15"
          />
        </div>

        {/* Action Callout below Lab */}
        <div className="mt-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface/50 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-success" />
            <div>
              <span className="font-bold text-white block">Ready to deploy with your trading bot?</span>
              <span className="text-text-muted">Self-hosted perpetual license • No telemetry tracking</span>
            </div>
          </div>
          <Button
            href={`/products/${selectedProduct}`}
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            VIEW {selectedProduct === "view" ? "VIEW" : "CONTROL"} SPECS
          </Button>
        </div>
      </div>
    </section>
  );
};
