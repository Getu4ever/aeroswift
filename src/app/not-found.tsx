import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sky flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-xl mx-auto px-6 py-24 text-center">
        <p className="section-label mb-3">404</p>
        <h1 className="font-display text-4xl font-semibold text-ink mb-4">
          Page not found
        </h1>
        <p className="text-ink/60 mb-8">
          That page doesn&apos;t exist. Try a popular route or head home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link
            href="/flights/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold border border-mist rounded-md hover:border-accent hover:text-accent"
          >
            Browse flights
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
