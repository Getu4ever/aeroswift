// src/components/DestinationGrid.tsx
import Image from 'next/image';

const destinations = [
  { name: 'Paris', country: 'France', region: 'Europe', image: '/images/paris.jpg' },
  { name: 'London', country: 'UK', region: 'Europe', image: '/images/london.jpg' },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', image: '/images/tokyo.jpg' },
  { name: 'New York', country: 'USA', region: 'North America', image: '/images/ny.jpg' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', image: '/images/dubai.jpg' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', image: '/images/bali.jpg' },
];

export default function DestinationGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((dest) => (
        <div 
          key={dest.name} 
          className="group cursor-pointer overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Image Container */}
          <div className="h-64 w-full relative overflow-hidden bg-slate-200">
             <Image 
               src={dest.image} 
               alt={`${dest.name}, ${dest.country}`} 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-500"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             />
          </div>
          
          {/* Content Area */}
          <div className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#560591] transition-colors">{dest.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{dest.country}</p>
                </div>
                {/* Region Tag */}
                <span className="text-[10px] uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">
                    {dest.region}
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}