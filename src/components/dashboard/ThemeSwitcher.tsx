"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeId } from "@/hooks/useTheme";
import { THEMES } from "@/data/themes";
import { cn } from "@/lib/utils";
import { Palette, ChevronDown, Check } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "compact" | "detailed" | "navbar";
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className,
  variant = "detailed",
  showLabel = true,
}) => {
  const { theme, setTheme, mounted, activeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectTheme = (selectedId: ThemeId) => {
    setTheme(selectedId);
    setIsOpen(false);
  };

  // SSR-safe fallback while mounting to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-surface/80 text-text-muted text-[11px] font-mono",
          className
        )}
      >
        <span className="w-2 h-2 rounded-full bg-[#00ff80] opacity-80" />
        <span className="uppercase font-bold tracking-wider">Terminal</span>
      </div>
    );
  }

  const isLight = theme === "light";

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left font-mono", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-200 text-xs select-none group",
          isOpen
            ? "border-accent ring-1 ring-accent/30 bg-surface-elevated"
            : "border-white/10 hover:border-white/20 bg-surface/80 hover:bg-surface",
          isLight
            ? "border-slate-300 bg-white/90 text-slate-800 hover:bg-white shadow-sm"
            : "text-white"
        )}
      >
        {/* Glow indicator circle */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{
              backgroundColor: activeTheme.colors.accent,
              boxShadow: `0 0 8px ${activeTheme.colors.accent}`,
            }}
          />
        </span>

        {showLabel && (
          <span className="flex items-center gap-1.5">
            <Palette className={cn("w-3.5 h-3.5", isLight ? "text-slate-500" : "text-text-muted group-hover:text-accent transition-colors")} />
            <span className="font-bold tracking-wider uppercase text-[11px]">
              {variant === "compact" ? activeTheme.name : `${activeTheme.name}`}
            </span>
          </span>
        )}

        <ChevronDown
          className={cn(
            "w-3 h-3 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>

      {/* Floating Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in-0 zoom-in-95",
            isLight
              ? "bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-surface-elevated/95 border-white/15 text-white shadow-black/80"
          )}
        >
          {/* Menu Header */}
          <div className={cn("px-2.5 py-1.5 pb-2 border-b flex items-center justify-between text-[10px]", isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-text-muted")}>
            <span className="font-bold uppercase tracking-wider flex items-center gap-1">
              <Palette className="w-3 h-3 text-accent" />
              COLOR PROFILE
            </span>
            <span className="opacity-70">6 THEMES</span>
          </div>

          {/* Theme Options */}
          <div className="flex flex-col gap-0.5 pt-1">
            {THEMES.map((item) => {
              const isSelected = item.id === theme;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTheme(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-150 group border",
                    isSelected
                      ? isLight
                        ? "bg-sky-50 border-sky-300 text-sky-950 font-bold"
                        : "bg-accent/15 border-accent/40 text-accent font-bold shadow-glow-cyan"
                      : isLight
                      ? "border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                      : "border-transparent text-text-secondary hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Glowing Theme Color Indicator */}
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: item.colors.accent,
                        boxShadow: isSelected ? `0 0 8px ${item.colors.accent}` : "none",
                      }}
                    />

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("text-[10px] opacity-60", isSelected && "opacity-100 font-extrabold")}>
                          {item.num}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-bold truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className={cn("text-[9px] truncate tracking-tight", isLight ? "text-slate-400" : "text-text-muted")}>
                        {item.codename}
                      </span>
                    </div>
                  </div>

                  {/* Active Checkmark */}
                  {isSelected ? (
                    <Check className={cn("w-3.5 h-3.5 shrink-0 ml-2", isLight ? "text-sky-600" : "text-accent")} />
                  ) : (
                    <span className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className={cn("mt-1.5 pt-1.5 border-t px-2 text-[9px] text-center", isLight ? "border-slate-200 text-slate-400" : "border-white/5 text-text-muted")}>
            <span>Persisted to LocalStorage</span>
          </div>
        </div>
      )}
    </div>
  );
};
