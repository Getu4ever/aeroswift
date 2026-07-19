"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { getSupportEmail } from "@/lib/site";

export default function TermsPageContent() {
  const supportEmail = getSupportEmail();

  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <article className="max-w-3xl mx-auto py-16 md:py-20 px-6">
        <motion.div
          initial={{ y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">Legal</p>
          <h1 className="font-display text-4xl font-semibold mb-8 text-ink">
            Terms of Service
          </h1>
        </motion.div>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <p>
            <strong className="text-ink">Last updated: 11 July 2026</strong>
          </p>
          <p>
            By using AeroSwift (aeroswift.co.uk), you agree to these terms.
          </p>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              1. What we offer
            </h2>
            <p>
              AeroSwift is a flight comparison website. We are not a travel
              agent, carrier, or booking operator. Bookings and payments happen
              on third-party partner sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              2. Affiliate disclosure
            </h2>
            <p>
              Some links are affiliate links. We may earn a commission if you
              book, at no extra cost to you. Displayed prices are indicative.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              3. Liability
            </h2>
            <p>
              We do not guarantee accuracy of partner prices or schedules.
              Ticketing, refunds, and changes are between you and the partner.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              4. Acceptable use
            </h2>
            <p>
              Use the site for personal, non-commercial purposes. Scraping or
              attacking the site is prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              5. Contact
            </h2>
            <p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-accent font-semibold hover:underline"
              >
                {supportEmail}
              </a>
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
