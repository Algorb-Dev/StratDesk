export interface FaqItem {
  id: string;
  category: "General" | "Architecture" | "Integration" | "Security" | "Products";
  question: string;
  answer: string;
  codeSnippet?: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "what-am-i-buying",
    category: "General",
    question: "What exactly am I buying?",
    answer: "You are purchasing a perpetual license to a premium, production-grade interface package engineered specifically for personal algorithmic trading systems. It includes the pre-built frontend dashboard, adapter client libraries (Python, Node.js, Go), integration specifications, configuration templates, and comprehensive documentation to connect the UI to your own trading bot.",
  },
  {
    id: "does-stratdesk-execute-trades",
    category: "Architecture",
    question: "Does StratDesk execute trades?",
    answer: "No. StratDesk is strictly an interface and command telemetry layer. Your trading bot contains your proprietary trading strategy, mathematical models, risk rules, and direct exchange connections. StratDesk Pro displays high-density telemetry emitted by your bot and sends verified user commands (like emergency kill-switch, pause, or parameter updates) back to your bot, which executes the actual orders through its own exchange connections.",
  },
  {
    id: "does-stratdesk-replace-my-bot",
    category: "Architecture",
    question: "Does StratDesk replace my trading bot?",
    answer: "Never. Your bot remains 100% intact. StratDesk does not touch your strategy code, execution logic, or private API secrets. Instead of staring at terminal logs or raw print statements, StratDesk gives your existing bot an institutional command center interface.",
  },
  {
    id: "can-i-use-my-existing-bot",
    category: "Integration",
    question: "Can I use my existing bot?",
    answer: "Yes. StratDesk was built specifically for existing custom bots. As long as your bot can publish telemetry over a local WebSocket or emit JSON over a lightweight REST endpoint (such as POST /api/ledger), it can connect to StratDesk in minutes.",
  },
  {
    id: "what-programming-languages",
    category: "Integration",
    question: "What programming languages can I use?",
    answer: "Any language. StratDesk interfaces communicate using standard open protocols (WebSocket & JSON-RPC / REST). We provide ready-to-use drop-in adapter libraries for Python (asyncio, threading, ccxt), TypeScript/Node.js, Go, and Rust. If your bot is written in C++, C#, Java, or Julia, you only need to serialize standard JSON payloads.",
  },
  {
    id: "can-i-integrate-with-ai",
    category: "Integration",
    question: "Can I integrate it using Codex, Claude, or another AI coding agent?",
    answer: "Yes, StratDesk is intentionally designed for AI-assisted integration. The package includes a clean `STRATDESK_SPEC.md` specification file. You can simply provide this file along with your bot's codebase to Claude, ChatGPT, or GitHub Copilot, and prompt: 'Add the StratDesk telemetry adapter to my bot.' The AI will map your state variables and hook into the adapter automatically.",
    codeSnippet: "# Example AI prompt:\n\"Here is my Python trading bot and the StratDesk adapter specification.\nMap my account balance, positions array, and order fill callbacks\nto emit events to http://127.0.0.1:3000/api/ledger.\"",
  },
  {
    id: "do-i-need-a-vps",
    category: "Architecture",
    question: "Do I need a VPS?",
    answer: "Not necessarily, but it works seamlessly with one. You can run StratDesk locally on your development machine (Mac, Linux, Windows) while developing. If you run your trading bot on a remote VPS (AWS, DigitalOcean, Hetzner), you can either run StratDesk on the same VPS and access it securely via Tailscale / WireGuard / SSH tunneling, or host the dashboard on your local machine and stream telemetry from your VPS over TLS.",
  },
  {
    id: "is-it-self-hosted",
    category: "Security",
    question: "Is it self-hosted? Who has access to my data?",
    answer: "StratDesk is 100% self-hosted. There are no central cloud servers intercepting your data, no analytics trackers harvesting your portfolio equity, and no external telemetry relays. All data stays between your bot process and your browser on your own private network.",
  },
  {
    id: "can-i-modify-the-dashboard",
    category: "General",
    question: "Can I modify the dashboard?",
    answer: "Yes. StratDesk is delivered with clean, modern TypeScript/React source code and modular component architecture. You can adjust colors, add bespoke metric widgets, create custom charting overlays, or modify layouts to match your unique strategy requirements.",
  },
  {
    id: "what-does-pro-include",
    category: "Products",
    question: "What does StratDesk Pro include?",
    answer: "StratDesk Pro is our complete institutional command center. It includes real-time equity & drawdown curves, multi-asset position inventory, live execution order flow, slippage analytics, all 20 specialized architecture blueprints, 6 switchable visual themes, an automated forensic trade ledger & journal, a bidirectional HMAC-signed command bus, and an immediate emergency kill-switch.",
  },
  {
    id: "how-does-the-integration-work",
    category: "Integration",
    question: "How does the integration work under the hood?",
    answer: "Your bot imports a lightweight helper adapter (e.g. Python requests/ccxt or Node.js). Whenever your bot executes an order, updates its balance, or calculates risk metrics, it dispatches an event to the local StratDesk API route (/api/ledger). The frontend immediately updates its charts, positions table, and trade journal in real-time.",
  },
  {
    id: "what-happens-after-purchase",
    category: "General",
    question: "What happens after purchase?",
    answer: "Upon purchase, you receive instant access to download the full software archive (`stratdesk-pro.zip`), perpetual license, documentation package, and adapter SDKs. You can extract and launch the command center locally in minutes.",
  },
  {
    id: "what-is-license-policy",
    category: "General",
    question: "What is your software delivery & license policy?",
    answer: "StratDesk Pro is distributed as instant, unminified full source code (Next.js, React, Tailwind CSS, and Python CCXT adapter). All sales include perpetual software ownership and complete source code inspection. If you ever have integration questions or need setup assistance for your bot, our engineering team provides direct support at stratdesk.pro@gmail.com.",
  },
  {
    id: "do-i-own-the-code",
    category: "General",
    question: "Do I get full source code ownership?",
    answer: "Yes. When you purchase StratDesk Pro, you receive complete, unminified TypeScript/React and Tailwind CSS source code. You can fork it, inspect every component, customize the telemetry layout, or build proprietary private widgets for your personal fund or trading desk.",
  },
  {
    id: "can-i-run-multiple-bots",
    category: "Architecture",
    question: "Can I monitor multiple bots or multiple VPS servers?",
    answer: "Yes. StratDesk Pro supports multi-bot topologies. You can route telemetry from multiple bot daemons into isolated channels or run instances across different ports, monitoring cross-exchange portfolios (Binance, Bybit, DEXs) from a unified command center.",
  },
];
