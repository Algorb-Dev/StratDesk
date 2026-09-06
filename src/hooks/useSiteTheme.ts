"use client";

import { useState, useEffect, useCallback } from "react";

export type SiteTheme = "dark" | "light";

export const SITE_THEME_STORAGE_KEY = "algorb_site_theme";
export const DEFAULT_SITE_THEME: SiteTheme = "dark";

export function applySiteThemeToDom(theme: SiteTheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;

  if (theme === "light") {
    root.classList.remove("dark");
    body.classList.remove("dark");
    root.classList.add("light");
    body.classList.add("light");
    root.style.colorScheme = "light";
  } else {
    root.classList.remove("light");
    body.classList.remove("light");
    root.classList.add("dark");
    body.classList.add("dark");
    root.style.colorScheme = "dark";
  }
}

/**
 * Custom hook for Algorb website Dark / Light mode toggle.
 * Safe from Next.js SSR hydration mismatches.
 */
export function useSiteTheme() {
  const [siteTheme, setSiteThemeState] = useState<SiteTheme>(DEFAULT_SITE_THEME);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    let current: SiteTheme = DEFAULT_SITE_THEME;
    try {
      const stored = localStorage.getItem(SITE_THEME_STORAGE_KEY) as SiteTheme | null;
      if (stored === "dark" || stored === "light") {
        current = stored;
      }
    } catch {
      // Ignore localStorage errors
    }

    setSiteThemeState(current);
    applySiteThemeToDom(current);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SITE_THEME_STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        const next = e.newValue as SiteTheme;
        setSiteThemeState(next);
        applySiteThemeToDom(next);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setSiteTheme = useCallback((theme: SiteTheme) => {
    setSiteThemeState(theme);
    try {
      localStorage.setItem(SITE_THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage errors
    }
    applySiteThemeToDom(theme);
  }, []);

  const toggleSiteTheme = useCallback(() => {
    const next = siteTheme === "dark" ? "light" : "dark";
    setSiteTheme(next);
  }, [siteTheme, setSiteTheme]);

  return {
    siteTheme,
    setSiteTheme,
    toggleSiteTheme,
    isDark: siteTheme === "dark",
    isLight: siteTheme === "light",
    mounted,
  };
}
