"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import AviasalesSearch from "@/components/AviasalesSearch";

const steps = [
  {
    title: "Tell us where you’re going",
    body: "Use the search box with your UK departure city or airport, destination, and dates. Results open with our partner, Aviasales.",
  },
  {
    title: "Compare options",
    body: "Look at price, duration, and stops. Fares update often — what you see is a live snapshot from the partner network.",
  },
  {
    title: "Book on the partner site",
    body: "Payment, tickets, and changes are handled by the airline or agency you choose. Keep your booking reference safe.",
  },
];

export default function HowItWorksPageContent() {
  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-3">Guide</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            How it works
          </h1>
          <p className="mt-4 text-lg text-ink/60">
            AeroSwift is a comparison site — not a travel agent. Here’s the
            short version.
          </p>
        </motion.div>

        <ol className="space-y-10 mb-16">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-5"
            >
              <span className="font-display text-3xl text-sky-deep font-semibold leading-none w-12 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-ink mb-2">
                  {step.title}
                </h2>
                <p className="text-ink/65 leading-relaxed">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="rounded-xl bg-white border border-mist p-4 md:p-6 mb-10 overflow-hidden">
          <p className="text-sm font-semibold text-ink mb-3 px-1">
            Try a search
          </p>
          <AviasalesSearch />
        </div>

        <p className="text-sm text-ink/50 leading-relaxed">
          We may earn a commission when you book through a partner link. Read
          our{" "}
          <Link href="/terms" className="text-accent font-semibold hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/support" className="text-accent font-semibold hover:underline">
            Support
          </Link>{" "}
          pages for more detail.
        </p>
      </section>

      <Footer />
    </main>
  );
}
