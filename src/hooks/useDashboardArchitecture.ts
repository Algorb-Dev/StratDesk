"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ARCHITECTURES_DATA,
  ARCHITECTURE_CATEGORIES,
  ArchitectureBlueprint,
} from "@/data/architectures-data";

export const ARCHITECTURE_STORAGE_KEY = "stratdesk_active_architecture";
export const ARCHITECTURE_STORAGE_KEY_LEGACY = "algorb_active_architecture";
export const DEFAULT_ARCHITECTURE = "default";
const DASHBOARD_ARCHITECTURE_CHANGE_EVENT = "stratdesk_dashboard_architecture_change";
const DASHBOARD_ARCHITECTURE_CHANGE_EVENT_LEGACY = "algorb_dashboard_architecture_change";

export const ARCHETYPE_ALIAS_MAP: Record<string, string> = {
  "prop-firm": "prop-firm-evaluator-console",
  "crypto-arbitrage": "crypto-arbitrage-matrix",
  "stat-arb": "pair-trading-statarb-console",
  "dex-sniper": "on-chain-dex-sniper",
  "raw-cli": "raw-developer-terminal-cli",
  "cro-redline": "chief-risk-officer-red-line",
  "options-cockpit": "options-volatility-surface",
};

export function resolveCanonicalArchetypeId(id: string): string {
  return ARCHETYPE_ALIAS_MAP[id] || id;
}

/**
 * Custom hook to read and write active dashboard architecture / archetype state
 * with localStorage persistence, deep-linking URL parameter synchronization,
 * and SSR hydration safety.
 */
export function useDashboardArchitecture(initialFallback: string = DEFAULT_ARCHITECTURE) {
  const [architecture, setArchitectureState] = useState<string>(initialFallback);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    let resolvedId = initialFallback;

    // 1. Check URL query params for ?archetype= to maintain deep-linking
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlArchetype = params.get("archetype");
        if (urlArchetype && urlArchetype.trim() !== "") {
          resolvedId = urlArchetype.trim();
        } else {
          // 2. Fall back to localStorage if no URL parameter is present
          const stored =
            localStorage.getItem(ARCHITECTURE_STORAGE_KEY) ||
            localStorage.getItem(ARCHITECTURE_STORAGE_KEY_LEGACY);
          if (stored && stored.trim() !== "") {
            resolvedId = stored.trim();
          }
        }
      } catch {
        // Ignore read errors
      }
    }

    setArchitectureState(resolvedId);

    // Synchronize across components in the same window
    const handleCustomArchChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setArchitectureState(customEvent.detail);
      }
    };

    // Synchronize across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (
        (e.key === ARCHITECTURE_STORAGE_KEY || e.key === ARCHITECTURE_STORAGE_KEY_LEGACY) &&
        e.newValue
      ) {
        setArchitectureState(e.newValue);
      }
    };

    window.addEventListener(DASHBOARD_ARCHITECTURE_CHANGE_EVENT, handleCustomArchChange);
    window.addEventListener(DASHBOARD_ARCHITECTURE_CHANGE_EVENT_LEGACY, handleCustomArchChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(DASHBOARD_ARCHITECTURE_CHANGE_EVENT, handleCustomArchChange);
      window.removeEventListener(DASHBOARD_ARCHITECTURE_CHANGE_EVENT_LEGACY, handleCustomArchChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [initialFallback]);

  const setArchitecture = useCallback((newId: string) => {
    const trimmedId = newId.trim();
    if (!trimmedId) return;

    setArchitectureState(trimmedId);

    try {
      localStorage.setItem(ARCHITECTURE_STORAGE_KEY, trimmedId);
    } catch {
      // Ignore write errors in restricted environments
    }

    if (typeof window !== "undefined") {
      // Dispatch custom event for cross-component sync
      window.dispatchEvent(
        new CustomEvent<string>(DASHBOARD_ARCHITECTURE_CHANGE_EVENT, { detail: trimmedId })
      );

      // Update URL query param to preserve deep-linking without hard reload
      try {
        const url = new URL(window.location.href);
        if (trimmedId && trimmedId !== DEFAULT_ARCHITECTURE) {
          url.searchParams.set("archetype", trimmedId);
        } else {
          url.searchParams.delete("archetype");
        }
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Ignore URL state errors
      }
    }
  }, []);

  const canonicalId = resolveCanonicalArchetypeId(architecture);
  const activeBlueprint: ArchitectureBlueprint | undefined =
    architecture === DEFAULT_ARCHITECTURE
      ? undefined
      : ARCHITECTURES_DATA.find(
          (b) => b.id === canonicalId || b.id === architecture
        );

  return {
    architecture,
    setArchitecture,
    mounted,
    canonicalId,
    activeBlueprint,
    architectures: ARCHITECTURES_DATA,
    categories: ARCHITECTURE_CATEGORIES,
  };
}
