import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Search",
    body: "Enter UK departure and destination cities. AeroSwift shows partner options for cheap flights from the UK in pounds.",
  },
  {
    n: "02",
    title: "Compare",
    body: "Fares, times, and stops are compared in seconds — side by side, with no account required.",
  },
  {
    n: "03",
    title: "Book with a partner",
    body: "Continue on the airline or agency site to pay. They issue your ticket and handle support.",
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
            <p className="mt-3 text-ink/60 max-w-xl text-sm md:text-base leading-relaxed">
              AeroSwift is built so cheap flights from the UK can be found and
              compared in seconds — then booked with a partner you trust.
            </p>
          </div>
          <Link
            href="/how-it-works/"
            className="text-sm font-semibold text-accent hover:text-accent-dark transition shrink-0"
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
