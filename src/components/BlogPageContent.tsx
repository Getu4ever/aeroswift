"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export type BlogPostCard = {
  title: string;
  seoTitle?: string;
  excerpt?: string;
  slug: string;
  imageUrl?: string;
  publishedAt: string;
};

export default function BlogPageContent({ posts }: { posts: BlogPostCard[] }) {
  return (
    <main className="min-h-screen bg-sky">
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="section-label mb-3">Journal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Travel insights
          </h1>
          <p className="mt-4 text-lg text-ink/60">
            Tips, routes, and weekend ideas for flying from the UK.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {posts.length === 0 ? (
            <div className="py-16 text-center border-y border-mist">
              <p className="text-ink/50">
                No posts yet. Add articles in{" "}
                <Link href="/studio" className="text-accent font-semibold">
                  /studio
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-mist border-y border-mist">
              {posts.map((post, index) => (
                <motion.li
                  key={post.slug}
                  initial={{ y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                >
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="flex flex-col sm:flex-row gap-5 py-8 group"
                  >
                    {post.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full sm:w-40 h-28 object-cover rounded-lg shrink-0"
                      />
                    )}
                    <div>
                      <p className="text-xs text-ink/40 mb-1">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <h2 className="font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                        {post.seoTitle || post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-ink/55 mt-2 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-accent mt-3">
                        Read article →
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
