import type { ComponentType } from "react";
import Image from "next/image";
import {
  Activity,
  AlertCircle,
  Bone,
  HeartPulse,
  Scan,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { AppointmentForm } from "@/components/clinic/AppointmentForm";
import {
  CLINIC,
  HIGHLIGHT_SERVICES,
  SERVICE_CARDS,
  SERVICE_ICONS,
  WHY_CHOOSE,
} from "@/lib/clinic/content";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  whitening: Sparkles,
  prevention: Shield,
  implants: Bone,
  emergencies: AlertCircle,
  "x-rays": Scan,
  endodontics: Activity,
  composite: Stethoscope,
  periodontics: HeartPulse,
};

export function IntroSection() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:max-w-3xl">
      <h1 className="clinic-heading text-3xl font-semibold text-[var(--clinic-navy)] sm:text-4xl">
        Dentist in Markham – Family &amp; Cosmetic Dental Care
      </h1>
      <h2 className="clinic-heading mt-8 text-2xl font-medium text-[var(--clinic-navy)]">
        Trusted Care at Smile Dental Arts Centre
      </h2>
      <p className="mt-6 text-left text-base leading-relaxed text-[var(--clinic-muted)] sm:text-center">
        If you are looking for a reliable <strong>dentist in Markham</strong>, Smile Dental Arts
        Centre provides comprehensive dental care for patients of all ages. Conveniently located in
        Markham, Ontario, our clinic delivers modern, evidence-based dentistry in a welcoming and
        comfortable environment. Our goal is to help every patient maintain excellent oral health
        while achieving a confident, natural-looking smile.
      </p>
      <p className="mt-4 text-left text-base leading-relaxed text-[var(--clinic-muted)] sm:text-center">
        As an experienced <strong>dentist in Markham</strong>, we focus on preventive care,
        advanced restorative solutions, and cosmetic treatments designed to meet the needs of the
        Markham community.
      </p>
    </section>
  );
}

export function HighlightServicesSection() {
  return (
    <section className="bg-[var(--clinic-surface)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="clinic-heading text-center text-3xl font-semibold text-[var(--clinic-navy)]">
          Comprehensive Dental Services from a Dentist in Markham
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[var(--clinic-muted)]">
          At Smile Dental Arts Centre, our dentist in Markham offers a full range of dental services
          under one roof, eliminating the need for outside referrals whenever possible.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_SERVICES.map((s) => (
            <article
              key={s.title}
              className="rounded-xl border border-[var(--clinic-border)] bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[var(--clinic-navy)]">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--clinic-muted)]">{s.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-[var(--clinic-muted)]">
          Learn more about our treatments on our{" "}
          <a href={CLINIC.external.services} className="clinic-link" target="_blank" rel="noopener noreferrer">
            Services
          </a>{" "}
          page.
        </p>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h2 className="clinic-heading text-center text-3xl font-semibold text-[var(--clinic-navy)]">
        Why Choose Our Dentist in Markham?
      </h2>
      <p className="mt-4 text-center text-[var(--clinic-muted)]">
        Patients choose Smile Dental Arts Centre because we combine clinical expertise with
        patient-centered care.
      </p>
      <ul className="mt-10 space-y-4">
        {WHY_CHOOSE.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-lg border border-[var(--clinic-border)] bg-white px-5 py-4 text-[var(--clinic-text)] shadow-sm"
          >
            <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--clinic-gold)]" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm leading-relaxed text-[var(--clinic-muted)]">
        Our dentists are licensed and regulated by the{" "}
        <a href={CLINIC.external.rcdso} className="clinic-link" target="_blank" rel="noopener noreferrer">
          Royal College of Dental Surgeons of Ontario
        </a>{" "}
        and are proud members of the{" "}
        <a href={CLINIC.external.oda} className="clinic-link" target="_blank" rel="noopener noreferrer">
          Ontario Dental Association
        </a>{" "}
        and the{" "}
        <a href={CLINIC.external.cda} className="clinic-link" target="_blank" rel="noopener noreferrer">
          Canadian Dental Association
        </a>
        .
      </p>
    </section>
  );
}

export function FamilySection() {
  return (
    <section className="bg-[var(--clinic-surface)] py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="clinic-heading text-3xl font-semibold text-[var(--clinic-navy)]">
          Family Dentist in Markham for All Ages
        </h2>
        <p className="mt-6 text-[var(--clinic-muted)]">
          As a family-focused dentist in Markham, we welcome children, adults, and seniors. From
          routine checkups and cleanings to advanced cosmetic and restorative procedures, we are
          committed to supporting lifelong oral health for the Markham community.
        </p>
        <p className="mt-4 text-sm text-[var(--clinic-muted)]">
          For trusted dental health information, visit the{" "}
          <a href={CLINIC.external.cda} className="clinic-link" target="_blank" rel="noopener noreferrer">
            Canadian Dental Association
          </a>{" "}
          website.
        </p>
      </div>
    </section>
  );
}

export function BookCtaSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h2 className="clinic-heading text-3xl font-semibold text-[var(--clinic-navy)]">
        Book an Appointment with a Dentist in Markham Today
      </h2>
      <p className="mt-6 text-[var(--clinic-muted)]">
        Smile Dental Arts Centre is now accepting new patients. Contact our clinic today to
        schedule your appointment.
      </p>
      <p className="mt-4 text-sm">Call us or book online to get started.</p>
      <a href={CLINIC.phoneHref} className="clinic-btn-primary mt-6 inline-block px-8 py-3 text-sm">
        {CLINIC.phone}
      </a>
    </section>
  );
}

export function ServiceCardsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="clinic-heading text-center text-3xl font-semibold text-[var(--clinic-navy)]">
          Explore Our Services
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CARDS.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-xl border border-[var(--clinic-border)] bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[var(--clinic-navy)]">{card.title}</h3>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-[var(--clinic-muted)]">
                  {card.description}
                </p>
                <a
                  href={CLINIC.external.services}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clinic-link mt-3 inline-block text-xs font-semibold"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceIconsSection() {
  return (
    <section className="bg-[var(--clinic-navy)] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="clinic-heading text-3xl font-semibold text-white">
          Discover More Our Services in Markham
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Our clients are our priority. More details about our services by clicking on each icon.
        </p>
        <a
          href="#appointment"
          className="clinic-btn-primary mt-8 inline-block px-8 py-3 text-sm"
        >
          Request Appoinment
        </a>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {SERVICE_ICONS.map(({ label, slug }) => {
            const Icon = ICON_MAP[slug] ?? Stethoscope;
            return (
              <a
                key={slug}
                href={CLINIC.external.services}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 p-6 transition hover:bg-white/5"
              >
                <span className="flex size-16 items-center justify-center rounded-full border-2 border-[var(--clinic-gold)] text-[var(--clinic-gold)]">
                  <Icon className="size-8" aria-hidden />
                </span>
                <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AppointmentSection() {
  return (
    <section className="bg-[var(--clinic-surface)] py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="clinic-heading text-3xl font-semibold text-[var(--clinic-navy)]">
            Request Your Appointment Online
          </h2>
          <p className="mt-4 text-[var(--clinic-muted)]">
            Easily set up your next dental visit at your convenience through our online appointment
            request form. Your vibrant smile is just a click away!
          </p>
          <p className="mt-6 text-sm font-semibold text-[var(--clinic-navy)]">Booking</p>
        </div>
        <AppointmentForm />
      </div>
    </section>
  );
}

export function GettingHereSection() {
  return (
    <section id="gallery" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="clinic-heading text-center text-2xl font-semibold text-[var(--clinic-navy)]">
          Getting Here
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-[var(--clinic-border)] shadow-sm">
          <iframe
            title="Smile Dental Arts Centre location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.892!2d-79.321822!3d43.841063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d52d8f8b8b8b8b%3A0x0!2s3980%2014th%20Ave%20%236%2C%20Markham%2C%20ON%20L3R%200B1!5e0!3m2!1sen!2sca!4v1"
            className="h-[min(400px,50vh)] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center text-sm text-[var(--clinic-muted)]">
          <a href={CLINIC.addressHref} className="clinic-link" target="_blank" rel="noopener noreferrer">
            {CLINIC.address}
          </a>
        </p>
      </div>
    </section>
  );
}
