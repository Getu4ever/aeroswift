/** Shared destination / deal / route content for AeroSwift. */

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000";

/** Wider aviation shot for the /flights page header */
export const FLIGHTS_HERO_IMAGE =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=2000";

export const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=1600";

export const destinations = [
  {
    name: "Paris",
    code: "PAR",
    country: "France",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "London",
    code: "LON",
    country: "UK",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Tokyo",
    code: "TYO",
    country: "Japan",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "New York",
    code: "NYC",
    country: "USA",
    region: "North America",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Dubai",
    code: "DXB",
    country: "UAE",
    region: "Middle East",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Bali",
    code: "DPS",
    country: "Indonesia",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab0?auto=format&fit=crop&q=80&w=800",
  },
] as const;

export const popularDestinations = [
  {
    name: "Paris",
    code: "PAR",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Barcelona",
    code: "BCN",
    img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Amsterdam",
    code: "AMS",
    img: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Rome",
    code: "ROM",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Lisbon",
    code: "LIS",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Berlin",
    code: "BER",
    img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Athens",
    code: "ATH",
    img: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Prague",
    code: "PRG",
    img: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=400",
  },
] as const;

/** Hand-picked deals — links are built with getAffiliateSearchLink(toCode, fromCode). */
export type Deal = {
  destination: string;
  fromCode: string;
  toCode: string;
  price: string;
  tag: string;
  image: string;
};

export const deals: Deal[] = [
  {
    destination: "Paris",
    fromCode: "LON",
    toCode: "PAR",
    price: "From £25",
    tag: "City break",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Barcelona",
    fromCode: "LON",
    toCode: "BCN",
    price: "From £35",
    tag: "City break",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Amsterdam",
    fromCode: "LON",
    toCode: "AMS",
    price: "From £30",
    tag: "Weekend",
    image:
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Lisbon",
    fromCode: "LON",
    toCode: "LIS",
    price: "From £40",
    tag: "City break",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Rome",
    fromCode: "LON",
    toCode: "ROM",
    price: "From £45",
    tag: "Culture",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Malaga",
    fromCode: "MAN",
    toCode: "AGP",
    price: "From £55",
    tag: "Sun escape",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "New York",
    fromCode: "LON",
    toCode: "NYC",
    price: "From £215",
    tag: "Long haul",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
  },
  {
    destination: "Dubai",
    fromCode: "LON",
    toCode: "DXB",
    price: "From £177",
    tag: "Sun escape",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
  },
];

/** Destination photos keyed by arrival IATA (for /flights list + guides) */
export const routeImages: Record<string, string> = {
  PAR: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
  BCN: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800",
  AMS: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800",
  LIS: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800",
  DUB: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&q=80&w=800",
  NYC: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
  AGP: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  DXB: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
  ROM: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800",
  MAD: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=800",
  ATH: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&q=80&w=800",
  PRG: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=800",
  IST: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800",
  ALC: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800",
  OPO: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&q=80&w=800",
  BER: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=800",
  VIE: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800",
};

export function getRouteImage(toCode: string): string {
  return routeImages[toCode.toUpperCase()] || HERO_IMAGE;
}

/** Popular UK departure routes for SEO /flights + /flights/[slug] */
export type UkRoute = {
  slug: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  blurb: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  tips: string[];
};

export const ukRoutes: UkRoute[] = [
  {
    slug: "london-to-paris",
    from: "London",
    fromCode: "LON",
    to: "Paris",
    toCode: "PAR",
    blurb: "Weekend city breaks, Eurostar alternative by air.",
    seoTitle: "Cheap flights London to Paris",
    seoDescription:
      "Compare cheap flights from London to Paris. Find flexible fares in £ and book with AeroSwift partners.",
    intro:
      "London to Paris is one of the busiest short-haul routes from the UK. Flying can beat the train when you find an early deal or need a city-centre airport that suits your plans. Compare one-way and return options, then book on a partner site.",
    tips: [
      "Midweek departures are often cheaper than Friday evenings.",
      "Check Stansted, Luton, Gatwick and Heathrow — prices vary a lot by airport.",
      "Travel light: cabin-bag-only fares are usually the best value on this route.",
    ],
  },
  {
    slug: "london-to-barcelona",
    from: "London",
    fromCode: "LON",
    to: "Barcelona",
    toCode: "BCN",
    blurb: "Sun, food, and late flights back on Sunday.",
    seoTitle: "Cheap flights London to Barcelona",
    seoDescription:
      "Find cheap flights from London to Barcelona. Compare UK airport options and book in pounds with AeroSwift.",
    intro:
      "Barcelona is a favourite for long weekends and summer escapes. Multiple London airports compete on this route, which often means better fares if you stay flexible on departure point and time.",
    tips: [
      "Shoulder months (April–May, September–October) balance price and weather.",
      "BCN is the main airport — allow time for the city transfer.",
      "Compare hand-baggage fares carefully; checked bags add up quickly.",
    ],
  },
  {
    slug: "manchester-to-amsterdam",
    from: "Manchester",
    fromCode: "MAN",
    to: "Amsterdam",
    toCode: "AMS",
    blurb: "Quick northern escape for museums and canals.",
    seoTitle: "Cheap flights Manchester to Amsterdam",
    seoDescription:
      "Compare cheap flights from Manchester to Amsterdam. Search live fares in £ with AeroSwift.",
    intro:
      "Manchester to Amsterdam is a short hop ideal for a culture-filled weekend. Direct options appear regularly — compare times so you maximise hours in the city.",
    tips: [
      "Early outbound + late return often works well for two full days in Amsterdam.",
      "Schiphol is well linked by train to the city centre.",
      "Book flexible tickets if your plans may shift.",
    ],
  },
  {
    slug: "london-to-lisbon",
    from: "London",
    fromCode: "LON",
    to: "Lisbon",
    toCode: "LIS",
    blurb: "Mild winters and strong value fares year-round.",
    seoTitle: "Cheap flights London to Lisbon",
    seoDescription:
      "Search cheap flights from London to Lisbon. Compare partners and book in GBP with AeroSwift.",
    intro:
      "Lisbon offers mild winters and strong value compared with many European capitals. UK travellers often find competitive fares year-round if they avoid peak school-holiday weeks.",
    tips: [
      "Winter sun seekers: January–March can be excellent value.",
      "Lisbon airport is close to the city — short transfer times help.",
      "Consider Porto as an alternative if Lisbon dates are expensive.",
    ],
  },
  {
    slug: "edinburgh-to-dublin",
    from: "Edinburgh",
    fromCode: "EDI",
    to: "Dublin",
    toCode: "DUB",
    blurb: "Short hop for a long weekend across the Irish Sea.",
    seoTitle: "Cheap flights Edinburgh to Dublin",
    seoDescription:
      "Find cheap flights from Edinburgh to Dublin. Compare short-hop fares in £ on AeroSwift.",
    intro:
      "Edinburgh to Dublin is a classic short hop for concerts, sport, and weekends away. Flight time is short, so schedule and baggage rules matter more than duration.",
    tips: [
      "Watch weekend surcharges — midweek can be much cheaper.",
      "Travel with cabin baggage only when possible.",
      "Check both EDI and GLA if you’re flexible on Scottish departure city.",
    ],
  },
  {
    slug: "london-to-new-york",
    from: "London",
    fromCode: "LON",
    to: "New York",
    toCode: "NYC",
    blurb: "The classic transatlantic — shop around for shoulder season.",
    seoTitle: "Cheap flights London to New York",
    seoDescription:
      "Compare cheap flights from London to New York. Find long-haul deals in £ with AeroSwift partners.",
    intro:
      "London to New York is the classic transatlantic route. Prices swing with seasons, fuel, and demand — shoulder months and midweek flights often unlock better value.",
    tips: [
      "Avoid US holiday peaks (Thanksgiving, Christmas, July 4) when you can.",
      "Compare JFK, EWR and NYC as a group — the cheapest airport isn’t always the most convenient.",
      "Check baggage and seat selection costs before you commit.",
    ],
  },
  {
    slug: "birmingham-to-malaga",
    from: "Birmingham",
    fromCode: "BHX",
    to: "Malaga",
    toCode: "AGP",
    blurb: "Costa del Sol sunshine from the Midlands.",
    seoTitle: "Cheap flights Birmingham to Malaga",
    seoDescription:
      "Search cheap flights from Birmingham to Malaga. Costa del Sol sun from BHX — compare fares in £.",
    intro:
      "Birmingham to Malaga is a go-to sun route for the Midlands. Summer sells out early; booking ahead or flying shoulder season usually beats last-minute prices.",
    tips: [
      "School holidays push prices up — book early if you need those dates.",
      "Malaga airport has good links along the Costa del Sol.",
      "Compare nearby Spanish airports if you’re hiring a car.",
    ],
  },
  {
    slug: "london-to-dubai",
    from: "London",
    fromCode: "LON",
    to: "Dubai",
    toCode: "DXB",
    blurb: "Stopover hub and winter sun in one trip.",
    seoTitle: "Cheap flights London to Dubai",
    seoDescription:
      "Find cheap flights from London to Dubai. Compare winter-sun and stopover fares in £ on AeroSwift.",
    intro:
      "Dubai works as a winter-sun destination and a stopover hub for Asia and beyond. Fares vary by airline and season — compare a few dates either side of your ideal travel day.",
    tips: [
      "November–March is peak winter-sun season from the UK.",
      "Overnight flights can save a hotel night if timed well.",
      "Watch for stopover packages if you’re continuing further east.",
    ],
  },
  {
    slug: "london-to-rome",
    from: "London",
    fromCode: "LON",
    to: "Rome",
    toCode: "ROM",
    blurb: "History, food, and long weekends in the Eternal City.",
    seoTitle: "Cheap flights London to Rome",
    seoDescription:
      "Compare cheap flights from London to Rome. Find fares in £ and book with AeroSwift partners.",
    intro:
      "London to Rome is a staple city-break route. Fiumicino (FCO) and Ciampino (CIA) both serve the city — comparing ROM as a group often surfaces the best price.",
    tips: [
      "Avoid major Italian holiday peaks if you want lower fares.",
      "Ciampino can be cheaper but transfers take longer.",
      "Midweek flights are usually better value than Friday/Sunday.",
    ],
  },
  {
    slug: "london-to-amsterdam",
    from: "London",
    fromCode: "LON",
    to: "Amsterdam",
    toCode: "AMS",
    blurb: "A quick hop for canals, museums, and food halls.",
    seoTitle: "Cheap flights London to Amsterdam",
    seoDescription:
      "Find cheap flights from London to Amsterdam. Compare short-haul fares in GBP on AeroSwift.",
    intro:
      "Amsterdam is one of the easiest European escapes from London. Flight time is short, so baggage rules and airport choice matter more than duration.",
    tips: [
      "City Hopper / frequent flyer options appear often — compare total price including bags.",
      "Schiphol train links make early/late flights workable.",
      "Consider Eurostar alternatives only if door-to-door time suits you better.",
    ],
  },
  {
    slug: "london-to-madrid",
    from: "London",
    fromCode: "LON",
    to: "Madrid",
    toCode: "MAD",
    blurb: "Spanish capital energy — art, tapas, and late nights.",
    seoTitle: "Cheap flights London to Madrid",
    seoDescription:
      "Search cheap flights from London to Madrid. Compare UK fares in £ with AeroSwift.",
    intro:
      "Madrid works year-round for culture and food. Competition on the route from several London airports often means deals if you stay flexible.",
    tips: [
      "Summer heat is intense — spring and autumn are popular for a reason.",
      "Barajas has strong metro/train links into the centre.",
      "Pair with a cheap domestic hop to Seville or Valencia if fares align.",
    ],
  },
  {
    slug: "london-to-athens",
    from: "London",
    fromCode: "LON",
    to: "Athens",
    toCode: "ATH",
    blurb: "Gateway to Greece — city break or island hop.",
    seoTitle: "Cheap flights London to Athens",
    seoDescription:
      "Compare cheap flights from London to Athens. Find Greek getaway fares in £ on AeroSwift.",
    intro:
      "Athens is both a destination and a launchpad for the islands. Direct options from London appear frequently in summer; shoulder season can be better value.",
    tips: [
      "If continuing to an island, check open-jaw tickets (fly into ATH, out of another island).",
      "Summer peaks hard — book early for July and August.",
      "Allow buffer time for connections through ATH.",
    ],
  },
  {
    slug: "london-to-prague",
    from: "London",
    fromCode: "LON",
    to: "Prague",
    toCode: "PRG",
    blurb: "Fairytale streets and strong value city breaks.",
    seoTitle: "Cheap flights London to Prague",
    seoDescription:
      "Find cheap flights from London to Prague. Compare Central Europe city-break fares in £.",
    intro:
      "Prague remains one of the best-value European capitals from the UK. Christmas markets and long weekends drive demand — book those dates early.",
    tips: [
      "December market weekends sell out far ahead.",
      "PRG is close to the city centre compared with many airports.",
      "Cabin-bag fares keep short breaks affordable.",
    ],
  },
  {
    slug: "london-to-istanbul",
    from: "London",
    fromCode: "LON",
    to: "Istanbul",
    toCode: "IST",
    blurb: "Where Europe meets Asia — food, bazaars, and stopovers.",
    seoTitle: "Cheap flights London to Istanbul",
    seoDescription:
      "Search cheap flights from London to Istanbul. Compare fares in £ with AeroSwift partners.",
    intro:
      "Istanbul is a destination in its own right and a major hub. Compare IST and SAW carefully — the cheaper airport isn’t always the most convenient for your hotel area.",
    tips: [
      "Check whether your fare lands at IST or SAW before you book transfers.",
      "Stopover programmes can add a free night if you’re continuing further.",
      "Evenings and overnight flights are common on this route.",
    ],
  },
  {
    slug: "manchester-to-barcelona",
    from: "Manchester",
    fromCode: "MAN",
    to: "Barcelona",
    toCode: "BCN",
    blurb: "Northern England to the Catalan coast.",
    seoTitle: "Cheap flights Manchester to Barcelona",
    seoDescription:
      "Compare cheap flights from Manchester to Barcelona. Search live fares in £ on AeroSwift.",
    intro:
      "Manchester to Barcelona is a favourite sun-and-city route from the North. Summer demand is high — shoulder months often win on price.",
    tips: [
      "School holidays inflate fares — book early or fly term-time.",
      "Direct flights appear seasonally; indirect can still be good value.",
      "Travel light to avoid low-cost bag fees.",
    ],
  },
  {
    slug: "manchester-to-malaga",
    from: "Manchester",
    fromCode: "MAN",
    to: "Malaga",
    toCode: "AGP",
    blurb: "Costa del Sol sunshine from Manchester.",
    seoTitle: "Cheap flights Manchester to Malaga",
    seoDescription:
      "Find cheap flights from Manchester to Malaga. Costa del Sol deals in £ via AeroSwift.",
    intro:
      "Malaga from Manchester is a classic package-and-DIY sun route. Flexibility on weekday travel usually beats Saturday-only charters on price.",
    tips: [
      "Tuesday–Thursday often cheaper than weekends.",
      "AGP links well along the coast if you’re not staying in Malaga city.",
      "Compare nearby Alicante or Faro if dates are pricey.",
    ],
  },
  {
    slug: "birmingham-to-alicante",
    from: "Birmingham",
    fromCode: "BHX",
    to: "Alicante",
    toCode: "ALC",
    blurb: "Spanish sun from the Midlands — beaches and resorts.",
    seoTitle: "Cheap flights Birmingham to Alicante",
    seoDescription:
      "Search cheap flights from Birmingham to Alicante. Compare BHX sun-route fares in £.",
    intro:
      "Alicante serves the Costa Blanca and is popular with Midlands travellers. Summer capacity rises, but so do prices — booking ahead pays off.",
    tips: [
      "Resort transfer times vary — check your final destination before choosing flights.",
      "Hand-baggage-only is usually the cheapest ticket type.",
      "Watch half-term weeks for price spikes.",
    ],
  },
  {
    slug: "edinburgh-to-amsterdam",
    from: "Edinburgh",
    fromCode: "EDI",
    to: "Amsterdam",
    toCode: "AMS",
    blurb: "Scotland to the Netherlands for a culture-packed weekend.",
    seoTitle: "Cheap flights Edinburgh to Amsterdam",
    seoDescription:
      "Compare cheap flights from Edinburgh to Amsterdam. Short-hop fares in £ on AeroSwift.",
    intro:
      "Edinburgh to Amsterdam is an easy European escape from Scotland. Flight time is short, so schedules that maximise time in the city are worth hunting for.",
    tips: [
      "Early out, late back is the classic weekend pattern.",
      "Compare EDI and GLA if you’re open to either Scottish airport.",
      "Schiphol’s train connection is fast into Centraal.",
    ],
  },
  {
    slug: "glasgow-to-malaga",
    from: "Glasgow",
    fromCode: "GLA",
    to: "Malaga",
    toCode: "AGP",
    blurb: "Scottish sun-seekers heading to the Costa del Sol.",
    seoTitle: "Cheap flights Glasgow to Malaga",
    seoDescription:
      "Find cheap flights from Glasgow to Malaga. Compare GLA to AGP fares in £ with AeroSwift.",
    intro:
      "Glasgow to Malaga is a go-to sun route from Scotland. Seasonal schedules change — check a range of dates rather than a single day.",
    tips: [
      "Summer charters and low-cost seats sell early.",
      "EDI can be cheaper on some dates — worth a quick compare.",
      "Factor transfer time from AGP to your resort.",
    ],
  },
  {
    slug: "london-to-porto",
    from: "London",
    fromCode: "LON",
    to: "Porto",
    toCode: "OPO",
    blurb: "Portugal’s north — wine, tiles, and Atlantic air.",
    seoTitle: "Cheap flights London to Porto",
    seoDescription:
      "Search cheap flights from London to Porto. Compare Portuguese city-break fares in £.",
    intro:
      "Porto has become a favourite alternative to Lisbon — often with strong value and a more compact city centre. Mild weather makes it work outside peak summer.",
    tips: [
      "Combine with Lisbon on an open-jaw if you want both cities.",
      "Winter and early spring can be quietly great value.",
      "OPO is handy for the Douro if you’re hiring a car.",
    ],
  },
  {
    slug: "london-to-berlin",
    from: "London",
    fromCode: "LON",
    to: "Berlin",
    toCode: "BER",
    blurb: "Nightlife, neighbourhoods, and museum weekends.",
    seoTitle: "Cheap flights London to Berlin",
    seoDescription:
      "Compare cheap flights from London to Berlin. Find city-break fares in £ on AeroSwift.",
    intro:
      "Berlin remains a top UK city break for culture and nightlife. BER replaced older airports — transfer times into the centre are longer than some travellers expect, so plan ahead.",
    tips: [
      "Build in airport-to-city time when booking late arrivals.",
      "Midweek often beats weekend pricing.",
      "Cabin bag only keeps short trips cheap.",
    ],
  },
  {
    slug: "london-to-vienna",
    from: "London",
    fromCode: "LON",
    to: "Vienna",
    toCode: "VIE",
    blurb: "Coffee houses, palaces, and Christmas markets.",
    seoTitle: "Cheap flights London to Vienna",
    seoDescription:
      "Find cheap flights from London to Vienna. Compare Austrian city-break fares in £.",
    intro:
      "Vienna shines for culture trips and December markets. Outside peak festive weeks, fares from London are often competitive with other Central European capitals.",
    tips: [
      "Book December market trips months ahead.",
      "VIE has solid public transport into the city.",
      "Consider a day trip to Bratislava if you have a spare day.",
    ],
  },
  {
    slug: "bristol-to-malaga",
    from: "Bristol",
    fromCode: "BRS",
    to: "Malaga",
    toCode: "AGP",
    blurb: "South West England to the Costa del Sol.",
    seoTitle: "Cheap flights Bristol to Malaga",
    seoDescription:
      "Search cheap flights from Bristol to Malaga. Compare BRS sun-route fares in £ with AeroSwift.",
    intro:
      "Bristol to Malaga is a popular South West sun run. Capacity is more limited than London — flexible dates help more here than on bigger routes.",
    tips: [
      "Check neighbouring Cardiff or Birmingham if Bristol is sold out.",
      "School holidays book up fast from regional airports.",
      "Travel light for the best low-cost fares.",
    ],
  },
];

