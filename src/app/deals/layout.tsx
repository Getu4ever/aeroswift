import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Flight deals",
  description:
    "Hand-picked flight deals from the UK. Indicative fares — confirm live prices on partner sites.",
  path: "/deals",
  keywords: ["flight deals UK", "cheap flight offers", "UK air fare deals"],
});

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
