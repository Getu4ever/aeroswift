import Link from "next/link";
import { getSupportEmail } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = getSupportEmail();

  return (
    <footer className="w-full bg-ink text-white py-14 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-tight text-white"
            >
              Aero<span className="text-spark">Swift</span>
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              UK flight comparison — clear search, trusted partners, prices in
              pounds.
            </p>
            <p className="mt-4 text-xs text-white/45 leading-relaxed max-w-md">
              We may earn a commission when you book through partner links, at
              no extra cost to you. AeroSwift is not a travel agent or airline.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Explore
              </h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <Link href="/flights" className="hover:text-white transition">
                    Popular routes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations"
                    className="hover:text-white transition"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-white transition">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-white transition"
                  >
                    How it works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="hover:text-white transition break-all"
                  >
                    {supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {currentYear} AeroSwift · aeroswift.co.uk
          </p>
          <p className="text-[11px] text-white/40">
            Built by{" "}
            <a
              href="https://www.karoldigital.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/70"
            >
              Karol Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
