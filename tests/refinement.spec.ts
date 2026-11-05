import { test, expect } from "@playwright/test";
import { navigateToChapter } from "./helpers/chapters";

for (const width of [375, 1440]) {
  test(`navegação contextual e biblioteca editorial ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width <= 1099) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog").getByRole("navigation", { name: "Navegação principal" }).getByRole("link")).toHaveCount(7);
      await page.keyboard.press("Escape");
    } else {
      await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link")).toHaveCount(7);
    }
    await expect(page.locator(".hero-gallery, .chapter-navigation")).toHaveCount(0);
    await page.goto("/projetos/");
    let navigation = page.getByRole("navigation", { name: "Navegação principal" }).first();
    if (width <= 1099) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      navigation = page.getByRole("dialog").getByRole("navigation", { name: "Navegação principal" });
    }
    await expect(navigation.getByRole("link", { name: "Projetos", exact: true })).toHaveAttribute("aria-current", "page");
    if (width <= 1099) await page.keyboard.press("Escape");
    await expect(page.locator(".editorial-project-card")).toHaveCount(6);
    const featured = page.locator(".editorial-project-card--featured");
    await expect(featured.locator("img")).toHaveAttribute("src", "/projects/festa-fantasia-home.webp");
    await featured.getByRole("link", { name: "Explorar projeto", exact: true }).click();
    await expect(page.getByRole("link", { name: "Ver aplicação", exact: true })).toHaveAttribute("href", "https://festa-fantasia.vercel.app/");
    await page.goto("/formacao/");
    await expect(page.locator(".certification-card")).toHaveCount(10);
    await expect(page.locator(".certification-card:visible")).toHaveCount(7);
    await page.locator(".editorial-more-courses > summary").click();
    await expect(page.locator(".certification-card:visible")).toHaveCount(10);
    await expect(page.locator(".editorial-more-courses > summary")).toHaveAccessibleName("Mostrar seleção");
    await page.locator(".editorial-more-courses > summary").click();
    await expect(page.locator(".certification-card:visible")).toHaveCount(7);
    const ongoing = page.locator(".certification-card").filter({ has: page.getByRole("heading", { name: "Databases for Developers: Foundations" }) });
    await expect(ongoing).toContainText("Em andamento");
    await expect(ongoing.getByRole("button", { name: /Ver certificado/ })).toHaveCount(0);
    await expect(ongoing.getByRole("link", { name: "Abrir certificado em PDF", exact: true })).toHaveCount(0);
    await page.goto("/sobre/");
    await expect(page.locator(".professional-portrait")).toHaveCount(0);
  });
}

test("capítulos mantêm conteúdo, URLs e foco sem cenas decorativas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  for (const phase of ["nucleus", "projects", "experience", "competencies", "education", "convergence", "portal"]) {
    await navigateToChapter(page, phase);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main h1")).toBeFocused();
    await expect(page.locator("canvas, .nexo-experience-stage, .route-hero-scene, .chapter-navigation")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: phase === "portal" ? "Início" : phase === "nucleus" ? "Sobre mim" : phase === "projects" ? "Projetos" : phase === "experience" ? "Experiência" : phase === "competencies" ? "Competências" : phase === "education" ? "Formação" : "Contato", exact: true })).toHaveAttribute("aria-current", "page");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});
