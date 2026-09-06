"use client";

import React, { useState, useEffect } from "react";
import { ArchitectureBlueprint } from "@/data/architectures-data";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ShieldAlert,
  Zap,
  Activity,
  Cpu,
  Terminal,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface KillerWidgetSimulatorProps {
  blueprint: ArchitectureBlueprint;
  isLight?: boolean;
}

export const KillerWidgetSimulator: React.FC<KillerWidgetSimulatorProps> = ({
  blueprint,
  isLight = false,
}) => {
  const simType = blueprint.killerWidget.simulationType;

  switch (simType) {
    case "drawdown-halo":
      return <PropFirmHaloSimulator isLight={isLight} />;
    case "spread-heatmap":
      return <ArbitrageMatrixSimulator isLight={isLight} />;
    case "zscore-reversion":
      return <ZScoreReversionSimulator isLight={isLight} />;
    case "mempool-sniper":
      return <MempoolSniperSimulator isLight={isLight} />;
    case "raw-cli":
      return <CliTerminalSimulator isLight={isLight} />;
    case "cro-redline":
      return <CroRedLineSimulator isLight={isLight} />;
    case "options-greeks":
      return <OptionsGreeksSimulator isLight={isLight} />;
    default:
      return <DefaultArchetypeSimulator blueprint={blueprint} isLight={isLight} />;
  }
};

// ==============================================================================
// 1. Prop-Firm Daily Drawdown Halo Simulator
// ==============================================================================
function PropFirmHaloSimulator({ isLight = false }: { isLight?: boolean }) {
  const [dailyPnl, setDailyPnl] = useState<number>(-1850);
  const dailyLimit = -5000;
  const hardKillThreshold = -4500; // 10% before limit

  const bufferRemaining = dailyPnl - dailyLimit;
  const bufferPercent = Math.max(0, Math.min(100, (bufferRemaining / Math.abs(dailyLimit)) * 100));
  const isBreached = dailyPnl <= dailyLimit;
  const isHardKillActive = dailyPnl <= hardKillThreshold;

  // Circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (bufferPercent / 100) * circumference;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className={cn("w-4 h-4", isHardKillActive ? "text-danger animate-pulse" : "text-warning")} />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            DAILY DRAWDOWN HALO // HARD LOCKOUT
          </span>
        </div>
        <span
          className={cn(
            "px-2 py-0.5 text-[9px] font-bold rounded border uppercase",
            isHardKillActive
              ? "bg-danger/20 text-danger border-danger/40 animate-pulse"
              : isLight
              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
              : "bg-success/10 text-success border-success/30"
          )}
        >
          {isHardKillActive ? "AUTO-KILL ARMED" : "SAFE ZONE"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Halo Visualizer */}
        <div className="flex flex-col items-center justify-center relative py-2">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background track */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              fill="transparent"
              className={isLight ? "text-slate-200" : "text-white/10"}
            />
            {/* Dynamic Halo Stroke */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className={cn(
                "transition-all duration-300",
                bufferPercent < 20
                  ? "text-danger"
                  : bufferPercent < 50
                  ? "text-warning"
                  : isLight
                  ? "text-sky-600"
                  : "text-accent"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-text-muted">Cushion</span>
            <span
              className={cn(
                "text-base font-bold",
                bufferPercent < 20 ? "text-danger" : isLight ? "text-slate-900" : "text-white"
              )}
            >
              ${Math.max(0, bufferRemaining).toFixed(0)}
            </span>
            <span className="text-[9px] text-text-muted">{bufferPercent.toFixed(0)}% Left</span>
          </div>
        </div>

        {/* Status Breakdown & Live Slider */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-[11px]">
            <span className={isLight ? "text-slate-500" : "text-text-muted"}>Current Day P&L:</span>
            <span className={cn("font-bold", dailyPnl >= 0 ? "text-success" : "text-danger")}>
              {dailyPnl >= 0 ? "+" : ""}${dailyPnl.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className={isLight ? "text-slate-500" : "text-text-muted"}>Daily Breach Limit:</span>
            <span className="font-bold text-danger">${dailyLimit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className={isLight ? "text-slate-500" : "text-text-muted"}>Auto-Kill Lockout at:</span>
            <span className="font-bold text-warning">${hardKillThreshold.toFixed(2)} (1% cushion)</span>
          </div>

          {/* Interactive Simulation Slider */}
          <div className="pt-2">
            <div className="flex justify-between text-[10px] text-text-muted pb-1">
              <span>Simulate Drawdown:</span>
              <span className="font-mono text-accent font-bold">${dailyPnl}</span>
            </div>
            <input
              type="range"
              min="-5200"
              max="2000"
              step="50"
              value={dailyPnl}
              onChange={(e) => setDailyPnl(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/10 accent-accent"
            />
          </div>
        </div>
      </div>

      {isHardKillActive && (
        <div className="p-2 rounded border border-danger/40 bg-danger/10 text-danger text-[10px] flex items-center gap-2 animate-pulse">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span>CIRCUIT BREAKER ENGAGED: Terminal locked. All pending bracket orders cancelled.</span>
        </div>
      )}
    </div>
  );
}

// ==============================================================================
// 2. Crypto Arbitrage & Cross-Exchange Matrix Simulator
// ==============================================================================
function ArbitrageMatrixSimulator({ isLight = false }: { isLight?: boolean }) {
  const [spreadBps, setSpreadBps] = useState(14.2);
  const [binancePing, setBinancePing] = useState(1.1);
  const [bybitPing, setBybitPing] = useState(1.4);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleSimulateArb = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setSpreadBps(Number((Math.random() * 12 + 6).toFixed(1)));
      setBinancePing(Number((Math.random() * 0.8 + 0.9).toFixed(1)));
      setBybitPing(Number((Math.random() * 0.9 + 1.1).toFixed(1)));
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            CROSS-EXCHANGE BASIS HEATMAP (BTC-PERP)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-success animate-ping" />
          <span className="text-success font-bold">LIVE SYNC</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Venue A: Binance */}
        <div className={cn("p-3 rounded-lg border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <div className="flex justify-between items-center pb-1">
            <span className="font-bold text-xs text-amber-400">BINANCE FUT</span>
            <span className="text-[10px] text-text-muted">{binancePing}ms</span>
          </div>
          <div className="text-sm font-bold text-emerald-400">$63,248.50</div>
          <span className="text-[10px] text-text-muted">Best Ask: 14.80 BTC</span>
        </div>

        {/* Venue B: Bybit */}
        <div className={cn("p-3 rounded-lg border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <div className="flex justify-between items-center pb-1">
            <span className="font-bold text-xs text-sky-400">BYBIT PERP</span>
            <span className="text-[10px] text-text-muted">{bybitPing}ms</span>
          </div>
          <div className="text-sm font-bold text-emerald-400">$63,257.50</div>
          <span className="text-[10px] text-text-muted">Best Bid: 18.20 BTC</span>
        </div>
      </div>

      {/* Disparity & Action Bar */}
      <div className="p-2.5 rounded-lg border border-accent/30 bg-accent/5 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-text-muted uppercase">Gross Spread Delta</span>
          <div className="text-base font-bold text-accent">+{spreadBps} bps (+${(spreadBps * 6.32).toFixed(2)})</div>
        </div>

        <button
          onClick={handleSimulateArb}
          disabled={isExecuting}
          className="px-3 py-1.5 rounded bg-accent text-black font-bold text-[10px] uppercase hover:bg-accent/80 transition-all flex items-center gap-1.5"
        >
          {isExecuting ? <Zap className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
          <span>{isExecuting ? "FILLING..." : "FIRE ATOMIC ARB"}</span>
        </button>
      </div>
    </div>
  );
}

// ==============================================================================
// 3. Statistical Arbitrage Z-Score Reversion Simulator
// ==============================================================================
function ZScoreReversionSimulator({ isLight = false }: { isLight?: boolean }) {
  const [zScore, setZScore] = useState(2.45);
  const halfLife = "32 mins";

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            STAT-ARB SPREAD REVERSION: BTC vs ETH
          </span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent/10 text-accent border border-accent/30">
          HALF-LIFE: {halfLife}
        </span>
      </div>

      {/* Visual Z-Score Deviation Ladder */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-text-muted text-[11px]">Current Z-Deviation:</span>
          <span className="font-bold text-sm text-warning">{zScore.toFixed(2)}σ</span>
        </div>

        {/* Z-Score Bar */}
        <div className="relative h-6 rounded bg-black/40 border border-white/10 overflow-hidden flex items-center px-2">
          {/* Zero Mean Marker */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/40" />
          {/* 2.0σ Thresholds */}
          <div className="absolute left-[15%] top-0 bottom-0 w-px border-r border-dashed border-danger/60" />
          <div className="absolute left-[85%] top-0 bottom-0 w-px border-r border-dashed border-success/60" />

          {/* Current Pin */}
          <div
            className="absolute h-4 w-4 rounded-full bg-accent -ml-2 shadow-lg shadow-accent/50 transition-all duration-300"
            style={{ left: `${Math.min(95, Math.max(5, 50 + (zScore / 4) * 50))}%` }}
          />
        </div>

        <div className="flex justify-between text-[9px] text-text-muted">
          <span>-2.0σ (Short Spread)</span>
          <span>0.0σ (Mean)</span>
          <span>+2.0σ (Long Spread Entry)</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="-3.5"
          max="3.5"
          step="0.05"
          value={zScore}
          onChange={(e) => setZScore(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-white/10 accent-accent"
        />
        <button
          onClick={() => setZScore(0.1)}
          className="p-1 rounded text-[10px] text-text-muted hover:text-white"
          title="Reset to mean"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ==============================================================================
// 4. On-Chain DEX Mempool Sniper Simulator
// ==============================================================================
function MempoolSniperSimulator({ isLight = false }: { isLight?: boolean }) {
  const [priorityFee, setPriorityFee] = useState(45);
  const [logs, setLogs] = useState<string[]>([
    "Block #28941094: Raydium AMM liquidity pool detected (SOL/USDC)",
    "Contract Audit: Bytecode verified. Honeypot check: PASSED (0% tax)",
    "Mempool pending: Front-run queue depth 4 txs @ 38 Gwei",
    "Priority Fee 45 Gwei set: Top-of-block positioning secured.",
  ]);

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            SOLANA / EVM MEMPOOL SNIPER
          </span>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-success/10 text-success border border-success/30">
          HONEYPOT SHIELD: ACTIVE
        </span>
      </div>

      {/* Streaming Terminal Log */}
      <div className="p-2.5 rounded bg-black/60 border border-white/10 text-[10px] space-y-1 text-slate-300 font-mono h-24 overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="leading-tight">
            <span className="text-emerald-400">&gt;</span> {log}
          </div>
        ))}
      </div>

      {/* Slippage & Priority Sliders */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[11px] text-text-muted">Priority Gas: {priorityFee} Gwei</span>
        <input
          type="range"
          min="10"
          max="120"
          value={priorityFee}
          onChange={(e) => setPriorityFee(Number(e.target.value))}
          className="w-32 h-1.5 rounded-lg appearance-none cursor-pointer bg-white/10 accent-emerald-400"
        />
      </div>
    </div>
  );
}

// ==============================================================================
// 5. Raw Developer CLI Terminal Simulator
// ==============================================================================
function CliTerminalSimulator({ isLight = false }: { isLight?: boolean }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "algorb-daemon v2.4.1 (x86_64-linux)",
    "Type '/help', '/status', '/pnl', or '/kill_bot' to test IPC commands.",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim().toLowerCase();
    let response = "";

    if (cmd === "/status") {
      response = "Status: RUNNING | IPC Latency: 1.1ms | Uptime: 48h 12m | Active: BTC-PERP";
    } else if (cmd === "/pnl") {
      response = "Realized PnL: +$18,429.50 (24.8% ROE) | Open: +$482.10 | Sharpe: 2.84";
    } else if (cmd === "/kill_bot" || cmd === "/kill") {
      response = "[ALERT] EMERGENCY KILL DISPATCHED: Positions flattened. HMAC token signed.";
    } else if (cmd === "/help") {
      response = "Available: /status, /pnl, /kill_bot, /clear, /ping";
    } else if (cmd === "/clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      response = `Command not recognized: '${cmd}'. Type /help for list.`;
    }

    setHistory((prev) => [...prev, `> ${inputVal}`, response]);
    setInputVal("");
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-2.5 transition-colors select-none",
        isLight ? "bg-slate-900 text-emerald-400 border-slate-700" : "bg-black/90 text-emerald-400 border-white/15"
      )}
    >
      <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[10px]">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold uppercase tracking-wider">TTY // ALGORB COMMAND INTERPRETER</span>
        </div>
        <span className="text-text-muted">IPC: 127.0.0.1:9042</span>
      </div>

      <div className="p-2 rounded bg-black/70 border border-white/5 h-28 overflow-y-auto text-[10px] space-y-1 font-mono">
        {history.map((line, idx) => (
          <div key={idx} className={line.startsWith(">") ? "text-amber-300 font-bold" : "text-emerald-400"}>
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <span className="text-emerald-400 text-xs font-bold">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type /status, /pnl, or /kill_bot..."
          className="flex-1 bg-transparent border-b border-emerald-500/40 text-white text-xs outline-none focus:border-emerald-400 font-mono py-0.5"
        />
      </form>
    </div>
  );
}

// ==============================================================================
// 6. CRO Red Line Emergency Slide Simulator
// ==============================================================================
function CroRedLineSimulator({ isLight = false }: { isLight?: boolean }) {
  const [slideVal, setSlideVal] = useState(0);
  const [isFlattened, setIsFlattened] = useState(false);

  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setSlideVal(v);
    if (v >= 95) {
      setIsFlattened(true);
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger animate-pulse" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            CHIEF RISK OFFICER (CRO) // RED LINE CONTROL
          </span>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-danger/10 text-danger border border-danger/30">
          99% VaR: $4,820
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className={cn("p-2.5 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <span className="text-[10px] text-text-muted">Gross Leverage</span>
          <div className="text-sm font-bold text-warning">4.2x (Cap: 5.0x)</div>
        </div>
        <div className={cn("p-2.5 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <span className="text-[10px] text-text-muted">Total Capital At Stake</span>
          <div className="text-sm font-bold text-white">$142,800.00</div>
        </div>
      </div>

      {/* Slide to Flatten Mechanism */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-[10px] text-danger font-bold">
          <span>SLIDE TO RESTART / FLATTEN ALL INSTANCES:</span>
          <span>{slideVal}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={slideVal}
          disabled={isFlattened}
          onChange={handleSlideChange}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-danger/20 accent-danger"
        />
      </div>

      {isFlattened && (
        <div className="p-2 rounded bg-danger/20 border border-danger text-danger text-[10px] font-bold text-center">
          ✓ FLATTEN SENT: 4 BOTS HALTED • ALL OPEN CONTRACTS SQUARED.
        </div>
      )}
    </div>
  );
}

// ==============================================================================
// 7. Options Greeks Simulator
// ==============================================================================
function OptionsGreeksSimulator({ isLight = false }: { isLight?: boolean }) {
  const [delta, setDelta] = useState(0.12);
  const [gamma, setGamma] = useState(0.045);
  const [theta, setTheta] = useState(-184.2);

  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            OPTIONS GREEKS PORTFOLIO COCKPIT
          </span>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-accent/10 text-accent border border-accent/30">
          DELTA-NEUTRAL
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <span className="text-[10px] text-text-muted">Net Delta (Δ)</span>
          <div className="font-bold text-sm text-emerald-400">+{delta.toFixed(2)}</div>
        </div>
        <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <span className="text-[10px] text-text-muted">Gamma (Γ)</span>
          <div className="font-bold text-sm text-sky-400">+{gamma.toFixed(3)}</div>
        </div>
        <div className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}>
          <span className="text-[10px] text-text-muted">Theta (Θ) / day</span>
          <div className="font-bold text-sm text-amber-400">${theta.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}

// ==============================================================================
// 8. Default Architectural Blueprint Preview
// ==============================================================================
function DefaultArchetypeSimulator({
  blueprint,
  isLight = false,
}: {
  blueprint: ArchitectureBlueprint;
  isLight?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border font-mono flex flex-col gap-3.5 transition-colors select-none",
        isLight ? "bg-white border-slate-200" : "bg-surface-elevated/70 border-white/10"
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-accent" />
          <span className={cn("font-bold text-xs uppercase", isLight ? "text-slate-900" : "text-white")}>
            {blueprint.killerWidget.name}
          </span>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-accent/10 text-accent border border-accent/30 uppercase">
          {blueprint.killerWidget.badge}
        </span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        {blueprint.killerWidget.description}
      </p>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {blueprint.specs.keyMetrics.slice(0, 4).map((metric, idx) => (
          <div
            key={idx}
            className={cn("p-2 rounded border", isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5")}
          >
            <span className="text-[9px] text-text-muted uppercase">Telemetry Channel</span>
            <div className="font-bold text-white truncate">{metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
