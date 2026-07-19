"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { getSupportEmail } from "@/lib/site";

export default function PrivacyPageContent() {
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
            Privacy Policy
          </h1>
        </motion.div>

        <div className="space-y-8 text-ink/70 leading-relaxed">
          <p>
            <strong className="text-ink">Last updated: 11 July 2026</strong>
          </p>
          <p>
            AeroSwift (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) protects
            your information when you use aeroswift.co.uk.
          </p>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              1. Data we collect
            </h2>
            <p>
              Search details you enter (origin, destination, dates) via our
              partner tools, plus technical data such as IP address and browser
              type. Analytics data is collected only if you accept cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              2. How we use it
            </h2>
            <p>
              To run the site, improve the experience, and understand traffic.
              We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              3. Partners &amp; redirects
            </h2>
            <p>
              When you search or book, you may leave AeroSwift for Aviasales or
              other partners. Their privacy policies apply. We may earn a
              commission if you complete a booking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">
              4. Cookies
            </h2>
            <p>
              Essential cookies keep the site working. Analytics cookies load
              only after you accept. Clear site data in your browser to reset
              your choice.
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
