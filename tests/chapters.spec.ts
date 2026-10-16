import { expect, test } from "@playwright/test";

const chapters = [
  { path: "/", phase: "portal", title: "Letícia" },
  { path: "/sobre/", phase: "nucleus", title: "Pessoas, contexto e tecnologia." },
  { path: "/projetos/", phase: "projects", title: "Da ideia à experiência." },
  { path: "/experiencia/", phase: "experience", title: "Uma trajetória que conecta contextos." },
  { path: "/competencias/", phase: "competencies", title: "Ferramentas com contexto." },
  { path: "/formacao/", phase: "education", title: "Aprendizado que abre caminhos." },
  { path: "/contato/", phase: "convergence", title: "Vamos conectar ideias." }
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
});

test("cada capítulo é uma rota direta, recarregável e com progresso correspondente", async ({ page }) => {
  for (const [index, chapter] of chapters.entries()) {
    const response = await page.goto(chapter.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toContainText(chapter.title);
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", chapter.phase);
    await expect(page.getByLabel("Ir diretamente a um capítulo")).toHaveValue(chapter.phase);
    await expect(page.locator(".chapter-navigation__progress")).toHaveAttribute("value", String(index + 1));
    await page.reload();
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", chapter.phase);
    await expect(page.locator("main h1")).toContainText(chapter.title);
  }
});

test("anterior, próximo e seleção direta atualizam URL e histórico do navegador", async ({ page }) => {
  await page.goto("/");
  const chapterNav = page.getByRole("navigation", { name: "Navegação entre capítulos" });
  await chapterNav.getByRole("link", { name: "Próximo capítulo: Sobre mim" }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await chapterNav.getByRole("link", { name: "Próximo capítulo: Projetos" }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projetos\/$/);

  await page.getByLabel("Ir diretamente a um capítulo").selectOption("education");
  await expect(page).toHaveURL(/\/formacao\/$/);
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", "education");
});

test("teclas de seta navegam capítulos sem sequestrar controles internos", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goto("/formacao/");
  const search = page.getByLabel("Pesquisar curso");
  await search.fill("dados");
  await search.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/\/formacao\/$/);
  await expect(search).toBeFocused();
});

test("o gesto horizontal avança no mobile sem interferir na rolagem vertical", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.evaluate(() => {
    const target = document.querySelector("main")!;
    const start = new Touch({ identifier: 1, target, clientX: 280, clientY: 260 });
    const end = new Touch({ identifier: 1, target, clientX: 160, clientY: 270 });
    target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", "nucleus");
  await page.evaluate(() => {
    const target = document.querySelector("main")!;
    const start = new Touch({ identifier: 2, target, clientX: 240, clientY: 180 });
    const end = new Touch({ identifier: 2, target, clientX: 248, clientY: 70 });
    target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(page).toHaveURL(/\/sobre\/$/);
});

test("páginas extensas mantêm rolagem e movimento reduzido simplifica transições", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "immersive"));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/experiencia/");
  expect(await page.locator(".nexo-experience-entry").count()).toBeGreaterThan(1);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeGreaterThan(700);
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-motion-enabled", "false");
  await expect(page.locator(".route-hero-scene .scene-accent__svg")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
