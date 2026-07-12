/**
 * Edge-compatible session verification for middleware (Web Crypto).
 * Keep in sync with Node HMAC logic in auth.ts.
 */

export const ADMIN_SESSION_COOKIE = "aeroswift_admin_session";

function toBase64Url(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toBase64Url(sig);
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function verifySessionTokenEdge(
  token: string | undefined | null,
  secret: string | undefined,
): Promise<boolean> {
  if (!token || !secret) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = await sign(payload, secret);

  if (!timingSafeEqualString(signature, expected)) {
    return false;
  }

  const [, expRaw] = payload.split(":");
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) {
    return false;
  }

  return true;
}
