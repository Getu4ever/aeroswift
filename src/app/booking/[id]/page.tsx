'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

// This function is REQUIRED for dynamic routes when using output: 'export'
export async function generateStaticParams() {
  // Return an empty array or a set of placeholder IDs to satisfy the build
  return [{ id: '1' }]; 
}

export default function BookingPage() {
  const params = useParams();
  const flightId = params?.id;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto py-20 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">
            Ready to book your flight?
          </h1>
          <p className="text-slate-600 mb-8">
            {flightId ? `Viewing flight: ${flightId}` : "Loading..."}
          </p>
          <a 
            href={`https://your-affiliate-link-here.com?id=${flightId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-brand-indigo text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Confirm & Book on Partner Site
          </a>
        </div>
      </div>
    </main>
  );
}