"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { getSupportEmail } from "@/lib/site";

const faqs = [
  {
    q: "Where is my booking confirmation?",
    a: "Your booking is handled by the airline or agency you chose. Check your email (including spam) for confirmation from them — not from AeroSwift.",
  },
  {
    q: "How do I change or cancel a flight?",
    a: "Contact the airline or booking agency directly with your booking reference. We can’t change tickets on your behalf.",
  },
  {
    q: "How does AeroSwift work?",
    a: "We help you compare flight options. When you click Book, you go to a partner site to pay. We may earn a commission if you book — at no extra cost to you.",
  },
  {
    q: "Need site help?",
    a: "Email us for website or partnership questions. For booking problems, always contact the partner who issued your ticket.",
  },
];

export default function SupportPage() {
  const supportEmail = getSupportEmail();

  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="section-label mb-3">Help</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              Support
            </h1>
            <p className="mt-4 text-lg text-ink/60">
              Quick answers about searching and booking with AeroSwift.
            </p>
          </motion.div>

          <div className="divide-y divide-mist border-y border-mist mb-14">
            {faqs.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="py-8"
              >
                <h2 className="text-lg font-semibold text-ink mb-2">{item.q}</h2>
                <p className="text-ink/65 leading-relaxed">{item.a}</p>
                {item.q === "Need site help?" && (
                  <a
                    href={`mailto:${supportEmail}`}
                    className="inline-block mt-3 text-accent font-semibold hover:underline"
                  >
                    {supportEmail}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="bg-ink text-white rounded-xl p-8 md:p-10 text-center">
            <h3 className="font-display text-2xl font-semibold mb-2">
              Still stuck?
            </h3>
            <p className="text-white/60 mb-6 text-sm">
              We usually reply within 24 hours for site-related questions.
            </p>
            <a href={`mailto:${supportEmail}`} className="btn-primary">
              Email support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
