'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const deals = [
  { 
    destination: "Paris", 
    price: "From £25", 
    route: "LON-PAR", 
    tag: "City Break", 
    link: "https://aviasales.tpo.li/Ntu6rPsQ",
    image: "/images/paris.jpg"
  },
  { 
    destination: "New York", 
    price: "From £215", 
    route: "LON-NYC", 
    tag: "Trending", 
    link: "https://aviasales.tpo.li/85qnfAxa",
    image: "/images/ny.jpg"
  },
  { 
    destination: "Dubai", 
    price: "From £177", 
    route: "LON-DXB", 
    tag: "Luxury", 
    link: "https://aviasales.tpo.li/niRfQlyF",
    image: "/images/dubai.jpg"
  },
];

export default function DealsPage() {
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
          <h1 className="text-5xl font-black tracking-tight">Exclusive Deals</h1>
          <p className="mt-4 text-lg text-slate-600">Hand-picked fares updated daily. Book before they're gone!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-48 w-full overflow-hidden">
                <img src={deal.image} alt={deal.destination} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider">{deal.tag}</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">{deal.destination}</h2>
                <p className="text-slate-500 mb-6">{deal.route}</p>
                <div className="text-4xl font-black text-slate-900 mb-6">{deal.price}</div>
                <a 
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-brand-indigo text-white text-center font-bold rounded-full hover:bg-indigo-800 transition"
                >
                  Book Flight
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}