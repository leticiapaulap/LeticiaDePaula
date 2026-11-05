import { expect, test } from "@playwright/test";

const additions = [
  { slug: "agenda-executiva", shortTitle: "Agenda Executiva", title: "Agenda Executiva — Gestão de Compromissos" },
  { slug: "organizador-de-tarefas", shortTitle: "Organizador pessoal", title: "Finanzy — Organizador financeiro pessoal" },
  { slug: "senappen-recebimentos", shortTitle: "Portal SENAPPEN", title: "Sistema de Recebimentos Documentais — SENAPPEN" },
  { slug: "dio-lab-open-source", shortTitle: "DIO Lab · Open Source", title: "DIO Lab — Contribuindo em um Projeto Open Source no GitHub" }
];
const senappenTitle = "Sistema de Recebimentos Documentais — SENAPPEN";

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
    await expect(page.getByRole("button", { name: "Todos os projetos, 6", exact: true })).toHaveAttribute("aria-pressed", "true");
    const gallery = page.getByRole("group", { name: "Galeria de projetos. Use as setas para destacar um projeto." });
    await expect(gallery.getByRole("link", { name: "Explorar projeto", exact: true })).toHaveCount(4);
    await expect(gallery.getByRole("link", { name: "Conhecer projeto", exact: true })).toHaveCount(2);
    const cards = page.locator(".editorial-project-card");
    await expect(cards.first()).toHaveClass(/editorial-project-card--featured/);
    await expect(cards.first().getByRole("heading", { name: senappenTitle, exact: true })).toBeVisible();
    await expect(cards.nth(1).getByRole("heading", { name: additions[0].title, exact: true })).toBeVisible();
    await expect(cards.filter({ has: page.getByRole("heading", { name: additions[0].title, exact: true }) })).toHaveCount(1);
    await expect(cards.filter({ has: page.getByRole("heading", { name: "Festa Fantasia - Concurso de Melhor Fantasia", exact: true }) })).toHaveCount(1);
    for (const project of additions) {
      const feature = page.locator(".editorial-project-card").filter({ has: page.getByRole("heading", { name: project.title, exact: true }) });
      await expect(feature.getByRole("heading", { name: project.title, exact: true })).toBeVisible();
      if (project.slug === "agenda-executiva") {
        await expect(feature.locator("img")).toHaveAttribute("src", "/projects/agenda-executiva-cover.webp");
      } else if (project.slug === "senappen-recebimentos") {
        await expect(feature.locator("img")).toHaveAttribute("src", "/projects/senappen-recebimentos-home.webp");
        await expect(feature.locator("img")).toHaveAttribute("alt", /Página pública.*Oficina de Trabalho Prisional/);
        await expect(feature.locator("img")).toHaveAttribute("width", "1905");
        await expect(feature.locator("img")).toHaveAttribute("height", "903");
      } else if (project.slug === "organizador-de-tarefas") {
        await expect(feature.locator("img")).toHaveAttribute("src", "/projects/finanzy-login.webp");
        await expect(feature.locator("img")).toHaveAttribute("alt", /Tela de acesso do Finanzy.*campos de e-mail e senha vazios/);
        await expect(feature.locator("img")).toHaveAttribute("width", "1906");
        await expect(feature.locator("img")).toHaveAttribute("height", "909");
      } else {
        await expect(feature.locator(".project-concept__topics li")).toHaveCount(3);
        await expect(feature.locator("img, svg.nexo-project-visual__connections")).toHaveCount(0);
      }
      await expect(feature).not.toContainText("Diagrama editorial");
      if (project.slug === "senappen-recebimentos") {
        await expect(feature).toHaveClass(/editorial-project-card--featured/);
        await expect(feature.locator(".editorial-project-card__description")).toHaveText("Sistema web desenvolvido para digitalizar e organizar o recebimento de documentos, com formulários específicos para unidades federativas e empresas, validação de informações, emissão de recibos e acompanhamento administrativo.");
        await expect(feature.locator(".editorial-project-technologies")).toHaveText("Next.js · TypeScript · PostgreSQL · Prisma");
        await expect(feature).toContainText("Repositório privado");
        await expect(feature).toHaveCount(1);
        const access = feature.getByRole("link", { name: "Acessar sistema", exact: true });
        await expect(access).toHaveAttribute("href", "https://mjsp-recebimentos-smtp.vercel.app/");
        await expect(access).toHaveAttribute("target", "_blank");
        await expect(access).toHaveAttribute("rel", "noopener noreferrer");
      }
      if (project.slug === "agenda-executiva") {
        await expect(feature).not.toHaveClass(/editorial-project-card--featured/);
        await expect(feature.locator(".editorial-project-card__description")).toHaveText("Aplicação web desenvolvida para apoiar a organização e o acompanhamento de compromissos executivos, centralizando informações da agenda e facilitando a rotina administrativa.");
        await expect(feature.locator(".editorial-project-technologies")).toHaveText("Python · Flask · HTML · CSS");
        await expect(feature).toContainText("Funcionalidades internas exigem uma conta autorizada.");
        const access = feature.getByRole("link", { name: "Acessar sistema", exact: true });
        await expect(access).toHaveAttribute("href", "https://agenda-executiva.onrender.com/login");
        await expect(access).toHaveAttribute("target", "_blank");
        await expect(access).toHaveAttribute("rel", "noopener noreferrer");
      }
      await feature.scrollIntoViewIfNeeded();
      if (project.slug === "senappen-recebimentos") {
        await expect(feature.locator("img")).toHaveJSProperty("complete", true);
        expect(await feature.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(1905);
      }
      if (project.slug === "agenda-executiva") {
        await expect(feature.locator("img")).toHaveJSProperty("complete", true);
        expect(await feature.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(1600);
      }
      await page.screenshot({ path: testInfo.outputPath(`${project.slug}.png`), fullPage: true, animations: "disabled" });
      await feature.getByRole("link", { name: project.slug === "senappen-recebimentos" || project.slug === "agenda-executiva" ? "Conhecer projeto" : "Explorar projeto", exact: true }).click();
      await expect(page).toHaveURL(`/projetos/${project.slug}/`);
      await expect(page.locator("main h1")).toHaveText(project.title);
      if (project.slug === "senappen-recebimentos") {
        await expect(page.locator(".case-aside .tag")).toHaveText(["Next.js", "TypeScript", "PostgreSQL", "Prisma"]);
        const screenshot = page.locator(".project-detail-hero img");
        await expect(screenshot).toHaveAttribute("src", "/projects/senappen-recebimentos-home.webp");
        await expect(screenshot).toHaveJSProperty("complete", true);
        expect(await screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(1905);
        await expect(page.locator(".project-detail-hero figcaption")).toContainText("Captura fornecida por Letícia de Paula");
        const access = page.getByRole("link", { name: "Acessar sistema", exact: true });
        await expect(access).toHaveCount(1);
        await expect(access).toBeVisible();
        await expect(access).toHaveAttribute("href", "https://mjsp-recebimentos-smtp.vercel.app/");
        await expect(access).toHaveAttribute("target", "_blank");
        await expect(access).toHaveAttribute("rel", "noopener noreferrer");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      if (project.slug === "organizador-de-tarefas") {
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("src", "/projects/finanzy-login.webp");
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("alt", /Tela de acesso do Finanzy/);
        await expect(page.locator(".project-detail-hero img")).toHaveJSProperty("complete", true);
      }
      if (project.slug === "agenda-executiva") {
        await expect(page.locator(".project-detail-hero")).toContainText("Desenvolvimento Web");
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("src", "/projects/agenda-executiva-cover.webp");
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("width", "1600");
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("height", "800");
        await expect(page.locator(".project-detail-hero img")).toHaveJSProperty("complete", true);
        expect(await page.locator(".project-detail-hero img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(1600);
        const system = page.getByRole("link", { name: "Acessar sistema", exact: true });
        await expect(system).toHaveAttribute("href", "https://agenda-executiva.onrender.com/login");
        await expect(system).toHaveAttribute("target", "_blank");
        await expect(system).toHaveAttribute("rel", "noopener noreferrer");
        await expect(page.locator(".project-links").getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/leticiapaulap/Agenda_executiva");
        const screenshots = page.locator(".nexo-case-screenshots img");
        await expect(screenshots).toHaveCount(3);
        for (let index = 0; index < 3; index += 1) {
          const screenshot = screenshots.nth(index);
          await expect(screenshot).toHaveJSProperty("complete", true);
          expect(await screenshot.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await expect(page.locator(".case-content")).toContainText("Flask-Login");
        await expect(page.locator(".case-content")).toContainText("PostgreSQL");
        await expect(page.locator(".case-content")).toContainText("conta autorizada pelo gestor");
        await expect(page.locator(".nexo-case-screenshots figcaption").first()).toContainText("versão desktop");
        await expect(page.locator(".nexo-case-screenshots figcaption").first()).toContainText("dados fictícios");
      }
      await page.reload();
      await expect(page.locator("main h1")).toHaveText(project.title);
      if (project.slug === "agenda-executiva") {
        await expect(page.locator(".nexo-case-screenshots img")).toHaveCount(3);
      } else if (project.slug === "senappen-recebimentos") {
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("src", "/projects/senappen-recebimentos-home.webp");
        await expect(page.locator(".nexo-case-screenshots")).toHaveCount(0);
      } else if (project.slug === "organizador-de-tarefas") {
        await expect(page.locator(".project-detail-hero img")).toHaveAttribute("src", "/projects/finanzy-login.webp");
      } else {
        await expect(page.locator(".project-concept__topics li")).toHaveCount(3);
      }
      await page.goBack();
      await expect(page).toHaveURL("/projetos/");
      await expect(feature).toHaveAttribute("data-selected", "true");
    }
    expect(errors).toEqual([]);
  });

}

test("o estudo de caso do portfólio mostra a interface atual e mantém a captura de competências", async ({ page }) => {
  await page.goto("/projetos/portfolio-leticia-de-paula/");
  const hero = page.locator(".project-detail-hero");
  await expect(hero.locator("img")).toHaveAttribute("src", "/projects/portfolio-projects.webp");
  await expect(hero.locator("img")).toHaveAttribute("alt", /Página atual de projetos do portfólio/);
  const screenshots = page.locator(".nexo-case-screenshots img");
  await expect(screenshots).toHaveCount(2);
  await expect(screenshots.nth(0)).toHaveAttribute("src", "/projects/portfolio-projects.webp");
  await expect(screenshots.nth(1)).toHaveAttribute("src", "/projects/portfolio-competencias.webp");
});

test("filtros e teclado incluem os novos projetos sem trocar o capítulo", async ({ page }) => {
  await page.goto("/projetos/");
  const gallery = page.getByRole("group", { name: "Galeria de projetos. Use as setas para destacar um projeto." });
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toHaveText(senappenTitle);
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("Agenda Executiva");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("Festa Fantasia");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("Finanzy");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("Festa Fantasia");
  await expect(page).toHaveURL("/projetos/");
  await page.getByRole("button", { name: "Automação, 1", exact: true }).click();
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("SENAPPEN");
  await page.getByRole("button", { name: "Open Source, 1", exact: true }).click();
  await expect(page.locator('.editorial-project-card[data-selected="true"] h3')).toContainText("DIO Lab");
  await page.getByRole("button", { name: "Aplicações Desktop, 0", exact: true }).click();
  await expect(page.locator(".editorial-project-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Desenvolvimento Web, 3", exact: true }).click();
  await expect(page.locator(".editorial-project-card")).toHaveCount(3);
  await expect(page.locator(".editorial-project-card h3").first()).toHaveText(additions[0].title);
});

test("projetos privados preservam os repositórios e SENAPPEN publica apenas o acesso autorizado", async ({ page, context }) => {
  for (const slug of ["organizador-de-tarefas", "senappen-recebimentos"]) {
    await page.goto(`/projetos/${slug}/`);
    await expect(page.locator(".case-aside a")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Cuidados de divulgação", exact: true })).toBeVisible();
    await expect(page.locator("main img")).toHaveCount(1);
    await expect(page.locator("main a[href*='github.com']")).toHaveCount(0);
    await expect(page.locator("main a[href^='http']")).toHaveCount(slug === "senappen-recebimentos" ? 1 : 0);
  }
  await expect(page.locator(".nexo-publication-status")).toHaveText("Repositório privado");
  await expect(page.locator(".case-content")).not.toContainText("endereços de acesso");
  // Intercept the new tab so this verifies navigation without using the public system.
  await context.route("https://mjsp-recebimentos-smtp.vercel.app/**", (route) => route.fulfill({ contentType: "text/html", body: "<title>Sistema público</title>" }));
  const opened = context.waitForEvent("page");
  await page.getByRole("link", { name: "Acessar sistema", exact: true }).click();
  const popup = await opened;
  await expect(popup).toHaveURL("https://mjsp-recebimentos-smtp.vercel.app/");
  expect(await popup.evaluate(() => window.opener)).toBeNull();
  await popup.close();
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

test("competências relacionam os seis projetos em um painel acessível", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/competencias/");
  await page.locator(".editorial-skills__connections > summary").click();
  const map = page.getByRole("group", { name: "Selecionar projeto no mapa" });
  await expect(map.getByRole("button")).toHaveCount(6);
  for (const project of additions) {
    await map.getByRole("button", { name: new RegExp(project.shortTitle) }).click();
    await expect(page.getByLabel(`Tecnologias relacionadas a ${project.shortTitle}`).getByRole("button")).not.toHaveCount(0);
    await expect(page.locator(".nexo-map-case-links a")).toHaveAttribute("href", `/projetos/${project.slug}/`);
  }
  await expect(map.getByRole("button", { name: /DIO Lab/ })).toContainText("1 tecnologias relacionadas");
  const technology = page.getByLabel("Tecnologias relacionadas a DIO Lab · Open Source").getByRole("button", { name: "Git · GitHub", exact: true });
  await technology.click();
  await expect(page.locator(".nexo-map-detail h4")).toHaveText("Git · GitHub");
  await expect(page.locator(".nexo-map-case-links a")).not.toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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
      await expect(links.getByRole("link")).toHaveCount(6);
      await links.getByRole("link", { name: project.shortTitle, exact: true }).click();
      await expect(page.locator("main h1")).toHaveText(project.title);
    }
  } finally {
    await context.close();
  }
});
