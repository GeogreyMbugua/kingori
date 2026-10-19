# Discovery audit

**Date:** 2026-10-18  
**Scope:** Working tree of this repository, plus public pages that could be read without signing in or bypassing access controls.  
**This pass did not change application code, and it did not re-run `npm run check`.** Build health below is taken from the project’s own gates and tests, not from a fresh production build.

The site is already a typed, statically rendered editorial shell. The working tree has started turning it into a conversation platform. It is not launch-ready, and several public facts disagree with what the pages currently say.

## What already works

- Public routes render from typed content modules. Unknown slugs 404. Detail routes set `dynamicParams = false`.
- Five YouTube conversations are embedded from `youtube-nocookie.com`. The video file is not stored in the repo (ADR 0019).
- The homepage leads with a portrait, the line “Questions that matter”, one featured episode, a theme marquee, an off-mic photograph, and a booking close (ADR 0020).
- Primary navigation is Watch list, About, and Book. Work and Shows remain as routes and are no longer linked from the header.
- Design tokens, contrast tests, reduced-motion overrides, skip link, landmarks, and axe coverage on the existing routes are in place.
- Indexing is off unless `SITE_ALLOW_INDEXING=true`, and that flag fails the build while any placeholder or pending asset remains (`assertLaunchReady` in `src/app/robots.ts`).

## Routes and hierarchy

| Path | Role in the working tree | Indexed in `sitemap.ts` | Notes |
| --- | --- | --- | --- |
| `/` | Front door | Yes | `h1` is “Kingori”, not a nav label |
| `/media` | Watch list | Yes | Lists `publishedMedia()` only |
| `/media/[slug]` | Episode, essay, or gallery | Yes, including placeholders | Known slugs only |
| `/about` | Biography shell | Yes | Portrait slots still pending |
| `/contact` | Book | Yes | Mailto is `hello@example.com` |
| `/work`, `/work/[slug]` | Earlier portfolio compositions | Yes | Not in primary nav. Three placeholder projects |
| `/shows` | Earlier live-dates composition | **No** | Not in primary nav. Four placeholder dates |
| `/design-system` | Internal preview | No | Production requires `ENABLE_DESIGN_SYSTEM_PREVIEW=true` |
| Unknown URLs | `not-found` | No | Site shell is kept |

`publishedMedia()` hides placeholder media once any item is `status: "final"`. The placeholder essay and gallery are still prerendered and listed in the sitemap, so a direct URL still opens unfinished pages. Evidence: `src/content/media.ts`, `src/app/sitemap.ts`, `src/app/(site)/media/[slug]/page.tsx`.

The episode page’s back link says “Media”. The navigation label is “Watch list”. Evidence: `src/features/media/MediaDetail.tsx`.

## Component structure

Layering is enforced by ESLint and described in `README.md` and ADR 0001.

```text
app → features → components → lib → config → types
features → content → types
```

Features must not import each other. Components must not import content. There is no `app/api`, CMS, database, auth, analytics, or animation library.

Reusable pieces that should be kept:

- Layout: `PageShell`, `Header`, `Footer`, `SkipLink`, `Grid`
- Type: `GiantTitle`, `DisplayHeading`, `Eyebrow`, `Text`, `EditorialQuote`, `Prose`
- Editorial patterns: `IndexList`, `FigureSequence`, `Invitation`
- Media: `MediaSlot`, `ImageFrame`, `ResponsiveImage`, `YouTubeEmbed`, `Video`
- Motion: `SplitReveal`, `Marquee`, `Drift`, `Reveal`, `MenuOverlay`, `PageTransition`

`EditorialQuote` exists and is unused on the public pages. There is no audio player. ADR 0013 already says a real audio asset would need a new primitive and a `MediaAsset` extension.

## Content model

Contracts live in `src/types/content.ts` and `src/types/media.ts`.

A `MediaItem` can be video, audio, article, or gallery. Video in the catalogue is a `YouTubeAsset` (`videoId` plus title). Covers are local images. Credits are a flat `{ role, name }` list. There is no theme, no Spotify URL, no guest record, and no related-episode field. `relatedProjectSlug` still points episode pages at the placeholder portfolio.

Page objects for home, about, contact, work, media, and shows are all `status: "placeholder"`. Five episode records are `status: "final"`. A final episode does not make the site launch-ready, because the parent pages and the remaining placeholder entries still fail `findPlaceholderContent()`.

### Episodes currently shipped in content

Order in `mediaItems` is editorial. The first final YouTube item is the homepage feature.

| Slug | Title stored on the site | Guest stored on the site | YouTube id | oEmbed title on 2026-10-18 |
| --- | --- | --- | --- | --- |
| `making-money-easier` | Making money is easier than you think | Abdinoor Alimahdi | `-jinyunCiqc` | Matches, with the guest after `\|\|` |
| `what-people-with-money-never-tell-you` | What people with money never tell you | Gor Semelang'o | `g7doqbbe3-g` | Matches |
| `money-game-without-a-payslip` | How to win the Money game without a Payslip | Dama wa Mobile Spares | `EcLbQyWltxE` | Matches |
| `rich-or-wealthy` | If this doesn't make you rich, It'll make you wealthy | Andrew Muthee Gitau | `Ff_97c6CEBM` | Matches |
| `the-money-game` | The Money Game | **No guest credit** | `MkC40xneDgc` | **Here's Where Couples Lose The Money Game \|\| Mbira Rimi** |

The fifth title and the missing guest are a content error, not a player error. The summary (“where couples lose the money game”) is closer to the YouTube title than the page title is. Watch-page `lengthSeconds` for that id was 83:06, which matches the stored 83 minutes. The guest name **Mbira Rimi** comes from the public oEmbed title.

Stored dates and durations for the other four were only partly re-checked. `-jinyunCiqc` publish date `2025-03-05` matches the file, and its length is 91:46. `g7doqbbe3-g` is 88:56 against a stored 89 minutes. `Ff_97c6CEBM` is 100:40 against a stored 100 minutes. `EcLbQyWltxE` duration was not re-read from the watch page in this pass. See `content-inventory.md`.

Summaries for the first four episodes are only `With ${guest}.` The context line says they are “Most watched on the Dr. King'ori YouTube channel.” That ranking was not re-verified here. Do not treat it as a current fact.

Theme links on the homepage (Money, Power, People, Society, Life, Taboos) all go to `/media`. Nothing on an episode filters them. Evidence: `archiveThemes` in `src/content/home.ts` and ADR 0020.

### Placeholder and false content still reachable

- About portrait and detail are pending slots. Chapters name Felix Omondi, The Wicked Edition, Nation Media Group, and Grin Content (ADR 0020). The YouTube channel title is **Dr. King'ori (Felixe JaSiaya)**. Those names are not reconciled in the repo.
- Contact invitation is “Name a date.” The only address is `hello@example.com`. The note describes talks, hosting, and guest introductions. There is no form, calendar, or second channel.
- `/work` is a three-shape placeholder portfolio (image-led, typography-led, case study). Copy is instructional. One cover uses a real photograph of a room full of other people (`public/images/people/02.webp`).
- `/shows` uses fictional cities, venues, and `example.com` ticket links, including a “Stand-up” kind. ADR 0016 assumed a tour page. ADR 0020 says this is not a tour site. The route still renders the fictional dates.
- `/media/feature-gallery` and `/media/long-read` are unfinished and still have public URLs.

## Styles, type, colour, motion

**Type.** Self-hosted Bricolage Grotesque and Newsreader, Latin and Latin Extended-A, so Gĩkũyũ ĩ/ũ can render (ADR 0007). Roles are `data-type` attributes. Newsreader italic is reserved for someone else’s words and for descriptors.

**Colour in code.** ADR 0018 replaced the earlier navy / pink / coral / orange palette with the client list that is actually implemented: near-black `#15191A`, white, cyan `#00D8F4`, sky blue `#5096D2`, turquoise `#00B3B3`, tweed green `#47917C`, skin tone `#6B4B3D`. Three surfaces: dark default, light inverse, and one cyan accent spotlight. Contrast ratios are test-enforced. `themeColor` is `#15191a`. Flat fields, no gradients.

**Colour in this discovery brief.** Black, warm ivory, charcoal, muted grey, and a restrained burnt orange or crimson. That palette is **not** in `tokens.css` and it is **not** ADR 0018. Treating it as approved would contradict an accepted ADR. It is an open client decision. See the palette section below.

**Motion.** CSS only (ADR 0009, ADR 0015): split-text reveal, marquee, image drift, menu wipe, view transitions. Reduced motion zeros duration tokens and stops the marquee. Axe runs with `reducedMotion: "reduce"`. ADR 0015 records that the marquee has no visible pause control and may need one before a strict WCAG 2.2.2 sign-off. Drift is images only. There is no scroll-jacking library.

**Responsive behaviour specified in ADRs and tests.** Below 48em the header is a wordmark plus a Menu button (`<dialog>`, Escape, focus return). From 48em, links sit in one row. Opening order on composed pages is title, then image, then words. E2E checks no horizontal overflow at 320px and 44px touch targets. This pass did not re-open a browser.

## External links and embeds

- The player is an iframe to `https://www.youtube-nocookie.com/embed/{videoId}` (`YouTubeEmbed.tsx`). Invalid ids throw.
- No component links out to the YouTube watch URL, the channel, Spotify, Facebook, or X, even though episode descriptions on YouTube repeatedly cite `https://twitter.com/Dr_Kingori` and `https://www.facebook.com/KingoriDr`.
- Spotify is absent from the content model. ADR 0020 says Spotify appeared in an early brief and was not confirmed. A public show does exist. See below.

## Tests and technical constraints

| Gate | What it covers |
| --- | --- |
| `npm run lint` | ESLint, including layer boundaries |
| `npm run typecheck` | Route types, then `tsc --noEmit` |
| `npm test` | Vitest unit and integration, including content integrity and contrast |
| `npm run test:e2e` | Playwright, mobile and desktop, axe on the routes listed in `tests/e2e/accessibility.spec.ts` |
| `npm run check` | lint, typecheck, test, build |

Stack from `README.md`: Next.js 16.3.8, React 19, TypeScript strict, CSS Modules, Node 24, npm. No CMS. Static export is optional (`STATIC_EXPORT`) for GitHub Pages, with a custom image loader and indexing left off. Preview URL recorded in the README: `https://geogreymbugua.github.io/kingori/`.

E2E already visits `/`, `/media` and the five final episode slugs, the two placeholder media slugs, `/work` and its three slugs, `/shows`, `/about`, `/contact`, a 404, and `/design-system`.

Constraints that future work has to keep:

- New dependencies, a CMS, or an animation library need a new ADR.
- Do not weaken `ALLOWED_IMPORTS` or `assertLaunchReady`.
- Do not invent biography, clients, awards, or assets. Placeholders stay marked.
- Server Components by default.
- No raw design values in components.
- `src/content/demo` is for `/design-system` only.

## Public brand findings

Verified from public sources on 2026-10-18.

| Source | What was verified | What was not |
| --- | --- | --- |
| YouTube channel [Dr. King'ori (Felixe JaSiaya)](https://www.youtube.com/@LebrandKingori), channel id `UCJvhxJf8-Bne99uzuQpFIpg` | Channel RSS title, handle, and the latest 15 uploads. Channel `published` in the feed: 2016-06-03. Descriptions use `#GrinContent` and link to X and Facebook | Subscriber count, full catalogue size, “most watched” ranking |
| Spotify show [Dr. Kingori](https://open.spotify.com/show/5LmRSFz7JvyE0gGiOT6Xpd) | Show name, the sentence “Hi, I'm Dr. King'ori. I trust that your listenership to these conversations will be time well wasted.”, category Business, and a handful of episode titles and descriptions rendered on the show page | Per-episode Spotify URLs. The HTML shell did not expose them |
| Facebook [KingoriDr photos](https://web.facebook.com/KingoriDr/photos) | The URL was requested | **403.** No photos were inventoried |
| [trevornoah.com](https://www.trevornoah.com/) | Text of home, `/about`, `/shows`, `/watch-listen`, and the privacy policy. See the reference section | Pixel-level mobile layout. The site is client-rendered; this pass used fetched text, not a visual audit |

A third-party index (kenyacreators.com) listed a large back catalogue and round durations. Those figures are **not** used as verified counts or dates. Titles from that index are useful only as a lead list for a later authorised sync.

### Identity strings that do not yet match

- Site name in config: “Kingori”. Homepage `h1`: “Kingori”.
- About and ADR 0020: Dr. King'ori (Felix Omondi); The Wicked Edition; Nation Media Group; Grin Content.
- YouTube channel title: Dr. King'ori (Felixe JaSiaya).
- Spotify show name: Dr. Kingori, without the apostrophe used on the site.

None of these should be “corrected” by guessing which is the public name, the legal name, or the show name.

### Reference site, translated into principles

[trevornoah.com](https://www.trevornoah.com/) is a useful information architecture, not a layout to copy. Verified patterns:

- The name is the hero. A short line positions the person. A chronological “on the screen” feed mixes specials, hosting, books, and dates.
- Watch & Listen is its own archive: a podcast introduction, a count of episodes, specials by year, and individual conversations. Quotes carry a speaker, a source, and a date.
- About is a biography plus named institutions (production company, foundation) and **named booking contacts** with email and phone, split by live performance, TV/film, and the foundation.
- Shows is a tour list: date, city, venue, kind. That pattern matches this repo’s `Show` model. It does not match Dr. King'ori’s current product, which is a conversation archive. ADR 0020 already says so.
- The privacy policy describes a newsletter and contact forms. A signup form was not visible in the fetched homepage text, so a newsletter should not be assumed to be part of the hero.

ADR 0015 already records the reference site’s motion (word-by-word headlines, marquees, drifting images, full-screen menu, soft page changes) and deliberately reimplemented the feel in CSS. Peel stickers, a hero carousel, and sprite loops were considered and not adopted. That restraint should stay.

Principles worth keeping for Dr. King'ori, without copying assets or the brand:

1. One portrait and one sentence before any catalogue.
2. A single featured conversation, then a typographic list, not a grid of cards.
3. Archive and booking are different jobs. Do not make the archive look like a tour.
4. Quotes need a speaker and a source. The `EditorialQuote` primitive is already the right shape.
5. Booking should name the real path (talk, hosting, guest introduction) and a real address. Trevor’s site publishes agent contacts; this site must not invent an agent.
6. Motion stays the existing CSS system.

### Palette evaluation

| | ADR 0018, implemented | Discovery brief in this request |
| --- | --- | --- |
| Ground | Near-black `#15191A` | Black |
| Light | White, plus pale sky mixes on the inverse surface | Warm ivory |
| Secondary text | Grey mixes of white and near-black | Charcoal, muted grey |
| Accent | Cyan, turquoise, sky blue, tweed, skin tone | Restrained burnt orange or crimson |
| Evidence | `src/styles/tokens.css`, ADR 0018 | This discovery request. No ADR |

The implemented cyan palette is a complete, contrast-tested system, including an accent surface used for the homepage statement. Replacing it with ivory and a warm accent is a new art direction, not a token tweak. It needs a client decision and a new ADR before any component changes. Until then, ADR 0018 stands.

The photography already in the repo is mostly stage blue, navy suiting, and yellow thumbnail type. A cyan UI echoes the stage photographs. An ivory and crimson UI would sit further from those thumbnails and closer to a print editorial. Both can be argued. Neither is settled by the code.

## Preserve, improve, remove, investigate

**Preserve**

- Layer boundaries, tokens, launch guard, YouTube embed (nocookie), content-as-typed-modules, motion primitives, and the three-item primary nav.
- The homepage sequence in ADR 0020, once the portrait rights and the featured episode are confirmed.
- Work and Shows **code** until a later ADR retires them. They are the only exercises of those page shapes.

**Improve**

- Episode titles, guests, summaries, and alts so they match the public video.
- Theme as data, not as six links to the same URL.
- Hide or noindex placeholder slugs before any public preview is treated as the show.
- Outbound “Watch on YouTube” and, if the client confirms Spotify, “Listen”.
- The back link label “Media”.
- Marquee pause control if an accessibility review requires WCAG 2.2.2.

**Do not remove yet**

- `/work` and `/shows`. ADR 0020 keeps them as routes. Removing them is an ADR change. They should stay out of the header, and their fictional copy should not be presented as real.

**Investigate**

- Which name is canonical.
- Whether the five “final” episodes are the ones the client wants featured, or simply the ones already typed in.
- Rights for every local photograph and for YouTube thumbnail artwork.
- Whether Facebook can supply a licensed gallery. The public photos URL was blocked.
- Spotify episode URLs for conversations that already exist on YouTube.

## Technical risks

1. **Indexing guard is necessary and still the only launch brake.** Placeholder pages are reachable and are in the sitemap. `robots.txt` disallows crawling only while indexing is off.
2. **Final episodes sit inside a placeholder site.** Shipping the five videos does not clear `assertLaunchReady`.
3. **Metadata drift.** `the-money-game` already disagrees with YouTube. Hand-maintained dates will drift further across a catalogue the public channel is still adding to (latest RSS entry: 2026-10-11).
4. **No theme field.** The homepage promises an archive by question that the data cannot deliver.
5. **Thumbnail type is baked in.** Covers are 1280×720 composites with a second headline. Cropping them, or using them as quiet editorial images, will cut off type or contradict the title. Alts currently say “Thumbnail for {title}, with {guest}” and do not describe the words in the image.
6. **Guest likeness.** Several frames include other people. No release or credit is in the repo.
7. **Shows fiction.** `/shows` still announces stand-up dates at “Venue name”. It is omitted from the sitemap and the header, but the route works.
8. **Static dates.** `getUpcomingShows()` is evaluated at build time (ADR 0016). Irrelevant until real dates exist.
9. **Uncommitted direction.** ADRs 0018, 0019, and 0020 and the conversation content are in the working tree. This audit describes that tree, not a previously released commit.
10. **YouTube dependency.** Embeds fail closed only for a malformed id. A removed or private video would still leave a player frame. There is no fallback copy.

## Open questions

These block implementation. They are not answered by the code.

1. Is the public name Kingori, Dr. King'ori, Felix Omondi, or Felixe JaSiaya, and which belongs in the `h1`?
2. Does ADR 0018’s cyan palette remain, or does the ivory / charcoal / burnt-orange brief replace it?
3. Is Spotify a destination for the same episode, which would amend ADR 0020?
4. What is the real booking address, and who receives guest introductions versus speaking requests?
5. Which photographs may be published, and who owns them?
6. Which conversations are featured, and who assigns Money, Power, People, Society, Life, and Taboos?
7. Should `/work` and `/shows` stay available on the preview, or be removed from generation until they have real content?
8. Is a newsletter, a question of the week, or a sponsor surface actually wanted at launch, or only later?
