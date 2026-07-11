import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KiwiRouteWidget from "@/components/KiwiRouteWidget";
import JsonLd from "@/components/JsonLd";
import { ukRoutes } from "@/lib/destinations";
import { getAffiliateSearchLink } from "@/lib/affiliate";
import { breadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-sky">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flights", path: "/flights" },
        ])}
      />
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p className="section-label mb-3">UK routes</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          Popular flights from the UK
        </h1>
        <p className="mt-4 text-lg text-ink/60 mb-12">
          High-demand routes from London, Manchester, Edinburgh, and more.
          Open a route guide for tips, or search live fares with our partners.
        </p>

        <aside className="mb-14 rounded-xl bg-white border border-mist p-5 md:p-6">
          <div className="mb-4">
            <p className="section-label mb-2">Featured on Kiwi.com</p>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Live route deal
            </h2>
            <p className="text-sm text-ink/55 mt-1">
              Pick dates and continue on Kiwi. We may earn a commission at no
              extra cost to you.
            </p>
          </div>
          <KiwiRouteWidget />
        </aside>

        <h2 className="font-display text-2xl font-semibold text-ink mb-2">
          Route guides
        </h2>
        <p className="text-sm text-ink/50 mb-6">
          SEO guides with tips — plus a one-click partner search for each route.
        </p>

        <ul className="divide-y divide-mist border-y border-mist mb-12">
          {ukRoutes.map((route) => (
            <li key={route.slug} className="py-6">
              <div className="flex flex-col gap-3">
                <div>
                  <Link
                    href={`/flights/${route.slug}`}
                    className="font-display text-xl font-semibold text-ink hover:text-accent transition-colors"
                  >
                    {route.from} → {route.to}
                  </Link>
                  <p className="text-sm text-ink/55 mt-1">{route.blurb}</p>
                  <p className="text-xs text-ink/35 mt-2 font-medium tracking-wide">
                    {route.fromCode} → {route.toCode}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/flights/${route.slug}`}
                    className="text-sm font-semibold text-accent hover:text-accent-dark"
                  >
                    Read guide →
                  </Link>
                  <a
                    href={getAffiliateSearchLink(route.toCode, route.fromCode)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-sm font-semibold text-ink/60 hover:text-ink"
                  >
                    Search flights ↗
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-sm text-ink/50">
          Looking for inspiration instead? Browse{" "}
          <Link
            href="/destinations"
            className="text-accent font-semibold hover:underline"
          >
            destinations
          </Link>{" "}
          or check{" "}
          <Link
            href="/deals"
            className="text-accent font-semibold hover:underline"
          >
            current deals
          </Link>
          .
        </p>
      </section>

      <Footer />
    </main>
  );
}
