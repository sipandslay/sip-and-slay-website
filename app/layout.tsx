// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";

// Self-hosted at build time by next/font, so no runtime request to Google and
// no layout shift. Dancing Script stays legible at small sizes where a more
// formal script (Great Vibes, Allura) turns to mush.
const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

const siteUrl = "https://sipandslayllc.com";

// Brand first, so it survives in the browser tab, bookmarks and history, which
// only show the first 20-30 characters. Service terms still follow. Chicagoland
// lives in the description instead — the verified Google Business Profile
// already owns local and "near me" intent, so the title need not carry it.
const siteTitle = "Sip & Slay LLC | Mobile Bartending & Event Services";

const siteDescription =
  "Luxury event services for Chicagoland weddings, birthdays & corporate events — mobile bartending, mixology classes, dessert carts & event servers.";

export const metadata: Metadata = {
  // Lets the relative image path below resolve to an absolute URL, which the
  // link-preview crawlers require.
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  // Without these, sharing the link produced plain text with no image.
  openGraph: {
    type: "website",
    siteName: "Sip & Slay LLC",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        // Purpose-built 1200x630 card — the ratio every preview crawler wants.
        url: "/og-banner-v2.png",
        width: 1200,
        height: 630,
        alt: "Sip & Slay LLC — luxury event services, mobile bartending, mixology classes, dessert carts and event servers in Chicagoland",
      },
    ],
  },
  twitter: {
    // Safe to use the large card now that the image is true 1200x630 landscape;
    // it would have cropped the square logo top and bottom.
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-banner-v2.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      // Filename is capital-I on disk. Vercel runs Linux and is case-sensitive,
      // so this must match exactly or it 404s in production.
      { url: "/Icon.png", type: "image/png" },
    ],
  },
};

// LocalBusiness structured data. Invisible to visitors, and secondary to the
// verified Google Business Profile, which is what Google actually displays in
// local results. This exists only to corroborate that profile — so it is
// deliberately limited to stable facts.
//
// Hours and price range are intentionally absent. Both are displayed from the
// Business Profile and both change over time, so asserting them here only
// creates a chance of the site contradicting the profile, which is worse than
// staying silent. Same reasoning for the street address, with the added point
// that this is a mobile business and a home address should not be published.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sip & Slay LLC",
  description:
    "Luxury event services serving Chicagoland — mobile bartending, in-home mixology classes, ice cream and waffle pop dessert carts, and professional event servers.",
  url: siteUrl,
  telephone: "+1-630-666-5882",
  email: "sipandslayllc@gmail.com",
  image: `${siteUrl}/logo-v2.png`,
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
    <html lang="en" className={script.variable}>
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