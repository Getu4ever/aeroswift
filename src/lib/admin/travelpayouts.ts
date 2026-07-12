const TP_BASE = "https://api.travelpayouts.com/finance/v2";

export type TravelpayoutsBalance = {
  usd?: string;
  eur?: string;
  rub?: string;
  gbp?: string;
  [currency: string]: string | undefined;
};

export type TravelpayoutsAction = {
  action_id: string;
  campaign_id: number;
  action_state: string;
  price: string;
  profit: string;
  description?: string;
  booked_at?: string;
  updated_at?: string;
};

export type TravelpayoutsPayment = {
  paid_at: string;
  payment_uuid: string;
  amount: string;
  currency: string;
  payment_info_id?: number;
  comment?: string;
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
      balance: TravelpayoutsBalance | null;
      nextPayout: TravelpayoutsBalance | null;
      payments: TravelpayoutsPayment[];
      actions: TravelpayoutsAction[];
      totals: { totalPrice?: string; totalProfit?: string; actionCount?: number };
    };

function setupSteps(): string[] {
  return [
    "Open Travelpayouts → Profile → API token",
    "Copy the token into TRAVELPAYOUTS_API_TOKEN (server-only, never NEXT_PUBLIC_)",
    "Redeploy or restart the app so the env var is available",
  ];
}

async function tpGet<T>(
  path: string,
  token: string,
  query?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${TP_BASE}/${path}`);
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

/** Prefer GBP when the API returns it; otherwise USD for UK affiliate reporting. */
function pickCurrency(balance: TravelpayoutsBalance | null): string {
  if (balance?.gbp) return "gbp";
  if (balance?.usd) return "usd";
  if (balance?.eur) return "eur";
  return "usd";
}

export async function getTravelpayoutsDashboard(): Promise<TravelpayoutsResult> {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN?.trim();
  if (!token) {
    return { status: "unconfigured", setup: setupSteps() };
  }

  try {
    const balanceRes = await tpGet<{ balance: TravelpayoutsBalance }>(
      "get_user_balance",
      token,
    );
    const balance = balanceRes.balance ?? null;
    const currency = pickCurrency(balance);

    const [nextPayoutRes, payments, actionsRes] = await Promise.all([
      tpGet<{ next_payout: TravelpayoutsBalance }>(
        "get_user_next_payout",
        token,
      ).catch(() => null),
      tpGet<TravelpayoutsPayment[]>("get_user_payments", token).catch(
        () => [] as TravelpayoutsPayment[],
      ),
      tpGet<{
        actions: TravelpayoutsAction[];
        total_price?: string;
        total_profit?: string;
        count?: number;
      }>("get_user_actions_affecting_balance", token, {
        currency,
        limit: "20",
      }),
    ]);

    return {
      status: "ok",
      currency,
      balance,
      nextPayout: nextPayoutRes?.next_payout ?? null,
      payments: Array.isArray(payments) ? payments.slice(0, 10) : [],
      actions: actionsRes.actions ?? [],
      totals: {
        totalPrice: actionsRes.total_price,
        totalProfit: actionsRes.total_profit,
        actionCount: actionsRes.count,
      },
    };
  } catch (err) {
    return {
      status: "error",
      error: err instanceof Error ? err.message : "Travelpayouts request failed",
    };
  }
}
