"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const PRODUCTION_HOSTS = new Set(["aeroswift.co.uk", "www.aeroswift.co.uk"]);

/**
 * Travelpayouts Drive — site-wide monetization script for project TRS 531109.
 * Only loads on the registered production hosts; on localhost Drive logs
 * "config is not valid" and Next.js surfaces it as a console error overlay.
 */
export default function TravelpayoutsDrive() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(PRODUCTION_HOSTS.has(window.location.hostname));
  }, []);

  if (!enabled) return null;

  return (
    <Script
      src="https://emrldco.com/NTMxMTA5.js?t=531109"
      strategy="afterInteractive"
    />
  );
}
