export interface ThemeDefinition {
  id: "terminal" | "obsidian" | "quant" | "command" | "vector" | "light";
  num: string;
  name: string;
  codename: string;
  description: string;
  vibe: string;
  colors: {
    bg: string;
    surface: string;
    border: string;
    accent: string;
    accentGlow: string;
    text: string;
    muted: string;
    chartColor: string;
  };
  traits: string[];
}

export const THEMES: ThemeDefinition[] = [
  {
    id: "terminal",
    num: "01",
    name: "Terminal",
    codename: "PHOSPHOR-80",
    description: "Monochrome cathode-ray green phosphor inspired by vintage DEC terminals and early institutional UNIX workbenches.",
    vibe: "Raw hacker / low-level system telemetry",
    colors: {
      bg: "#050906",
      surface: "#09120b",
      border: "rgba(0, 255, 128, 0.2)",
      accent: "#00ff80",
      accentGlow: "rgba(0, 255, 128, 0.4)",
      text: "#bbf7d0",
      muted: "#4ade80",
      chartColor: "#00ff80",
    },
    traits: ["CRT Scanline FX", "Monospace Matrix", "Phosphor Trails"],
  },
  {
    id: "obsidian",
    num: "02",
    name: "Obsidian",
    codename: "STEALTH-CORE",
    description: "Deep charcoal layered surfaces with razor-sharp electric cyan highlights. Our signature flagship aesthetic.",
    vibe: "Futuristic stealth operating system",
    colors: {
      bg: "#07090e",
      surface: "#121622",
      border: "rgba(255, 255, 255, 0.08)",
      accent: "#00f0ff",
      accentGlow: "rgba(0, 240, 255, 0.35)",
      text: "#f8fafc",
      muted: "#64748b",
      chartColor: "#00f0ff",
    },
    traits: ["Subtle Grids", "Cyan Ion Glow", "Layered Glass"],
  },
  {
    id: "quant",
    num: "03",
    name: "Quant",
    codename: "STOCHASTIC-X",
    description: "Ultra-dense mathematical workbench engineered for quantitative hedge fund researchers and multi-factor models.",
    vibe: "Institutional mathematical precision",
    colors: {
      bg: "#0a0c10",
      surface: "#131821",
      border: "rgba(148, 163, 184, 0.15)",
      accent: "#38bdf8",
      accentGlow: "rgba(56, 189, 248, 0.3)",
      text: "#e2e8f0",
      muted: "#94a3b8",
      chartColor: "#38bdf8",
    },
    traits: ["Dense Data Cells", "Statistical Bands", "High Delta Contrast"],
  },
  {
    id: "command",
    num: "04",
    name: "Command",
    codename: "AEROSPACE-OPS",
    description: "High-alert telemetry layout inspired by aerospace mission control, complete with amber safety indicators and system fault alarms.",
    vibe: "Mission control command bridge",
    colors: {
      bg: "#0c0a07",
      surface: "#1a140d",
      border: "rgba(245, 158, 11, 0.2)",
      accent: "#f59e0b",
      accentGlow: "rgba(245, 158, 11, 0.4)",
      text: "#fef3c7",
      muted: "#d97706",
      chartColor: "#f59e0b",
    },
    traits: ["Amber Telemetry", "Status Alarms", "Circuit Breaker HUD"],
  },
  {
    id: "vector",
    num: "05",
    name: "Vector",
    codename: "CLEAN-SLATE",
    description: "Pure architectural minimalism. Stripped of glows, relying on flawless micro-typography, surgical 1px borders, and ultra-high contrast.",
    vibe: "Architectural Swiss minimalism",
    colors: {
      bg: "#09090b",
      surface: "#18181b",
      border: "rgba(255, 255, 255, 0.12)",
      accent: "#ffffff",
      accentGlow: "rgba(255, 255, 255, 0.2)",
      text: "#fafafa",
      muted: "#71717a",
      chartColor: "#e4e4e7",
    },
    traits: ["1px Laser Lines", "Monochrome Grid", "Zero Visual Noise"],
  },
  {
    id: "light",
    num: "06",
    name: "Light",
    codename: "DAYLIGHT-STUDIO",
    description: "Crisp studio light mode with stark graphite typography, frosted milk glass, and crisp cobalt technical accents for sunlit desks.",
    vibe: "High-contrast laboratory studio",
    colors: {
      bg: "#f8fafc",
      surface: "#ffffff",
      border: "rgba(15, 23, 42, 0.08)",
      accent: "#0284c7",
      accentGlow: "rgba(2, 132, 199, 0.2)",
      text: "#0f172a",
      muted: "#64748b",
      chartColor: "#0284c7",
    },
    traits: ["Paper White Glass", "Graphite Typography", "Cobalt Accents"],
  },
];
