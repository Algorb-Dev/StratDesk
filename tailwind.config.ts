import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#07090e",
          secondary: "#0c0f17",
          tertiary: "#10141f",
        },
        surface: {
          DEFAULT: "#131722",
          elevated: "#19202f",
          hover: "#1f273b",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          subtle: "rgba(255, 255, 255, 0.04)",
          active: "rgba(0, 240, 255, 0.4)",
          glow: "rgba(0, 240, 255, 0.2)",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
        accent: {
          DEFAULT: "#00f0ff",
          soft: "rgba(0, 240, 255, 0.12)",
          hover: "#26f4ff",
          muted: "rgba(0, 240, 255, 0.2)",
        },
        success: {
          DEFAULT: "#00e599",
          soft: "rgba(0, 229, 153, 0.15)",
        },
        danger: {
          DEFAULT: "#ff3b57",
          soft: "rgba(255, 59, 87, 0.15)",
        },
        warning: {
          DEFAULT: "#f59e0b",
          soft: "rgba(245, 158, 11, 0.15)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Fira Code",
          "Cascadia Code",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 8s linear infinite",
        "shimmer": "shimmer 2.5s infinite",
        "float": "float 6s ease-in-out infinite",
        "data-stream": "dataStream 20s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        dataStream: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 1000px" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.3)",
        "glow-emerald": "0 0 25px -5px rgba(0, 229, 153, 0.3)",
        "glow-subtle": "0 0 50px -15px rgba(0, 240, 255, 0.12)",
        "surface": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
