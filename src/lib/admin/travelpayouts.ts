const TP_FINANCE = "https://api.travelpayouts.com/finance/v2";
const TP_STATS = "https://api.travelpayouts.com/statistics/v1";

export type TravelpayoutsPeriod =
  | "today"
  | "yesterday"
  | "this_month"
  | "last_month";

export type TravelpayoutsBalance = {
  usd?: string;
  eur?: string;
  rub?: string;
  gbp?: string;
  [currency: string]: string | undefined;
};

export type TravelpayoutsPayment = {
  paid_at: string;
  payment_uuid: string;
  amount: string;
  currency: string;
  payment_info_id?: number;
  comment?: string;
};

export type TravelpayoutsDayPoint = {
  date: string;
  clicks: number;
  bookings: number;
  earnings: number;
  potentialEarnings: number;
};

export type TravelpayoutsProgramRow = {
  campaignId: number;
  name: string;
  clicks: number;
  bookings: number;
  earnings: number;
  potentialEarnings: number;
};

export type TravelpayoutsBookingUpdate = {
  actionId: string;
  date: string;
  program: string;
  state: string;
  description: string;
  profit: number;
  potentialProfit: number;
  price: number;
};

export type TravelpayoutsPeriodTotals = {
  clicks: number;
  bookings: number;
  earnings: number;
  potentialEarnings: number;
  conversionRate: number;
};

export type TravelpayoutsResult =
  | {
      status: "unconfigured";
      setup: string[];
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "ok";
      currency: string;
      period: TravelpayoutsPeriod;
      periodLabel: string;
      rangeLabel: string;
      compareLabel: string;
      balance: TravelpayoutsBalance | null;
      nextPayout: TravelpayoutsBalance | null;
      payments: TravelpayoutsPayment[];
      totals: TravelpayoutsPeriodTotals;
      previousTotals: TravelpayoutsPeriodTotals;
      clicksByDay: TravelpayoutsDayPoint[];
      programs: TravelpayoutsProgramRow[];
      bookingUpdates: TravelpayoutsBookingUpdate[];
    };

const CAMPAIGN_NAMES: Record<number, string> = {
  100: "Aviasales",
  111: "Kiwi.com",
  43: "Booking.com",
  84: "Booking.com",
  140: "Klook",
};

function setupSteps(): string[] {
  return [
    "Open Travelpayouts → Profile → API token",
    "Copy the token into TRAVELPAYOUTS_API_TOKEN (server-only, never NEXT_PUBLIC_)",
    "Redeploy or restart the app so the env var is available",
  ];
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatRangeLabel(from: string, to: string): string {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${fmt.format(new Date(`${from}T00:00:00Z`))} – ${fmt.format(new Date(`${to}T00:00:00Z`))}`;
}

function periodHeading(period: TravelpayoutsPeriod, from: string): string {
  if (period === "today") return "Today";
  if (period === "yesterday") return "Yesterday";
  const month = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${from}T00:00:00Z`));
  return month;
}

export function resolvePeriodRange(
  period: TravelpayoutsPeriod,
  now = new Date(),
): {
  from: string;
  to: string;
  prevFrom: string;
  prevTo: string;
  periodLabel: string;
  rangeLabel: string;
  compareLabel: string;
} {
  const today = startOfUtcDay(now);

  if (period === "today") {
    const from = isoDate(today);
    const yesterday = addDays(today, -1);
    return {
      from,
      to: from,
      prevFrom: isoDate(yesterday),
      prevTo: isoDate(yesterday),
      periodLabel: "Today",
      rangeLabel: formatRangeLabel(from, from),
      compareLabel: `Compared to ${formatRangeLabel(isoDate(yesterday), isoDate(yesterday))}`,
    };
  }

  if (period === "yesterday") {
    const y = addDays(today, -1);
    const from = isoDate(y);
    const prev = addDays(y, -1);
    return {
      from,
      to: from,
      prevFrom: isoDate(prev),
      prevTo: isoDate(prev),
      periodLabel: "Yesterday",
      rangeLabel: formatRangeLabel(from, from),
      compareLabel: `Compared to ${formatRangeLabel(isoDate(prev), isoDate(prev))}`,
    };
  }

  if (period === "last_month") {
    const firstThisMonth = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1),
    );
    const firstLastMonth = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1),
    );
    const lastLastMonth = addDays(firstThisMonth, -1);
    const firstPrev = new Date(
      Date.UTC(firstLastMonth.getUTCFullYear(), firstLastMonth.getUTCMonth() - 1, 1),
    );
    const lastPrev = addDays(firstLastMonth, -1);
    const from = isoDate(firstLastMonth);
    const to = isoDate(lastLastMonth);
    return {
      from,
      to,
      prevFrom: isoDate(firstPrev),
      prevTo: isoDate(lastPrev),
      periodLabel: periodHeading("last_month", from),
      rangeLabel: formatRangeLabel(from, to),
      compareLabel: `Compared to ${formatRangeLabel(isoDate(firstPrev), isoDate(lastPrev))}`,
    };
  }

  // this_month
  const first = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  const from = isoDate(first);
  const to = isoDate(today);
  const firstPrev = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1),
  );
  const lastPrev = addDays(first, -1);
  return {
    from,
    to,
    prevFrom: isoDate(firstPrev),
    prevTo: isoDate(lastPrev),
    periodLabel: periodHeading("this_month", from),
    rangeLabel: formatRangeLabel(from, to),
    compareLabel: `Compared to ${formatRangeLabel(isoDate(firstPrev), isoDate(lastPrev))}`,
  };
}

export function parseTravelpayoutsPeriod(
  value: string | undefined | null,
): TravelpayoutsPeriod {
  if (
    value === "today" ||
    value === "yesterday" ||
    value === "this_month" ||
    value === "last_month"
  ) {
    return value;
  }
  return "this_month";
}

async function tpFinanceGet<T>(
  path: string,
  token: string,
  query?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${TP_FINANCE}/${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url.toString(), {
    headers: { "X-Access-Token": token },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Travelpayouts ${path} failed (${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`,
    );
  }
  return (await res.json()) as T;
}

type StatsFilter = {
  field: string;
  op: string;
  value: string | number | string[];
};

async function tpStatsQuery<T extends Record<string, unknown>>(
  token: string,
  body: {
    fields: string[];
    filters: StatsFilter[];
    group?: string[];
    sort?: Array<{ field: string; order: "asc" | "desc" }>;
    offset?: number;
    limit?: number;
  },
): Promise<{ results: T[]; total_rows?: number }> {
  const res = await fetch(`${TP_STATS}/execute_query`, {
    method: "POST",
    headers: {
      "X-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      offset: 0,
      limit: 100,
      ...body,
    }),
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Travelpayouts statistics failed (${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`,
    );
  }
  return (await res.json()) as { results: T[]; total_rows?: number };
}

function dateFilters(from: string, to: string): StatsFilter[] {
  return [
    { field: "date", op: "ge", value: from },
    { field: "date", op: "le", value: to },
  ];
}

function num(value: unknown): number {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function emptyTotals(): TravelpayoutsPeriodTotals {
  return {
    clicks: 0,
    bookings: 0,
    earnings: 0,
    potentialEarnings: 0,
    conversionRate: 0,
  };
}

function rowToTotals(row: Record<string, unknown> | undefined): TravelpayoutsPeriodTotals {
  if (!row) return emptyTotals();
  const clicks = num(row.redirects_count ?? row.clicks_count);
  const bookings =
    num(row.paid_actions_count) + num(row.processing_actions_count);
  const earnings = num(row.paid_profit_usd_sum);
  const potentialEarnings = num(row.processing_profit_usd_sum);
  return {
    clicks,
    bookings,
    earnings,
    potentialEarnings,
    conversionRate: clicks > 0 ? (bookings / clicks) * 100 : 0,
  };
}

function eachDate(from: string, to: string): string[] {
  const dates: string[] = [];
  let cursor = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  while (cursor <= end) {
    dates.push(isoDate(cursor));
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function pickCurrency(balance: TravelpayoutsBalance | null): string {
  if (balance?.gbp) return "gbp";
  if (balance?.usd) return "usd";
  if (balance?.eur) return "eur";
  return "usd";
}

function programName(campaignId: number): string {
  return CAMPAIGN_NAMES[campaignId] || `Campaign ${campaignId}`;
}

export async function getTravelpayoutsDashboard(
  periodInput: TravelpayoutsPeriod = "this_month",
): Promise<TravelpayoutsResult> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN?.trim();
  if (!token) {
    return { status: "unconfigured", setup: setupSteps() };
  }

  const period = periodInput;
  const range = resolvePeriodRange(period);

  try {
    const [
      balanceRes,
      nextPayoutRes,
      payments,
      totalsRes,
      previousRes,
      byDayRes,
      byProgramRes,
      bookingsRes,
    ] = await Promise.all([
      tpFinanceGet<{ balance: TravelpayoutsBalance }>("get_user_balance", token),
      tpFinanceGet<{ next_payout: TravelpayoutsBalance }>(
        "get_user_next_payout",
        token,
      ).catch(() => null),
      tpFinanceGet<TravelpayoutsPayment[]>("get_user_payments", token).catch(
        () => [] as TravelpayoutsPayment[],
      ),
      tpStatsQuery<Record<string, unknown>>(token, {
        fields: [
          "clicks_count",
          "redirects_count",
          "paid_actions_count",
          "processing_actions_count",
          "paid_profit_usd_sum",
          "processing_profit_usd_sum",
        ],
        filters: dateFilters(range.from, range.to),
        limit: 1,
      }),
      tpStatsQuery<Record<string, unknown>>(token, {
        fields: [
          "clicks_count",
          "redirects_count",
          "paid_actions_count",
          "processing_actions_count",
          "paid_profit_usd_sum",
          "processing_profit_usd_sum",
        ],
        filters: dateFilters(range.prevFrom, range.prevTo),
        limit: 1,
      }),
      tpStatsQuery<Record<string, unknown>>(token, {
        fields: [
          "date",
          "clicks_count",
          "redirects_count",
          "paid_actions_count",
          "processing_actions_count",
          "paid_profit_usd_sum",
          "processing_profit_usd_sum",
        ],
        filters: dateFilters(range.from, range.to),
        group: ["date"],
        limit: 100,
      }),
      tpStatsQuery<Record<string, unknown>>(token, {
        fields: [
          "campaign_id",
          "clicks_count",
          "redirects_count",
          "paid_actions_count",
          "processing_actions_count",
          "paid_profit_usd_sum",
          "processing_profit_usd_sum",
        ],
        filters: dateFilters(range.from, range.to),
        group: ["campaign_id"],
        limit: 50,
      }),
      tpStatsQuery<Record<string, unknown>>(token, {
        fields: [
          "action_id",
          "campaign_id",
          "campaign_name_en",
          "date",
          "state",
          "description",
          "paid_profit_usd",
          "processing_profit_usd",
          "price_usd",
        ],
        filters: [
          ...dateFilters(range.from, range.to),
          { field: "type", op: "in", value: ["action", "referral"] },
        ],
        sort: [{ field: "date", order: "desc" }],
        limit: 10,
      }),
    ]);

    const balance = balanceRes.balance ?? null;
    const currency = pickCurrency(balance);
    const totals = rowToTotals(totalsRes.results[0]);
    const previousTotals = rowToTotals(previousRes.results[0]);

    const byDayMap = new Map<string, TravelpayoutsDayPoint>();
    for (const row of byDayRes.results) {
      const date = String(row.date || "");
      if (!date) continue;
      byDayMap.set(date, {
        date,
        clicks: num(row.redirects_count ?? row.clicks_count),
        bookings: num(row.paid_actions_count) + num(row.processing_actions_count),
        earnings: num(row.paid_profit_usd_sum),
        potentialEarnings: num(row.processing_profit_usd_sum),
      });
    }

    const clicksByDay = eachDate(range.from, range.to).map(
      (date) =>
        byDayMap.get(date) || {
          date,
          clicks: 0,
          bookings: 0,
          earnings: 0,
          potentialEarnings: 0,
        },
    );

    const programs = byProgramRes.results
      .map((row) => {
        const campaignId = num(row.campaign_id);
        return {
          campaignId,
          name: programName(campaignId),
          clicks: num(row.redirects_count ?? row.clicks_count),
          bookings:
            num(row.paid_actions_count) + num(row.processing_actions_count),
          earnings: num(row.paid_profit_usd_sum),
          potentialEarnings: num(row.processing_profit_usd_sum),
        };
      })
      .sort((a, b) => b.clicks - a.clicks || b.earnings - a.earnings);

    const bookingUpdates: TravelpayoutsBookingUpdate[] = bookingsRes.results.map(
      (row) => {
        const campaignId = num(row.campaign_id);
        return {
          actionId: String(row.action_id || ""),
          date: String(row.date || ""),
          program:
            String(row.campaign_name_en || "") || programName(campaignId),
          state: String(row.state || ""),
          description: String(row.description || row.action_id || "Booking"),
          profit: num(row.paid_profit_usd),
          potentialProfit: num(row.processing_profit_usd),
          price: num(row.price_usd),
        };
      },
    );

    return {
      status: "ok",
      currency,
      period,
      periodLabel: range.periodLabel,
      rangeLabel: range.rangeLabel,
      compareLabel: range.compareLabel,
      balance,
      nextPayout: nextPayoutRes?.next_payout ?? null,
      payments: Array.isArray(payments) ? payments.slice(0, 10) : [],
      totals,
      previousTotals,
      clicksByDay,
      programs,
      bookingUpdates,
    };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : "Travelpayouts request failed",
    };
  }
}
