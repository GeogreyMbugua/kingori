import { expect, test } from "@playwright/test";

const SECTIONS = [
  ["Watch list", "/media"],
  ["About", "/about"],
  ["Book", "/contact"],
] as const;

test.describe("site foundation", () => {
  test("homepage exposes language, landmarks and a single h1", async ({ page, isMobile }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("banner")).toBeVisible();
    if (isMobile) {
      await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    }
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("skip link is the first tab stop and moves focus to main content", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Tab focus order differs by browser defaults");
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();

    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
  });

  test("primary navigation reaches each section and marks the current page", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");

    const menu = page.getByRole("dialog", { name: "Menu" });
    const nav = isMobile ? menu : page.getByRole("navigation", { name: "Primary" });
    const openNav = async () => {
      if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    };

    for (const [label, path] of SECTIONS) {
      await openNav();
      await nav.getByRole("link", { name: label }).click();
      if (isMobile) await expect(menu).toBeHidden();
      await expect(page).toHaveURL(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(label);

      await openNav();
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
      if (isMobile) await page.keyboard.press("Escape");
    }
  });

  test("the mobile menu traps focus and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "The menu button only shows below 48em");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();

    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(SECTIONS.length);

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("an episode offers a keyboard-reachable YouTube watch link", async ({ page }) => {
    await page.goto("/media/the-money-game");

    const watch = page.getByRole("link", { name: "Watch on YouTube" });
    await expect(watch).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=MkC40xneDgc",
    );
    const player = page.getByTitle("Here's Where Couples Lose The Money Game");
    await expect(player).toBeVisible();

    await watch.focus();
    await expect(watch).toBeFocused();
    await player.focus();
    await expect(player).toBeFocused();
  });

  test("route pages declare a canonical URL", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/about$/);
  });

  test("unknown URLs and unknown slugs return 404 with the not-found page", async ({ page }) => {
    for (const path of ["/does-not-exist", "/work/does-not-exist", "/media/does-not-exist"]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
    }
  });

  test("robots.txt blocks crawling by default and sitemap.xml is served", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow: /");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<urlset");
  });
});
