import { MEDIA_FORMAT_LABELS } from "@/content/media";
import { formatDate, toIsoDuration } from "@/lib/date";
import type { MediaItem } from "@/types/content";
import styles from "./MediaMeta.module.css";

/** Format in the serif italic, then date and duration as quiet metadata: no badges. */
export function MediaMeta({ item }: { readonly item: MediaItem }) {
  return (
    <p className={styles.meta}>
      <span className={styles.format}>{MEDIA_FORMAT_LABELS[item.format]}</span>
      <time data-type="meta" dateTime={item.publishedAt}>
        {formatDate(item.publishedAt)}
      </time>
      {item.durationMinutes ? (
        <time data-type="meta" dateTime={toIsoDuration(item.durationMinutes)}>
          {item.durationMinutes} min{item.format === "article" ? " read" : ""}
        </time>
      ) : null}
    </p>
  );
}
