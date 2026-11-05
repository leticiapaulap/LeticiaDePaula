import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { navigateToChapter } from "./helpers/chapters";

const sections = [
  { label: "Início" },
  { label: "Sobre mim" },
  { label: "Projetos" },
  { label: "Experiência" },
  { label: "Competências" },
  { label: "Formação" },
  { label: "Contato" }
];

test("a abertura oferece navegação clara e preserva os estudos de caso", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/");
  await expect(page.locator(".nexo-portal__title")).toContainText("Letícia");
  await expect(page.locator(".home-chapter")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "Explore as seções do portfólio" })).toHaveCount(0);
  await expect(page.locator(".chapter-navigation, .nexo-experience-stage, .scene-accent")).toHaveCount(0);
  const menu = page.getByRole("navigation", { name: "Navegação principal" }).first();
  await expect(menu.getByRole("link")).toHaveCount(7);
  for (const section of sections) await expect(menu.getByRole("link", { name: section.label, exact: true })).toBeVisible();
  await navigateToChapter(page, "nucleus");
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goto("/projetos/");
  await page.getByRole("link", { name: "Explorar projeto" }).first().click();
  await expect(page).toHaveURL(/\/projetos\/[^/]+\/$/);
  await expect(page.locator("main h1")).toBeVisible();
});

test("a rolagem permanece natural sem alterar a rota", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
  await page.goto("/");
  const historyLength = await page.evaluate(() => history.length);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(page).toHaveURL("/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", "portal");
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
});

test("links diretos mantêm o histórico nativo", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navegação principal" });
  await navigation.getByRole("link", { name: "Sobre mim" }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await navigateToChapter(page, "competencies");
  await expect(page).toHaveURL(/\/competencias\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/competencias\/$/);
});

test("as páginas navegam sem carregar o renderizador 3D", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const rendererScripts = new Set<string>();
  const inspections: Promise<void>[] = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "script") return;
    inspections.push(response.text().then((source) => {
      if (/THREE\.WebGLRenderer|three\/src\/renderers\/WebGLRenderer|@react-three\/fiber/.test(source)) rendererScripts.add(response.url());
    }).catch(() => {}));
  });
  await page.goto("/sobre/");

  for (const [phase, route] of [
    ["nucleus", "/sobre/"],
    ["projects", "/projetos/"],
    ["experience", "/experiencia/"],
    ["competencies", "/competencias/"],
    ["education", "/formacao/"]
  ]) {
    await navigateToChapter(page, phase);
    await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", phase);
    await expect(page.locator("canvas, .nexo-experience-stage, .route-hero-scene, .chapter-artwork, .scene-accent")).toHaveCount(0);
    await expect(page.locator("main h1")).toBeVisible();
  }
  await Promise.all(inspections);
  expect([...rendererScripts]).toEqual([]);
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Formação", exact: true })).toBeVisible();
});

for (const width of [375, 768, 1440]) {
  test(`navegação responsiva e acessível em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
    await page.goto("/projetos/");
    if (width <= 1099) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog").getByRole("link", { name: "Projetos", exact: true })).toHaveAttribute("aria-current", "page");
    } else {
      await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Projetos", exact: true })).toHaveAttribute("aria-current", "page");
    }
    await expect(page.locator(".chapter-navigation, progress, .chapter-artwork, .nexo-experience-stage, canvas")).toHaveCount(0);
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 375) {
      await expect(page.locator(".chapter-artwork")).toHaveCount(0);
      await expect(page.locator("canvas")).toHaveCount(0);
    }
  });
}

test("competências visíveis e contexto funcionam por teclado", async ({ page }) => {
  await page.goto("/competencias/");
  const categories = page.locator(".editorial-skill-group");
  await expect(categories).toHaveCount(6);
  const backend = categories.filter({ has: page.getByRole("heading", { name: "Desenvolvimento Back-end", exact: true }) });
  const technology = backend.getByRole("button", { name: /Node.js/ });
  await technology.focus();
  await page.keyboard.press("Enter");
  await expect(technology).toHaveAttribute("aria-pressed", "true");
  await expect(backend.locator(".editorial-skill-group__detail")).toContainText("Node.js");
  await page.keyboard.press("Space");
  await expect(technology).toHaveAttribute("aria-pressed", "false");
  const connections = page.locator(".editorial-skills__connections");
  await connections.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(connections).toHaveAttribute("open", "");
  await connections.locator("summary").press("Space");
  await expect(connections).not.toHaveAttribute("open");
});

test("certificados têm uma ação por card e alternativa PDF no modal", async ({ page }) => {
  await page.goto("/formacao/");
  await expect(page.locator(".certification-card .nexo-certificate-actions button")).toHaveCount(9);
  await expect(page.locator(".certification-card a[target='_blank']")).toHaveCount(0);
  await page.getByText("Ver todos os 9 cursos", { exact: true }).click();
  const trigger = page.getByRole("button", { name: "Ver certificado: Desenvolvedor Profissional", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Abrir PDF em outra aba" })).toHaveAttribute("href", "/certificates/versatil-desenvolvedor-profissional.pdf");
  await page.getByRole("button", { name: "Fechar certificado" }).click();
  await expect(trigger).toBeFocused();
});
