"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getAffiliateHomeLink } from "@/lib/affiliate";

const NAV_LINKS = [
  { label: "Flights", href: "/flights/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "Deals", href: "/deals/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Blog", href: "/blog/" },
] as const;

export default function Navbar({
  variant = "solid",
}: {
  variant?: "solid" | "overlay";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const bookHref = getAffiliateHomeLink();
  const overlay = variant === "overlay";

  return (
    <header
      className={`w-full z-50 ${
        overlay
          ? "absolute top-0 left-0 right-0 bg-transparent"
          : "sticky top-0 bg-ink/95 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-4 md:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-white"
        >
          Aero<span className="text-spark">Swift</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/80">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/support/"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Support
          </Link>
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary"
          >
            Search flights
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-ink border-b border-white/10 px-6 py-8 flex flex-col gap-5 shadow-xl overflow-hidden"
          >
            {[...NAV_LINKS, { label: "Support", href: "/support/" }, { label: "About", href: "/about/" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/90"
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary mt-2 w-full"
            >
              Search flights
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
