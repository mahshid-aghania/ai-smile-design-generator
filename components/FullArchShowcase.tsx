import Image from "next/image";

export function FullArchShowcase() {
  return (
    <section
      aria-labelledby="full-arch-heading"
      className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/80 p-6 sm:p-8"
    >
      {/* Header */}
      <div className="mb-6 text-center space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-emerald-400/90 sm:text-[11px]">
          Featured Treatment
        </p>
        <h2
          id="full-arch-heading"
          className="text-balance text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
        >
          Full Arch Implants
        </h2>
        <p className="mx-auto max-w-md text-pretty text-sm leading-relaxed text-[var(--foreground-muted)]">
          Replace an entire arch of missing or failing teeth with a permanent, natural-looking
          implant-supported bridge — designed to last a lifetime.
        </p>
      </div>

      {/* Before / After grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Before */}
        <figure className="space-y-3">
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] aspect-[4/3] bg-[var(--surface)]">
            <Image
              src="/images/full-arch-before.jpg"
              alt="Patient smile before full arch dental implant treatment"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-md bg-[var(--surface)]/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--foreground-muted)] backdrop-blur-sm">
              Before
            </span>
          </div>
          <figcaption className="text-center text-xs text-[var(--foreground-muted)]">
            Prior to treatment
          </figcaption>
        </figure>

        {/* After */}
        <figure className="space-y-3">
          <div className="relative overflow-hidden rounded-xl border border-emerald-500/25 aspect-[4/3] bg-[var(--surface)]">
            <Image
              src="/images/full-arch-after.jpg"
              alt="Patient smile after full arch dental implant treatment showing bright, perfectly aligned teeth"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-md bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
              After
            </span>
          </div>
          <figcaption className="text-center text-xs text-[var(--foreground-muted)]">
            Following full arch implant placement
          </figcaption>
        </figure>
      </div>

      {/* Pricing callout */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 sm:flex-row">
        <div className="space-y-0.5 text-center sm:text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">
            Starting price
          </p>
          <p className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
            $18,000
            <span className="ml-1.5 text-base font-normal text-[var(--foreground-muted)]">
              / arch
            </span>
          </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-[var(--foreground-muted)] sm:justify-end">
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Permanent implant-supported bridge
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Full upper or lower arch
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Financing options available
          </li>
        </ul>
      </div>
    </section>
  );
}
