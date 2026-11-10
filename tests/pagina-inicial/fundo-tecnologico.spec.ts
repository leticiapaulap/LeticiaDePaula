import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const artwork = /\/images\/fundo-tecnologico-hero-v1(?:-mobile)?\.webp/;

async function geometry(page: Page) {
  return page.locator("#portal, #portal-title, .hero-portrait__image, .hero-miniature, .nexo-portal__actions, .site-footer")
    .evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return [rect.x, rect.y, rect.width, rect.height];
    }));
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const theme of ["light", "dark"] as const) {
    test(`fundo tecnológico mantém conteúdo, leitura e foto em ${viewport.width}px (${theme})`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
      const expectedFile = viewport.width < 768 ? "fundo-tecnologico-hero-v1-mobile.webp" : "fundo-tecnologico-hero-v1.webp";
      const requested: string[] = [];
      page.on("request", (request) => { if (artwork.test(request.url())) requested.push(request.url()); });
      const imageResponse = page.waitForResponse((response) => artwork.test(response.url()));
      await page.goto("/");
      const response = await imageResponse;
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/webp");
      expect((await response.body()).length).toBeLessThan(viewport.width < 768 ? 15000 : 40000);
      expect(requested.every((url) => url.endsWith(expectedFile))).toBe(true);
      await expect(page.locator(".hero-miniature")).toHaveAttribute("data-state", "rest");
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
      const ambient = page.locator(".hero-ambient");
      await expect(ambient).toHaveAttribute("aria-hidden", "true");
      await expect(ambient).toHaveCSS("pointer-events", "none");
      const layer = await ambient.evaluate((element) => {
        const image = getComputedStyle(element, "::before");
        const overlay = getComputedStyle(element, "::after");
        return { background: image.backgroundImage, opacity: Number(image.opacity),
          animation: image.animationName, events: image.pointerEvents,
          overlay: overlay.backgroundImage, overlayEvents: overlay.pointerEvents };
      });
      expect(layer.background).toContain(expectedFile);
      expect(layer.opacity).toBeGreaterThan(0);
      expect(layer.opacity).toBeLessThanOrEqual(.3);
      expect(layer.animation).toBe("none");
      expect(layer.events).toBe("none");
      expect(layer.overlay).toContain("linear-gradient");
      expect(layer.overlayEvents).toBe("none");
      await expect(page.locator("main h1")).toHaveText(/Letícia\s*de Paula/);
      await expect(page.locator(".nexo-portal__introduction")).toHaveText("Por aqui, compartilho um pouco do que venho desenvolvendo.");
      const photo = page.locator(".hero-portrait__image");
      await expect(photo.locator("img")).toHaveJSProperty("complete", true);
      await expect(photo.locator("img")).toHaveCSS("filter", "none");
      const photoPixels = await photo.screenshot();
      const initial = await geometry(page);
      const copy = await page.locator("main").innerText();
      await page.screenshot({ path: testInfo.outputPath(`fundo-${theme}.png`), fullPage: true });
      const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(accessibility.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
      // The optional image can be removed without moving or tinting the portrait.
      await ambient.evaluate((element) => element.setAttribute("data-background", "css"));
      expect(await ambient.evaluate((element) => getComputedStyle(element, "::before").backgroundImage)).toBe("none");
      expect(await geometry(page)).toEqual(initial);
      expect(await page.locator("main").innerText()).toBe(copy);
      expect(photoPixels.equals(await photo.screenshot())).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
      await expect(page).toHaveURL(/\/projetos\/$/);
      await expect(page.locator(".hero-ambient")).toHaveCount(0);
    });
  }
}

for (const theme of ["light", "dark"] as const) {
  test(`imagem indisponível mantém o fundo CSS e a navegação (${theme})`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
    const failed: string[] = [];
    const errors: string[] = [];
    page.on("requestfailed", (request) => { if (artwork.test(request.url())) failed.push(request.url()); });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(artwork, (route) => route.abort());
    await page.goto("/");
    expect(failed.length).toBeGreaterThan(0);
    const background = await page.locator("#portal").evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(background).toContain("radial-gradient");
    expect(background).toContain("linear-gradient");
    await expect(page.locator(".hero-ambient > span")).toHaveCount(2);
    await expect(page.locator(".hero-portrait__image img")).toHaveJSProperty("complete", true);
    await expect(page.locator(".hero-miniature")).toHaveAttribute("data-state", "rest");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`fallback-${theme}.png`), fullPage: true });
    await page.getByRole("link", { name: "Minha trajetória", exact: true }).click();
    await expect(page).toHaveURL(/\/sobre\/$/);
  });
}

test("páginas internas não carregam a textura exclusiva da abertura", async ({ page }) => {
  const requested: string[] = [];
  page.on("request", (request) => { if (artwork.test(request.url())) requested.push(request.url()); });
  await page.goto("/sobre/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".hero-ambient")).toHaveCount(0);
  expect(requested).toEqual([]);
});
