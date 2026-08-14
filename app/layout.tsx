// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Keyword-led rather than brand-led: people search the service and the city,
  // not the business name. Kept under ~60 characters so Google shows it whole.
  title: "Mobile Bartending & Event Carts in Chicagoland | Sip & Slay",
  description:
    "Luxury event carts for Chicagoland weddings, birthdays & corporate events — mobile bartending, mixology classes, dessert carts & event servers.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      // Filename is capital-I on disk. Vercel runs Linux and is case-sensitive,
      // so this must match exactly or it 404s in production.
      { url: "/Icon.png", type: "image/png" },
    ],
  },
};

// LocalBusiness structured data. This is invisible to visitors — it exists so
// Google can read the business as an entity (services, service area, contact)
// rather than inferring it from prose, which is what feeds the local results.
//
// No street address on purpose: this is a mobile, service-area business, so
// the radius below is what matters and a home address would be published to
// the world for no benefit. Google supports omitting it for this business type.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sip & Slay LLC",
  description:
    "Luxury event carts serving Chicagoland — mobile bartending, in-home mixology classes, ice cream and waffle pop dessert carts, and professional event servers.",
  url: "https://sipandslayllc.com",
  telephone: "+1-630-666-5882",
  email: "sipandslayllc@gmail.com",
  image: "https://sipandslayllc.com/logo.png",
  priceRange: "$200+",
  // Canonical profile URL only — the ?utm_source share-sheet parameters that
  // Instagram appends are tracking noise and would weaken the entity match.
  sameAs: ["https://www.instagram.com/sip_and_slayllc/"],
  address: {
    "@type": "PostalAddress",
    postalCode: "60004",
    addressRegion: "IL",
    addressCountry: "US",
  },
  // 80 miles in every direction from 60004, expressed in metres.
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 42.0884,
      longitude: -87.9806,
    },
    geoRadius: "128748",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event Services",
    itemListElement: [
      "Bar Cart Experience",
      "Professional Event Servers",
      "In-Home Mixology Classes",
      "Ice Cream Sundae Cart",
      "Waffle Pop Cart",
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}