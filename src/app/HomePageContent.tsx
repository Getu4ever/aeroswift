"use client";

import HomeHero from "@/components/HomeHero";
import HowItWorksStrip from "@/components/HowItWorksStrip";
import PopularDestinations from "@/components/PopularDestinations";
import RoutesTeaser from "@/components/RoutesTeaser";
import HomeEditorial from "@/components/HomeEditorial";
import Footer from "@/components/Footer";
import { getAffiliateSearchLink } from "@/lib/affiliate";

export default function HomePageContent() {
  return (
    <main className="min-h-screen bg-sky">
      <HomeHero />
      <HowItWorksStrip />
      <PopularDestinations
        onSelect={(city) => {
          window.location.href = getAffiliateSearchLink(city);
        }}
      />
      <RoutesTeaser />
      <HomeEditorial />
      <Footer />
    </main>
  );
}
