import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonisch Homes – Find Your Dream Property",
  description:
    "Browse live MLS listings for homes, rentals, luxury properties, commercial spaces, and land. Real-time data updated every 5 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
