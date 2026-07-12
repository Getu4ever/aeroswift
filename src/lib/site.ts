/**
 * Prefer www — Vercel redirects apex → www, so canonicals must match the
 * live host or SEO tools flag a mismatch.
 */
function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.replace(/\/$/, "");
  try {
    const url = new URL(trimmed);
    if (url.hostname === "aeroswift.co.uk") {
      url.hostname = "www.aeroswift.co.uk";
      return url.origin;
    }
    return url.origin;
  } catch {
    return trimmed;
  }
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return normalizeSiteUrl(fromEnv || "https://www.aeroswift.co.uk");
}

export function getSupportEmail(): string {
  return process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@aeroswift.co.uk";
}
