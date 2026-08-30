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
import "../styles/admin.css";

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

import PublicLayout from "@/components/layout/PublicLayout";
import { SITE_URL } from "@/lib/config";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Global Mission for Christ International",
    template: "%s | Global Mission for Christ International",
  },
  description:
    "Global Mission for Christ International is a Christian ministry dedicated to propagating revival to the nations, preaching the Gospel of Jesus Christ, evangelistic missions, and community transformation.",
  keywords: [
    "Global Mission for Christ",
    "Global Mission for Christ International",
    "Global Mission FC",
    "GMFC",
    "Christian Ministry",
    "Revival",
    "Church Kenya",
    "Evangelistic Missions",
    "Conferences",
    "Sermons",
    "Gospel",
  ],
  authors: [{ name: "Global Mission for Christ International" }],
  creator: "Global Mission for Christ International",
  publisher: "Global Mission for Christ International",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Global Mission for Christ International",
    description:
      "Global Mission for Christ International is a Christian ministry dedicated to propagating revival to the nations, preaching the Gospel of Jesus Christ, and community transformation.",
    url: siteUrl,
    siteName: "Global Mission for Christ International",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-bg-optimized.jpg",
        width: 1200,
        height: 630,
        alt: "Global Mission for Christ International",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Mission for Christ International",
    description:
      "Propagating revival to the nations through evangelistic missions and community transformation.",
    images: ["/images/hero-bg-optimized.jpg"],
    creator: "@globalmissionfc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Global Mission for Christ International",
  alternateName: ["Global Mission for Christ", "GMFC", "Global Mission FC"],
  url: siteUrl,
  logo: `${siteUrl}/images/gmfc-logo.png`,
  image: `${siteUrl}/images/hero-bg-optimized.jpg`,
  description:
    "Global Mission for Christ International is a Christian ministry dedicated to propagating revival to the nations, preaching the Gospel of Jesus Christ, evangelistic missions, and community transformation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "P.O. Box 444 – 10100",
    addressCountry: "KE",
  },
  telephone: ["+254721341793", "+15127856994", "+254710642232"],
  email: "globalmissionfc@gmail.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61591907680791",
    "https://www.instagram.com/globalmissionfc/",
    "https://twitter.com/globalmissionfc",
    "https://www.youtube.com/@GlobalMissionfc",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PublicLayout>
          <ErrorBoundary
            fallback={
              <div style={{ padding: "40px", textAlign: "center", color: "#4A1110" }}>
                <h2>Something went wrong</h2>
                <p style={{ color: "#6B7280", marginTop: "12px" }}>
                  An unexpected error occurred. Please try refreshing the page.
                </p>
              </div>
            }
          >
            {children}
          </ErrorBoundary>
        </PublicLayout>
      </body>
    </html>
  );
}
