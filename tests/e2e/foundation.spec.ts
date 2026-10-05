import { expect, test } from "@playwright/test";

test.describe("site foundation", () => {
  test("homepage exposes language, landmarks and a single h1", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
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

  test("primary navigation reaches each section and marks the current page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const [label, path] of [
      ["Work", "/work"],
      ["Media", "/media"],
      ["About", "/about"],
      ["Contact", "/contact"],
    ] as const) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(path);
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(label);
    }
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
