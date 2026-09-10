import { NextRequest } from "next/server";
import { TradeLedgerEntry } from "@/data/ledger-data";
import { computeHmacSha256, DEFAULT_STRATDESK_SECRET } from "@/lib/hmac";

/**
 * Validates and normalizes incoming trade payload into strict TradeLedgerEntry
 */
function validateAndNormalizeTrade(data: Record<string, unknown>): {
  isValid: boolean;
  errors: string[];
  payload?: TradeLedgerEntry;
} {
  const errors: string[] = [];

  const id = typeof data.id === "string" && data.id.trim()
    ? data.id
    : typeof data.ticket === "string" && data.ticket.trim()
    ? data.ticket
    : "";

  if (!id) errors.push("Missing required field: 'id' or 'ticket'");

  const direction = data.direction === "SHORT" ? "SHORT" : data.direction === "LONG" ? "LONG" : null;
  if (!direction) errors.push("Field 'direction' must be 'LONG' or 'SHORT'");

  const entryPrice = typeof data.entryPrice === "number" && !isNaN(data.entryPrice)
    ? data.entryPrice
    : Number(data.entryPrice);
  if (isNaN(entryPrice) || entryPrice <= 0) errors.push("Field 'entryPrice' must be a positive number");

  const exitPrice = typeof data.exitPrice === "number" && !isNaN(data.exitPrice)
    ? data.exitPrice
    : Number(data.exitPrice);
  if (isNaN(exitPrice) || exitPrice <= 0) errors.push("Field 'exitPrice' must be a positive number");

  const pnl = typeof data.pnl === "number" && !isNaN(data.pnl)
    ? data.pnl
    : Number(data.pnl);
  if (isNaN(pnl)) errors.push("Field 'pnl' must be a valid number");

  const size = typeof data.size === "string" && data.size.trim()
    ? data.size
    : typeof data.size === "number"
    ? `${data.size}`
    : "1.00 UNIT";

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const symbol = typeof data.symbol === "string" && data.symbol.trim() ? data.symbol : "BTC-PERP";
  const strategy = typeof data.strategy === "string" && data.strategy.trim() ? data.strategy : "Spread Arbitrage";
  const marketRegime = typeof data.marketRegime === "string" && data.marketRegime.trim()
    ? data.marketRegime
    : typeof data.regime === "string" && data.regime.trim()
    ? data.regime
    : "Bullish Trend";

  const pnlPercent = typeof data.pnlPercent === "number"
    ? data.pnlPercent
    : typeof data.returnPct === "number"
    ? data.returnPct
    : ((exitPrice - entryPrice) / entryPrice) * (direction === "LONG" ? 100 : -100);

  const slippage = typeof data.slippage === "string" && data.slippage.trim()
    ? data.slippage
    : typeof data.slippageBps === "number"
    ? `${data.slippageBps > 0 ? "+" : ""}${data.slippageBps} bps`
    : "0.0 bps";

  const rawTelemetry = (typeof data.telemetry === "object" && data.telemetry !== null)
    ? (data.telemetry as Record<string, unknown>)
    : {};

  const zScore = typeof rawTelemetry.zScore === "number"
    ? rawTelemetry.zScore
    : typeof data.zScore === "number"
    ? data.zScore
    : 2.5;

  const signalConfidence = typeof rawTelemetry.signalConfidence === "number"
    ? rawTelemetry.signalConfidence
    : typeof data.confidence === "number"
    ? data.confidence
    : 0.92;

  const executionLatencyMs = typeof rawTelemetry.executionLatencyMs === "number"
    ? rawTelemetry.executionLatencyMs
    : 1.2;

  const bookDepthRatio = typeof rawTelemetry.bookDepthRatio === "number"
    ? rawTelemetry.bookDepthRatio
    : 2.4;

  const now = new Date();
  const entryTime = typeof data.entryTime === "string" && data.entryTime.trim()
    ? data.entryTime
    : now.toISOString().replace("T", " ").slice(0, 19);

  const exitTime = typeof data.exitTime === "string" && data.exitTime.trim()
    ? data.exitTime
    : now.toISOString().replace("T", " ").slice(0, 19);

  const duration = typeof data.duration === "string" && data.duration.trim()
    ? data.duration
    : "1h 30m";

  const rMultiple = typeof data.rMultiple === "number"
    ? data.rMultiple
    : pnl > 0 ? 3.0 : -1.0;

  const fees = typeof data.fees === "number"
    ? data.fees
    : 5.0;

  const notionalValue = typeof data.notionalValue === "number"
    ? data.notionalValue
    : entryPrice * 1.5;

  const orderType = data.orderType === "IOC_CROSS" || data.orderType === "TWAP"
    ? data.orderType
    : "LIMIT_MAKER";

  const status = data.status === "OPEN" ? "OPEN" : "CLOSED";

  const tags = Array.isArray(data.tags)
    ? data.tags.map((t) => String(t))
    : ["#bot-execution", "#telemetry-verified"];

  const notes = typeof data.notes === "string"
    ? data.notes
    : "Algorithmic execution ingested via local bot adapter pipeline.";

  const normalized: TradeLedgerEntry = {
    id,
    ticket: id,
    symbol,
    direction: direction as "LONG" | "SHORT",
    leverage: typeof data.leverage === "string" ? data.leverage : "5x",
    strategy,
    marketRegime,
    regime: marketRegime,
    entryPrice,
    exitPrice,
    size,
    notionalValue,
    entryTime,
    exitTime,
    duration,
    pnl,
    pnlPercent,
    returnPct: pnlPercent,
    rMultiple,
    fees,
    slippage,
    slippageBps: typeof data.slippageBps === "number" ? data.slippageBps : undefined,
    orderType,
    status,
    tags,
    notes,
    telemetry: {
      zScore,
      signalConfidence,
      executionLatencyMs,
      bookDepthRatio,
    },
    zScore,
    confidence: signalConfidence,
  };

  return { isValid: true, errors: [], payload: normalized };
}

/**
 * POST /api/ledger
 * Ingestion endpoint for algorithmic trading bots to push audited trade telemetry
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawText = await req.text();
    let rawData: Record<string, unknown>;

    try {
      rawData = JSON.parse(rawText);
    } catch {
      return Response.json(
        { success: false, error: "Invalid payload: request body must be valid JSON" },
        { status: 400 }
      );
    }

    if (!rawData || typeof rawData !== "object") {
      return Response.json(
        { success: false, error: "Invalid payload: request body must be a JSON object" },
        { status: 400 }
      );
    }

    // Optional cryptographic HMAC-SHA256 verification if headers are provided
    const signature = req.headers.get("x-stratdesk-signature") || "";
    const timestamp = Number(req.headers.get("x-stratdesk-timestamp") || 0);
    const nonce = req.headers.get("x-stratdesk-nonce") || "";
    let hmacVerified = false;

    if (signature) {
      if (!timestamp || !nonce) {
        return Response.json(
          { success: false, error: "Missing required 'x-stratdesk-timestamp' or 'x-stratdesk-nonce' headers for signed ingestion" },
          { status: 401 }
        );
      }
      const canonical = `${timestamp}:${nonce}:INGEST_TRADE:${rawText}`;
      const expected = await computeHmacSha256(canonical, DEFAULT_STRATDESK_SECRET);

      if (expected !== signature) {
        return Response.json(
          { success: false, error: "Cryptographic HMAC-SHA256 signature mismatch: trade payload was altered or secret key is invalid" },
          { status: 401 }
        );
      }
      hmacVerified = true;
    }

    const { isValid, errors, payload } = validateAndNormalizeTrade(
      rawData as Record<string, unknown>
    );

    if (!isValid || !payload) {
      return Response.json(
        { success: false, errors },
        { status: 422 }
      );
    }

    // Simulate database / IPC event bus ingestion with forensic logging
    console.log(`\n======================================================`);
    console.log(`[STRATDESK LEDGER INGESTION] New trade execution recorded: ${payload.id}`);
    console.log(`  Ticket: ${payload.ticket || payload.id}`);
    console.log(`  Asset: ${payload.symbol} | Direction: ${payload.direction} ${payload.leverage}`);
    console.log(`  Size: ${payload.size} | Notional: $${payload.notionalValue.toFixed(2)}`);
    console.log(`  Entry: $${payload.entryPrice.toFixed(2)} -> Exit: $${payload.exitPrice.toFixed(2)}`);
    console.log(`  Net Realized PnL: $${payload.pnl.toFixed(2)} (${payload.pnlPercent.toFixed(2)}%) | ${payload.rMultiple}R`);
    console.log(`  Security: ${hmacVerified ? "HMAC-SHA256 VERIFIED ✓" : "LOCAL IPC (OPEN)"}`);
    console.log(`  Regime: ${payload.marketRegime} | Strategy: ${payload.strategy}`);
    console.log(`  Forensic Telemetry:`);
    console.log(`    • Model Z-Score: ${payload.telemetry.zScore}σ`);
    console.log(`    • Signal Confidence: ${(payload.telemetry.signalConfidence * 100).toFixed(1)}%`);
    console.log(`    • Dispatch Latency: ${payload.telemetry.executionLatencyMs}ms`);
    console.log(`    • Book Depth Imbalance: ${payload.telemetry.bookDepthRatio}x`);
    console.log(`  Notes: "${payload.notes}"`);
    console.log(`======================================================\n`);

    return Response.json(
      {
        success: true,
        recordedId: payload.id,
        hmacVerified,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[STRATDESK LEDGER INGESTION ERROR]:", message);
    return Response.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ledger
 * Health check & schema documentation for bot adapters
 */
export async function GET() {
  return Response.json({
    status: "online",
    service: "StratDesk Pro Trade Ledger Ingestion API",
    endpoint: "POST /api/ledger",
    version: "1.0.0",
    protocol: "IPC/HTTP REST",
  });
}
