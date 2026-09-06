"use client";

import React, { useEffect } from "react";
import { ArchitectureBlueprint } from "@/data/architectures-data";
import { PRODUCTS } from "@/data/products";
import { KillerWidgetSimulator } from "./KillerWidgetSimulator";
import { AlgorbSymbol } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { X, ShieldCheck, ArrowRight, Zap, ExternalLink, Activity, Terminal } from "lucide-react";

interface ArchitectureModalProps {
  blueprint: ArchitectureBlueprint | null;
  onClose: () => void;
  isLight?: boolean;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  blueprint,
  onClose,
  isLight = false,
}) => {
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
                <span className="font-bold text-sm sm:text-base text-white">
                  {blueprint.title}
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-[9px] font-bold rounded uppercase border",
                    blueprint.recommendedTier === "control"
                      ? "bg-accent/10 text-accent border-accent/30"
                      : "bg-white/5 text-text-secondary border-white/10"
                  )}
                >
                  ALGORB {blueprint.recommendedTier.toUpperCase()}
                </span>
              </div>
              <span className="text-[10px] text-text-muted">
                {blueprint.categoryLabel} • {blueprint.targetAudience}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-text-muted hover:text-white"
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
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
              TARGET BOT OPERATOR & DEPLOYMENT SCENARIO
            </span>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {blueprint.summary}
            </p>
          </div>

          {/* Interactive Killer Widget Simulation */}
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent" />
                INTERACTIVE KILLER WIDGET SIMULATION
              </span>
              <span className="text-[10px] text-accent font-bold">LIVE TELEMETRY TESTBED</span>
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
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              LAYOUT TOPOLOGY & DISPLAY COMPOSITION
            </span>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
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
              <span className="text-[10px] font-bold uppercase text-text-muted">
                Latency & Runtime Budget
              </span>
              <div className="text-white font-bold">{blueprint.specs.latencyRequirement}</div>
            </div>

            <div
              className={cn(
                "p-3 rounded-lg border space-y-1",
                isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/5"
              )}
            >
              <span className="text-[10px] font-bold uppercase text-text-muted">
                Primary Monitored Metrics
              </span>
              <div className="text-text-secondary truncate">
                {blueprint.specs.keyMetrics.join(" • ")}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {blueprint.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-text-muted text-[10px]"
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
          <div className="flex items-center gap-2 text-[10px] text-text-muted">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Ready-to-use template in {productTier.name}. Compatible with all 6 themes.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded text-xs text-text-muted hover:text-white transition-colors"
            >
              Back to Explorer
            </button>
            <a
              href={productTier.whopCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center gap-1.5 shadow-lg shadow-accent/20"
            >
              <span>GET {productTier.name.toUpperCase()}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
