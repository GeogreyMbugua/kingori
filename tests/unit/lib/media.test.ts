import { describe, expect, it } from "vitest";
import { buildSizes, getImageAlt, toCssAspectRatio, toObjectPosition } from "@/lib/media";

describe("toCssAspectRatio", () => {
  it("converts width:height to the CSS aspect-ratio syntax", () => {
    expect(toCssAspectRatio("4:5")).toBe("4 / 5");
    expect(toCssAspectRatio("21:9")).toBe("21 / 9");
  });
});

describe("toObjectPosition", () => {
  it("centres when no focal point is set", () => {
    expect(toObjectPosition(undefined)).toBe("50% 50%");
  });

  it("maps the focal point to percentages and clamps out-of-range values", () => {
    expect(toObjectPosition({ x: 70, y: 35 })).toBe("70% 35%");
    expect(toObjectPosition({ x: -10, y: 140 })).toBe("0% 100%");
  });
});

describe("buildSizes", () => {
  it("returns only the base size when no breakpoints are given", () => {
    expect(buildSizes({ base: "100vw" })).toBe("100vw");
  });

  it("orders breakpoint conditions widest first so the browser matches correctly", () => {
    expect(buildSizes({ base: "100vw", tablet: "50vw", wide: "40rem", desktop: "33vw" })).toBe(
      "(min-width: 90em) 40rem, (min-width: 64em) 33vw, (min-width: 48em) 50vw, 100vw",
    );
  });
});

describe("getImageAlt", () => {
  const dimensions = { kind: "image", src: "/images/example.webp", width: 10, height: 10 } as const;

  it("returns an empty alt for decorative images", () => {
    expect(getImageAlt({ ...dimensions, decorative: true })).toBe("");
  });

  it("returns trimmed alt text for informative images", () => {
    expect(getImageAlt({ ...dimensions, alt: "  A described image " })).toBe("A described image");
  });

  it("rejects informative images with blank alt text", () => {
    expect(() => getImageAlt({ ...dimensions, alt: "   " })).toThrow(/empty alt/);
  });
});
