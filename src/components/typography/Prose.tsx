import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Prose.module.css";

interface ProseProps {
  readonly className?: string;
  readonly children: ReactNode;
}

/** Long-form reading container: measure, paragraph rhythm and list styling. */
export function Prose({ className, children }: ProseProps) {
  return <div className={cx(styles.prose, className)}>{children}</div>;
}
