# ADR 0017 — Ink grounds: darker, less saturated dark surfaces

**Status:** Accepted · **Date:** 2026-10-12 · **Amends:** ADR 0006 (surface role assignments)

## Context

The dark surfaces used the core navies directly: deep navy `#000030`, midnight navy `#101040`
and muted purple `#302050`. Each is almost entirely blue channel, so on vivid phone and OLED
screens the site read as saturated blue rather than the intended dark ground.

## Decision

Add three derived **ink** tones, each a core colour mixed with black plus 2.5% soft white to
neutralise the hue, and remap the semantic surfaces to them:

| Semantic token           | Before                  | After                              |
| ------------------------ | ----------------------- | ---------------------------------- |
| `--color-background`     | deep navy `#000030`     | `--brand-ink` `#060614`            |
| `--color-surface`        | midnight navy `#101040` | `--brand-ink-surface` `#0C0C20`    |
| `--color-surface-raised` | muted purple `#302050`  | `--brand-ink-raised` `#1E162E`     |

The core palette is unchanged. Blue stays the structural surface and border colour, muted purple
remains `--color-border-subtle`, and the inverse surface still uses deep navy as its text colour.
`siteConfig.themeColor` follows the new background (test-enforced).

## Consequences

- Darker grounds raise every text contrast ratio; all ADR 0006 contracts still pass.
- The navy identity now comes through as an undertone and through blue structure and borders,
  rather than as the page fill.
- To tune the depth, change only the three `--brand-ink*` values in `tokens.css`. The contrast
  test flags any value that breaks a contract.
