import { BadgeCheck, CalendarClock, Scan, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: ShieldCheck, label: "99% Implant Success Rate" },
  { icon: Scan, label: "3D Digital Planning" },
  { icon: CalendarClock, label: "12mo Financing Available" },
  { icon: BadgeCheck, label: "Dr. Mehdi Adibrad, DDS" },
] as const;

export function TrustStrip() {
  return (
    <section
      aria-label="Why patients choose Dentin Family Dentistry"
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-4 shadow-[var(--shadow-soft)] sm:px-6"
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4" role="list">
        {STATS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]"
              aria-hidden
            >
              <Icon className="size-[18px]" strokeWidth={2.1} />
            </span>
            <span className="text-pretty text-[13px] font-medium leading-snug text-[var(--foreground)]">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
