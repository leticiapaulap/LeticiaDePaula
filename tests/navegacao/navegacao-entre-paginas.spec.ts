import { expect, test } from "@playwright/test";

const sections = [
  { label: "Início", path: "/", phase: "portal" },
  { label: "Sobre mim", path: "/sobre/", phase: "nucleus" },
  { label: "Projetos", path: "/projetos/", phase: "projects" },
  { label: "Experiência", path: "/experiencia/", phase: "experience" },
  { label: "Competências", path: "/competencias/", phase: "competencies" },
  { label: "Formação", path: "/formacao/", phase: "education" },
  { label: "Contato", path: "/contato/", phase: "convergence" }
];

test("cada seção abre por URL direta e marca o item ativo", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const section of sections) {
    const response = await page.goto(section.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", section.phase);
    await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: section.label, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.locator("main")).not.toContainText(/capítulos/i);
    await page.reload();
    await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-experience-state", section.phase);
  }
});

test("sidebar mantém rotas, foco no título e histórico do navegador", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav.getByRole("link")).toHaveCount(7);
  await nav.getByRole("link", { name: "Sobre mim" }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(page.locator("main h1")).toBeFocused();
  await nav.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await page.getByRole("link", { name: "Explorar projeto" }).first().click();
  await expect(nav.getByRole("link", { name: "Projetos", exact: true })).toHaveAttribute("aria-current", "page");
});

test("menu mobile abre, fecha pelo Escape e por clique fora, e fecha após navegar", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await expect(trigger).toBeVisible();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  const nav = dialog.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav.getByRole("link")).toHaveCount(7);
  await expect(nav.getByRole("link", { name: "Início" })).toHaveAttribute("aria-current", "page");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.mouse.click(310, 420);
  await expect(dialog).toHaveCount(0);

  await trigger.click();
  await page.getByRole("dialog").getByRole("link", { name: "Experiência", exact: true }).click();
  await expect(page).toHaveURL(/\/experiencia\/$/);
  await expect(dialog).toHaveCount(0);
  await expect(page.locator("main h1")).toBeFocused();
});

test("teclas de seta não obrigam o visitante a seguir uma ordem", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL("/");
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL("/");
});

test("o currículo e os temas permanecem acessíveis pelo menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("link", { name: "Currículo PDF" })).toHaveAttribute("href", "/curriculo-leticia-de-paula.pdf");
  await expect(dialog.locator(".portfolio-sidebar__socials a")).toHaveText(["GitHub", "LinkedIn"]);
  await expect(page.locator("footer .footer-socials, main .nexo-socials")).toHaveCount(0);
  const themeToggle = dialog.getByRole("button", { name: "Ativar tema escuro" });
  await expect(themeToggle).toBeVisible();
  await themeToggle.click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
});
