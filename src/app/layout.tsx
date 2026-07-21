import type { Metadata } from "next";
import { Inter, Outfit, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Import Extracted CSS
import "../styles/navbar-standalone.css";
import "../styles/hero.css";
import "../styles/events-list.css";
import "../styles/events-single.css";
import "../styles/footer.css";
import "../styles/videos.css";

// Page-specific CSS (were inline <style> tags in WordPress)
import "../styles/page-hero.css";
import "../styles/about-page.css";
import "../styles/contact-page.css";
import "../styles/event-highlights.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

import UtilityNav from "@/components/layout/UtilityNav";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Global Mission for Christ International",
  description: "Propagating Revival to the Nations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${fraunces.variable}`}>
      <head>
        <link rel="stylesheet" href="/scripts/swiper-bundle.min.css" />
      </head>
      <body>
        <UtilityNav />
        <Navbar />
        {children}
        <Footer />
        <Script src="/scripts/swiper-bundle.min.js" strategy="beforeInteractive" />
        <Script src="/scripts/enhancements.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
