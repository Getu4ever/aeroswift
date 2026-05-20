import Link from 'next/link';

type Flight = { id: number; airline: string; price: string; time: string; };

export default function ResultsList({ results }: { results: Flight[] | null }) {
  if (results === null) return null;

  return (
    <div className="max-w-4xl mx-auto mt-12 grid gap-4">
      {results.length === 0 && (
        <div className="bg-white p-10 rounded-xl border border-slate-200 text-slate-500">
          No flights found for this route.
        </div>
      )}

      {results.map((flight) => (
        <div key={flight.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center transition-all hover:border-brand-indigo/30 hover:shadow-md">
          <div className="text-left">
            <h3 className="font-bold text-lg text-slate-900">{flight.airline}</h3>
            <p className="text-slate-500">{flight.time}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-2xl font-black text-brand-indigo">{flight.price}</div>
            <Link 
              href={`/booking/${flight.id}?airline=${encodeURIComponent(flight.airline)}&price=${flight.price}&time=${encodeURIComponent(flight.time)}`}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}