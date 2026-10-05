import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GridItem } from "@/components/layout/Grid";
import { EditorialQuote } from "@/components/typography/EditorialQuote";
import { GiantTitle } from "@/components/typography/GiantTitle";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";

describe("Button", () => {
  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" }).getAttribute("type")).toBe("button");
  });

  it("does not fire clicks when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    button.click();
    expect(button).toHaveProperty("disabled", true);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Link", () => {
  it("renders internal and external hrefs as plain same-tab anchors", () => {
    render(
      <>
        <Link href="/about">About</Link>
        <Link href="https://example.com">Elsewhere</Link>
      </>,
    );
    expect(screen.getByRole("link", { name: "About" }).getAttribute("href")).toBe("/about");
    const external = screen.getByRole("link", { name: "Elsewhere" });
    expect(external.getAttribute("href")).toBe("https://example.com");
    expect(external.hasAttribute("target")).toBe(false);
  });

  it("keeps the CTA arrow out of the accessible name", () => {
    render(
      <Link href="/work" variant="cta">
        See the work
      </Link>,
    );
    const link = screen.getByRole("link", { name: "See the work" });
    expect(link.querySelector('[aria-hidden="true"]')?.textContent).toBe("→");
  });

  it("forwards aria-current", () => {
    render(
      <Link href="/work" variant="nav" aria-current="page">
        Work
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Work" }).getAttribute("aria-current")).toBe("page");
  });
});

describe("GiantTitle", () => {
  it("hides decorative giant type from assistive technology", () => {
    const { container } = render(<GiantTitle decorative>Backdrop</GiantTitle>);
    expect(container.querySelector("p")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("can be the page heading", () => {
    render(<GiantTitle as="h1">Title</GiantTitle>);
    expect(screen.getByRole("heading", { level: 1, name: "Title" }).dataset.type).toBe("giant");
  });
});

describe("EditorialQuote", () => {
  it("renders figure > blockquote with a figcaption citing the source", () => {
    const { container } = render(
      <EditorialQuote attribution="A. Person" source="A Work" cite="https://example.com/source">
        Quoted words.
      </EditorialQuote>,
    );
    const figure = container.querySelector("figure");
    expect(figure?.querySelector("blockquote")?.getAttribute("cite")).toBe(
      "https://example.com/source",
    );
    expect(figure?.querySelector("figcaption")?.textContent).toBe("A. Person, A Work");
    expect(figure?.querySelector("cite")?.textContent).toBe("A Work");
  });

  it("omits the figcaption when there is no attribution or source", () => {
    const { container } = render(<EditorialQuote>Quoted words.</EditorialQuote>);
    expect(container.querySelector("figcaption")).toBeNull();
  });
});

describe("Section", () => {
  it("maps surfaces to data-surface and names the region from its heading", () => {
    render(
      <Section surface="inverse" labelledBy="s-heading" label="Label">
        <h2 id="s-heading">Heading</h2>
      </Section>,
    );
    const region = screen.getByRole("region", { name: "Heading" });
    expect(region.dataset.surface).toBe("inverse");
    expect(region.querySelector('[data-type="eyebrow"]')?.textContent).toBe("Label");
  });

  it("does not set data-surface for the raised tone", () => {
    const { container } = render(<Section surface="raised">Content</Section>);
    expect(container.querySelector("section")?.hasAttribute("data-surface")).toBe(false);
  });
});

describe("GridItem", () => {
  it("exposes spans and starts as per-tier custom properties", () => {
    const { container } = render(
      <GridItem span={{ base: 4, desktop: 6 }} start={{ desktop: 7 }}>
        Cell
      </GridItem>,
    );
    const style = (container.firstElementChild as HTMLElement).style;
    expect(style.getPropertyValue("--span-base")).toBe("4");
    expect(style.getPropertyValue("--span-desktop")).toBe("6");
    expect(style.getPropertyValue("--start-desktop")).toBe("7");
    expect(style.getPropertyValue("--span-tablet")).toBe("");
  });
});
