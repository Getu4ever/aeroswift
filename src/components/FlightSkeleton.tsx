export default function FlightSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mt-12 grid gap-4 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded"></div>
            <div className="h-4 w-24 bg-slate-100 rounded"></div>
          </div>
          <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}