"use client";

import { useEffect, useId } from "react";
import { getKiwiDeepLink, getKiwiWidgetScriptSrc } from "@/lib/affiliate";

/** Kiwi.com Specific Route widget + tracked deep-link CTA */
export default function KiwiRouteWidget() {
  const reactId = useId().replace(/:/g, "");
  const containerId = `kiwi-widget-${reactId}`;
  const scriptSrc = getKiwiWidgetScriptSrc();
  const kiwiHref = getKiwiDeepLink("LON", "PAR");

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [scriptSrc, containerId]);

  return (
    <div className="space-y-4">
      <div
        id={containerId}
        className="w-full min-h-[120px] flex justify-center overflow-x-auto"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-mist">
        <p className="text-xs text-ink/50">
          Widget not loading? Open the London → Paris search on Kiwi directly.
        </p>
        <a
          href={kiwiHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary shrink-0 text-center"
        >
          Open on Kiwi.com →
        </a>
      </div>
    </div>
  );
}
