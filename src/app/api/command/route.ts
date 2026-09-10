import { NextRequest } from "next/server";
import { verifyCommandSignature, DEFAULT_STRATDESK_SECRET } from "@/lib/hmac";

/**
 * POST /api/command
 *
 * Cryptographically verified Command Bus endpoint for StratDesk Pro.
 * Dispatches atomic intervention commands (Emergency Halt, Pause, Resume, Hot Parameter Reload)
 * with mandatory HMAC-SHA256 signature verification and anti-replay protection.
 */
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const startMs = Date.now();

  try {
    const rawData = await req.json();

    if (!rawData || typeof rawData !== "object") {
      return Response.json(
        { success: false, error: "Invalid command payload: must be a JSON object" },
        { status: 400 }
      );
    }

    const action = typeof rawData.action === "string" ? rawData.action : "";
    const params = (typeof rawData.params === "object" && rawData.params !== null)
      ? (rawData.params as Record<string, unknown>)
      : {};

    // Read security headers or fallback to payload fields
    const signature =
      req.headers.get("x-stratdesk-signature") ||
      (typeof rawData.signature === "string" ? rawData.signature : "");

    const timestamp = Number(
      req.headers.get("x-stratdesk-timestamp") || rawData.timestamp || 0
    );

    const nonce =
      req.headers.get("x-stratdesk-nonce") ||
      (typeof rawData.nonce === "string" ? rawData.nonce : "");

    if (!action) {
      return Response.json(
        { success: false, error: "Missing required 'action' in command payload" },
        { status: 400 }
      );
    }

    // Perform cryptographic HMAC-SHA256 verification
    const verification = await verifyCommandSignature(
      action,
      params,
      timestamp,
      nonce,
      signature,
      DEFAULT_STRATDESK_SECRET
    );

    if (!verification.valid) {
      console.warn(`[STRATDESK SECURITY ALERT] Rejected unauthorized command: ${action}`);
      console.warn(`  Reason: ${verification.error}`);
      console.warn(`  Signature: ${signature}`);
      console.warn(`  Nonce: ${nonce}`);

      return Response.json(
        {
          success: false,
          verified: false,
          error: verification.error,
          rejectedAction: action,
        },
        { status: 401 }
      );
    }

    const latencyMs = +(Date.now() - startMs).toFixed(2);

    // Cryptographic audit log output
    console.log(`\n======================================================`);
    console.log(`[STRATDESK COMMAND BUS // HMAC-SHA256 VERIFIED ✓]`);
    console.log(`  Action: ${action}`);
    console.log(`  Nonce: ${nonce}`);
    console.log(`  Signature: ${signature.slice(0, 16)}...${signature.slice(-8)}`);
    console.log(`  Timestamp: ${new Date(timestamp).toISOString()}`);
    console.log(`  Parameters: ${JSON.stringify(params)}`);
    console.log(`  Verification Latency: ${latencyMs}ms`);
    console.log(`======================================================\n`);

    // Simulated execution actions
    let actionResult = "DISPATCHED";
    if (action === "EMERGENCY_HALT") {
      actionResult = "ORDERS_CANCELED_RISK_FLATTENED";
    } else if (action === "PAUSE_EXECUTION") {
      actionResult = "WORKERS_PAUSED_SOFT_DRAIN";
    } else if (action === "RESUME_EXECUTION") {
      actionResult = "ALL_WORKERS_ACTIVE";
    } else if (action === "HOT_RELOAD_PARAMS") {
      actionResult = "PARAMETERS_APPLIED";
    }

    return Response.json(
      {
        success: true,
        verified: true,
        action,
        status: actionResult,
        signatureSnippet: `${signature.slice(0, 12)}...`,
        timestamp,
        latencyMs,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal command dispatch error";
    console.error("[STRATDESK COMMAND BUS ERROR]:", message);
    return Response.json(
      { success: false, verified: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/command
 * Security status and protocol specs for bot adapters
 */
export async function GET() {
  return Response.json({
    status: "active",
    service: "StratDesk Pro Cryptographic Command Bus",
    protocol: "HMAC-SHA256 Signed RPC",
    replayProtection: "Active (60s window + nonce deduplication)",
    actionsSupported: [
      "EMERGENCY_HALT",
      "PAUSE_EXECUTION",
      "RESUME_EXECUTION",
      "HOT_RELOAD_PARAMS",
      "TOGGLE_STRATEGY",
    ],
  });
}
