"use client";

import { useState } from "react";

const HACKS = [
  {
    id: 1,
    title: "Date Grid / Flexible Dates",
    emoji: "📅",
    what: "Google Flights shows a calendar of prices. Shifting by ±1-3 days often drops the price 20-40%.",
    how: "After searching, click the departure date → 2-month calendar appears with prices on each date. Pick the cheapest combo.",
    best: "Any route with flexible dates.",
    risk: null,
  },
  {
    id: 2,
    title: "Hidden City Ticketing (Skiplagged)",
    emoji: "🎭",
    what: "Book a flight with a layover at your actual destination. Don't take the final leg.",
    how: "Search flights to major hubs that connect through your destination. Example: Toronto→London cheaper as Toronto→Paris with London layover. Use skiplagged.com.",
    best: "Flights to major hub cities.",
    risk: "Don't check bags. Airlines may cancel return flights. Don't attach frequent flyer number. Carry-on only.",
  },
  {
    id: 3,
    title: "Nearby Airports",
    emoji: "🏙️",
    what: "Check all airports within 2-3 hours drive. Savings often worth the drive.",
    how: "Use Google Flights '+' to add airports. Example: YYZ+YKF+BUF+YHM → LON+LGW+STN+LTN.",
    best: "Toronto (check BUF, YKF, YHM, YTZ). Vancouver (check SEA, BLI). Montreal (check YUL, YOW).",
    risk: null,
  },
  {
    id: 4,
    title: "VPN / Country Pricing",
    emoji: "🌍",
    what: "Airlines show different prices based on your location. Booking from cheaper country saves 10-30%.",
    how: "Search from airline's home country. Air India from India VPN, Emirates from UAE VPN. Check both airline's local site and aggregators.",
    best: "International flights on non-North American airlines.",
    risk: null,
  },
  {
    id: 5,
    title: "One-Way Mix-and-Match",
    emoji: "🔀",
    what: "Two one-way tickets on different airlines often cheaper than round-trip.",
    how: "Search each direction separately. Compare one-way outbound + one-way return vs round-trip price.",
    best: "Routes with lots of airline competition.",
    risk: null,
  },
  {
    id: 6,
    title: "Error Fares",
    emoji: "⚠️",
    what: "Airlines occasionally publish wrong prices — $200 Europe, $50 domestic. Usually honored for 24-48h.",
    how: "Check SecretFlying.com, TheFlightDeal.com, Scott's Cheap Flights. Book first — free 24h cancellation on most airlines.",
    best: "Flexible travelers: time flexibility, not destination constraints.",
    risk: null,
  },
  {
    id: 7,
    title: "Points / Miles Sweet Spots",
    emoji: "✨",
    what: "Certain routes have disproportionately low award pricing. 12,500 Aeroplan points for short-haul NA.",
    how: "Check award availability before searching cash. Use points for expensive cash routes, cash for cheap routes.",
    best: "Routes <500 miles (Aeroplan sweet spot), partner airline redemptions.",
    risk: null,
  },
  {
    id: 8,
    title: "Student & Youth Fares",
    emoji: "🎓",
    what: "Many airlines offer unadvertised student/youth discounts.",
    how: "Search StudentUniverse.com for under-26 fares. Check airline student programs directly.",
    best: "Under 26 or full-time students of any age.",
    risk: null,
  },
  {
    id: 9,
    title: "Incognito / Clear Cookies",
    emoji: "🕶️",
    what: "Airlines and OTAs track searches and may increase prices on repeated route searches.",
    how: "Always search flights in incognito/private mode. Clear cookies between searches.",
    best: "Any route when comparing multiple times.",
    risk: null,
  },
  {
    id: 10,
    title: "Book on the Right Day",
    emoji: "📆",
    what: "Tuesday at 3pm is mostly myth, but Sunday bookings often slightly cheaper for domestic flights.",
    how: "Trust Google Flights 'price is typical/low/high' indicator over day-of-week rules. Set price alerts.",
    best: "Domestic routes with flexible dates.",
    risk: null,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = HACKS.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.what.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Flight<span className="text-emerald-400">Hacks</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            10 battle-tested ways to find cheaper flights. Internal tool — use with your AI agent.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search hacks (e.g., hidden city, VPN, error fares)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
          {search && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Quick link to Google Flights */}
        <a
          href="https://www.google.com/travel/flights"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors mb-8"
        >
          🔍 Open Google Flights
        </a>

        {/* Hack cards */}
        <div className="space-y-3">
          {filtered.map((hack) => (
            <div
              key={hack.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === hack.id ? null : hack.id)}
                className="w-full text-left px-5 py-4 flex items-start gap-4"
              >
                <span className="text-2xl shrink-0 mt-0.5">{hack.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-200">
                      {hack.title}
                    </span>
                    {hack.risk && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        risk
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {hack.what}
                  </p>
                </div>
                <span className="shrink-0 text-zinc-500 text-sm mt-0.5">
                  {expanded === hack.id ? "−" : "+"}
                </span>
              </button>

              {expanded === hack.id && (
                <div className="px-5 pb-5 space-y-3 border-t border-zinc-800/50 pt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      What
                    </span>
                    <p className="text-sm text-zinc-300 mt-1">{hack.what}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      How
                    </span>
                    <p className="text-sm text-zinc-300 mt-1">{hack.how}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                      Best for
                    </span>
                    <p className="text-sm text-zinc-300 mt-1">{hack.best}</p>
                  </div>
                  {hack.risk && (
                    <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 px-3 py-2">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">
                        ⚠️ Risk
                      </span>
                      <p className="text-xs text-amber-300/80 mt-1">
                        {hack.risk}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 text-sm py-8">
            No hacks match "{search}"
          </p>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500">
            FlightHacks — Internal tool · Use with Hermes Agent{" "}
            <code className="text-zinc-600 bg-zinc-900 px-1 py-0.5 rounded text-[11px]">
              /skill cheap-flights
            </code>
          </p>
          <a
            href="https://www.google.com/travel/flights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mt-1 inline-block"
          >
            Google Flights ↗
          </a>
        </div>
      </div>
    </div>
  );
}
