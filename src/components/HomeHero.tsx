"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AviasalesSearch from "@/components/AviasalesSearch";
import { HERO_IMAGE } from "@/lib/destinations";

export default function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col text-white overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Airplane wing above clouds on a UK flight"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(11,31,51,0.35)_70%)]" />

      <Navbar variant="overlay" />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-6 pb-16 pt-28">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white">
              Aero<span className="text-spark">Swift</span>
            </span>
            <span className="mt-5 block text-lg md:text-xl font-sans font-medium text-white/85 max-w-xl mx-auto">
              Cheap flights from the UK, compared in seconds.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-white/55 mb-8"
          >
            Prices in £ · Depart UK
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="w-full max-w-3xl mx-auto rounded-xl bg-white/95 shadow-2xl shadow-ink/40 overflow-hidden"
          >
            <AviasalesSearch />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-5 text-xs text-white/50 max-w-md mx-auto leading-relaxed"
          >
            Search powered by Aviasales. We may earn a commission if you book
            via a partner — at no extra cost to you.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
