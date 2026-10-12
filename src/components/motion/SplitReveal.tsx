import { Fragment, type CSSProperties } from "react";
import { cx } from "@/lib/classnames";
import styles from "./SplitReveal.module.css";

interface SplitRevealProps {
  readonly text: string;
  /**
   * "load": words rise in sequence as the page opens (use above the fold).
   * "scroll": words rise as the line enters the viewport.
   */
  readonly trigger?: "load" | "scroll";
  /** Words already shown before this one, so several lines continue one sequence. */
  readonly offset?: number;
  readonly className?: string;
}

/**
 * Splits a line into words that rise out of a clip, one after another.
 * Place inside the heading or paragraph that carries the role and semantics;
 * words are joined by real spaces, so the text content is unchanged.
 * Without motion support or under reduced motion, the text is simply visible.
 */
export function SplitReveal({ text, trigger = "load", offset = 0, className }: SplitRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cx(styles[trigger], className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span className={styles.word}>
            <span className={styles.inner} style={{ "--i": index + offset } as CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
