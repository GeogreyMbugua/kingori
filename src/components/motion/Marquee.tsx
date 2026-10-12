import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  /** Names the strip for assistive tech. */
  readonly label: string;
  /** Each item is one run of text; items are separated by a mark. */
  readonly items: readonly ReactNode[];
  readonly direction?: "left" | "right";
  readonly className?: string;
}

/**
 * An endless horizontal strip of type. The list is read once; the copy that
 * makes the loop seamless is hidden from assistive tech. It pauses on hover
 * and on keyboard focus (the strip is a tab stop), and under reduced motion
 * it stands still and wraps so nothing is cut off.
 */
export function Marquee({ label, items, direction = "left", className }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <ul role="list" className={styles.run} aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {item}
          <span aria-hidden="true" className={styles.mark}>
            ✶
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cx(styles.marquee, styles[direction], className)}
    >
      <div className={styles.track}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
