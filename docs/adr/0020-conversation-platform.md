# ADR 0020 — A home for the conversations

**Status:** Accepted · **Date:** 2026-10-18 · **Amends:** ADR 0014, ADR 0016

## Context

Dr. King'ori's site is the digital home of his conversations, not a tour page or a project
portfolio. Visitors should meet a portrait, a position, a featured conversation, and a way to
book him or introduce a guest.

The brief also names an archive by question (Money, Power, People, Society, Life, Taboos),
A question of the week, a newsletter, and a guest calendar need real tools. They are not
invented here. Spotify is not listed: it appeared in an early brief and is not confirmed.

## Decision

- Primary navigation is Watch list, About and Book. Work and Shows stay as routes for the
  earlier compositions; they are no longer the front door.
- The homepage opens on the portrait and "Questions that matter", states "Conversations that go
  beyond the obvious", then runs the archive words as a marquee, one episode now playing, an
  off-mic photograph, and a booking close.
- Book describes engagements and guest introductions. It does not pretend a calendar exists.
- About uses only the identity already supplied: Felix Omondi, The Wicked Edition at Nation Media
  Group, Grin Content, and the YouTube conversations.

## Consequences

- Placeholder projects and show dates no longer appear on the homepage.
- Archive theme links all open the watch list until episodes carry a theme.
- E2E navigation follows the three primary destinations. Each destination's `h1` matches its label.
