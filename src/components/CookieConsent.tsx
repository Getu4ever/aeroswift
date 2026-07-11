"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "aeroswift-cookie-consent";

type Consent = "accepted" | "rejected" | null;

export function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  const save = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("aeroswift-consent-change"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-ink text-white rounded-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-white/10">
        <p className="text-sm text-white/80 leading-relaxed flex-1">
          We use essential cookies and, with your consent, analytics. Partners
          may set cookies when you leave to book.{" "}
          <a href="/privacy/" className="underline text-spark hover:text-white">
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="px-4 py-2.5 text-sm font-semibold rounded-md border border-white/25 hover:bg-white/10 transition"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="btn-primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
