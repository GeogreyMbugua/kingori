import { Link } from "@/components/ui/Link";
import type { YouTubeAsset } from "@/types/media";
import styles from "./YouTubeEmbed.module.css";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

interface YouTubeEmbedProps {
  readonly video: YouTubeAsset;
}

function watchUrl(videoId: string): `https://www.youtube.com/watch?v=${string}` {
  if (!VIDEO_ID.test(videoId)) {
    throw new Error(`Invalid YouTube video id: ${videoId}`);
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Plays a YouTube conversation in place. The file stays on YouTube. */
export function YouTubeEmbed({ video }: YouTubeEmbedProps) {
  return (
    <div className={styles.block}>
      <div className={styles.frame}>
        <iframe
          className={styles.embed}
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className={styles.watch}>
        <Link href={watchUrl(video.videoId)} variant="cta">
          Watch on YouTube
        </Link>
      </p>
    </div>
  );
}
