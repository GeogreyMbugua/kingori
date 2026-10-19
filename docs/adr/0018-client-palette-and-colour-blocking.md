# ADR 0018 — Client palette and colour blocking

**Status:** Accepted · **Date:** 2026-10-14 · **Supersedes:** the palette in ADR 0006 and the ink
tones in ADR 0017 (the contract structure of ADR 0006 still applies) · **Amends:** ADR 0014

## Context

Client feedback on the first composition: the site felt plain, with no clear visual hierarchy.
The client supplied a new colour list.

| Name             | HEX       |
| ---------------- | --------- |
| Vibrant Cyan     | `#00D8F4` |
| Medium Sky Blue  | `#5096D2` |
| Clean White      | `#FFFFFF` |
| Tweed Green      | `#47917C` |
| Rich Skin Tone   | `#6B4B3D` |
| Bright Turquoise | `#00B3B3` |
| Near-Black       | `#15191A` |

## Decision

**Palette.** The seven client colours replace the navy, pink, coral and orange core. Derived tones
are mixes of client colours only, and each exists to meet a contract. Amber and red are kept as
functional status hues, because the palette has no warning or error colour.

| Role (default surface)  | Colour                                   | Contrast on near-black  |
| ----------------------- | ---------------------------------------- | ----------------------- |
| Background              | Near-Black                               | —                       |
| Text, focus ring        | White                                    | 17.7:1                  |
| Accent fill and text    | Cyan                                     | 10.2:1                  |
| Accent hover / pressed  | Turquoise / Tweed Green (near-black text)| 6.8:1 / 4.7:1 for text on them |
| Emphasis, info, borders | Sky Blue                                 | 5.6:1                   |
| Structural band         | Rich Skin Tone (white text 7.8:1)        | —                       |

Because cyan reaches AAA on near-black, the accent can be used for small text as well as fills.
This is what lets eyebrows, numbers and arrows carry colour through every section. The focus ring
is white, which stays distinct from every cyan indicator.

**Three surfaces.** Next to the dark default and the white `inverse`, a new `accent` surface
(`data-surface="accent"`, `Section surface="accent"`) sets near-black type on a cyan ground, with
skin tone as its accent. It is the page's single spotlight moment and replaces `inverse` as the
homepage interruption. All three surfaces are covered by the contrast test.

**Colour blocking for hierarchy.** Sections step through distinct grounds, so the page reads as a
sequence of chapters instead of one dark field. On the homepage this is: the opening, the cyan
statement, the skin-tone shows band, the near-black work section, the teal-tinted media panel and
the near-black close.

Colour is composed as flat fields. No gradients.

## Consequences

- The old palette tokens are removed. Every `--color-*` contract still passes, and the accent
  surface adds its own set.
- `siteConfig.themeColor` follows the new background, `#15191A` (test-enforced).
- Pages other than the homepage pick up the new colours through tokens. They can adopt the accent
  surface and colour bands under the same rule: one spotlight per page.
