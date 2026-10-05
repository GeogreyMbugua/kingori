import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Reveal.module.css";

interface RevealProps {
  readonly as?: "div" | "section" | "figure" | "li";
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Scroll-linked entrance (short rise + fade) using CSS scroll-driven
 * animations: zero JavaScript. Content is fully visible where unsupported or
 * when the user prefers reduced motion. Use for editorial moments, not
 * every block.
 */
export function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  return <Tag className={cx(styles.reveal, className)}>{children}</Tag>;
}
