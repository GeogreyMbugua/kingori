import { MediaSlot } from "@/components/media/MediaSlot";
import { Link } from "@/components/ui/Link";
import { buildSizes } from "@/lib/media";
import type { ImageSlot, YouTubeAsset } from "@/types/media";
import styles from "./YouTubeWatch.module.css";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const coverSizes = buildSizes({ base: "100vw", wide: "104rem" });

interface YouTubeWatchProps {
  readonly video: YouTubeAsset;
  readonly cover: ImageSlot;
}

function watchUrl(videoId: string): `https://www.youtube.com/watch?v=${string}` {
  if (!VIDEO_ID.test(videoId)) {
    throw new Error(`Invalid YouTube video id: ${videoId}`);
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Sends the reader to the conversation on YouTube. The file stays there. */
export function YouTubeWatch({ video, cover }: YouTubeWatchProps) {
  const href = watchUrl(video.videoId);

  return (
    <div className={styles.block}>
      <Link href={href} className={styles.poster}>
        <MediaSlot slot={cover} ratio="16:9" sizes={coverSizes} preload />
      </Link>
      <p className={styles.watch}>
        <Link href={href} variant="cta">
          Watch on YouTube
        </Link>
      </p>
    </div>
  );
}
