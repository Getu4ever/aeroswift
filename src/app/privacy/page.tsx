'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <article className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-black mb-8" style={{ color: '#560591' }}>Privacy Policy</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
        >
          <p><strong>Last Updated: May 21, 2026</strong></p>
          <p>AeroSwift ("we", "us", "our") is committed to protecting your personal information. This policy outlines how we collect, use, and safeguard data provided through our flight search engine.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">1. Data Collection</h2>
          <p>We collect information you voluntarily provide during searches, such as origin, destination, and travel dates. We also collect technical metadata including IP addresses, browser types, and cookie-based identifiers to optimize site performance.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">2. Use of Information</h2>
          <p>Your data is used solely to facilitate the comparison of travel services. We do not sell your personal data to third parties. We use analytics to improve our search algorithms and user interface.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">3. Third-Party Redirection</h2>
          <p>AeroSwift acts as a search intermediary. When you initiate a booking, you are redirected to the website of an airline or travel agency. We are not responsible for the privacy practices of these third-party platforms; please review their respective policies before completing transactions.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">4. Cookies</h2>
          <p>Our site utilizes cookies to maintain session states. You may disable cookies via your browser settings, though this may impact site functionality.</p>
        </motion.div>
      </article>
      
      <Footer />
    </main>
  );
}