"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KiwiRouteWidget from "@/components/KiwiRouteWidget";
import JsonLd from "@/components/JsonLd";
import {
  FLIGHTS_HERO_IMAGE,
  getRouteImage,
  ukRoutes,
  type UkRoute,
} from "@/lib/destinations";
import { getAffiliateSearchLink } from "@/lib/affiliate";
import { breadcrumbJsonLd } from "@/lib/seo";

function groupRoutesByOrigin(routes: UkRoute[]) {
  const groups = new Map<string, UkRoute[]>();
  for (const route of routes) {
    const list = groups.get(route.from) ?? [];
    list.push(route);
    groups.set(route.from, list);
  }
  return groups;
}

function RouteRow({ route }: { route: UkRoute }) {
  const image = getRouteImage(route.toCode);

  return (
    <li className="group">
      <div className="flex gap-4 md:gap-5 py-5 md:py-6 items-stretch">
        <Link
          href={`/flights/${route.slug}/`}
          className="relative w-28 sm:w-36 md:w-44 h-24 sm:h-28 shrink-0 overflow-hidden rounded-lg bg-mist"
        >
          <Image
            src={image}
            alt={`${route.to}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 112px, 176px"
          />
        </Link>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <Link
            href={`/flights/${route.slug}/`}
            className="font-display text-lg md:text-xl font-semibold text-ink group-hover:text-accent transition-colors"
          >
            {route.from}
            <span className="text-ink/30 mx-1.5 font-sans font-normal">→</span>
            {route.to}
          </Link>
          <p className="text-sm text-ink/55 mt-1 line-clamp-2">{route.blurb}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[11px] font-semibold tracking-wider text-ink/35 uppercase">
              {route.fromCode}–{route.toCode}
            </span>
            <Link
              href={`/flights/${route.slug}/`}
              className="text-sm font-semibold text-accent hover:text-accent-dark"
            >
              Guide →
            </Link>
            <a
              href={getAffiliateSearchLink(route.toCode, route.fromCode)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-sm font-semibold text-ink/55 hover:text-ink"
            >
              Search ↗
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function FlightsPageContent() {
  const grouped = groupRoutesByOrigin(ukRoutes);
  const featured = ukRoutes.slice(0, 3);

  return (
    <main className="min-h-screen bg-sky">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flights", path: "/flights" },
        ])}
      />
      <Navbar />

      <motion.section
        initial={{ y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden border-b border-mist"
      >
        <div className="absolute inset-0">
          <Image
            src={FLIGHTS_HERO_IMAGE}
            alt="Airplane cabin aisle looking toward the cockpit"
            fill
            priority
            className="object-cover object-[center_40%] opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/45" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-16">
          <p className="section-label text-accent mb-3">UK routes</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-xl">
            Popular flights from the UK
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-lg">
            Route guides with tips, plus one-click search to compare live fares
            in £.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-6 py-12 md:py-16"
      >
        <div className="mb-14">
          <p className="section-label mb-4">Featured</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {featured.map((route, index) => (
              <motion.div
                key={route.slug}
                initial={{ y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
              >
                <Link
                  href={`/flights/${route.slug}/`}
                  className="group relative h-48 rounded-lg overflow-hidden block"
                >
                  <Image
                    src={getRouteImage(route.toCode)}
                    alt={route.to}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-lg font-semibold text-white">
                      {route.from} → {route.to}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      {route.fromCode}–{route.toCode}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

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

        {[...grouped.entries()].map(([origin, routes]) => (
          <div key={origin} className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-1">
              <h2 className="font-display text-2xl font-semibold text-ink">
                From {origin}
              </h2>
              <p className="text-xs text-ink/40 font-medium">
                {routes.length} route{routes.length === 1 ? "" : "s"}
              </p>
            </div>
            <ul className="divide-y divide-mist border-y border-mist">
              {routes.map((route) => (
                <RouteRow key={route.slug} route={route} />
              ))}
            </ul>
          </div>
        ))}

        <p className="text-sm text-ink/50">
          Looking for inspiration instead? Browse{" "}
          <Link
            href="/destinations/"
            className="text-accent font-semibold hover:underline"
          >
            destinations
          </Link>{" "}
          or check{" "}
          <Link
            href="/deals/"
            className="text-accent font-semibold hover:underline"
          >
            current deals
          </Link>
          .
        </p>
      </motion.section>

      <Footer />
    </main>
  );
}
