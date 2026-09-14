# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing/lead-gen website for **Vidébarras**, a French "débarras" (property clearance/junk removal) service in Île-de-France. Vite + React + TypeScript SPA styled with Tailwind, backed by Supabase (Postgres + Edge Functions) for lead capture and a realizations gallery. Originally scaffolded via Bolt (`bolt-vite-react-ts` template, see `.bolt/config.json` / `.bolt/prompt`).

## Commands

```bash
npm run dev         # start Vite dev server
npm run build        # production build (tsc project refs + vite build)
npm run lint          # eslint over the whole repo
npm run typecheck    # tsc --noEmit -p tsconfig.app.json
npm run preview      # serve the production build locally
npm run sonar        # run sonar-scanner (see sonar-project.properties)
```

There is no test runner configured (no test script, no test files). `sonar-project.properties` references a `coverage/lcov.info` path for future test coverage, but nothing currently produces it.

Supabase Edge Function development/deploy uses the Supabase CLI directly (not an npm script), e.g. `supabase functions deploy send-estimation-email`.

## Environment

Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` at build/dev time (`src/lib/supabase.ts` throws if missing). The Edge Function additionally needs `RESEND_API_KEY` set as a Supabase secret for outbound email.

## Architecture

- **Routing**: `src/App.tsx` defines all routes with `react-router-dom` (`/`, `/services`, `/realisations`, `/contact`, `/about`, `/faq`). Every route is wrapped in the single `Layout` component (`src/components/Layout.tsx`), which renders the shared header/nav/footer around `children`. `ScrollToTop` resets scroll position on route change.
- **Pages vs components**: `src/pages/*` are route-level screens; `src/components/*` are reusable pieces used across pages (forms, modals, SEO, maps, etc.). There is no shared layout/route wrapper beyond `Layout` — pages compose components directly.
- **SEO**: Each page mounts `<SEO />` (`src/components/SEO.tsx`) with page-specific title/description/structured data. It's a headless component that imperatively writes `document.title`, meta tags, canonical link, and a JSON-LD `<script>` into `document.head` via `useEffect` (no `react-helmet`). Structured data payloads (LocalBusiness, Service, FAQPage, BreadcrumbList) live in `src/lib/structuredData.ts` and are composed per-page.
- **Lead capture flow (the core feature)**: `EstimationWizard` (`src/components/EstimationWizard.tsx`, used on `Home`) is a multi-step wizard that:
  1. Collects service type (Cave/Appartement/Maison/Grenier/Local commercial) and type-specific details.
  2. Computes a price estimate client-side per service type (`calculate*Price` functions) — pure presentational logic, not sourced from the DB.
  3. On submit, inserts a row into the Supabase `estimations` table, then invokes the `send-estimation-email` Supabase Edge Function (`supabase/functions/send-estimation-email/index.ts`) to send a recap email via the Resend API. Email failure is non-fatal (logged + alert, submission still marked as sent).
  - `src/components/DebarrasForm.tsx` is an **older/duplicate** step-form component — it is not imported or routed anywhere; treat it as dead code unless asked to revive or remove it.
- **Realizations gallery**: `src/pages/Realizations.tsx` reads from the Supabase `realizations` table (public read via RLS) directly using `supabase-js`.
- **Database**: Schema lives only in `supabase/migrations/*.sql` (no ORM). Two tables:
  - `estimations` — one row per wizard submission; RLS allows anonymous `INSERT`, authenticated-only `SELECT`.
  - `realizations` — portfolio entries with `media_urls` (jsonb array) and `featured` flag; RLS allows public `SELECT`, authenticated-only writes.
  When changing schema, add a new timestamped file under `supabase/migrations/` rather than editing existing ones.
- **Styling**: Tailwind only (`tailwind.config.js` defines `primary`/`background-light`/`background-dark` custom colors and `darkMode: 'class'`, though dark mode isn't actively wired up in components). No component library — icons come from `lucide-react` per the Bolt prompt's constraint ("don't install other UI/icon packages unless necessary").
- **Static assets**: `public/*.png` are hero/gallery images referenced by absolute path (e.g. `/debara.png` for the logo).
