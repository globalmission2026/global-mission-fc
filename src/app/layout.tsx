import type { Metadata } from "next";
import { Inter, Outfit, Fraunces } from "next/font/google";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";
import "../styles/tokens.css";

// Import Extracted CSS
import "../styles/navbar-standalone.css";
import "../styles/hero.css";
import "../styles/events-list.css";
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
      <body>
        <UtilityNav />
        <Navbar />
        <ErrorBoundary fallback={<div style={{ padding: "40px", textAlign: "center", color: "#4A1110" }}>
          <h2>Something went wrong</h2>
          <p style={{ color: "#6B7280", marginTop: "12px" }}>An unexpected error occurred. Please try refreshing the page.</p>
        </div>}>
          {children}
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
