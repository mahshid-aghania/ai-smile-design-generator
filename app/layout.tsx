import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://implants.dfdentistry.ca";

const TITLE = "Dental Implants From $299/Month | Vaughan, ON | Dentin Family Dentistry";
const DESCRIPTION =
  "Affordable dental implants in Vaughan starting at $299/month with $500 down. Preview your new smile with our free AI Smile Generator. Call 437-900-2200.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "AI Smile Preview",
  keywords: [
    "dental implants Vaughan",
    "dental implant financing",
    "AI smile preview",
    "periodontist Vaughan",
    "Dentin Family Dentistry",
    "missing teeth replacement",
  ],
  authors: [{ name: "Dentin Family Dentistry", url: "https://dfdentistry.ca" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Dentin Family Dentistry",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_CA",
    images: [
      {
        url: "/dental-implant-diagram.png",
        width: 1200,
        height: 1200,
        alt: "3D dental implant diagram showing crown, abutment and titanium post",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/dental-implant-diagram.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}#dentist`,
  name: "Dentin Family Dentistry",
  description: DESCRIPTION,
  url: "https://dfdentistry.ca",
  telephone: "+1-437-900-2200",
  priceRange: "$$",
  image: `${SITE_URL}/dental-implant-diagram.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "3300 Steeles Ave W Unit #6",
    addressLocality: "Vaughan",
    addressRegion: "ON",
    postalCode: "L4K 2Y4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7942,
    longitude: -79.5361,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  medicalSpecialty: "Periodontic",
  employee: {
    "@type": "Person",
    name: "Dr. Mehdi Adibrad",
    honorificSuffix: "DDS",
    jobTitle: "Periodontist & Implant Surgeon",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} h-full bg-background antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
