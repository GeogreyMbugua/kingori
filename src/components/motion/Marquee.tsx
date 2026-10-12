"use client";

import { useState, type ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  /** Names the strip for assistive tech and labels the pause control. */
  readonly label: string;
  /** Each item is one run of text; items are separated by a mark. */
  readonly items: readonly ReactNode[];
  readonly direction?: "left" | "right";
  readonly className?: string;
}

/**
 * An endless horizontal strip of type. The list is read once; the copy that
 * makes the loop seamless is hidden from assistive tech. A pause control
 * satisfies WCAG 2.2.2, and under reduced motion the strip stands still and
 * wraps so nothing is cut off.
 */
export function Marquee({ label, items, direction = "left", className }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

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
      data-paused={paused || undefined}
      className={cx(styles.marquee, styles[direction], className)}
    >
      <div className={styles.track}>
        {run(false)}
        {run(true)}
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-label={`${paused ? "Play" : "Pause"} ${label}`}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
