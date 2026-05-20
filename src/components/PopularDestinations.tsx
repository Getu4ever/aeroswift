'use client';
import { useState, useEffect, useRef } from 'react';

const initialDestinations = Array.from({ length: 10 }, (_, i) => ({ 
  name: i === 0 ? 'India' : i === 1 ? 'Uzbekistan' : i === 2 ? 'Spain' : i === 3 ? 'Italy' : `Destination ${i + 1}`, 
  price: '...', 
  img: `https://picsum.photos/seed/${i + 50}/400/500`
}));

export default function PopularDestinations({ onSelect }: { onSelect: (city: string) => void }) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDestinations(prev => prev.map(d => ({ ...d, price: `$${Math.floor(Math.random() * 500) + 20}` })));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900">Popular destinations</h2>
          <p className="text-slate-500 font-medium">from London</p>
        </div>
        
        <div className="flex gap-2">
          {[
            { dir: 'left', icon: '←' },
            { dir: 'right', icon: '→' }
          ].map((btn) => (
            <button 
              key={btn.dir}
              onClick={() => scroll(btn.dir as 'left' | 'right')} 
              className="p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-brand-indigo hover:text-brand-indigo transition-all"
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2">
        {destinations.map((dest) => (
          <button 
            key={dest.name}
            onClick={() => onSelect(dest.name)}
            className="flex-none w-48 group text-left"
          >
            <div className="relative overflow-hidden rounded-xl h-56 mb-3 bg-slate-100 shadow-inner">
              <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-bold text-slate-900 truncate">{dest.name}</h3>
            <p className="text-sm text-slate-500">from {dest.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}