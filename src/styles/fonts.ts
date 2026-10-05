import localFont from "next/font/local";

/*
 * Self-hosted, subset variable fonts (Latin + Latin Extended-A, so Gĩkũyũ
 * ĩ/ũ render natively). Sources and subsetting: docs/adr/0007-typography.md.
 */

export const bricolage = localFont({
  src: "../assets/fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage",
  weight: "400 800",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

/* Roman and italic share one family so <em> never falls back to faux italic. */
export const newsreader = localFont({
  src: [
    { path: "../assets/fonts/Newsreader-Variable.woff2", weight: "400 600", style: "normal" },
    { path: "../assets/fonts/Newsreader-Italic-Variable.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

export const fontVariables = `${bricolage.variable} ${newsreader.variable}`;
