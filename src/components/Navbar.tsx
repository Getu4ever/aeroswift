import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-5 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
          Aero<span style={{ color: '#560591' }}>Swift</span>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-[#560591] transition-colors">Flights</Link>
          <Link href="/destinations" className="hover:text-[#560591] transition-colors">Destinations</Link>
          <Link href="/deals" className="hover:text-[#560591] transition-colors">Deals</Link>
          <Link href="/blog" className="hover:text-[#560591] transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-[#560591] transition-colors">About</Link>
        </nav>

        {/* CTA Section */}
        <div className="flex items-center gap-4">
          <Link href="/support" className="text-sm font-semibold text-slate-600 hover:text-[#560591] transition-colors">
            Support
          </Link>
          {/* External affiliate redirect using standard <a> tag */}
          <a 
            href="https://www.aviasales.com/?marker=730324" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#560591] text-white text-sm font-bold rounded-full hover:bg-indigo-800 transition-all shadow-md hover:shadow-indigo-200"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}