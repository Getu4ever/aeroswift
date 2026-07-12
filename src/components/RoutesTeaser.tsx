import Image from "next/image";
import Link from "next/link";
import { getRouteImage, ukRoutes } from "@/lib/destinations";

export default function RoutesTeaser() {
  const preview = ukRoutes.slice(0, 6);

  return (
    <section className="py-16 md:py-20 px-6 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
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
            <li key={route.slug} className="group">
              <Link
                href={`/flights/${route.slug}`}
                className="flex gap-4 md:gap-5 py-5 md:py-6 items-center"
              >
                <div className="relative w-24 sm:w-32 md:w-40 h-20 sm:h-24 shrink-0 overflow-hidden rounded-lg bg-mist">
                  <Image
                    src={getRouteImage(route.toCode)}
                    alt={route.to}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 96px, 160px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg md:text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                    {route.from}
                    <span className="text-ink/30 mx-1.5 font-sans font-normal">
                      →
                    </span>
                    {route.to}
                  </p>
                  <p className="text-sm text-ink/55 mt-1 line-clamp-2">
                    {route.blurb}
                  </p>
                  <p className="text-[11px] font-semibold tracking-wider text-ink/35 uppercase mt-2">
                    {route.fromCode}–{route.toCode}
                  </p>
                </div>
                <span className="hidden sm:inline text-sm font-semibold text-accent shrink-0">
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
