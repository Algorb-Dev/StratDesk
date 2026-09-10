"use client";

import React from "react";
import { ArchitectureBlueprint } from "@/data/architectures-data";
import { PRODUCTS } from "@/data/products";
import {
  Zap,
  ShieldCheck,
  ExternalLink,
  Cpu,
  Clock,
  Layers,
  AlertTriangle,
  Layout,
  Terminal,
  Activity,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlueprintSpecHudProps {
  blueprint: ArchitectureBlueprint;
  isLight?: boolean;
}

export const BlueprintSpecHud: React.FC<BlueprintSpecHudProps> = ({
  blueprint,
  isLight = false,
}) => {
  const productTier = PRODUCTS[blueprint.recommendedTier];

  const isPro = blueprint.recommendedTier === "pro" || blueprint.recommendedTier === "control";
  const tierName = isPro ? "PRO" : "CORE";

  return (
    <div className="flex flex-col gap-5 font-mono text-xs select-none">
      {/* 1. Header Spec Bar */}
      <div
        className={cn(
          "p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors",
          isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
        )}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent/15 border border-accent/30 text-accent font-bold text-xs flex items-center justify-center shrink-0">
              {blueprint.number}
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
              {blueprint.categoryLabel}
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
          <h3 className={cn("text-base sm:text-lg font-bold font-sans", isLight ? "text-slate-900" : "text-white")}>
            {blueprint.title}
          </h3>
        </div>

        {/* Latency Requirement Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className={cn(
              "px-3 py-1.5 rounded-lg border flex items-center gap-2",
              isLight ? "bg-white border-slate-200 text-slate-700" : "bg-black/30 border-white/10 text-slate-300"
            )}
          >
            <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
            <div>
              <span className="text-[9px] text-text-muted uppercase block">LATENCY BUDGET</span>
              <span className="font-bold text-xs">{blueprint.specs.latencyRequirement.split("/")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Target Operator Persona Callout */}
      <div
        className={cn(
          "p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
          isLight ? "bg-white border-slate-200 text-slate-700" : "bg-surface/50 border-white/10 text-text-secondary"
        )}
      >
        <div className="space-y-0.5 max-w-2xl">
          <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">
            TARGET OPERATOR PERSONA:
          </span>
          <p className="text-xs font-sans leading-relaxed text-text-secondary">
            {blueprint.targetAudience}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 shrink-0">
          {blueprint.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-text-muted text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3. SVG Architectural Wireframe & Layout Topology */}
      <div
        className={cn(
          "rounded-xl border p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden",
          isLight ? "bg-white border-slate-200" : "bg-black/40 border-white/10"
        )}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layout className="w-3.5 h-3.5 text-accent" />
            <span className="font-bold text-xs uppercase tracking-wider text-white">
              INTENDED EXECUTION LAYOUT TOPOLOGY
            </span>
          </div>
          <span className="text-[10px] text-accent font-bold">
            PRESET #{blueprint.number} SCHEMATIC
          </span>
        </div>

        {/* Dynamic Architectural Wireframe SVG */}
        <div className="w-full rounded-lg bg-black/60 border border-white/10 p-2 sm:p-4 overflow-hidden relative">
          <ArchitecturalWireframeSvg blueprint={blueprint} isLight={isLight} />
        </div>

        {/* Layout description text */}
        <p className="text-xs text-text-muted font-sans leading-relaxed pt-1">
          <strong className="text-white font-mono uppercase text-[11px] mr-1">Display Topology:</strong>
          {blueprint.layoutDescription}
        </p>
      </div>

      {/* 4. Killer Widget & Alert Vectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Killer Widget Spotlight */}
        <div
          className={cn(
            "p-4 rounded-xl border flex flex-col justify-between gap-2.5",
            isLight ? "bg-white border-slate-200" : "bg-surface/50 border-white/10"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              INTEGRATED KILLER WIDGET
            </span>
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-accent/20 text-accent uppercase">
              {blueprint.killerWidget.badge}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white">{blueprint.killerWidget.name}</h4>
            <p className="text-xs text-text-secondary font-sans leading-relaxed mt-1">
              {blueprint.killerWidget.description}
            </p>
          </div>

          <div className="text-[10px] text-text-muted border-t border-white/5 pt-2 flex items-center justify-between">
            <span>Simulation Type:</span>
            <code className="text-accent">{blueprint.killerWidget.simulationType}</code>
          </div>
        </div>

        {/* Monitored Alert Vectors & Metrics */}
        <div
          className={cn(
            "p-4 rounded-xl border flex flex-col justify-between gap-2.5",
            isLight ? "bg-white border-slate-200" : "bg-surface/50 border-white/10"
          )}
        >
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-warning" />
            AUTOMATED ALERT VECTORS & THRESHOLDS
          </span>

          <div className="space-y-1.5">
            {blueprint.specs.alertVectors.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-1.5 rounded bg-white/[0.02] border border-white/5 text-[11px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                <span className="text-text-secondary truncate">{alert}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-text-muted border-t border-white/5 pt-2 flex items-center justify-between">
            <span>Primary Monitored:</span>
            <span className="text-white truncate max-w-[180px]">{blueprint.specs.keyMetrics.slice(0, 2).join(" • ")}</span>
          </div>
        </div>
      </div>

      {/* 5. Direct Whop Checkout CTA Strip */}
      <div
        className={cn(
          "p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 select-none",
          isLight
            ? "bg-slate-50 border-slate-200"
            : "bg-surface-elevated/70 border-accent/30 shadow-glow-cyan/10"
        )}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span className="font-bold text-white text-sm">
              Deploy Preset #{blueprint.number} with StratDesk Pro
            </span>
          </div>
          <p className="text-xs text-text-muted font-sans">
            Includes full layout code, killer widget hooks, and CCXT telemetry adapters.
          </p>
        </div>

        <a
          href={productTier.whopCheckoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-accent text-background font-bold text-xs uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 shrink-0"
        >
          <span>GET THIS ARCHITECTURE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

// ==============================================================================
// Architectural Wireframe SVG Component
// Generates a visual architectural schematic matching the blueprint's layout
// ==============================================================================
function ArchitecturalWireframeSvg({
  blueprint,
  isLight = false,
}: {
  blueprint: ArchitectureBlueprint;
  isLight?: boolean;
}) {
  const num = parseInt(blueprint.number, 10) || 1;

  // Render variations based on category / archetype layout
  return (
    <svg
      viewBox="0 0 760 260"
      className="w-full h-auto max-h-64 font-mono text-[9px] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background blueprint grid */}
      <defs>
        <pattern id={`grid-${blueprint.number}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id={`accent-grad-${blueprint.number}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00e599" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width="760" height="260" fill={`url(#grid-${blueprint.number})`} />

      {/* Outer Browser/Terminal Frame */}
      <rect x="2" y="2" width="756" height="256" rx="8" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

      {/* Top Header Bar */}
      <rect x="2" y="2" width="756" height="26" rx="8" fill="rgba(255, 255, 255, 0.03)" />
      <circle cx="16" cy="15" r="3" fill="#ef4444" opacity="0.8" />
      <circle cx="26" cy="15" r="3" fill="#f59e0b" opacity="0.8" />
      <circle cx="36" cy="15" r="3" fill="#10b981" opacity="0.8" />
      <text x="50" y="18" fill="rgba(255, 255, 255, 0.5)" fontSize="9">
        STRATDESK RUNTIME // PRESET {blueprint.number} • {blueprint.title.toUpperCase()}
      </text>
      <text x="680" y="18" fill="#00f0ff" fontSize="8" fontWeight="bold">
        {blueprint.specs.latencyRequirement.split("/")[0]}
      </text>

      {/* Metric Strip (Top Row) */}
      <g transform="translate(10, 34)">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const metricLabel = blueprint.specs.keyMetrics[idx % blueprint.specs.keyMetrics.length] || `METRIC #${idx+1}`;
          const colW = 120;
          return (
            <g key={idx} transform={`translate(${idx * (colW + 4)}, 0)`}>
              <rect width={colW} height="28" rx="4" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.08)" />
              <text x="6" y="12" fill="rgba(255, 255, 255, 0.4)" fontSize="7">
                {metricLabel.length > 16 ? metricLabel.substring(0, 14) + ".." : metricLabel}
              </text>
              <text x="6" y="23" fill="#fff" fontSize="9" fontWeight="bold">
                {idx === 0 ? "LIVE" : idx === 1 ? "+2.48%" : idx === 2 ? "12ms" : idx === 3 ? "NOMINAL" : idx === 4 ? "ARMED" : "99.2%"}
              </text>
            </g>
          );
        })}
      </g>

      {/* Dynamic Layout Archetype Blocks */}
      {blueprint.category === "asset-class" ? (
        // Split-Screen Dual-Column / Orderbook Topology
        <g transform="translate(10, 68)">
          {/* Left Column: Venue A Depth */}
          <rect x="0" y="0" width="240" height="182" rx="6" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.3)" strokeDasharray="3 3" />
          <text x="10" y="18" fill="#00f0ff" fontSize="9" fontWeight="bold">VENUE A // ORDERBOOK DEPTH</text>
          <line x1="10" y1="28" x2="230" y2="28" stroke="rgba(255, 255, 255, 0.1)" />
          {/* Simulated depth bars */}
          <rect x="10" y="38" width="140" height="12" fill="rgba(16, 185, 129, 0.3)" rx="2" />
          <rect x="10" y="54" width="180" height="12" fill="rgba(16, 185, 129, 0.25)" rx="2" />
          <rect x="10" y="70" width="110" height="12" fill="rgba(16, 185, 129, 0.2)" rx="2" />
          <rect x="10" y="92" width="160" height="12" fill="rgba(239, 68, 68, 0.25)" rx="2" />
          <rect x="10" y="108" width="130" height="12" fill="rgba(239, 68, 68, 0.3)" rx="2" />
          <text x="10" y="170" fill="rgba(255, 255, 255, 0.3)" fontSize="8">STREAM: AWS-TOKYO-SOCKET-01</text>

          {/* Center Stage: Killer Widget Focus */}
          <rect x="248" y="0" width="290" height="182" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke={`url(#accent-grad-${blueprint.number})`} strokeWidth="1.5" />
          <text x="260" y="18" fill="#fff" fontSize="9" fontWeight="bold">
            KILLER WIDGET: {blueprint.killerWidget.name.toUpperCase()}
          </text>
          {/* Center chart / scatter simulation */}
          <path d="M 260 140 Q 330 70, 400 110 T 520 60" fill="none" stroke="#00f0ff" strokeWidth="2" />
          <circle cx="520" cy="60" r="4" fill="#00e599" />
          <text x="260" y="170" fill="#00e599" fontSize="8">SIGNAL CONVERGENCE ACTIVE</text>

          {/* Right Column: Execution Ladder */}
          <rect x="546" y="0" width="194" height="182" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="556" y="18" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontWeight="bold">EXECUTION LADDER</text>
          <rect x="556" y="32" width="174" height="24" rx="4" fill="rgba(255, 255, 255, 0.05)" />
          <rect x="556" y="62" width="174" height="24" rx="4" fill="rgba(255, 255, 255, 0.03)" />
          <rect x="556" y="92" width="174" height="24" rx="4" fill="rgba(255, 255, 255, 0.03)" />
          <text x="556" y="170" fill="rgba(255, 255, 255, 0.4)" fontSize="8">ROUTED: SUB-MS IOC</text>
        </g>
      ) : blueprint.category === "strategy" ? (
        // Strategy Cointegration / Multi-Leg Canvas
        <g transform="translate(10, 68)">
          <rect x="0" y="0" width="510" height="182" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke={`url(#accent-grad-${blueprint.number})`} strokeWidth="1.5" />
          <text x="14" y="18" fill="#fff" fontSize="9" fontWeight="bold">
            STRATEGY MATRIX // {blueprint.killerWidget.name.toUpperCase()}
          </text>
          {/* Dual oscillating trajectory */}
          <path d="M 20 90 Q 140 30, 260 90 T 500 90" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
          <path d="M 20 90 Q 140 150, 260 90 T 500 90" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
          {/* Upper / lower threshold lines */}
          <line x1="20" y1="40" x2="500" y2="40" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="3 3" />
          <text x="440" y="36" fill="#ef4444" fontSize="7">+2.0σ TRIGGER</text>
          <line x1="20" y1="140" x2="500" y2="140" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="3 3" />
          <text x="440" y="148" fill="#10b981" fontSize="7">-2.0σ TRIGGER</text>

          {/* Right Risk & Vector Drawer */}
          <rect x="520" y="0" width="220" height="182" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="532" y="18" fill="#f59e0b" fontSize="9" fontWeight="bold">PARAM SENSITIVITY</text>
          <circle cx="630" cy="90" r="42" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <circle cx="630" cy="90" r="30" stroke="#00f0ff" strokeWidth="2" strokeDasharray="120 40" />
          <text x="618" y="93" fill="#fff" fontSize="9" fontWeight="bold">OPTIMAL</text>
          <text x="532" y="170" fill="rgba(255, 255, 255, 0.4)" fontSize="8">DECAY: T1/2 = 14.2m</text>
        </g>
      ) : (
        // Operational / Presentation / Modular Display Canvas
        <g transform="translate(10, 68)">
          <rect x="0" y="0" width="360" height="182" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke={`url(#accent-grad-${blueprint.number})`} strokeWidth="1.5" />
          <text x="14" y="18" fill="#fff" fontSize="9" fontWeight="bold">
            PRIMARY VITALS // {blueprint.killerWidget.badge}
          </text>
          {/* Radial radar / heat array */}
          <circle cx="180" cy="96" r="48" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="2" />
          <circle cx="180" cy="96" r="28" stroke="rgba(0, 229, 153, 0.6)" strokeWidth="3" strokeDasharray="90 30" />
          <text x="156" y="100" fill="#00f0ff" fontSize="11" fontWeight="bold">ACTIVE</text>
          <text x="14" y="170" fill="rgba(255, 255, 255, 0.4)" fontSize="8">
            SPEC: {blueprint.specs.latencyRequirement.split("/")[0]}
          </text>

          {/* Right Split Viewport */}
          <rect x="370" y="0" width="370" height="88" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="384" y="18" fill="#10b981" fontSize="9" fontWeight="bold">EVENT STREAM & AUDIT QUEUE</text>
          <text x="384" y="38" fill="rgba(255, 255, 255, 0.6)" fontSize="8">• Fill TRD-{blueprint.number}142 confirmed @ benchmark</text>
          <text x="384" y="52" fill="rgba(255, 255, 255, 0.6)" fontSize="8">• Telemetry synchronized via local IPC ring</text>
          <text x="384" y="66" fill="#00e599" fontSize="8">• R-Multiple normalized outcome: +3.2R</text>

          <rect x="370" y="94" width="370" height="88" rx="6" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="384" y="112" fill="#ef4444" fontSize="9" fontWeight="bold">INCIDENT & THRESHOLD ESCALATION</text>
          <text x="384" y="132" fill="rgba(255, 255, 255, 0.6)" fontSize="8">Alert Vectors: {blueprint.specs.alertVectors[0] || "Active Thresholds"}</text>
          <text x="384" y="148" fill="rgba(255, 255, 255, 0.4)" fontSize="8">Zero key leakage • Hardware sandbox isolated</text>
        </g>
      )}
    </svg>
  );
}
