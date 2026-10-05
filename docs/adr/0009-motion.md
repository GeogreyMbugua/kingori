# ADR 0009 — Motion: CSS only, restrained, preference-aware

**Status:** Accepted · **Date:** 2026-10-04

## Context

The direction calls for restrained motion. Animation libraries add client JavaScript and turn
server components into client components.

## Decision

- **No animation library.** Motion is CSS transitions, keyframes and scroll-driven animations
  (`animation-timeline: view()`).
- **Three durations, three easings** (`--duration-fast` 150ms for hover/focus, `--duration-base`
  250ms for directional changes, `--duration-slow` 600ms for images and reveals;
  `--ease-standard`, `--ease-emphasized`, `--ease-exit`).
- **`Reveal`** is the only entrance effect: a short rise and fade linked to scroll position. It
  runs only when `prefers-reduced-motion: no-preference` and the browser supports
  `animation-timeline`. Otherwise content is simply visible. It needs no JavaScript.
- **Reduced motion** zeroes all duration tokens and forces animations and transitions off from the
  `motion` cascade layer with `!important`, which beats every component.
- **Ambient video** never autoplays under reduced motion and always has a pause control
  (WCAG 2.2.2).
- **No page transitions**, parallax or scroll-jacking.

## Consequences

- No runtime cost, and motion works in server components.
- Browsers without scroll-driven animations get static content, which is acceptable.
- Revisit only if a required interaction cannot be expressed in CSS. Any library must be justified
  in a new ADR.
