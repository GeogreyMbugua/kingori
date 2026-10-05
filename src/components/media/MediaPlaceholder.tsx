import { cx } from "@/lib/classnames";
import { toCssAspectRatio } from "@/lib/media";
import type { AspectRatio } from "@/types/media";
import styles from "./MediaPlaceholder.module.css";

interface MediaPlaceholderProps {
  readonly ratio: AspectRatio;
  /** Describes the media that will replace this, e.g. "Portrait 4:5". */
  readonly label: string;
  readonly className?: string;
}

/** Visible stand-in that reserves the final media's space while assets are pending. */
export function MediaPlaceholder({ ratio, label, className }: MediaPlaceholderProps) {
  return (
    <div
      className={cx(styles.placeholder, className)}
      style={{ aspectRatio: toCssAspectRatio(ratio) }}
    >
      <span data-type="meta">{label}</span>
    </div>
  );
}
