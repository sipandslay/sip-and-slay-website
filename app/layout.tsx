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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}