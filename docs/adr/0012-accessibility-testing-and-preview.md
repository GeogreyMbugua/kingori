# ADR 0012 — Automated accessibility checks and the design-system preview

**Status:** Accepted · **Date:** 2026-10-04

## Context

The design system needs one place where every primitive renders together, and accessibility
regressions need to fail CI rather than rely on manual review.

## Decision

**Preview route.** `/design-system` lives in the `(internal)` route group.

- It is served when `siteConfig.designSystemPreview` is true: always outside production, and in
  production only with `ENABLE_DESIGN_SYSTEM_PREVIEW=true`. Otherwise it returns 404.
- It is always `noindex, nofollow`, never linked, and not in the sitemap (asserted in e2e).
- Specimen copy lives in `src/content/demo/`. An ESLint rule allows only
  `features/design-system`, `app/(internal)` and `content/demo` itself to import it, so demo
  content cannot reach a production page.

**Dependency: `@axe-core/playwright`** (dev only). It runs Deque's axe-core rules in the real
browser against the production build. It is the de facto standard engine, adds no runtime code,
and integrates with the existing Playwright setup.

- Every public route, the 404 page and `/design-system` are scanned against WCAG 2.0/2.1/2.2 A
  and AA plus best practices, on mobile and desktop, with reduced motion emulated so scroll
  reveals render in their final state.
- Further e2e checks: no horizontal overflow at 320px (WCAG 1.4.10), nav touch targets ≥ 44px,
  a visible focus indicator, and skip-link behaviour.
- Unit tests separately enforce colour-contrast contracts from `tokens.css`.

## Consequences

- Automated checks catch roughly a third to half of WCAG issues. Manual keyboard and screen-reader
  review is still required before launch.
- The e2e web server builds with the preview enabled. Production deployments leave it unset.
