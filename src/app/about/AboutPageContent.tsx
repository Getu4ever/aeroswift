"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_HERO_IMAGE } from "@/lib/destinations";
import Link from "next/link";

export default function AboutPageContent() {
  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="section-label mb-3">Our story</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            About AeroSwift
          </h1>
          <p className="mt-4 text-lg text-ink/60">
            A UK flight comparison site built for clear search and honest
            booking redirects.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 relative h-56 md:h-80 w-full rounded-lg overflow-hidden"
        >
          <Image
            src={ABOUT_HERO_IMAGE}
            alt="Airport terminal windows at dusk"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-10 text-ink/70 leading-relaxed"
        >
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              Why we exist
            </h2>
            <p>
              Booking flights shouldn&apos;t feel like decoding fine print.
              AeroSwift helps UK travellers compare routes and fares, then
              connects you to trusted partners to finish the booking.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              How we make money
            </h2>
            <p>
              AeroSwift is free to use. When you book through a partner link, we
              may earn a commission. That does not increase what you pay. We are
              not a travel agent or airline — tickets and support come from the
              partner you book with.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              Built in the UK
            </h2>
            <p>
              We focus on departures from the UK, prices in pounds, and routes
              people actually fly — weekend city breaks, winter sun, and the
              odd long-haul adventure.{" "}
              <Link href="/how-it-works/" className="text-accent font-semibold hover:underline">
                See how it works
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
