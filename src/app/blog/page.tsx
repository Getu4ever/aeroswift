import { createClient } from "next-sanity";
import BlogPageContent from "@/components/BlogPageContent";

async function getPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-20",
    useCdn: true,
  });

  try {
    return (
      (await client.fetch(
        `*[_type == "post"] | order(publishedAt desc){
          title,
          seoTitle,
          excerpt,
          "slug": slug.current,
          "imageUrl": mainImage.asset->url,
          publishedAt
        }`,
      )) || []
    );
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogPageContent posts={posts} />;
}
