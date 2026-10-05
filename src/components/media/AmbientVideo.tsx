"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/classnames";
import type { VideoAsset } from "@/types/media";
import styles from "./Video.module.css";

interface AmbientVideoProps {
  readonly video: VideoAsset;
  readonly poster: string;
  readonly className?: string;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Client component: playback depends on the user's motion preference, and
 * WCAG 2.2.2 requires a pause control for motion lasting over five seconds.
 */
export function AmbientVideo({ video, poster, className }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || window.matchMedia(REDUCED_MOTION).matches) return;
    element.play().catch(() => {
      /* Autoplay can be refused by the browser; the poster and play control remain. */
    });
  }, []);

  function toggle() {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) {
      void element.play();
    } else {
      element.pause();
    }
  }

  return (
    <div className={cx(styles.ambient, className)}>
      <video
        ref={videoRef}
        className={styles.video}
        width={video.width}
        height={video.height}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.description}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {video.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <Button variant="secondary" className={styles.control} onClick={toggle}>
        {playing ? "Pause video" : "Play video"}
      </Button>
    </div>
  );
}
