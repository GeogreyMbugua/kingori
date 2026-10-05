# ADR 0014 — Page composition and art direction

**Status:** Accepted · **Date:** 2026-10-05

## Context

Phase 3 turns the design system into pages. The risk is a templated site: a hero, three cards and
a CTA, repeated. The identity has to come from typography, imagery, grid, whitespace and colour.

## Decision

Recurring rules that make the pages read as one voice:

- **Section openings.** Index pages (Work, Media) and the About and Contact pages open with the
  section name as `giant` type, answered by a short `body-lg` line in the remaining columns. The
  homepage opens with the name itself.
- **Two voices.** Bricolage speaks for the site (titles, navigation, metadata). Newsreader italic
  is reserved for *someone else's words and descriptors*: statements from a work, Kingori's
  first-person statement, categories and formats ("Photography", "Essay"). It is not decoration.
- **One interruption per page at most.** The light `inverse` surface is used for a single moment:
  the homepage statement, a project statement or the About capabilities.
- **Images bleed from their own edge.** Large images run off the side they sit on (left or right)
  on desktop and edge to edge on mobile. Supporting images stay inside the grid.
- **Composition follows content shape.** A project with a statement leads with type and keeps its
  image small. Image-led projects alternate sides in the index. Figure sequences pair upright crops
  and run landscape crops wide (`FigureSequence`). Media formats that are watched show imagery, and
  formats that are read are set as type.
- **Lists are typographic.** Selected and related work use `IndexList`, a numbered list of titles
  where the whole row is the target. No cards, badges or pills.
- **One next step.** Pages close with `Invitation`, a display-size line that is itself the link to
  Contact. Contact makes the email address the largest interactive element.
- **Mobile is re-authored, not collapsed.** Opening order is title, then image, then words. Images
  go full-bleed, and labels move above titles.

**New components** (each repeats across features, so it lives in `components/editorial`):
`IndexList`, `FigureSequence` and `Invitation`, plus `MediaSlot` in `components/media`. No new
tokens were needed.

## Consequences

- Page CSS Modules contain only composition (grid placement, rows, bleeds). Type, colour and
  spacing remain tokens.
- New pages should reuse these rules before inventing new moves. A new move belongs here once it
  repeats.
