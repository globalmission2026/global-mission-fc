# Global Mission for Christ International

Official website for **Global Mission for Christ International** — a ministry dedicated to propagating revival to the nations of the world through prayer, the Word of God, and the power of the Holy Spirit.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on [Vercel](https://vercel.com).

## Tech Stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Framework | Next.js 16 (App Router)                          |
| Language  | TypeScript                                       |
| Styling   | Global CSS with design tokens                    |
| Database  | Supabase (PostgreSQL)                            |
| Image CDN | Cloudinary (dynamic uploads)                     |
| Hosting   | Vercel                                           |
| Auth      | API Key (upload endpoint)                        |
| CI/CD     | GitHub Actions (typecheck → lint → test → build) |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
#          CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
#          UPLOAD_API_KEY, RESEND_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start development server                           |
| `npm run build`      | Production build                                   |
| `npm run lint`       | ESLint check                                       |
| `npm run typecheck`  | TypeScript type check                              |
| `npm run test`       | Run vitest tests                                   |
| `npm run test:watch` | Watch mode                                         |
| `npm run check`      | Full CI check (typecheck -> lint -> test -> build) |

## Project Structure

```
src/
├── app/               # App Router pages
│   ├── about/         # About page (5 extracted sub-components)
│   ├── admin/         # Admin dashboard (events, messages)
│   ├── api/           # API routes (upload, events-health, contact)
│   ├── contact/       # Contact form -> Supabase + Resend
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
├── lib/               # Utilities and SDK config
│   ├── config.ts      # Centralized contact/social/hero config
│   ├── supabase.ts    # Supabase client (anon)
│   ├── cloudinary.ts  # Cloudinary upload helper
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
public/
└── images/            # Static assets (served via Vercel CDN)
```

## Image Strategy

- **Static assets** (backgrounds, headshots, gallery): placed in `public/images/` — served via Vercel CDN.
- **Dynamic uploads** (admin dashboard): uploaded to Cloudinary with automatic compression (`q_auto`/`f_auto`) and CDN delivery.
- **Hero background**: uses `next/image` with `priority` for LCP optimization.

## Testing

Tests use [Vitest](https://vitest.dev) with React Testing Library and vitest-axe for accessibility.

```bash
npm run test
npx vitest run --coverage
npm run test:watch
```

**Current coverage**: 10 test files, ~60 tests covering components, lib utilities, pages, and accessibility.

## Database (Supabase)

Tables: `events`, `contact_messages`, `gallery_images`. RLS policies:

- `events`: SELECT public, INSERT/UPDATE/DELETE authenticated
- `contact_messages`: INSERT public, SELECT authenticated
- `gallery_images`: SELECT public, INSERT/UPDATE/DELETE authenticated

See `src/lib/database.types.ts` for full schema types.

## Deployment

Deployed on **Vercel** — push to `master` triggers automatic deployment via the Vercel GitHub integration.

CI/CD via GitHub Actions (`.github/workflows/ci.yml`) runs on every push/PR:

1. TypeScript type check
2. ESLint
3. Vitest tests + coverage upload
4. Production build validation

Pre-commit: lint-staged (ESLint + Prettier). Pre-push: typecheck + test.

## License

MIT
