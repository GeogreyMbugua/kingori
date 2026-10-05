# ADR 0013 — Content model, placeholder dataset and launch guard

**Status:** Accepted · **Date:** 2026-10-05

## Context

Page composition (Phase 3) needs realistic content structures to be reviewable, but no real
projects, media, copy or photography exist yet. Inventing a portfolio is not acceptable, and empty
pages cannot be art-directed.

## Decision

**Final schemas now, provisional values.** `src/types/content.ts` defines the real models, so real
content replaces placeholders without page changes.

- **`Project`:** title, summary, category, year, role, cover and its crop (`coverRatio`),
  overview, plus optional `statement`, `challenge`, `approach`, `outcome`, `figures` and
  `relatedSlugs`. Optional fields shape the page: a `statement` makes a project typography-led;
  challenge, approach and outcome turn it into a case study.
- **`MediaItem`:** title, format, summary, date, duration, context, credits, cover, plus an
  optional `asset`, `body` (essays), `figures` (galleries) and `relatedProjectSlug`.
- Page content (`HomeContent`, `AboutContent`, `ContactContent`, `CollectionPageContent`) is typed
  per page.
- Array order in `projects` and `mediaItems` is editorial order. The first media item is the
  feature.

**Pending assets.** `ImageSlot = ImageAsset | PendingAsset`. A `PendingAsset` describes what the
real image should show. `MediaSlot` renders it as a labelled `MediaPlaceholder` at the
composition's ratio. When the real asset arrives, it is cropped to the same ratio around its focal
point. Ratios belong to compositions (and to `EditorialFigure.ratio` for editor-chosen crops), not
to assets.

**Placeholder dataset.** There are three projects (image-led, typography-led, case study) and
three media items (visual feature, short film, long essay), all `status: "placeholder"`. Their copy
describes what belongs in each field. It names no clients, people, places, results, awards or
claims, and titles are natural rather than prefixed. The contact address uses the reserved
`example.com` domain.

**Launch guard.** `findPlaceholderContent()` lists every page or entry that is placeholder or
contains a pending asset. `assertLaunchReady()` runs when `robots.txt` is generated, so
`SITE_ALLOW_INDEXING=true` with any placeholder remaining **fails the build**. The
`/design-system` preview lists the same entries under "Content status".

## Consequences

- Placeholder routes exist and appear in the sitemap. They stay unindexed because indexing cannot
  be enabled until they are replaced.
- Unit tests enforce slug uniqueness, resolvable relations and format requirements (essays need a
  body, films an asset, galleries figures).
- There is no audio player primitive yet. Pending audio renders as a placeholder, and a real audio
  asset will need a small `Audio` primitive and a `MediaAsset` extension.
