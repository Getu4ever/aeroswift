"use client";

import Image from "next/image";
import { destinations } from "@/lib/destinations";
import { getAffiliateSearchLink } from "@/lib/affiliate";

export default function DestinationGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((dest) => (
        <a
          key={dest.name}
          href={getAffiliateSearchLink(dest.code)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block"
        >
          <div className="relative h-56 w-full overflow-hidden rounded-lg bg-mist">
            <Image
              src={dest.image}
              alt={`${dest.name}, ${dest.country}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">
                {dest.region}
              </p>
              <h3 className="font-display text-xl font-semibold text-white mt-0.5">
                {dest.name}
              </h3>
              <p className="text-sm text-white/70">{dest.country}</p>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
            Search flights →
          </p>
        </a>
      ))}
    </div>
  );
}
