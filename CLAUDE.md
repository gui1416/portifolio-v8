# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A personal portfolio site (Next.js 15, App Router, React 18, TypeScript) for Guilherme. UI text/content is in Portuguese. Styled with Tailwind CSS + shadcn/ui (Radix UI primitives).

## Commands

```bash
npm run dev      # start dev server (next dev)
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
```

There is no test suite configured in this repo.

Note: `next.config.ts` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so `npm run build` will succeed even with lint/type errors — don't rely on a clean build as a correctness signal. Run `npm run lint` and `tsc --noEmit` explicitly when verifying changes.

## Architecture

### Content is fetched, not hardcoded

Most page content (projects, education, experience) is NOT stored in this repo — it's fetched at request/build time from external APIs configured via environment variables:

- `src/lib/projects.ts` — fetches from `PROJECTS_API_URL`, revalidates every hour (`next: { revalidate: 3600 }`)
- `src/lib/experiences.ts` — fetches from `EXPERIENCES_API_URL`, `cache: 'force-cache'`
- `src/lib/education.ts` — fetches from `NEXT_PUBLIC_EDUCATION_API_URL`

Each module throws or fails gracefully (returns `[]`) differently when the env var is missing — check the specific file before assuming behavior. The `/commits` page (`src/app/commits/page.tsx`) instead calls the public GitHub REST API directly (`api.github.com/users/gui1416/...`) to list recent commits across repos, with no auth token. `src/lib/github-contributions.ts` similarly hits a public, unauthenticated third-party endpoint (`github-contributions-api.jogruber.de/v4/<username>`) to get GitHub's contribution-calendar data (no official REST/GraphQL-free equivalent exists), revalidated hourly; it's rendered by `src/components/github-contributions-card.tsx` on the `/hero` page below the WhatsApp button, with `<lg` using a fixed-cell horizontally-scrollable layout and `lg:` switching to a fluid CSS-grid layout (`1fr` columns + `aspect-square` cells) that always fits the card width with no scroll.

When adding new content sections, follow the existing pattern: a `src/lib/*.ts` data-fetching module with exported types, consumed by a Server Component page.

### Layout / navigation

`src/app/layout.tsx` wraps every page in `ThemeProvider` (dark by default) → `SidebarProvider` → fixed `Sidebar` + `<main>`. The sidebar (`src/components/sidebar.tsx`) hardcodes the nav items (`/hero`, `/education`, `/skills`, `/experience`, `/projects`, `/commits`, `/contact`) and is a client component using `useSidebar()` (from `sidebar-provider.tsx`) for open/collapse state. There is no root `/` redirect logic beyond `src/app/page.tsx` — check it before assuming `/hero` is the landing route.

### Contact form flow

`src/app/contact/page.tsx` posts to `src/app/api/contact/route.ts`, which:
1. Rate-limits by IP via `src/lib/rate-limit.ts` (Upstash Redis + `@upstash/ratelimit`, sliding window: 1 request / 60s). Requires `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.
2. Sends an email via Resend (`RESEND_API_KEY`), rendering `src/components/email-template/contact-email.tsx` as the email body.

### UI components

`src/components/ui/*` are shadcn/ui components (generated via the shadcn CLI per `components.json` — base color `neutral`, no className prefix). Prefer adding new primitives the same way rather than hand-rolling Radix wrappers. Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

### Dynamic project pages

`src/app/projects/[slug]/page.tsx` uses `generateStaticParams()` against `getAllProjects()` for SSG, and `getProjectBySlug` / `getRelatedProjects` (in `src/lib/projects.ts`) for the per-project data and "related projects" section, with a `not-found.tsx` fallback.
