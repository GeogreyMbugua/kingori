# Content inventory

**Verified on:** 2026-10-18  
**Rule:** A field is verified only when it was read from the YouTube channel RSS, a YouTube oEmbed response, or the public watch page (`publishDate`, `lengthSeconds`). Spotify fields are verified only when they appeared in the rendered public show page. Anything else is unverified. View counts are omitted on purpose.

Canonical show URLs:

- YouTube channel: https://www.youtube.com/@LebrandKingori
- Channel id: `UCJvhxJf8-Bne99uzuQpFIpg`
- RSS used: `https://www.youtube.com/feeds/videos.xml?channel_id=UCJvhxJf8-Bne99uzuQpFIpg`
- Spotify show: https://open.spotify.com/show/5LmRSFz7JvyE0gGiOT6Xpd
- Embed pattern already implemented: `https://www.youtube-nocookie.com/embed/{videoId}`

The RSS returns the latest 15 uploads, not the full catalogue. A third-party index suggested a much larger back catalogue. That count is unverified and those older titles are not listed here as facts.

One editorial episode can have more than one destination. Where a Spotify description repeats a YouTube description, they are recorded as one conversation. Per-episode Spotify URLs were **not** in the public HTML, so those links stay unverified.

## A. Latest YouTube uploads

Source: official channel RSS, fetched 2026-10-18. The Published column is the UTC calendar date of the feed’s `published` timestamp (the feed also includes the time). Descriptions are shortened to the factual claim in the feed. Guest is taken from the title or the first sentence of the description. Duration is from the watch page where a fetch returned `lengthSeconds`.

| Published (UTC) | Title | Guest | Video id | Duration | Topics suggested by the title and description |
| --- | --- | --- | --- | --- | --- |
| 2026-10-11 | When Does Medicine Make Cents? | Dr. Stanley Mwenda Aruyaru, described as a surgeon | `ik5n-8GffuI` | 82:19 | Life, Money. Doctors’ training, fees, and livelihood |
| 2026-10-08 | Wealth By Exposure | Bob Mwiti, founder of the international scholars program | `pmqXJRrAmk8` | unverified | Money, Life. Immigration, opportunity, income comparison |
| 2026-09-29 | Poverty By Ego | Andrew Muthee Gitau, described as CEO of AMG Realtors | `FZPCNoATA2M` | 81:42 | Money. Prestige and the cost of ego |
| 2026-09-27 | What Happens at 3AM? | Dr. Mwaka, described as a psychologist and herbalist; the description says this is a third appearance and that he has practiced witchcraft | `taArB_pxWEM` | unverified | Taboos, Life. Spiritual practice and belief |
| 2026-09-24 | Systemic Poverty Explained | Jimi Wanjigi, described as Safina Party leader and a presidential aspirant | `rDelu4PHee0` | 90:17 | Power, Society, Money. Kenyan economy |
| 2026-09-22 | The Psychology of Poverty | Juliani, described as a musician | `2ytH0yh_m5w` | 66:51 | Money, People. Wealth mindset |
| 2026-09-20 | Employment for Who? | Purity Odawa, described as founder of Purity Homes | `k5RD2uqCQ0o` | unverified | Society, Money. Employment and real estate |
| 2026-09-17 | Lump sum VS Growing Money | Gabriel Maketh, described as a real-estate developer and a founding director of K&K Precast Engineering | `8VZ8qh8XVkI` | unverified | Money. Saving, building, financing |
| 2026-09-13 | Getting Rich by Lifestyle | Dr. George Wachiuri, described as CEO and founder of Optiven | `YDPh9WnL12g` | unverified | Money, Life. A livelihood story in Kenyan real estate |
| 2026-09-10 | Young Money Problems | Khalif Kairo, described as an aviator and businessman | `WnrH4Jb5MR0` | 94:49 | Money, Life. Age, business cycles, the Kenyan business environment |
| 2026-09-08 | How Legit are Money Market Funds? | John Mbui, described as CEO and founder of ABDC funds | `qnJ4wn0suZ0` | unverified | Money. Savings and wealth creation |
| 2026-09-06 | Who really Owns Kenya? | Apostle Ndura Waruinge; the description says this is a third appearance | `Lo9STsvpS1Y` | unverified | Power, Society. Ownership, poverty, political resource games |
| 2026-09-04 | Mole Concept: What's The Deal With Ndindi Nyoro? | Guest unverified. The title names Ndindi Nyoro; the description has no guest sentence | `5vORMB-x2lw` | 12:38 | Power. Short political commentary, not a long conversation |
| 2026-07-28 | Principles Vs Dirty Money | Martha Karua, described as a presidential aspirant, former magistrate, MP, and cabinet minister | `rTxZJDKTGlI` | 86:31 | Power, Money. Public office and political money |
| 2026-07-12 | The Lie About Small Businesses \|\| Nick mwendwa | Nick mwendwa, described as a techpreneur, former FKF president, and farmer. The title uses that spelling and capitalisation | `48nrxe7ISsM` | unverified | Money. What counts as a business |

Watch URLs are `https://www.youtube.com/watch?v={videoId}`.

Third-party durations exist for several “unverified” rows. They are not copied here, because the same index was about a minute off the watch page on other videos.

`5vORMB-x2lw` is 12 minutes. It should not be modelled as a standard long conversation without an editorial decision.

## B. Episodes already in the repository

Source: `src/content/media.ts`, checked against oEmbed on 2026-10-18. These five are `status: "final"`. They are older than the RSS window except where a date was re-read.

| Site slug | Stored title | Public oEmbed title | Guest on the site | Guest from the public title | Stored date | Date re-verified | Stored minutes | Watch-page length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `making-money-easier` | Making money is easier than you think | Making money is easier than you think \|\| Abdinoor Alimahdi | Abdinoor Alimahdi | Abdinoor Alimahdi | 2025-03-05 | Yes, `publishDate` 2025-03-05 | 91 | 91:46 |
| `what-people-with-money-never-tell-you` | What people with money never tell you | What people with money never tell you \|\| Gor Semelang'o | Gor Semelang'o | Gor Semelang'o | 2024-03-15 | No | 89 | 88:56 |
| `money-game-without-a-payslip` | How to win the Money game without a Payslip | How to win the Money game without a Payslip \|\| Dama wa Mobile Spares | Dama wa Mobile Spares | Dama wa Mobile Spares | 2024-02-26 | No | 94 | unverified |
| `rich-or-wealthy` | If this doesn't make you rich, It'll make you wealthy | If this doesn't make you rich, It'll make you wealthy \|\| Andrew Muthee Gitau | Andrew Muthee Gitau | Andrew Muthee Gitau | 2025-07-29 | No | 100 | 100:40 |
| `the-money-game` | The Money Game | Here's Where Couples Lose The Money Game \|\| Mbira Rimi | none | Mbira Rimi | 2025-11-27 | No | 83 | 83:06 |

All five oEmbed authors are “Dr. King'ori (Felixe JaSiaya)”.

The site currently features `making-money-easier` because it is the first final item, not because a fresh “most watched” list was checked. The context string “Most watched on the Dr. King'ori YouTube channel.” is unverified.

Cover files exist at `public/images/episodes/{slug}.webp` for the first four. `the-money-game` uses `public/images/people/film-cover.webp`. Those covers carry a second headline that is not the episode title. See `asset-inventory.md`.

Two further media records are placeholders and are not public content: `feature-gallery` and `long-read`.

## C. Spotify sample from the public show page

Show description, verified: “Hi, I'm Dr. King'ori. I trust that your listenership to these conversations will be time well wasted.” Category shown: Business. Episode URLs: unverified.

| Visible title | Guest, from the title or description | Date shown | Duration shown | YouTube match |
| --- | --- | --- | --- | --- |
| Young Money Problems \|\| Khalif Kairo | Khalif Kairo, aviator and businessman | “Sep 18”; year not shown in the extract | 1 hr 34 min | Same description as YouTube `WnrH4Jb5MR0` (published 2026-09-10, length 94:49). Treat as one episode with two destinations. The eight-day gap is unverified as a deliberate delay; the year on Spotify was not printed |
| Why & When Kungongewa is constant \|\| Jacob Aliet | Jacob Aliet, described as author of *Unplugged* | 2024-10-24 | 1 hr 42 min | No matching video in the RSS window. YouTube id unverified |
| Loopholes in Real Estate \|\| Peter Kibugi, Hellen Wangui | Peter Kibugi, described as a real-estate strategist; Hellen Wangui, described as a real-estate analyst | 2024-10-14 | 1 hr 29 min | YouTube id unverified |
| Title not cleanly separated in the extract. The description is the Dama wa Mobile Spares conversation | Dama wa Mobile Spares | 2024-03-03 | 1 hr 34 min | Description matches the public YouTube episode `EcLbQyWltxE`. The site date 2024-02-26 was not re-verified. Spotify’s 2024-03-03 is a second date for what appears to be the same conversation |
| Title fragment unclear. Description is the conversation with Ambassador Brigadier General Dr. Wallace W. Williams | Wallace W. Williams, described as honorary consul general of Antigua and Barbuda to Nigeria | 2024-02-29 | unverified | YouTube id unverified. A following fragment “3 truths no lies” was visible and is not recorded as this episode’s title |

Hypothesis, labelled as such: the show is one catalogue published to YouTube and Spotify, sometimes on different days, sometimes with a different running time. Do not merge records until both ids are in hand.

## D. How the proposed categories fit

The six names are already in `archiveThemes`. They fit the verified sample. They are not yet fields on `MediaItem`.

| Category | Supported by verified titles | Representative episode | Caution |
| --- | --- | --- | --- |
| Money | Strong. Most of the sample is income, saving, real estate, funds, or the cost of status | Young Money Problems, Khalif Kairo | Will become a junk drawer unless real estate, employment, and investing can sit inside it without extra top-level labels |
| Power | Strong where the guest is a political office-holder or the subject is ownership and the state | Principles Vs Dirty Money, Martha Karua; Who really Owns Kenya?, Ndura Waruinge | |
| People | Present, thinner in the latest 15. Relationships, mindset, couples | Here's Where Couples Lose The Money Game, Mbira Rimi; The Psychology of Poverty, Juliani | Couples and family may also be Taboos when the framing is provocative. That is an editorial choice |
| Society | Supported by employment, systemic poverty, and who the economy is for | Systemic Poverty Explained, Jimi Wanjigi; Employment for Who?, Purity Odawa | Overlaps Money. The distinction is structure versus personal tactic |
| Life | Supported by medicine, age, immigration, and livelihood stories | When Does Medicine Make Cents?, Dr. Stanley Mwenda Aruyaru | |
| Taboos | Supported, and the channel already uses it as a draw | What Happens at 3AM?, Dr. Mwaka | Needs a house rule so religion, sex, and crime are not dumped together without review |

**Additional top-level categories are not recommended yet.**

- Real estate is a recurring Money subject (Gitau, Odawa, Maketh, Wachiuri, Kibugi and Wangui), not a seventh audience category.
- Faith, spirit, and occult practice recur (Dr. Mwaka, Ndura Waruinge). Hypothesis: keep them in Taboos until the client asks for a Faith shelf. A new shelf would be justified only after someone tags a full catalogue and Faith is clearly crowded.
- Short commentary (`5vORMB-x2lw` at 12:38) may need a format flag later (“conversation” versus “short”). That is a format, not a topic.

**Repeat guests already visible**, which is the practical case for guest profiles:

- Andrew Muthee Gitau: RSS episode 2026-09-29 and the site episode `rich-or-wealthy`.
- Ndura Waruinge: description of `Lo9STsvpS1Y` says a third appearance.
- Dr. Mwaka: description of `taArB_pxWEM` says a third appearance.
- Khalif Kairo and Dama wa Mobile Spares: same conversation on YouTube and Spotify in the sample above.

## E. Missing metadata

| Field | State |
| --- | --- |
| Full YouTube catalogue | Not fetched. RSS is 15 items. Do not invent the rest |
| Spotify episode URL | Unverified for every row |
| Exact duration | Unverified for 8 of the latest 15, and for `EcLbQyWltxE` |
| Publish date for four site episodes | Stored in git, not re-read from YouTube in this pass |
| “Most watched” | Unverified |
| Theme tag chosen by the client | Absent. Classifications above are hypotheses from titles and descriptions |
| Transcript, pull-quote, article cut-down | Not in the public pages reviewed, and not in the content model as finished copy |
| Guest portrait, bio, or official site | Not collected. Do not write bios from the episode description alone |
| Captions language | One unrelated search snippet reported `sw` on a different video. Not checked for this sample |

## F. Editorial consequences

- Model **one episode, many destinations**. YouTube is the player. Spotify is a link, not a second catalogue entry.
- Do not feature `the-money-game` under that title. The public title and guest are different.
- Do not write summaries as `With {guest}.` once a description exists. The RSS description is the factual standfirst until an editor writes a shorter one.
- Do not auto-publish every upload. The 12-minute Ndindi Nyoro piece shows the channel is not only long conversations.
- Theme filters should wait until a person assigns the six labels. Guessing them for the whole archive would present hypotheses as the archive.
