# Global Mission for Christ International

Official website for **Global Mission for Christ International** — a ministry dedicated to propagating revival to the nations of the world through prayer, the Word of God, and the power of the Holy Spirit.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + Global CSS |
| Database | Supabase (PostgreSQL) |
| Image CDN | Cloudinary (for dynamic uploads) |
| Email | Resend (contact form) |
| Hosting | Cloudflare Pages |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Then fill in your Supabase, Resend, and Cloudinary keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/            # App Router pages (routes)
│   ├── about/
│   ├── contact/
│   ├── events/
│   ├── gallery/
│   ├── give/
│   └── sermons/
├── components/     # Reusable React components
│   ├── contact/
│   ├── events/
│   ├── home/
│   ├── layout/
│   └── shared/
├── lib/            # Utilities & SDK config
│   ├── supabase.ts
│   ├── cloudinary.ts
│   └── image-upload.ts
└── styles/         # CSS files
public/
├── images/         # Static assets (free on Cloudflare Pages)
│   ├── events/
│   ├── gallery/
│   └── (headshots)
└── scripts/        # Legacy JS (Swiper, etc.)
```

## Image Strategy

- **Static assets** (backgrounds, headshots, gallery): placed in `public/images/` — served free on Cloudflare Pages with no bandwidth costs.
- **Dynamic uploads** (future admin dashboard): uploaded to Cloudinary (25 GB free tier) with automatic compression (`q_auto`/`f_auto`) and CDN delivery.

## Deployment

The site is deployed on Cloudflare Pages. The `wrangler.toml` config handles the build and deployment settings.

```bash
# Build for production
npm run build

# Deploy (requires Cloudflare credentials)
npx wrangler pages deploy .vercel/output/static
```

## License

MIT
