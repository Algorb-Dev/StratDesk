"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Terminal,
  Cpu,
  Shield,
  Server,
  Layers,
  Sparkles,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavGroup {
  category: string;
  items: {
    id: string;
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    isExternal?: boolean;
  }[];
}

const DOCS_NAV: NavGroup[] = [
  {
    category: "GETTING STARTED",
    items: [
      { id: "quickstart", title: "Quick Start Guide", href: "/docs", icon: Zap },
      { id: "architecture", title: "Architecture & Pipeline", href: "/docs#architecture", icon: Cpu },
      { id: "ingestion-api", title: "Trade Ingestion API", href: "/docs#ingestion-api", icon: Terminal, badge: "POST" },
    ],
  },
  {
    category: "BOT ADAPTER SDKs",
    items: [
      { id: "python-ccxt", title: "Python (CCXT Pro)", href: "/docs#python-sdk", icon: Terminal, badge: "PRO" },
      { id: "python-aiohttp", title: "Python (aiohttp)", href: "/docs#python-aiohttp", icon: Terminal },
      { id: "nodejs-sdk", title: "Node.js (TypeScript)", href: "/docs#nodejs-sdk", icon: Terminal },
    ],
  },
  {
    category: "ARCHETYPE ADAPTERS",
    items: [
      { id: "archetypes-overview", title: "Archetype SDK Overview", href: "/docs/archetypes", icon: Layers, badge: "NEW" },
      { id: "prop-firm-halo", title: "Prop-Firm Halo Payload", href: "/docs/archetypes#prop-firm", icon: Shield },
      { id: "crypto-arbitrage", title: "Crypto Arbitrage Matrix", href: "/docs/archetypes#crypto-arbitrage", icon: Zap },
      { id: "stat-arb", title: "Stat-Arb Z-Score", href: "/docs/archetypes#stat-arb", icon: Sparkles },
    ],
  },
  {
    category: "PROTOCOLS & DEPLOYMENT",
    items: [
      { id: "websocket-protocol", title: "WebSocket Schemas", href: "/docs#websocket-protocol", icon: Terminal },
      { id: "control-bus", title: "Control Bus & HMAC Auth", href: "/docs#control-bus", icon: Shield },
      { id: "deployment", title: "Docker & Self-Hosting", href: "/docs#deployment", icon: Server },
    ],
  },
];

export const DocsSidebar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6 flex items-center justify-between p-3.5 rounded-xl bg-surface/90 dark:bg-surface/80 border border-border font-mono text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-accent" />
          <span className="font-bold text-slate-900 dark:text-white uppercase">DOCUMENTATION INDEX</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </div>

      {/* Desktop & Mobile Drawer Sidebar */}
      <aside
        className={cn(
          "bg-surface/95 dark:bg-surface/90 rounded-2xl border border-border p-4 font-mono text-xs backdrop-blur-xl shadow-md dark:shadow-2xl transition-all",
          "lg:sticky lg:top-28 lg:block",
          mobileMenuOpen ? "block mb-8" : "hidden lg:block"
        )}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-slate-900 dark:text-white font-bold tracking-wider uppercase text-[11px]">
              STRATDESK SPEC
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-white/5 border border-border text-sky-700 dark:text-accent">
            v1.0.4
          </span>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6">
          {DOCS_NAV.map((group) => (
            <div key={group.category} className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 dark:text-text-muted uppercase tracking-wider px-2 block">
                {group.category}
              </span>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === pathname ||
                    (item.href !== "/docs" && pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "w-full px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 transition-all group",
                        isActive
                          ? "bg-sky-50 dark:bg-accent/15 text-sky-800 dark:text-accent font-bold border border-sky-300 dark:border-accent/30 shadow-sm"
                          : "text-slate-600 dark:text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 shrink-0 transition-colors",
                            isActive ? "text-sky-600 dark:text-accent" : "text-slate-400 dark:text-text-muted group-hover:text-sky-600 dark:group-hover:text-accent"
                          )}
                        />
                        <span className="truncate text-[11px]">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <span
                            className={cn(
                              "px-1.5 py-0.2 text-[8px] font-bold rounded uppercase",
                              isActive
                                ? "bg-accent text-slate-950 font-bold"
                                : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-text-muted group-hover:text-slate-900 dark:group-hover:text-white border border-border"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={cn(
                            "w-3 h-3 transition-transform",
                            isActive
                              ? "text-sky-600 dark:text-accent translate-x-0.5"
                              : "text-slate-400 dark:text-text-muted/40 group-hover:text-slate-600 dark:group-hover:text-text-muted"
                          )}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links Footer in Sidebar */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <Link
            href="/architectures"
            className="w-full px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-[11px] flex items-center justify-between transition-colors border border-border"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-accent" />
              <span>20 Bot Blueprints</span>
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400 dark:text-text-muted" />
          </Link>

          <Link
            href="/#dashboard-lab"
            className="w-full px-3 py-2 rounded-lg border border-sky-300 dark:border-accent/30 hover:bg-sky-50 dark:hover:bg-accent/10 text-sky-700 dark:text-accent font-bold text-[11px] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Launch Dashboard Lab</span>
            </span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  );
};
