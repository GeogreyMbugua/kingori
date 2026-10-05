import { describe, expect, it } from "vitest";
import {
  parseAllowIndexing,
  parseBasePath,
  parseDesignSystemPreview,
  parseSiteUrl,
} from "@/config/site";

describe("parseBasePath", () => {
  it("is empty when unset", () => {
    expect(parseBasePath(undefined)).toBe("");
    expect(parseBasePath("")).toBe("");
  });

  it("accepts a leading-slash path without a trailing slash", () => {
    expect(parseBasePath("/kingori")).toBe("/kingori");
  });

  it("rejects malformed paths", () => {
    expect(() => parseBasePath("kingori")).toThrow();
    expect(() => parseBasePath("/kingori/")).toThrow();
  });
});

describe("parseSiteUrl", () => {
  it("falls back to localhost when unset", () => {
    expect(parseSiteUrl(undefined)).toBe("http://localhost:3000");
    expect(parseSiteUrl("")).toBe("http://localhost:3000");
  });

  it("normalises to an origin without trailing slash or path", () => {
    expect(parseSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(parseSiteUrl("https://example.com/some/path")).toBe("https://example.com");
  });

  it("fails fast on an invalid URL", () => {
    expect(() => parseSiteUrl("not a url")).toThrow();
  });
});

describe("parseAllowIndexing", () => {
  it('only enables indexing for the exact value "true"', () => {
    expect(parseAllowIndexing("true")).toBe(true);
    expect(parseAllowIndexing("TRUE")).toBe(false);
    expect(parseAllowIndexing("1")).toBe(false);
    expect(parseAllowIndexing(undefined)).toBe(false);
  });
});

describe("parseDesignSystemPreview", () => {
  it("is always on outside production", () => {
    expect(parseDesignSystemPreview(undefined, "development")).toBe(true);
    expect(parseDesignSystemPreview(undefined, "test")).toBe(true);
  });

  it('is off in production unless explicitly "true"', () => {
    expect(parseDesignSystemPreview(undefined, "production")).toBe(false);
    expect(parseDesignSystemPreview("1", "production")).toBe(false);
    expect(parseDesignSystemPreview("true", "production")).toBe(true);
  });
});
