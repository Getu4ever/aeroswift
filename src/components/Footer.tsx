// src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07575B] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            Aero<span style={{ color: '#ffdf00' }}>Swift</span>
          </Link>
          
          <p className="mt-4 text-sm text-white/80">
            Making global travel effortless, affordable, and accessible for everyone.
          </p>
          
          {/* Developer credit: Further down, smaller, and dimmed */}
          <div className="mt-10 text-[11px] text-white/50 font-medium">
            Web development by{' '}
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

        {/* Links Columns */}
        <div>
          <h4 className="text-white font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/flights" className="hover:text-indigo-200 transition">Flights</Link></li>
            <li><Link href="/destinations" className="hover:text-indigo-200 transition">Destinations</Link></li>
            <li><Link href="/deals" className="hover:text-indigo-200 transition">Travel Deals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-indigo-200 transition">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-indigo-200 transition">Blog</Link></li>
            <li><Link href="/support" className="hover:text-indigo-200 transition">Support Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-indigo-200 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-200 transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright centered */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/20 text-center text-xs text-white/80">
        <p>© {currentYear} AeroSwift. All rights reserved.</p>
      </div>
    </footer>
  );
}