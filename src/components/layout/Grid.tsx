import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/classnames";
import styles from "./Grid.module.css";

/* Column counts per tier: 4 mobile, 8 tablet, 12 desktop/wide (tokens.css). */
type MobileColumn = 1 | 2 | 3 | 4;
type TabletColumn = MobileColumn | 5 | 6 | 7 | 8;
type DesktopColumn = TabletColumn | 9 | 10 | 11 | 12;

interface ResponsiveColumns {
  readonly base?: MobileColumn;
  readonly tablet?: TabletColumn;
  readonly desktop?: DesktopColumn;
  readonly wide?: DesktopColumn;
}

interface GridProps {
  readonly as?: "div" | "ul" | "ol";
  readonly className?: string;
  readonly children: ReactNode;
}

/** The site grid. Children are GridItems; items without spans fill the row. */
export function Grid({ as: Tag = "div", className, children }: GridProps) {
  return (
    <Tag role={Tag === "div" ? undefined : "list"} className={cx(styles.grid, className)}>
      {children}
    </Tag>
  );
}

interface GridItemProps {
  readonly as?: "div" | "li" | "figure" | "article";
  /** Columns to span per tier; unset tiers inherit from the tier below. */
  readonly span?: ResponsiveColumns;
  /**
   * 1-based start column per tier, for asymmetric compositions. Starts do not
   * inherit across tiers with different column counts (wide inherits desktop).
   * Keep start + span − 1 within the tier's columns.
   */
  readonly start?: ResponsiveColumns;
  readonly className?: string;
  readonly children: ReactNode;
}

const TIERS = ["base", "tablet", "desktop", "wide"] as const;

export function GridItem({ as: Tag = "div", span, start, className, children }: GridItemProps) {
  const style: Record<`--${string}`, number> = {};
  for (const tier of TIERS) {
    const spanValue = span?.[tier];
    const startValue = start?.[tier];
    if (spanValue) style[`--span-${tier}`] = spanValue;
    if (startValue) style[`--start-${tier}`] = startValue;
  }

  return (
    <Tag className={cx(styles.item, className)} style={style as CSSProperties}>
      {children}
    </Tag>
  );
}
