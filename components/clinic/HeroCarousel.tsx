"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { HERO_SLIDES } from "@/lib/clinic/content";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next]);

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative min-h-[min(72vh,720px)] w-full overflow-hidden bg-slate-900">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[min(72vh,720px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-xl text-xs font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-sm">
          {slide.eyebrow}
        </p>
        <h1 className="clinic-heading mt-3 max-w-2xl text-4xl font-bold uppercase leading-tight text-[var(--clinic-gold)] sm:text-5xl md:text-6xl">
          {slide.title}
        </h1>

        <div className="mt-10 max-w-xs rounded-lg bg-white/95 p-5 shadow-xl backdrop-blur sm:max-w-sm">
          <p className="text-lg font-bold text-[var(--clinic-navy)]">{slide.ctaTitle}</p>
          <p className="text-sm text-[var(--clinic-muted)]">{slide.ctaSubtitle}</p>
          <Link
            href="#appointment"
            className="clinic-btn-primary mt-4 inline-block px-6 py-2.5 text-sm"
          >
            {slide.ctaLabel}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === index ? "bg-[var(--clinic-gold)]" : "bg-white/50 hover:bg-white/80"
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
