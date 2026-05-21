'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationGrid from '@/components/DestinationGrid';
import { motion } from 'framer-motion';

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          {/* h1 color is now handled by your global CSS */}
          <h1 className="text-5xl font-black tracking-tight">Top Destinations</h1>
          <p className="mt-4 text-lg text-slate-600">Handpicked locations for your next unforgettable journey.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Ensure your DestinationGrid component is using the same 
            onSelect handler logic as the home page to maintain 
            affiliate tracking consistency:
            onSelect={(city) => window.location.href = `...&marker=730324`}
          */}
          <DestinationGrid />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}