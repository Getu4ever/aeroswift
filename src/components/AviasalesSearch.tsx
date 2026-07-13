"use client";

import { useLayoutEffect, useState } from "react";
import { getWidgetScriptSrc } from "@/lib/affiliate";

/**
 * Aviasales search form via Travelpayouts widget.
 * Script must stay a child of this container (widget uses parentNode).
 */
export default function AviasalesSearch() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const container = document.getElementById("aviasales-widget-container");
    if (!container) return;

    // Keep skeleton until the partner script mutates the container.
    const observer = new MutationObserver(() => {
      const hasWidgetUi = [...container.children].some(
        (el) => el.tagName !== "SCRIPT",
      );
      if (hasWidgetUi) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const existing = container.querySelector("script[data-aviasales-widget]");
    if (!existing) {
      const script = document.createElement("script");
      script.src = getWidgetScriptSrc();
      script.async = true;
      script.charset = "utf-8";
      script.dataset.aviasalesWidget = "1";
      container.appendChild(script);
    }

    const fallback = window.setTimeout(() => setReady(true), 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[72px]">
      {!ready && (
        <div
          className="absolute inset-0 z-0 flex flex-col gap-3 p-4 animate-pulse"
          aria-hidden="true"
        >
          <div className="h-10 rounded-md bg-ink/10" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-md bg-ink/10" />
            <div className="h-10 rounded-md bg-ink/10" />
          </div>
          <div className="h-10 rounded-md bg-accent/25" />
        </div>
      )}
      <div
        id="aviasales-widget-container"
        className={`relative z-10 w-full transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0 min-h-[72px]"
        }`}
      />
    </div>
  );
}
