import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "How it works",
  description:
    "How AeroSwift flight comparison works — search, compare, and book with trusted partners from the UK.",
  path: "/how-it-works",
});

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
