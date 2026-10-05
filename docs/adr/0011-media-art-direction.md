# ADR 0011 — Media primitives and image art direction

**Status:** Accepted · **Date:** 2026-10-04

## Context

Photography and isolated objects carry the visual direction. Images will be cropped to different
ratios per composition, so crops must keep the subject in frame without per-image CSS.

## Decision

- **`ImageFrame`** is the single image primitive for compositions. With a `ratio` it crops via
  `object-fit: cover` around the asset's `focalPoint`. Without one it keeps the intrinsic ratio.
  Caption or credit turns it into a `<figure>`.
- **Allowed ratios:** `1:1`, `4:5`, `3:4`, `3:2`, `16:9`, `21:9` (a typed union). Portraits favour
  4:5 and 3:4; editorial bands use 16:9 and 21:9.
- **Focal points** are percentages on the asset (`{ x, y }`) and default to the centre. Set one for
  any image that will be cropped.
- **Source sizes:** supply at least 2× the largest rendered width (a 1600px-wide slot needs a
  3200px source). Full-bleed images use `sizes="100vw"`. Contained images build `sizes` with
  `buildSizes()` against the container widths.
- **Full-bleed vs contained:** full-bleed (`Section width="full"`) is reserved for images that are
  the composition. Supporting images stay inside the container.
- **Alt text:** informative images need descriptive `alt`. Purely decorative images set
  `decorative: true` (empty alt). The type system allows no other option. Text must never be baked
  into images.
- **`MediaPlaceholder`** reserves the final ratio with a visible, labelled dashed frame while assets
  are pending. It is never shipped as final design.
- **`Video`**: `player` mode uses native controls, `preload="none"`, an optimised poster and
  captions for any meaningful audio. `ambient` mode is muted, looped, has a pause control, and never
  autoplays under reduced motion.

## Consequences

- Crops are art-directed through data (ratio + focal point), not per-image CSS.
- The `/design-system` preview shows a focal-point test card at every ratio, so crop behaviour can
  be checked visually.
