"use client";

import { useState } from "react";

const HACKS = [
  { id: 1, emoji: "📅", title: "Date Grid", what: "Shift ±1-3 days. Often saves 20-40%. Click date on Google Flights to see price calendar." },
  { id: 2, emoji: "🎭", title: "Hidden City", what: "Book to a further city with layover at your real destination. Use skiplagged.com.", risk: "No checked bags. Don't attach FF number." },
  { id: 3, emoji: "🏙️", title: "Nearby Airports", what: "Check all airports within 2-3h drive. YYZ+YKF+BUF+YHM." },
  { id: 4, emoji: "🌍", title: "VPN Pricing", what: "Book from airline's home country. 10-30% cheaper for international flights." },
  { id: 5, emoji: "🔀", title: "Mix & Match", what: "Two one-way tickets on different airlines often cheaper than round-trip." },
  { id: 6, emoji: "⚠️", title: "Error Fares", what: "Check SecretFlying.com, TheFlightDeal.com. Book fast — free 24h cancellation." },
  { id: 7, emoji: "✨", title: "Points Sweet Spots", what: "12,500 Aeroplan points for short-haul NA. Use points for expensive cash routes." },
  { id: 8, emoji: "🕶️", title: "Incognito Mode", what: "Always search flights in private/incognito. Clear cookies between searches." },
];

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [tripType, setTripType] = useState("roundtrip");
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !dest || !depDate) {
      setError("Fill in origin, destination, and departure date.");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);

    // Build Google Flights URL
    const gfOrigin = origin.toUpperCase().trim();
    const gfDest = dest.toUpperCase().trim();
    let gfUrl = `https://www.google.com/travel/flights?q=Flights+to+${gfDest}+from+${gfOrigin}+on+${depDate}`;
    if (tripType === "roundtrip" && retDate) {
      gfUrl += `+return+${retDate}`;
    } else {
      gfUrl += "&tt=o";
    }

    // Open Google Flights in new tab
    window.open(gfUrl, "_blank");

    // Try backend
    try {
      const resp = await fetch("https://flighthacks.trustdebt.dev/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: gfOrigin,
          dest: gfDest,
          depDate,
          retDate: tripType === "roundtrip" ? retDate : undefined,
          adults,
          tripType,
        }),
      });
      const data = await resp.json();
      setResults(data);
    } catch {
      setResults({
        success: true,
        google_flights_url: gfUrl,
        source: "url_only",
        note: "Google Flights opened in a new tab. Backend coming soon.",
      });
    }
    setLoading(false);
  };

  // Quick airport codes
  const popularAirports = ["YYZ", "YVR", "YUL", "YYC", "LON", "NYC", "PAR", "DXB", "DEL", "BKK", "NRT", "SYD", "MIA", "LAX"];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Flight<span className="text-emerald-400">Hacks</span>
          </h1>
          <p className="text-zinc-400 text-sm">Find cheaper flights. Internal tool.</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            {/* Trip Type */}
            <div className="flex gap-2 bg-zinc-800/50 rounded-lg p-1">
              {["roundtrip", "oneway"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTripType(t)}
                  className={`flex-1 py-2 text-sm rounded-md font-medium transition-colors ${
                    tripType === t
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t === "roundtrip" ? "Round Trip" : "One Way"}
                </button>
              ))}
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                  From
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                  placeholder="YYZ"
                  maxLength={4}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 uppercase"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                  To
                </label>
                <input
                  type="text"
                  value={dest}
                  onChange={(e) => setDest(e.target.value.toUpperCase())}
                  placeholder="LON"
                  maxLength={4}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 uppercase"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                  Departure
                </label>
                <input
                  type="date"
                  value={depDate}
                  onChange={(e) => setDepDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                  {tripType === "roundtrip" ? "Return" : "Return (optional)"}
                </label>
                <input
                  type="date"
                  value={retDate}
                  onChange={(e) => setRetDate(e.target.value)}
                  disabled={tripType === "oneway"}
                  className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 ${
                    tripType === "oneway" ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                Passengers
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} adult{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Airport Codes */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1.5">
                Quick codes
              </label>
              <div className="flex flex-wrap gap-1.5">
                {popularAirports.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      if (!origin) setOrigin(code);
                      else if (!dest) setDest(code);
                    }}
                    className="px-2 py-1 text-[10px] rounded-md bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors font-mono"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Searching...
                </span>
              ) : (
                "🔍 Search Flights"
              )}
            </button>
            <p className="text-[10px] text-zinc-600 text-center">
              Opens Google Flights in a new tab with your search
            </p>
          </div>
        </form>

        {/* Results */}
        {results && (
          <div className="max-w-xl mx-auto mb-10">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-lg">✈️</span>
                  <span className="text-sm font-medium text-emerald-400">
                    {results.flights?.length > 0
                      ? `${results.flights.length} flights found`
                      : "Results"}
                  </span>
                </div>
                {results.google_flights_url && (
                  <a
                    href={results.google_flights_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Open in Google Flights ↗
                  </a>
                )}
              </div>

              {results.flights && results.flights.length > 0 ? (
                <div className="space-y-2">
                  {results.flights.map((f: any, i: number) => (
                    <a
                      key={i}
                      href={results.google_flights_url || f.book_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-zinc-800/50 hover:bg-zinc-800 rounded-lg px-3.5 py-3 transition-colors border border-transparent hover:border-zinc-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-zinc-200 truncate">
                            {f.airline}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                            <span>{f.departure}</span>
                            <span className="text-zinc-600">→</span>
                            <span>{f.route}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-zinc-500">{f.duration}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/50 text-zinc-400">
                              {f.stops}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <div className="text-sm font-bold text-emerald-400">
                            {f.price}
                          </div>
                          <div className="text-[10px] text-zinc-500">round trip</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <>
                  {results.google_flights_url && (
                    <a
                      href={results.google_flights_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                    >
                      Open Google Flights →
                    </a>
                  )}
                  {results.note && (
                    <p className="text-xs text-zinc-500 mt-2">{results.note}</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Hacks Reference */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
            <span>💡</span> Flight Hacks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {HACKS.map((hack) => (
              <div
                key={hack.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg shrink-0">{hack.emoji}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-zinc-300">
                        {hack.title}
                      </span>
                      {hack.risk && (
                        <span className="text-[9px] px-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          ⚠️
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                      {hack.what}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500">
            FlightHacks · Internal ·{" "}
            <a
              href="https://www.google.com/travel/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Google Flights ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
