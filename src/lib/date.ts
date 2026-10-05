import type { IsoDate } from "@/types/content";

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-03-14" → "14 March 2026". UTC, so the day never shifts with the server's zone. */
export function formatDate(date: IsoDate): string {
  return formatter.format(new Date(`${date}T00:00:00Z`));
}

/** Minutes → ISO 8601 duration for <time dateTime>, e.g. 9 → "PT9M". */
export function toIsoDuration(minutes: number): string {
  return `PT${minutes}M`;
}
