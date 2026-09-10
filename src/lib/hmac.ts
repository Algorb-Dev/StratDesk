/**
 * StratDesk Pro // Cryptographic Command Bus & HMAC-SHA256 Protocol
 *
 * Implements bidirectional cryptographically signed command dispatching and
 * payload verification to prevent unauthorized order execution, replay attacks,
 * and command injection over local or network sockets.
 */

export const DEFAULT_STRATDESK_SECRET =
  process.env.STRATDESK_SECRET || "stratdesk_local_master_secret_v1";

// In-memory replay cache to protect against replay attacks (cleared periodically)
const usedNonces = new Set<string>();
const NONCE_MAX_AGE_MS = 60_000; // 60 seconds tolerance

// Periodic cleanup of stale nonces
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    if (usedNonces.size > 1000) {
      usedNonces.clear();
    }
  }, 120_000);
}

/**
 * Universal HMAC-SHA256 calculation (works in Node.js, Next.js Edge, and Browser WebCrypto)
 */
export async function computeHmacSha256(message: string, secret: string): Promise<string> {
  // Check if running in Node.js environment
  if (typeof window === "undefined") {
    try {
      const crypto = await import("crypto");
      return crypto.createHmac("sha256", secret).update(message).digest("hex");
    } catch {
      // Fallback to WebCrypto if dynamic import fails
    }
  }

  // WebCrypto implementation for Browser and Edge runtimes
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const signatureBytes = new Uint8Array(signatureBuffer);

  return Array.from(signatureBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export interface SignedCommandPayload {
  action: string;
  params: Record<string, unknown>;
  timestamp: number;
  nonce: string;
  signature: string;
}

/**
 * Signs a command payload using HMAC-SHA256 with timestamp and unique nonce
 */
export async function signCommand(
  action: string,
  params: Record<string, unknown> = {},
  secret: string = DEFAULT_STRATDESK_SECRET
): Promise<SignedCommandPayload> {
  const timestamp = Date.now();
  const nonce = `${timestamp}-${Math.random().toString(36).substring(2, 11)}`;
  const canonicalString = `${timestamp}:${nonce}:${action}:${JSON.stringify(params)}`;
  const signature = await computeHmacSha256(canonicalString, secret);

  return {
    action,
    params,
    timestamp,
    nonce,
    signature,
  };
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
  action?: string;
  timestamp?: number;
  nonce?: string;
  signature?: string;
}

/**
 * Verifies an incoming command against HMAC-SHA256 signature and replay prevention
 */
export async function verifyCommandSignature(
  action: string,
  params: Record<string, unknown>,
  timestamp: number,
  nonce: string,
  providedSignature: string,
  secret: string = DEFAULT_STRATDESK_SECRET
): Promise<VerificationResult> {
  // 1. Check required headers
  if (!providedSignature || !timestamp || !nonce || !action) {
    return {
      valid: false,
      error: "Missing required HMAC security headers (signature, timestamp, nonce, action)",
    };
  }

  // 2. Replay attack protection: check timestamp drift
  const now = Date.now();
  if (Math.abs(now - timestamp) > NONCE_MAX_AGE_MS) {
    return {
      valid: false,
      error: `Command expired: timestamp drift (${Math.abs(now - timestamp)}ms) exceeds limit of ${NONCE_MAX_AGE_MS}ms`,
    };
  }

  // 3. Replay attack protection: check nonce deduplication
  if (usedNonces.has(nonce)) {
    return {
      valid: false,
      error: `Replay attack detected: nonce '${nonce}' has already been processed`,
    };
  }

  // 4. Compute expected signature
  const canonicalString = `${timestamp}:${nonce}:${action}:${JSON.stringify(params)}`;
  const expectedSignature = await computeHmacSha256(canonicalString, secret);

  // 5. Constant-time comparison
  const isValid = timingSafeEqual(expectedSignature, providedSignature);

  if (!isValid) {
    return {
      valid: false,
      error: "Invalid HMAC-SHA256 signature: payload has been modified or secret mismatch",
    };
  }

  // Record nonce as used
  usedNonces.add(nonce);

  return {
    valid: true,
    action,
    timestamp,
    nonce,
    signature: providedSignature,
  };
}

/**
 * Constant-time string comparison to mitigate timing analysis attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
