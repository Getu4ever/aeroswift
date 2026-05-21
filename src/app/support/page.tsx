'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Heading updated to use standard h1 class that inherits brand color */}
            <h1 className="text-5xl font-black mb-6 tracking-tight">How can we help?</h1>
            <p className="text-xl text-slate-600">Everything you need to know about your travel experience with AeroSwift.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* FAQ Item 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Where is my booking confirmation?</h3>
              <p className="text-slate-600 leading-relaxed">
                Since AeroSwift is a flight search engine, your booking is handled directly by the airline or travel agency you selected. Please check your email inbox (including the spam/junk folder) for the confirmation sent by them.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">How do I change my flight?</h3>
              <p className="text-slate-600 leading-relaxed">
                Any changes to your itinerary, such as date changes or cancellations, must be managed through the airline or booking agency's website directly. Have your booking reference number ready.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">How does AeroSwift work?</h3>
              <p className="text-slate-600 leading-relaxed">
                We compare millions of flight routes to help you find the best prices. When you click "Book," we securely redirect you to our trusted partners to complete the transaction.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Need more assistance?</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                For partnerships or site-specific issues, our team is happy to help you via email.
              </p>
              <a 
                href="mailto:support@aeroswift.com" 
                className="text-brand-indigo font-bold hover:underline"
              >
                support@aeroswift.com
              </a>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-brand-indigo rounded-3xl p-10 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">Still can't find what you're looking for?</h3>
            <p className="text-indigo-100 mb-6">Our dedicated support team usually replies within 24 hours.</p>
            <a href="mailto:support@aeroswift.com" className="px-8 py-3 bg-white text-brand-indigo font-bold rounded-full hover:bg-slate-100 transition">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}