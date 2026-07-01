import { Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

const BULLETS = [
  "Natural appearance and function",
  "Advanced 3D digital planning",
  "Ideal for missing teeth or denture wearers",
  "Flexible financing available",
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

export function FinancingPromoBanner() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-label="Limited-time dental implant financing offer"
        className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[var(--surface-elevated)] px-8 py-10 sm:px-12 sm:py-14"
      >
        {/* Gradient wash */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Left accent bar */}
        <div
          className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-700"
          aria-hidden="true"
        />

        <div className="relative space-y-7 pl-2 sm:pl-4">
          {/* Badge */}
          <p
            className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-400"
            aria-hidden="true"
          >
            Limited-Time Offer
          </p>

          {/* Headline + subheadline */}
          <div className="space-y-3">
            <h1 className="font-display text-balance text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              Dental Implants from $299/month
            </h1>
            <p className="text-base font-medium text-emerald-300/90 sm:text-lg">
              Only $500 down payment · 12-month financing on approved credit
            </p>
          </div>

          {/* Bullet points */}
          <ul className="grid gap-2.5 sm:grid-cols-2" role="list">
            {BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm text-[var(--foreground-muted)]"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-emerald-400"
                  aria-hidden
                  strokeWidth={2.5}
                />
                {bullet}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href="tel:+14379002200"
                aria-label="Call Dentin Family Dentistry at 437-900-2200"
              >
                <Phone className="size-4" aria-hidden />
                Call 437-900-2200
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <a href="#smile-wizard">See Your New Smile</a>
            </Button>
          </div>

          {/* Practice line */}
          <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)]">
            Dentin Family Dentistry · Vaughan, ON ·{" "}
            <a
              href="https://dfdentistry.ca"
              className="text-emerald-500/80 underline-offset-2 hover:text-emerald-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              dfdentistry.ca
            </a>
          </p>

          {/* Fine-print disclaimer */}
          <p className="text-[11px] leading-relaxed text-[var(--foreground-muted)]/60">
            *Financing available on approved credit. Terms and payments may vary based on treatment
            complexity.
          </p>
        </div>
      </section>
    </>
  );
}
