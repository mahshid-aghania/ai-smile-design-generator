import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { CLINIC, FOOTER_LINKS } from "@/lib/clinic/content";

export function ClinicFooter() {
  return (
    <footer id="contact" className="border-t border-[var(--clinic-border)] bg-[var(--clinic-navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--clinic-gold)]">
            Contact Us
          </h2>
          <ul className="space-y-3 text-sm text-slate-200">
            <li>
              <a
                href={CLINIC.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:text-white"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--clinic-gold)]" aria-hidden />
                {CLINIC.address}
              </a>
            </li>
            <li>
              <a href={CLINIC.phoneHref} className="flex gap-2 hover:text-white">
                <Phone className="size-4 shrink-0 text-[var(--clinic-gold)]" aria-hidden />
                {CLINIC.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CLINIC.email}`}
                className="flex gap-2 hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-[var(--clinic-gold)]" aria-hidden />
                {CLINIC.email}
              </a>
            </li>
          </ul>
          <p className="text-xs text-slate-400">
            <a href={CLINIC.external.review} className="clinic-link text-[var(--clinic-gold)]">
              Send Us A Review 🙂
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--clinic-gold)]">
            About Us
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            {FOOTER_LINKS.about.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--clinic-gold)]">
            Our Services
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            {FOOTER_LINKS.services.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--clinic-gold)]">
            Social Networks
          </h2>
          <p className="mb-4 text-sm text-slate-300">
            Keep up with the latest updates, promotions, and dental tips by following us on social
            media.
          </p>
          <div className="flex gap-3">
            <a
              href={CLINIC.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href={CLINIC.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={CLINIC.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
        <p>
          © {new Date().getFullYear()} {CLINIC.name}. Clone for development — not affiliated with the
          live site.
        </p>
        <p className="mt-2">
          <Link href="/smile-preview" className="text-[var(--clinic-gold)] hover:underline">
            AI Smile Preview demo
          </Link>
        </p>
      </div>
    </footer>
  );
}
