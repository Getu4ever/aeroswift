"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent } from "@/components/CookieConsent";

/**
 * Loads Google Analytics 4 only when:
 * - NEXT_PUBLIC_GA_ID is set
 * - the visitor has accepted cookies
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getStoredConsent() === "accepted");
    sync();
    window.addEventListener("aeroswift-consent-change", sync);
    return () => window.removeEventListener("aeroswift-consent-change", sync);
  }, []);

  if (!gaId || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
