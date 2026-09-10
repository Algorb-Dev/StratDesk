"use client";

import { useState, useEffect, useCallback } from "react";
import { THEMES, ThemeDefinition } from "@/data/themes";

export type ThemeId = "terminal" | "obsidian" | "quant" | "command" | "vector" | "light";

export const THEME_IDS: ThemeId[] = [
  "terminal",
  "obsidian",
  "quant",
  "command",
  "vector",
  "light",
];

export const THEME_STORAGE_KEY = "stratdesk_dashboard_theme";
export const THEME_STORAGE_KEY_LEGACY = "algorb_dashboard_theme";
export const DEFAULT_THEME: ThemeId = "terminal";

const DASHBOARD_THEME_CHANGE_EVENT = "stratdesk_dashboard_theme_change";
const DASHBOARD_THEME_CHANGE_EVENT_LEGACY = "algorb_dashboard_theme_change";

/**
 * Custom hook to read and write active bot dashboard theme state
 * ("terminal" | "obsidian" | "quant" | "command" | "vector" | "light")
 * with localStorage persistence.
 *
 * Scoped exclusively to the dashboard HUD / Dashboard Lab preview.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    let initialTheme = DEFAULT_THEME;
    try {
      const stored = (localStorage.getItem(THEME_STORAGE_KEY) ||
        localStorage.getItem(THEME_STORAGE_KEY_LEGACY)) as ThemeId | null;
      if (stored && THEME_IDS.includes(stored)) {
        initialTheme = stored;
      }
    } catch {
      // Ignore local storage read errors
    }

    setThemeState(initialTheme);

    // Synchronize across components in the same window
    const handleCustomThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeId>;
      if (customEvent.detail && THEME_IDS.includes(customEvent.detail)) {
        setThemeState(customEvent.detail);
      }
    };

    // Synchronize across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (
        (e.key === THEME_STORAGE_KEY || e.key === THEME_STORAGE_KEY_LEGACY) &&
        e.newValue
      ) {
        const nextTheme = e.newValue as ThemeId;
        if (THEME_IDS.includes(nextTheme)) {
          setThemeState(nextTheme);
        }
      }
    };

    window.addEventListener(DASHBOARD_THEME_CHANGE_EVENT, handleCustomThemeChange);
    window.addEventListener(DASHBOARD_THEME_CHANGE_EVENT_LEGACY, handleCustomThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(DASHBOARD_THEME_CHANGE_EVENT, handleCustomThemeChange);
      window.removeEventListener(DASHBOARD_THEME_CHANGE_EVENT_LEGACY, handleCustomThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = useCallback((newTheme: ThemeId) => {
    if (!THEME_IDS.includes(newTheme)) return;

    setThemeState(newTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore write errors in restricted environments
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent<ThemeId>(DASHBOARD_THEME_CHANGE_EVENT, { detail: newTheme })
      );
      window.dispatchEvent(
        new CustomEvent<ThemeId>(DASHBOARD_THEME_CHANGE_EVENT_LEGACY, { detail: newTheme })
      );
    }
  }, []);

  const activeTheme: ThemeDefinition =
    THEMES.find((t) => t.id === theme) || THEMES[0];

  return {
    theme,
    setTheme,
    mounted,
    themes: THEMES,
    activeTheme,
  };
}
