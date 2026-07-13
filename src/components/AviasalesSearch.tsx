"use client";

import { useEffect } from "react";
import { getWidgetScriptSrc } from "@/lib/affiliate";

export default function AviasalesSearch() {
  useEffect(() => {
    const container = document.getElementById("aviasales-widget-container");
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.src = getWidgetScriptSrc();
    script.async = true;
    script.charset = "utf-8";

    if (container) {
      container.appendChild(script);
    }
  }, []);

  return <div id="aviasales-widget-container" className="w-full" />;
}
