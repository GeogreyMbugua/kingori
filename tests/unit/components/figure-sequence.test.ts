import { describe, expect, it } from "vitest";
import { placeFigures } from "@/components/editorial/FigureSequence";
import type { EditorialFigure } from "@/types/content";
import type { AspectRatio } from "@/types/media";

const figure = (ratio: AspectRatio): EditorialFigure => ({
  asset: { kind: "pending", media: "image", description: "x" },
  ratio,
});

describe("placeFigures", () => {
  it("runs landscape frames wide and pairs consecutive upright frames", () => {
    expect(placeFigures(["21:9", "4:5", "4:5", "16:9"].map((r) => figure(r as AspectRatio)))).toEqual([
      "wide",
      "pair-first",
      "pair-second",
      "wide",
    ]);
  });

  it("never leaves an upright frame paired with nothing", () => {
    expect(placeFigures(["3:4", "3:2", "1:1"].map((r) => figure(r as AspectRatio)))).toEqual([
      "single",
      "wide",
      "single",
    ]);
  });

  it("starts a new pair after three uprights in a row", () => {
    expect(placeFigures(["4:5", "4:5", "4:5"].map((r) => figure(r as AspectRatio)))).toEqual([
      "pair-first",
      "pair-second",
      "single",
    ]);
  });
});
