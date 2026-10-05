import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IndexList } from "@/components/editorial/IndexList";
import { MediaSlot } from "@/components/media/MediaSlot";
import { contactContent } from "@/content/contact";
import { mediaItems } from "@/content/media";
import { projects } from "@/content/work";
import { ContactPage } from "@/features/contact/ContactPage";
import { HomePage } from "@/features/home/HomePage";
import { MediaDetail } from "@/features/media/MediaDetail";
import { ProjectDetail } from "@/features/work/ProjectDetail";
import { WorkIndex } from "@/features/work/WorkIndex";

function headingLevels(container: HTMLElement): number[] {
  return [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
}

function expectNoSkippedLevels(container: HTMLElement) {
  const levels = headingLevels(container);
  expect(levels[0]).toBe(1);
  levels.forEach((level, index) => {
    if (index > 0) expect(level - (levels[index - 1] ?? 1)).toBeLessThanOrEqual(1);
  });
}

describe("MediaSlot", () => {
  it("reserves the composition ratio with a labelled placeholder while the asset is pending", () => {
    const { container } = render(
      <MediaSlot
        slot={{ kind: "pending", media: "image", description: "Lead photograph" }}
        ratio="3:2"
        sizes="100vw"
      />,
    );
    expect(screen.getByText("Lead photograph · 3:2")).toBeTruthy();
    expect((container.querySelector("[style]") as HTMLElement).style.aspectRatio).toBe("3 / 2");
    expect(container.querySelector("img")).toBeNull();
  });

  it("renders the real image cropped to the same ratio once supplied", () => {
    render(
      <MediaSlot
        slot={{ kind: "image", src: "/a.jpg", width: 1200, height: 800, alt: "A photograph" }}
        ratio="3:2"
        sizes="100vw"
      />,
    );
    const img = screen.getByRole("img", { name: "A photograph" });
    expect((img.parentElement as HTMLElement).style.aspectRatio).toBe("3 / 2");
  });
});

describe("IndexList", () => {
  it("numbers entries visually but names each link by its title alone", () => {
    render(
      <IndexList
        entries={[
          { href: "/work", title: "First", kind: "Design", meta: "2026" },
          { href: "/media", title: "Second", kind: "Writing", meta: "2025" },
        ]}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(within(items[0]!).getByRole("link").textContent).toBe("First");
    expect(within(items[0]!).getByRole("heading", { level: 3 }).textContent).toBe("First");
  });
});

describe("page compositions", () => {
  it("homepage keeps a single h1 and an unbroken heading outline", () => {
    const { container } = render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expectNoSkippedLevels(container);
    expect(screen.getByRole("link", { name: contactContent.invitation }).getAttribute("href")).toBe(
      "/contact",
    );
  });

  it("work index presents every project as a labelled article", () => {
    render(<WorkIndex />);
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    for (const project of projects) {
      expect(screen.getByRole("article", { name: project.title })).toBeTruthy();
    }
  });

  it.each(projects.map((project) => [project.slug, project] as const))(
    "project %s follows its content shape",
    (_slug, project) => {
      const { container } = render(<ProjectDetail project={project} />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(project.title);
      expectNoSkippedLevels(container);

      expect(container.querySelector("blockquote") !== null).toBe(Boolean(project.statement));
      for (const [field, label] of [
        ["challenge", "Challenge"],
        ["approach", "Approach"],
        ["outcome", "Outcome"],
      ] as const) {
        expect(screen.queryByRole("heading", { name: label }) !== null).toBe(Boolean(project[field]));
      }
    },
  );

  it.each(mediaItems.map((item) => [item.slug, item] as const))(
    "media %s keeps one h1 and machine-readable dates",
    (_slug, item) => {
      const { container } = render(<MediaDetail item={item} />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(item.title);
      expectNoSkippedLevels(container);
      expect(container.querySelector(`time[datetime="${item.publishedAt}"]`)).not.toBeNull();
    },
  );

  it("contact page makes the primary channel the obvious action", () => {
    render(<ContactPage />);
    const link = screen.getByRole("link", { name: contactContent.primary.value });
    expect(link.getAttribute("href")).toBe(contactContent.primary.href);
  });
});
