# ADR 0004 — Editorial content as typed TypeScript modules

**Status:** Accepted · **Date:** 2026-10-04

## Context

The site needs structured content (projects, media, page copy) but has no editors yet, and the
brief excludes a CMS and database for now.

## Decision

- Content lives in `src/content/*.ts`, typed by contracts in `src/types/content.ts` and
  `src/types/media.ts`.
- Features read content through plain exports and selectors (`getProjectBySlug`). Routes resolve
  slugs and pass entities to features.
- Every content object has `status: "placeholder" | "final"`. Nothing factual is invented.
  Collections start empty.
- Images must declare accessibility intent through the type system: `alt` or `decorative: true`.
- Application config (site identity, navigation, SEO defaults) lives in `src/config`, separate from
  editorial content.

## Consequences

- Content is version-controlled, type-checked and statically rendered with no runtime fetching.
- Moving to MDX or a headless CMS later only changes the internals of `src/content`. The exported
  types and selectors stay the contract.
