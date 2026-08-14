// /app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sip & Slay LLC",
  description: "Luxury Cart Events",
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