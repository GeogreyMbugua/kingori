import Image from "next/image";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { cx } from "@/lib/classnames";
import { getImageAlt, toCssAspectRatio, toObjectPosition } from "@/lib/media";
import type { AspectRatio, ImageAsset } from "@/types/media";
import styles from "./ImageFrame.module.css";

interface ImageFrameProps {
  readonly image: ImageAsset;
  /** Build with buildSizes() from @/lib/media; "100vw" for full-bleed. */
  readonly sizes: string;
  /** Crop to an art-directed ratio around the image's focal point. Omit for intrinsic ratio. */
  readonly ratio?: AspectRatio;
  /** Only for the above-the-fold LCP image. */
  readonly preload?: boolean;
  readonly caption?: string;
  readonly credit?: string;
  readonly className?: string;
}

export function ImageFrame({
  image,
  sizes,
  ratio,
  preload = false,
  caption,
  credit,
  className,
}: ImageFrameProps) {
  const media = ratio ? (
    <div
      className={cx(styles.crop, image.transparent && styles.cutout)}
      style={{ aspectRatio: toCssAspectRatio(ratio) }}>
      <Image
        src={image.src}
        alt={getImageAlt(image)}
        fill
        sizes={sizes}
        preload={preload}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        className={styles.image}
        style={{ objectPosition: toObjectPosition(image.focalPoint) }}
      />
    </div>
  ) : (
    <ResponsiveImage image={image} sizes={sizes} preload={preload} className={styles.intrinsic} />
  );

  if (!caption && !credit) {
    return <div className={cx(styles.frame, className)}>{media}</div>;
  }

  return (
    <figure className={cx(styles.frame, className)}>
      {media}
      <figcaption className={styles.caption}>
        {caption}
        {credit ? (
          <small data-type="meta" className={styles.credit}>
            {credit}
          </small>
        ) : null}
      </figcaption>
    </figure>
  );
}
