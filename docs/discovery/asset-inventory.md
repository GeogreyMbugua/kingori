# Asset inventory

**Date:** 2026-10-18  
**Method:** Local files under `public/images/` were measured with their intrinsic pixel size and colour mode. Subjects were reviewed from the files themselves. The Facebook gallery at https://web.facebook.com/KingoriDr/photos returned **403 Forbidden**. No Facebook images were downloaded or described.

No file in the repo carries a photographer credit, a licence, or a release. Provenance is **unverified** for every photograph. Publishing a frame that shows another person needs an explicit yes.

YouTube thumbnail URLs from the RSS (`i.ytimg.com`, 480×360 `hqdefault.jpg`) are remote and were not copied into the repo during this pass.

## Facebook

| | |
| --- | --- |
| Requested URL | https://web.facebook.com/KingoriDr/photos |
| Result | 403, no gallery inventory |
| Use | Blocked until someone with rights exports selected frames, or the page is available without a login wall |
| Do not | Scrape, use a logged-in session, or generate stand-in portraits |

The YouTube descriptions link to https://www.facebook.com/KingoriDr and https://twitter.com/Dr_Kingori. Those profiles were not audited as image sources.

## Local files

Paths are relative to `public/`. “Used” means a current import in `src/`.

### People

| File | Pixels | Mode | Bytes | Used | Subject, from the file | Likely placement | Crop / approval |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `images/people/im01.png` | 976×1220 | RGBA | 842 KB | Homepage hero (`home.ts`), `transparent: true` | Full-length stage portrait, blue windowpane suit, microphone, papers, blue curtain. Audience heads intrude at the bottom edge | Hero. The existing 4:5 crop matches the portrait orientation | Needs a tighter crop or a retouch if the audience heads should not show. Another person’s partial head is in frame. Alpha is present; confirm the cut-out edges on the dark hero. Rights unverified |
| `images/people/im01.webp` | 976×1220 | RGB | 169 KB | Not referenced | Same portrait as the PNG. RGB, so the background is flattened rather than transparent | Do not swap in until the alpha version is the one art direction wants | Duplicate. Prefer one master |
| `images/people/port-6.png` | 1080×1080 | RGBA | 1.1 MB | Homepage “Off mic” (`home.ts`), `transparent: true` | Two people at a white desk, looking at a phone. The man matches the host photographs. The woman is unidentified in the repo; the alt text says “a woman” | Off-mic, biography, or a conversation still | Square. Guest likeness and the black matte around the cut-out need approval. Do not invent her name |
| `images/people/port-4.jpg` | 1440×1440 | RGB | 75 KB | Not referenced | Seated studio portrait on black: grey suit, red polka-dot tie, microphone | Biography, booking, or a quiet hero alternate | Square, modest file size, heavy black field. Good candidate if a less busy portrait is wanted. Rights unverified |
| `images/people/port-2-cutout.webp` | 1349×1799 | RGBA | 262 KB | Not referenced | Seated full-body cut-out on a stool, light blue jacket, black background in the flattened preview | Hero or a graphic portrait on a flat colour | Tall. Check alpha edges. Stool and shoes need space; a 4:5 crop will cut feet or head. Rights unverified |
| `images/people/02.webp` | 1440×960 | RGB | 128 KB | Placeholder project cover in `work.ts` (`image-study`) | Host in a maroon dinner jacket and bow tie, greeting seated guests at a crowded event | Events, only after consent. Wrong file to leave on a public project page | Landscape 3:2. Many identifiable people. Do not feature until releases exist. It is already bound to a placeholder route |
| `images/people/media.webp` | 1080×670 | RGB | 118 KB | Placeholder gallery cover (`feature-gallery`) | Studio conversation: host and an unidentified man in a navy suit at a round table. Shelves, bottles, a plant, a visible QR code | Studio, episode still, or an about chapter | Wide and short. QR code may be a third-party call to action; crop or clear it before publish. Guest unnamed. Rights unverified |
| `images/people/film-cover.webp` | 1280×720 | RGB | 131 KB | Cover of `the-money-game` | Designed thumbnail: host, an unidentified man, a red purse of Kenyan notes, and the words “WIFE’S MONEY BELONGS TO HUSBAND?” | Episode cover only, and only for the Mbira Rimi conversation if that is the approved art | **Do not crop.** Type is the lower half. The words are not the stored page title. Alt text describes the scene; it does not quote the yellow headline. Guest likeness unverified |

### Episode covers

All four are 1280×720 RGB. They are graphic thumbnails: two faces, a money image, and a large second headline. They are referenced by slug from `episode()` in `src/content/media.ts`.

| File | Headline visible in the file | Episode title on the site | Placement | Notes |
| --- | --- | --- | --- | --- |
| `images/episodes/making-money-easier.webp` | HOW SOMALIS ARE GETTING ALL THAT MONEY | Making money is easier than you think | Watch-list feature and homepage “Now playing”, because this slug is first | The picture says something the title does not. Needs an editorial decision before it is the front-door image. Do not crop |
| `images/episodes/what-people-with-money-never-tell-you.webp` | Not re-opened as a separate preview in this pass. Same 1280×720 graphic format as the others | What people with money never tell you | Watch list | Treat as type-locked until reviewed. Alt text does not mention overlay type |
| `images/episodes/money-game-without-a-payslip.webp` | Same limitation: dimensions measured, overlay wording not separately transcribed | How to win the Money game without a Payslip | Watch list | Same |
| `images/episodes/rich-or-wealthy.webp` | FACTS ABOUT STARTING FROM THE BOTTOM | If this doesn't make you rich, It'll make you wealthy | Watch list | Second headline again. Do not crop |

Hypothesis: these are exports of the YouTube thumbnail artwork. That is not proven by a byte comparison, and YouTube thumbnails are not automatically licensed for a website. Confirm with whoever makes the covers.

Quality is fine for a 16:9 embed-sized frame. It is poor as a full-bleed editorial photograph because the type, the collage, and the faces are all fighting. The site’s own art direction (ADR 0011, ADR 0014) wants photography to bleed and type to live in the layout. These covers do the opposite. Use them as the player’s poster. Use studio stills for the hero and the essays.

### Backgrounds

| File | Pixels | Mode | Bytes | Used | Subject | Likely placement | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `images/backgrounds/bg-3.webp` | 1200×800 | RGB | 36 KB | Homepage hero backdrop in `HomePage.module.css` | Dark interior: slatted wall, bench, distant stage lighting, a large numeral, partial floor lettering | Atmospheric ground behind the portrait | Low resolution and low brightness for a full-viewport image on a large screen. Floor type may become readable. Provenance unverified. It is not a portrait of the host |
| `images/backgrounds/bg-2.webp` | 1280×720 | RGB | 107 KB | Not referenced | Empty auditorium, warm seat lights, dark house | Events, only if this is a real venue he uses | Looks like a generic theatre. Do not imply it is his room without confirmation |
| `images/backgrounds/bg-maroon.webp` | 1280×720 | RGB | 55 KB | Not referenced | Red stage curtain, no people | Texture or a section ground | Easy to mistake for a brand colour. The implemented palette has no this red. Rights unverified |

### Placeholders

| File | Pixels | Used | Notes |
| --- | --- | --- | --- |
| `images/placeholders/img01.webp` | 656×820 RGB | Not referenced in `src/` | Small. Do not use as a portrait |
| `images/placeholders/focal-test-card.svg` | SVG | Design-system demo only | Test card, not a photograph |

`README.md` still mentions `public/images/people/kingori-portrait.webp` as an example path. That file is not in the tree. Git status at the start of this work also showed deletions of `public/images/people/hero.png` and `public/images/people/kingori-hero.webp`. Those are gone from the working tree and were not reviewed.

## Placement summary

| Need | Best current candidate | Blocker |
| --- | --- | --- |
| Hero | `im01.png`, already in use | Audience heads, rights, PNG weight |
| Quiet biography | `port-4.jpg` | Unused, rights, square crop on a portrait page |
| Graphic portrait | `port-2-cutout.webp` | Unused, feet crop, rights |
| Off-mic / two-shot | `port-6.png` or `media.webp` | Unnamed second person, QR code on `media.webp` |
| Episode poster | The 1280×720 covers | Baked-in headlines that disagree with titles |
| Studio | `media.webp` | Placeholder route only; consent |
| Events | `02.webp`, maybe `bg-2.webp` | Other people’s faces; venue identity unverified |
| Guest profile | None | No per-guest stills in the repo |
| Editorial feature | None that are clean photography without a second person or a thumbnail headline | Need a licensed set |

## Quality checks still open

- Confirm alpha on `im01.png`, `port-6.png`, and `port-2-cutout.webp` against the near-black page, not against a design tool’s checkerboard.
- `im01.png` is 842 KB and `port-6.png` is 1.1 MB. The pipeline can emit WebP or AVIF in a non-export build. A transparent WebP master does not exist for the hero; `im01.webp` is opaque.
- Overlay text on episode covers fails as an accessible name. The alt should include the visible headline or the headline should come off the image and into HTML.
- No focal points are set on the episode covers. `ImageFrame` will centre-crop. A 4:5 or 1:1 crop will cut the type. Keep them at 16:9.
- 1200×800 is the widest background. A full-bleed hero on a desktop display will upscale `bg-3.webp`.

## Provenance and licensing

- Repository: no EXIF review was done for GPS or camera owner, and no licence file sits beside the images.
- YouTube: thumbnails and description art belong to the channel operator only if they made them and have rights to the guest’s likeness. The site should not hotlink `i.ytimg.com` as a design system.
- Facebook: inaccessible in this pass. A later export needs a named source folder and a note of who approved each frame.
- Do not generate replacement photography. The brief forbids it, and the launch guard exists so missing images stay labelled.
