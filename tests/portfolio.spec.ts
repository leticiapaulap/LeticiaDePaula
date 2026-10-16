import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/sobre/", "/projetos/", "/experiencia/", "/competencias/", "/formacao/", "/contato/", "/curriculo/", "/projetos/festa-fantasia/", "/projetos/portfolio-leticia-de-paula/"];
const widths = [320, 375, 430, 768, 1024, 1280, 1440, 1920];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { if (!localStorage.getItem("nexo-mode")) localStorage.setItem("nexo-mode", "direct"); });
});

for (const width of widths) {
  for (const route of routes) {
    test(`layout ${width}px ${route}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 960 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-mode", "direct");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth > innerWidth + 1,
        elements: [...document.querySelectorAll("main *")].filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.width > 0 && bounds.height > 0 && getComputedStyle(element).position !== "absolute" && (bounds.right > innerWidth + 1 || bounds.left < -1);
        }).map((element) => `${element.tagName}.${element.className}`).slice(0, 12)
      }));
      expect(overflow).toEqual({ page: false, elements: [] });
      expect(errors).toEqual([]);
      if ([375, 1440].includes(width)) {
        for (const preview of await page.locator("main img").all()) {
          await preview.scrollIntoViewIfNeeded();
          await expect(preview).toHaveJSProperty("complete", true);
          expect(await preview.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: testInfo.outputPath("pagina.png"), fullPage: true, animations: "disabled" });
      }
    });
  }
}

for (const theme of ["dark", "light"]) {
  for (const route of routes) {
    test(`acessibilidade ${theme} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 960 });
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      await page.goto(route);
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }))).toEqual([]);
    });
  }
}

test("menu completo por teclado e recuperação de foco", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navegar" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Experiência", exact: true }).click();
  await expect(page).toHaveURL(/\/experiencia\/$/);
  await expect(dialog).toHaveCount(0);
});

test("filtros, galeria e retorno preservam a seleção", async ({ page }) => {
  await page.goto("/projetos/");
  await page.getByRole("button", { name: "Dados, 0", exact: true }).click();
  await expect(page.getByText("Nenhum projeto público nesta categoria.")).toBeVisible();
  await page.getByRole("button", { name: "Portfólio, 1", exact: true }).click();
  const gallery = page.getByRole("group", { name: "Galeria em foco. Use as setas para mudar de projeto." });
  await gallery.getByRole("link", { name: "Ver detalhes" }).click();
  await expect(page).toHaveURL(/portfolio-leticia-de-paula\/$/);
  await page.getByRole("link", { name: "Voltar aos projetos" }).click();
  await expect(page.getByRole("button", { name: "Portfólio, 1", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Todos os projetos, 2" }).click();
  await gallery.focus();
  await page.keyboard.press("Home");
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("Festa Fantasia");
  await page.keyboard.press("End");
  await expect(page.locator(".nexo-gallery-info h3")).toContainText("Letícia de Paula");
});

test("busca sem acentos, filtros e certificados", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/formacao/");
  await page.getByLabel("Pesquisar curso").fill("analise");
  await expect(page.locator(".certification-card")).toHaveCount(3);
  await page.getByLabel("Pesquisar curso").fill("inexistente-123");
  await expect(page.getByText("Nenhum curso corresponde à pesquisa.")).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await page.getByRole("group", { name: "Filtrar cursos por status" }).getByRole("button", { name: "Concluído", exact: true }).click();
  await expect(page.locator(".certification-card")).toHaveCount(9);
  await page.getByLabel("Instituição", { exact: true }).selectOption("DIO");
  await expect(page.locator(".certification-card")).toHaveCount(3);
  const trigger = page.getByRole("button", { name: "Visualizar certificado: Introdução à Análise de Dados e BI", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => { const bounds = element.getBoundingClientRect(); return bounds.left >= 0 && bounds.right <= innerWidth && bounds.top >= 0 && bounds.bottom <= innerHeight; })).toBe(true);
  await expect(dialog.locator("iframe")).toHaveAttribute("src", "/certificates/dio-analise-de-dados-e-bi.pdf");
  await expect(dialog.getByRole("link", { name: "Abrir PDF em outra aba" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("novos certificados preservam dados e abrem os documentos reais", async ({ page }) => {
  await page.goto("/formacao/");
  const certificates = [
    { name: "Desenvolvedor Profissional", institution: "Versátil TI", date: "30/04/2026", workload: "240 h", url: "/certificates/versatil-desenvolvedor-profissional.pdf" },
    { name: "Introdução à Análise de Dados — Microsoft Power BI", institution: "Fundação Bradesco", date: "17/09/2026", workload: "5 h", url: "/certificates/bradesco-introducao-analise-dados-power-bi.pdf" }
  ];
  for (const certificate of certificates) {
    await page.getByLabel("Pesquisar curso").fill(certificate.name);
    const card = page.locator(".certification-card");
    await expect(card).toHaveCount(1);
    for (const detail of [certificate.institution, certificate.date, certificate.workload, "Concluído"]) {
      await expect(card).toContainText(detail);
    }
    const trigger = page.getByRole("button", { name: `Visualizar certificado: ${certificate.name}`, exact: true });
    await trigger.click();
    await expect(page.getByRole("dialog").locator("iframe")).toHaveAttribute("src", certificate.url);
    await expect(page.getByRole("dialog").getByRole("link", { name: "Abrir PDF em outra aba" })).toHaveAttribute("href", certificate.url);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});

test("timeline e mapa preservam conexões verificáveis", async ({ page }) => {
  await page.goto("/experiencia/");
  await page.getByRole("button", { name: "Próximo marco" }).click();
  await expect(page.locator(".nexo-career-navigation__current strong")).toHaveText("TCB Brasília");
  await page.goto("/competencias/");
  await page.locator(".skill-category").filter({ has: page.getByRole("heading", { name: "Automação", exact: true }) }).locator("summary").click();
  await page.locator(".nexo-skill-node").filter({ has: page.getByText("Python", { exact: true }) }).click();
  await expect(page.locator(".nexo-map-empty")).toContainText("Nenhum projeto público associado a Python");
  await page.getByRole("button", { name: "Ver todas as conexões" }).click();
  await expect(page.locator(".nexo-map-case-links a")).toHaveCount(2);
});

test("tema, modo direto e pausa persistem", async ({ page }) => {
  await page.goto("/projetos/");
  await page.getByRole("button", { name: "Ativar tema claro" }).click();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await page.getByRole("button", { name: "Ativar modo imersivo", exact: true }).click();
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-mode", "immersive");
  await page.getByRole("button", { name: "Pausar animações", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-mode", "immersive");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-motion-enabled", "false");
});

test("movimento reduzido e fallback sem WebGL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("nexo-mode", "immersive");
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, contextId: string, ...parameters: unknown[]) {
      if (contextId === "webgl2") return null;
      return Reflect.apply(getContext, this, [contextId, ...parameters]) as RenderingContext | null;
    } as typeof getContext;
  });
  await page.goto("/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-motion-enabled", "false");
  await expect(page.locator(".nexo-artwork__fallback")).toHaveCSS("opacity", "1");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("link", { name: "Ler portfólio completo", exact: true }).click();
  await expect(page.locator("#sobre")).toBeVisible();
});

test("modo direto evita baixar o renderizador 3D", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-mode", "direct");
  await expect(page.locator("canvas")).toHaveCount(0);
  const resources = await page.evaluate(() => performance.getEntriesByType("resource").map((entry) => entry.name));
  expect(resources.some((resource) => /sculpture-scene|three.*\.js/.test(resource))).toBe(false);
});

test("rotas, documentos e metadados publicados", async ({ page, request }) => {
  for (const route of routes) {
    await page.goto(route);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", await canonical.getAttribute("href") ?? "");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og-leticia\.png$/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", await page.locator('meta[name="description"]').getAttribute("content") ?? "");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Letícia de Paula");
    expect(await page.title()).not.toMatch(/NEXO|Arquitetura das Ideias|Em Camadas/i);
    expect(await page.locator("body").innerText()).not.toMatch(/\bNEXO\b|Arquitetura das Ideias|Em Camadas|A validar|Informado no currículo|Não anexado/i);
  }
  await page.goto("/formacao/");
  const documents = await page.locator('a[href$=".pdf"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!))]);
  documents.push("/curriculo-leticia-de-paula.pdf");
  for (const document of documents) {
    const response = await request.get(document);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  const response = await page.goto("/projetos/projeto-inexistente/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Esta conexão ainda não existe." })).toBeVisible();
  await page.getByRole("link", { name: "Ler currículo" }).click();
  await expect(page).toHaveURL(/\/curriculo\/$/);
  const missingPage = await page.goto("/conexao-inexistente/");
  expect(missingPage?.status()).toBe(404);
  await page.getByRole("link", { name: "Voltar ao início" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".nexo-experience-stage")).toHaveAttribute("data-anchored", "true");
});

test("conteúdo e navegação sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Navegação sem JavaScript" })).toBeVisible();
  await page.getByRole("navigation", { name: "Navegação sem JavaScript" }).getByRole("link", { name: "Cursos", exact: true }).click();
  await expect(page.locator(".certification-card")).toHaveCount(10);
  await expect(page.getByRole("link", { name: "Abrir PDF", exact: true })).toHaveCount(9);
  await expect(page.locator(".nexo-artwork__fallback")).toHaveCount(0);
  await context.close();
});
