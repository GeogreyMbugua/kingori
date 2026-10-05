import { ImageFrame } from "@/components/media/ImageFrame";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { AspectRatio, ImageSlot } from "@/types/media";
import styles from "./MediaSlot.module.css";

interface MediaSlotProps {
  readonly slot: ImageSlot;
  /** Composition crop; the real asset is cropped around its focal point to this ratio. */
  readonly ratio: AspectRatio;
  readonly sizes: string;
  readonly preload?: boolean;
  readonly caption?: string;
  readonly className?: string;
}

/**
 * An art-directed image position that renders the real asset when supplied,
 * or a labelled placeholder at the same ratio while it is pending.
 */
export function MediaSlot({ slot, ratio, sizes, preload, caption, className }: MediaSlotProps) {
  if (slot.kind === "image") {
    return (
      <ImageFrame
        image={slot}
        ratio={ratio}
        sizes={sizes}
        preload={preload}
        caption={caption}
        className={className}
      />
    );
  }

  const placeholder = (
    <MediaPlaceholder ratio={ratio} label={`${slot.description} · ${ratio}`} />
  );

  if (!caption) return <div className={className}>{placeholder}</div>;

  return (
    <figure className={className}>
      {placeholder}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
