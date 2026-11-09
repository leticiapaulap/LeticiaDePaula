import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function portraitMotion(stage: Locator) {
  return stage.evaluate((element) => {
    const style = getComputedStyle(element.querySelector(".hero-portrait__frame")!);
    return [style.transform, style.translate, style.scale];
  });
}

for (const width of [320, 375, 430, 768, 1024, 1100, 1440, 1920]) {
  test(`abertura pessoal com foto e ações claras em ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("html")).toHaveClass(/\blight\b/);
    await expect(page.locator("main h1")).toHaveText(/Letícia\s*de Paula/);
    await expect(page.locator(".hero-gallery, .editorial-practice, .chapter-navigation, .nexo-experience-stage, main canvas")).toHaveCount(0);
    await expect(page.getByText("Entre a ideia e o uso real.")).toHaveCount(0);
    const portrait = page.locator(".hero-portrait");
    const photo = portrait.getByRole("img", { name: /Letícia de Paula/ });
    await expect(portrait).toBeVisible();
    await expect(portrait.locator(".hero-character, canvas")).toHaveCount(0);
    await expect(portrait.locator(".hero-miniature")).toHaveAttribute("aria-hidden", "true");
    await expect(portrait.locator(".hero-miniature button, .hero-miniature__bubble")).toHaveCount(0);
    await expect(photo).toBeVisible();
    await expect(photo).toHaveJSProperty("complete", true);
    expect(await photo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(photo).toHaveAttribute("loading", "eager");
    await expect(photo).toHaveAttribute("fetchpriority", "high");
    await expect(photo).toHaveAttribute("width", /\d+/);
    await expect(photo).toHaveAttribute("height", /\d+/);
    const portraitBounds = await portrait.boundingBox();
    expect(portraitBounds!.width).toBeGreaterThanOrEqual(180);
    expect(portraitBounds!.height).toBeGreaterThanOrEqual(180);
    const titleSize = await page.locator("main h1").evaluate((heading) => parseFloat(getComputedStyle(heading).fontSize));
    expect(titleSize).toBeGreaterThanOrEqual(38);
    const primary = page.getByRole("link", { name: "Conhecer projetos", exact: true });
    await expect(primary).toBeVisible();
    await expect(primary).toHaveAttribute("href", "/projetos/");
    await expect(page.locator("main .nexo-button--primary")).toHaveCount(1);
    const trajectory = page.locator("main").getByRole("link", { name: /Minha trajetória/i });
    await expect(trajectory).toBeVisible();
    await expect(trajectory).toHaveAttribute("href", "/sobre/");
    await expect(page.locator("main a[href*='curriculo']")).toHaveCount(0);
    await expect(page.locator("#portal a")).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if ([375, 768, 1024, 1100, 1440].includes(width)) {
      await page.screenshot({ path: testInfo.outputPath("hero-com-foto.png"), fullPage: true, animations: "disabled" });
    }
    await primary.click();
    await expect(page).toHaveURL(/\/projetos\/$/);
    await expect(page.locator(".editorial-project-card")).toHaveCount(6);
    expect(errors).toEqual([]);
  });
}

test("miniatura decorativa não interfere na ordem de teclado dos links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const primary = page.getByRole("link", { name: "Conhecer projetos", exact: true });
  await primary.focus();
  await page.keyboard.press("Tab");
  const trajectory = page.locator("main").getByRole("link", { name: /Minha trajetória/i });
  await expect(trajectory).toBeFocused();
  expect(await trajectory.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await expect(page.locator(".hero-miniature")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".hero-miniature button, .hero-miniature__bubble")).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(page.locator("main h1")).toBeFocused();
});

for (const theme of ["light", "dark"]) {
test(`iluminação discreta reage ao hover sem mover ou filtrar a fotografia no tema ${theme}`, async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
  const stage = page.locator(".hero-portrait__stage");
  const photo = page.locator(".hero-portrait__image");
  await expect(photo.locator("img")).toHaveJSProperty("complete", true);
  // The approved arrival can finish before measuring hover stability.
  await page.locator(".hero-portrait").evaluate(async (element) => Promise.allSettled(element.getAnimations().map((animation) => animation.finished)));
  const initial = await portraitMotion(stage);
  const initialBox = await photo.boundingBox();
  const initialPixels = await photo.screenshot();
  const ambientOpacity = () => stage.evaluate((element) => parseFloat(getComputedStyle(element, "::before").opacity));
  const initialOpacity = await ambientOpacity();
  const ambient = await stage.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    return { background: style.backgroundImage, zIndex: Number(style.zIndex), duration: parseFloat(style.animationDuration), events: style.pointerEvents };
  });
  expect(ambient.background).toContain("radial-gradient");
  expect(ambient.zIndex).toBeLessThan(0);
  expect(ambient.duration).toBeGreaterThanOrEqual(15);
  expect(ambient.events).toBe("none");
  const frame = page.locator(".hero-portrait__frame");
  const ring = await frame.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return { mask: style.maskImage, background: style.backgroundImage, events: style.pointerEvents };
  });
  expect(ring.mask).not.toBe("none");
  expect(ring.background).toContain("gradient");
  expect(ring.events).toBe("none");
  const passage = page.locator(".hero-portrait__light");
  expect(await passage.evaluate((element) => parseFloat(getComputedStyle(element).animationDuration))).toBeGreaterThanOrEqual(15);
  await stage.hover({ position: { x: 40, y: 25 } });
  await expect.poll(ambientOpacity).toBeGreaterThan(initialOpacity + .05);
  await expect.poll(() => portraitMotion(stage)).toEqual(initial);
  expect(await photo.boundingBox()).toEqual(initialBox);
  expect(initialPixels.equals(await photo.screenshot())).toBe(true);
  await expect(photo.locator("img")).toHaveCSS("filter", "none");
  await expect(photo).toHaveCSS("filter", "none");
  await expect(frame).toHaveCSS("filter", "none");
  await page.mouse.move(240, 10);
  await expect.poll(async () => Math.abs(await ambientOpacity() - initialOpacity)).toBeLessThan(.01);
  expect(await photo.boundingBox()).toEqual(initialBox);
});
}

test("movimento reduzido mantém foto e ações sem resposta ao ponteiro", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const stage = page.locator(".hero-portrait__stage");
  await stage.scrollIntoViewIfNeeded();
  const initial = await portraitMotion(stage);
  const bounds = await stage.boundingBox();
  await page.mouse.move(bounds!.x + bounds!.width * .8, bounds!.y + bounds!.height * .3);
  await expect.poll(() => portraitMotion(stage)).toEqual(initial);
  const animations = await page.locator(".hero-portrait, .hero-portrait *").evaluateAll((elements) => elements.flatMap((element) => element.getAnimations().filter((animation) => animation.playState === "running")) .length);
  expect(animations).toBe(0);
  await expect(page.locator(".hero-portrait__image img")).toBeVisible();
  await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
});

test("mudar a preferência para movimento reduzido mantém a iluminação estática", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stage = page.locator(".hero-portrait__stage");
  await stage.scrollIntoViewIfNeeded();
  await expect.poll(() => stage.evaluate((element) => getComputedStyle(element, "::before").animationName)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => stage.evaluate((element) => getComputedStyle(element, "::before").animationName)).toBe("none");
  await expect(page.locator(".hero-portrait__light")).toHaveCSS("animation-name", "none");
  const backgroundPosition = await stage.evaluate((element) => getComputedStyle(element, "::before").backgroundPosition);
  await page.waitForTimeout(200);
  expect(await stage.evaluate((element) => getComputedStyle(element, "::before").backgroundPosition)).toBe(backgroundPosition);
  expect(await stage.evaluate((element) => parseFloat(getComputedStyle(element, "::before").opacity))).toBeGreaterThan(0);
});

test("toque mantém o retrato estável e não bloqueia rolagem natural", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  const stage = page.locator(".hero-portrait__stage");
  await stage.scrollIntoViewIfNeeded();
  const initial = await portraitMotion(stage);
  await stage.tap();
  await expect.poll(() => portraitMotion(stage)).toEqual(initial);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  expect(await stage.evaluate((element) => getComputedStyle(element).touchAction)).not.toBe("none");
  await context.close();
});

for (const theme of ["light", "dark"]) {
  test(`retrato integrado é acessível no tema ${theme}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    await expect(page.locator(".hero-portrait__image img")).toHaveJSProperty("complete", true);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })) }))).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`hero-${theme}.png`), fullPage: true, animations: "disabled" });
  });
}

test("foto e links da abertura continuam disponíveis sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto("/");
  const photo = page.locator(".hero-portrait__image img");
  await expect(photo).toBeVisible();
  await expect(photo).toHaveJSProperty("complete", true);
  expect(await photo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.locator("main").getByRole("link", { name: /Minha trajetória/i }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await context.close();
});

test("tema claro inicial e preferência escura persistente entre rotas e recargas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await page.getByRole("button", { name: "Ativar tema escuro", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await page.getByRole("button", { name: "Ativar tema claro", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
});

test("sessão limpa abre clara mesmo com sistema escuro e sem espaço para navegação duplicada", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\blight\b/);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(247, 244, 238)");
  const sidebar = await page.locator(".portfolio-sidebar").boundingBox();
  const main = await page.locator("main").boundingBox();
  expect(main!.x).toBeGreaterThanOrEqual(sidebar!.x + sidebar!.width);
  await expect(page.locator('.chapter-navigation, .chapter-navigation__status, progress, .editorial-practice')).toHaveCount(0);
});

for (const theme of ["light", "dark"]) {
  test(`preferência ${theme} previamente salva é respeitada`, async ({ page }) => {
    await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    await expect(page.locator("body")).toHaveCSS("background-color", theme === "light" ? "rgb(247, 244, 238)" : "rgb(14, 38, 49)");
    await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
    await page.reload();
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(theme);
  });
}

test("navegação lateral retorna ao início e move o foco para o nome", async ({ page }) => {
  await page.goto("/contato/");
  await expect(page.locator(".chapter-artwork")).toHaveCount(0);
  const navigation = page.getByRole("navigation", { name: "Navegação principal" }).first();
  await navigation.getByRole("link", { name: "Início", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(page.locator("#portal-title")).toBeFocused();
});
