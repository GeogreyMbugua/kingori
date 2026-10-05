import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BREAKPOINTS } from "@/lib/breakpoints";

const SRC_DIR = join(process.cwd(), "src");
const WIDTH_QUERY = /\((?:min|max)-width:\s*([\d.]+)([a-z]+)\)/g;

function collectCssFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectCssFiles(path);
    return entry.name.endsWith(".css") ? [path] : [];
  });
}

describe("CSS breakpoints", () => {
  const allowed = new Set<number>(Object.values(BREAKPOINTS));
  const cssFiles = collectCssFiles(SRC_DIR);

  it.each(cssFiles.map((file) => [file.replace(`${SRC_DIR}/`, ""), file]))(
    "%s only uses breakpoints defined in src/lib/breakpoints.ts",
    (_label, file) => {
      const css = readFileSync(file, "utf8");

      for (const [query, value, unit] of css.matchAll(WIDTH_QUERY)) {
        expect(unit, `${query} must use em`).toBe("em");
        expect(allowed.has(Number(value)), `${query} is not a project breakpoint`).toBe(true);
      }
    },
  );
});
