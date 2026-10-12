import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/components/ui/Link";
import { SHOW_AVAILABILITY_LABELS } from "@/content/shows";
import { formatDate, getDateParts } from "@/lib/date";
import type { Show } from "@/types/content";
import styles from "./ShowRow.module.css";

/** One date: the day is the visual anchor, the place the heading, the ticket the action. */
export function ShowRow({ show }: { readonly show: Show }) {
  const { weekday, day, month, year } = getDateParts(show.date);
  const place = `${show.city}, ${show.country}`;
  const label = SHOW_AVAILABILITY_LABELS[show.availability];
  const unavailable = show.availability === "sold-out" || show.availability === "cancelled";

  return (
    <Reveal as="li" className={styles.row}>
      <time dateTime={show.time ? `${show.date}T${show.time}` : show.date} className={styles.date}>
        <span className={styles.srOnly}>{formatDate(show.date)}</span>
        <span aria-hidden="true" className={styles.day}>
          {day}
        </span>
        <span aria-hidden="true" data-type="meta" className={styles.month}>
          {weekday} · {month} {year}
          {show.time ? ` · ${show.time}` : null}
        </span>
      </time>
      <div className={styles.place}>
        <h3 data-type="h2" className={unavailable ? styles.struck : undefined}>
          {place}
        </h3>
        <p className={styles.venue}>
          {show.venue} <span className={styles.kind}>{show.kind}</span>
        </p>
      </div>
      <p className={styles.action}>
        {show.availability === "on-sale" && show.ticketUrl ? (
          <Link
            href={show.ticketUrl}
            variant="cta"
            aria-label={`${label} for ${place}, ${formatDate(show.date)}`}
          >
            {label}
          </Link>
        ) : (
          <span data-type="meta" className={styles.status} data-availability={show.availability}>
            {label}
          </span>
        )}
      </p>
    </Reveal>
  );
}
