"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArchitectureBlueprint } from "@/data/architectures-data";
import { PRODUCTS } from "@/data/products";
import { KillerWidgetSimulator } from "./KillerWidgetSimulator";
import { Button } from "@/components/ui/Button";
import { useSiteTheme } from "@/hooks/useSiteTheme";
import { cn } from "@/lib/utils";
import { X, ShieldCheck, ArrowRight, Zap, ExternalLink, Activity, Terminal, Sliders } from "lucide-react";

interface ArchitectureModalProps {
  blueprint: ArchitectureBlueprint | null;
  onClose: () => void;
  isLight?: boolean;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  blueprint,
  onClose,
  isLight: propIsLight,
}) => {
  const { isLight: themeIsLight } = useSiteTheme();
  const isLight = propIsLight ?? themeIsLight;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (blueprint) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [blueprint, onClose]);

  if (!blueprint) return null;

  const productTier = PRODUCTS[blueprint.recommendedTier];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-2xl border shadow-2xl font-mono text-xs overflow-hidden flex flex-col max-h-[92vh]",
          isLight
            ? "bg-[#f8fafc] border-slate-300 text-slate-900"
            : "bg-surface-elevated/95 border-accent/40 text-white ring-1 ring-accent/20"
        )}
      >
        {/* Modal Header */}
        <div
          className={cn(
            "p-4 sm:p-5 border-b flex items-center justify-between gap-3",
            isLight ? "border-slate-200 bg-white" : "border-white/10 bg-surface/80"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 text-accent font-bold text-sm flex items-center justify-center shrink-0">
              {blueprint.number}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("font-bold text-sm sm:text-base", isLight ? "text-slate-900" : "text-white")}>
                  {blueprint.title}
                </span>
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
              <span className={cn("text-[10px]", isLight ? "text-slate-500" : "text-text-muted")}>
                {blueprint.categoryLabel} • {blueprint.targetAudience}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={cn(
              "p-1.5 rounded-lg border transition-colors",
              isLight
                ? "border-slate-300 hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                : "border-white/10 hover:bg-white/10 text-text-muted hover:text-white"
            )}
            title="Close inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Target Persona Callout */}
          <div
            className={cn(
              "p-3 rounded-lg border",
              isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
            )}
          >
            <span className={cn("text-[10px] font-bold uppercase tracking-wider block mb-1", isLight ? "text-sky-700" : "text-accent")}>
              TARGET BOT OPERATOR & DEPLOYMENT SCENARIO
            </span>
            <p className={cn("text-xs leading-relaxed font-sans", isLight ? "text-slate-600" : "text-text-secondary")}>
              {blueprint.summary}
            </p>
          </div>

          {/* Interactive Killer Widget Simulation */}
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <span className={cn("text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5", isLight ? "text-slate-600" : "text-text-muted")}>
                <Zap className="w-3.5 h-3.5 text-accent" />
                INTERACTIVE KILLER WIDGET SIMULATION
              </span>
              <span className={cn("text-[10px] font-bold", isLight ? "text-sky-700" : "text-accent")}>LIVE TELEMETRY TESTBED</span>
            </div>
            <KillerWidgetSimulator blueprint={blueprint} isLight={isLight} />
          </div>

          {/* Layout Architecture & Topology */}
          <div
            className={cn(
              "p-3.5 rounded-lg border space-y-1.5",
              isLight ? "bg-white border-slate-200" : "bg-black/20 border-white/5"
            )}
          >
            <span className={cn("text-[10px] font-bold uppercase tracking-wider", isLight ? "text-slate-500" : "text-text-muted")}>
              LAYOUT TOPOLOGY & DISPLAY COMPOSITION
            </span>
            <p className={cn("text-xs leading-relaxed font-sans", isLight ? "text-slate-600" : "text-text-secondary")}>
              {blueprint.layoutDescription}
            </p>
          </div>

          {/* Technical Specs & Alert Vectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div
              className={cn(
                "p-3 rounded-lg border space-y-1",
                isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
              )}
            >
              <span className={cn("text-[10px] font-bold uppercase", isLight ? "text-slate-500" : "text-text-muted")}>
                Latency & Runtime Budget
              </span>
              <div className={cn("font-bold", isLight ? "text-slate-900" : "text-white")}>{blueprint.specs.latencyRequirement}</div>
            </div>

            <div
              className={cn(
                "p-3 rounded-lg border space-y-1",
                isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
              )}
            >
              <span className={cn("text-[10px] font-bold uppercase", isLight ? "text-slate-500" : "text-text-muted")}>
                Primary Monitored Metrics
              </span>
              <div className={cn("truncate font-medium", isLight ? "text-slate-600" : "text-text-secondary")}>
                {blueprint.specs.keyMetrics.join(" • ")}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {blueprint.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-0.5 rounded border text-[10px]",
                  isLight ? "border-slate-200 bg-slate-100 text-slate-600" : "border-white/5 bg-white/[0.02] text-text-muted"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div
          className={cn(
            "p-4 border-t flex flex-wrap items-center justify-between gap-3 select-none",
            isLight ? "border-slate-200 bg-white" : "border-white/10 bg-surface/80"
          )}
        >
          <div className={cn("flex items-center gap-2 text-[10px]", isLight ? "text-slate-600" : "text-text-muted")}>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-success" />
            <span>Ready-to-use template in {productTier.name}. Compatible with all 6 themes.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onClose}
              className={cn("px-3 py-2 rounded text-xs transition-colors", isLight ? "text-slate-500 hover:text-slate-900" : "text-text-muted hover:text-white")}
            >
              Back to Explorer
            </button>
            <Link
              href={`/?archetype=${blueprint.id}#dashboard-lab`}
              onClick={onClose}
              className={cn(
                "px-3.5 py-2 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5",
                isLight
                  ? "border-sky-300 text-sky-700 bg-sky-50/70 hover:bg-sky-100"
                  : "border-accent/40 text-accent hover:bg-accent/10"
              )}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>LAUNCH IN DASHBOARD LAB</span>
            </Link>
            <a
              href={productTier.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg",
                isLight
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-accent text-black hover:bg-accent/80 shadow-accent/20"
              )}
            >
              <span>GET STRATDESK PRO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
