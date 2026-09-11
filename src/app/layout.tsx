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
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://stratdesk.internal");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StratDesk | Institutional Dashboards for Algorithmic Trading",
    template: "%s | StratDesk",
  },
  description:
    "Self-hosted, institutional-grade React dashboards and command centers for quantitative developers and retail algos.",
  keywords: [
    "trading bot dashboard",
    "algorithmic trading dashboard",
    "crypto trading bot dashboard",
    "personal trading bot UI",
    "self-hosted trading dashboard",
    "trading bot monitoring",
    "trading bot control panel",
    "quant developer tools",
    "CCXT dashboard",
    "trade ledger",
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
    title: "StratDesk | Institutional Dashboards for Algorithmic Trading",
    description:
      "Self-hosted, institutional-grade React dashboards and command centers for quantitative developers and retail algos.",
    url: "/",
    siteName: "StratDesk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StratDesk | Institutional Dashboards for Algorithmic Trading",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StratDesk | Institutional Dashboards for Algorithmic Trading",
    description:
      "Self-hosted, institutional-grade React dashboards and command centers for quantitative developers and retail algos.",
    images: ["/og-image.png"],
    creator: "@stratdesk",
  },
  robots: {
    index: true,
    follow: true,
  },
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
