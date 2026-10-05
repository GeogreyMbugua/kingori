import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor, toHex } from "@/lib/color";

describe("parseColor", () => {
  it("parses hex in either case", () => {
    expect(parseColor("#C03070")).toEqual([192, 48, 112]);
    expect(parseColor(" #c03070 ")).toEqual([192, 48, 112]);
  });

  it("parses legacy and modern computed rgb() syntax", () => {
    expect(parseColor("rgb(0, 0, 48)")).toEqual([0, 0, 48]);
    expect(parseColor("rgb(0 0 48)")).toEqual([0, 0, 48]);
    expect(parseColor("rgba(240, 240, 240, 0.5)")).toEqual([240, 240, 240]);
  });

  it("rejects unsupported formats instead of guessing", () => {
    expect(() => parseColor("#fff")).toThrow(/Unsupported/);
    expect(() => parseColor("hotpink")).toThrow(/Unsupported/);
  });
});

describe("contrastRatio", () => {
  it("matches the WCAG reference extremes", () => {
    expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(contrastRatio([119, 119, 119], [119, 119, 119])).toBe(1);
  });

  it("is symmetric", () => {
    const a = parseColor("#000030");
    const b = parseColor("#F07040");
    expect(contrastRatio(a, b)).toBe(contrastRatio(b, a));
  });
});

describe("toHex", () => {
  it("round-trips with parseColor and zero-pads channels", () => {
    expect(toHex([0, 0, 48])).toBe("#000030");
    expect(toHex(parseColor("rgb(232, 232, 240)"))).toBe("#e8e8f0");
  });
});
