# ADR 0007 — Typography: typefaces, roles and fluid scale

**Status:** Accepted · **Date:** 2026-10-04

## Context

The editorial direction depends on oversized, characterful display type paired with comfortable
long-form reading. Type must be self-hosted (no third-party font requests), cover Gĩkũyũ
diacritics (ĩ, ũ) and stay inside a reasonable byte budget.

## Decision

**Typefaces** (both SIL Open Font License 1.1; licence files ship beside the fonts):

| Voice   | Family              | Axes kept                                   | File size |
| ------- | ------------------- | ------------------------------------------- | --------- |
| Display / interface | Bricolage Grotesque | opsz 12–96, wght 400–800, wdth 75–100 | 168 KB |
| Reading / quotes    | Newsreader roman    | opsz 6–72, wght 400–600              | 119 KB |
| Captions / accents  | Newsreader italic   | opsz 6–72, wght 400                  | 86 KB  |

- Files live in `src/assets/fonts/` and load through `next/font/local` (`src/styles/fonts.ts`),
  which self-hosts, hashes and emits metric-adjusted fallbacks (no layout shift).
- Subset with `pyftsubset` to Latin, Latin-1, Latin Extended-A, combining marks, general
  punctuation and a few symbols. Unused axis ranges were trimmed with `fontTools.varLib.instancer`,
  taking the total from about 530 KB to 372 KB.
- Only Bricolage is preloaded (it renders the LCP headline). Newsreader swaps in over a
  Times-metric fallback.
- Bricolage's width axis is exposed via `font-stretch`; display roles use `--stretch-condensed`.

**Roles.** Typography is a role system, not a size scale. Each role sets family, size, weight,
leading, tracking, width and colour together. Roles are applied with `data-type="…"` (global, in
the `typography` cascade layer, zero specificity via `:where()`), so a role can be put on any
element without changing the document outline:

`giant · display · heading-xl · h1 · h2 · h3 · eyebrow · body-lg · body · body-sm · caption · meta · quote`

Bare `h1`–`h3`, `p` and `figcaption` get their matching role by default. Components
(`GiantTitle`, `DisplayHeading`, `Eyebrow`, `Text`, `EditorialQuote`, `Prose`) are thin wrappers
that make the right element and role the easy choice. `DisplayHeading` requires an explicit
heading level, because size and outline are independent decisions.

An `<em>` inside any heading switches to Newsreader italic: the signature editorial accent.

**Fluid scale.** Every size is `clamp(min, rem + vw, max)` interpolated between 20rem and 90rem
viewports, always with a `rem` term so browser zoom and default font size are respected.

## Consequences

- Reading sizes grow at most 1.75× across the range. Display tiers (`giant` 64→208px,
  `display`, `heading-xl`) intentionally exceed 2× at large viewports. This is a documented
  exception to the WCAG 1.4.4 guidance on fluid type: at 200% zoom the `rem` term still doubles,
  and these roles are reserved for short display words, never running text.
- Adding a weight, style or script means re-subsetting from the upstream variable fonts and
  updating this record.
- No other families may be added without a new ADR.
