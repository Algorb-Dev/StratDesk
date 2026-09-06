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
    id: "does-algorb-execute-trades",
    category: "Architecture",
    question: "Does Algorb execute trades?",
    answer: "No. Algorb is strictly an interface and telemetry layer. Your trading bot contains your proprietary trading strategy, mathematical models, risk rules, and direct exchange connections. Algorb View simply displays telemetry emitted by your bot. Algorb Control sends verified user commands (like pause, resume, or emergency stop) back to your bot, which executes the actual orders through its own exchange connections.",
  },
  {
    id: "does-algorb-replace-my-bot",
    category: "Architecture",
    question: "Does Algorb replace my trading bot?",
    answer: "Never. Your bot remains 100% intact. Algorb does not touch your strategy code, execution logic, or private API secrets. Instead of staring at terminal logs or raw print statements, Algorb gives your existing bot a command center interface.",
  },
  {
    id: "can-i-use-my-existing-bot",
    category: "Integration",
    question: "Can I use my existing bot?",
    answer: "Yes. Algorb was built specifically for existing custom bots. As long as your bot can publish telemetry over a local WebSocket or emit JSON over a lightweight REST endpoint (or use our provided 20-line adapter helper), it can connect to Algorb in minutes.",
  },
  {
    id: "what-programming-languages",
    category: "Integration",
    question: "What programming languages can I use?",
    answer: "Any language. Algorb interfaces communicate using standard open protocols (WebSocket & JSON-RPC / REST). We provide ready-to-use drop-in adapter libraries for Python (asyncio, threading, ccxt), TypeScript/Node.js, Go, and Rust. If your bot is written in C++, C#, Java, or Julia, you only need to serialize standard JSON payloads.",
  },
  {
    id: "can-i-integrate-with-ai",
    category: "Integration",
    question: "Can I integrate it using Codex, Claude, or another AI coding agent?",
    answer: "Yes, Algorb is intentionally designed for AI-assisted integration. The package includes a clean `ALGORB_SPEC.md` specification file. You can simply provide this file along with your bot's codebase to Claude, ChatGPT, or GitHub Copilot, and prompt: 'Add the Algorb telemetry adapter to my bot.' The AI will map your state variables and hook into the adapter automatically.",
    codeSnippet: "# Example AI prompt:\n\"Here is my Python trading bot and the Algorb adapter specification.\nMap my account balance, positions array, and order fill callbacks\nto emit events to ws://127.0.0.1:9042.\"",
  },
  {
    id: "do-i-need-a-vps",
    category: "Architecture",
    question: "Do I need a VPS?",
    answer: "Not necessarily, but it works seamlessly with one. You can run Algorb locally on your development machine (Mac, Linux, Windows) while developing. If you run your trading bot on a remote VPS (AWS, DigitalOcean, Hetzner), you can either run Algorb on the same VPS and access it securely via Tailscale / WireGuard / SSH tunneling, or host the dashboard on your local machine and stream telemetry from your VPS over TLS.",
  },
  {
    id: "is-it-self-hosted",
    category: "Security",
    question: "Is it self-hosted? Who has access to my data?",
    answer: "Algorb is 100% self-hosted. There are no central Algorb cloud servers intercepting your data, no analytics trackers harvesting your portfolio equity, and no external telemetry relays. All data stays between your bot process and your browser on your own private network.",
  },
  {
    id: "can-i-modify-the-dashboard",
    category: "General",
    question: "Can I modify the dashboard?",
    answer: "Yes. Algorb is delivered with clean, modern TypeScript/React source code and modular component architecture. You can adjust colors, add bespoke metric widgets, create custom charting overlays, or modify layouts to match your unique strategy requirements.",
  },
  {
    id: "what-does-view-include",
    category: "Products",
    question: "What does Algorb View include?",
    answer: "Algorb View is our dedicated monitoring solution. It includes real-time equity & drawdown curves, multi-asset position inventory, live execution order flow, slippage analytics, multi-strategy attribution, bot heartbeat and system resource monitors, and 6 switchable visual themes. It uses a strictly read-only adapter, guaranteeing zero execution capabilities.",
  },
  {
    id: "what-does-control-include",
    category: "Products",
    question: "What does Algorb Control include?",
    answer: "Algorb Control includes everything in View, plus a bidirectional command bus: an immediate Emergency Kill-Switch (flatten positions & cancel resting orders), runtime strategy pause/resume/step controls, per-symbol trading toggles, parameter tuning, and cryptographically signed command verification (HMAC-SHA256).",
  },
  {
    id: "how-does-the-integration-work",
    category: "Integration",
    question: "How does the integration work under the hood?",
    answer: "Your bot imports a lightweight helper adapter (e.g. `algorb-python`). Whenever your bot receives a fill, updates its balance, or calculates risk metrics, it calls `algorb.emit_telemetry(data)`. The adapter serves a local WebSocket server (default port 9042). The Algorb frontend connects to this WebSocket and renders the data in real-time.",
  },
  {
    id: "what-happens-after-purchase",
    category: "General",
    question: "What happens after purchase?",
    answer: "Upon release, you will receive instant access to download the full software archive, perpetual license key, source repository access, documentation package, and adapter SDKs. You also receive access to all point-release updates and theme expansions within your licensed version.",
  },
];
