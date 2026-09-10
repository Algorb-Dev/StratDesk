"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  useDashboardArchitecture,
  resolveCanonicalArchetypeId,
  DEFAULT_ARCHITECTURE,
} from "@/hooks/useDashboardArchitecture";
import {
  ARCHITECTURES_DATA,
  ARCHITECTURE_CATEGORIES,
  ArchitectureCategory,
} from "@/data/architectures-data";
import { cn } from "@/lib/utils";
import { Layers, ChevronDown, Check, Sparkles, Terminal } from "lucide-react";

interface ArchitectureSwitcherProps {
  className?: string;
  variant?: "compact" | "detailed";
  showLabel?: boolean;
  activeArchitectureId?: string;
  onArchitectureChange?: (id: string) => void;
  isLight?: boolean;
  filterTier?: string;
}

const INTERACTIVE_SIMULATOR_IDS = new Set([
  "prop-firm-evaluator-console",
  "crypto-arbitrage-matrix",
  "pair-trading-statarb-console",
  "on-chain-dex-sniper",
  "raw-developer-terminal-cli",
  "chief-risk-officer-red-line",
  "options-volatility-surface",
]);

export const ArchitectureSwitcher: React.FC<ArchitectureSwitcherProps> = ({
  className,
  variant = "detailed",
  showLabel = true,
  activeArchitectureId,
  onArchitectureChange,
  isLight = false,
  filterTier,
}) => {
  const {
    architecture: hookArchitecture,
    setArchitecture,
    mounted,
  } = useDashboardArchitecture();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentId =
    activeArchitectureId !== undefined ? activeArchitectureId : hookArchitecture;
  const canonicalCurrentId = resolveCanonicalArchetypeId(currentId);
  const isDefaultActive =
    currentId === DEFAULT_ARCHITECTURE ||
    canonicalCurrentId === DEFAULT_ARCHITECTURE ||
    !currentId;

  const currentBlueprint = isDefaultActive
    ? undefined
    : ARCHITECTURES_DATA.find(
        (b) => b.id === canonicalCurrentId || b.id === currentId
      );

  // Close dropdown when clicking outside or pressing Escape
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

  const handleSelect = (selectedId: string) => {
    if (onArchitectureChange) {
      onArchitectureChange(selectedId);
    }
    setArchitecture(selectedId);
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
        <span className="w-2 h-2 rounded-full bg-accent/80" />
        <span className="uppercase font-bold tracking-wider">DEFAULT HUD</span>
      </div>
    );
  }

  // Categories excluding 'all'
  const filterCategories = ARCHITECTURE_CATEGORIES.filter(
    (c) => c.id !== "all"
  ) as { id: ArchitectureCategory; label: string; count: number }[];

  const triggerLabel = isDefaultActive
    ? "DEFAULT HUD"
    : variant === "compact"
    ? `#${currentBlueprint?.number || "00"} ${currentBlueprint?.killerWidget.badge || "SPEC"}`
    : currentBlueprint?.title || "DEFAULT HUD";

  return (
    <div
      ref={dropdownRef}
      className={cn("relative inline-block text-left font-mono", className)}
    >
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
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60",
              isDefaultActive ? "bg-accent" : "bg-emerald-400"
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              isDefaultActive ? "bg-accent" : "bg-emerald-400"
            )}
            style={{
              boxShadow: isDefaultActive
                ? "0 0 8px rgba(0, 240, 255, 0.6)"
                : "0 0 8px rgba(52, 211, 153, 0.8)",
            }}
          />
        </span>

        {showLabel && (
          <span className="flex items-center gap-1.5 min-w-0">
            <Layers
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                isLight
                  ? "text-slate-500"
                  : "text-text-muted group-hover:text-accent transition-colors"
              )}
            />
            <span className="font-bold tracking-wider uppercase text-[11px] truncate max-w-[120px] sm:max-w-[160px]">
              {triggerLabel}
            </span>
          </span>
        )}

        <ChevronDown
          className={cn(
            "w-3 h-3 text-text-muted shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-accent"
          )}
        />
      </button>

      {/* Floating Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 top-full mt-1.5 z-50 w-72 sm:w-88 max-h-[480px] flex flex-col rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in-0 zoom-in-95",
            isLight
              ? "bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50"
              : "bg-surface-elevated/95 border-white/15 text-white shadow-black/80"
          )}
        >
          {/* Menu Header */}
          <div
            className={cn(
              "px-2.5 py-1.5 pb-2 border-b flex items-center justify-between text-[10px] shrink-0",
              isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-text-muted"
            )}
          >
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-accent" />
              ARCHITECTURE BLUEPRINT
            </span>
            <span className="opacity-80 px-1.5 py-0.5 rounded text-[9px] font-bold border border-current">
              20 ARCHITECTURES
            </span>
          </div>

          {/* Scrollable Blueprint List */}
          <div className="flex-1 overflow-y-auto pr-1 py-1 space-y-2 divide-y divide-white/5">
            {/* Top-Level Option: DEFAULT HUD */}
            <div className="pt-0.5">
              <button
                type="button"
                role="option"
                aria-selected={isDefaultActive}
                onClick={() => handleSelect(DEFAULT_ARCHITECTURE)}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all duration-150 group border",
                  isDefaultActive
                    ? isLight
                      ? "bg-sky-50 border-sky-300 text-sky-950 font-bold"
                      : "bg-accent/15 border-accent/40 text-accent font-bold shadow-glow-cyan"
                    : isLight
                    ? "border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    : "border-transparent text-text-secondary hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0",
                      isDefaultActive
                        ? isLight
                          ? "bg-sky-200 text-sky-900"
                          : "bg-accent/20 text-accent"
                        : isLight
                        ? "bg-slate-100 text-slate-500"
                        : "bg-white/5 text-text-muted"
                    )}
                  >
                    HUD
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs uppercase tracking-wider font-bold truncate">
                      DEFAULT HUD
                    </span>
                    <span
                      className={cn(
                        "text-[9px] truncate tracking-tight",
                        isLight ? "text-slate-400" : "text-text-muted"
                      )}
                    >
                      Standard Bot Telemetry & Sparkline
                    </span>
                  </div>
                </div>

                {isDefaultActive ? (
                  <Check
                    className={cn(
                      "w-3.5 h-3.5 shrink-0 ml-2",
                      isLight ? "text-sky-600" : "text-accent"
                    )}
                  />
                ) : (
                  <span className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
            </div>

            {/* Categorized Architecture Groups */}
            {filterCategories.map((category) => {
              const categoryBlueprints = ARCHITECTURES_DATA.filter(
                (b) => b.category === category.id
              );

              return (
                <div key={category.id} className="pt-1.5">
                  {/* Category Header */}
                  <div
                    className={cn(
                      "px-2 py-1 text-[9px] font-bold uppercase tracking-widest flex items-center justify-between",
                      isLight ? "text-slate-500" : "text-text-muted"
                    )}
                  >
                    <span>{category.label}</span>
                    <span className="opacity-60 font-mono">
                      {categoryBlueprints.length}
                    </span>
                  </div>

                  {/* Architecture Items */}
                  <div className="space-y-0.5 mt-0.5">
                    {categoryBlueprints.map((item) => {
                      const isSelected =
                        canonicalCurrentId === item.id || currentId === item.id;
                      const hasSimulator = INTERACTIVE_SIMULATOR_IDS.has(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(item.id)}
                          title={item.title}
                          className={cn(
                            "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all duration-150 group border",
                            isSelected
                              ? isLight
                                ? "bg-sky-50 border-sky-300 text-sky-950 font-bold"
                                : "bg-accent/15 border-accent/40 text-accent font-bold shadow-glow-cyan"
                              : isLight
                              ? "border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                              : "border-transparent text-text-secondary hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Blueprint Number Pill */}
                            <span
                              className={cn(
                                "w-5 text-center text-[10px] font-mono shrink-0",
                                isSelected
                                  ? isLight
                                    ? "text-sky-950 font-extrabold"
                                    : "text-accent font-extrabold"
                                  : isLight
                                  ? "text-slate-400"
                                  : "text-text-muted"
                              )}
                            >
                              {item.number}
                            </span>

                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs tracking-tight font-bold truncate">
                                  {item.title}
                                </span>
                                {hasSimulator && (
                                  <span
                                    className={cn(
                                      "px-1 py-0.2 rounded text-[8px] font-bold tracking-wider shrink-0 uppercase",
                                      isLight
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    )}
                                  >
                                    SIM
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[9px]">
                                <span
                                  className={cn(
                                    "truncate font-medium",
                                    isLight ? "text-slate-500" : "text-text-muted"
                                  )}
                                >
                                  {item.killerWidget.name}
                                </span>
                                <span className="opacity-40">•</span>
                                <span
                                  className={cn(
                                    "uppercase font-bold text-[8px]",
                                    isLight ? "text-amber-700" : "text-warning"
                                  )}
                                >
                                  PRO
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right indicator: Active Checkmark or spacer */}
                          {isSelected ? (
                            <Check
                              className={cn(
                                "w-3.5 h-3.5 shrink-0 ml-2",
                                isLight ? "text-sky-600" : "text-accent"
                              )}
                            />
                          ) : (
                            <span className="w-3.5 h-3.5 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div
            className={cn(
              "mt-1.5 pt-1.5 border-t px-2 text-[9px] text-center shrink-0 flex items-center justify-between",
              isLight
                ? "border-slate-200 text-slate-400"
                : "border-white/5 text-text-muted"
            )}
          >
            <span>Persisted to LocalStorage</span>
            <span>Hot-Swappable</span>
          </div>
        </div>
      )}
    </div>
  );
};
