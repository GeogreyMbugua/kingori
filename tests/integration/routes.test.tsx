import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import AboutRoute from "@/app/(site)/about/page";
import ContactRoute from "@/app/(site)/contact/page";
import MediaRoute from "@/app/(site)/media/page";
import HomeRoute from "@/app/(site)/page";
import WorkRoute from "@/app/(site)/work/page";
import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { homeContent } from "@/content/home";
import { mediaContent, mediaItems } from "@/content/media";
import { projects, workContent } from "@/content/work";

const staticRoutes: ReadonlyArray<[string, ComponentType, string]> = [
  ["/", HomeRoute, homeContent.title],
  ["/about", AboutRoute, aboutContent.title],
  ["/work", WorkRoute, workContent.title],
  ["/media", MediaRoute, mediaContent.title],
  ["/contact", ContactRoute, contactContent.title],
];

describe("static routes", () => {
  it.each(staticRoutes)("%s renders exactly one h1 sourced from content", (_path, Route, title) => {
    render(<Route />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toBe(title);
  });
});

describe("collection routes", () => {
  it.runIf(projects.length === 0)("/work shows the empty state when no projects exist", () => {
    render(<WorkRoute />);
    screen.getByText(workContent.emptyMessage);
  });

  it.runIf(mediaItems.length === 0)("/media shows the empty state when no media exists", () => {
    render(<MediaRoute />);
    screen.getByText(mediaContent.emptyMessage);
  });
});
