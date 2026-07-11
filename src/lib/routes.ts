import { ukRoutes, type UkRoute } from "@/lib/destinations";

export type { UkRoute };

export function getRouteBySlug(slug: string): UkRoute | undefined {
  return ukRoutes.find((r) => r.slug === slug);
}

export function getAllRouteSlugs(): string[] {
  return ukRoutes.map((r) => r.slug);
}
