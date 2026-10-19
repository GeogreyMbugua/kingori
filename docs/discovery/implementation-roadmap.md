# Implementation roadmap

**Date:** 2026-10-18  
**Status:** Waiting for review. Do not start these phases until the open decisions in Phase 0 are answered.  
**Rule:** Each phase stays inside the current architecture. Typed content modules, CSS tokens, no new dependency, and `assertLaunchReady` stays intact. A phase that needs a CMS, a form backend, an animation library, or a palette change needs an ADR first.

This roadmap does not replace working components. `YouTubeEmbed`, the page shell, the motion primitives, and the media page shapes stay.

## Phase 0 — Decisions, no code

Nothing in later phases is safe to build while these are open.

| Decision | Why it blocks | Evidence |
| --- | --- | --- |
| Public name | The `h1`, about page, and channel title disagree | `site.ts`, `about.ts`, YouTube channel title |
| Palette | Ivory / crimson would replace a contrast-tested cyan system | ADR 0018 versus this discovery brief |
| Spotify | ADR 0020 says it is unconfirmed. A public show exists and at least two descriptions match YouTube | ADR 0020; Spotify show URL in `content-inventory.md` |
| Booking inbox | The only address is `hello@example.com` | `src/content/contact.ts` |
| Photo clearance | Every local photograph lacks a credit or release | `asset-inventory.md` |
| Featured episodes | The five “final” items are not the latest uploads, and one title is wrong | `media.ts` versus oEmbed for `MkC40xneDgc` |
| Who tags themes | The six words are on the homepage and on no episode | `home.ts` |
| Fate of `/work` and `/shows` | Fictional pages are still routable | ADR 0020, ADR 0016 |

**Acceptance:** A written reply that answers each row, including “leave it as it is” where that is the choice. Silence is not approval to invent the answer.

## Phase 1 — Make the existing site truthful

Essential for any public preview that might be mistaken for the show. No new pages.

1. Correct `the-money-game` to the public title and credit Mbira Rimi, or replace that record with an episode whose title is agreed. Add a redirect if the slug changes.
2. Replace `With {guest}.` summaries with a short standfirst taken from the public description, edited for length, not invented.
3. Point theme links at nothing filtered until tags exist. Either remove the marquee from the homepage or label it as a promise. Shipping six links to the same list overclaims the archive.
4. Add a text link to the YouTube watch URL beside the embed. The embed stays on `youtube-nocookie.com`.
5. Put a real mailto in `contact.ts` only after Phase 0 supplies it. Until then the example address must stay, and the page must stay `placeholder`.
6. Keep About copy inside the facts ADR 0020 already allowed, once the name decision lands. Leave portrait slots pending if rights are not cleared.
7. Stop sitemap entries for placeholder media, placeholder projects, and `/shows`, or keep them and accept that a preview URL still opens fictional stand-up dates. Prefer the smaller sitemap. Do not weaken the launch guard to hide them.
8. Fix episode alts so visible thumbnail headlines are either in the alt or removed from the artwork.
9. Set `durationMinutes` from `lengthSeconds` where this inventory verified a difference (88:56 stored as 89, 100:40 stored as 100, 91:46 stored as 91). Rounding policy should be explicit: floor, or minutes and seconds. Today the type is whole minutes.

**Preserve:** `YouTubeEmbed`, `publishedMedia()`, editorial order, 16:9 covers, Server Components.

**Acceptance:**

- The five public episode titles and guests match oEmbed.
- No placeholder copy is linked from Home, Watch list, About, or Book.
- `npm run check` passes.
- `npm run test:e2e` passes, updated only where a label or sitemap assertion changed.
- `SITE_ALLOW_INDEXING=true` still fails the build while any placeholder remains.
- A manual pass of `/`, `/media`, one episode, `/about`, and `/contact` at desktop and at 320px, including keyboard to the player and to the mailto.

**Out of scope:** New palette, Spotify deep links, guest pages, search, newsletter.

## Phase 2 — One catalogue, tagged

Still static TypeScript. This is the archive the homepage describes.

1. Add an optional `themes` field to `MediaItem`, limited to the six existing names. No seventh category unless Phase 0 asks for one.
2. Add optional `youtubeUrl` (derived from `videoId`, not hand-typed) and optional `spotifyUrl` as `https://open.spotify.com/episode/...` only.
3. Enter the verified RSS sample plus the corrected existing five, one record per conversation. Spotify URLs stay empty until someone pastes a verified episode link.
4. Filter the watch list by theme with a link or query that works without a client framework. A server-rendered page per theme is enough at this size and needs no new dependency.
5. Homepage marquee links to those filters.
6. Choose the featured episode by an explicit flag, not by array position, so “most watched” cannot sneak back in as an unverified sentence.

**Depends on:** Phase 0 theme owner and Spotify decision. Phase 1 title corrections.

**Acceptance:** Each theme page lists only episodes tagged with that theme. An episode with two destinations renders one page and two links. Untagged episodes do not appear under a guessed theme. Launch guard still fails while page-level content is placeholder.

**Do not:** Import the whole channel by scraper. Add episodes by an editor with the RSS or a watch URL in front of them.

## Phase 3 — Guest names become a quiet index

Only for guests who already have two verified appearances, and only with a bio the client supplies.

1. A `Guest` record: slug, name as published, optional cleared portrait, optional short bio, episode slugs.
2. Credits on the episode link to the guest when a record exists and stay plain text when it does not.
3. The guest page is a name, the bio, and `IndexList` of conversations. No invented career summary.

**Depends on:** Phase 2 episode records. Client-written bios. Cleared portraits from `asset-inventory.md` or a new approved export.

**Acceptance:** No guest page exists without a bio marked `final`. Related conversations are only episodes already in the catalogue.

## Phase 4 — Editorial layer

The layouts exist (`article` body, `EditorialQuote`, gallery figures). The words do not.

1. One approved quotation with speaker, source episode, and date, placed as a single interruption. ADR 0014 allows one contrasting surface per page.
2. One real essay or a gallery only when the figures are cleared. Delete or keep unpublished the `long-read` and `feature-gallery` placeholders. They must not be the first articles a visitor can open.
3. Question of the week stays off the site until there is an editorial owner and a cadence. ADR 0020 already refuses to invent that tool.

**Acceptance:** Every published quote is traceable to a timestamped source the client accepts. Placeholder essays are not in the sitemap and not linked.

## Phase 5 — Commercial paths

Split only where the client has a real process.

| Path | Launch shape | Later shape | Blocker |
| --- | --- | --- | --- |
| Speaking and hosting | The current Book page and a real mailto | A form only if messages have a destination and a privacy note | Inbox from Phase 0 |
| Guest introduction | Same page, same note, unless they want a second address | Same | Who reads it |
| Recording calendar | Not built. The page must not imply open dates | A calendar only with a real tool and an ADR | ADR 0020 |
| Newsletter | Not built | A named provider, consent line, and an ADR if it adds a dependency or an endpoint | No list exists in the repo |
| Sponsorship | Not built | A page or a line on Book after rates and contact exist | No offer is documented |
| Live dates | `/shows` stays unlinked | Real `Show` records replace the four placeholders | No confirmed date in the repo |

**Acceptance for a launch Book page:** One real channel, the existing three request types in the note, no `example.com`, no fake ticket URL anywhere linked from public nav.

## Phase 6 — Palette, if and only if Phase 0 changes it

If the client keeps ADR 0018, this phase does not exist.

If they adopt black, warm ivory, charcoal, muted grey, and a restrained burnt orange or crimson:

1. New ADR superseding the palette section of ADR 0018. Keep the contrast contracts from ADR 0006.
2. Retune tokens only. Do not paint raw hex into components.
3. Re-map the three surfaces. The cyan spotlight cannot survive unchanged if cyan leaves the brand.
4. Update `themeColor` and `tests/unit/styles/contrast.test.ts`.
5. Check photography against the new ground. Stage-blue portraits were composed for a near-black and cyan site.

**Acceptance:** Contrast tests pass on default, inverse, and accent. One spotlight per page still holds. No new font and no new library.

## Suggested order

1. Phase 0 reply.
2. Phase 1, then a preview review on the existing GitHub Pages flow with indexing still off.
3. Phase 2 in small batches of episodes the client has tagged.
4. Phase 6 only if the palette decision says so. It can run beside Phase 2 and should not wait behind guest pages. It also should not start before Phase 0.
5. Phases 3, 4, and 5 after the watch list is trustworthy.

## Definition of a responsible launch

Indexing may be turned on only when `assertLaunchReady` passes. That means every remaining placeholder page and pending image is either replaced or removed from the content set the guard scans. A practical launch is:

- Home, Watch list, About, and Book are `final`.
- Every linked episode is `final`, with a verified YouTube id and a cleared cover.
- Placeholder work, shows, essays, and galleries are absent from the public sitemap and from internal links.
- The booking address is real.
- Theme links do not lie.
- `npm run check` and `npm run test:e2e` pass.
- `SITE_ALLOW_INDEXING` remains false on the GitHub Pages preview.

Guest profiles, essays, newsletter, sponsors, search, and a live calendar are enhancements. They are not required for that launch.

## Outstanding client decisions, collected

1. Canonical public name.
2. Keep the cyan palette or replace it.
3. Confirm Spotify as an official destination and, if yes, supply episode URLs for the conversations that should link.
4. Booking email, and whether guest introductions use the same inbox.
5. Which local images may be published, and a licensed set if Facebook is the source.
6. Which episode is featured.
7. Who assigns the six themes, and whether Faith stays inside Taboos.
8. Whether `/shows` and `/work` should remain on the preview.
9. Whether newsletter, sponsorship, or a question of the week are in scope this year.
10. Approval of any quotation before it is set in type.
