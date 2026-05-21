'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-100 py-5 px-4 md:px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Aero<span style={{ color: '#560591' }}>Swift</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          {['Flights', 'Destinations', 'Deals', 'Blog', 'About'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Flights' ? '/' : `/${item.toLowerCase()}`} 
              className="hover:text-[#560591] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/support" className="text-sm font-semibold text-slate-600 hover:text-[#560591] transition-colors">Support</Link>
          <a href="https://www.aviasales.com/?marker=730324" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#560591] text-white text-sm font-bold rounded-full hover:bg-indigo-800 transition-all active:scale-95 shadow-md">
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="md:hidden p-2 text-slate-900 active:scale-90 transition-transform" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 px-6 py-8 flex flex-col gap-6 shadow-xl overflow-hidden"
          >
            {['Flights', 'Destinations', 'Deals', 'Blog', 'About', 'Support'].map((item) => (
              <Link 
                key={item} 
                href={item === 'Flights' ? '/' : `/${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-bold text-slate-800 active:text-[#560591]"
              >
                {item}
              </Link>
            ))}
            <a 
              href="https://www.aviasales.com/?marker=730324" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-2 block w-full px-5 py-4 bg-[#560591] text-white text-center font-bold rounded-2xl active:scale-[0.98] transition-transform"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}