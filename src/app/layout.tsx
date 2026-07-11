import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { absoluteUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F33",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AeroSwift | Cheap Flights from the UK",
    template: "%s | AeroSwift",
  },
  description:
    "Compare cheap flights from the UK and book with trusted partners. City breaks, long-haul and weekend getaways — prices in £.",
  keywords: [
    "cheap flights UK",
    "flight comparison UK",
    "flights from London",
    "cheap flights from UK",
    "AeroSwift",
    "compare flights GBP",
  ],
  authors: [{ name: "AeroSwift" }],
  creator: "AeroSwift",
  publisher: "AeroSwift",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "AeroSwift",
    title: "AeroSwift | Cheap Flights from the UK",
    description:
      "Compare cheap flights from the UK and book with trusted partners. Prices in £.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroSwift | Cheap Flights from the UK",
    description:
      "Compare cheap flights from the UK and book with trusted partners. Prices in £.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
  appleWebApp: {
    capable: true,
    title: "AeroSwift",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-sky text-ink selection:bg-accent/20">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
