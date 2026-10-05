import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

describe("sitemap.xml", () => {
  it("lists the homepage and every primary navigation route as absolute URLs", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteConfig.url}/`);
    for (const item of primaryNavigation) {
      expect(urls).toContain(`${siteConfig.url}${item.href}`);
    }
  });
});

describe("robots.txt", () => {
  it("disallows all crawling unless indexing is explicitly enabled", () => {
    expect(siteConfig.allowIndexing).toBe(false);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});
