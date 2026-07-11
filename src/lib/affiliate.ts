const DEFAULT_MARKER = "730324";
const DEFAULT_TRS = "531109";

export function getAffiliateMarker(): string {
  return process.env.NEXT_PUBLIC_AVIASALES_MARKER || DEFAULT_MARKER;
}

export function getAffiliateTrs(): string {
  return process.env.NEXT_PUBLIC_AVIASALES_TRS || DEFAULT_TRS;
}

/** Aviasales homepage — force English / UK market (avoid .ru redirect) */
export function getAffiliateHomeLink(): string {
  const marker = getAffiliateMarker();
  const qs = new URLSearchParams({
    marker,
    language: "en",
    currency: "gbp",
    market: "uk",
  });
  return `https://www.aviasales.com/?${qs.toString()}`;
}

/** Default depart date ~3 weeks out, as DDMM (Aviasales path format). */
function getDefaultDepartDdmmy(): string {
  const d = new Date();
  d.setDate(d.getDate() + 21);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}${mm}`;
}

/**
 * Pre-filled Aviasales search on the English site.
 * Path format: /search/{ORIGIN}{DDMM}{DEST}1  (one-way with a sample date)
 * Example: /search/LON1508LIS1 = London → Lisbon on 15 Aug, one-way
 */
export function getAffiliateSearchLink(
  destinationIata: string,
  originIata = "LON",
): string {
  const marker = getAffiliateMarker();
  const origin = originIata.toUpperCase();
  const dest = destinationIata.toUpperCase();
  const ddmmy = getDefaultDepartDdmmy();
  // Trailing "1" = one-way
  const searchSlug = `${origin}${ddmmy}${dest}1`;
  const qs = new URLSearchParams({
    marker,
    language: "en",
    currency: "gbp",
    market: "uk",
  });
  return `https://www.aviasales.com/search/${searchSlug}?${qs.toString()}`;
}

/** Travelpayouts Aviasales search widget script URL */
export function getWidgetScriptSrc(): string {
  const marker = getAffiliateMarker();
  const trs = getAffiliateTrs();
  const params = new URLSearchParams({
    currency: "gbp",
    trs,
    shmarker: marker,
    show_hotels: "false",
    powered_by: "true",
    locale: "en",
    searchUrl: "www.aviasales.com/search",
    primary_override: "#0D9488",
    color_button: "#0D9488",
    color_icons: "#0B1F33",
    dark: "#0B1F33",
    light: "#FFFFFF",
    secondary: "#16324A",
    special: "#C4C4C4",
    color_focused: "#0D9488",
    border_radius: "6",
    plain: "true",
    promo_id: "7879",
    campaign_id: "100",
  });
  return `https://tpwgt.com/content?${params.toString()}`;
}

/**
 * Kiwi.com Specific Route widget (Travelpayouts promo_id=4484).
 * Override with NEXT_PUBLIC_KIWI_WIDGET_SRC if you regenerate the embed.
 */
export function getKiwiWidgetScriptSrc(): string {
  const raw = process.env.NEXT_PUBLIC_KIWI_WIDGET_SRC?.trim();
  if (raw) {
    const match = raw.match(/src=["']([^"']+)["']/i);
    return match?.[1] || raw;
  }

  const marker = getAffiliateMarker();
  const trs = getAffiliateTrs();
  const params = new URLSearchParams({
    currency: "gbp",
    trs,
    shmarker: marker,
    powered_by: "true",
    locale: "en",
    campaign_id: "111",
    promo_id: "4484",
  });
  return `https://tpwgt.com/content?${params.toString()}`;
}

/** Tracked Kiwi.com deep link (fallback CTA next to the widget) */
export function getKiwiDeepLink(from = "LON", to = "PAR"): string {
  const marker = getAffiliateMarker();
  const kiwiSearch = encodeURIComponent(
    `https://www.kiwi.com/deep?from=${from}&to=${to}&currency=gbp&locale=en`,
  );
  return `https://c111.travelpayouts.com/click?shmarker=${marker}&promo_id=3791&source_type=customlink&type=click&custom_url=${kiwiSearch}`;
}
