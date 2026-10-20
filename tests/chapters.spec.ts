import { expect, test } from "@playwright/test";
import { navigateToChapter } from "./helpers/chapters";

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
    await expect(page.locator(".chapter-navigation")).toHaveAttribute("data-chapter", chapter.phase);
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

  await navigateToChapter(page, "education");
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

test("mudanças de rota movem o foco para o título, inclusive na abertura e nos estudos de caso", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navegação entre capítulos" });
  await navigation.getByRole("link", { name: "Próximo capítulo: Sobre mim" }).click();
  await expect(page.locator("main h1")).toBeFocused();
  await navigation.getByRole("link", { name: "Capítulo anterior: Apresentação" }).click();
  await expect(page.locator("#portal-title")).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page.locator("main h1")).toBeFocused();
  await page.getByRole("link", { name: "Ver detalhes" }).click();
  await expect(page.locator("main h1")).toBeFocused();
  await expect(navigation).toHaveCount(0);
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/projetos\/festa-fantasia\/$/);
  await page.getByRole("link", { name: "Voltar aos projetos" }).click();
  await expect(page.locator("main h1")).toBeFocused();
});

test("menu tem sete links reais, na ordem dos capítulos, e mantém o foco após Escape", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.click();
  const menu = page.getByRole("navigation", { name: "Navegação compacta" });
  const links = await menu.locator("a").evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
  expect(links).toEqual([...chapters.map((chapter) => chapter.path), "/curriculo/"]);
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL("/");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("gestos em galeria, diálogos, bordas e gestos cancelados não trocam o capítulo", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/projetos/");
  await page.locator(".nexo-gallery-stage").evaluate((target) => {
    const start = new Touch({ identifier: 1, target, clientX: 280, clientY: 260 });
    const end = new Touch({ identifier: 1, target, clientX: 100, clientY: 270 });
    target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
    target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
  });
  await expect(page).toHaveURL(/\/projetos\/$/);
  await page.goto("/sobre/");
  await page.locator("main").evaluate((target) => {
    for (const [initialHorizontal, cancel] of [[10, false], [280, true]] as const) {
      const start = new Touch({ identifier: 1, target, clientX: initialHorizontal, clientY: 260 });
      const end = new Touch({ identifier: 1, target, clientX: 100, clientY: 270 });
      target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
      if (cancel) target.dispatchEvent(new TouchEvent("touchcancel", { bubbles: true }));
      target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
    }
  });
  await expect(page).toHaveURL(/\/sobre\/$/);
  await page.goto("/formacao/");
  await page.getByRole("button", { name: "Ver certificado: Desenvolvedor Profissional", exact: true }).click();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/formacao\/$/);
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("controles ficam no fluxo e não cobrem o conteúdo no mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/experiencia/");
  const navigation = page.getByRole("navigation", { name: "Navegação entre capítulos" });
  const bounds = await navigation.boundingBox();
  const main = await page.locator("main").boundingBox();
  expect(bounds).not.toBeNull();
  expect(main!.y).toBeGreaterThanOrEqual(bounds!.y + bounds!.height);
  await page.locator(".nexo-experience-entry").last().scrollIntoViewIfNeeded();
  await expect(navigation).toBeInViewport();
  await expect(page.locator(".nexo-experience-entry").last()).toBeInViewport();
  await page.goto("/curriculo/");
  await expect(navigation).toHaveCount(0);
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/\/curriculo\/$/);
});

test("fallback sem WebGL mantém a navegação mesmo com movimento habilitado", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("nexo-mode", "immersive");
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, contextId: string, ...parameters: unknown[]) {
      if (contextId === "webgl2") return null;
      return Reflect.apply(getContext, this, [contextId, ...parameters]) as RenderingContext | null;
    } as typeof getContext;
  });
  await page.goto("/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-motion-enabled", "true");
  await expect(page.locator(".hero-gallery__screen--1 img")).toBeVisible();
  await expect(page.locator(".nexo-artwork__fallback")).toHaveCount(0);
  await navigateToChapter(page, "education");
  await expect(page.locator(".route-hero-scene .scene-accent__svg")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("navegação continua disponível em navegadores sem View Transitions", async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(document, "startViewTransition", { value: undefined, configurable: true }); });
  await page.goto("/");
  await navigateToChapter(page, "projects");
  await expect(page).toHaveURL(/\/projetos\/$/);
  await expect(page.locator("main h1")).toBeFocused();
  await navigateToChapter(page, "education");
  await expect(page.locator(".certification-card")).toHaveCount(10);
});

test("a transição da galeria é executada e permite outra navegação durante a animação", async ({ page }) => {
  await page.addInitScript(() => {
    const observed: string[] = [];
    const start = document.startViewTransition;
    document.startViewTransition = function (...parameters: Parameters<Document["startViewTransition"]>) {
      const transition = start.apply(this, parameters);
      transition.ready.then(() => {
        observed.push(...document.getAnimations().flatMap((animation) => animation instanceof CSSAnimation ? [animation.animationName] : []));
        document.documentElement.dataset.chapterAnimations = observed.join(" ");
      }).catch(() => {});
      return transition;
    };
  });
  await page.goto("/sobre/");
  await expect(page.locator(".nexo-experience-root")).toHaveAttribute("data-motion-enabled", "true");
  await navigateToChapter(page, "projects");
  await expect.poll(() => page.locator("html").getAttribute("data-chapter-animations")).toContain("chapter-gallery-arrive");
  await navigateToChapter(page, "convergence");
  await expect(page).toHaveURL(/\/contato\/$/);
  await expect(page.locator("main h1")).toBeFocused();
});
