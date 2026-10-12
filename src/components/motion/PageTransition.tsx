import * as React from "react";
import type { ReactNode } from "react";

/**
 * Crossfades page content on navigation via React's <ViewTransition>, which
 * ships with the Next.js App Router runtime. Plain React (unit tests) lacks
 * it, so content renders unwrapped there. Animations: styles/animations.css.
 */
export function PageTransition({ children }: { readonly children: ReactNode }) {
  const ViewTransition = React.ViewTransition as typeof React.ViewTransition | undefined;
  if (!ViewTransition) return <>{children}</>;
  return <ViewTransition default="page">{children}</ViewTransition>;
}
