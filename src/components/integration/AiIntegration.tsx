"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AlgorbSymbol } from "@/components/ui/Logo";
import { Bot, Sparkles, Check, Copy, Terminal, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const AiIntegration: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = `Here is my trading bot repository and the Algorb telemetry specification (ALGORB_SPEC.md).
Please connect the Algorb adapter:
1. Map my account equity and margin state to emit_telemetry()
2. Hook into my order execution callback to dispatch emit_fill()
3. Run the local adapter on ws://127.0.0.1:9042`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <section className="relative py-28 border-b border-white/10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="accent" size="sm" className="mb-3">
            ACCELERATED DEVELOPER ONBOARDING
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            CONNECT IT WITH YOUR AI. <br />
            <span className="text-text-muted">DESIGNED FOR AGENTIC CODE EDITORS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Algorb includes clean, machine-readable integration specifications (`ALGORB_SPEC.md`).
            Feed the specification to Claude, Cursor, Copilot, or ChatGPT to generate your custom bot adapter in seconds.
          </p>
        </div>

        {/* Interactive Simulated AI Terminal */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface border border-white/15 overflow-hidden shadow-2xl font-mono text-xs">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-background-secondary border-b border-white/10 text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
              <span className="ml-2 text-white font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                AI-ASSISTED INTEGRATION WORKFLOW
              </span>
            </div>
            <span className="text-[10px] text-text-muted hidden sm:inline">
              SPEC: ALGORB_SPEC.MD
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* User Prompt Bubble */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="p-2 rounded bg-accent/10 text-accent font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-1">
                  <span className="font-bold text-white uppercase">USER PROMPT</span>
                  <span>cursor / claude / codex</span>
                </div>
                <p className="text-white text-sm font-sans">
                  &quot;Connect my Python trading bot to this Algorb dashboard using the provided specification.&quot;
                </p>
              </div>
            </div>

            {/* AI Agent Resolution Stream */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-black/60 border border-accent/20">
              <div className="p-2 rounded bg-accent/20 text-accent font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-accent mb-2">
                  <span className="font-bold uppercase">AI AGENT EXECUTION</span>
                  <span className="text-success font-bold">SPEC VERIFIED</span>
                </div>

                <div className="space-y-1.5 text-text-secondary text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">Analyzing Algorb integration specification...</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Detected Python project (`bot_main.py`, `ccxt` exchange loop)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Mapped account equity and balance endpoint</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Mapped open positions array & liquidation distance</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Bound execution order fill hooks to `emit_fill()`</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span>Generated `algorb_adapter.py` wrapper</span>
                  </div>
                </div>

                {/* Final Handshake Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-success font-bold">
                    <AlgorbSymbol size={20} />
                    <span>ALGORB CONNECTED (IPC 127.0.0.1:9042)</span>
                  </div>
                  <span className="text-[10px] text-text-muted">Handshake: 0.4ms</span>
                </div>
              </div>
            </div>

            {/* Prompt Template Helper */}
            <div className="p-4 rounded-xl bg-surface-elevated border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                  READY-TO-PASTE AGENT PROMPT
                </span>
                <p className="text-xs text-text-secondary mt-0.5">
                  Copy this prompt directly into your AI editor alongside the included `ALGORB_SPEC.md`.
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
