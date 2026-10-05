import { describe, expect, it } from "vitest";
import staticImageLoader from "@/lib/image-loader";
import { absoluteUrl, withBasePath } from "@/lib/url";

describe("absoluteUrl", () => {
  it("joins a path to the origin at the root", () => {
    expect(absoluteUrl("/work", "https://example.com", { basePath: "" })).toBe(
      "https://example.com/work",
    );
  });

  it("keeps the base path a sub-path deployment is served under", () => {
    expect(absoluteUrl("/work", "https://example.github.io", { basePath: "/kingori" })).toBe(
      "https://example.github.io/kingori/work",
    );
  });

  it("adds a trailing slash to routes, not files, for static hosts", () => {
    const options = { basePath: "/kingori", trailingSlash: true };
    expect(absoluteUrl("/work", "https://example.github.io", options)).toBe(
      "https://example.github.io/kingori/work/",
    );
    expect(absoluteUrl("/", "https://example.github.io", options)).toBe(
      "https://example.github.io/kingori/",
    );
    expect(absoluteUrl("/sitemap.xml", "https://example.github.io", options)).toBe(
      "https://example.github.io/kingori/sitemap.xml",
    );
  });
});

describe("withBasePath", () => {
  it("prefixes root-relative paths only", () => {
    expect(withBasePath("/videos/a.mp4", "/kingori")).toBe("/kingori/videos/a.mp4");
    expect(withBasePath("https://cdn.example.com/a.mp4", "/kingori")).toBe(
      "https://cdn.example.com/a.mp4",
    );
    expect(withBasePath("//cdn.example.com/a.mp4", "/kingori")).toBe("//cdn.example.com/a.mp4");
  });
});

describe("staticImageLoader", () => {
  it("returns the source unchanged when no base path is configured", () => {
    expect(staticImageLoader({ src: "/images/a.webp", width: 640 })).toBe("/images/a.webp");
  });
});
