'use client';

import Navbar from '@/components/Navbar';
import AviasalesSearch from '@/components/AviasalesSearch'; 
import PopularDestinations from '@/components/PopularDestinations';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="text-center pt-8 pb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
        >
          Find your <span style={{ color: '#560591' }}>next journey.</span>
        </motion.h1>
        
        {/* Search Box: No longer requires the 'title' prop */}
        <div className="w-full">
          <AviasalesSearch />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="max-w-7xl mx-auto px-6 pt-0 pb-20">
        <PopularDestinations onSelect={(city) => {
            window.location.href = `https://www.aviasales.com/search/LHR1?destination_name=${city}&marker=730324`;
        }} />
      </section>

      <Footer />
    </main>
  );
}