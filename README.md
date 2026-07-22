# Global Mission for Christ International

Official website for **Global Mission for Christ International** — a ministry dedicated to propagating revival to the nations of the world through prayer, the Word of God, and the power of the Holy Spirit.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Global CSS with design tokens |
| Database | Supabase (PostgreSQL) |
| Image CDN | Cloudinary (dynamic uploads) |
| Hosting | Cloudflare Pages (static export) |
| Auth | API Key (upload endpoint) |
| CI/CD | GitHub Actions (typecheck → lint → test → build → deploy) |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
#          CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
#          UPLOAD_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type check |
| `npm run test` | Run vitest tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run check` | Full CI check (typecheck → lint → test → build) |

## Project Structure

```
src/
├── app/               # App Router pages
│   ├── about/         # About page (5 extracted sub-components)
│   ├── contact/       # Contact form → Supabase
│   ├── events/        # Events list (paginated) + [slug]/ detail page
│   ├── gallery/       # Swiper coverflow gallery
│   ├── give/          # Give page (token-based styles)
│   └── sermons/       # Videos/sermons hub
├── components/
│   ├── about/         # VisionMissionCards, CoreValues, DirectorMessage, etc.
│   ├── events/        # EventList (loading, empty, pagination states)
│   ├── home/          # Hero, Gallery, EventHighlights
│   ├── layout/        # Navbar, Footer, UtilityNav
│   └── shared/        # PageHero, ParticlesCanvas
├── lib/               # Utilities & SDK config
│   ├── config.ts      # Centralized contact/social/hero config
│   ├── supabase.ts    # Supabase client
│   ├── cloudinary.ts  # Cloudinary upload
│   ├── image-upload.ts # Client-side image compression
│   ├── upload-validation.ts # Shared upload validation
│   └── database.types.ts # Supabase schema types
├── styles/            # Global CSS files
│   ├── tokens.css     # Design tokens (colors, spacing, radii, shadows)
│   ├── hero.css       # Homepage hero
│   ├── footer.css     # Premium dark footer
│   └── ... (10 CSS files)
└── test/
    └── setup.ts       # vitest setup (jest-dom, vitest-axe matchers)
functions/
└── api/
    └── upload.ts      # Cloudflare Pages Function (production API)
public/
└── images/            # Static assets (free on CF Pages)
```

## Image Strategy

- **Static assets** (backgrounds, headshots, gallery): placed in `public/images/` — served free on Cloudflare Pages with no bandwidth costs.
- **Dynamic uploads** (future admin dashboard): uploaded to Cloudinary with automatic compression (`q_auto`/`f_auto`) and CDN delivery.
- **Hero background**: uses `next/image` with `priority` for LCP optimization.

## Testing

Tests use [Vitest](https://vitest.dev) with React Testing Library and vitest-axe for accessibility.

```bash
# Run all tests
npm run test

# Run with coverage
npx vitest run --coverage

# Watch mode
npm run test:watch
```

**Current coverage**: 10 test files, ~60 tests total covering components (Navbar, Hero, Gallery, Footer), lib (upload-validation, image-upload), pages (contact form), and accessibility.

## Database (Supabase)

Tables: `events`, `contact_messages`, `gallery_images`. RLS policies:
- `events`: SELECT public, INSERT/UPDATE/DELETE authenticated
- `contact_messages`: INSERT public, SELECT authenticated
- `gallery_images`: SELECT public, INSERT/UPDATE/DELETE authenticated

See `src/lib/database.types.ts` for full schema types.

## Deployment

Deployed on Cloudflare Pages. CI/CD via GitHub Actions (`.github/workflows/ci.yml`):

1. TypeScript type check
2. ESLint
3. Vitest tests
4. Production build (`output: "export"`)
5. Deploy to Cloudflare Pages (master branch only)

```bash
# Manual deploy
npm run build
npx wrangler pages deploy out
```

Pre-commit: lint-staged (ESLint + prettier). Pre-push: typecheck + test.

## License

MIT
