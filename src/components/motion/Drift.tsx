import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Drift.module.css";

interface DriftProps {
  /** "up" moves against the scroll (rises faster), "down" lags behind it. */
  readonly direction?: "up" | "down";
  readonly strength?: "subtle" | "strong";
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Scroll-linked depth: the content travels a short, fixed distance as it
 * crosses the viewport. CSS only; static where unsupported or under reduced
 * motion. Use on images, never on text the reader is following.
 */
export function Drift({
  direction = "up",
  strength = "subtle",
  className,
  children,
}: DriftProps) {
  return (
    <div className={cx(styles.drift, styles[direction], styles[strength], className)}>
      {children}
    </div>
  );
}
