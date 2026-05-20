// src/components/PopularDestinations.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const initialDestinations = [
  { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400' },
  { name: 'Barcelona', img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400' },
  { name: 'Amsterdam', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=400' },
  { name: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400' },
  { name: 'Berlin', img: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=400' },
  { name: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400' },
];

export default function PopularDestinations({ onSelect }: { onSelect: (city: string) => void }) {
  const [destinations, setDestinations] = useState(initialDestinations.map(d => ({ ...d, price: '...' })));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDestinations(prev => prev.map(d => ({ ...d, price: `$${Math.floor(Math.random() * 300) + 100}` })));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular Destinations</h2>
          <p className="text-slate-500 mt-1 font-medium italic">Hand-picked European getaways</p>
        </div>
        
        <div className="flex gap-2">
          {['left', 'right'].map((dir) => (
            <button 
              key={dir}
              onClick={() => scroll(dir as 'left' | 'right')} 
              className="p-3 bg-slate-100 hover:bg-[#560591] hover:text-white text-slate-600 rounded-full transition-all duration-300"
            >
              {dir === 'left' ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>
      
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4">
        {destinations.map((dest, index) => (
          <motion.button 
            key={dest.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => onSelect(dest.name)}
            className="flex-none w-64 group relative overflow-hidden rounded-3xl h-80 shadow-lg"
          >
            <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-left">
              <h3 className="text-xl font-bold text-white">{dest.name}</h3>
              <p className="text-white/80 text-sm font-medium">from {dest.price}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}