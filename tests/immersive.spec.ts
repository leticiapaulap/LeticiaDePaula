import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { navigateToChapter } from "./helpers/chapters";

for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`portal imersivo e menu ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const artwork = page.locator(".nexo-portal__artwork");
    if (width < 768) {
      await expect(page.locator("canvas")).toHaveCount(0);
      await expect(page.locator(".hero-gallery__screen--1 img")).toBeVisible();
    } else {
      await expect(page.locator(".nexo-scene-surface")).toHaveAttribute("data-ready", "true", { timeout: 20000 });
    }
    await artwork.scrollIntoViewIfNeeded();
    await expect(page.locator(".nexo-experience-stage")).toHaveAttribute("data-anchored", "true");
    const placement = () => artwork.evaluate((element) => {
      const art = element.getBoundingClientRect();
      const stage = document.querySelector(".nexo-experience-stage")!.getBoundingClientRect();
      const copy = document.querySelector(".nexo-portal__copy")!.getBoundingClientRect();
      return { difference: Math.max(Math.abs(stage.left - art.left), Math.abs(stage.top - art.top), Math.abs(stage.width - art.width), Math.abs(stage.height - art.height)), overlapsCopy: stage.left < copy.right && stage.right > copy.left && stage.top < copy.bottom && stage.bottom > copy.top };
    });
    await expect.poll(async () => (await placement()).difference).toBeLessThan(2);
    expect((await placement()).overlapsCopy).toBe(false);
    await page.screenshot({ path: testInfo.outputPath("portal.png"), animations: "disabled" });
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog", { name: "Navegar" })).toBeVisible();
    await page.getByRole("dialog").getByRole("link", { name: "Currículo digital" }).scrollIntoViewIfNeeded();
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }))).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test("cena percorre as fases e se recupera da perda de contexto", async ({ page }, testInfo) => {
  await page.goto("/");
  const surface = page.locator(".nexo-scene-surface");
  await expect(surface).toHaveAttribute("data-ready", "true", { timeout: 20000 });
  for (const phase of ["nucleus", "projects", "experience", "competencies", "education", "convergence"]) {
    await navigateToChapter(page, phase);
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", phase);
  }
  await page.screenshot({ path: testInfo.outputPath("convergencia.png") });
  await page.locator("canvas").evaluate((element) => element.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  await expect(surface).toHaveAttribute("data-ready", "false");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Abrir menu de capítulos" })).toBeVisible();
});

test("certificado permanece acessível em altura reduzida", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 768, height: 320 });
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/formacao/");
  await page.getByRole("button", { name: "Ver certificado: Fundamentos da Lei Geral de Proteção de Dados (LGPD)" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Fechar certificado" })).toBeVisible();
  await dialog.getByRole("link", { name: "Abrir PDF em outra aba" }).scrollIntoViewIfNeeded();
  await expect(dialog.getByRole("link", { name: "Abrir PDF em outra aba" })).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath("certificado.png") });
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(result.violations.map(({ id }) => id)).toEqual([]);
});
