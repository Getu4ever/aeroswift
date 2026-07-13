import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ArticleActions from "@/components/ArticleActions";
import styles from "./blog.module.css";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-20",
  useCdn: true,
});

const getPostQuery = `*[_type == "post" && slug.current == $slug][0]{
  title, seoTitle, excerpt, seoDescription, keywords, publishedAt, body, author->{ name },
  "imageUrl": mainImage.asset->url,
  "related": *[_type == "post" && slug.current != $slug][0...3]{ 
    title, slug, "imageUrl": mainImage.asset->url 
  }
}`;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { title: "Blog" };
  }
  try {
    const post = await client.fetch(getPostQuery, { slug });
    if (!post) return { title: "Post not found" };
    return buildPageMetadata({
      title: post.seoTitle || post.title,
      description:
        post.seoDescription ||
        post.excerpt ||
        "Travel insights from AeroSwift.",
      path: `/blog/${slug}`,
      keywords: Array.isArray(post.keywords) ? post.keywords : [],
    });
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(getPostQuery, { slug });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.seoDescription || post.excerpt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
  };

  return (
    <main className="min-h-screen bg-sky">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <article
        className={`max-w-3xl mx-auto px-6 py-16 md:py-20 ${styles.animateSlide}`}
      >
        <p className="text-sm text-ink/45 font-medium mb-3">
          {formatDate(post.publishedAt)}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight mb-8">
          {post.title}
        </h1>

        {post.imageUrl && (
          <div className="relative w-full mb-10 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="text-ink/75">
          <PortableText
            value={post.body}
            components={{
              block: {
                h1: ({ children }) => (
                  <h2 className="font-display text-3xl font-semibold text-ink mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2 className="font-display text-2xl font-semibold text-ink mt-8 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-ink mt-6 mb-2">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-ink mt-5 mb-2">
                    {children}
                  </h4>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent pl-4 italic text-ink/60 my-6">
                    {children}
                  </blockquote>
                ),
                normal: ({ children }) => (
                  <p className="mb-5 leading-relaxed">{children}</p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc ml-6 mb-5 space-y-1">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal ml-6 mb-5 space-y-1">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li className="mb-1">{children}</li>,
              },
              marks: {
                link: ({ children, value }) => {
                  const href = value?.href || "#";
                  const isInternal =
                    href.startsWith("/") ||
                    href.includes("aeroswift.co.uk");
                  return (
                    <a
                      href={href}
                      className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark"
                      {...(!isInternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {children}
                    </a>
                  );
                },
                strong: ({ children }) => (
                  <strong className="font-semibold text-ink">{children}</strong>
                ),
                em: ({ children }) => <em>{children}</em>,
              },
            }}
          />
        </div>

        <ArticleActions title={post.title} />

        {post.related?.length > 0 && (
          <>
            <h3 className="font-display text-2xl font-semibold text-ink mt-14 mb-6">
              Related
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.related.map(
                (rel: {
                  title: string;
                  slug: { current: string };
                  imageUrl?: string;
                }) => (
                  <Link
                    href={`/blog/${rel.slug.current}`}
                    key={rel.slug.current}
                    className="group"
                  >
                    {rel.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rel.imageUrl}
                        alt=""
                        className="rounded-lg h-28 w-full object-cover mb-2"
                      />
                    )}
                    <p className="font-semibold text-ink group-hover:text-accent transition-colors text-sm">
                      {rel.title}
                    </p>
                  </Link>
                ),
              )}
            </div>
          </>
        )}

        <div className="mt-12 pt-8 border-t border-mist">
          <Link
            href="/blog"
            className="inline-flex items-center text-accent font-semibold hover:underline"
          >
            ← Back to blog
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
