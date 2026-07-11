import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { ukRoutes } from "@/lib/destinations";
import { createClient } from "next-sanity";

async function getBlogSlugs(): Promise<string[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-20",
      useCdn: true,
    });
    const posts = await client.fetch<{ slug: string }[]>(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`,
    );
    return posts?.map((p) => p.slug).filter(Boolean) ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/flights",
    "/destinations",
    "/deals",
    "/how-it-works",
    "/about",
    "/blog",
    "/support",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${base}${route}/`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/blog" || route === "/flights"
        ? "weekly"
        : "monthly",
    priority:
      route === "" ? 1 : route === "/flights" ? 0.9 : route === "/blog" ? 0.8 : 0.6,
  }));

  const flightRoutes: MetadataRoute.Sitemap = ukRoutes.map((route) => ({
    url: `${base}/flights/${route.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogSlugs = await getBlogSlugs();
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...flightRoutes, ...blogRoutes];
}
