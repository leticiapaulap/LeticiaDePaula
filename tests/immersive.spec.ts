import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { navigateToChapter } from "./helpers/chapters";

for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`abertura editorial e menu ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".nexo-portal__title")).toContainText("Letícia");
    await expect(page.locator(".hero-gallery, .nexo-portal__artwork, .chapter-navigation, .nexo-experience-stage, .scene-accent, canvas")).toHaveCount(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    expect(overflow).toBe(false);
    await expect(page.getByRole("link", { name: "Conhecer projetos", exact: true })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("abertura.png"), fullPage: true, animations: "disabled" });
    const mobile = width <= 1099;
    if (mobile) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
      await expect(page.getByRole("dialog").getByRole("link", { name: "Currículo PDF" })).toBeVisible();
    } else {
      await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link")).toHaveCount(7);
    }
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(result.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }))).toEqual([]);
    if (mobile) {
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
    }
    expect(errors).toEqual([]);
  });
}

test("navegação lateral acompanha a seção ativa sem cenas", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/sobre/");
  for (const phase of ["projects", "experience", "competencies", "education"]) {
    await navigateToChapter(page, phase);
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", phase);
    await expect(page.locator(".portfolio-sidebar")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: phase === "projects" ? "Projetos" : phase === "experience" ? "Experiência" : phase === "competencies" ? "Competências" : "Formação", exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.locator(".nexo-route__eyebrow")).not.toContainText(/Capítulo\s+\d/);
    await expect(page.locator("canvas, .nexo-experience-stage, .chapter-artwork, .scene-accent, .chapter-navigation")).toHaveCount(0);
  }
  await navigateToChapter(page, "convergence");
  await expect(page.locator(".chapter-artwork")).toHaveCount(0);
  await expect(page.locator("main h1")).toContainText("Vamos conectar ideias.");
  await page.screenshot({ path: testInfo.outputPath("contato.png") });
  await expect(page.locator(".portfolio-sidebar")).toBeVisible();
});

test("mobile mantém capítulos legíveis sem carregar cena decorativa", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/sobre/");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".route-hero-scene, .nexo-experience-stage")).toHaveCount(0);
  for (const phase of ["experience", "competencies", "convergence"]) {
    await navigateToChapter(page, phase);
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", phase);
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator("main h1")).toBeFocused();
  }
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
