import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SHELL BIOTECH | Pharmaceutical Products & Healthcare Distribution",
    template: "%s | SHELL BIOTECH",
  },
  description:
    "Shell Biotech is a pharmaceutical sourcing, marketing, and distribution partnership established in 2013 in Hyderabad, Telangana. Supplying quality formulations to hospitals and healthcare institutions.",
  keywords: [
    "Shell Biotech",
    "Pharmaceutical Products",
    "Pharmaceutical Sourcing",
    "Healthcare Supply Telangana",
    "Hospital Supply Hyderabad",
    "Pharma Marketing",
  ],
  authors: [{ name: "Shell Biotech" }],
  creator: "Shell Biotech",
  metadataBase: new URL("https://shellbiotech.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shellbiotech.in",
    siteName: "Shell Biotech",
    title: "SHELL BIOTECH | Pharmaceutical Products & Healthcare Distribution",
    description:
      "Pharmaceutical sourcing, marketing, and institutional healthcare supply across Telangana, India.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
