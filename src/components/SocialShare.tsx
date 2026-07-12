"use client";

import { useEffect, useState } from "react";
import { getSiteUrl } from "@/lib/site";

type Props = {
  /** Override share URL (defaults to current page) */
  url?: string;
  title?: string;
  className?: string;
};

export default function SocialShare({
  url: urlProp,
  title: titleProp,
  className = "",
}: Props) {
  const [url, setUrl] = useState(urlProp || `${getSiteUrl()}/`);
  const [title, setTitle] = useState(
    titleProp || "AeroSwift — Cheap flights from the UK",
  );

  useEffect(() => {
    if (!urlProp) setUrl(window.location.href);
    if (!titleProp) setTitle(document.title || "AeroSwift — Cheap flights from the UK");
  }, [urlProp, titleProp]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      ),
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.451L1.5 2.25h7.08l4.263 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      ),
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
      ),
    },
    {
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}`,
      icon: (
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      ),
    },
  ] as const;

  return (
    <div className={className}>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
        Share
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {link.icon}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
