'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <article className="max-w-4xl mx-auto py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-black mb-8" style={{ color: '#560591' }}>Terms of Service</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
        >
          <p><strong>Last Updated: May 21, 2026</strong></p>
          <p>By accessing AeroSwift, you agree to comply with these terms. If you do not agree, please discontinue use of this service immediately.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">1. Scope of Service</h2>
          <p>AeroSwift is a travel search engine. We do not act as a travel agent, carrier, or booking operator. We provide real-time information sourced from third-party travel providers.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">2. Limitation of Liability</h2>
          <p>All flight prices, availability, and scheduling details are provided by third-party vendors. AeroSwift does not guarantee the accuracy of this data. Any issues regarding booking, ticketing, refunds, or cancellations must be addressed directly with the relevant airline or agency.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">3. User Obligations</h2>
          <p>You agree to use this site for personal, non-commercial purposes only. Automated scraping, data mining, or any attempt to compromise the integrity of our infrastructure is strictly prohibited.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">4. Intellectual Property</h2>
          <p>All content, branding, and design elements on AeroSwift are the property of AeroSwift and protected by international copyright law.</p>
        </motion.div>
      </article>
      
      <Footer />
    </main>
  );
}