import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07575B] text-white py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white">
              Aero<span style={{ color: '#ffdf00' }}>Swift</span>
            </Link>
            <p className="mt-4 text-sm text-white/80 leading-relaxed max-w-xs">
              Making global travel effortless, affordable, and accessible for everyone.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-indigo-200 transition">Flights</Link></li>
                <li><Link href="/destinations" className="hover:text-indigo-200 transition">Destinations</Link></li>
                <li><Link href="/deals" className="hover:text-indigo-200 transition">Travel Deals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-indigo-200 transition">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-indigo-200 transition">Blog</Link></li>
                <li><Link href="/support" className="hover:text-indigo-200 transition">Support Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="hover:text-indigo-200 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-200 transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/70">
            © {currentYear} AeroSwift. All rights reserved.
          </p>
          
          <div className="text-[11px] text-white/50 font-medium">
            Development by{' '}
            <a 
              href="https://www.karoldigital.co.uk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition underline"
            >
              Karol Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}