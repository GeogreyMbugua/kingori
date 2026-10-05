import type { Route } from "next";

export interface NavigationItem {
  readonly label: string;
  readonly href: Route;
}

/**
 * "page": the current URL is exactly this item.
 * "section": the current URL is nested beneath this item (e.g. /work/[slug]).
 */
export type NavigationMatch = "page" | "section" | null;
