import { notFound } from "next/navigation";
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ArticleActions from "@/components/ArticleActions";
import styles from "./blog.module.css"; // Import the styles

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2026-05-20",
  useCdn: false,
});

const getPostQuery = `*[_type == "post" && slug.current == $slug][0]{
  title, seoTitle, excerpt, seoDescription, publishedAt, body, author->{ name },
  "imageUrl": mainImage.asset->url,
  "related": *[_type == "post" && slug.current != $slug][0...3]{ 
    title, slug, "imageUrl": mainImage.asset->url 
  }
}`;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(dateString));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(getPostQuery, { slug });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.publishedAt,
    "description": post.seoDescription || post.excerpt,
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      {/* Use the CSS module class */}
      <article className={`max-w-3xl mx-auto px-6 py-16 ${styles.animateSlide}`}>
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-slate-100">
          <p className="text-sm text-slate-500 font-medium mb-2">{formatDate(post.publishedAt)}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#560591] leading-tight mb-6">{post.title}</h1>
          
          {post.imageUrl && (
            <div className="relative w-full mb-12 rounded-xl overflow-hidden shadow-sm">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-slate-700">
            <PortableText 
              value={post.body}
              components={{
                block: {
                  h1: ({children}) => <h1 className="text-3xl font-extrabold text-[#560591] mt-10 mb-5">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-extrabold text-[#560591] mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold text-[#560591] mt-6 mb-3">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-semibold text-[#560591] mt-5 mb-2">{children}</h4>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-[#560591] pl-4 italic text-slate-600 my-6 py-1">{children}</blockquote>,
                  normal: ({children}) => <p className="mb-5 leading-relaxed">{children}</p>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc ml-6 mb-5 space-y-1">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal ml-6 mb-5 space-y-1">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="mb-1">{children}</li>,
                }
              }}
            />
          </div>

          <ArticleActions title={post.title} />

          <h3 className="text-2xl font-bold text-[#560591] mt-12 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.related.map((rel: any) => (
              <Link href={`/blog/${rel.slug.current}`} key={rel.slug.current} className="group">
                <img src={rel.imageUrl} className="rounded-lg h-32 w-full object-cover mb-2" />
                <p className="font-semibold text-slate-900 group-hover:text-[#560591]">{rel.title}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <Link href="/blog" className="inline-flex items-center text-[#560591] font-semibold hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}