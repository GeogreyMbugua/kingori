import type { ImageLoaderProps } from "next/image";

/**
 * Static-export loader (GitHub Pages has no image optimiser): serves the file
 * as-is under the base path, which next/image does not add to string sources.
 */
export default function staticImageLoader({ src }: ImageLoaderProps): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
