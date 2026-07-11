import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Destinations",
  description:
    "Explore top flight destinations from the UK and search live fares with AeroSwift partners.",
  path: "/destinations",
  keywords: ["flight destinations", "European city breaks", "where to fly from UK"],
});

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
