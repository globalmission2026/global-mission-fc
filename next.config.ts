import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output static for Cloudflare Pages compatibility
  // (swap to 'export' only when you're ready to go fully static with no server features)
  output: process.env.CF_PAGES ? "export" : undefined,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    unoptimized: Boolean(process.env.CF_PAGES),
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
