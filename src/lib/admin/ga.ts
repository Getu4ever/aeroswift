export type GaTopRow = { label: string; value: number };

export type GaPeriodMetrics = {
  activeUsers: number;
  sessions: number;
  pageViews: number;
};

export type GaDashboardResult =
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
      last7: GaPeriodMetrics;
      last28: GaPeriodMetrics;
      topPages: GaTopRow[];
      topSources: GaTopRow[];
    };

function setupSteps(): string[] {
  return [
    "Create a Google Cloud service account and enable the Google Analytics Data API",
    "Download a JSON key; copy client_email → GA_CLIENT_EMAIL and private_key → GA_PRIVATE_KEY",
    "In GA4 Admin → Property access, add the service account email as Viewer",
    "Set GA_PROPERTY_ID to the numeric property ID (Admin → Property settings), not the G- measurement ID",
  ];
}

function readMetrics(
  rows: Array<{ metricValues?: Array<{ value?: string | null }> | null }> | null | undefined,
): GaPeriodMetrics {
  const values = rows?.[0]?.metricValues ?? [];
  return {
    activeUsers: Number(values[0]?.value ?? 0),
    sessions: Number(values[1]?.value ?? 0),
    pageViews: Number(values[2]?.value ?? 0),
  };
}

function rowsToTop(
  rows:
    | Array<{
        dimensionValues?: Array<{ value?: string | null }> | null;
        metricValues?: Array<{ value?: string | null }> | null;
      }>
    | null
    | undefined,
  limit = 8,
): GaTopRow[] {
  if (!rows?.length) return [];
  return rows.slice(0, limit).map((row) => ({
    label: row.dimensionValues?.[0]?.value || "(not set)",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

export function isGaConfigured(): boolean {
  return Boolean(
    process.env.GA_PROPERTY_ID?.trim() &&
      process.env.GA_CLIENT_EMAIL?.trim() &&
      process.env.GA_PRIVATE_KEY?.trim(),
  );
}

export async function getGaDashboard(): Promise<GaDashboardResult> {
  if (!isGaConfigured()) {
    return { status: "unconfigured", setup: setupSteps() };
  }

  const propertyId = process.env.GA_PROPERTY_ID!.trim();
  const clientEmail = process.env.GA_CLIENT_EMAIL!.trim();
  const privateKey = process.env.GA_PRIVATE_KEY!.replace(/\\n/g, "\n");

  try {
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });

    const property = `properties/${propertyId}`;
    const coreMetrics = [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
    ];

    const [[report7], [report28], [pages], [sources]] = await Promise.all([
      client.runReport({
        property,
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: coreMetrics,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        metrics: coreMetrics,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 8,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
    ]);

    return {
      status: "ok",
      last7: readMetrics(report7.rows),
      last28: readMetrics(report28.rows),
      topPages: rowsToTop(pages.rows),
      topSources: rowsToTop(sources.rows),
    };
  } catch (err) {
    return {
      status: "error",
      error:
        err instanceof Error ? err.message : "Google Analytics request failed",
    };
  }
}
