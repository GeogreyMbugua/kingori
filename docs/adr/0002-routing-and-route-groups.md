# ADR 0002 — Root layout plus `(site)` route group; no root `page.tsx`

**Status:** Accepted · **Date:** 2026-10-04

## Context

The initial proposal included both `app/page.tsx` and `app/(site)/page.tsx`. Route groups do not add
a URL segment, so both resolve to `/`, and Next.js rejects conflicting paths.

## Decision

- `app/layout.tsx` is the single root layout. It owns `<html>`, `<body>`, global CSS and root
  metadata, and nothing visual.
- `app/(site)/layout.tsx` wraps all public pages in `PageShell` (skip link, header, main, footer).
- The homepage lives at `app/(site)/page.tsx`. There is no `app/page.tsx`.
- `app/not-found.tsx` renders `PageShell` itself, because it replaces the `(site)` layout when
  shown.
- Detail routes (`work/[slug]`, `media/[slug]`) use `generateStaticParams` with
  `dynamicParams = false`. Only known content slugs exist, and everything else is a static 404.
- `typedRoutes` is enabled, so internal `href`s are checked at compile time.

## Consequences

- Future non-site surfaces (for example a standalone campaign page with a different shell) can be a
  sibling route group without touching the public site.
- Unknown slugs log an internal `NoFallbackError` line on the server in Next 16.3. The response is
  still a correct 404.
