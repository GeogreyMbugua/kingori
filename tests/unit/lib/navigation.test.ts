import { describe, expect, it } from "vitest";
import { matchNavigationPath } from "@/lib/navigation";

describe("matchNavigationPath", () => {
  it("matches the exact page", () => {
    expect(matchNavigationPath("/work", "/work")).toBe("page");
  });

  it("matches nested routes as the current section", () => {
    expect(matchNavigationPath("/work/some-project", "/work")).toBe("section");
  });

  it("does not match routes that merely share a prefix", () => {
    expect(matchNavigationPath("/workshop", "/work")).toBeNull();
  });

  it("treats the home link as active only on the homepage", () => {
    expect(matchNavigationPath("/about", "/")).toBeNull();
    expect(matchNavigationPath("/", "/")).toBe("page");
  });
});
