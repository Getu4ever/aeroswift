"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationGrid from "@/components/DestinationGrid";
import { motion } from "framer-motion";

export default function DestinationsPageContent() {
  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="section-label mb-3">Explore</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Top destinations
          </h1>
          <p className="mt-4 text-lg text-ink/60">
            Pick a city and search live fares with our partners — prices in £.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <DestinationGrid />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
