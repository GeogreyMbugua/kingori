import type { AspectRatio, ImageSlot, MediaAsset, PendingAsset } from "@/types/media";

/**
 * "placeholder" marks scaffolding content that must be replaced before launch.
 * The launch guard (`findPlaceholderContent`) fails the build if indexing is
 * enabled while any placeholder remains.
 */
export type ContentStatus = "placeholder" | "final";

/** ISO 8601 calendar date, e.g. "2026-01-31". */
export type IsoDate = `${number}-${number}-${number}`;

/** Paragraphs of running text. */
export type Paragraphs = readonly [string, ...string[]];

export interface PageContent {
  readonly status: ContentStatus;
  readonly title: string;
  readonly description?: string;
}

export interface CollectionPageContent extends PageContent {
  readonly emptyMessage: string;
  /** One or two sentences framing the collection. */
  readonly intro: string;
}

export interface HomeContent extends PageContent {
  /** Opening statement beside the wordmark. */
  readonly intro: string;
  readonly portrait: ImageSlot;
  /** Large perspective statement; `accent` is set in the serif italic. */
  readonly statement: { readonly lead: string; readonly accent: string; readonly tail: string };
  readonly selectedWorkHeading: string;
  readonly mediaHeading: string;
}

export interface AboutChapter {
  readonly heading: string;
  readonly body: Paragraphs;
}

export interface AboutContent extends PageContent {
  readonly statement: string;
  readonly portrait: ImageSlot;
  /** A tightly cropped secondary image (detail, hands, workspace). */
  readonly detail: ImageSlot;
  readonly chapters: readonly [AboutChapter, ...AboutChapter[]];
  readonly capabilitiesHeading: string;
  readonly capabilities: readonly string[];
}

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  readonly href: `mailto:${string}` | `https://${string}` | `tel:${string}`;
}

export interface ContactContent extends PageContent {
  readonly invitation: string;
  readonly note: string;
  readonly primary: ContactChannel;
  readonly secondary: readonly ContactChannel[];
}

/** One art-directed image in a project or media sequence. `ratio` is the editor's chosen crop. */
export interface EditorialFigure {
  readonly asset: ImageSlot;
  readonly ratio: AspectRatio;
  readonly caption?: string;
}

/**
 * A project. Optional fields shape the page:
 * - `statement` makes the project lead with typography instead of imagery.
 * - `challenge` / `approach` / `outcome` turn the page into a case study.
 */
export interface Project {
  readonly status: ContentStatus;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly year: number;
  /** Kingori's role and services on the project. */
  readonly role: readonly [string, ...string[]];
  readonly cover: ImageSlot;
  /** Crop for the cover in hero and index compositions. */
  readonly coverRatio: AspectRatio;
  readonly statement?: string;
  readonly overview: Paragraphs;
  readonly challenge?: Paragraphs;
  readonly approach?: Paragraphs;
  readonly outcome?: Paragraphs;
  readonly figures?: readonly EditorialFigure[];
  readonly relatedSlugs?: readonly string[];
}

export type MediaFormat = "video" | "audio" | "article" | "gallery";

export interface MediaCredit {
  readonly role: string;
  readonly name: string;
}

export interface MediaItem {
  readonly status: ContentStatus;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly format: MediaFormat;
  readonly publishedAt: IsoDate;
  /** Running time (video/audio) or reading time (article), in minutes. */
  readonly durationMinutes?: number;
  /** Where the piece appeared or how it came about. */
  readonly context?: string;
  readonly credits?: readonly MediaCredit[];
  readonly cover: ImageSlot;
  /** The playable or viewable asset. Articles carry `body` instead. */
  readonly asset?: MediaAsset | PendingAsset;
  readonly body?: Paragraphs;
  readonly figures?: readonly EditorialFigure[];
  readonly relatedProjectSlug?: string;
}

export interface NotFoundContent {
  readonly title: string;
  readonly message: string;
  readonly homeLinkLabel: string;
}
