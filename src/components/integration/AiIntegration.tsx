"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StratDeskSymbol } from "@/components/ui/Logo";
import { Bot, Sparkles, Check, Copy, Terminal, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

const SUPPORTED_AIS = [
  "Cursor (.cursorrules)",
  "Claude Code (CLAUDE.md)",
  "Windsurf (.windsurfrules)",
  "GitHub Copilot (.github)",
  "OpenAI Codex",
  "Google Antigravity",
  "Open Code / Aider",
  "ChatGPT / DeepSeek",
];

export const AiIntegration: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = `Here is my trading bot codebase and the StratDesk integration rules (STRATDESK_SPEC.md / .cursorrules).
Please mould the dashboard for my bot:
1. Map my balance, active positions, and order execution fills to the 6 metric cards and /api/ledger.
2. Wire the dashboard's EMERGENCY_HALT kill-switch to my order cancel and position flatten methods.
3. Generate a non-invasive drop-in bridge adapter so my bot's execution speed is never slowed down.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <section className="relative py-28 border-b border-border bg-background overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="accent" size="sm" className="mb-3">
            UNIVERSAL AI AUTO-MOULDING ENGINE
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            CONNECT IT WITH ANY AI. <br />
            <span className="text-text-muted">MOULDS TO YOUR BOT WITHOUT BREAKING THE HUD.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            StratDesk Pro includes native rules for every major AI coding assistant.
            Prompt Cursor, Claude Code, Windsurf, Copilot, Codex, Antigravity, or ChatGPT to connect your bot:
            the AI reads the rules, preserves the institutional dark aesthetic, moulds the metric cards to your assets, and generates a drop-in bridge adapter.
          </p>
        </div>

        {/* Supported AI Tools Pill Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-10 font-mono text-[11px]">
          {SUPPORTED_AIS.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full bg-surface border border-border text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-sm"
            >
              <Cpu className="w-3 h-3 text-accent" />
              <span>{tool}</span>
            </span>
          ))}
        </div>

        {/* Interactive Simulated AI Terminal */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface border border-border overflow-hidden shadow-2xl font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-background-secondary border-b border-border text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
              <span className="ml-2 text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                UNIVERSAL AGENT EXECUTION
              </span>
            </div>
            <span className="text-[10px] text-text-muted hidden sm:inline">
              RULES: .CURSORRULES • CLAUDE.MD • STRATDESK_SPEC.MD
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* User Prompt Bubble */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-border">
              <div className="p-2 rounded bg-accent/10 text-accent font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-1">
                  <span className="font-bold text-slate-900 dark:text-white uppercase">USER PROMPT</span>
                  <span>CURSOR / CLAUDE / WINDSURF / COPILOT / ANTIGRAVITY / CODEX</span>
                </div>
                <p className="text-slate-900 dark:text-white text-sm font-sans font-medium">
                  &quot;Connect my trading bot to this StratDesk dashboard. Mould the metrics to my strategy, wire the emergency kill switch, and generate my bridge adapter.&quot;
                </p>
              </div>
            </div>

            {/* AI Agent Resolution Stream */}
            <div data-terminal="true" className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 dark:bg-black/60 border border-slate-800 dark:border-accent/20 text-white">
              <div className="p-2 rounded bg-accent/20 text-accent font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-accent mb-2">
                  <span className="font-bold uppercase">AI AGENT EXECUTION PROTOCOL</span>
                  <span className="text-success font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    RULES VERIFIED
                  </span>
                </div>

                <div className="space-y-1.5 text-text-secondary text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Loaded universal rules: enforced 100% dark mode & monospace HUD layout invariants</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Profiled bot: detected Python CCXT async engine (`bot_main.py`, Binance Futures)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Moulded 6 metric cards: Equity, ATR Trailing Stop, Slippage bps, Realized R:R, Margin, IPC Heartbeat</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Moulded market pairs to user&apos;s assets: `SOL/USDC` & `BTC/USDT`</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Auto-wired `EMERGENCY_HALT` kill-switch with HMAC-SHA256 signature verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Generated non-invasive drop-in bridge: `stratdesk_bridge.py` (&lt;0.4ms async IPC)</span>
                  </div>
                </div>

                {/* Final Handshake Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-success font-bold">
                    <StratDeskSymbol size={20} />
                    <span>STRATDESK PRO MOULDED & CONNECTED</span>
                  </div>
                  <span className="text-[10px] text-text-muted">Local Loopback: 0.4ms</span>
                </div>
              </div>
            </div>

            {/* Prompt Template Helper */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                  READY-TO-PASTE UNIVERSAL AGENT PROMPT
                </span>
                <p className="text-xs text-text-secondary mt-0.5">
                  Copy this prompt directly into Cursor, Claude Code, Windsurf, Copilot, or ChatGPT.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPrompt}
                icon={copiedPrompt ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedPrompt ? "PROMPT COPIED" : "COPY PROMPT"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
