# ADR 0005 — Vitest for unit/integration, Playwright for end-to-end

**Status:** Accepted · **Date:** 2026-10-04

## Context

We need fast feedback on logic and components, plus real-browser verification of routing, focus
management, HTTP status codes and metadata. Async Server Components can't be unit-rendered.

## Decision

- **`tests/unit`**: pure functions and config (Vitest).
- **`tests/integration`**: components and synchronous route components rendered together (Vitest +
  React Testing Library + jsdom). `next/navigation` is mocked only where a hook is involved.
- **`tests/e2e`**: Playwright against the production build (`build && start` on port 3100), with
  `mobile` (Pixel 7) and `desktop` projects. This covers async routes, 404 status, keyboard focus,
  robots and sitemap.
- Tests assert behaviour that exists, such as landmarks, the skip link, `aria-current`, canonical
  URLs and indexing defaults. They are not written for coverage numbers.
- Path aliases are mapped directly in `vitest.config.mts`. No extra plugin is needed.

## Consequences

- `npm run check` (lint, typecheck, test, build) is the pre-merge gate. E2E runs separately because
  it needs a browser binary.
- Visual regression and automated axe audits are deferred until visual components exist.
