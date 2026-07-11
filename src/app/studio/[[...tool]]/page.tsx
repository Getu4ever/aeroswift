/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// By forcing this to dynamic, we tell Next.js to skip this page during
// the static generation process, preventing the missing generateStaticParams error.
export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ tool?: string[] }>;
}) {
  await params;
  return <NextStudio config={config} />;
}
