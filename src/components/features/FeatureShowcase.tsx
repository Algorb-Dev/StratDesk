"use client";

import React, { useState } from "react";
import { FEATURES, FeatureItem } from "@/data/features";
import { Badge } from "@/components/ui/Badge";
import {
  TrendingUp,
  ShieldAlert,
  Layers,
  Zap,
  GitFork,
  Activity,
  Power,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const FeatureShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>("performance");
  const [killPressed, setKillPressed] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    performance: TrendingUp,
    risk: ShieldAlert,
    positions: Layers,
    execution: Zap,
    strategies: GitFork,
    health: Activity,
    control: Power,
    mobile: Smartphone,
  };

  const renderMiniDemo = (item: FeatureItem) => {
    switch (item.interactiveDemoType) {
      case "equity":
        return (
          <div className="w-full h-32 p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-between font-mono">
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>NAV SMOOTHED</span>
              <span className="text-success font-bold">+148.2%</span>
            </div>
            {/* SVG Sparkline */}
            <svg viewBox="0 0 200 50" className="w-full h-16">
              <path
                d="M 0 45 Q 40 38, 70 42 T 120 20 T 160 25 T 200 5"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
              />
              <circle cx="200" cy="5" r="3.5" fill="#00f0ff" className="animate-ping" />
              <circle cx="200" cy="5" r="3" fill="#ffffff" />
            </svg>
            <div className="flex justify-between text-[9px] text-text-muted border-t border-white/5 pt-1">
              <span>TICK: 19:42:15</span>
              <span>DELAY: 0.4ms</span>
            </div>
          </div>
        );

      case "risk":
        return (
          <div className="w-full h-32 p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-between font-mono">
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>DRAWDOWN LIMIT</span>
              <span className="text-warning font-bold">4.21% / 10.0%</span>
            </div>
            <div className="space-y-2 py-1">
              <div>
                <div className="flex justify-between text-[9px] text-text-muted mb-0.5">
                  <span>Margin Usage</span>
                  <span className="text-white">34.2%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "34.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] text-text-muted mb-0.5">
                  <span>Liq. Buffer</span>
                  <span className="text-success">50.2%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        );

      case "positions":
        return (
          <div className="w-full h-32 p-2.5 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-around font-mono text-[10px]">
            <div className="flex items-center justify-between p-1.5 rounded bg-white/5">
              <div className="flex items-center gap-1.5">
                <span className="px-1 text-[8px] bg-success/20 text-success rounded font-bold">L</span>
                <span className="text-white font-bold">BTC-PERP 5x</span>
              </div>
              <span className="text-success font-bold">+$569.92 (+1.07%)</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-white/5">
              <div className="flex items-center gap-1.5">
                <span className="px-1 text-[8px] bg-danger/20 text-danger rounded font-bold">S</span>
                <span className="text-white font-bold">SOL-PERP 2x</span>
              </div>
              <span className="text-success font-bold">+$100.80 (+1.55%)</span>
            </div>
          </div>
        );

      case "execution":
        return (
          <div className="w-full h-32 p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex justify-between text-text-muted">
              <span>DISPATCH WATERFALL</span>
              <span className="text-accent font-bold">AVG 11.4ms</span>
            </div>
            <div className="space-y-1.5 text-[9px]">
              <div className="flex items-center justify-between text-text-muted">
                <span>Signal → Adapter:</span>
                <span className="text-white">1.8ms</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Adapter → WebSocket:</span>
                <span className="text-white">0.4ms</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Exchange Ack:</span>
                <span className="text-accent">9.2ms</span>
              </div>
            </div>
            <div className="text-[8px] text-success border-t border-white/5 pt-1">
              ✓ 100% MAKER POST-ONLY REBATES
            </div>
          </div>
        );

      case "strategies":
        return (
          <div className="w-full h-32 p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex justify-between text-text-muted">
              <span>ALPHA ALLOCATION</span>
              <span className="text-white font-bold">3 ACTIVE</span>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center justify-between">
                <span className="text-accent">Alpha-V2 (Trend)</span>
                <span className="text-white font-bold">45% NAV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">MeanRev (IV)</span>
                <span className="text-white font-bold">35% NAV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-400">Spread Arb</span>
                <span className="text-white font-bold">20% NAV</span>
              </div>
            </div>
            <span className="text-[8px] text-text-muted">Dynamic capital re-weighting enabled</span>
          </div>
        );

      case "health":
        return (
          <div className="w-full h-32 p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex justify-between items-center text-text-muted">
              <span>RUNTIME OBSERVER</span>
              <span className="flex items-center gap-1 text-success font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                HEALTHY
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div className="p-1.5 rounded bg-white/5">
                <span className="text-text-muted">Memory</span>
                <div className="text-white font-bold">78.4 MB</div>
              </div>
              <div className="p-1.5 rounded bg-white/5">
                <span className="text-text-muted">Loop Lag</span>
                <div className="text-accent font-bold">0.8 ms</div>
              </div>
            </div>
            <div className="text-[8px] text-text-muted truncate">
              UPTIME: 14D 08H 19M • RECONNECTS: 0
            </div>
          </div>
        );

      case "control":
        return (
          <div className="w-full h-32 p-3 bg-warning/5 rounded-lg border border-warning/20 flex flex-col justify-between font-mono text-[10px]">
            <div className="flex justify-between text-warning font-bold">
              <span>EMERGENCY CONTROL BUS</span>
              <span>HMAC READY</span>
            </div>
            <button
              onClick={() => setKillPressed(!killPressed)}
              className={cn(
                "py-2 rounded font-bold uppercase transition-all text-xs flex items-center justify-center gap-1.5",
                killPressed
                  ? "bg-danger text-white animate-pulse"
                  : "bg-danger/20 text-danger border border-danger/40 hover:bg-danger/30"
              )}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{killPressed ? "KILL-SWITCH ARMED" : "TEST KILL-SWITCH"}</span>
            </button>
            <span className="text-[8px] text-text-muted text-center">
              {killPressed ? "Click again to disarm test state" : "Simulated action • No real orders"}
            </span>
          </div>
        );

      case "mobile":
        return (
          <div className="w-full h-32 p-2 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center font-mono">
            {/* Mini Smartphone Frame */}
            <div className="w-24 h-28 rounded-lg border-2 border-white/20 bg-surface p-1 flex flex-col justify-between text-[6px]">
              <div className="w-4 h-0.5 rounded-full bg-white/30 mx-auto" />
              <div className="p-0.5 rounded bg-accent/20 text-accent font-bold text-center">
                $24,821
              </div>
              <div className="space-y-0.5">
                <div className="w-full h-1 bg-white/10 rounded" />
                <div className="w-3/4 h-1 bg-white/10 rounded" />
              </div>
              <div className="w-6 h-0.5 rounded-full bg-white/20 mx-auto" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="features" className="relative py-28 border-b border-white/10 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            TECHNICAL ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            ENGINEERED FOR TELEMETRY. <br />
            <span className="text-text-muted">EVERY METRIC AT MICROSECOND FIDELITY.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            Algorb decouples the visual telemetry interface from your trading logic, delivering instant responsiveness without bogging down your execution event loop.
          </p>
        </div>

        {/* 8-Card Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.id] || Zap;
            const isControlOnly = feature.category === "CONTROL";

            return (
              <div
                key={feature.id}
                className={cn(
                  "rounded-xl bg-surface/90 border p-5 flex flex-col justify-between transition-all duration-200 hover:border-accent/40 group hover:shadow-lg",
                  isControlOnly ? "border-warning/30 hover:border-warning" : "border-white/10"
                )}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        isControlOnly
                          ? "bg-warning/10 text-warning"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={cn(
                        "px-1.5 py-0.5 text-[9px] font-mono font-bold rounded uppercase",
                        isControlOnly
                          ? "bg-warning/10 text-warning border border-warning/30"
                          : "bg-white/5 text-text-muted border border-white/10"
                      )}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white font-sans group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-text-secondary font-sans leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                {/* Embedded Mini Demonstration Widget */}
                <div className="mt-5 pt-3 border-t border-white/5">
                  {renderMiniDemo(feature)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
