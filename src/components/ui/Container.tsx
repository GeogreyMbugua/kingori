import type { ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Container.module.css";

export type ContainerWidth = "reading" | "content" | "wide";

interface ContainerProps {
  readonly children: ReactNode;
  /** reading ≈ 66ch text column · content: default page width · wide: editorial spreads */
  readonly width?: ContainerWidth;
  readonly className?: string;
}

export function Container({ children, width = "content", className }: ContainerProps) {
  return <div className={cx(styles.container, styles[width], className)}>{children}</div>;
}
