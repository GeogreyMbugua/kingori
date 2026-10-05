# ADR 0001 — Layered source architecture with lint-enforced boundaries

**Status:** Accepted · **Date:** 2026-10-04

## Context

The site will grow into many art-directed compositions. Without explicit boundaries, page-specific
code leaks into shared components, content gets hard-coded into JSX, and circular imports appear.

## Decision

`src/` is split into `app`, `features`, `components`, `content`, `config`, `lib`, `types` and
`styles`, with a one-directional dependency graph (see README "Dependency rules").

The graph is enforced by `no-restricted-imports` in `eslint.config.mjs`:

- Each layer has an allow-list of layers it may import via `@/`.
- Features cannot import other features. The rule is generated per feature folder.
- Parent-relative imports (`../`) are banned, so every cross-folder import uses the checkable alias.
- Components receive configuration and content via props, never by importing it.

## Consequences

- Boundary violations fail `npm run lint` and CI rather than surfacing in code review.
- Adding a layer, or relaxing a rule, means editing `ALLOWED_IMPORTS` in the ESLint config. That
  change should come with a new ADR.
- `lib` may read `config`, so helpers like `createPageMetadata` can apply site defaults. `lib` must
  stay free of React components.
