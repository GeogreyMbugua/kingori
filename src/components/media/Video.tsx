import { getImageProps } from "next/image";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { cx } from "@/lib/classnames";
import { withBasePath } from "@/lib/url";
import type { ImageAsset, VideoAsset } from "@/types/media";
import styles from "./Video.module.css";

interface VideoProps {
  readonly video: VideoAsset;
  /**
   * player: native controls, loads on demand (default).
   * ambient: muted silent loop with a pause control; never autoplays under
   * reduced motion. Only for footage with no meaningful audio.
   */
  readonly mode?: "player" | "ambient";
  readonly className?: string;
}

function optimisedPosterUrl(poster: ImageAsset): string {
  return getImageProps({
    src: poster.src,
    width: poster.width,
    height: poster.height,
    alt: "",
    sizes: "100vw",
  }).props.src;
}

function withResolvedPaths(video: VideoAsset): VideoAsset {
  const resolve = <T extends { readonly src: string }>(file: T): T => ({
    ...file,
    src: withBasePath(file.src),
  });
  const [first, ...rest] = video.sources;
  return {
    ...video,
    sources: [resolve(first), ...rest.map(resolve)],
    ...(video.captions ? { captions: resolve(video.captions) } : {}),
  };
}

export function Video({ video: asset, mode = "player", className }: VideoProps) {
  const video = withResolvedPaths(asset);
  const poster = optimisedPosterUrl(video.poster);

  if (mode === "ambient") {
    return <AmbientVideo video={video} poster={poster} className={className} />;
  }

  return (
    <video
      className={cx(styles.video, className)}
      width={video.width}
      height={video.height}
      poster={poster}
      controls
      playsInline
      preload="none"
      aria-label={video.description}
    >
      {video.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
      {video.captions ? (
        <track
          kind="captions"
          src={video.captions.src}
          srcLang={video.captions.srcLang}
          label={video.captions.label}
          default
        />
      ) : null}
    </video>
  );
}
