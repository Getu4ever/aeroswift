import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Aero<span className="text-brand-indigo">Swift</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-brand-indigo transition-colors">Flights</Link>
          <Link href="#" className="hover:text-brand-indigo transition-colors">Deals</Link>
          <Link href="#" className="hover:text-brand-indigo transition-colors">Support</Link>
        </nav>
      </div>
    </header>
  );
}