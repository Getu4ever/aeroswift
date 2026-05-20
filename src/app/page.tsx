'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchBox from '@/components/SearchBox';
import ResultsList from '@/components/ResultsList';
import FlightSkeleton from '@/components/FlightSkeleton';
import PopularDestinations from '@/components/PopularDestinations';

type Flight = { id: number; airline: string; price: string; time: string; };

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Flight[] | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (from: string, to: string) => {
    if (!from.trim() || !to.trim()) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    
    setIsLoading(true);
    setResults(null);
    setError(false);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResults([
      { id: 1, airline: 'AeroSwift Airways', price: '$450', time: '10:00 AM' },
      { id: 2, airline: 'Global Jet', price: '$520', time: '02:30 PM' },
    ]);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section: Centered and Compact */}
      <section className="pt-16 pb-12 px-6 text-center">
  <h1 className="text-5xl md:text-6xl font-black mb-10 tracking-tight">
    <span className="text-slate-900">Find your </span>
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-indigo to-blue-500">
      next journey.
    </span>
  </h1>
        
        <div className="max-w-5xl mx-auto">
          {/* Search Box */}
          <SearchBox onSearch={handleSearch} isLoading={isLoading} error={error} />
          
          {/* Popular Destinations: Placed directly below with no extra whitespace */}
          {!isLoading && !results && (
            <div className="mt-8">
              <PopularDestinations onSelect={(city) => handleSearch('London', city)} />
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <FlightSkeleton />
        ) : (
          <ResultsList results={results} />
        )}
      </section>
    </main>
  );
}