import type { CollectionPageContent, MediaFormat, MediaItem } from "@/types/content";

export const mediaContent: CollectionPageContent = {
  status: "placeholder",
  title: "Media",
  description: "Films, conversations, writing and galleries by Kingori.",
  intro: "A line framing the media collection: appearances, writing and moving image.",
  emptyMessage: "No media has been published yet.",
};

/** Reader-facing names for each format, set in the serif italic rather than as badges. */
export const MEDIA_FORMAT_LABELS: Record<MediaFormat, string> = {
  video: "Film",
  audio: "Listen",
  article: "Essay",
  gallery: "Gallery",
};

/**
 * Development dataset: three placeholder items with different shapes
 * (visually dominant feature, short item, long editorial piece). Copy makes
 * no claims about real appearances or publications.
 *
 * Array order is editorial order; the first item is the feature.
 */
export const mediaItems: readonly MediaItem[] = [
  {
    status: "placeholder",
    slug: "feature-gallery",
    title: "A Visual Feature",
    summary: "The lead media piece: a sequence of images introduced by a single sentence.",
    format: "gallery",
    publishedAt: "2026-03-14",
    cover: { kind: "pending", media: "image", description: "Feature image" },
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
    status: "placeholder",
    slug: "short-film",
    title: "Short Film",
    summary: "A brief film. One sentence on what it shows.",
    format: "video",
    publishedAt: "2025-11-02",
    durationMinutes: 3,
    context: "A line of context: where the piece was shown or how it came about.",
    cover: { kind: "pending", media: "image", description: "Film still" },
    asset: { kind: "pending", media: "video", description: "Film with captions" },
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
