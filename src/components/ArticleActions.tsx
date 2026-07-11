"use client";

import { useState, useEffect } from "react";

export default function ArticleActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareBtn =
    "w-10 h-10 flex items-center justify-center bg-ink text-white rounded-md hover:bg-accent transition-colors";

  return (
    <div className="mt-12 py-10 border-t border-mist">
      <p className="text-sm font-semibold text-ink mb-4">Share</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${url}`,
              "_blank",
            )
          }
          className={shareBtn}
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`,
              "_blank",
            )
          }
          className={shareBtn}
          aria-label="Share on X"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
              "_blank",
            )
          }
          className={shareBtn}
          aria-label="Share on WhatsApp"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="px-4 h-10 text-sm font-semibold bg-mist text-ink rounded-md hover:bg-sky-deep transition-colors"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
