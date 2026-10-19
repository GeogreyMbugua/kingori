# Proposed sitemap

**Date:** 2026-10-18  
**Status:** Recommendation, not an implementation.  
**Basis:** ADR 0014 and ADR 0020, the routes that already exist, the verified catalogue in `content-inventory.md`, and the information architecture of [trevornoah.com](https://www.trevornoah.com/) as principles rather than pages to clone.

The public site should feel like a magazine that also plays the conversation. It should not feel like a tour page, a project portfolio, or a second YouTube.

## Navigation

Three primary items remain the right header. ADR 0020 already chose them. They match what a visitor can actually do today.

| Label | Path | Job |
| --- | --- | --- |
| Watch list | `/media` | Find and play a conversation |
| About | `/about` | Who he is, in the words already approved |
| Book | `/contact` | Request a talk, a hosting job, or a guest introduction |

The wordmark goes to `/`. Do not add Work, Shows, Journal, Guests, or Sponsors to the header until those pages have real content. Trevor’s site can support Shows because the tour is real. This one cannot.

Hypothesis: “Watch list” is clear and already tested. “Conversations” is closer to the spoken brand. Keep the current label unless the client prefers the other. Do not rename it in code during discovery.

## Pages

### Launch set

These pages already exist. The work is content and a few fields, not a new site.

| Page | Path | What the visitor should find | Already built |
| --- | --- | --- | --- |
| Home | `/` | Portrait, one sentence, one conversation playing next, the six themes, one off-mic still, one booking line | Yes, in `HomePage.tsx` |
| Watch list | `/media` | A featured episode, then the rest as titles. Later, a filter for the six themes | Index exists. Filter does not, because episodes have no theme |
| Episode | `/media/[slug]` | Title as published, guest, date, length, a short factual standfirst, the YouTube player, a link to YouTube, and a Spotify link when that URL is verified | Player and credits exist. Outbound links and Spotify do not |
| About | `/about` | The approved identity only: Dr. King'ori, the show, The Wicked Edition, Grin Content, YouTube. Portrait when a frame is cleared | Chapters exist. Portraits are pending. Names still conflict |
| Book | `/contact` | One address that receives mail. The note already distinguishes a talk, a hosting job, and a guest introduction | Layout exists. Address is `hello@example.com` |

### Keep generated, keep unlinked

| Page | Path | Why it stays | Why it stays out of the header |
| --- | --- | --- | --- |
| Work index and project | `/work`, `/work/[slug]` | ADR 0014 page shapes. Useful while composing | Placeholder portfolio. ADR 0020 removed it from the front door |
| Shows | `/shows` | `Show` model and row layout, if real dates appear later | Every date is fictional, including “Stand-up” |

Recommendation: stop emitting placeholder slugs in `sitemap.ts` while indexing is impossible anyway, and do not link `/shows` from anywhere a visitor can mistake it for a calendar. Retiring the routes entirely needs an ADR. This sitemap does not retire them.

### Later, only after the launch set is true

| Page | Path | Why it is later | Depends on |
| --- | --- | --- | --- |
| Guest | `/guests/[slug]` | Repeat guests are real (Gitau, Waruinge, Mwaka, and others). A profile with no approved bio would be invented | A guest type, a cleared portrait, and at least two linked episodes |
| Theme | `/media?theme=money` or `/media/money` | The homepage already promises this | A required theme field, assigned by an editor |
| Essay | `/media/[slug]` with `format: "article"` | The long-read layout exists | A real piece. The placeholder essay must not ship |
| Quote index | A section on Home or About, not its own URL at first | `EditorialQuote` exists. Trevor’s site uses sourced quotes as rhythm, not as a database | An approved quotation, speaker, source, and date |
| Newsletter | A field on Home or Book, not a new marketing site | No provider, no list, no consent copy | Client decision and a processor named in an ADR |
| Sponsor | No URL until a real offer exists | Nothing in the brief is specific enough to design a rate card | Commercial terms from the client |
| Search | On the watch list, when the typed catalogue is long | Fifteen verified videos do not need search. A full channel might | The catalogue in the repo, then a static filter before any search service |

Question of the week, a guest calendar, and advertising slots are named in ADR 0020 as things that need real tools. They are not pages in this sitemap.

## User journeys

### 1. Watch the conversation I came for

Home → featured title, or Watch list → episode. The player is on the episode page, which is already the decision in ADR 0019. The homepage shows the cover and the title, not a second autoplaying iframe.

### 2. Browse by the question

Home theme marquee → watch list filtered to that theme → episode. Today every theme link goes to the unfiltered list. That journey is the first real product gap. Do not fake it with six copies of the same page.

### 3. Stay with a guest

Episode credit → guest page → other conversations. Blocked until bios are written by someone who can stand behind them. Until then, the credit stays a name, not a link.

### 4. Book him, or bring him a guest

Home “Book”, or the closing invitation “Name a date.” → `/contact` → mailto. The note already asks for who, what the conversation should ask, and when they can record. Split the address only if the client actually has two inboxes. Do not add a form that stores personal data until there is a place for it to go.

### 5. Listen instead of watch

Episode page → Spotify. Same editorial record, second destination. Only after the episode URL is verified. The show URL alone is not enough to deep-link.

### 6. Read a line again

A sourced quote on the homepage or the episode page, linking to the episode it came from. No quote is approved in the repo today. The component should stay unused until one is.

## What not to add

- A tour grid, ticket buttons, or “on sale” states on the homepage. The `Show` model can wait.
- A case-study portfolio. The conversations are the work.
- A card grid of episodes. ADR 0014 already chose typographic lists, with imagery reserved for things you watch.
- A copied Trevor Noah section such as a foundation, a production company grid, or agent columns. Those exist because his business has them. This client’s verified business, in the repo, is the show, YouTube, writing, and bookings (`about.ts` capabilities).
- Per-theme marketing landers with invented introductions.

## Header, footer, and utility

Verified today: header nav, skip link, footer landmark, 404 with the shell, canonical URLs, `robots.txt` disallow-all while indexing is off.

Recommended footer, still without new pages:

- The same three links.
- The YouTube channel URL.
- Spotify show URL, once the client accepts it as official.
- Facebook and X only as profile links, since the episode descriptions already publish them.
- No newsletter field until the provider exists.
- No phone number until one is supplied.

## URL stability

Keep `/media` and `/media/[slug]`. The slugs already in git should stay, except `the-money-game`, which should be renamed only with a redirect if the public title becomes the slug. Renaming is an implementation decision, not part of this document’s approval.

`/contact` can keep its path while the visible title stays “Book”. That split is already how the page works.
