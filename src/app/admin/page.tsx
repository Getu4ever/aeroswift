import type { GaDashboardResult, GaPeriodMetrics, GaTopRow } from "@/lib/admin/ga";
import { getGaDashboard } from "@/lib/admin/ga";
import type { TravelpayoutsResult } from "@/lib/admin/travelpayouts";
import { getTravelpayoutsDashboard } from "@/lib/admin/travelpayouts";
import { isAdminPasswordConfigured } from "@/lib/admin/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n);
}

function formatMoney(amount: string | undefined, currency: string): string {
  if (amount == null || amount === "") return "—";
  const value = Number(amount);
  if (!Number.isFinite(value)) return amount;
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

  const { currency, balance, nextPayout, payments, actions, totals } = data;
  const bal = balance?.[currency] ?? balance?.usd ?? balance?.eur;
  const next = nextPayout?.[currency] ?? nextPayout?.usd ?? nextPayout?.eur;

  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-ink">
        Travelpayouts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard label={`Balance (${currency.toUpperCase()})`} value={formatMoney(bal, currency)} />
        <MetricCard
          label={`Next payout (${currency.toUpperCase()})`}
          value={formatMoney(next, currency)}
        />
        <MetricCard
          label="Actions (all time)"
          value={
            totals.actionCount != null
              ? formatNumber(totals.actionCount)
              : "—"
          }
        />
      </div>

      {totals.totalProfit && (
        <p className="text-sm text-ink/60">
          Lifetime profit shown by API:{" "}
          <span className="text-ink font-medium">
            {formatMoney(totals.totalProfit, currency)}
          </span>
        </p>
      )}

      <div className="rounded-xl border border-mist bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-mist">
          <h3 className="text-sm font-medium text-ink">Recent actions</h3>
        </div>
        {actions.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink/50">No recent actions.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[36rem]">
              <thead>
                <tr className="text-left text-ink/45">
                  <th className="px-4 py-2 font-medium">When</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                  <th className="px-4 py-2 font-medium text-right">Profit</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <tr key={action.action_id} className="border-t border-mist">
                    <td className="px-4 py-2.5 text-ink/70 whitespace-nowrap">
                      {action.booked_at?.slice(0, 10) || "—"}
                    </td>
                    <td className="px-4 py-2.5 capitalize text-ink/80">
                      {action.action_state}
                    </td>
                    <td className="px-4 py-2.5 text-ink/75 max-w-xs truncate">
                      {action.description || action.action_id}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                      {formatMoney(action.profit, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-mist bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-mist">
          <h3 className="text-sm font-medium text-ink">Payments</h3>
        </div>
        {payments.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink/50">No payments yet.</p>
        ) : (
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
                  <td className="px-4 py-2.5 text-ink/75">
                    {p.comment || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-ink">
                    {formatMoney(p.amount, p.currency || currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default async function AdminPage() {
  const [ga, travelpayouts] = await Promise.all([
    getGaDashboard(),
    getTravelpayoutsDashboard(),
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
          Site traffic and Travelpayouts earnings. Data refreshes about every 5
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
