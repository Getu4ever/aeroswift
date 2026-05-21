'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          {/* h1 now automatically picks up the brand-indigo color from globals.css */}
          <h1 className="text-5xl font-black tracking-tight">About AeroSwift</h1>
          <p className="mt-4 text-lg text-slate-600">
            Redefining the global travel search experience through transparency and innovation.
          </p>
        </motion.div>

        {/* Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-12 relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-xl"
        >
          <Image 
            src="/images/about-hero.jpg" 
            alt="AeroSwift Global Travel" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="bg-white p-10 md:p-16 rounded-3xl border border-slate-100 shadow-sm space-y-12"
        >
          {/* Mission Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission: Simplifying Global Travel</h2>
            <p className="text-slate-600 leading-relaxed">
              At AeroSwift, we believe that exploring the world should be accessible, transparent, and seamless for everyone. 
              Our mission is to empower modern travelers by providing the most comprehensive, 
              <strong> global flight search experience</strong>. By aggregating flight data from hundreds of airlines, 
              we help you navigate the globe with confidence, ensuring you find the best value for your journey.
            </p>
          </div>

          {/* Innovation Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Why Choose AeroSwift?</h2>
            <p className="text-slate-600 leading-relaxed">
              In an industry often clouded by hidden fees and complex booking engines, AeroSwift stands for 
              <strong> travel transparency</strong>. Our platform is engineered to surface the most accurate 
              flight availability and pricing, reducing the friction of travel planning. Whether you are 
              searching for a budget-friendly weekend getaway in Europe or planning a complex 
              international multi-city expedition, our intelligent search technology is built to handle it all.
            </p>
          </div>

          {/* Scaling Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Built for a Borderless World</h2>
            <p className="text-slate-600 leading-relaxed">
              Founded in the United Kingdom, AeroSwift is rapidly scaling to become a premier 
              <strong> international travel platform</strong>. We are committed to evolving alongside 
              our users, consistently integrating new features and expanding our partner network to ensure 
              that no matter where you are or where you are going, your next journey is just a few clicks away.
            </p>
          </div>

          {/* Footer Commitment */}
          <div className="pt-8 border-t border-slate-100">
             <h4 className="font-bold text-slate-900 mb-2">Our Core Values</h4>
             <p className="text-sm font-medium text-brand-indigo">
               Innovation • User-First Design • Global Reach • Unmatched Transparency
             </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}