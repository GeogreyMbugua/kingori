import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MAIN_CONTENT_ID, PageShell } from "@/components/layout/PageShell";
import { primaryNavigation } from "@/config/navigation";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

function renderShell() {
  return render(
    <PageShell siteName="Site" navigation={primaryNavigation}>
      <h1>Page heading</h1>
    </PageShell>,
  );
}

describe("PageShell", () => {
  beforeEach(() => {
    navigation.pathname = "/";
  });

  it("renders the skip link as the first focusable element, targeting main", () => {
    const { container } = renderShell();

    const firstLink = container.querySelector("a");
    expect(firstLink?.textContent).toBe("Skip to main content");
    expect(firstLink?.getAttribute("href")).toBe(`#${MAIN_CONTENT_ID}`);

    const main = screen.getByRole("main");
    expect(main.id).toBe(MAIN_CONTENT_ID);
    expect(main.getAttribute("tabindex")).toBe("-1");
  });

  it("exposes banner, labelled primary navigation, main and contentinfo landmarks", () => {
    renderShell();

    screen.getByRole("banner");
    screen.getByRole("contentinfo");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(
      primaryNavigation.map((item) => item.label),
    );
  });

  it('marks the exact current page with aria-current="page"', () => {
    navigation.pathname = "/about";
    renderShell();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "About" }).getAttribute("aria-current")).toBe(
      "page",
    );
    expect(within(nav).getByRole("link", { name: "Work" }).hasAttribute("aria-current")).toBe(
      false,
    );
  });

  it("marks the parent section on nested routes without claiming the exact page", () => {
    navigation.pathname = "/work/example";
    renderShell();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Work" }).getAttribute("aria-current")).toBe(
      "true",
    );
  });
});
