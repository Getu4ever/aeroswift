import Link from "next/link";
import type { GaDashboardResult, GaPeriodMetrics, GaTopRow } from "@/lib/admin/ga";
import { getGaDashboard } from "@/lib/admin/ga";
import type {
  TravelpayoutsDayPoint,
  TravelpayoutsPeriod,
  TravelpayoutsPeriodTotals,
  TravelpayoutsResult,
} from "@/lib/admin/travelpayouts";
import {
  getTravelpayoutsDashboard,
  parseTravelpayoutsPeriod,
} from "@/lib/admin/travelpayouts";
import { isAdminPasswordConfigured } from "@/lib/admin/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

const PERIODS: Array<{ id: TravelpayoutsPeriod; label: string }> = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "this_month", label: "This month" },
  { id: "last_month", label: "Last month" },
];

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n);
}

function formatMoney(amount: string | number | undefined, currency: string): string {
  if (amount == null || amount === "") return "—";
  const value = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(value)) return String(amount);
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${amount} ${currency.toUpperCase()}`;
  }
}

function formatPct(n: number): string {
  return `${n.toFixed(n > 0 && n < 1 ? 1 : 0)}%`;
}

function formatShortDay(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function delta(current: number, previous: number): number {
  return current - previous;
}

function DeltaBadge({ value }: { value: number }) {
  if (value === 0) return null;
  const positive = value > 0;
  return (
    <span
      className={`ml-2 text-sm font-medium ${
        positive ? "text-emerald-600" : "text-red-600"
      }`}
    >
      {positive ? "+" : ""}
      {formatNumber(value)}
    </span>
  );
}

function SetupBanner({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-xl border border-dashed border-ink/20 bg-white/70 p-5">
      <p className="font-medium text-ink mb-2">{title}</p>
      <p className="text-sm text-ink/60 mb-3">
        Not configured yet. Add the env vars below, then redeploy.
      </p>
      <ol className="list-decimal list-inside space-y-1.5 text-sm text-ink/75">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
      {message}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-mist bg-white p-4">
      <p className="text-xs uppercase tracking-wider text-ink/45 mb-1">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

function MetricGrid({
  title,
  metrics,
}: {
  title: string;
  metrics: GaPeriodMetrics;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-ink/70 mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard label="Active users" value={formatNumber(metrics.activeUsers)} />
        <MetricCard label="Sessions" value={formatNumber(metrics.sessions)} />
        <MetricCard label="Page views" value={formatNumber(metrics.pageViews)} />
      </div>
    </div>
  );
}

function RankTable({
  title,
  rows,
  valueLabel,
}: {
  title: string;
  rows: GaTopRow[];
  valueLabel: string;
}) {
  return (
    <div className="rounded-xl border border-mist bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-mist">
        <h3 className="text-sm font-medium text-ink">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-6 text-sm text-ink/50">No data yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/45">
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium text-right">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.label}-${row.value}`} className="border-t border-mist">
                <td className="px-4 py-2.5 text-ink/80 truncate max-w-[14rem] md:max-w-md">
                  {row.label}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                  {formatNumber(row.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function GaSection({ data }: { data: GaDashboardResult }) {
  if (data.status === "unconfigured") {
    return <SetupBanner title="Google Analytics" steps={data.setup} />;
  }
  if (data.status === "error") {
    return (
      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          Google Analytics
        </h2>
        <ErrorBanner message={data.error} />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-ink">
        Google Analytics
      </h2>
      <MetricGrid title="Last 7 days" metrics={data.last7} />
      <MetricGrid title="Last 28 days" metrics={data.last28} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RankTable title="Top pages (28 days)" rows={data.topPages} valueLabel="Views" />
        <RankTable
          title="Top sources (28 days)"
          rows={data.topSources}
          valueLabel="Sessions"
        />
      </div>
    </section>
  );
}

function ClicksChart({ points }: { points: TravelpayoutsDayPoint[] }) {
  const width = 560;
  const height = 180;
  const padX = 12;
  const padY = 16;
  const max = Math.max(8, ...points.map((p) => p.clicks));
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const coords = points.map((p, i) => {
    const x =
      points.length <= 1
        ? padX + innerW / 2
        : padX + (i / (points.length - 1)) * innerW;
    const y = padY + innerH - (p.clicks / max) * innerH;
    return { x, y, ...p };
  });

  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const area =
    coords.length > 0
      ? `M ${coords[0].x} ${padY + innerH} L ${line.replace(/ /g, " L ")} L ${coords[coords.length - 1].x} ${padY + innerH} Z`
      : "";

  const labelIndexes = new Set<number>();
  if (points.length > 0) {
    labelIndexes.add(0);
    labelIndexes.add(points.length - 1);
    const mid = Math.floor((points.length - 1) / 2);
    if (mid > 0 && mid < points.length - 1) labelIndexes.add(mid);
  }

  return (
    <div className="rounded-xl border border-mist bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-ink">Clicks</h3>
        <span className="text-xs text-ink/40">Daily redirects</span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-44"
        role="img"
        aria-label="Clicks over time"
      >
        {[0, 0.5, 1].map((t) => {
          const y = padY + innerH * (1 - t);
          return (
            <line
              key={t}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              stroke="#E6EAF0"
              strokeWidth="1"
            />
          );
        })}
        {area && <path d={area} fill="rgba(13,148,136,0.10)" />}
        {coords.length > 1 && (
          <polyline
            fill="none"
            stroke="#0D9488"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={line}
          />
        )}
        {coords.map((c) => (
          <circle key={c.date} cx={c.x} cy={c.y} r="3.5" fill="#0D9488" />
        ))}
        {[...labelIndexes].map((i) => {
          const c = coords[i];
          return (
            <text
              key={`label-${c.date}`}
              x={c.x}
              y={height - 2}
              textAnchor="middle"
              className="fill-ink/45"
              fontSize="11"
            >
              {formatShortDay(c.date)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function ConversionCard({
  totals,
  previous,
}: {
  totals: TravelpayoutsPeriodTotals;
  previous: TravelpayoutsPeriodTotals;
}) {
  const clickDelta = delta(totals.clicks, previous.clicks);
  const fill = Math.min(100, totals.conversionRate);

  return (
    <div className="rounded-xl border border-mist bg-white p-4 flex flex-col">
      <h3 className="text-sm font-medium text-ink mb-4">Conversion</h3>
      <dl className="space-y-3 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-ink/55">Clicks</dt>
          <dd className="text-right">
            <span className="font-display text-2xl font-semibold text-ink">
              {formatNumber(totals.clicks)}
            </span>
            <DeltaBadge value={clickDelta} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-ink/55">Bookings</dt>
          <dd className="font-display text-2xl font-semibold text-ink">
            {formatNumber(totals.bookings)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-sm text-ink/55">Conversion</dt>
          <dd className="font-display text-2xl font-semibold text-ink">
            {formatPct(totals.conversionRate)}
          </dd>
        </div>
      </dl>
      <div className="mt-5 h-2 rounded-full bg-mist overflow-hidden">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}

function TravelpayoutsSection({ data }: { data: TravelpayoutsResult }) {
  if (data.status === "unconfigured") {
    return <SetupBanner title="Travelpayouts" steps={data.setup} />;
  }
  if (data.status === "error") {
    return (
      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          Travelpayouts
        </h2>
        <ErrorBanner message={data.error} />
      </div>
    );
  }

  const {
    currency,
    period,
    periodLabel,
    rangeLabel,
    compareLabel,
    balance,
    nextPayout,
    totals,
    previousTotals,
    clicksByDay,
    programs,
    bookingUpdates,
    payments,
  } = data;

  const bal = balance?.[currency] ?? balance?.usd ?? balance?.eur;
  const next = nextPayout?.[currency] ?? nextPayout?.usd ?? nextPayout?.eur;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Travelpayouts
          </h2>
          <p className="mt-1 text-sm text-ink/55">
            Records for your affiliate project — clicks, programs, and bookings.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-mist bg-white p-1">
          {PERIODS.map((item) => {
            const active = item.id === period;
            return (
              <Link
                key={item.id}
                href={`/admin/?period=${item.id}`}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  active
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:text-ink hover:bg-sky"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-mist bg-white p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-5">
          <div>
            <h3 className="font-display text-3xl font-semibold text-ink tracking-tight">
              {periodLabel}
            </h3>
            <p className="text-sm text-ink/50 mt-1">{rangeLabel}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-ink/50 mb-1">Earnings</p>
            <p className="font-display text-2xl font-semibold text-ink">
              {formatMoney(totals.earnings, "usd")}
            </p>
          </div>
          <div>
            <p className="text-sm text-ink/50 mb-1">Pot. earnings</p>
            <p className="font-display text-2xl font-semibold text-ink">
              {formatMoney(totals.potentialEarnings, "usd")}
            </p>
          </div>
          <div>
            <p className="text-sm text-ink/50 mb-1">Clicks</p>
            <p className="font-display text-2xl font-semibold text-ink">
              {formatNumber(totals.clicks)}
              <DeltaBadge value={delta(totals.clicks, previousTotals.clicks)} />
            </p>
          </div>
          <div>
            <p className="text-sm text-ink/50 mb-1">Bookings</p>
            <p className="font-display text-2xl font-semibold text-ink">
              {formatNumber(totals.bookings)}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-ink/40">{compareLabel}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClicksChart points={clicksByDay} />
        <ConversionCard totals={totals} previous={previousTotals} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-mist bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-mist">
            <h3 className="text-sm font-medium text-ink">
              Top performing programs
            </h3>
          </div>
          {programs.length === 0 ? (
            <p className="px-4 py-10 text-sm text-ink/50 text-center">
              No program activity in this period.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[28rem]">
                <thead>
                  <tr className="text-left text-ink/45">
                    <th className="px-4 py-2 font-medium">Program</th>
                    <th className="px-4 py-2 font-medium text-right">Clicks</th>
                    <th className="px-4 py-2 font-medium text-right">Bookings</th>
                    <th className="px-4 py-2 font-medium text-right">
                      Earnings / Pot.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((row) => (
                    <tr key={row.campaignId} className="border-t border-mist">
                      <td className="px-4 py-2.5 text-ink font-medium">
                        {row.name}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                        {formatNumber(row.clicks)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                        {formatNumber(row.bookings)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                        {formatMoney(row.earnings + row.potentialEarnings, "usd")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-mist bg-white overflow-hidden min-h-[16rem]">
          <div className="px-4 py-3 border-b border-mist">
            <h3 className="text-sm font-medium text-ink">Booking updates</h3>
          </div>
          {bookingUpdates.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky text-accent text-lg">
                £
              </div>
              <p className="text-sm font-medium text-ink">No bookings yet</p>
              <p className="mt-1 text-sm text-ink/50">
                We’ll show them here once they arrive.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-mist">
              {bookingUpdates.map((booking) => (
                <li key={booking.actionId} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink truncate">
                        {booking.program}
                      </p>
                      <p className="text-xs text-ink/50 mt-0.5 truncate">
                        {booking.description}
                      </p>
                      <p className="text-xs text-ink/40 mt-1 capitalize">
                        {booking.date} · {booking.state}
                      </p>
                    </div>
                    <p className="text-sm tabular-nums text-ink shrink-0">
                      {formatMoney(
                        booking.profit || booking.potentialProfit,
                        "usd",
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MetricCard
          label={`Account balance (${currency.toUpperCase()})`}
          value={formatMoney(bal, currency)}
        />
        <MetricCard
          label={`Next payout (${currency.toUpperCase()})`}
          value={formatMoney(next, currency)}
        />
      </div>

      {payments.length > 0 && (
        <div className="rounded-xl border border-mist bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-mist">
            <h3 className="text-sm font-medium text-ink">Payments</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/45">
                <th className="px-4 py-2 font-medium">Paid at</th>
                <th className="px-4 py-2 font-medium">Comment</th>
                <th className="px-4 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.payment_uuid} className="border-t border-mist">
                  <td className="px-4 py-2.5 text-ink/70 whitespace-nowrap">
                    {p.paid_at?.slice(0, 10) || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-ink/75">{p.comment || "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                    {formatMoney(p.amount, p.currency || currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const period = parseTravelpayoutsPeriod(params.period);

  const [ga, travelpayouts] = await Promise.all([
    getGaDashboard(),
    getTravelpayoutsDashboard(period),
  ]);

  return (
    <>
      <header className="bg-ink text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <p className="font-display text-lg font-semibold tracking-tight">
            Aero<span className="text-spark">Swift</span>
            <span className="ml-2 text-sm font-sans font-normal text-white/55">
              Admin
            </span>
          </p>
          <AdminLogoutButton />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10 space-y-10">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Site traffic and Travelpayouts records. Data refreshes about every 5
            minutes when configured.
          </p>
        </div>

        {!isAdminPasswordConfigured() && (
          <ErrorBanner message="ADMIN_PASSWORD or ADMIN_SESSION_SECRET is missing. Login will fail until both are set." />
        )}

        <GaSection data={ga} />
        <TravelpayoutsSection data={travelpayouts} />
      </div>
    </>
  );
}
