import React from "react";
import Link from "next/link";
import { CodeTabs } from "@/components/docs/CodeTabs";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Cpu,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Architecture Flow Hero Card */}
      <section id="architecture" className="p-6 sm:p-8 rounded-2xl bg-surface/90 dark:bg-surface/70 border border-border backdrop-blur-md space-y-6 shadow-sm dark:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-sky-700 dark:text-accent uppercase tracking-wider block mb-1">
              DATA TOPOLOGY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
              StratDesk Pipeline Architecture
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
            LOCAL IPC • ZERO TELEMETRY TRACKING
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
          StratDesk does not manage your private exchange keys or execute trades on remote cloud servers. Your bot remains fully autonomous on your hardware. It simply pushes fill records and telemetry to the local StratDesk dashboard via standard HTTP REST.
        </p>

        {/* 3-Step Visual Topology Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Step 1: Your Bot */}
          <div className="p-4 rounded-xl border border-border bg-slate-50/90 dark:bg-black/30 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-accent/20 text-sky-800 dark:text-accent uppercase">
                STEP 01
              </span>
              <Cpu className="w-4 h-4 text-sky-600 dark:text-accent" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">Your Trading Bot</div>
              <p className="text-xs text-slate-500 dark:text-text-muted font-sans leading-relaxed">
                Python (CCXT), Node.js, Rust, or Go strategy loop executing orders on Binance, Bybit, or DEXs.
              </p>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-text-muted border-t border-border pt-2 font-mono">
              Fills order → Formats payload
            </div>
          </div>

          {/* Step 2: StratDesk Ingestion */}
          <div className="p-4 rounded-xl border border-sky-300 dark:border-accent/40 bg-sky-50/70 dark:bg-accent/5 flex flex-col justify-between gap-3 shadow-sm dark:shadow-glow-cyan/10">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-accent text-slate-950 font-black uppercase">
                STEP 02
              </span>
              <Terminal className="w-4 h-4 text-sky-600 dark:text-accent" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">StratDesk API Ingestion</div>
              <p className="text-xs text-slate-600 dark:text-text-muted font-sans leading-relaxed">
                Next.js App Router endpoint at <code className="text-sky-700 dark:text-accent bg-slate-200/80 dark:bg-black/40 px-1 py-0.5 rounded font-bold">POST /api/ledger</code> validates and stores execution data.
              </p>
            </div>
            <div className="text-[10px] text-sky-700 dark:text-accent border-t border-sky-200 dark:border-accent/20 pt-2 font-mono font-bold">
              HTTP/JSON Ingestion • &lt; 2ms latency
            </div>
          </div>

          {/* Step 3: React Dashboard */}
          <div className="p-4 rounded-xl border border-border bg-slate-50/90 dark:bg-black/30 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white uppercase">
                STEP 03
              </span>
              <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">StratDesk React Dashboard</div>
              <p className="text-xs text-slate-500 dark:text-text-muted font-sans leading-relaxed">
                Renders real-time telemetry, trade journal, R-multiples, and interactive control HUD.
              </p>
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 border-t border-border pt-2 font-mono font-semibold">
              Interactive HUD & Trade Ledger
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Start Guide */}
      <section id="quickstart" className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-sky-700 dark:text-accent uppercase tracking-wider block mb-1">
            STEP-BY-STEP INTEGRATION
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
            Quick Start: Connect Your Bot in 4 Steps
          </h2>
          <p className="text-sm text-slate-600 dark:text-text-secondary font-sans mt-2 leading-relaxed">
            Follow this guide to transmit audited execution telemetry from your trading script to the local StratDesk dashboard in under five minutes.
          </p>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-surface/90 dark:bg-surface/50 border border-border space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-accent/20 text-sky-800 dark:text-accent font-bold text-[10px] flex items-center justify-center">
                1
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Start Your Local StratDesk Dashboard</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              Make sure your StratDesk dashboard instance is running locally on port 3000:
            </p>
            <CodeBlock
              code="npm run dev
# Dashboard available at http://localhost:3000
# Ingestion endpoint active at http://localhost:3000/api/ledger"
              language="bash"
              filename="Terminal (StratDesk Root)"
              showLineNumbers={false}
            />
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-surface/90 dark:bg-surface/50 border border-border space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-accent/20 text-sky-800 dark:text-accent font-bold text-[10px] flex items-center justify-center">
                2
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Install Python Client Dependencies</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              Install the required asynchronous networking and exchange libraries in your bot&apos;s virtual environment:
            </p>
            <CodeBlock
              code="pip install ccxt aiohttp pydantic"
              language="bash"
              filename="Terminal (Bot Environment)"
              showLineNumbers={false}
            />
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-surface/90 dark:bg-surface/50 border border-border space-y-4 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-accent/20 text-sky-800 dark:text-accent font-bold text-[10px] flex items-center justify-center">
                3
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Embed the Bot Adapter Boilerplate</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              Choose your preferred runtime below and drop this boilerplate into your trading loop:
            </p>

            {/* Embedded CodeTabs Widget */}
            <div id="python-sdk">
              <CodeTabs />
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-surface/90 dark:bg-surface/50 border border-border space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-bold text-[10px] flex items-center justify-center">
                4
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Verify Ingestion in Real Time</span>
            </div>
            <p className="text-slate-600 dark:text-text-secondary font-sans text-xs">
              When your script executes a trade, StratDesk returns HTTP 201 with the recorded execution ID. Open your dashboard in your browser to inspect the live trade journal, R-multiples, and forensic telemetry.
            </p>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>API Endpoint: <strong className="text-slate-900 dark:text-white">POST http://localhost:3000/api/ledger</strong></span>
              </div>
              <span className="font-bold">STATUS 201 CREATED</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Archetype SDK Callout Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-surface/90 dark:bg-gradient-to-r dark:from-surface dark:to-surface-elevated border border-sky-300 dark:border-accent/30 font-mono space-y-4 relative overflow-hidden shadow-sm dark:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600 dark:text-accent" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Archetype-Specific SDK Adapters</h3>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-sky-100 dark:bg-accent/20 text-sky-800 dark:text-accent uppercase">
            SPECIALIZED PAYLOADS
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
          Running a Prop-Firm challenge on FTMO, a cross-exchange crypto latency arbitrageur, or a pair-trading stat-arb bot? Inspect the specialized payload schemas for your exact archetype.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href="/docs/archetypes#prop-firm"
            className="p-3 rounded-lg border border-border bg-slate-50/80 dark:bg-black/20 hover:border-sky-400 dark:hover:border-accent hover:bg-sky-50/50 dark:hover:bg-white/5 transition-all text-xs"
          >
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Prop-Firm Halo</span>
            <span className="text-[10px] text-slate-500 dark:text-text-muted">currentDrawdown & dailyLimit telemetry</span>
          </Link>
          <Link
            href="/docs/archetypes#crypto-arbitrage"
            className="p-3 rounded-lg border border-border bg-slate-50/80 dark:bg-black/20 hover:border-sky-400 dark:hover:border-accent hover:bg-sky-50/50 dark:hover:bg-white/5 transition-all text-xs"
          >
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Crypto Arbitrage</span>
            <span className="text-[10px] text-slate-500 dark:text-text-muted">binancePing & bybitPing microseconds</span>
          </Link>
          <Link
            href="/docs/archetypes#stat-arb"
            className="p-3 rounded-lg border border-border bg-slate-50/80 dark:bg-black/20 hover:border-sky-400 dark:hover:border-accent hover:bg-sky-50/50 dark:hover:bg-white/5 transition-all text-xs"
          >
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Stat-Arb Z-Score</span>
            <span className="text-[10px] text-slate-500 dark:text-text-muted">Live 2.0σ divergence & half-life</span>
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/docs/archetypes"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-accent hover:underline uppercase"
          >
            <span>View All Archetype Payload Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. TradeLedgerEntry Schema Contract */}
      <section id="ingestion-api" className="space-y-4">
        <div>
          <span className="text-[10px] font-bold text-sky-700 dark:text-accent uppercase tracking-wider block mb-1">
            DATA CONTRACT
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">
            TradeLedgerEntry Schema Specification
          </h2>
          <p className="text-sm text-slate-600 dark:text-text-secondary font-sans mt-1">
            The JSON payload accepted by <code className="text-sky-700 dark:text-accent font-bold">POST /api/ledger</code> matches the exact TypeScript interface used across StratDesk Pro.
          </p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden font-mono text-xs shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-white/5 border-b border-border text-[10px] text-slate-600 dark:text-text-muted uppercase font-bold">
                  <th className="p-3">Field</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Required</th>
                  <th className="p-3">Description & Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-slate-600 dark:text-text-secondary bg-surface/90 dark:bg-transparent">
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-sky-700 dark:text-accent">id / ticket</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">string</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Unique execution ID or exchange ticket (e.g. <code className="text-slate-900 dark:text-white font-bold">TRD-2026-0907-143</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-sky-700 dark:text-accent">direction</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">&quot;LONG&quot; | &quot;SHORT&quot;</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Order side executed on the exchange.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-sky-700 dark:text-accent">entryPrice</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-medium">number</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Average fill price at order entry (e.g. <code className="text-slate-900 dark:text-white font-bold">67420.50</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-sky-700 dark:text-accent">exitPrice</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-medium">number</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Average fill price at order exit (e.g. <code className="text-slate-900 dark:text-white font-bold">68120.00</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-sky-700 dark:text-accent">pnl</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-medium">number</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes</td>
                  <td className="p-3">Realized profit or loss in USD (positive for win, negative for loss).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">size</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">string</td>
                  <td className="p-3 text-slate-500 dark:text-text-muted">Optional</td>
                  <td className="p-3">Position size with asset denomination (e.g. <code className="text-slate-900 dark:text-white font-bold">1.50 BTC</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">symbol</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">string</td>
                  <td className="p-3 text-slate-500 dark:text-text-muted">Optional</td>
                  <td className="p-3">Market symbol (e.g. <code className="text-slate-900 dark:text-white font-bold">BTC-PERP</code>). Defaults to BTC-PERP.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">strategy</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">string</td>
                  <td className="p-3 text-slate-500 dark:text-text-muted">Optional</td>
                  <td className="p-3">Executing algorithmic strategy (e.g. <code className="text-slate-900 dark:text-white font-bold">Mean Reversion Alpha</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">zScore</td>
                  <td className="p-3 text-amber-700 dark:text-amber-300 font-medium">number</td>
                  <td className="p-3 text-slate-500 dark:text-text-muted">Optional</td>
                  <td className="p-3">Normalized statistical divergence score (e.g. <code className="text-slate-900 dark:text-white font-bold">2.45</code>).</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">telemetry</td>
                  <td className="p-3 text-purple-700 dark:text-purple-300 font-medium">object</td>
                  <td className="p-3 text-slate-500 dark:text-text-muted">Optional</td>
                  <td className="p-3">Forensic execution object with <code className="text-slate-900 dark:text-white font-bold">executionLatencyMs</code>, <code className="text-slate-900 dark:text-white font-bold">signalConfidence</code>, and <code className="text-slate-900 dark:text-white font-bold">bookDepthRatio</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Control Bus & Bidirectional Emergency Kill-Switch */}
      <section id="control-bus" className="p-6 sm:p-8 rounded-2xl bg-surface/90 dark:bg-surface/60 border border-border space-y-4 font-mono text-xs shadow-sm dark:shadow-none">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-600 dark:text-warning" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            StratDesk Pro: Bidirectional Command Bus & HMAC
          </h3>
        </div>

        <p className="text-slate-600 dark:text-text-secondary font-sans leading-relaxed">
          For users running <strong className="text-slate-900 dark:text-white">StratDesk Pro</strong>, the dashboard can send execution instructions back to your bot (e.g. Emergency Kill-Switch, Flatten All Positions, Pause Alpha). Actions dispatched from the UI are cryptographically signed using HMAC-SHA256:
        </p>

        <CodeBlock
          code={`# Verifying inbound command signatures inside your bot:
import hmac
import hashlib

def verify_stratdesk_command(payload_bytes: bytes, received_signature: str, secret_key: str) -> bool:
    computed = hmac.new(secret_key.encode(), payload_bytes, hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, received_signature)`}
          language="python"
          filename="security_guard.py"
          badge="HMAC-SHA256"
        />
      </section>
    </div>
  );
}
