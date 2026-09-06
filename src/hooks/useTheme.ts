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

export const THEME_STORAGE_KEY = "algorb_active_theme";
export const DEFAULT_THEME: ThemeId = "terminal";

const THEME_CHANGE_EVENT = "algorb_theme_change";

/**
 * Dynamically injects theme class and updates CSS custom properties
 * on both the root document element and body.
 */
export function applyThemeToDom(themeId: ThemeId): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const body = document.body;

  // Remove existing theme classes
  THEME_IDS.forEach((id) => {
    root.classList.remove(`theme-${id}`);
    body.classList.remove(`theme-${id}`);
  });

  // Inject current theme class
  root.classList.add(`theme-${themeId}`);
  body.classList.add(`theme-${themeId}`);

  // Sync Tailwind dark / light class
  if (themeId === "light") {
    root.classList.remove("dark");
    body.classList.remove("dark");
  } else {
    root.classList.add("dark");
    body.classList.add("dark");
  }

  // Update theme color variables directly for instant CSS mapping
  const themeDef = THEMES.find((t) => t.id === themeId);
  if (themeDef) {
    const properties: Record<string, string> = {
      "--bg-primary": themeDef.colors.bg,
      "--surface": themeDef.colors.surface,
      "--border-color": themeDef.colors.border,
      "--accent-color": themeDef.colors.accent,
      "--accent-glow": themeDef.colors.accentGlow,
      "--text-primary": themeDef.colors.text,
      "--text-muted": themeDef.colors.muted,
      "--theme-bg": themeDef.colors.bg,
      "--theme-surface": themeDef.colors.surface,
      "--theme-border": themeDef.colors.border,
      "--theme-accent": themeDef.colors.accent,
      "--theme-text": themeDef.colors.text,
      "--theme-muted": themeDef.colors.muted,
    };

    Object.entries(properties).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
}

/**
 * Custom hook to read and write active theme state with localStorage persistence.
 * Safe from Next.js SSR hydration mismatches using a mounted state flag.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState<boolean>(false);

  // Client-side hydration and storage sync
  useEffect(() => {
    setMounted(true);

    let initialTheme = DEFAULT_THEME;
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
      if (stored && THEME_IDS.includes(stored)) {
        initialTheme = stored;
      }
    } catch {
      // Ignore local storage read errors (e.g. strict security or private browsing)
    }

    setThemeState(initialTheme);
    applyThemeToDom(initialTheme);

    // Synchronize across components in the same window
    const handleCustomThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeId>;
      if (customEvent.detail && THEME_IDS.includes(customEvent.detail)) {
        setThemeState(customEvent.detail);
      }
    };

    // Synchronize across browser tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY && e.newValue) {
        const nextTheme = e.newValue as ThemeId;
        if (THEME_IDS.includes(nextTheme)) {
          setThemeState(nextTheme);
          applyThemeToDom(nextTheme);
        }
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleCustomThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleCustomThemeChange);
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

    applyThemeToDom(newTheme);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent<ThemeId>(THEME_CHANGE_EVENT, { detail: newTheme })
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
