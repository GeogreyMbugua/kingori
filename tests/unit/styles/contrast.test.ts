import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { contrastRatio, parseColor } from "@/lib/color";

const TOKENS_CSS = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");

type Declarations = Map<string, string>;

function readBlock(selector: string): Declarations {
  const start = TOKENS_CSS.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Selector ${selector} not found in tokens.css`);

  let depth = 0;
  let end = start;
  for (let i = TOKENS_CSS.indexOf("{", start); i < TOKENS_CSS.length; i++) {
    if (TOKENS_CSS[i] === "{") depth++;
    if (TOKENS_CSS[i] === "}" && --depth === 0) {
      end = i;
      break;
    }
  }

  const body = TOKENS_CSS.slice(start, end).replace(/\/\*[\s\S]*?\*\//g, "");
  return new Map(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name as string,
      (value as string).trim(),
    ]),
  );
}

const brand = readBlock(":root");
const defaultSurface = readBlock('[data-surface="default"]');
const surfaces = {
  default: defaultSurface,
  inverse: readBlock('[data-surface="inverse"]'),
} as const;

/** Mirrors CSS inheritance: surface scope, then default semantics, then brand primitives. */
function resolve(token: string, scope: Declarations): string {
  const value = scope.get(token) ?? defaultSurface.get(token) ?? brand.get(token);
  if (!value) throw new Error(`Token --${token} is not defined`);

  const reference = /^var\(--([\w-]+)\)$/.exec(value);
  if (reference) return resolve(reference[1] as string, scope);
  if (!/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`--${token} is not a 6-digit hex: ${value}`);
  return value;
}

function contrast(a: string, b: string): number {
  return contrastRatio(parseColor(a), parseColor(b));
}

const AAA = 7;
const AA = 4.5;
const NON_TEXT = 3;

const ALL_SURFACES = ["background", "surface", "surface-raised"];
const PRIMARY_SURFACES = ["background", "surface"];

/** [foreground token, background tokens, minimum ratio] */
const CONTRACTS: ReadonlyArray<readonly [string, readonly string[], number]> = [
  ["text", [...ALL_SURFACES, "accent-subtle"], AAA],
  ["text-secondary", ALL_SURFACES, AAA],
  ["text-muted", ALL_SURFACES, AA],
  ["accent-text", [...ALL_SURFACES, "accent-subtle"], AA],
  ["accent-contrast", ["accent", "accent-hover", "accent-active"], AA],
  ["inverse-text", ["inverse-background"], AA],
  ["emphasis", PRIMARY_SURFACES, AA],
  ["success", PRIMARY_SURFACES, AA],
  ["warning", PRIMARY_SURFACES, AA],
  ["error", PRIMARY_SURFACES, AA],
  ["info", PRIMARY_SURFACES, AA],
  ["warm", PRIMARY_SURFACES, NON_TEXT],
  ["accent", PRIMARY_SURFACES, NON_TEXT],
  ["focus-ring", ALL_SURFACES, NON_TEXT],
  ["border-strong", PRIMARY_SURFACES, NON_TEXT],
  ["selection-text", ["selection-background"], AA],
];

describe.each(Object.entries(surfaces))("%s surface colour contracts", (_name, scope) => {
  const cases = CONTRACTS.flatMap(([foreground, backgrounds, minimum]) =>
    backgrounds.map((background) => [foreground, background, minimum] as const),
  );

  it.each(cases)("--color-%s on --color-%s ≥ %s:1", (foreground, background, minimum) => {
    const ratio = contrast(
      resolve(`color-${foreground}`, scope),
      resolve(`color-${background}`, scope),
    );
    expect(ratio).toBeGreaterThanOrEqual(minimum);
  });
});

describe("default surface extras", () => {
  const color = (token: string) => resolve(`color-${token}`, defaultSurface);

  it("supports AAA body text on the structural blue surface", () => {
    expect(contrast(color("text"), color("surface-structural"))).toBeGreaterThanOrEqual(AAA);
  });

  it("keeps orange (warm) at AA on every dark surface, so it can carry text", () => {
    for (const background of ALL_SURFACES) {
      expect(contrast(color("warm"), color(background))).toBeGreaterThanOrEqual(AA);
    }
  });

  it("keeps the browser theme colour in sync with the page background", () => {
    expect(siteConfig.themeColor.toLowerCase()).toBe(color("background"));
  });
});
