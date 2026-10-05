/**
 * Image and video asset contracts.
 *
 * Every image must declare its accessibility intent: either it conveys
 * information (`alt` required) or it is purely decorative (`decorative: true`,
 * rendered with an empty alt). There is no third option.
 */

/** Art-directed crop ratios (width:height). See README "Imagery art direction". */
export type AspectRatio = "1:1" | "4:5" | "3:4" | "3:2" | "16:9" | "21:9";

/** Subject position as percentages from the top-left (0–100). Crops keep it in frame. */
export interface FocalPoint {
  readonly x: number;
  readonly y: number;
}

interface ImageAssetBase {
  readonly kind: "image";
  /** Path under /public (e.g. "/images/projects/example.webp") or an allowed remote URL. */
  readonly src: string;
  /** Intrinsic pixel dimensions, required so next/image can reserve layout space. */
  readonly width: number;
  readonly height: number;
  readonly blurDataURL?: string;
  /** Defaults to the centre when omitted. */
  readonly focalPoint?: FocalPoint;
  /** Has an alpha channel (a cut-out), so it sits on the page without a backdrop fill. */
  readonly transparent?: boolean;
}

export interface InformativeImage extends ImageAssetBase {
  readonly alt: string;
  readonly decorative?: false;
}

export interface DecorativeImage extends ImageAssetBase {
  readonly decorative: true;
  readonly alt?: never;
}

export type ImageAsset = InformativeImage | DecorativeImage;

export type VideoMimeType = "video/mp4" | "video/webm";

export interface VideoSource {
  readonly src: string;
  readonly type: VideoMimeType;
}

export interface VideoCaptions {
  readonly src: string;
  /** BCP 47 language tag, e.g. "en". */
  readonly srcLang: string;
  /** Track name shown in the player's captions menu, e.g. "English". */
  readonly label: string;
}

export interface VideoAsset {
  readonly kind: "video";
  /** Ordered by preference; the browser picks the first supported source. */
  readonly sources: readonly [VideoSource, ...VideoSource[]];
  readonly width: number;
  readonly height: number;
  readonly poster: ImageAsset;
  /** WebVTT captions. Required for any video with meaningful audio. */
  readonly captions?: VideoCaptions;
  /** Text alternative describing the video for assistive technology. */
  readonly description: string;
}

export type MediaAsset = ImageAsset | VideoAsset;

/**
 * A slot whose real asset has not been supplied yet. Renders as a labelled
 * MediaPlaceholder at the composition's ratio, so swapping in the real asset
 * never changes page architecture. Counts as placeholder content for the
 * launch guard.
 */
export interface PendingAsset {
  readonly kind: "pending";
  readonly media: "image" | "video" | "audio";
  /** What the real asset should show, e.g. "Portrait, natural light". Shown in the placeholder. */
  readonly description: string;
}

export type ImageSlot = ImageAsset | PendingAsset;
