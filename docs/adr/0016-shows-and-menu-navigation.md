# ADR 0016 — Shows section and a menu overlay on small screens

**Status:** Accepted · **Date:** 2026-10-12 · **Supersedes in part:** ADR 0010

## Context

Kingori performs live, so the site needs a Shows section like the reference site's tour page.
That makes five primary destinations (Work, Shows, Media, About, Contact), which no longer fits
one row at 320px, the trigger ADR 0010 set for revisiting mobile navigation.

## Decision

**Navigation.** Below 48em, the header shows the wordmark and a **Menu** button. It opens
`MenuOverlay`, a modal `<dialog>` (focus containment, Escape, inert page and focus return come
from the platform) with the destinations set at display size. From 48em the inline `PrimaryNav`
row is unchanged. The current page is marked with `aria-current` plus an underline in both.

**Shows content model** (`src/types/content.ts`):

- `Show`: `date`, optional `time`, `city`, `country`, `venue`, `kind` (serif-italic descriptor),
  `availability` (`announced` | `on-sale` | `sold-out` | `cancelled`) and `ticketUrl`, which is
  required when on sale (test-enforced).
- `ShowsContent`: collection page copy plus a `feature` image slot, a `marquee` phrase and a
  `pastMessage` for when every date has passed.
- `getUpcomingShows()` filters and sorts by date. Static builds evaluate it **at build time**, so
  the site needs a rebuild for past dates to drop off. A scheduled redeploy, or a small client
  filter, can fix this when real dates exist.

**Composition** follows ADR 0014: giant title answered by the intro, a marquee, one full-bleed
image, then a typographic list where the day is the largest element in each row. Sold-out and
cancelled dates stay listed, struck through and labelled in text. The homepage gains a
"Where's Kingori?" marquee of upcoming dates linking to `/shows`.

## Consequences

- One more client component in the shell (`MenuOverlay`) alongside `NavLink`.
- E2E tests open the menu on the mobile project; the desktop project uses the inline row.
- The placeholder dataset has four dates covering each availability state, with stand-in names
  and `example.com` ticket links. The launch guard lists them until replaced.
