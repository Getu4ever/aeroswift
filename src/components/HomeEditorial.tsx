import Link from "next/link";

/**
 * Substantive homepage copy for SEO / page quality — kept below the fold
 * so the hero stays clean.
 */
export default function HomeEditorial() {
  return (
    <section className="py-16 md:py-20 px-6 bg-sky border-t border-mist">
      <div className="max-w-3xl mx-auto">
        <p className="section-label mb-3">For UK travellers</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight">
          Compare cheap flights from the UK
        </h2>
        <p className="mt-4 text-lg text-ink/60 leading-relaxed">
          Finding a fair fare should not mean opening ten tabs and guessing which
          price is real. AeroSwift helps you compare flights from the UK in
          pounds, then continue booking with a trusted partner.
        </p>

        <div className="mt-10 space-y-6 text-ink/70 leading-relaxed">
          <p>
            Whether you are planning a weekend in Paris, sun in Spain, or a
            longer trip to New York or Dubai, the same habits save money:
            flexibility on dates, checking more than one London airport, and
            comparing partners before you pay. We surface options from our
            affiliate partners so you can see times, stops, and indicative
            fares in one place — then complete the booking on their site.
          </p>

          <h3 className="font-display text-2xl font-semibold text-ink pt-2">
            Why UK travellers use a comparison site
          </h3>
          <p>
            Airlines and online travel agencies often show different fares for
            the same route. Cabin-bag rules, airport choice, and midweek versus
            weekend departures can change the total more than the headline
            price. A comparison layer helps you spot those differences quickly
            without committing until you are ready.
          </p>
          <p>
            AeroSwift is built for departures from the UK. We focus on routes
            people actually fly — city breaks, winter sun, and popular
            long-haul — and we keep prices in GBP wherever our partners allow.
            We are not a travel agent or airline. When you click through, you
            book with the partner; they issue the ticket and handle changes or
            refunds.
          </p>

          <h3 className="font-display text-2xl font-semibold text-ink pt-2">
            Practical tips before you search
          </h3>
          <p>
            Stay flexible by a day or two if you can. Tuesday and Wednesday
            outbound flights are often cheaper than Friday evenings. For short
            hops, compare Heathrow, Gatwick, Stansted, Luton, and City — and
            from outside London, check Manchester, Birmingham, Edinburgh,
            Glasgow, and Bristol as well. Pack light when cabin-bag-only fares
            are available; baggage fees wipe out many “deals.”
          </p>
          <p>
            Always confirm the live price on the partner checkout page.
            Indicative figures on AeroSwift are a starting point. Read the fare
            rules for changes, and keep your booking reference from the partner
            email — that is who to contact if plans change.
          </p>

          <h3 className="font-display text-2xl font-semibold text-ink pt-2">
            Where to go next
          </h3>
          <p>
            Browse{" "}
            <Link
              href="/flights/"
              className="text-accent font-semibold hover:underline"
            >
              popular UK flight routes
            </Link>{" "}
            for guides and tips, check{" "}
            <Link
              href="/deals/"
              className="text-accent font-semibold hover:underline"
            >
              current deals
            </Link>{" "}
            for hand-picked destinations, or read{" "}
            <Link
              href="/how-it-works/"
              className="text-accent font-semibold hover:underline"
            >
              how booking works
            </Link>{" "}
            if you want the full picture on affiliates and commissions. When
            you are ready, use the search above to compare live fares and open
            a partner site to finish your booking.
          </p>
        </div>
      </div>
    </section>
  );
}
