# Welcome to StratDesk Pro 🚀

Thank you for purchasing **StratDesk Pro**! 

You now own the complete source code to your institutional trading dashboard and command center. It runs 100% locally on your computer with zero external servers and zero tracking.

Here is the quickest way to get up and running.

---

## 🤖 Step 1: Connect Your Trading Bot Using AI (Easiest Method)

**You do NOT have to write complex code by hand to connect your bot.**

StratDesk Pro comes with built-in AI instruction files (`STRATDESK_SPEC.md`, `.cursorrules`, `CLAUDE.md`, `.windsurfrules`, `.github/copilot-instructions.md`, etc.). These files teach your AI code assistant exactly how to link the dashboard to your bot without breaking anything.

### Works With Any AI Tool:
- **Cursor IDE**
- **Claude Code (Anthropic)**
- **Windsurf (Cascade)**
- **GitHub Copilot / OpenAI Codex**
- **Google Antigravity / Gemini**
- **ChatGPT / Open Code / Aider**

### How to Connect in 3 Simple Steps:

1. **Unzip** `stratdesk-pro.zip` on your computer.
2. **Open your AI code editor** (e.g. Cursor, Windsurf, or VS Code) and open **both** folders in your workspace:
   - Your trading bot's codebase
   - Your extracted `stratdesk-pro` folder
3. **Copy and paste this exact prompt** into your AI chat:

> *"Here is my trading bot codebase and the StratDesk Pro integration rules. Please mould the dashboard for my bot: map my balance, open positions, and order execution fills to the 6 metric cards and /api/ledger, connect the emergency kill-switch to my order cancel functions, and generate a simple, non-blocking bridge adapter for my bot."*

### What the AI Will Automatically Do:
- Read the built-in rules file (`STRATDESK_SPEC.md`).
- Inspect your bot to find your account balance, active positions, and trade execution events.
- Update the 6 top metric cards on the dashboard so they display your bot's real numbers.
- Connect the **EMERGENCY HALT** button on the dashboard to your bot's cancel-all and flatten commands.
- Create a simple, lightweight bridge file (like `stratdesk_bridge.py` or `.ts`) that sends your bot's fills to the local dashboard with zero lag.

---

## ⚡ Step 2: Launch the Dashboard (Takes 60 Seconds)

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or newer).

1. **Open a terminal** (Command Prompt, PowerShell, or macOS/Linux terminal) inside your `stratdesk-pro` folder.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the local server:**
   ```bash
   npm run dev
   ```
4. Open your web browser and go to:
   👉 **http://localhost:3000**

You will see your live StratDesk Pro command center running on your screen!

---

## 🐍 Step 3: See a Test Trade in Real-Time

Want to verify how your dashboard receives execution data? StratDesk Pro includes a ready-to-run Python test script.

1. Keep your dashboard running in your first terminal.
2. Open a **second terminal** window inside the same `stratdesk-pro` folder.
3. Run the test script:
   ```bash
   python scripts/bot_adapter.py
   ```
4. Look at your browser or open:
   👉 **http://localhost:3000/ledger**

You will immediately see an audited test trade recorded with real-time slippage, entry/exit prices, and risk metrics.

---

## 🛠️ Handy Things to Try on Your Dashboard

- **Switch Between 20 Bot Archetypes:** Click the **ARCHITECTURE** dropdown in the top header of the dashboard to try out 20 specialized layouts (Crypto Arbitrage, FTMO Prop Firm, DEX Sniper, Market Maker, Options Cockpit, etc.).
- **Change Color Themes:** Click the **THEME** dropdown in the top header to switch between 6 precision color palettes (Terminal Green, Obsidian Cyan, Quant Purple, Command Amber, Vector Emerald, or Daylight Studio Light Mode).
- **Test the Kill-Switch:** Click the red **FLATTEN & HALT** button in the Control Bar to test the emergency circuit breaker interface.
- **Inspect the Trade Ledger:** Visit **http://localhost:3000/ledger** to search past trades, filter by market regime, and export data to CSV.

---

## 🔒 Privacy & Data Security

- **100% Local Execution:** Everything runs locally on your machine (`127.0.0.1`).
- **Zero Cloud Servers:** Your trade data, positions, and strategies never touch our servers or any third party.
- **No Exchange API Keys Needed in the Dashboard:** Your bot keeps its own exchange keys safely in your bot code. StratDesk only displays telemetry.

---

## 💬 Questions or Need Help?

If you ever have questions about setting up your bot, need help with custom widgets, or want guidance with your AI assistant:

📧 **Official Engineering Support:** [stratdesk.pro@gmail.com](mailto:stratdesk.pro@gmail.com)

We are here to help you get your bot fully operational. Enjoy your new command center!
