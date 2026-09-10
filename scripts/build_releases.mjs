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

// Clean legacy archives if present
for (const legacy of ["algorb-core.zip", "algorb-pro.zip"]) {
  const rPath = path.join(RELEASES_DIR, legacy);
  const pPath = path.join(PUBLIC_DOWNLOADS_DIR, legacy);
  if (fs.existsSync(rPath)) fs.unlinkSync(rPath);
  if (fs.existsSync(pPath)) fs.unlinkSync(pPath);
}

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

// Common files to copy
const COMMON_ROOT_FILES = [
  "tsconfig.json",
  "next.config.mjs",
  "tailwind.config.ts",
  "postcss.config.mjs",
  ".eslintrc.json",
  ".gitignore",
  "STRATDESK_SPEC.md",
  "AI_RULES.md",
  ".cursorrules",
  "CLAUDE.md",
  ".windsurfrules",
  "CONVENTIONS.md",
  "START_HERE.md",
];

console.log("==> Copying shared assets and configuration...");
for (const file of COMMON_ROOT_FILES) {
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

// Copy public directory (excluding downloads)
copyRecursive(path.join(ROOT_DIR, "public"), path.join(PRO_STAGING, "public"), [
  ...GLOBAL_EXCLUDES,
  "downloads",
]);

// Copy src directories
copyRecursive(path.join(ROOT_DIR, "src", "lib"), path.join(PRO_STAGING, "src", "lib"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "hooks"), path.join(PRO_STAGING, "src", "hooks"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "data"), path.join(PRO_STAGING, "src", "data"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "components"), path.join(PRO_STAGING, "src", "components"), GLOBAL_EXCLUDES);

// Copy globals.css, icon.svg, and not-found.tsx
writeEnsureDir(path.join(PRO_STAGING, "src", "app", "globals.css"), fs.readFileSync(path.join(ROOT_DIR, "src", "app", "globals.css"), "utf-8"));

if (fs.existsSync(path.join(ROOT_DIR, "src", "app", "icon.svg"))) {
  writeEnsureDir(path.join(PRO_STAGING, "src", "app", "icon.svg"), fs.readFileSync(path.join(ROOT_DIR, "src", "app", "icon.svg"), "utf-8"));
}

writeEnsureDir(path.join(PRO_STAGING, "src", "app", "not-found.tsx"), fs.readFileSync(path.join(ROOT_DIR, "src", "app", "not-found.tsx"), "utf-8"));

// Copy sub-pages (architectures, themes, how-it-works, docs, faq, lab, legal)
const SUB_PAGES = ["architectures", "themes", "how-it-works", "docs", "faq", "lab", "legal"];
for (const page of SUB_PAGES) {
  copyRecursive(path.join(ROOT_DIR, "src", "app", page), path.join(PRO_STAGING, "src", "app", page), GLOBAL_EXCLUDES);
}

// Copy Trade Ledger components, API route, and Python bot adapter
console.log("==> Configuring StratDesk Pro components & scripts...");
copyRecursive(path.join(ROOT_DIR, "src", "components", "ledger"), path.join(PRO_STAGING, "src", "components", "ledger"), GLOBAL_EXCLUDES);
copyRecursive(path.join(ROOT_DIR, "src", "app", "api", "ledger"), path.join(PRO_STAGING, "src", "app", "api", "ledger"), GLOBAL_EXCLUDES);
fs.mkdirSync(path.join(PRO_STAGING, "scripts"), { recursive: true });
fs.copyFileSync(path.join(ROOT_DIR, "scripts", "bot_adapter.py"), path.join(PRO_STAGING, "scripts", "bot_adapter.py"));

// -----------------------------------------------------------------------------
// Pro Customizations
// -----------------------------------------------------------------------------
console.log("==> Customizing StratDesk Pro package files...");

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
    eslint: "^8.57.1",
    "eslint-config-next": "^14.2.15",
    postcss: "^8.4.47",
    tailwindcss: "^3.4.14",
    typescript: "^5.6.3"
  }
};
writeEnsureDir(path.join(PRO_STAGING, "package.json"), JSON.stringify(proPackageJson, null, 2) + "\n");

const proPageTsx = `import React from "react";
import { Metadata } from "next";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";

export const metadata: Metadata = {
  title: "StratDesk Pro // Institutional Command Center",
  description: "Bidirectional trading command bus, emergency kill-switch, runtime pauses, and forensic audit trade ledger.",
};

export default function ProDashboardPage() {
  return (
    <div className="pt-24 pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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
    default: "StratDesk Pro | Institutional Command Center & Execution Terminal",
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

const proNavbarTsx = `"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal, Compass, BookOpen, HelpCircle, FileText, Sliders } from "lucide-react";

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
    { label: "Command Center", href: "/", icon: Terminal },
    { label: "Audit Ledger", href: "/ledger", icon: FileText },
    { label: "Lab", href: "/lab", icon: Sliders },
    { label: "Architectures", href: "/architectures", icon: Compass },
    { label: "Integration", href: "/how-it-works", icon: Terminal },
    { label: "Docs", href: "/docs", icon: BookOpen },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none",
        isScrolled
          ? "py-2.5 bg-background/85 backdrop-blur-md border-b border-border shadow-md dark:shadow-black/50"
          : "py-4 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="md" glow={true} />
          <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded border border-warning/40 text-warning bg-warning/10 uppercase">
            PRO COMMAND BUS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded transition-all duration-150 uppercase tracking-wider",
                  isActive
                    ? "text-warning bg-warning/10 font-semibold"
                    : "text-text-secondary hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.03]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-warning/40 bg-warning/10 text-warning font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
            <span>COMMAND BUS ARMED</span>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded bg-surface border border-border text-text-secondary hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded uppercase font-medium",
                  isActive ? "text-warning bg-warning/10" : "text-text-secondary"
                )}
              >
                {link.label}
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

const proFooterTsx = `"use client";

import React from "react";
import Link from "next/link";
import { Logo, StratDeskSymbol } from "@/components/ui/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-background pt-12 pb-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4 md:col-span-2">
            <Logo size="md" />
            <p className="text-xs text-text-secondary font-sans leading-relaxed max-w-sm">
              StratDesk Pro: Self-hosted institutional command center and bidirectional trading terminal. Includes HMAC-signed emergency kill switches, strategy pauses, and forensic audit trade ledger.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-warning">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              <span>PERPETUAL LICENSE // PRO COMMAND EDITION</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">Navigation</span>
            <Link href="/" className="text-text-secondary hover:text-accent transition-colors">Command Center HUD</Link>
            <Link href="/ledger" className="text-text-secondary hover:text-accent transition-colors">Audit Trade Ledger</Link>
            <Link href="/lab" className="text-text-secondary hover:text-accent transition-colors">Dashboard Lab</Link>
            <Link href="/architectures" className="text-text-secondary hover:text-accent transition-colors">20 Architectures</Link>
          </div>

          <div className="flex flex-col gap-2.5 font-mono text-xs">
            <span className="font-bold text-white uppercase tracking-widest text-[11px] mb-1">Developer & Support</span>
            <Link href="/docs" className="text-text-secondary hover:text-accent transition-colors">Developer Specs</Link>
            <Link href="/how-it-works" className="text-text-secondary hover:text-accent transition-colors">Command Bus Protocol</Link>
            <Link href="/faq" className="text-text-secondary hover:text-accent transition-colors">Technical FAQ</Link>
            <a href="mailto:stratdesk.pro@gmail.com" className="text-text-secondary hover:text-accent transition-colors">stratdesk.pro@gmail.com</a>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div>© {new Date().getFullYear()} StratDesk. All rights reserved. Self-hosted client software.</div>
          <div className="flex items-center gap-2">
            <StratDeskSymbol size={14} />
            <span>STRATDESK PRO // V1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
`;
writeEnsureDir(path.join(PRO_STAGING, "src", "components", "layout", "Footer.tsx"), proFooterTsx);

const proReadme = `# StratDesk Pro — Institutional Command Center & Execution Terminal

> Premium, self-hosted bidirectional command center, emergency kill-switch, and forensic trade ledger for algorithmic trading systems.

Welcome to **StratDesk Pro**. Your purchase includes 100% source code access to institutional command-and-control capabilities:
- **Bidirectional HMAC Command Bus**: Emergency Kill-Switch (\`FLATTEN & HALT\`), runtime strategy pause switches, and parameter reloader.
- **Forensic Audit Trade Ledger**: R-multiple tracking, slippage analysis, Sharpe ratio, screenshot mode with cryptographic watermark, CSV export.
- **Automated Trade Ingestion**: Pre-wired \`POST /api/ledger\` server route ready to consume executions.
- **Python CCXT Adapter**: \`scripts/bot_adapter.py\` ready to integrate into your live bot.
- **All 20 Architectures Unlocked**: Full access to all specialized topologies.
- **6 Precision Themes**: \`terminal\`, \`obsidian\`, \`quant\`, \`command\`, \`vector\`, \`light\`.

---

## ⚡ Quick Start

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start the command center
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐍 Testing Bot Ingestion (Python)

StratDesk Pro includes an asynchronous Python adapter in \`scripts/bot_adapter.py\`:

\`\`\`bash
# Run the demo adapter pipeline to push an audited trade to your local dashboard:
python scripts/bot_adapter.py
\`\`\`

You will see:
\`\`\`text
[1] Prepared Audited Trade Payload...
[2] Transmitting execution to StratDesk Command Bus (http://localhost:3000/api/ledger)...
[STRATDESK INGESTION SUCCESS] HTTP 201 — Recorded ID: TRD-2026-0907-143
[3] Ingestion Confirmed by StratDesk Pro: Trade verified on dashboard.
\`\`\`

Switch to the **Audit Ledger** tab (or visit \`/ledger\`) to inspect your freshly recorded trade with full forensic metrics!

---

## 🛡️ Bidirectional HMAC Command Verification

Dispatched actions (emergency halt, strategy reload) require HMAC-SHA256 signature verification in your bot:

\`\`\`python
import hmac
import hashlib

def verify_stratdesk_command(payload_bytes: bytes, signature: str, secret_key: str) -> bool:
    computed = hmac.new(secret_key.encode(), payload_bytes, hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, signature)
\`\`\`

---

## 🤖 Universal AI Integration & Auto-Moulding

StratDesk Pro is engineered with native rules for **every major AI coding assistant**:
- **Cursor IDE**: Pre-loaded \`.cursorrules\`
- **Claude Code (Anthropic)**: Pre-loaded \`CLAUDE.md\`
- **Windsurf (Cascade)**: Pre-loaded \`.windsurfrules\`
- **GitHub Copilot & Codex**: Pre-loaded \`.github/copilot-instructions.md\`
- **Google Antigravity & Gemini**: Pre-loaded \`.antigravity/rules.md\`
- **Aider & Open Code**: Pre-loaded \`CONVENTIONS.md\`
- **Universal Specification**: \`STRATDESK_SPEC.md\` & \`AI_RULES.md\`

Simply open your extracted StratDesk Pro project in any AI editor alongside your bot and prompt:
> *"Connect this dashboard to my trading bot."*

The AI assistant will automatically read the embedded directives, preserve the institutional dark HUD terminal layout, mould the 6 metric cards and parameters to your specific bot, and generate a non-invasive bridge adapter.

---

## 🔒 Security & Data Privacy

- **100% Client-Side**: No cloud servers ever receive your trading orders, positions, or keys.
- **Zero Credentials Required**: StratDesk never handles your private exchange API keys.
- Support: \`stratdesk.pro@gmail.com\`
`;
writeEnsureDir(path.join(PRO_STAGING, "README.md"), proReadme);
writeEnsureDir(path.join(PRO_STAGING, "QUICKSTART.md"), proReadme);

// Sanitize blueprint action buttons in package to load into dashboard
console.log("==> Sanitizing blueprint action buttons for self-hosted owners...");
const hudPath = path.join(PRO_STAGING, "src", "components", "architectures", "BlueprintSpecHud.tsx");
if (fs.existsSync(hudPath)) {
  let content = fs.readFileSync(hudPath, "utf-8");
  content = content.replace(
    /<a[\s\S]*?href=\{productTier\.whopCheckoutUrl\}[\s\S]*?<\/a>/,
    '<Link href={`/?archetype=${blueprint.id}`} className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-accent text-background font-bold text-xs uppercase tracking-wider hover:bg-accent/80 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 shrink-0"><span>LOAD IN DASHBOARD</span><Sliders className="w-3.5 h-3.5" /></Link>'
  );
  if (!content.includes('import Link from "next/link";')) {
    content = 'import Link from "next/link";\n' + content;
  }
  fs.writeFileSync(hudPath, content);
}

const matrixPath = path.join(PRO_STAGING, "src", "components", "architectures", "ArchitectureMatrix.tsx");
if (fs.existsSync(matrixPath)) {
  let content = fs.readFileSync(matrixPath, "utf-8");
  content = content.replace(
    /<a[\s\S]*?href=\{productTier\.whopCheckoutUrl\}[\s\S]*?<\/a>/,
    '<Link href={`/?archetype=${blueprint.id}`} className={cn("px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all flex items-center gap-1 shadow-md", isLight ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-accent text-black hover:bg-accent/80 shadow-accent/10")}><span>ACTIVATE</span><Sliders className="w-3 h-3" /></Link>'
  );
  if (!content.includes('import Link from "next/link";')) {
    content = 'import Link from "next/link";\n' + content;
  }
  fs.writeFileSync(matrixPath, content);
}

const modalPath = path.join(PRO_STAGING, "src", "components", "architectures", "ArchitectureModal.tsx");
if (fs.existsSync(modalPath)) {
  let content = fs.readFileSync(modalPath, "utf-8");
  content = content.replace(
    /<a[\s\S]*?href=\{productTier\.whopCheckoutUrl\}[\s\S]*?<\/a>/,
    '<Link href={`/?archetype=${blueprint.id}`} onClick={onClose} className={cn("px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg", isLight ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-accent text-black hover:bg-accent/80 shadow-accent/20")}><span>LOAD IN DASHBOARD</span><Sliders className="w-3.5 h-3.5" /></Link>'
  );
  fs.writeFileSync(modalPath, content);
}

const archPagePath = path.join(PRO_STAGING, "src", "app", "architectures", "page.tsx");
if (fs.existsSync(archPagePath)) {
  let content = fs.readFileSync(archPagePath, "utf-8");
  content = content.replace(/import \{ FinalCta \} from "@\/components\/cta\/FinalCta";\n?/, "");
  content = content.replace(/<FinalCta \/>\n?/, "");
  fs.writeFileSync(archPagePath, content);
}

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
