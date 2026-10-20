import { expect, test } from "@playwright/test";

for (const width of [375, 1440]) {
  test(`galeria permite selecionar, abrir estudo e retornar à composição em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
    await page.goto("/");
    const gallery = page.getByRole("complementary", { name: "Galeria de projetos reais" });
    await expect(gallery).toHaveAttribute("data-gallery-focus", "overview");
    await expect(page.locator(".nexo-artwork__fallback, .nexo-artwork__coordinates, .nexo-scroll-cue")).toHaveCount(0);
    await gallery.getByRole("button", { name: "Selecionar projeto: Portfólio pessoal", exact: true }).click();
    await expect(gallery).toHaveAttribute("data-gallery-focus", "portfolio-leticia-de-paula");
    await expect(gallery.locator(".hero-gallery__technologies")).toContainText("Next.js");
    await expect(gallery.getByRole("link", { name: "Ver estudo de caso" })).toHaveAttribute("href", "/projetos/portfolio-leticia-de-paula/");
    await expect(page).toHaveURL("/");
    await gallery.getByRole("button", { name: "Ver composição completa" }).click();
    await expect(gallery).toHaveAttribute("data-gallery-focus", "overview");
    await gallery.getByRole("button", { name: "Selecionar projeto: Festa Fantasia", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(gallery).toHaveAttribute("data-gallery-focus", "portfolio-leticia-de-paula");
    await expect(gallery.getByRole("button", { name: "Selecionar projeto: Portfólio pessoal", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(gallery).toHaveAttribute("data-gallery-focus", "overview");
    await expect(gallery.getByRole("button", { name: "Selecionar projeto: Portfólio pessoal", exact: true })).toBeFocused();
    await gallery.getByRole("button", { name: "Selecionar projeto: Festa Fantasia", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(gallery).toHaveAttribute("data-gallery-focus", "festa-fantasia");
    await gallery.getByRole("link", { name: "Ver estudo de caso" }).click();
    await expect(page).toHaveURL(/\/projetos\/festa-fantasia\/$/);
    await expect(page.locator("main h1")).toBeFocused();
  });
}

test("galeria WebGL usa um canvas, aceita clique na tela e preserva a cena entre rotas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  const gallery = page.locator(".hero-gallery");
  await expect(gallery).toHaveAttribute("data-renderer", "webgl", { timeout: 20000 });
  await expect(page.locator(".nexo-scene-surface")).toHaveAttribute("data-scene-content", "project-gallery");
  await expect(page.locator(".nexo-scene-surface svg")).toHaveCount(0);
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveCount(1);
  await canvas.evaluate((element) => element.setAttribute("data-gallery-instance", "persistent"));
  const bounds = await canvas.boundingBox();
  await canvas.click({ position: { x: bounds!.width * 0.4, y: bounds!.height * 0.62 } });
  await expect(gallery).toHaveAttribute("data-gallery-focus", "festa-fantasia");
  await page.getByRole("link", { name: "Próximo capítulo: Sobre mim" }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(canvas).toHaveAttribute("data-gallery-instance", "persistent");
  await page.getByRole("link", { name: "Capítulo anterior: Apresentação" }).click();
  await expect(gallery).toHaveAttribute("data-renderer", "webgl");
  await expect(canvas).toHaveAttribute("data-gallery-instance", "persistent");
  await canvas.evaluate((element) => element.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  await expect(gallery).toHaveAttribute("data-renderer", "fallback");
  await expect(canvas).toHaveCount(0);
  await expect(gallery.locator(".hero-gallery__screen--1 img")).toBeVisible();
  expect(errors).toEqual([]);
});

test.describe("galeria por toque", () => {
  test.use({ hasTouch: true, viewport: { width: 375, height: 812 } });

  test("mobile mantém uma tela visível, sem WebGL, e gestos internos não trocam capítulo", async ({ page }) => {
    await page.goto("/");
    const gallery = page.locator(".hero-gallery");
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(gallery.locator(".hero-gallery__screen--1")).toBeVisible();
    await expect(gallery.locator(".hero-gallery__screen--2")).toBeHidden();
    await gallery.getByRole("button", { name: "Selecionar projeto: Portfólio pessoal", exact: true }).tap();
    await expect(gallery.locator(".hero-gallery__screen--2")).toBeVisible();
    await expect(gallery.locator(".hero-gallery__screen--2 img")).toHaveJSProperty("complete", true);
    expect(await gallery.locator(".hero-gallery__screen--2 img").evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(gallery.locator(".hero-gallery__screen--1")).toBeHidden();
    await gallery.evaluate((target) => {
      const start = new Touch({ identifier: 1, target, clientX: 280, clientY: 260 });
      const end = new Touch({ identifier: 1, target, clientX: 100, clientY: 270 });
      target.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, touches: [start] }));
      target.dispatchEvent(new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }));
    });
    await expect(page).toHaveURL("/");
  });
});

test("movimento reduzido mantém capturas reais e ações sem renderizador", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-gallery")).toHaveAttribute("data-renderer", "fallback");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".hero-gallery__fallback")).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Selecionar projeto: Festa Fantasia", exact: true }).click();
  await expect(page.locator(".hero-gallery__case")).toHaveAttribute("href", "/projetos/festa-fantasia/");
});

test("navegação é mínima, tem nomes de destino e encerra com retorno ao início", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Navegação entre capítulos" });
  await expect(navigation.locator("select")).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: /Capítulo anterior/ })).toHaveCount(0);
  await expect(navigation.getByRole("link", { name: "Próximo capítulo: Sobre mim" })).toHaveText("Sobre mim");
  await page.goto("/contato/");
  await expect(navigation.getByRole("link", { name: "Voltar ao início: Apresentação" })).toHaveText("Voltar ao início");
  await navigation.getByRole("link", { name: "Voltar ao início: Apresentação" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("#portal-title")).toBeFocused();
});
