"use client";

import { useState, useEffect, useCallback } from "react";

export type SiteTheme = "dark";

export const SITE_THEME_STORAGE_KEY = "stratdesk_site_theme";
export const SITE_THEME_STORAGE_KEY_LEGACY = "algorb_site_theme";
export const DEFAULT_SITE_THEME: SiteTheme = "dark";

export function applySiteThemeToDom(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;

  root.classList.remove("light");
  body.classList.remove("light");
  root.classList.add("dark");
  body.classList.add("dark");
  root.style.colorScheme = "dark";
}

/**
 * StratDesk website theme hook.
 * High-tech institutional quant workstation: permanently dark mode.
 */
export function useSiteTheme() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    applySiteThemeToDom();
  }, []);

  const setSiteTheme = useCallback(() => {
    applySiteThemeToDom();
  }, []);

  const toggleSiteTheme = useCallback(() => {
    applySiteThemeToDom();
  }, []);

  return {
    siteTheme: "dark" as const,
    setSiteTheme,
    toggleSiteTheme,
    isDark: true,
    isLight: false,
    mounted,
  };
}
