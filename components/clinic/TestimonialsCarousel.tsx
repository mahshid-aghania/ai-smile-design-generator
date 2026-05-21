"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { TESTIMONIALS } from "@/lib/clinic/content";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(next, 8000);
    return () => window.clearInterval(id);
  }, [next]);

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-[var(--clinic-surface)] py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="clinic-heading text-3xl font-semibold text-[var(--clinic-navy)]">
          Our Testimonial
        </h2>
        <div className="relative mt-10 rounded-2xl border border-[var(--clinic-border)] bg-white px-8 py-12 shadow-sm">
          <Quote
            className="mx-auto mb-4 size-10 text-[var(--clinic-gold)]/40"
            aria-hidden
          />
          <p className="text-lg leading-relaxed text-[var(--clinic-text)]">&ldquo;{t.quote}&rdquo;</p>
          <h3 className="clinic-heading mt-6 text-xl font-semibold text-[var(--clinic-navy)]">
            {t.name}
          </h3>
          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-[var(--clinic-border)] p-2 hover:bg-[var(--clinic-surface)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "size-2.5 rounded-full",
                  i === index ? "bg-[var(--clinic-gold)]" : "bg-slate-300"
                )}
                onClick={() => setIndex(i)}
              />
            ))}
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-[var(--clinic-border)] p-2 hover:bg-[var(--clinic-surface)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
