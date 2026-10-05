# ADR 0008 — Layout, spacing and the grid

**Status:** Accepted · **Date:** 2026-10-04

## Context

Art-directed pages need asymmetric compositions that change per breakpoint, while staying
consistent in rhythm and alignment.

## Decision

- **Spacing.** A fixed nine-step scale (`--space-1`…`--space-9`: 4, 8, 12, 16, 24, 32, 48, 64,
  96px) for component spacing, plus three fluid section rhythms (`--space-section-sm`,
  `--space-section`, `--space-section-lg`). `--space-flow` (1em) spaces running text.
- **Containers.** `Container` caps content at `reading` (42rem), `content` (80rem, default) or
  `wide` (104rem), plus a fluid `--gutter` on each side. Text measure is capped at 66ch by the
  reading roles themselves.
- **Grid.** 4 columns on mobile, 8 from 48em, 12 from 64em (`--grid-columns`, `--grid-gap`).
  `Grid`/`GridItem` express per-tier spans and start columns as custom properties
  (`--span-desktop: 7`), typed per tier so impossible spans fail to compile. Spans inherit upward
  through the tiers; starts reset when the column count changes.
- **Sections own vertical rhythm.** `Section` combines container width, spacing, surface and an
  optional eyebrow label. `<main>` adds no padding of its own.
- **Breakpoints** come only from `src/lib/breakpoints.ts` (test-enforced).

## Consequences

- Page compositions are expressed with `Section` + `Grid` + tokens, without new layout CSS for
  common cases. Bespoke compositions remain possible in feature CSS Modules, using the same
  tokens.
- No layout library or utility classes.
