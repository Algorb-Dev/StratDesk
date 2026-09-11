import React from "react";
import { Metadata } from "next";
import { DashboardLab } from "@/components/lab/DashboardLab";
import { SEOFooter } from "@/components/SEOFooter";

export const metadata: Metadata = {
  title: "StratDesk Pro | Next.js Quantitative Trading Workstation & Dashboard",
  description:
    "A modular Next.js trading dashboard with Python CCXT adapters, live telemetry, and an AI-promptable architecture tailored for vibe coders and quants.",
  keywords: [
    // Core Product
    "trading dashboard",
    "nextjs trading dashboard",
    "quantitative trading workstation",
    "crypto trading hud",
    // AI & Vibe Coding
    "vibe coding trading bot",
    "cursor ai trading dashboard",
    "windsurf app template",
    "ai promptable codebase",
    // Backend & Adapters
    "ccxt python dashboard",
    "algorithmic trading ui",
    "crypto bot web terminal",
    "real time market data hud",
    // Developer Stack
    "nextjs app router template",
    "tailwind trading terminal",
    "react quant workstation",
    "fintech dashboard source code",
  ],
  openGraph: {
    title: "StratDesk Pro | Next.js Quantitative Trading Workstation & Dashboard",
    description:
      "A modular Next.js trading dashboard with Python CCXT adapters, live telemetry, and an AI-promptable architecture tailored for vibe coders and quants.",
    url: "/",
    siteName: "StratDesk Pro",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "StratDesk Pro | Next.js Quantitative Trading Workstation & Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StratDesk Pro | Next.js Quantitative Trading Workstation & Dashboard",
    description:
      "A modular Next.js trading dashboard with Python CCXT adapters, live telemetry, and an AI-promptable architecture tailored for vibe coders and quants.",
    images: ["/preview.png"],
    creator: "@stratdesk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <div className="pt-20 pb-16 bg-background min-h-screen flex flex-col">
      <div className="flex-1">
        <DashboardLab mode="workstation" />
      </div>
      <SEOFooter />
    </div>
  );
}
