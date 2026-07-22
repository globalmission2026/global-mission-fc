import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We use @cloudflare/next-on-pages which supports SSR. Do NOT set output: 'export'.

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },

      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    unoptimized: Boolean(process.env.CF_PAGES),
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
