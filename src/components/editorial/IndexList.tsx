import type { Route } from "next";
import { Link } from "@/components/ui/Link";
import { cx } from "@/lib/classnames";
import styles from "./IndexList.module.css";

export interface IndexListEntry {
  readonly href: Route;
  readonly title: string;
  /** Serif-italic descriptor, e.g. a category. */
  readonly kind: string;
  /** Right-aligned metadata, e.g. a year. */
  readonly meta: string;
}

interface IndexListProps {
  readonly entries: readonly IndexListEntry[];
  /** "lg" for a primary index (homepage), "md" for supporting lists (related work). */
  readonly size?: "lg" | "md";
  /** Heading level for entry titles, continuing the page outline. */
  readonly headingLevel?: "h2" | "h3";
  /** First number shown, when the list continues a sequence started elsewhere on the page. */
  readonly start?: number;
  readonly className?: string;
}

/**
 * A numbered typographic index: titles as the visual material, not cards.
 * The whole row is the link target; the title carries the accessible name.
 */
export function IndexList({
  entries,
  size = "lg",
  headingLevel: Heading = "h3",
  start = 1,
  className,
}: IndexListProps) {
  return (
    <ol role="list" className={cx(styles.list, styles[size], className)}>
      {entries.map((entry, index) => (
        <li key={entry.href} className={styles.row}>
          <span data-type="meta" className={styles.number} aria-hidden="true">
            {String(index + start).padStart(2, "0")}
          </span>
          <Heading data-type={size === "lg" ? "heading-xl" : "h2"} className={styles.title}>
            <Link href={entry.href} className={styles.link}>
              {entry.title}
            </Link>
          </Heading>
          <p className={styles.details}>
            <span className={styles.kind}>{entry.kind}</span>
            <span data-type="meta">{entry.meta}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}
