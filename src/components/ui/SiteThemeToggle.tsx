"use client";

import React from "react";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const SiteThemeToggle: React.FC<SiteThemeToggleProps> = ({
  className,
  showLabel = false,
}) => {
  const { isDark, toggleSiteTheme, mounted } = useSiteTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-lg border border-white/10 bg-white/5",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSiteTheme}
      aria-label={isDark ? "Switch website to light mode" : "Switch website to dark mode"}
      title={isDark ? "Switch website to light mode" : "Switch website to dark mode"}
      className={cn(
        "relative p-2 rounded-lg border transition-all duration-200 flex items-center gap-1.5 font-mono text-xs select-none group",
        isDark
          ? "border-white/10 bg-surface/80 text-text-secondary hover:text-white hover:border-accent/40 hover:bg-surface shadow-sm"
          : "border-slate-300 bg-white text-slate-700 hover:text-slate-950 hover:border-slate-400 shadow-sm",
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600 transition-transform duration-200 group-hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {isDark ? "LIGHT" : "DARK"}
        </span>
      )}
    </button>
  );
};
