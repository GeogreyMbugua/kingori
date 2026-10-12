import type { IsoDate, Show, ShowsContent } from "@/types/content";

export const showsContent: ShowsContent = {
  status: "placeholder",
  title: "Shows",
  description: "Live dates and appearances by Kingori.",
  intro:
    "A short line framing the live work: what an evening with Kingori is, and where it travels next.",
  emptyMessage: "No dates are announced yet. New shows appear here first.",
  pastMessage: "Every listed date has passed. New shows appear here first.",
  feature: { kind: "pending", media: "image", description: "Kingori on stage, crowd in frame" },
  marquee: "On tour",
};

/**
 * Development dataset: four placeholder dates covering every availability
 * state. Cities, venues and links are stand-ins, not announcements. Replace
 * entry by entry with confirmed dates; `example.com` marks fake ticket links.
 *
 * Order does not matter: pages sort by date.
 */
export const shows: readonly Show[] = [
  {
    status: "placeholder",
    slug: "first-date",
    date: "2026-11-14",
    time: "20:00",
    city: "Host city",
    country: "Country",
    venue: "Venue name",
    kind: "Stand-up",
    availability: "on-sale",
    ticketUrl: "https://example.com/tickets/first-date",
  },
  {
    status: "placeholder",
    slug: "second-date",
    date: "2026-12-05",
    city: "Second city",
    country: "Country",
    venue: "Theatre name",
    kind: "Stand-up",
    availability: "sold-out",
  },
  {
    status: "placeholder",
    slug: "third-date",
    date: "2027-01-23",
    time: "19:30",
    city: "Festival city",
    country: "Country",
    venue: "Festival stage",
    kind: "Festival",
    availability: "announced",
  },
  {
    status: "placeholder",
    slug: "fourth-date",
    date: "2027-02-13",
    city: "Conference city",
    country: "Country",
    venue: "Conference hall",
    kind: "Keynote",
    availability: "cancelled",
  },
];

export const SHOW_AVAILABILITY_LABELS = {
  announced: "Tickets soon",
  "on-sale": "Tickets",
  "sold-out": "Sold out",
  cancelled: "Cancelled",
} as const satisfies Record<Show["availability"], string>;

/** Dates on or after `today`, soonest first. Static builds evaluate this at build time. */
export function getUpcomingShows(today: IsoDate = todayIso()): readonly Show[] {
  return [...shows].filter((show) => show.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

function todayIso(): IsoDate {
  return new Date().toISOString().slice(0, 10) as IsoDate;
}
