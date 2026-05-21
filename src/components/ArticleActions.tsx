'use client';
import { useState, useEffect } from 'react';

export default function ArticleActions({ title }: { title: string }) {
  const [likes, setLikes] = useState(0);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="mt-12 py-10 border-t border-slate-100">
      <button 
        onClick={() => setLikes(likes + 1)}
        className="px-6 py-2 bg-slate-100 rounded-full font-semibold hover:bg-[#560591] hover:text-white transition flex items-center gap-2"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        Like ({likes})
      </button>
      
      <div className="mt-10">
        <p className="text-lg font-bold text-slate-900 mb-4">Share</p>
        <div className="flex gap-4">
          {/* Facebook Icon */}
          <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)} className="w-10 h-10 flex items-center justify-center bg-[#560591] rounded-lg text-white">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </button>
          {/* X / Twitter Icon */}
          <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`)} className="w-10 h-10 flex items-center justify-center bg-[#560591] rounded-lg text-white">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </button>
          {/* LinkedIn Icon */}
          <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`)} className="w-10 h-10 flex items-center justify-center bg-[#560591] rounded-lg text-white">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
          </button>
          {/* WhatsApp Icon */}
          <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${title} ${url}`)} className="w-10 h-10 flex items-center justify-center bg-[#560591] rounded-lg text-white">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </button>
          {/* Copy Link Icon */}
          <button onClick={copyToClipboard} className="w-10 h-10 flex items-center justify-center bg-[#560591] rounded-lg text-white">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}