/**
 * Mobile-first breakpoints, in `em` so they scale with the user's font size.
 * CSS cannot read custom properties inside media queries, so stylesheets use
 * these literal values; tests/unit/breakpoints.test.ts keeps them in sync.
 *
 *   mobile   < 48em   (base styles, no media query)
 *   tablet  >= 48em   (768px at default font size)
 *   desktop >= 64em   (1024px)
 *   wide    >= 90em   (1440px)
 */
export const BREAKPOINTS = {
  tablet: 48,
  desktop: 64,
  wide: 90,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function minWidthQuery(breakpoint: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}em)`;
}
