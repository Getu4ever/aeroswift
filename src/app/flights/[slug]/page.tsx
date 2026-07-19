import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getAffiliateSearchLink } from "@/lib/affiliate";
import { getRouteImage, ukRoutes } from "@/lib/destinations";
import { getRouteBySlug } from "@/lib/routes";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ukRoutes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return { title: "Route not found" };

  return buildPageMetadata({
    title: route.seoTitle,
    description: route.seoDescription,
    path: `/flights/${route.slug}`,
    keywords: [
      `flights ${route.from} to ${route.to}`,
      `cheap flights ${route.from} ${route.to}`,
      `${route.fromCode} to ${route.toCode}`,
      `${route.from} ${route.to} flights`,
    ],
  });
}

export default async function FlightRoutePage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const searchHref = getAffiliateSearchLink(route.toCode, route.fromCode);
  const related = ukRoutes.filter((r) => r.slug !== route.slug).slice(0, 4);
  const image = getRouteImage(route.toCode);

  const faqs = [
    {
      question: `How do I find cheap flights from ${route.from} to ${route.to}?`,
      answer: `Use AeroSwift to compare partner fares for ${route.from} (${route.fromCode}) to ${route.to} (${route.toCode}). Stay flexible on dates and airports when you can — then complete booking on the partner site.`,
    },
    {
      question: "Does AeroSwift sell the ticket?",
      answer:
        "No. AeroSwift is a comparison site. When you click through, you book with an airline or travel agency. We may earn a commission at no extra cost to you.",
    },
    {
      question: "Are prices shown in pounds?",
      answer:
        "Yes — we focus on UK travellers and GBP pricing via our partners wherever possible. Always confirm the final price on the partner checkout page.",
    },
  ];

  return (
    <main className="min-h-screen bg-sky">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flights", path: "/flights" },
          {
            name: `${route.from} to ${route.to}`,
            path: `/flights/${route.slug}`,
          },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <nav className="text-sm text-ink/45 mb-8">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/flights/" className="hover:text-accent">
            Flights
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">
            {route.from} to {route.to}
          </span>
        </nav>

        <div className="relative h-52 md:h-64 w-full rounded-lg overflow-hidden mb-10 bg-mist">
          <Image
            src={image}
            alt={route.to}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <p className="absolute bottom-4 left-4 text-xs font-semibold tracking-wider text-white/80 uppercase">
            {route.fromCode} → {route.toCode}
          </p>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          Cheap flights from {route.from} to {route.to}
        </h1>
        <p className="mt-4 text-lg text-ink/60 leading-relaxed">{route.intro}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={searchHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary text-center"
          >
            Search {route.from} → {route.to} flights
          </a>
          <Link
            href="/how-it-works/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-ink border border-mist rounded-md hover:border-accent hover:text-accent transition-colors"
          >
            How booking works
          </Link>
        </div>
        <p className="mt-3 text-xs text-ink/45">
          Opens our partner search with tracking. We may earn a commission if
          you book — at no extra cost to you.
        </p>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">
            Tips for this route
          </h2>
          <ul className="space-y-3">
            {route.tips.map((tip) => (
              <li
                key={tip}
                className="text-ink/70 leading-relaxed pl-4 border-l-2 border-accent/40"
              >
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-mist border-y border-mist">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-semibold text-ink mb-2">{faq.question}</h3>
                <p className="text-ink/65 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">
            Related UK routes
          </h2>
          <ul className="divide-y divide-mist border-y border-mist">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/flights/${r.slug}/`}
                  className="flex gap-4 items-center py-4 group"
                >
                  <div className="relative w-16 h-12 rounded-md overflow-hidden bg-mist shrink-0">
                    <Image
                      src={getRouteImage(r.toCode)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <span className="font-semibold text-ink group-hover:text-accent transition-colors">
                    {r.from} → {r.to}
                  </span>
                  <span className="text-sm text-accent shrink-0 ml-auto">
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Footer />
    </main>
  );
}
