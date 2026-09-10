"use client";

import React, { useState } from "react";
import { THEMES, ThemeDefinition } from "@/data/themes";
import { Badge } from "@/components/ui/Badge";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Sparkles, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeGallery: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeDefinition>(THEMES[1]); // Obsidian default

  return (
    <section id="themes" className="relative py-28 border-b border-border bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            VISUAL FLAVORS
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            ONE ENGINE. <br />
            <span className="text-text-muted">MANY INTERFACES.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Personalize your command center to match your workstation aesthetic. Every StratDesk interface includes 6 precision-crafted color and typography themes.
          </p>
        </div>

        {/* Theme Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 font-mono">
          {THEMES.map((theme) => {
            const isSelected = activeTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className={cn(
                  "p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between group shadow-sm",
                  isSelected
                    ? "bg-sky-50 dark:bg-surface-elevated border-sky-400 dark:border-accent shadow-glow-cyan"
                    : "bg-surface border-border hover:border-slate-300 dark:hover:border-white/25 hover:bg-slate-50 dark:hover:bg-surface/50"
                )}
              >
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span className={isSelected ? "text-accent font-bold" : ""}>
                    {theme.num}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full border border-slate-300 dark:border-white/20"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white font-sans">
                  {theme.name}
                </div>
                <div className="text-[10px] text-text-muted truncate mt-1">
                  {theme.codename}
                </div>
              </button>
            );
          })}
        </div>

        {/* Theme Showcase Display */}
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-8 shadow-2xl flex flex-col gap-6">
          {/* Active Theme Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border font-mono">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">THEME {activeTheme.num}:</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-sans">{activeTheme.name}</span>
                <span className="text-xs text-accent">[{activeTheme.codename}]</span>
              </div>
              <p className="text-xs text-text-secondary font-sans mt-1 max-w-xl">
                {activeTheme.description}
              </p>
            </div>

            {/* Theme Traits */}
            <div className="flex flex-wrap items-center gap-2">
              {activeTheme.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-border text-[10px] text-text-muted"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Full Live Mockup in Selected Theme */}
          <div className="w-full">
            <DashboardPreview
              product="pro"
              theme={activeTheme.id}
              variant="theme"
              showArchitectureSwitcher={false}
              showThemeSwitcher={false}
              onThemeChange={(newThemeId) => {
                const found = THEMES.find((t) => t.id === newThemeId);
                if (found) setActiveTheme(found);
              }}
              className="border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
