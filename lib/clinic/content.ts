export const CLINIC = {
  name: "Smile Dental Arts Centre",
  tagline: "Dentist in Markham – Family & Cosmetic Dental Care",
  phone: "+1 (905) 604-7330",
  phoneHref: "tel:+19056047330",
  email: "info@smiledentalartscentre.com",
  address: "3980 14th Ave #6, Markham, ON L3R 0B1, Canada",
  addressHref:
    "https://www.google.com/maps/search/?api=1&query=3980+14th+Ave+%236+Markham+ON+L3R+0B1",
  hours: [
    "Monday–Friday: 9:30 AM – 7:00 PM",
    "Saturday: 9:00 AM – 4:00 PM (every other week)",
    "Sunday: Closed",
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100069286303192",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
  external: {
    services: "https://smiledentalartscentre.com/dental-services/",
    cdcp: "https://smiledentalartscentre.com/cdcp/",
    drKadivar: "https://smiledentalartscentre.com/dr-neda-kadivar/",
    team: "https://smiledentalartscentre.com/our-team/",
    faq: "https://smiledentalartscentre.com/faq/",
    rcdso: "https://www.rcdso.org/",
    oda: "https://www.oda.ca/",
    cda: "https://www.cda-adc.ca/",
    review: "https://g.page/r/",
  },
} as const;

export const HERO_SLIDES = [
  {
    image: "/clinic/hero-dr.jpg",
    eyebrow: "ONLY ONE KIND OF TREATEMENT",
    title: "YOUR NEW SMILE",
    ctaTitle: "Plan Your Visit Now",
    ctaSubtitle: "Begin the Change",
    ctaLabel: "Book Now!",
  },
  {
    image: "/clinic/hero-team.jpg",
    eyebrow: "EXPERT CARE IN MARKHAM",
    title: "YOUR DENTAL TEAM",
    ctaTitle: "Plan Your Visit Now",
    ctaSubtitle: "Begin the Change",
    ctaLabel: "Book Now!",
  },
  {
    image: "/clinic/hero-invisalign.jpg",
    eyebrow: "DISCREET ORTHODONTICS",
    title: "INVISALIGN®",
    ctaTitle: "Plan Your Visit Now",
    ctaSubtitle: "Begin the Change",
    ctaLabel: "Book Now!",
  },
  {
    image: "/clinic/hero-office.jpg",
    eyebrow: "MODERN DENTISTRY",
    title: "WELCOME HOME",
    ctaTitle: "Plan Your Visit Now",
    ctaSubtitle: "Begin the Change",
    ctaLabel: "Book Now!",
  },
  {
    image: "/clinic/hero-smile.jpg",
    eyebrow: "CONFIDENT SMILES",
    title: "COSMETIC CARE",
    ctaTitle: "Plan Your Visit Now",
    ctaSubtitle: "Begin the Change",
    ctaLabel: "Book Now!",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#about",
    children: [
      { label: "Dr Neda Kadivar", href: CLINIC.external.drKadivar },
      { label: "Our Team", href: CLINIC.external.team },
      { label: "Gallery", href: "#gallery" },
      { label: "FAQ", href: CLINIC.external.faq },
    ],
  },
  { label: "CDCP", href: CLINIC.external.cdcp },
  { label: "Dental Services", href: CLINIC.external.services },
  { label: "Contact Us", href: "#contact" },
  { label: "Appointment Request", href: "#appointment" },
] as const;

export const HIGHLIGHT_SERVICES = [
  {
    title: "Invisalign® Clear Aligners in Markham",
    description:
      "Achieve a straighter smile with Invisalign clear aligners. Invisalign is a discreet and comfortable orthodontic solution provided by our experienced dentist in Markham for teens and adults.",
  },
  {
    title: "Dental Implants",
    description:
      "Replace missing teeth permanently with dental implants that look, feel, and function like natural teeth. Our dentist in Markham provides implant solutions designed for long-term success.",
  },
  {
    title: "Root Canal Therapy",
    description:
      "Root canal therapy helps eliminate infection and relieve dental pain while preserving your natural tooth. Our clinic uses modern techniques to ensure comfort and efficiency.",
  },
  {
    title: "Teeth Whitening",
    description:
      "Professional teeth whitening brightens your smile safely and effectively, producing results far superior to over-the-counter options.",
  },
  {
    title: "Dental Fillings & Restorative Dentistry",
    description:
      "We offer tooth-colored dental fillings and restorative treatments to repair cavities and protect your long-term oral health.",
  },
] as const;

export const WHY_CHOOSE = [
  "Personalized treatment planning for every patient",
  "Modern dental technology and sterilization protocols",
  "Comfortable, family-friendly dental environment",
  "Clear communication and transparent recommendations",
  "Commitment to long-term oral health, not just short-term fixes",
] as const;

export const SERVICE_CARDS = [
  {
    title: "Cleanings & Prevention",
    description:
      "Regular cleaning & prevention of teeth in order to support and protect oral health, ensure a beautiful smile and prevent dental problems.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/1.webp",
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Cosmetic dentistry focuses on enhancing the appearance of a person's teeth, gums, and smile through various procedures and treatment.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/3.webp",
  },
  {
    title: "Restorations",
    description:
      "Dental restorations include repairing or replacing damaged or missing teeth to restore the function and appearance of those teeth.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/6.webp",
  },
  {
    title: "Invisalign®",
    description:
      "Transform your smile discreetly with Invisalign's clear aligners the modern, comfortable way to achieve the perfect smile you've always wanted.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/10/Invisalign-scaled.jpg",
  },
  {
    title: "Oral Surgery",
    description:
      "Oral surgery in dentistry involves surgical procedures that address complex dental issues, such as tooth extraction, dental implant placement, jaw surgery, and the treatment of oral diseases.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/9.jpg",
  },
  {
    title: "Endodontics",
    description:
      "Endodontics aims to save and maintain natural teeth whenever possible, focusing on diagnosing and treating issues related to the dental pulp and the tissues surrounding the roots of teeth.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/10/Endo-4.webp",
  },
  {
    title: "Dental Emergencies",
    description:
      "If you or a family member is facing a dental emergency, please reach out to us without delay. Our team is here to provide the prompt attention and care you need to safeguard your oral health.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/10.webp",
  },
  {
    title: "Periodontics",
    description:
      "Uncover healthy gums and a confident smile with periodontics. Our specialized care prioritizes gum disease prevention, diagnosis, and treatment, ensuring optimal oral health.",
    image: "https://smiledentalartscentre.com/wp-content/uploads/2023/09/DMO15832.jpg",
  },
] as const;

export const SERVICE_ICONS = [
  { label: "WHITENING", slug: "whitening" },
  { label: "PREVENTION", slug: "prevention" },
  { label: "Implants", slug: "implants" },
  { label: "Emergencies", slug: "emergencies" },
  { label: "X-Rays", slug: "x-rays" },
  { label: "Endodontics", slug: "endodontics" },
  { label: "Composite", slug: "composite" },
  { label: "Periodontics", slug: "periodontics" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Joseph Ghobrial",
    quote:
      "Experience was great, it's very clean and professional. Staff treated me like family and it was a comfortable environment.",
  },
  {
    name: "bahar sohrabi",
    quote:
      "The best and very kind dentist and very knowledgeable toddy I had cleaning with their hygienist so I'm so happy",
  },
  {
    name: "Jamshid Mojaver",
    quote:
      "This office is very clean with professional and caring team. I am satisfied attending to this office. Highly recommended.",
  },
  {
    name: "Mozhgan Gharasou",
    quote:
      "Dr. Neda and her team are the best, the office space is quiet and clean, and I recommend this office for treatment and oral health.",
  },
  {
    name: "Nikoo Ghafourian",
    quote:
      "Dr.Kadivar and her team are so nice and caring. She knows how to treat with patient. I really suggest this clinic.",
  },
] as const;

export const FOOTER_LINKS = {
  about: [
    { label: "Dr Neda Kadivar", href: CLINIC.external.drKadivar },
    { label: "Our Team", href: CLINIC.external.team },
    { label: "FAQ", href: CLINIC.external.faq },
  ],
  services: [
    { label: "Cleanings & Prevention", href: CLINIC.external.services },
    { label: "Cosmetic Dentistry", href: CLINIC.external.services },
    { label: "Restorations", href: CLINIC.external.services },
    { label: "CDCP", href: CLINIC.external.cdcp },
    { label: "Other Services", href: CLINIC.external.services },
  ],
} as const;
