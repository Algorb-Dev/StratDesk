"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardArchitecture } from "@/hooks/useDashboardArchitecture";
import { ARCHITECTURES_DATA } from "@/data/architectures-data";
import {
  Palette,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Layers,
  Cpu,
  FlaskConical,
  Sparkles,
  Activity,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DashboardLabProps {
  mode?: "workstation" | "launcher";
}

const ARCHETYPE_ALIAS_MAP: Record<string, string> = {
  "prop-firm": "prop-firm-evaluator-console",
  "crypto-arbitrage": "crypto-arbitrage-matrix",
  "stat-arb": "pair-trading-statarb-console",
  "dex-sniper": "on-chain-dex-sniper",
  "raw-cli": "raw-developer-terminal-cli",
  "cro-redline": "chief-risk-officer-red-line",
  "options-cockpit": "options-volatility-surface",
};

const INTERACTIVE_SIMULATOR_IDS = new Set([
  "prop-firm-evaluator-console",
  "crypto-arbitrage-matrix",
  "pair-trading-statarb-console",
  "on-chain-dex-sniper",
  "raw-developer-terminal-cli",
  "chief-risk-officer-red-line",
  "options-volatility-surface",
]);

const VALID_THEMES = ["terminal", "obsidian", "quant", "command", "vector", "light"] as const;
type ValidTheme = (typeof VALID_THEMES)[number];

function DashboardLabContent() {
  const searchParams = useSearchParams();
  const { theme: persistedTheme, setTheme } = useTheme();
  const { setArchitecture: setPersistedArchitecture } = useDashboardArchitecture();

  const initialArchetype = searchParams.get("archetype") || "default";
  const initialThemeParam = searchParams.get("theme");
  const initialTheme: ValidTheme =
    initialThemeParam && (VALID_THEMES as readonly string[]).includes(initialThemeParam)
      ? (initialThemeParam as ValidTheme)
      : (persistedTheme as ValidTheme) || "obsidian";

  const [selectedTheme, setSelectedTheme] = useState<ValidTheme>(initialTheme);
  const [selectedArchetype, setSelectedArchetype] = useState<string>(initialArchetype);

  // Sync state if URL query params change (e.g. from deep-link navigation) or custom architecture change
  useEffect(() => {
    const archetypeParam = searchParams.get("archetype");
    if (archetypeParam) {
      setSelectedArchetype(archetypeParam);
    }
    const themeParam = searchParams.get("theme");
    if (themeParam && (VALID_THEMES as readonly string[]).includes(themeParam)) {
      setSelectedTheme(themeParam as ValidTheme);
    }

    const handleCustomArchChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedArchetype(customEvent.detail);
      }
    };
    window.addEventListener("stratdesk_dashboard_architecture_change", handleCustomArchChange);
    window.addEventListener("algorb_dashboard_architecture_change", handleCustomArchChange);
    return () => {
      window.removeEventListener("stratdesk_dashboard_architecture_change", handleCustomArchChange);
      window.removeEventListener("algorb_dashboard_architecture_change", handleCustomArchChange);
    };
  }, [searchParams]);

  const updateUrl = (theme: string, archetype: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (theme) params.set("theme", theme);
    if (archetype && archetype !== "default") {
      params.set("archetype", archetype);
    } else {
      params.delete("archetype");
    }
    const hash = window.location.hash || "#dashboard-lab";
    const newUrl = `${window.location.pathname}?${params.toString()}${hash}`;
    window.history.replaceState(null, "", newUrl);
  };

  const handleArchetypeSelect = (id: string) => {
    setSelectedArchetype(id);
    setPersistedArchitecture(id);
    updateUrl(selectedTheme, id);
  };

  const handleThemeSelect = (theme: ValidTheme) => {
    setSelectedTheme(theme);
    setTheme(theme);
    updateUrl(theme, selectedArchetype);
  };

  const canonicalArchetypeId = ARCHETYPE_ALIAS_MAP[selectedArchetype] || selectedArchetype;
  const activeBlueprint = ARCHITECTURES_DATA.find(
    (b) => b.id === canonicalArchetypeId || b.id === selectedArchetype
  );
  const isDefault = !selectedArchetype || selectedArchetype === "default";

  return (
    <section id="dashboard-lab" className="relative py-28 border-b border-white/10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            INTERACTIVE WORKSTATION
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            DASHBOARD LAB. <br />
            <span className="text-text-muted">EXPERIENCE THE RUNTIME BEFORE YOU BUY.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Test drive all 20 specialized bot archetypes and 6 color themes interactively. Switch between live monitoring telemetry and active command bus in real time.
          </p>
        </div>

        {/* Lab HUD Instructions & Operating Guide */}
        <div className="max-w-5xl mx-auto mb-8 p-4 sm:p-6 rounded-2xl bg-surface border border-border backdrop-blur-xl shadow-2xl font-mono text-xs flex flex-col gap-5">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                <Terminal className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm">
                    LIVE SIMULATOR WORKSTATION
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-text-muted mt-0.5">
                  Controls are mounted directly in the HUD header chrome below.
                </p>
              </div>
            </div>

            {/* Active Tier Indicator */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-background p-1.5 px-3 rounded-lg border border-border">
              <span className="text-[10px] text-slate-500 dark:text-text-muted uppercase font-semibold">
                ACTIVE EDITION:
              </span>
              <span className="px-2.5 py-0.5 rounded font-mono font-bold uppercase text-[11px] bg-warning/15 text-amber-600 dark:text-warning border border-warning/30">
                STRATDESK PRO (COMMAND CENTER)
              </span>
            </div>
          </div>

          {/* 3 Step Instruction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Instruction 1 */}
            <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-background/60 border border-border flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent">
                <Layers className="w-4 h-4" />
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  1. Hot-Swap 20 Blueprints
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-text-secondary leading-relaxed">
                Click the <strong className="text-slate-900 dark:text-white">ARCHITECTURE</strong> dropdown in the top header chrome of the preview below to switch between all 20 specialized bot HUDs.
              </p>
            </div>

            {/* Instruction 2 */}
            <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-background/60 border border-border flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent">
                <Palette className="w-4 h-4" />
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  2. Switch 6 Color Themes
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-text-secondary leading-relaxed">
                Use the <strong className="text-slate-900 dark:text-white">THEME</strong> dropdown to toggle Terminal CRT, Obsidian, Quant, Command Amber, Vector, or Light modes on the fly.
              </p>
            </div>

            {/* Instruction 3 */}
            <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-background/60 border border-border flex flex-col gap-2">
              <div className="flex items-center gap-2 text-warning">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  3. Test Interactive Controls
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-text-secondary leading-relaxed">
                In <strong className="text-slate-900 dark:text-white">StratDesk Pro</strong>, test the emergency kill-switch, runtime pauses, or click <strong className="text-slate-900 dark:text-white">AUDIT TRADE LEDGER</strong> to inspect forensic trade journal telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* Live Configured Dashboard Mockup */}
        <div className="max-w-6xl mx-auto">
          <DashboardPreview
            product="pro"
            theme={selectedTheme}
            onThemeChange={(th) => setSelectedTheme(th as ValidTheme)}
            archetypeId={selectedArchetype}
            onArchitectureChange={(id) => handleArchetypeSelect(id)}
            variant="full"
            className="border-border"
          />
        </div>

        {/* Action Callout below Lab */}
        <div className="mt-10 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface border border-border font-mono text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-success shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                {!isDefault && activeBlueprint
                  ? `Ready to deploy Blueprint #${activeBlueprint.number} (${activeBlueprint.title})?`
                  : "Ready to deploy with your trading bot?"}
              </span>
              <span className="text-text-muted">
                {!isDefault && activeBlueprint
                  ? `Optimized for StratDesk Pro • Self-hosted perpetual license • Full source code`
                  : "Self-hosted perpetual license • No telemetry tracking • Full source code"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              href="/docs"
              variant="outline"
              size="md"
            >
              VIEW PRO SPECS
            </Button>
            <Button
              href={PRODUCTS.pro.whopCheckoutUrl}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET STRATDESK PRO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const TOP_ARCHETYPES = [
  { id: "crypto-arbitrage-matrix", name: "Crypto Arbitrage Matrix", icon: "⚡", tag: "SUB-MS" },
  { id: "prop-firm-evaluator-console", name: "Prop Firm Evaluator (FTMO)", icon: "🛡️", tag: "HALO-LOCK" },
  { id: "on-chain-dex-sniper", name: "On-Chain DEX Sniper", icon: "🎯", tag: "MEMPOOL" },
  { id: "chief-risk-officer-red-line", name: "CRO Red-Line Risk Sentinel", icon: "🚨", tag: "KILL-SWITCH" },
  { id: "options-volatility-surface", name: "Options Volatility Surface", icon: "📈", tag: "GREEKS" },
  { id: "pair-trading-statarb-console", name: "Pair Trading Stat-Arb", icon: "⚖️", tag: "Z-SCORE" },
  { id: "raw-developer-terminal-cli", name: "Raw Developer Terminal CLI", icon: "💻", tag: "HEADLESS" },
  { id: "multi-exchange-fleet-router", name: "Multi-Exchange Fleet Router", icon: "🌐", tag: "POOLED" },
];

function DashboardLabLauncher() {
  return (
    <section id="dashboard-lab" className="relative py-28 border-b border-border bg-background-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="accent" size="sm" className="mb-3">
            INTERACTIVE SANDBOX WORKSTATION
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            DASHBOARD LAB. <br />
            <span className="text-text-muted">TEST DRIVE ALL 20 ARCHETYPES LIVE.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
            Launch our dedicated full-screen sandbox workstation to test all 20 specialized bot blueprints, 6 visual themes, real-time widget simulators, and cryptographic command bus overrides before you deploy.
          </p>
        </div>

        {/* Workstation Cockpit Launchpad Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden font-mono">
          {/* Top IDE/Workstation Chrome Bar */}
          <div className="p-3.5 sm:p-4 bg-surface-elevated/70 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                DASHBOARD LAB // FULL-SCREEN SIMULATION RUNTIME
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-border">
                20 PRESETS READY
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-border">
                IPC &lt; 0.8ms
              </span>
            </div>
          </div>

          {/* Central Action Launch Hero */}
          <div className="p-6 sm:p-12 text-center flex flex-col items-center justify-center gap-6">
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent inline-flex">
              <FlaskConical className="w-10 h-10" />
            </div>

            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
                Ready to Experience the Complete Workstation?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
                Open the dedicated Dashboard Lab in a full-screen workspace to toggle live order flow, simulate exchange latency, test the emergency kill-switch, and inspect forensic trade journals without leaving this page.
              </p>
            </div>

            {/* Main Launch Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <Button
                href="/lab"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-base font-extrabold shadow-glow-cyan px-8 py-4"
                icon={<ArrowUpRight className="w-5 h-5" />}
                iconPosition="right"
                glow={true}
              >
                LAUNCH DASHBOARD LAB IN NEW TAB
              </Button>
            </div>

            <p className="text-[11px] text-text-muted">
              Opens in an isolated tab with all 20 blueprints unlocked • No signup or credit card required
            </p>

            {/* Quick-Launch Presets Grid */}
            <div className="w-full pt-8 border-t border-border mt-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-4 text-center">
                OR DEEP-LINK DIRECTLY INTO A SPECIALIZED ARCHETYPE (OPENS IN NEW TAB):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-left">
                {TOP_ARCHETYPES.map((arch) => (
                  <a
                    key={arch.id}
                    href={`/lab?archetype=${arch.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-elevated/40 border border-border hover:border-accent/40 hover:bg-surface-elevated transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{arch.icon}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors truncate">
                        {arch.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent shrink-0 ml-1 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Reassurance & Checkout Strip */}
          <div className="p-4 sm:p-5 bg-surface-elevated/30 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-success shrink-0" />
              <span className="text-text-muted">
                Self-hosted perpetual license • Full unminified source code • 100% Private & Offline
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button href="/docs" variant="outline" size="sm">
                VIEW SPECS
              </Button>
              <Button
                href={PRODUCTS.pro.whopCheckoutUrl}
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                target="_blank"
                rel="noopener noreferrer"
              >
                GET STRATDESK PRO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardLabSkeleton() {
  return (
    <section id="dashboard-lab" className="relative py-28 border-b border-white/10 bg-background overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-white/10 rounded mx-auto" />
          <div className="h-10 w-96 bg-white/10 rounded mx-auto" />
          <div className="h-96 max-w-6xl bg-white/5 rounded-xl mx-auto border border-white/10" />
        </div>
      </div>
    </section>
  );
}

export const DashboardLab: React.FC<DashboardLabProps> = ({ mode = "workstation" }) => {
  if (mode === "launcher") {
    return <DashboardLabLauncher />;
  }
  return (
    <Suspense fallback={<DashboardLabSkeleton />}>
      <DashboardLabContent />
    </Suspense>
  );
};
