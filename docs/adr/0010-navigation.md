# ADR 0010 — Mobile navigation: always visible, no menu button

**Status:** Accepted · **Date:** 2026-10-04

## Context

Primary navigation has four short destinations (Work, Media, About, Contact). The common mobile
pattern hides navigation behind a menu button, which costs a tap, hides the site structure, and
needs client JavaScript, focus management and a disclosure state.

## Decision

- Navigation is **always visible**. On mobile the wordmark sits above a full-width row of the four
  links spread across the screen. From 48em the wordmark and links share one row.
- Links use `Link variant="nav"`: 44×44px minimum touch targets, an accent underline plus a
  heavier weight for the current page (`aria-current="page"`), and an accent underline for the
  parent section (`aria-current="true"`), so state is never shown by colour alone.
- `NavLink` remains the only client component in the shell (it needs `usePathname`).

## Consequences

- No JavaScript, focus traps or open/closed state, and every destination is one tap away.
- E2E tests assert the nav is visible on mobile with ≥ 44px targets and no overflow at 320px.
- If navigation grows beyond what fits on one row at 320px, revisit with a new ADR (likely a
  native `<details>` or popover-based disclosure).
