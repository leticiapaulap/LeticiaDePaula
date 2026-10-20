import { expect, test, type Locator } from "@playwright/test";

async function expectDiagramSpacing(diagram: Locator) {
  const gap = await diagram.evaluate((element) => {
    const caption = element.querySelector(".nexo-project-visual__caption")!.getBoundingClientRect();
    const content = element.querySelector(".nexo-project-visual__entry")!.getBoundingClientRect();
    return content.top - caption.bottom;
  });
  expect(gap).toBeGreaterThanOrEqual(8);
}

const additions = [
  { slug: "organizador-de-tarefas", shortTitle: "Organizador pessoal", title: "Finanzy — Organizador financeiro pessoal" },
  { slug: "senappen-recebimentos", shortTitle: "Portal SENAPPEN", title: "SENAPPEN — Portal de Recebimentos" },
  { slug: "dio-lab-open-source", shortTitle: "DIO Lab · Open Source", title: "DIO Lab — Contribuindo em um Projeto Open Source no GitHub" }
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
});

for (const width of [375, 1440]) {
  test(`os novos projetos abrem e preservam a seleção em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/projetos/");
    await expect(page.getByRole("button", { name: "Todos os projetos, 5", exact: true })).toHaveAttribute("aria-pressed", "true");
    const selection = page.getByRole("group", { name: "Selecionar projeto em destaque" });
    await expect(selection.getByRole("button")).toHaveCount(5);
    for (const project of additions) {
      const trigger = selection.getByRole("button", { name: new RegExp(project.shortTitle) });
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-pressed", "true");
      const feature = page.locator(".project-showcase__feature");
      await expect(feature.getByRole("heading", { name: project.title, exact: true })).toBeVisible();
      await expect(feature.locator(".nexo-project-node")).toHaveCount(3);
      await expect(feature).toContainText("Diagrama editorial · não é captura de tela");
      await expectDiagramSpacing(feature.locator(".nexo-project-visual"));
      await expect(feature.getByRole("img")).not.toHaveAttribute("aria-label", /portfólio de Letícia/);
      if (project.slug === "senappen-recebimentos") {
        await expect(feature).toContainText("Repositório privado");
      }
      await feature.scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath(`${project.slug}.png`), fullPage: true, animations: "disabled" });
      await feature.getByRole("link", { name: "Ver detalhes", exact: true }).click();
      await expect(page).toHaveURL(`/projetos/${project.slug}/`);
      await expect(page.locator("main h1")).toHaveText(project.title);
      await page.reload();
      await expect(page.locator("main h1")).toHaveText(project.title);
      await expectDiagramSpacing(page.locator(".nexo-project-visual"));
      await page.goBack();
      await expect(page).toHaveURL("/projetos/");
      await expect(selection.getByRole("button", { name: new RegExp(project.shortTitle) })).toHaveAttribute("aria-pressed", "true");
    }
    expect(errors).toEqual([]);
  });
}

test("filtros e teclado incluem os novos projetos sem trocar o capítulo", async ({ page }) => {
  await page.goto("/projetos/");
  const gallery = page.getByRole("group", { name: "Galeria em foco. Use as setas para mudar de projeto." });
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("Finanzy");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("SENAPPEN");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("Finanzy");
  await expect(page).toHaveURL("/projetos/");
  await page.getByRole("button", { name: "Automação, 1", exact: true }).click();
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("SENAPPEN");
  await page.getByRole("button", { name: "Open Source, 1", exact: true }).click();
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("DIO Lab");
  await page.getByRole("button", { name: "Desenvolvimento Web, 2", exact: true }).click();
  await expect(page.locator(".project-showcase__tab")).toHaveCount(2);
});

test("projetos não públicos não expõem repositórios nem links de aplicação", async ({ page }) => {
  for (const slug of ["organizador-de-tarefas", "senappen-recebimentos"]) {
    await page.goto(`/projetos/${slug}/`);
    await expect(page.locator(".project-detail-hero .project-links a")).toHaveCount(0);
    await expect(page.locator(".case-aside a")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Cuidados de divulgação", exact: true })).toBeVisible();
    await expect(page.locator("main img")).toHaveCount(0);
    await expect(page.locator("main a[href^='http']")).toHaveCount(0);
  }
  await expect(page.locator(".nexo-publication-status")).toHaveText("Repositório privado");
});

test("o DIO Lab mantém crédito, fork e links públicos corretos", async ({ page }) => {
  await page.goto("/projetos/dio-lab-open-source/");
  await expect(page.locator(".case-aside")).toContainText("Fork educacional");
  await expect(page.getByRole("link", { name: "Ver fork no GitHub", exact: true })).toHaveAttribute("href", "https://github.com/leticiapaulap/dio-lab-open-source");
  await expect(page.getByRole("link", { name: "Projeto original · DIO", exact: true })).toHaveAttribute("href", "https://github.com/digitalinnovationone/dio-lab-open-source");
  await expect(page.locator(".case-content")).toContainText("a autoria do projeto original é da DIO");
  const navigation = page.getByRole("navigation", { name: "Navegação entre projetos" });
  await expect(navigation.getByRole("link", { name: "Portal SENAPPEN", exact: true })).toHaveAttribute("href", "/projetos/senappen-recebimentos/");
  await navigation.getByRole("link", { name: "Portal SENAPPEN", exact: true }).click();
  await expect(page).toHaveURL("/projetos/senappen-recebimentos/");
});

test("competências relacionam os cinco projetos e mantêm o grafo alinhado", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/competencias/");
  const map = page.getByRole("group", { name: "Selecionar projeto no mapa" });
  await expect(map.getByRole("button")).toHaveCount(5);
  for (const project of additions) {
    await map.getByRole("button", { name: new RegExp(project.shortTitle) }).click();
    await expect(page.getByLabel(`Tecnologias relacionadas a ${project.shortTitle}`).getByRole("button")).not.toHaveCount(0);
    await expect(page.locator(".nexo-map-case-links a")).toHaveAttribute("href", `/projetos/${project.slug}/`);
  }
  await expect(map.getByRole("button", { name: /DIO Lab/ })).toContainText("1 tecnologia relacionada");
  const heights = await page.locator(".nexo-connection-map__graph").evaluate((graph) =>
    [...graph.children].map((element) => element.getBoundingClientRect().height)
  );
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(2);
  expect(Math.max(...heights)).toBeLessThan(600);
});

test("as páginas são estáticas, indexáveis e acessíveis sem JavaScript", async ({ browser, request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const project of additions) {
    expect(xml).toContain(`/projetos/${project.slug}/`);
    const response = await request.get(`/projetos/${project.slug}/`);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(project.title);
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });
  try {
    const page = await context.newPage();
    for (const project of additions) {
      await page.goto("/projetos/");
      const links = page.getByRole("navigation", { name: "Todos os estudos de caso" });
      await expect(links.getByRole("link")).toHaveCount(5);
      await links.getByRole("link", { name: project.shortTitle, exact: true }).click();
      await expect(page.locator("main h1")).toHaveText(project.title);
    }
  } finally {
    await context.close();
  }
});
