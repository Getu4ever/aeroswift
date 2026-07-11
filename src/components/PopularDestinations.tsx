"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { popularDestinations } from "@/lib/destinations";

export default function PopularDestinations({
  onSelect,
}: {
  onSelect: (destinationIata: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full relative py-16 md:py-20 px-6 bg-sky">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10 gap-4">
          <div>
            <p className="section-label mb-3">Get inspired</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              Popular destinations
            </h2>
            <p className="text-ink/55 mt-2 text-sm md:text-base">
              European getaways from UK airports
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scroll(dir)}
                aria-label={`Scroll ${dir}`}
                className="p-2.5 border border-mist bg-white hover:border-accent hover:text-accent text-ink/60 rounded-md transition-colors"
              >
                {dir === "left" ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {popularDestinations.map((dest, index) => (
            <motion.button
              key={dest.name}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => onSelect(dest.code)}
              className="flex-none w-60 sm:w-64 group relative overflow-hidden rounded-lg h-72 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dest.img}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display text-xl font-semibold text-white">
                  {dest.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">Search flights →</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
