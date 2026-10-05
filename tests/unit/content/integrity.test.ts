import { describe, expect, it } from "vitest";
import { getMediaItemBySlug, mediaItems } from "@/content/media";
import { assertLaunchReady, findPlaceholderContent } from "@/content/status";
import { getProjectBySlug, getRelatedProjects, projects } from "@/content/work";

describe("content integrity", () => {
  it("uses unique, URL-safe slugs", () => {
    for (const slugs of [projects.map((p) => p.slug), mediaItems.map((m) => m.slug)]) {
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

  it("gives articles a body and films or galleries something to show", () => {
    for (const item of mediaItems) {
      if (item.format === "article") expect(item.body, item.slug).toBeDefined();
      if (item.format === "video") expect(item.asset, item.slug).toBeDefined();
      if (item.format === "gallery") expect(item.figures?.length, item.slug).toBeGreaterThan(0);
    }
    expect(getMediaItemBySlug("does-not-exist")).toBeUndefined();
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
  });

  it("allows building with indexing disabled, whatever the content", () => {
    expect(() => assertLaunchReady(false)).not.toThrow();
  });

  it("refuses to enable indexing while placeholder content remains", () => {
    expect(findPlaceholderContent().length).toBeGreaterThan(0);
    expect(() => assertLaunchReady(true)).toThrow(/placeholder content remains/);
  });
});
