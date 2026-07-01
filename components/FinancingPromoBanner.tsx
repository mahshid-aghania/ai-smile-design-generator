import { Check, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const BULLETS = [
  "Natural appearance and function",
  "Advanced 3D digital planning",
  "Ideal for missing teeth or denture wearers",
  "Flexible financing, no hidden fees",
] as const;

const TRUST_STATS = [
  { value: "99%", label: "Implant Success Rate" },
  { value: "3D", label: "Digital Planning" },
  { value: "12mo", label: "Financing Available" },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dentin Family Dentistry",
  telephone: "+14379002200",
  url: "https://dfdentistry.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vaughan",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  makesOffer: {
    "@type": "Offer",
    name: "Dental Implant Financing",
    description:
      "Dental implants starting at $299/month with $500 down payment on approved credit. 12-month financing available.",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "CAD",
      price: "299",
      unitText: "month",
    },
  },
};

function ImplantSVG() {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[160px] mx-auto drop-shadow-lg"
    >
      {/* Crown — glossy porcelain tooth shape */}
      <path
        d="M 62 118 C 58 95 50 55 56 28 C 62 8 76 0 100 0 C 124 0 138 8 144 28 C 150 55 142 95 138 118 Z"
        fill="url(#crown-grad)"
      />
      {/* Crown inner highlight / gloss */}
      <path
        d="M 74 112 C 71 90 67 58 71 34 C 75 17 83 9 92 7 C 84 22 78 55 80 112 Z"
        fill="white"
        opacity="0.35"
      />
      {/* Crown outline */}
      <path
        d="M 62 118 C 58 95 50 55 56 28 C 62 8 76 0 100 0 C 124 0 138 8 144 28 C 150 55 142 95 138 118 Z"
        stroke="#93C5FD"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Cusp groove lines */}
      <path d="M 88 115 L 88 78 C 88 65 91 52 96 42" stroke="#BFDBFE" strokeWidth="1" opacity="0.6" />
      <path d="M 112 115 L 112 78 C 112 65 109 52 104 42" stroke="#BFDBFE" strokeWidth="1" opacity="0.6" />

      {/* Gum tissue (wavy band) */}
      <path
        d="M 28 120 Q 60 108 100 116 Q 140 124 172 112 L 172 132 Q 140 144 100 136 Q 60 128 28 140 Z"
        fill="#FECDD3"
        opacity="0.55"
      />
      <path
        d="M 28 120 Q 60 108 100 116 Q 140 124 172 112"
        stroke="#FCA5A5"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Abutment connector (titanium) */}
      <rect x="86" y="116" width="28" height="26" rx="3" fill="url(#metal-grad)" />
      <rect x="86" y="116" width="5" height="26" rx="3" fill="white" opacity="0.18" />

      {/* Bone area background */}
      <rect x="28" y="138" width="144" height="112" rx="10" fill="#DBEAFE" opacity="0.30" />

      {/* Implant post body */}
      <rect x="88" y="140" width="24" height="96" rx="5" fill="url(#post-grad)" />
      {/* Post highlight edge */}
      <rect x="88" y="140" width="4" height="96" rx="5" fill="white" opacity="0.20" />

      {/* Thread marks across the post */}
      {[153, 165, 177, 189, 201, 213, 225].map((y) => (
        <line
          key={y}
          x1="83"
          y1={y}
          x2="117"
          y2={y}
          stroke="#94A3B8"
          strokeWidth="2"
          opacity="0.35"
        />
      ))}

      {/* Screw tip */}
      <path d="M 88 234 L 100 252 L 112 234 Z" fill="url(#post-grad)" />

      {/* Callout dots */}
      <circle cx="62" cy="56" r="3" fill="#93C5FD" opacity="0.8" />
      <circle cx="86" cy="128" r="3" fill="#CBD5E1" opacity="0.8" />
      <circle cx="78" cy="190" r="3" fill="#93C5FD" opacity="0.8" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="crown-grad" x1="62" y1="0" x2="138" y2="118" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="55%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="metal-grad" x1="86" y1="116" x2="114" y2="142" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="post-grad" x1="88" y1="140" x2="112" y2="252" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FinancingPromoBanner() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-label="Limited-time dental implant financing offer"
        className="relative overflow-hidden rounded-3xl bg-[#0B1F5C] shadow-[0_20px_60px_-12px_rgba(11,31,92,0.35)]"
      >
        {/* Background texture: subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(59,130,246,0.18),transparent_70%)]"
          aria-hidden="true"
        />
        {/* Top-left warm accent */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-blue-700/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-0 lg:grid-cols-[1fr_320px]">

          {/* ── Left: offer content ── */}
          <div className="flex flex-col justify-center gap-7 px-8 py-12 sm:px-12 sm:py-14">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300">
                <Star className="size-2.5" aria-hidden fill="currentColor" />
                Limited-Time Offer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-balance text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
                Dental Implants<br />
                from{" "}
                <span className="text-amber-300">$299</span>
                <span className="text-white">/month</span>
              </h1>
              <p className="text-base font-medium text-blue-200 sm:text-lg">
                Only $500 down payment · 12-month financing on approved credit
              </p>
            </div>

            {/* Bullets */}
            <ul className="grid gap-2.5 sm:grid-cols-2" role="list">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm text-blue-100/90"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-amber-300"
                    aria-hidden
                    strokeWidth={2.5}
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold" className="w-full sm:w-auto">
                <a
                  href="tel:+14379002200"
                  aria-label="Call Dentin Family Dentistry at 437-900-2200"
                >
                  <Phone className="size-4" aria-hidden />
                  Call 437-900-2200
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30 sm:w-auto">
                <a href="#smile-wizard">See Your New Smile →</a>
              </Button>
            </div>

            {/* Practice line */}
            <p className="text-xs font-medium tracking-wide text-blue-300/80">
              Dentin Family Dentistry · Vaughan, ON ·{" "}
              <a
                href="https://dfdentistry.ca"
                className="underline underline-offset-2 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                dfdentistry.ca
              </a>
            </p>

            {/* Fine print */}
            <p className="text-[11px] leading-relaxed text-blue-400/60">
              *Financing available on approved credit. Terms and payments may vary based on treatment
              complexity.
            </p>
          </div>

          {/* ── Right: visual panel ── */}
          <div className="flex flex-col items-center justify-center gap-8 border-t border-white/[0.07] bg-white/[0.04] px-8 py-12 lg:border-l lg:border-t-0">
            {/* Implant illustration */}
            <div className="relative flex w-full items-center justify-center">
              <div className="absolute inset-0 mx-auto my-auto size-48 rounded-full bg-blue-500/10 blur-2xl" aria-hidden="true" />
              <ImplantSVG />
            </div>

            {/* Labels */}
            <div className="w-full space-y-1.5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-400">
                Dental Implant
              </p>
              <p className="text-xs text-blue-200/60">Crown · Abutment · Titanium Post</p>
            </div>

            {/* Trust stats */}
            <div className="grid w-full grid-cols-3 gap-2">
              {TRUST_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-3 text-center"
                >
                  <span className="text-lg font-bold text-white">{value}</span>
                  <span className="text-[9px] font-medium uppercase leading-tight tracking-wide text-blue-300/70">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Doctor credit */}
            <p className="text-center text-[11px] font-medium text-blue-300/60">
              Dr. Mehdi Adibrad, DDS
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
