"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AviasalesSearch from "@/components/AviasalesSearch";
import { HERO_IMAGE } from "@/lib/destinations";

const HERO_VIDEO = "/video/hero-video.mp4";

export default function HomeHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col text-white overflow-hidden">
      {/* Still frame paints immediately; video fades in over it when ready */}
      <Image
        src={HERO_IMAGE}
        alt="Airplane wing above clouds on a UK flight"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {!reduceMotion && (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(11,31,51,0.4)_70%)]" />

      <Navbar variant="overlay" />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-6 pb-16 pt-28">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            {/* Single text node "AeroSwift" so SEO tools don't split Aero / Swift.
                Trailing space keeps H1 readable as "AeroSwift Cheap…" when spans are joined. */}
            <span
              className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 0 44%, #e8c547 44% 100%)",
              }}
            >
              AeroSwift{" "}
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
