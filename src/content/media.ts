import type { CollectionPageContent, MediaFormat, MediaItem } from "@/types/content";

export const mediaContent: CollectionPageContent = {
  status: "placeholder",
  title: "Watch list",
  description: "Episodes from Dr. King'ori, played from YouTube.",
  intro: "The episodes, in one list. Press play.",
  emptyMessage: "Nothing on the list yet.",
};

/** Reader-facing names for each format, set in the serif italic rather than as badges. */
export const MEDIA_FORMAT_LABELS: Record<MediaFormat, string> = {
  video: "Watch",
  audio: "Listen",
  article: "Read",
  gallery: "Gallery",
};

interface EpisodeInput {
  readonly slug: string;
  readonly title: string;
  readonly guest: string;
  readonly videoId: string;
  readonly publishedAt: MediaItem["publishedAt"];
  /** Completed minutes, floor(lengthSeconds / 60), from the public watch page. */
  readonly durationMinutes: number;
  /** One or two factual sentences drawn from the public description. */
  readonly summary: string;
  /** Names the people and the cover line, without repeating that line in full. */
  readonly coverAlt: string;
}

/** Editorial order. Facts below were checked against the public watch page on 2026-10-18. */
function episode({
  slug,
  title,
  guest,
  videoId,
  publishedAt,
  durationMinutes,
  summary,
  coverAlt,
}: EpisodeInput): MediaItem {
  return {
    status: "final",
    slug,
    title,
    summary,
    format: "video",
    publishedAt,
    durationMinutes,
    context: "Dr. King'ori on YouTube.",
    credits: [{ role: "Guest", name: guest }],
    cover: {
      kind: "image",
      src: `/images/episodes/${slug}.webp`,
      width: 1280,
      height: 720,
      alt: coverAlt,
    },
    asset: { kind: "youtube", videoId, title },
  };
}

/**
 * Editorial order is unchanged. Placeholder items stay so the other page
 * shapes can still be reviewed; the public list shows final episodes once
 * any exist.
 */
export const mediaItems: readonly MediaItem[] = [
  episode({
    slug: "making-money-easier",
    title: "Making money is easier than you think",
    guest: "Abdinoor Alimahdi",
    videoId: "-jinyunCiqc",
    publishedAt: "2025-03-05",
    durationMinutes: 91,
    summary:
      "Abdinoor Alimahdi, an education technologist and telecommunications engineer, on wealth-creation strategies he says set the Somali community in Kenya apart.",
    coverAlt:
      "Dr. King'ori and Abdinoor Alimahdi beside stacks of notes. The cover line is about how Somalis are getting that money.",
  }),
  episode({
    slug: "what-people-with-money-never-tell-you",
    title: "What people with money never tell you",
    guest: "Gor Semelang'o",
    videoId: "g7doqbbe3-g",
    publishedAt: "2024-03-15",
    durationMinutes: 88,
    summary:
      "Businessman Gor Semelang'o on how money is made, including rules he presents as tried and tested.",
    coverAlt:
      "Dr. King'ori and Gor Semelang'o with oil tankers. The cover line calls him an oil tycoon and points at a billionaires' club.",
  }),
  episode({
    slug: "money-game-without-a-payslip",
    title: "How to win the Money game without a Payslip",
    guest: "Dama wa Mobile Spares",
    videoId: "EcLbQyWltxE",
    publishedAt: "2024-02-26",
    durationMinutes: 94,
    summary:
      "Dama wa Mobile Spares on building a mobile-phone spare-parts business from shop-floor work, and on passive income and trade in Nairobi's CBD.",
    coverAlt:
      "Dr. King'ori and Dama wa Mobile Spares with coins and notes. The cover line is about a CBD millionaire and small money.",
  }),
  episode({
    slug: "rich-or-wealthy",
    title: "If this doesn't make you rich, It'll make you wealthy",
    guest: "Andrew Muthee Gitau",
    videoId: "Ff_97c6CEBM",
    publishedAt: "2025-07-29",
    durationMinutes: 100,
    summary:
      "Andrew Muthee Gitau, CEO of AMG Realtors, on leaving a job and on working in a wider business environment.",
    coverAlt:
      "Dr. King'ori and Andrew Muthee Gitau. The cover line is about starting from the bottom.",
  }),
  {
    status: "placeholder",
    slug: "feature-gallery",
    title: "A Visual Feature",
    summary: "The lead media piece: a sequence of images introduced by a single sentence.",
    format: "gallery",
    publishedAt: "2026-03-14",
    cover: {
      kind: "image",
      src: "/images/people/media.webp",
      width: 1080,
      height: 670,
      alt: "Kingori seated across a round table from a man in a navy suit, in a studio with warm shelf lighting",
      focalPoint: { x: 50, y: 58 },
    },
    figures: [
      {
        asset: { kind: "pending", media: "image", description: "Opening frame" },
        ratio: "16:9",
      },
      { asset: { kind: "pending", media: "image", description: "Portrait frame" }, ratio: "4:5" },
      { asset: { kind: "pending", media: "image", description: "Detail frame" }, ratio: "1:1" },
    ],
    relatedProjectSlug: "image-study",
  },
  {
    status: "final",
    slug: "the-money-game",
    title: "Here's Where Couples Lose The Money Game",
    summary:
      "Mbira Rimi, author of New Confident Africa, on a second visit, talking about the game of resources.",
    format: "video",
    publishedAt: "2025-11-27",
    durationMinutes: 83,
    context: "Dr. King'ori on YouTube.",
    credits: [{ role: "Guest", name: "Mbira Rimi" }],
    cover: {
      kind: "image",
      src: "/images/people/film-cover.webp",
      width: 1280,
      height: 720,
      alt: "Dr. King'ori and Mbira Rimi with Kenyan notes in a red purse. The cover asks whether a wife's money belongs to her husband.",
    },
    asset: {
      kind: "youtube",
      videoId: "MkC40xneDgc",
      title: "Here's Where Couples Lose The Money Game",
    },
  },
  {
    status: "placeholder",
    slug: "long-read",
    title: "An Essay in Several Parts",
    summary:
      "A longer editorial piece. The summary is two sentences, so index layouts are tested against a fuller standfirst before the reader commits to the full text.",
    format: "article",
    publishedAt: "2025-06-20",
    durationMinutes: 9,
    cover: { kind: "pending", media: "image", description: "Essay image" },
    body: [
      "The opening paragraph of a long read sets its tone. It should be allowed to run at a comfortable measure, in the reading face, with nothing competing for attention beside it.",
      "Subsequent paragraphs carry the argument. This text exists to show the page sustaining long-form reading: line length, leading and paragraph rhythm all matter more here than anywhere else on the site.",
      "Long pieces may include a pause, a single sentence given its own line to mark a turn in the argument.",
      "The closing paragraph returns to the opening idea, and the page ends quietly with a route back into related work rather than a loud call to action.",
    ],
    relatedProjectSlug: "written-piece",
  },
];

export function getMediaItemBySlug(slug: string): MediaItem | undefined {
  return mediaItems.find((item) => item.slug === slug);
}

/** Final episodes once any exist, otherwise the full dataset. */
export function publishedMedia(): readonly MediaItem[] {
  const published = mediaItems.filter((item) => item.status === "final");
  return published.length > 0 ? published : mediaItems;
}
