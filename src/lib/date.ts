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

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export interface DateParts {
  readonly weekday: string;
  readonly day: string;
  readonly month: string;
  readonly year: string;
}

/** "2026-11-14" → { weekday: "Sat", day: "14", month: "Nov", year: "2026" }, for stacked date blocks. */
export function getDateParts(date: IsoDate): DateParts {
  const parts = partsFormatter.formatToParts(new Date(`${date}T00:00:00Z`));
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return { weekday: pick("weekday"), day: pick("day"), month: pick("month"), year: pick("year") };
}

/** Minutes → ISO 8601 duration for <time dateTime>, e.g. 9 → "PT9M". */
export function toIsoDuration(minutes: number): string {
  return `PT${minutes}M`;
}
