import { describe, expect, it } from "vitest";
import { seoDefaults } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata, createRootMetadata } from "@/lib/metadata";

describe("createPageMetadata", () => {
  it("sets an absolute canonical URL and matching Open Graph URL", () => {
    const metadata = createPageMetadata({ title: "About", path: "/about" });
    const expected = `${siteConfig.url}/about`;

    expect(metadata.alternates?.canonical).toBe(expected);
    expect(metadata.openGraph).toMatchObject({ url: expected, title: "About" });
  });

  it("re-applies shared Open Graph fields because Next.js merges metadata shallowly", () => {
    const metadata = createPageMetadata({ title: "Work", path: "/work" });

    expect(metadata.openGraph).toMatchObject({
      siteName: siteConfig.name,
      type: seoDefaults.openGraphType,
    });
  });

  it("omits the title so the homepage inherits the site default", () => {
    const metadata = createPageMetadata({ path: "/" });

    expect(metadata).not.toHaveProperty("title");
    expect(metadata.openGraph).toMatchObject({ title: seoDefaults.defaultTitle });
  });

  it("falls back to the default description", () => {
    expect(createPageMetadata({ path: "/contact" }).description).toBe(seoDefaults.description);
  });
});

describe("createRootMetadata", () => {
  it("defaults to noindex when indexing has not been explicitly enabled", () => {
    expect(siteConfig.allowIndexing).toBe(false);
    expect(createRootMetadata().robots).toEqual({ index: false, follow: false });
  });
});
