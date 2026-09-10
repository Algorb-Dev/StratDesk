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
  FileSpreadsheet,
  Keyboard,
  Network,
  Bell,
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
    csvexport: FileSpreadsheet,
    shortcuts: Keyboard,
    multibot: Network,
    alerts: Bell,
  };

  const renderMiniDemo = (item: FeatureItem) => {
    switch (item.interactiveDemoType) {
      case "equity":
        return (
          <div data-terminal="true" className="w-full h-32 p-3 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white">
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
          <div data-terminal="true" className="w-full h-32 p-3 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white">
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
          <div data-terminal="true" className="w-full h-32 p-2.5 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-around font-mono text-[10px] overflow-hidden text-white">
            <div className="flex items-center justify-between p-1.5 rounded bg-white/5 min-w-0 gap-1.5">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span className="px-1 text-[8px] bg-success/20 text-success rounded font-bold shrink-0">L</span>
                <span className="text-white font-bold truncate">BTC-PERP 5x</span>
              </div>
              <span className="text-success font-bold shrink-0 whitespace-nowrap text-[9px] sm:text-[10px]">+$569.92 (+1.07%)</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-white/5 min-w-0 gap-1.5">
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <span className="px-1 text-[8px] bg-danger/20 text-danger rounded font-bold shrink-0">S</span>
                <span className="text-white font-bold truncate">SOL-PERP 2x</span>
              </div>
              <span className="text-success font-bold shrink-0 whitespace-nowrap text-[9px] sm:text-[10px]">+$100.80 (+1.55%)</span>
            </div>
          </div>
        );

      case "execution":
        return (
          <div data-terminal="true" className="w-full h-32 p-3 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-[10px] text-white">
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
          <div data-terminal="true" className="w-full h-32 p-3 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-[10px] text-white">
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
          <div data-terminal="true" className="w-full h-32 p-3 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-[10px] text-white">
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
          <div data-terminal="true" className="w-full h-32 p-2 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex items-center justify-center font-mono text-white">
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

      case "csvexport":
        return (
          <div data-terminal="true" className="w-full h-32 p-2.5 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white text-[10px]">
            <div className="flex justify-between items-center text-[9px] text-text-muted">
              <span>LEDGER EXPORT</span>
              <span className="text-success font-bold">SHA-256 OK</span>
            </div>
            <div className="p-1.5 rounded bg-white/5 border border-white/5 space-y-1 text-[9px]">
              <div className="flex justify-between text-text-muted">
                <span>File:</span>
                <span className="text-white font-bold">fills_2026_q3.csv</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Records:</span>
                <span className="text-accent font-bold">142 Trades (R: +3.2)</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[8px] text-success border-t border-white/5 pt-1">
              <span>✓ WATERMARK VERIFIED</span>
              <span className="text-text-muted">RFC-4180</span>
            </div>
          </div>
        );

      case "shortcuts":
        return (
          <div data-terminal="true" className="w-full h-32 p-2.5 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white text-[10px]">
            <div className="flex justify-between text-[9px] text-text-muted">
              <span>KEYBOARD HOTKEYS</span>
              <span className="text-accent font-bold">&lt;1ms DISPATCH</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 py-1 text-[9px]">
              <div className="p-1 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-warning font-bold">[Shift+X]</span>
                <span className="text-text-muted text-[8px]">Flatten</span>
              </div>
              <div className="p-1 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-accent font-bold">[Space]</span>
                <span className="text-text-muted text-[8px]">Pause</span>
              </div>
              <div className="p-1 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-sky-400 font-bold">[Ctrl+K]</span>
                <span className="text-text-muted text-[8px]">Search</span>
              </div>
              <div className="p-1 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-emerald-400 font-bold">[1 - 6]</span>
                <span className="text-text-muted text-[8px]">Themes</span>
              </div>
            </div>
            <span className="text-[8px] text-text-muted text-center">Hardware debounced • Zero latency</span>
          </div>
        );

      case "multibot":
        return (
          <div data-terminal="true" className="w-full h-32 p-2.5 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white text-[10px]">
            <div className="flex justify-between text-[9px] text-text-muted">
              <span>POOLED TOPOLOGY</span>
              <span className="text-success font-bold">3/3 SYNCED</span>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-white/5">
                <span className="text-accent font-bold">NODE_01 (Binance MM)</span>
                <span className="text-success font-mono text-[8px]">0.9ms</span>
              </div>
              <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-white/5">
                <span className="text-emerald-400 font-bold">NODE_02 (Sol Sniper)</span>
                <span className="text-success font-mono text-[8px]">1.2ms</span>
              </div>
              <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-white/5">
                <span className="text-amber-400 font-bold">NODE_03 (Bybit Arb)</span>
                <span className="text-success font-mono text-[8px]">1.1ms</span>
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-text-muted border-t border-white/5 pt-0.5">
              <span>COMBINED VaR: $1,420</span>
              <span className="text-white font-bold">LEVERAGE: 2.8x</span>
            </div>
          </div>
        );

      case "alerts":
        return (
          <div data-terminal="true" className="w-full h-32 p-2.5 bg-slate-950 dark:bg-black/40 rounded-lg border border-slate-800 dark:border-white/5 flex flex-col justify-between font-mono text-white text-[10px]">
            <div className="flex justify-between text-[9px] text-text-muted">
              <span>RISK RADAR SURVEILLANCE</span>
              <span className="text-warning font-bold animate-pulse">ARMED</span>
            </div>
            <div className="p-2 rounded bg-warning/10 border border-warning/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning animate-ping" />
              <div className="text-[9px] text-warning font-bold">
                ALERT: DD BUFFER REACHED (4.2%)
              </div>
            </div>
            <div className="flex items-center justify-between text-[8px] text-text-muted border-t border-white/5 pt-1">
              <span>WEBHOOK: TELEGRAM + DISCORD</span>
              <span className="text-success font-bold">ACK OK</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="features" className="relative py-28 border-b border-border bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            TECHNICAL ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            ENGINEERED FOR TELEMETRY. <br />
            <span className="text-text-muted">EVERY METRIC AT MICROSECOND FIDELITY.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            StratDesk decouples the visual telemetry interface from your trading logic, delivering instant responsiveness without bogging down your execution event loop.
          </p>
        </div>

        {/* 12-Card Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.id] || Zap;
            const isControlOnly = feature.category === "CONTROL";

            return (
              <div
                key={feature.id}
                className={cn(
                  "rounded-xl bg-surface border p-5 flex flex-col justify-between transition-all duration-200 hover:border-accent/40 group hover:shadow-lg shadow-sm",
                  isControlOnly ? "border-warning/40 hover:border-warning" : "border-border"
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
                          : "bg-slate-100 dark:bg-white/5 text-text-muted border border-border"
                      )}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-text-secondary font-sans leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                {/* Embedded Mini Demonstration Widget */}
                <div className="mt-5 pt-3 border-t border-border">
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
