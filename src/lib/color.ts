export type Rgb = readonly [number, number, number];

/** Parses "#rrggbb" or computed-style "rgb(r, g, b)" / "rgb(r g b)" strings. */
export function parseColor(value: string): Rgb {
  const trimmed = value.trim();

  const hex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(trimmed);
  if (hex) return [parseInt(hex[1]!, 16), parseInt(hex[2]!, 16), parseInt(hex[3]!, 16)];

  const rgb = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i.exec(trimmed);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];

  throw new Error(`Unsupported colour format: ${value}`);
}

function relativeLuminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** WCAG 2.x contrast ratio, from 1 to 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (light + 0.05) / (dark + 0.05);
}

export function toHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}
