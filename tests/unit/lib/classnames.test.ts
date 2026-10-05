import { describe, expect, it } from "vitest";
import { cx } from "@/lib/classnames";

describe("cx", () => {
  it("joins truthy class names and drops falsy ones", () => {
    expect(cx("a", undefined, false, null, "", "b")).toBe("a b");
  });

  it("returns an empty string when nothing applies", () => {
    expect(cx(undefined, false)).toBe("");
  });
});
