'use client';
import { useState, useRef, useEffect } from 'react';

interface SearchBoxProps {
  onSearch: (from: string, to: string, passengers: any) => Promise<void>;
  isLoading: boolean;
  error: boolean;
}

export default function SearchBox({ onSearch, isLoading, error }: SearchBoxProps) {
  const [tripType, setTripType] = useState('return');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [classType, setClassType] = useState('Economy');
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateCount = (key: keyof typeof passengers, delta: number) => {
    setPassengers(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  const handleSearchClick = async () => {
    onSearch(origin, destination, passengers);
  };

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 relative z-50">
      {/* Trip Type Tabs */}
      <div className="flex gap-6 mb-6 text-sm font-bold text-slate-500">
        <button onClick={() => setTripType('return')} className={tripType === 'return' ? 'text-brand-indigo' : ''}>Return</button>
        <button onClick={() => setTripType('oneway')} className={tripType === 'oneway' ? 'text-brand-indigo' : ''}>One-way</button>
        <button onClick={() => setTripType('multicity')} className={tripType === 'multicity' ? 'text-brand-indigo' : ''}>Multi-city</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Origin */}
        <div className="md:col-span-3 border rounded-xl">
          <input className="p-4 w-full outline-none font-bold" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </div>
        
        {/* Destination */}
        <div className="md:col-span-3 border rounded-xl">
          <input className="p-4 w-full outline-none font-bold" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>

        {/* Passenger/Class Selector */}
        <div className="md:col-span-3 border rounded-xl p-4 font-bold text-slate-700 cursor-pointer hover:border-brand-indigo" onClick={() => setIsOpen(!isOpen)}>
          {passengers.adults + passengers.children + passengers.infants} Passenger, {classType}
        </div>

        {/* Search Button */}
        <button className="md:col-span-3 bg-brand-indigo text-white py-4 rounded-xl font-black hover:bg-[#430472] transition" onClick={handleSearchClick} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search a flight'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-4 font-bold text-sm text-center">
          Please check your flight details and try again.
        </p>
      )}
      
      {/* Passenger Modal */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute top-40 right-6 w-80 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-[70]">
           <h3 className="font-bold text-lg mb-4">Number of passengers</h3>
           {[
            { label: 'Adults', sub: '12 years and older', key: 'adults' },
            { label: 'Children', sub: '2-11 years old', key: 'children' },
            { label: 'Infants', sub: 'Under 2 y.o., on lap', key: 'infants' }
          ].map(p => (
            <div key={p.key} className="flex justify-between items-center mb-4">
              <div><p className="font-bold">{p.label}</p><p className="text-xs text-slate-400">{p.sub}</p></div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateCount(p.key as any, -1)} className="w-8 h-8 rounded-full border border-slate-200">-</button>
                <span className="w-4 text-center font-bold">{passengers[p.key as keyof typeof passengers]}</span>
                <button onClick={() => updateCount(p.key as any, 1)} className="w-8 h-8 rounded-full bg-blue-500 text-white">+</button>
              </div>
            </div>
          ))}
          <h3 className="font-bold text-lg mt-6 mb-3">Class</h3>
          {['Economy', 'Comfort', 'Business', 'First'].map(c => (
            <label key={c} className="flex items-center gap-3 mb-2 cursor-pointer">
              <input type="radio" name="class" checked={classType === c} onChange={() => setClassType(c)} className="accent-blue-500" />
              {c}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}