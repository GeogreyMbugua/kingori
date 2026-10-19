import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/work",
  "/work/image-study",
  "/work/written-piece",
  "/work/process-study",
  "/shows",
  "/media",
  "/media/feature-gallery",
  "/media/making-money-easier",
  "/media/what-people-with-money-never-tell-you",
  "/media/money-game-without-a-payslip",
  "/media/rich-or-wealthy",
  "/media/the-money-game",
  "/media/long-read",
  "/about",
  "/contact",
  "/does-not-exist",
  "/design-system",
];

/* Scroll-driven reveals start transparent; reduced motion renders final state so axe sees real colours. */
test.use({ colorScheme: "dark", reducedMotion: "reduce" });

test.describe("automated accessibility (axe, WCAG 2.2 AA)", () => {
  for (const path of ROUTES) {
    test(`${path} has no detectable violations`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        // YouTube's player document is third-party. Scanning it reports their
        // markup and can hang the run. The page around the iframe is still scanned.
        .exclude("iframe")
        .analyze();

      const violations = results.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      }));
      expect(violations).toEqual([]);
    });
  }
});

test.describe("responsive and interaction guarantees", () => {
  test("no horizontal overflow at 320 CSS px (WCAG 1.4.10)", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    for (const path of [
      "/",
      "/work",
      "/work/process-study",
      "/shows",
      "/about",
      "/media",
      "/media/the-money-game",
      "/contact",
    ]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });

  test("navigation keeps 44px touch targets, inline or in the menu", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      const menuButton = page.getByRole("button", { name: "Menu" });
      const box = await menuButton.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      await menuButton.click();
    }
    const links = page
      .getByRole(isMobile ? "dialog" : "navigation", { name: isMobile ? "Menu" : "Primary" })
      .getByRole("link");
    await expect(links).toHaveCount(3);

    for (const link of await links.all()) {
      await expect(link).toBeVisible();
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("keyboard focus is visibly indicated", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Tab focus order differs by browser defaults");
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement as Element);
      return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
  });

  test("the design-system preview is noindex and absent from the sitemap", async ({
    page,
    request,
  }) => {
    await page.goto("/design-system");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("design-system");
  });
});
