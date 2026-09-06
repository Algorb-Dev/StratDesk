import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "Algorb — Premium Interfaces for Personal Trading Bots",
  description:
    "Turn your trading bot into a command center. Algorb provides high-density, self-hosted dashboards for developers and quants who build and run automated trading systems.",
  keywords: [
    "trading bot dashboard",
    "algorithmic trading dashboard",
    "crypto trading bot dashboard",
    "personal trading bot UI",
    "self-hosted trading dashboard",
    "trading bot monitoring",
    "trading bot control panel",
    "quant developer tools",
  ],
  authors: [{ name: "Algorb" }],
  creator: "Algorb",
  publisher: "Algorb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Algorb — Premium Interfaces for Personal Trading Bots",
    description:
      "Turn your trading bot into a command center. High-density, self-hosted dashboards for algorithmic and automated trading bots.",
    url: "https://algorb.internal",
    siteName: "Algorb",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algorb — Premium Interfaces for Personal Trading Bots",
    description:
      "Turn your trading bot into a command center. Self-hosted telemetry and command interfaces for automated bots.",
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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-text-primary flex flex-col antialiased selection:bg-accent/30 selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
