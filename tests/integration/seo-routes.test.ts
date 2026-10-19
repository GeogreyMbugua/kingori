import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { mediaItems } from "@/content/media";
import { shows } from "@/content/shows";
import { projects } from "@/content/work";

describe("sitemap.xml", () => {
  it("lists the homepage and every primary navigation route as absolute URLs", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(`${siteConfig.url}/`);
    for (const item of primaryNavigation) {
      expect(urls).toContain(`${siteConfig.url}${item.href}`);
    }
  });

  it("omits placeholder media, fictional projects and fictional shows", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const item of mediaItems) {
      const url = `${siteConfig.url}/media/${item.slug}`;
      if (item.status === "final") expect(urls).toContain(url);
      else expect(urls).not.toContain(url);
    }
    for (const project of projects) {
      expect(urls).not.toContain(`${siteConfig.url}/work/${project.slug}`);
    }
    expect(urls).not.toContain(`${siteConfig.url}/work`);
    expect(urls).not.toContain(`${siteConfig.url}/shows`);
    for (const show of shows) {
      expect(urls).not.toContain(`${siteConfig.url}/shows/${show.slug}`);
    }
  });
});

describe("robots.txt", () => {
  it("disallows all crawling unless indexing is explicitly enabled", () => {
    expect(siteConfig.allowIndexing).toBe(false);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});
