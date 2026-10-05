import { cx } from "@/lib/classnames";
import styles from "./EditorialQuote.module.css";

interface EditorialQuoteProps {
  readonly children: string;
  readonly attribution?: string;
  /** Title of the work or publication quoted. */
  readonly source?: string;
  readonly cite?: `https://${string}`;
  readonly className?: string;
}

export function EditorialQuote({
  children,
  attribution,
  source,
  cite,
  className,
}: EditorialQuoteProps) {
  const hasCaption = Boolean(attribution || source);

  return (
    <figure className={cx(styles.figure, className)}>
      <blockquote cite={cite} className={styles.quote}>
        <p data-type="quote" className={styles.text}>
          {children}
        </p>
      </blockquote>
      {hasCaption ? (
        <figcaption data-type="meta" className={styles.caption}>
          {attribution}
          {attribution && source ? ", " : null}
          {source ? <cite>{source}</cite> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
