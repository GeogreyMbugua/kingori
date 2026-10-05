/**
 * Specimen copy for the internal /design-system preview ONLY.
 *
 * Nothing here is Kingori content and nothing here may be imported by a
 * production page. Text is deliberately neutral so it can never be mistaken
 * for real copy.
 */
import type { InformativeImage } from "@/types/media";

export const designSystemDemo = {
  title: "Design system",
  intro:
    "Internal reference for tokens and primitives. Specimen text only. This page is not linked, not in the sitemap and always noindex.",
  specimen: {
    giant: "Specimen",
    display: "Display specimen with a serif",
    displayAccent: "accent",
    headingXl: "Heading XL specimen",
    heading: "Heading specimen for hierarchy checks",
    bodyLg:
      "Large body specimen. Used for standfirsts and introductions where a paragraph needs more presence than running text.",
    body: "Body specimen. Running text is set in the serif at a comfortable measure, so long-form reading stays easy at every viewport. This sentence exists to wrap onto several lines and show the leading.",
    bodySm: "Small body specimen for secondary information and dense supporting copy.",
    caption: "Caption specimen describing an image beneath it.",
    meta: "Meta · 01 January 2026 · 4 min",
    eyebrow: "Eyebrow label",
    quote:
      "Specimen quotation used to test hanging punctuation and line length across two or three lines of text.",
    quoteAttribution: "Specimen attribution",
    quoteSource: "Specimen source",
    diacritics: "Diacritics: Gĩkũyũ ĩ ũ · é ñ ö ł ş ž",
  },
  focalCard: {
    kind: "image",
    src: "/images/placeholders/focal-test-card.svg",
    width: 1600,
    height: 1000,
    alt: "Test card with a grid, corner labels and a target circle marking the focal point",
    focalPoint: { x: 70, y: 35 },
  } satisfies InformativeImage,
} as const;
