import React from "react";
import { ThemeGallery } from "@/components/themes/ThemeGallery";
import { DashboardLab } from "@/components/lab/DashboardLab";
import { Badge } from "@/components/ui/Badge";

export default function ThemesPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            AESTHETIC ARCHITECTURE
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
            THEMES & PALETTES.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-text-secondary leading-relaxed font-sans">
            Crafted for long sessions at the workstation. Switch between vintage green phosphor, stealth obsidian carbon, high-density quant arrays, and daylight laboratory modes.
          </p>
        </div>

        <ThemeGallery />
        <div className="mt-16">
          <DashboardLab />
        </div>
      </div>
    </div>
  );
}
