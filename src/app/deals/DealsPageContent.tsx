"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { deals } from "@/lib/destinations";

export default function DealsPageContent() {
  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="section-label mb-3">Value</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Flight deals
          </h1>
          <p className="mt-4 text-lg text-ink/60">
            Hand-picked routes from the UK. Fares are indicative — always
            confirm the live price on the partner site.
          </p>
        </motion.div>

        <div className="space-y-0 divide-y divide-mist border-y border-mist">
          {deals.map((deal, index) => (
            <motion.article
              key={deal.destination}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="grid md:grid-cols-[200px_1fr_auto] gap-6 py-8 items-center"
            >
              <div className="relative h-36 md:h-28 w-full rounded-lg overflow-hidden bg-mist">
                <Image
                  src={deal.image}
                  alt={deal.destination}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {deal.tag}
                </p>
                <h2 className="font-display text-2xl font-semibold text-ink mt-1">
                  {deal.destination}
                </h2>
                <p className="text-sm text-ink/50 mt-1">{deal.route}</p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3">
                <div className="text-right">
                  <p className="font-display text-3xl font-semibold text-ink">
                    {deal.price}
                  </p>
                  <p className="text-xs text-ink/40 mt-1">Indicative fare</p>
                </div>
                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary whitespace-nowrap"
                >
                  Book flight
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
