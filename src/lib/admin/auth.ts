import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "aeroswift_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still run a compare to reduce timing variance on length mismatch
    timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
    return false;
  }
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }

  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload);

  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return false;
    }
  } catch {
    return false;
  }

  const [, expRaw] = payload.split(":");
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || Date.now() > exp) {
    return false;
  }

  return true;
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
