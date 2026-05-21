'use client';

import { useEffect, useState } from 'react';
import { createClient } from 'next-sanity';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

// Initialize the client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2026-05-20',
  useCdn: false,
});

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch posts from Sanity with slug included
    const query = `*[_type == "post"]{
      title,
      seoTitle,
      excerpt,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      publishedAt
    }`;

    client.fetch(query).then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-black text-[#560591] tracking-tight">Travel Insights</h1>
          <p className="mt-4 text-lg text-slate-600">Stories, tips, and global travel news from AeroSwift.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 font-medium">No blog posts yet. Add some in your /studio!</p>
            </div>
          ) : (
             posts.map((post, index) => (
               <div key={index} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full">
                 {post.imageUrl && (
                   <img src={post.imageUrl} alt={post.seoTitle || post.title} className="w-full h-48 object-cover" />
                 )}
                 <div className="p-6 flex-grow flex flex-col">
                   <h2 className="text-xl font-bold text-[#560591]">{post.seoTitle || post.title}</h2>
                   <p className="text-sm text-slate-500 mt-1">{new Date(post.publishedAt).toLocaleDateString()}</p>
                   {post.excerpt && <p className="text-slate-600 mt-4 text-sm leading-relaxed mb-6">{post.excerpt}</p>}
                   
                   <div className="mt-auto">
                     <Link href={`/blog/${post.slug}`} className="text-[#560591] font-semibold text-sm hover:underline flex items-center">
                       Read Article →
                     </Link>
                   </div>
                 </div>
               </div>
             ))
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}