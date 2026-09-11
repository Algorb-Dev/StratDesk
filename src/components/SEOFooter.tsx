import React from "react";

export function SEOFooter() {
  return (
    <footer
      aria-label="StratDesk Pro Technical Overview and Architecture Reference"
      className="w-full mt-20 border-t border-white/10 bg-[#07090e] text-slate-400 py-16 px-4 sm:px-6 lg:px-8 font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Section Header */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-mono uppercase tracking-wider text-slate-200">
            StratDesk Pro — Next.js Quantitative Trading Workstation &amp; Telemetry HUD
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-4xl">
            StratDesk Pro is an institutional-grade, self-hosted quantitative trading workstation and Heads-Up Display (HUD) engineered with the Next.js App Router. Designed specifically for retail algorithmic traders, prop firm participants, and quantitative system architects, StratDesk bridges high-speed algorithmic execution runtimes with real-time browser telemetry, risk circuit breakers, and forensic trade auditing.
          </p>
        </div>

        {/* 3 Core Topic Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cluster 1: Algorithmic & Quantitative Trading UI */}
          <div className="space-y-3 p-6 rounded-xl bg-surface/40 border border-white/5">
            <h3 className="text-base font-semibold font-mono uppercase tracking-wide text-slate-100">
              Algorithmic &amp; Quantitative Trading UI
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Equipped with turnkey CCXT adapters and a sub-millisecond local Python backend bridge, StratDesk delivers real-time order monitoring, streaming execution fills, unrealized PnL telemetry, and dynamic risk radar gauges. Traded assets across Binance, Bybit, Coinbase, OKX, and decentralized venues pipe fills directly into an automated forensic trade journal with cryptographic HMAC-SHA256 signature verification.
            </p>
          </div>

          {/* Cluster 2: Built for AI-Native & Vibe Coders */}
          <div className="space-y-3 p-6 rounded-xl bg-surface/40 border border-white/5">
            <h3 className="text-base font-semibold font-mono uppercase tracking-wide text-slate-100">
              Built for AI-Native &amp; Vibe Coders
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Engineered from the ground up for prompt-driven development. With universal directives in <code className="text-accent bg-accent/10 px-1 py-0.5 rounded text-xs font-mono">STRATDESK_SPEC.md</code>, <code className="text-accent bg-accent/10 px-1 py-0.5 rounded text-xs font-mono">.cursorrules</code>, and <code className="text-accent bg-accent/10 px-1 py-0.5 rounded text-xs font-mono">.windsurfrules</code>, AI coding assistants like Cursor, Windsurf, Claude Code, and Copilot automatically mould the 6 metric cards, auto-wire the emergency kill-switch, and configure bot execution parameters without manual boilerplate.
            </p>
          </div>

          {/* Cluster 3: Next.js App Router Architecture */}
          <div className="space-y-3 p-6 rounded-xl bg-surface/40 border border-white/5">
            <h3 className="text-base font-semibold font-mono uppercase tracking-wide text-slate-100">
              Next.js App Router Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Leveraging Next.js App Router server-side rendering (SSR) for crawlability and lightning-fast initial load times, paired with modular client-side telemetry components styled in Tailwind CSS. Supports 6 institutional color themes, 20 specialized bot blueprints (HFT, FTMO, DEX Sniper, CRO Risk Sentinel), and isolated state stores for high-frequency data streaming without UI freeze.
            </p>
          </div>
        </div>

        {/* Stack Requirements and Specs */}
        <div className="pt-8 border-t border-white/5 space-y-4">
          <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-slate-300">
            System Stack &amp; Runtime Requirements
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-slate-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>Node.js 18+ (LTS) &amp; Next.js 14 App Router</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>Python 3.10+ with CCXT &amp; WebSockets</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>React 18 &amp; Tailwind CSS Component HUD</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>Local Loopback IPC &lt; 0.8ms Latency</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
