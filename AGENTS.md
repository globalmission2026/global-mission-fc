<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project State (after full cleanup refactor)

## Objective
Build and maintain a Next.js church website for Global Mission for Christ International, deployed on Cloudflare Pages.

## Key Decisions
- Static export on Cloudflare Pages (`output: "export"` when `CF_PAGES` is set)
- Image strategy: static → `public/images/` (free on CF Pages); dynamic uploads → Cloudinary
- GitHub remote: `origin` → `https://github.com/globalmission2026/global-mission-fc.git`
- Pre-commit (lint-staged: ESLint + tsc) and pre-push (typecheck + vitest) enforced via Husky
- CI/CD runs typecheck → lint → test → build → deploy on push to master

## Work State
### Completed
- Fixed duplicate particles system (removed from `enhancements.js`, kept React `ParticlesCanvas.tsx`)
- Moved DOM enhancements (word rotator, stats counter, scroll arrow, progress bar) into `Hero.tsx` hooks
- Deleted `public/scripts/enhancements.js`
- Added API key auth to `/api/upload` (X-Api-Key header required)
- Fixed `/api/upload` Edge runtime (exported `runtime = 'nodejs'`)
- Fixed footer subscribe form (preventDefault + "coming soon" button)
- Created `/events/[slug]/page.tsx` dynamic event detail page
- Fixed footer "/photos" link → "/gallery"
- Fixed `wrangler.toml` output dir (`.vercel/output/static` → `out`)
- Deleted 4 legacy WordPress CSS files (~1,000+ lines dead code)
- Deleted `page.module.css`, 4 default SVGs, unused `ContactForm.tsx`, duplicate Swiper files
- Moved 14 migration artifacts to `scripts/migration/`
- Created `src/lib/config.ts` — centralized contact/social/hero config
- Created `src/styles/tokens.css` — design tokens with comprehensive color palette
- Created `.prettierrc` with project-standard formatting
- Refactored hardcoded contact/social data in 4 files to use config imports
- Fixed Navbar active state for sub-routes (`startsWith` instead of `===`)
- Added explicit column selection to Supabase queries (no more `select('*')`)
- Installed Swiper 14 from npm; rewrote Gallery with proper React Swiper components
- Removed global Swiper script/CSS from layout.tsx
- Extracted upload validation into pure function (`src/lib/upload-validation.ts`)
- Added coverage thresholds to vitest config
- Added caching, coverage artifact, and deploy step to CI pipeline
- Set realistic Husky hooks (pre-commit: lint-staged; pre-push: typecheck + test)

### Polish / UX
- Refactored give page: 30+ inline styles → `give-page.css` with token variables
- Extracted about page into 5 sub-components (VisionMissionCards, CoreValues, DirectorMessage, LeadershipTeam, ContactBanner)
- Added `react-error-boundary` around layout children with Fallback component
- Deleted `public/window.svg` (last unused default asset)
- Adopted CSS tokens across 9 CSS files (~110 hex→var replacements)
- Extended `tokens.css` with full gray palette, orange variants, social brand colors
- Added EventList pagination (limit 20, "Load More" button)
- Converted Hero CSS background → `next/image` with `priority` for LCP optimization

### Testing
- 30 new tests added (total: 61 tests across 10 files)
- Contact form tests: render, submit, success/error states, submitting state
- EventList tests: loading skeleton, render events, empty state (upcoming + past), past class, date badge, CTA text
- Footer tests: copyright year, phones, email, address, quick links, resources, subscribe form, social links, CTA button, mission quote
- Accessibility tests: vitest-axe for Navbar and Gallery (no violations expected)
- Installed `vitest-axe` with matchers in setup.ts

### Active / Blocked
- (none)

## Supabase Row-Level Security (RLS)
- `events` table: Enable RLS with `SELECT` for all (public read), `INSERT/UPDATE/DELETE` for authenticated users only
- `contact_messages` table: Enable RLS with `INSERT` for all (public form submission), `SELECT` for authenticated users only
- `gallery_images` table: Enable RLS with `SELECT` for all (public gallery), `INSERT/UPDATE/DELETE` for authenticated users
- Apply via Supabase Dashboard → Authentication → Policies or SQL Editor:
  ```sql
  -- Example: contact_messages INSERT policy
  CREATE POLICY "Anyone can insert contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);
  ```

## Relevant Files
- `src/lib/config.ts` — centralized contact/social/hero config
- `src/lib/upload-validation.ts` — shared file upload validation (type + size)
- `src/lib/cloudinary.ts` — Cloudinary SDK config + upload with auto-compression
- `src/lib/image-upload.ts` — client-side upload + canvas compression
- `src/lib/supabase.ts` — Supabase client
- `src/app/api/upload/route.ts` — POST `/api/upload` (auth required, nodejs runtime)
- `src/app/events/[slug]/page.tsx` — dynamic event detail page
- `src/components/home/Hero.tsx` — hero with embedded React hooks for word rotator, stats, scroll arrow, progress bar
- `src/components/home/Gallery.tsx` — Swiper 14 coverflow gallery (npm package, no CDN)
- `src/styles/tokens.css` — design tokens (CSS custom properties)
- `src/styles/give-page.css` — give page styles (token-based)
- `src/components/about/VisionMissionCards.tsx` — vision/mission card section
- `src/components/about/CoreValues.tsx` — core values section
- `src/components/about/DirectorMessage.tsx` — director's message section
- `src/components/about/LeadershipTeam.tsx` — leadership team grid
- `src/components/about/ContactBanner.tsx` — contact info banner
- `src/lib/__tests__/upload-validation.test.ts` — validation tests
