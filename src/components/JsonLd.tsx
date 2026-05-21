// src/components/JsonLd.tsx
export default function JsonLd({ post }: { post: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "datePublished": post.publishedAt,
    "keywords": post.keywords?.join(", "), // Uses the keywords you just added!
    "author": {
      "@type": "Organization",
      "name": "AeroSwift"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}