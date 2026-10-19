import { describe, expect, it } from "vitest";
import { getMediaItemBySlug, mediaItems } from "@/content/media";
import { assertLaunchReady, findPlaceholderContent } from "@/content/status";
import { getUpcomingShows, shows } from "@/content/shows";
import { getProjectBySlug, getRelatedProjects, projects } from "@/content/work";

describe("content integrity", () => {
  it("uses unique, URL-safe slugs", () => {
    for (const slugs of [
      projects.map((p) => p.slug),
      mediaItems.map((m) => m.slug),
      shows.map((s) => s.slug),
    ]) {
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("only relates projects that exist, and never a project to itself", () => {
    for (const project of projects) {
      for (const slug of project.relatedSlugs ?? []) {
        expect(getProjectBySlug(slug), `${project.slug} → ${slug}`).toBeDefined();
        expect(slug).not.toBe(project.slug);
      }
      expect(getRelatedProjects(project)).toHaveLength(project.relatedSlugs?.length ?? 0);
    }
  });

  it("links media to projects that exist", () => {
    for (const item of mediaItems) {
      if (item.relatedProjectSlug) {
        expect(getProjectBySlug(item.relatedProjectSlug), item.slug).toBeDefined();
      }
    }
  });

  it("keeps verified YouTube facts and does not claim a viewing rank", () => {
    const couples = getMediaItemBySlug("the-money-game");
    expect(couples?.title).toBe("Here's Where Couples Lose The Money Game");
    expect(couples?.credits?.map((credit) => credit.name)).toEqual(["Mbira Rimi"]);
    expect(couples?.slug).toBe("the-money-game");
    expect(getMediaItemBySlug("what-people-with-money-never-tell-you")?.durationMinutes).toBe(88);

    for (const item of mediaItems) {
      expect(item.context ?? "").not.toMatch(/most watched/i);
      expect(item.summary).not.toMatch(/^With .+\.$/);
    }
  });

  it("gives articles a body and films or galleries something to show", () => {
    for (const item of mediaItems) {
      if (item.format === "article") expect(item.body, item.slug).toBeDefined();
      if (item.format === "video") expect(item.asset, item.slug).toBeDefined();
      if (item.format === "gallery") expect(item.figures?.length, item.slug).toBeGreaterThan(0);
    }
    expect(getMediaItemBySlug("does-not-exist")).toBeUndefined();
  });

  it("gives every on-sale show a ticket link and valid dates", () => {
    for (const show of shows) {
      if (show.availability === "on-sale") expect(show.ticketUrl, show.slug).toBeDefined();
      expect(Number.isNaN(Date.parse(show.date)), show.slug).toBe(false);
      if (show.time) expect(show.time, show.slug).toMatch(/^([01]\d|2[0-3]):[0-5]\d$/);
    }
  });

  it("lists upcoming shows soonest first and drops past dates", () => {
    const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));
    const [first, second] = sorted;
    expect(getUpcomingShows("1900-01-01")).toEqual(sorted);
    expect(getUpcomingShows("9999-12-31")).toEqual([]);
    if (first && second) {
      expect(getUpcomingShows(second.date)).not.toContain(first);
    }
  });
});

describe("launch guard", () => {
  it("reports every placeholder entry, including those waiting on assets", () => {
    const pending = findPlaceholderContent();
    for (const project of projects.filter((p) => p.status === "placeholder")) {
      expect(pending).toContain(`work/${project.slug}`);
    }
    for (const item of mediaItems.filter((m) => m.status === "placeholder")) {
      expect(pending).toContain(`media/${item.slug}`);
    }
    for (const show of shows.filter((s) => s.status === "placeholder")) {
      expect(pending).toContain(`shows/${show.slug}`);
    }
  });

  it("allows building with indexing disabled, whatever the content", () => {
    expect(() => assertLaunchReady(false)).not.toThrow();
  });

  it("refuses to enable indexing while placeholder content remains", () => {
    expect(findPlaceholderContent().length).toBeGreaterThan(0);
    expect(() => assertLaunchReady(true)).toThrow(/placeholder content remains/);
  });
});
