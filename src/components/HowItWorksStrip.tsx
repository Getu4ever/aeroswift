import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Search",
    body: "Enter where you’re flying from and to. We show options from our partners in pounds.",
  },
  {
    n: "02",
    title: "Compare",
    body: "Check times, stops, and fares side by side — no account required.",
  },
  {
    n: "03",
    title: "Book with a partner",
    body: "Complete payment on the airline or agency site. They handle your ticket and support.",
  },
];

export default function HowItWorksStrip() {
  return (
    <section className="bg-sky border-y border-mist py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-3">Simple by design</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              How AeroSwift works
            </h2>
          </div>
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-accent hover:text-accent-dark transition"
          >
            Full details →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-display text-4xl text-sky-deep font-semibold mb-3">
                {step.n}
              </p>
              <h3 className="text-lg font-semibold text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
