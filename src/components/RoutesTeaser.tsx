import Link from "next/link";
import { ukRoutes } from "@/lib/destinations";

export default function RoutesTeaser() {
  const preview = ukRoutes.slice(0, 6);

  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-3">From the UK</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              Popular routes
            </h2>
          </div>
          <Link
            href="/flights"
            className="text-sm font-semibold text-accent hover:text-accent-dark transition"
          >
            See all routes →
          </Link>
        </div>

        <ul className="divide-y divide-mist border-y border-mist">
          {preview.map((route) => (
            <li key={route.slug}>
              <Link
                href={`/flights/${route.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 group"
              >
                <div>
                  <p className="font-semibold text-ink group-hover:text-accent transition-colors">
                    {route.from} → {route.to}
                  </p>
                  <p className="text-sm text-ink/55 mt-0.5">{route.blurb}</p>
                </div>
                <span className="text-sm font-semibold text-accent shrink-0">
                  View guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
