import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Travel tips, destination guides, and flight insights for UK travellers from AeroSwift.",
  path: "/blog",
  keywords: ["UK travel blog", "flight tips", "city break ideas"],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
