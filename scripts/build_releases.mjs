import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const RELEASES_DIR = path.join(ROOT_DIR, "releases");
const STAGING_DIR = path.join(RELEASES_DIR, "staging");
const PUBLIC_DOWNLOADS_DIR = path.join(ROOT_DIR, "public", "downloads");

const PRO_STAGING = path.join(STAGING_DIR, "stratdesk-pro");

console.log("==> Cleaning release and staging directories...");
if (fs.existsSync(STAGING_DIR)) {
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PRO_STAGING, { recursive: true });
fs.mkdirSync(PUBLIC_DOWNLOADS_DIR, { recursive: true });

function writeEnsureDir(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

function copyRecursive(src, dest, excludeFilter = []) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    const base = path.basename(src);
    if (excludeFilter.includes(base)) return;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (excludeFilter.includes(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry), excludeFilter);
    }
  } else {
    const base = path.basename(src);
    if (excludeFilter.includes(base)) return;
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

const GLOBAL_EXCLUDES = [
  "node_modules",
  ".next",
  ".git",
  ".gemini",
  ".system_generated",
  "releases",
  "staging",
  "tsconfig.tsbuildinfo",
  "Thumbs.db",
  ".DS_Store",
];

console.log("==> Copying root configuration and AI directives...");
const ROOT_CONFIG_FILES = [
  "tsconfig.json",
  "tailwind.config.ts",
  "postcss.config.mjs",
  ".eslintrc.json",
  ".gitignore",
  ".env.example",
  "STRATDESK_SPEC.md",
  "AI_RULES.md",
  ".cursorrules",
  "CLAUDE.md",
  ".windsurfrules",
  "CONVENTIONS.md",
  "START_HERE.md",
  "README.md",
  "QUICKSTART.md",
];

for (const file of ROOT_CONFIG_FILES) {
  const srcFile = path.join(ROOT_DIR, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, path.join(PRO_STAGING, file));
  }
}

// Copy AI editor rule folders (.github, .antigravity)
if (fs.existsSync(path.join(ROOT_DIR, ".github", "copilot-instructions.md"))) {
  writeEnsureDir(
    path.join(PRO_STAGING, ".github", "copilot-instructions.md"),
    fs.readFileSync(path.join(ROOT_DIR, ".github", "copilot-instructions.md"), "utf-8")
  );
}
if (fs.existsSync(path.join(ROOT_DIR, ".antigravity", "rules.md"))) {
  writeEnsureDir(
    path.join(PRO_STAGING, ".antigravity", "rules.md"),
    fs.readFileSync(path.join(ROOT_DIR, ".antigravity", "rules.md"), "utf-8")
  );
}

// Copy minimal public directory (only icon and symbol)
console.log("==> Copying minimal public assets...");
if (fs.existsSync(path.join(ROOT_DIR, "public", "logo-symbol.svg"))) {
  writeEnsureDir(
    path.join(PRO_STAGING, "public", "logo-symbol.svg"),
    fs.readFileSync(path.join(ROOT_DIR, "public", "logo-symbol.svg"), "utf-8")
  );
}

// Copy Python adapter script
console.log("==> Copying Python bot adapter...");
fs.mkdirSync(path.join(PRO_STAGING, "scripts"), { recursive: true });
fs.copyFileSync(
  path.join(ROOT_DIR, "scripts", "bot_adapter.py"),
  path.join(PRO_STAGING, "scripts", "bot_adapter.py")
);

// Copy libraries and hooks
console.log("==> Copying core libraries and hooks...");
copyRecursive(path.join(ROOT_DIR, "src", "lib"), path.join(PRO_STAGING, "src", "lib"), GLOBAL_EXCLUDES);

writeEnsureDir(
  path.join(PRO_STAGING, "src", "hooks", "useTheme.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "hooks", "useTheme.ts"), "utf-8")
);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "hooks", "useDashboardArchitecture.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "hooks", "useDashboardArchitecture.ts"), "utf-8")
);

// Copy data files required by dashboard (only dashboard data, no marketing/product/faq data)
console.log("==> Copying dashboard data models...");
writeEnsureDir(
  path.join(PRO_STAGING, "src", "data", "architectures-data.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "data", "architectures-data.ts"), "utf-8")
);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "data", "themes.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "data", "themes.ts"), "utf-8")
);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "data", "demo-data.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "data", "demo-data.ts"), "utf-8")
);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "data", "ledger-data.ts"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "data", "ledger-data.ts"), "utf-8")
);

// Copy UI, effects, ledger, dashboard components
console.log("==> Copying dashboard UI and telemetry components...");
copyRecursive(path.join(ROOT_DIR, "src", "components", "effects"), path.join(PRO_STAGING, "src", "components", "effects"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "components", "ledger"), path.join(PRO_STAGING, "src", "components", "ledger"), GLOBAL_EXCLUDES);

// UI components: Button, Badge, Logo
writeEnsureDir(
  path.join(PRO_STAGING, "src", "components", "ui", "Button.tsx"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "components", "ui", "Button.tsx"), "utf-8")
);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "components", "ui", "Badge.tsx"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "components", "ui", "Badge.tsx"), "utf-8")
);

// Logo: set default href = "/"
let logoContent = fs.readFileSync(path.join(ROOT_DIR, "src", "components", "ui", "Logo.tsx"), "utf-8");
logoContent = logoContent.replace(/href\s*=\s*"\/home"/g, 'href = "/"');
writeEnsureDir(path.join(PRO_STAGING, "src", "components", "ui", "Logo.tsx"), logoContent);

// Dashboard components (exclude DashboardLab)
const DASHBOARD_COMPONENTS = [
  "ArchitectureSwitcher.tsx",
  "ControlBar.tsx",
  "DashboardPreview.tsx",
  "EquityChart.tsx",
  "ExecutionLogs.tsx",
  "MetricCard.tsx",
  "PositionsTable.tsx",
  "ThemeSwitcher.tsx",
];
for (const comp of DASHBOARD_COMPONENTS) {
  writeEnsureDir(
    path.join(PRO_STAGING, "src", "components", "dashboard", comp),
    fs.readFileSync(path.join(ROOT_DIR, "src", "components", "dashboard", comp), "utf-8")
  );
}

// KillerWidgetSimulator for interactive architectures
writeEnsureDir(
  path.join(PRO_STAGING, "src", "components", "architectures", "KillerWidgetSimulator.tsx"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "components", "architectures", "KillerWidgetSimulator.tsx"), "utf-8")
);

// BlueprintSpecHud sanitized (remove Whop checkout CTA strip and PRODUCTS import)
let specHudContent = fs.readFileSync(
  path.join(ROOT_DIR, "src", "components", "architectures", "BlueprintSpecHud.tsx"),
  "utf-8"
);
specHudContent = specHudContent.replace(/import\s*\{\s*PRODUCTS\s*\}\s*from\s*"@\/data\/products";\n?/, "");
specHudContent = specHudContent.replace(/const productTier = PRODUCTS\[blueprint\.recommendedTier\];\n?/, "");
specHudContent = specHudContent.replace(/import\s*\{\s*([\s\S]*?)\s*\}\s*from\s*"lucide-react";/, (match, imports) => {
  const cleaned = imports
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "ExternalLink" && s.length > 0)
    .join(", ");
  return `import { ${cleaned} } from "lucide-react";`;
});
const checkoutStripRegex = /\{\/\* 5\. Direct Whop Checkout CTA Strip \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\);\s*\};/m;
const cleanStatusSection = `{/* 5. Active Blueprint Architecture Status */}
      <div
        className={cn(
          "p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 select-none",
          isLight
            ? "bg-slate-50 border-slate-200"
            : "bg-surface-elevated/70 border-accent/30 shadow-glow-cyan/10"
        )}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span className="font-bold text-white text-sm">
              Topology Preset #{blueprint.number}: {blueprint.title}
            </span>
          </div>
          <p className="text-xs text-text-muted font-sans">
            Architecture active. Stream telemetry, orders, and risk ceilings directly into this layout.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE BLUEPRINT</span>
          </span>
        </div>
      </div>
    </div>
  );
};`;
specHudContent = specHudContent.replace(checkoutStripRegex, cleanStatusSection);
writeEnsureDir(
  path.join(PRO_STAGING, "src", "components", "architectures", "BlueprintSpecHud.tsx"),
  specHudContent
);

// App Router routes
console.log("==> Setting up clean App Router routes for dashboard...");
writeEnsureDir(
  path.join(PRO_STAGING, "src", "app", "globals.css"),
  fs.readFileSync(path.join(ROOT_DIR, "src", "app", "globals.css"), "utf-8")
);
if (fs.existsSync(path.join(ROOT_DIR, "src", "app", "icon.svg"))) {
  writeEnsureDir(
    path.join(PRO_STAGING, "src", "app", "icon.svg"),
    fs.readFileSync(path.join(ROOT_DIR, "src", "app", "icon.svg"), "utf-8")
  );
}

// Clean NotFound component
const cleanNotFoundTsx = `"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StratDeskSymbol } from "@/components/ui/Logo";
import { TradingGrid } from "@/components/effects/TradingGrid";
import { GlowField } from "@/components/effects/GlowField";
import { AlertTriangle, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden bg-background select-none font-mono">
      <TradingGrid dense={true} fadeEdges={true} />
      <GlowField color="amber" position="center" />

      <div className="relative z-10 max-w-xl w-full mx-auto text-center space-y-6">
        <div className="flex justify-center mb-2">
          <div className="relative">
            <StratDeskSymbol size={48} glow={true} />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>404 // ROUTE NOT FOUND</span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            ENDPOINT UNREACHABLE
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary font-sans max-w-md mx-auto">
            The requested route does not exist in this self-hosted StratDesk Pro workstation.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            COMMAND CENTER
          </Button>
          <Button href="/ledger" variant="outline" size="md" icon={<BookOpen className="w-4 h-4" />}>
            TRADE LEDGER
          </Button>
        </div>
      </div>
    </div>
  );
}
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "app", "not-found.tsx"), cleanNotFoundTsx);

// API Routes (Ledger & Command Bus)
copyRecursive(path.join(ROOT_DIR, "src", "app", "api", "ledger"), path.join(PRO_STAGING, "src", "app", "api", "ledger"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "app", "api", "command"), path.join(PRO_STAGING, "src", "app", "api", "command"), GLOBAL_EXCLUDES);

// Clean Trade Ledger Page
const proLedgerPageTsx = `import React from "react";
import { Metadata } from "next";
import { TradeLedger } from "@/components/ledger/TradeLedger";

export const metadata: Metadata = {
  title: "Audit Trade Ledger // StratDesk Pro",
  description: "Audited institutional execution journal, R-multiple metrics, and forensic telemetry records.",
};

export default function LedgerPage() {
  return (
    <div className="pt-24 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <TradeLedger />
    </div>
  );
}
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "app", "ledger", "page.tsx"), proLedgerPageTsx);

// Clean Root Page (The Dashboard HUD!)
const proPageTsx = `import React from "react";
import { Metadata } from "next";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";

export const metadata: Metadata = {
  title: "StratDesk Pro // Institutional Command Center",
  description: "Bidirectional trading command bus, emergency kill-switch, runtime pauses, and forensic audit trade ledger.",
};

export default function ProDashboardPage() {
  return (
    <div className="pt-20 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <DashboardPreview
        product="pro"
        theme="obsidian"
        showArchitectureSwitcher={true}
        showThemeSwitcher={true}
      />
    </div>
  );
}
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "app", "page.tsx"), proPageTsx);

// Clean Root Layout (NO Whop Pixel, NO Vercel Analytics, NO marketing scripts)
const proLayoutTsx = `import type { Metadata, Viewport } from "next";
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
  title: {
    default: "StratDesk Pro | Institutional Command Center",
    template: "%s | StratDesk Pro",
  },
  description: "Self-hosted, institutional-grade React command center with bidirectional HMAC command bus and forensic trade ledger.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-text-primary flex flex-col antialiased selection:bg-accent/30 selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "app", "layout.tsx"), proLayoutTsx);

// Minimal HUD Navbar (No marketing links, only Dashboard and Trade Ledger)
const proNavbarTsx = `"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, BookOpen } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Dashboard", href: "/", icon: Terminal },
    { label: "Trade Ledger", href: "/ledger", icon: BookOpen },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none",
        isScrolled
          ? "py-2.5 bg-background/90 backdrop-blur-md border-b border-border shadow-md"
          : "py-3 bg-background/70 backdrop-blur-sm border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="md" glow={true} href="/" />
          <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded border border-warning/40 text-warning bg-warning/10 uppercase">
            PRO COMMAND BUS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-2 font-mono text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg transition-all duration-150 uppercase tracking-wider flex items-center gap-2",
                  isActive
                    ? "text-warning bg-warning/10 font-semibold border border-warning/30"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LOCAL IPC ACTIVE • PORT 3000</span>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded uppercase font-medium",
                  isActive ? "text-warning bg-warning/10" : "text-text-secondary"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "components", "layout", "Navbar.tsx"), proNavbarTsx);

// Minimal Terminal Footer (No marketing links, no SEO text)
const proFooterTsx = `"use client";

import React from "react";
import { Logo } from "@/components/ui/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-[#07090e] py-6 select-none font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted">
        <div className="flex items-center gap-3">
          <Logo size="sm" showWordmark={true} href="/" />
          <span className="text-text-secondary text-[11px]">
            // Institutional Trading Command Center (Self-Hosted)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-muted">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LOCAL LOOPBACK IPC &lt; 1ms
          </span>
          <span>•</span>
          <span>HMAC-SHA256 COMMAND BUS</span>
          <span>•</span>
          <a href="mailto:stratdesk.pro@gmail.com" className="hover:text-accent transition-colors">
            stratdesk.pro@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "components", "layout", "Footer.tsx"), proFooterTsx);

// Minimal next.config.mjs for the self-hosted dashboard (no marketing redirects)
const proNextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
writeEnsureDir(path.join(PRO_STAGING, "next.config.mjs"), proNextConfig);

// Clean package.json for the self-hosted dashboard
const proPackageJson = {
  name: "stratdesk-pro",
  version: "1.0.0",
  private: true,
  description: "StratDesk Pro — Self-Hosted Institutional Command Center & Execution Terminal",
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "next lint",
    typecheck: "tsc --noEmit"
  },
  dependencies: {
    clsx: "^2.1.1",
    "lucide-react": "^0.454.0",
    next: "^14.2.15",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  devDependencies: {
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    autoprefixer: "^10.4.20",
    eslint: "^8.57.1",
    "eslint-config-next": "^14.2.15",
    postcss: "^8.4.47",
    tailwindcss: "^3.4.14",
    typescript: "^5.6.3"
  }
};
writeEnsureDir(path.join(PRO_STAGING, "package.json"), JSON.stringify(proPackageJson, null, 2) + "\n");

// -----------------------------------------------------------------------------
// Typecheck Staging Distribution
// -----------------------------------------------------------------------------
console.log("==> Running TypeScript audit on StratDesk Pro staging...");
execSync("npx tsc --noEmit", { cwd: PRO_STAGING, stdio: "inherit" });
console.log("✔ StratDesk Pro passed TypeScript verification with 0 errors.");

// Remove any build cache artifacts produced by tsc --noEmit
if (fs.existsSync(path.join(PRO_STAGING, "tsconfig.tsbuildinfo"))) {
  fs.unlinkSync(path.join(PRO_STAGING, "tsconfig.tsbuildinfo"));
}

console.log("==> Creating release zip archive...");
const PRO_ZIP = path.join(RELEASES_DIR, "stratdesk-pro.zip");

if (fs.existsSync(PRO_ZIP)) fs.unlinkSync(PRO_ZIP);

console.log("Compressing stratdesk-pro.zip...");
execSync(`tar.exe -a -c -f "${PRO_ZIP}" *`, { cwd: PRO_STAGING, stdio: "inherit" });

// Copy to public/downloads
fs.copyFileSync(PRO_ZIP, path.join(PUBLIC_DOWNLOADS_DIR, "stratdesk-pro.zip"));

// Copy standalone START_HERE.md alongside zip archive (not inside zip)
if (fs.existsSync(path.join(ROOT_DIR, "START_HERE.md"))) {
  fs.copyFileSync(path.join(ROOT_DIR, "START_HERE.md"), path.join(RELEASES_DIR, "START_HERE.md"));
  fs.copyFileSync(path.join(ROOT_DIR, "START_HERE.md"), path.join(PUBLIC_DOWNLOADS_DIR, "START_HERE.md"));
}

const proStat = fs.statSync(PRO_ZIP);

console.log("\n========================================================");
console.log("  BUILD & PACKAGING COMPLETE!");
console.log("========================================================");
console.log(`- StratDesk Pro: ${PRO_ZIP} (${(proStat.size / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`- Mirrored to:   ${PUBLIC_DOWNLOADS_DIR}`);
console.log("========================================================\n");
