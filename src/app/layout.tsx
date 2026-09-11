import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/effects/CustomCursor";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://stratdesk.pro");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StratDesk Pro | Next.js Quantitative Trading Workstation & Dashboard",
    template: "%s | StratDesk Pro",
  },
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
  authors: [{ name: "StratDesk" }],
  creator: "StratDesk",
  publisher: "StratDesk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StratDesk Pro",
  operatingSystem: "Web, Windows, macOS, Linux",
  applicationCategory: "FinanceApplication",
  offers: {
    "@type": "Offer",
    price: "49.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  description:
    "High-performance quantitative trading workstation template built with Next.js App Router and Python CCXT integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");whop.setScope("biz_qYooDSml7OoZlk");whop.track("page");`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-primary flex flex-col antialiased selection:bg-accent/30 selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
