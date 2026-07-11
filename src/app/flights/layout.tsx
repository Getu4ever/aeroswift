import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Popular flights from the UK",
  description:
    "Explore popular UK flight routes — London to Paris, Barcelona, New York and more. Compare fares in £ with AeroSwift.",
  path: "/flights",
  keywords: [
    "flights from UK",
    "London flights",
    "cheap European flights",
    "UK flight routes",
  ],
});

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
