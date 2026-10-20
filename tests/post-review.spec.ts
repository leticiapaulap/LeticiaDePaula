import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { navigateToChapter } from "./helpers/chapters";

const chapters = [
  { value: "portal", label: "01 / Apresentação" },
  { value: "nucleus", label: "02 / Sobre mim" },
  { value: "projects", label: "03 / Projetos" },
  { value: "experience", label: "04 / Experiências profissionais" },
  { value: "competencies", label: "05 / Competências" },
  { value: "education", label: "06 / Formação e certificações" },
  { value: "convergence", label: "07 / Contato" }
];

test("a abertura conduz aos sete capítulos e preserva os estudos de caso", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/");
  await expect(page.locator(".nexo-portal__title")).toContainText("Letícia");
  await expect(page.locator(".home-chapter")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Explore os capítulos do portfólio" })).toHaveCount(0);
  await expect(page.locator(".chapter-navigation select")).toHaveCount(0);
  await page.getByRole("button", { name: "Abrir menu de capítulos" }).click();
  const menu = page.getByRole("navigation", { name: "Navegação compacta" });
  await expect(menu.getByRole("link")).toHaveCount(8);
  for (const [index, chapter] of chapters.entries()) {
    await expect(menu.getByRole("link").nth(index)).toHaveAccessibleName(chapter.label.replace(/^\d+ \/ /, ""));
  }
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Explorar trajetória" }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goto("/projetos/");
  await page.getByRole("link", { name: "Ver detalhes" }).first().click();
  await expect(page).toHaveURL(/\/projetos\/[^/]+\/$/);
  await expect(page.locator("main h1")).toBeVisible();
});

test("a rolagem permanece natural e não troca o capítulo nem cria estados de URL", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/");
  const historyLength = await page.evaluate(() => history.length);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(page).toHaveURL("/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", "portal");
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await expect(page.getByRole("navigation", { name: "Navegação entre capítulos" })).toBeVisible();
});

test("voltar, avançar e links de capítulo mantêm o histórico nativo", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navegação entre capítulos" });
  await expect(navigation.getByRole("link", { name: /Capítulo anterior/ })).toHaveCount(0);
  await navigation.getByRole("link", { name: /Próximo capítulo/ }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await navigateToChapter(page, "competencies");
  await expect(page).toHaveURL(/\/competencias\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/competencias\/$/);
});

test("uma cena 3D persistente acompanha a mudança entre capítulos", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/");
  await page.getByRole("button", { name: "Ativar modo imersivo", exact: true }).click();
  const surface = page.locator(".nexo-scene-surface");
  await expect(surface).toHaveAttribute("data-ready", "true", { timeout: 20000 });
  await page.locator("canvas").evaluate((canvas) => canvas.setAttribute("data-scene-instance", "persistent"));

  for (const [phase, route] of [
    ["nucleus", "/sobre/"],
    ["projects", "/projetos/"],
    ["experience", "/experiencia/"],
    ["competencies", "/competencias/"],
    ["education", "/formacao/"],
    ["convergence", "/contato/"]
  ]) {
    await navigateToChapter(page, phase);
    await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", phase);
    await expect(page.locator("canvas")).toHaveCount(1);
    await expect(page.locator("canvas")).toHaveAttribute("data-scene-instance", "persistent");
    await expect(page.locator(".route-hero-scene")).toHaveAttribute("data-scene-active", "true");
    await expect.poll(() => page.locator(".route-hero-scene").evaluate((anchor) => {
      const art = anchor.getBoundingClientRect();
      const stage = document.querySelector(".nexo-experience-stage")!.getBoundingClientRect();
      return Math.max(Math.abs(art.left - stage.left), Math.abs(art.top - stage.top), Math.abs(art.width - stage.width), Math.abs(art.height - stage.height));
    })).toBeLessThan(2);
  }
});

for (const width of [375, 768, 1440]) {
  test(`capítulos responsivos e acessíveis em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
    await page.goto("/projetos/");
    await expect(page.locator(".chapter-navigation")).toHaveAttribute("data-chapter", "projects");
    await expect(page.getByRole("link", { name: "Capítulo anterior: Sobre mim" })).toBeVisible();
    await expect(page.locator(".chapter-navigation__progress")).toHaveAttribute("value", "3");
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 375) {
      await expect(page.locator(".route-hero-scene .scene-accent__svg")).toBeVisible();
      await expect(page.locator("canvas")).toHaveCount(0);
    }
  });
}

test("accordions funcionam por teclado sem reabrir categorias na seleção", async ({ page }) => {
  await page.goto("/competencias/");
  const categories = page.locator(".skill-category");
  await expect(categories.locator("summary .skill-category__chevron")).toHaveCount(await categories.count());
  const backend = categories.filter({ has: page.getByRole("heading", { name: "Back-end", exact: true }) });
  await backend.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(backend).toHaveAttribute("open", "");
  await expect(page.locator(".skill-category[open]")).toHaveCount(1);
  const technology = backend.getByRole("button", { name: /Node.js/ });
  await technology.click();
  await expect(technology).toHaveAttribute("aria-pressed", "true");
  await technology.click();
  await expect(technology).toHaveAttribute("aria-pressed", "false");
  await expect(backend).toHaveAttribute("open", "");
  await backend.locator("summary").press("Space");
  await expect(backend).not.toHaveAttribute("open");
});

test("certificados têm uma ação por card e alternativa PDF no modal", async ({ page }) => {
  await page.goto("/formacao/");
  await expect(page.locator(".certification-card .nexo-certificate-actions button")).toHaveCount(9);
  await expect(page.locator(".certification-card a[target='_blank']")).toHaveCount(0);
  const trigger = page.getByRole("button", { name: "Ver certificado: Desenvolvedor Profissional", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Abrir PDF em outra aba" })).toHaveAttribute("href", "/certificates/versatil-desenvolvedor-profissional.pdf");
  await page.getByRole("button", { name: "Fechar certificado" }).click();
  await expect(trigger).toBeFocused();
});
