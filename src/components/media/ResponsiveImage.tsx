import Image from "next/image";
import { getImageAlt } from "@/lib/media";
import type { ImageAsset } from "@/types/media";

interface ResponsiveImageProps {
  readonly image: ImageAsset;
  /** Build with `buildSizes()` from @/lib/media so it matches the breakpoints. */
  readonly sizes: string;
  /** Only for the above-the-fold LCP image; everything else lazy-loads. */
  readonly preload?: boolean;
  readonly className?: string;
}

export function ResponsiveImage({ image, sizes, preload = false, className }: ResponsiveImageProps) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={getImageAlt(image)}
      sizes={sizes}
      preload={preload}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      blurDataURL={image.blurDataURL}
      className={className}
    />
  );
}
