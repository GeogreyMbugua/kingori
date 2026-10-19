# ADR 0019 — YouTube conversations, not hosted video

**Status:** Accepted · **Date:** 2026-10-18 · **Amends:** ADR 0011, ADR 0013

## Context

Dr. King'ori (Felix Omondi) publishes long-form conversations on YouTube under Grin Content:
financial literacy, business strategy and socioeconomic analysis. The site is not a broadcaster.
It does not store those episodes.

The media model treated the `video` format as a short film with a self-hosted file, a poster and
captions. That label and that asset shape do not match the work.

## Decision

- Catalogue video is a `YouTubeAsset`: a video id and a title. `YouTubeEmbed` plays it from
  `youtube-nocookie.com`. The file never enters `public/video/`.
- The reader-facing label for `video` is **Watch**, in the same role as **Listen** for audio.
  The word "film" is not used for these episodes.
- The cover image stays the listing picture on the Media index and the homepage title list stays
  type only. The player is the body of the episode page.
- Self-hosted `VideoAsset` remains available for a file the project itself produces. It is not the
  path for the YouTube catalogue.

## Consequences

- An episode page such as `/media/the-money-game` embeds the YouTube player. `/media/short-film`
  is retired with the placeholder slug.
- Launch readiness still treats placeholder copy as unfinished. A connected YouTube id does not
  by itself mark an episode final.
