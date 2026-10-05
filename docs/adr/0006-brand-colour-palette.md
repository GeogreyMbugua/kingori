# ADR 0006 — Brand colour palette and semantic colour contracts

**Status:** Accepted · **Date:** 2026-10-04

## Context

Kingori's core palette is dark-first: deep navies, a structural blue, a supporting purple, three
warm accents (hot pink, coral red, orange) and two near-whites. Several accents look strong but
fail WCAG text contrast on the navy base. Hot pink is 3.74:1 on deep navy and blue is 1.75:1.

## Decision

Colour is defined in three tiers in `src/styles/tokens.css`:

1. **Brand primitives (`--brand-*`).** The nine core colours exactly as supplied, plus five derived
   tones mixed only from core colours:

   | Derived token           | Mix                        | Unlocks                               |
   | ----------------------- | -------------------------- | ------------------------------------- |
   | `--brand-hot-pink-light`| hot pink + 40% soft white  | Pink small text/links on dark (≥4.5)  |
   | `--brand-hot-pink-deep` | hot pink + 15% deep navy   | Action hover; pink text on light      |
   | `--brand-blue-light`    | blue + 30% lavender white  | 3:1 form-control borders on dark      |
   | `--brand-lavender-muted`| lavender white + 35% navy  | Muted text on all dark surfaces       |
   | `--brand-navy-muted`    | deep navy + 35% soft white | Muted text on light                   |

2. **Semantic tokens (`--color-*`).** Components use only these. Each has a contract:

   | Contract            | Tokens                                                            |
   | ------------------- | ----------------------------------------------------------------- |
   | ≥ 7:1 (AAA)         | `text`, `text-secondary`                                          |
   | ≥ 4.5:1 (AA text)   | `text-muted`, `accent-text`, `emphasis`, `inverse-text`, `selection-text` |
   | ≥ 4.5:1 on accent fills | `accent-contrast` on `accent`, `accent-hover`, `accent-active` |
   | ≥ 4.5:1 (status)    | `success`, `warning`, `error`, `info`                             |
   | ≥ 3:1 (non-text)    | `accent`, `warm`, `focus-ring`, `border-strong`                   |
   | Decorative          | `border`, `border-subtle`, `accent-subtle`                        |

   The accent family is `accent` (fill), `accent-hover`, `accent-active`, `accent-subtle` (tinted
   background, still AAA for `text`), `accent-contrast` (text on accent fills) and `accent-text`
   (pink as text). Further derived tones (`hot-pink-darker`, the two pink washes, `blue-pale`,
   `lavender-mist`, `orange-deep`, `coral-deep`, `green`, `green-deep`) exist only to satisfy
   these contracts on both surfaces. Status colours are expressed with text and icons too, never
   colour alone.

3. **Surfaces.** The dark default (`:root` / `data-surface="default"`) and a light inverse
   (`data-surface="inverse"`) remap the same semantic tokens. Components need no theme-specific
   CSS, and surfaces nest in either direction.

Role assignments on the default surface:

- **Background:** deep navy. **Surface:** midnight navy. **Raised/graphic:** muted purple.
  **Structural:** blue.
- **Text:** soft white. **Secondary text:** lavender white.
- **Accent:** hot pink, for display type, graphics and indicators. **Emphasis:** coral red.
  **Warm:** orange.
- **Focus ring:** orange, which is distinct from the pink accent and 4.9:1 or better on every dark
  surface.
- **Primary action:** hot pink with soft white text (4.73:1), hovering to the deep pink.

On the inverse surface, emphasis becomes blue and warm becomes coral, because orange is only 2.6:1
on soft white.

Composition is flat colour, with no gradients. Navy grounds carry the page, one dominant accent
leads each composition, and coral and orange are used sparingly for emphasis.

## Consequences

- `tests/unit/styles/contrast.test.ts` parses `tokens.css` and fails if any contract breaks.
  Palette changes are safe to make, because the test will flag any that break accessibility.
- Coral is not AA text on muted purple, and hot pink is never small text on dark. The token names
  steer usage (`accent` vs `accent-text`).
- `--color-surface-structural` (blue) is a dark surface. Inside an inverse section it must carry
  `data-surface="default"`.
- The browser `theme-color` (`siteConfig.themeColor`) is test-locked to `--color-background`.
- The light theme is a surface for editorial sections, not a user-selectable colour scheme. A full
  light mode would need a new decision.
