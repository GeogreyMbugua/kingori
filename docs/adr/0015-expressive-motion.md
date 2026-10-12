# ADR 0015 — Expressive motion: split text, marquee, drift, menu wipe, page transitions

**Status:** Accepted · **Date:** 2026-10-12 · **Supersedes in part:** ADR 0009

## Context

The brand reference (trevornoah.com) gets its personality from motion as much as layout: headlines
that rise word by word out of a clip, endless type marquees, images that drift at a different
speed from the page, a full-screen menu that wipes in, and soft transitions between pages. ADR 0009
allowed one entrance effect and ruled out parallax and page transitions. The reference site
achieves its effects with Lenis, a scroll library and jQuery; we want the feel without the weight.

## Decision

Motion stays **CSS-first with no animation library**. ADR 0009's principles (tokens, reduced
motion zeroes everything, only opacity/transform/clip-path/filter animate) still hold. It adds
five primitives in `components/motion` and `components/navigation`:

| Primitive        | Effect                                              | Mechanism                                   | JS     |
| ---------------- | --------------------------------------------------- | ------------------------------------------- | ------ |
| `SplitReveal`    | Words rise out of a clip with a blur, staggered     | Keyframes (`load`) or `view()` timeline (`scroll`) | None   |
| `Marquee`        | Endless horizontal strip of display type            | Keyframes, duplicated run hidden from AT    | None   |
| `Drift`          | Image travels ±3–6rem as it crosses the viewport    | `animation-timeline: view()`                | None   |
| `MenuOverlay`    | Full-screen menu wipes down, links rise in sequence | `<dialog>` + `clip-path` + `@starting-style`| Open/close |
| `PageTransition` | Old page fades out, new page fades and rises in     | React `<ViewTransition>`, header anchored   | Router |

Rules:

- **New tokens:** `--duration-slower` (900ms), `--ease-wipe`, `--stagger`, `--drift-subtle`,
  `--drift-strong`, `--marquee-duration`, `--z-header`. All motion tokens are zeroed under reduced
  motion.
- **Split text keeps semantics.** `SplitReveal` sits inside the heading that owns the role, and
  words are joined by real spaces so the text content is unchanged.
- **Marquees pause on hover and on keyboard focus** (the strip is a tab stop). A visible
  Pause/Play button was tried and removed because it sat on top of the type. Under reduced
  motion the strip stops and wraps. Strict WCAG 2.2.2 conformance would need a visible control;
  revisit before launch if an accessibility audit requires one.
- **Drift is for images only**, never for text the reader is following. Containers that hold a
  drifting image clip their overflow.
- **Page transitions are a crossfade and short rise.** The header has `view-transition-name:
  site-header` and never animates. There are no directional slides and no shared-element morphs yet.
- **Still no scroll-jacking.** Native scrolling only; no smooth-scroll library.
- Browsers without scroll-driven animations or View Transitions get static content and instant
  navigation.

## Consequences

- One new client component (`MenuOverlay`); everything else stays server-rendered.
- `PageTransition` falls back to unwrapped content where `React.ViewTransition` is absent (plain
  React in unit tests).
- The axe suite runs with `reducedMotion: "reduce"`, so it scans final states.
- Not adopted, pending a need: the reference site's peel stickers, hero carousel and image sprite
  loops. Each should reuse these tokens and land here once it repeats.
