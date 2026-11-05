import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const sectionLabels = ["Início", "Sobre mim", "Projetos", "Experiência", "Competências", "Formação", "Contato"];

test("sidebar editorial deixa o conteúdo livre e não repete controles na abertura", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const sidebar = page.getByRole("complementary", { name: "Navegação do portfólio" });
  const navigation = sidebar.getByRole("navigation", { name: "Navegação principal" });
  await expect(navigation.getByRole("link")).toHaveText(sectionLabels);
  await expect(navigation.locator('[aria-current="page"]')).toHaveText("Início");
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeHidden();
  const sidebarBounds = await sidebar.boundingBox();
  const contentBounds = await page.locator("main").boundingBox();
  expect(sidebarBounds).not.toBeNull();
  expect(contentBounds).not.toBeNull();
  expect(sidebarBounds!.width).toBeGreaterThanOrEqual(220);
  expect(sidebarBounds!.width).toBeLessThanOrEqual(240);
  expect(contentBounds!.x).toBeGreaterThanOrEqual(sidebarBounds!.x + sidebarBounds!.width);
  await expect(page.locator("main .nexo-button--primary")).toHaveText(/Conhecer projetos/);
  await expect(page.locator("main .nexo-button--primary")).toHaveCount(1);
  await expect(page.locator('main a[href$=".pdf"], .chapter-navigation, .nexo-header')).toHaveCount(0);
});

test("links da sidebar funcionam pelo teclado e deixam foco visível", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navegação principal" });
  await navigation.getByRole("link", { name: "Projetos", exact: true }).focus();
  await page.keyboard.press("Tab");
  const experience = navigation.getByRole("link", { name: "Experiência", exact: true });
  await expect(experience).toBeFocused();
  expect(await experience.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/experiencia\/$/);
  await expect(page.locator("main h1")).toBeFocused();
  await expect(navigation.locator('[aria-current="page"]')).toHaveText("Experiência");
});

for (const width of [320, 375, 430, 768, 1024]) {
  test(`menu recolhível em ${width}px mantém seções e ações acessíveis`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 640 });
    await page.goto("/");
    await expect(page.locator(".portfolio-sidebar")).toBeHidden();
    // Radix removes the trigger from the accessibility tree while its modal is open.
    const trigger = page.locator(".portfolio-menu-trigger");
    await expect(trigger).toHaveAccessibleName("Menu");
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog.getByRole("navigation", { name: "Navegação principal" }).getByRole("link")).toHaveText(sectionLabels);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect.poll(() => dialog.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.left >= 0 && bounds.top >= 0 && bounds.right <= innerWidth && bounds.bottom <= innerHeight;
    })).toBe(true);
    for (const control of await dialog.locator(".portfolio-sidebar__nav a, button, .portfolio-sidebar__resume").all()) {
      const bounds = await control.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
      expect(bounds!.width).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await dialog.getByRole("link", { name: "Currículo PDF" }).scrollIntoViewIfNeeded();
    await expect(dialog.getByRole("link", { name: "Currículo PDF" })).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`menu-${width}.png`), animations: "disabled" });
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
}

test("selecionar a seção atual também fecha o menu", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Início", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
});

test("menu modal contém o foco e restaura a rolagem ao fechar", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 640 });
  await page.goto("/projetos/");
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Shift+Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.mouse.move(370, 300);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await dialog.getByRole("button", { name: "Fechar menu" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("mudar para desktop fecha o modal e libera o documento", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 800 });
  await page.goto("/sobre/");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
  await expect(page.locator(".portfolio-sidebar")).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator('.portfolio-sidebar [aria-current="page"]')).toHaveText("Sobre mim");
  await expect(page.locator('.portfolio-sidebar [aria-current="page"]')).toBeFocused();
  await page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Contato", exact: true }).click();
  await expect(page).toHaveURL(/\/contato\/$/);
});

test("sidebar em janela baixa mantém currículo, tema e perfis alcançáveis", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 480 });
  await page.goto("/");
  const sidebar = page.locator(".portfolio-sidebar");
  for (const control of [
    sidebar.getByRole("link", { name: "Currículo PDF" }),
    sidebar.getByRole("button", { name: "Ativar tema escuro" }),
    sidebar.getByRole("link", { name: "LinkedIn" })
  ]) {
    await control.scrollIntoViewIfNeeded();
    await expect(control).toBeInViewport();
  }
});

test("nomenclatura simples aparece também nos rótulos acessíveis", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const route of ["/", "/sobre/", "/projetos/", "/experiencia/", "/competencias/", "/formacao/", "/contato/"]) {
    await page.goto(route);
    expect(await page.locator("body").innerText()).not.toMatch(/cap[ií]tulos?/i);
    const labels = await page.locator("[aria-label], [title], img[alt]").evaluateAll((elements) => elements.map((element) => [element.getAttribute("aria-label"), element.getAttribute("title"), element.getAttribute("alt")].join(" ")).join(" "));
    expect(labels).not.toMatch(/cap[ií]tulos?/i);
  }
});

for (const theme of ["light", "dark"]) {
  test(`menu aberto no tema ${theme} atende aos critérios automatizados de acessibilidade`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }))).toEqual([]);
  });
}

test("currículo real e perfis têm destinos claros; preferência de tema persiste", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const sidebar = page.locator(".portfolio-sidebar");
  const resume = sidebar.getByRole("link", { name: "Currículo PDF" });
  const response = await request.get(await resume.getAttribute("href") ?? "");
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const profiles = sidebar.getByRole("navigation", { name: "Perfis profissionais" });
  await expect(profiles.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/leticiapaulap");
  await expect(profiles.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/let%C3%ADcia-de-paulap/");
  for (const link of await profiles.getByRole("link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer|noopener/);
  }
  await sidebar.getByRole("button", { name: "Ativar tema escuro" }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.reload();
  await expect(sidebar.getByRole("button", { name: "Ativar tema claro" })).toBeVisible();
  await sidebar.getByRole("button", { name: "Ativar tema claro" }).click();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
});

for (const width of [375, 1440]) {
  test(`contato em ${width}px apresenta perfis uma vez e mantém PDF somente no menu`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/contato/");
    await expect(page.locator('main a[href="/curriculo-leticia-de-paula.pdf"]')).toHaveCount(0);
    for (const profile of ["GitHub", "LinkedIn"]) {
      await expect(page.getByRole("link", { name: profile, exact: true })).toHaveCount(1);
      await expect(page.locator("main").getByRole("link", { name: profile, exact: true })).toBeVisible();
    }
    await expect(page.locator(".portfolio-sidebar .portfolio-sidebar__socials")).toHaveCount(0);
    if (width === 375) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      const dialog = page.getByRole("dialog", { name: "Menu" });
      await expect(dialog.getByRole("link", { name: "Currículo PDF" })).toHaveCount(1);
      await expect(dialog.getByRole("navigation", { name: "Perfis profissionais" })).toHaveCount(0);
      await page.keyboard.press("Escape");
      await expect(page.locator("main").getByRole("link", { name: "GitHub", exact: true })).toBeVisible();
    } else {
      await expect(page.getByRole("link", { name: "Currículo PDF", exact: true })).toHaveCount(1);
    }
  });
}
