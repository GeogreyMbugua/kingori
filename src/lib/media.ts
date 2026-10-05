import { BREAKPOINTS, minWidthQuery, type Breakpoint } from "@/lib/breakpoints";
import type { AspectRatio, FocalPoint, ImageAsset } from "@/types/media";

/** Converts an art-direction ratio ("4:5") to a CSS aspect-ratio value ("4 / 5"). */
export function toCssAspectRatio(ratio: AspectRatio): string {
  return ratio.replace(":", " / ");
}

/** Maps a focal point to object-position, clamped to 0–100%. Defaults to centre. */
export function toObjectPosition(focalPoint: FocalPoint | undefined): string {
  if (!focalPoint) return "50% 50%";
  const clamp = (value: number) => Math.min(100, Math.max(0, value));
  return `${clamp(focalPoint.x)}% ${clamp(focalPoint.y)}%`;
}

/** A CSS length describing the rendered image width, e.g. "100vw", "50vw", "40rem". */
type SizeValue = string;

export type ResponsiveSizes = { readonly base: SizeValue } & Partial<
  Record<Breakpoint, SizeValue>
>;

/**
 * Builds a `sizes` attribute aligned with the project breakpoints so that
 * next/image requests the smallest adequate source at every viewport.
 */
export function buildSizes(sizes: ResponsiveSizes): string {
  const breakpointsWidestFirst = (Object.keys(BREAKPOINTS) as Breakpoint[]).sort(
    (a, b) => BREAKPOINTS[b] - BREAKPOINTS[a],
  );

  const conditions = breakpointsWidestFirst.flatMap((breakpoint) => {
    const value = sizes[breakpoint];
    return value ? [`${minWidthQuery(breakpoint)} ${value}`] : [];
  });

  return [...conditions, sizes.base].join(", ");
}

export function getImageAlt(image: ImageAsset): string {
  if (image.decorative) return "";

  const alt = image.alt.trim();
  if (alt.length === 0) {
    throw new Error(
      `Image "${image.src}" has an empty alt. Provide descriptive alt text or mark it decorative.`,
    );
  }
  return alt;
}
