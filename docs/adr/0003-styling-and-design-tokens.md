# ADR 0003 — CSS Modules on top of layered global design tokens

**Status:** Accepted · **Date:** 2026-10-04

## Context

The visual direction depends on bespoke, art-directed compositions: oversized type, asymmetric
grids and layered imagery. Utility frameworks optimise for common UI patterns and add a dependency.
Runtime CSS-in-JS conflicts with Server Components.

## Decision

- Component styles use **CSS Modules**, colocated with the component.
- All design values live as custom properties in `src/styles/tokens.css`. Components reference
  semantic tokens only.
- Global CSS is organised in **cascade layers**: `reset, tokens, base, typography, motion`. CSS
  Modules are unlayered, so they always beat global defaults without specificity hacks.
- Reduced-motion overrides use `!important` inside the `motion` layer. Layered important
  declarations beat unlayered ones, so this wins over any component.
- **Mobile-first breakpoints in `em`**: tablet 48em, desktop 64em, wide 90em. They are defined in
  `src/lib/breakpoints.ts` and guarded by a unit test that scans every stylesheet.
- Typography and spacing scale fluidly with `clamp()`, always keeping a `rem` term so zoom works.

## Consequences

- Zero runtime styling cost and no styling dependency.
- Token values are final as of the Design System phase: colour (ADR 0006), typography (ADR 0007),
  layout and spacing (ADR 0008) and motion (ADR 0009).
- Typography roles are a global `data-type` attribute API in the `typography` layer, so headings,
  paragraphs and components share one definition per role.
- No Tailwind. Revisit only through a new ADR.
