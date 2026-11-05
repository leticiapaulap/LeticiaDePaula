import { expect, test, type Locator } from "@playwright/test";

function overlaps(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

async function waitForRest(miniature: Locator) {
  await expect(miniature).toHaveAttribute("data-state", "rest", { timeout: 15000 });
}

async function textBoxes(locator: Locator) {
  return locator.evaluate((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const boxes: { x: number; y: number; width: number; height: number }[] = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      boxes.push(...Array.from(range.getClientRects(), ({ x, y, width, height }) => ({ x, y, width, height })));
    }
    return boxes;
  });
}

test("cumprimento inicial apresenta a nova arte e termina sem repetir", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const bubble = miniature.locator(".hero-miniature__bubble");
  const avatar = miniature.locator(".hero-miniature__avatar");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(avatar).toHaveAttribute("src", "/images/leticia-mini-avatar.webp");
  await expect(avatar).toHaveJSProperty("complete", true);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(579);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalHeight)).toBe(768);
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
  await expect(bubble).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("mini-leticia-cumprimento.png"), fullPage: true });
  await waitForRest(miniature);
  await expect(bubble).toHaveCSS("opacity", "0");
  const imageSource = await avatar.getAttribute("src");
  await page.waitForTimeout(1800);
  await expect(miniature).toHaveAttribute("data-state", "rest");
  await expect(avatar).toHaveAttribute("src", imageSource!);
  await page.reload();
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
  await expect(bubble).toBeVisible();
  expect(errors).toEqual([]);
});

test("hover reage uma vez e recolhe ao sair sem reiniciar por movimento do cursor", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const trigger = miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true });
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await waitForRest(miniature);
  await trigger.hover();
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  const bounds = await trigger.boundingBox();
  for (const fraction of [.45, .55, .48, .52]) {
    await page.mouse.move(bounds!.x + bounds!.width * fraction, bounds!.y + bounds!.height * .5);
  }
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await page.mouse.move(240, 10);
  await waitForRest(miniature);
  await expect(miniature.locator(".hero-miniature__bubble")).toHaveCSS("opacity", "0");
});

for (const width of [320, 375, 768, 1024, 1100, 1440]) {
  test(`miniatura ancorada à moldura e balão sem sobreposição em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const miniature = page.locator(".hero-miniature");
    const trigger = miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true });
    await expect(miniature).toHaveAttribute("data-ready", "true");
    await trigger.focus();
    const viewport = await miniature.locator(".hero-miniature__viewport").boundingBox();
    const frame = await page.locator(".hero-portrait__frame").boundingBox();
    const photo = await page.locator(".hero-portrait__image").boundingBox();
    const text = [...await textBoxes(page.locator(".hero-identity")), ...await textBoxes(page.locator(".hero-details"))];
    const hitArea = await trigger.boundingBox();
    expect(hitArea!.width).toBeGreaterThanOrEqual(44);
    expect(hitArea!.height).toBeGreaterThanOrEqual(44);
    expect(viewport!.height).toBeLessThanOrEqual(131);
    const motion = await miniature.locator(".hero-miniature__motion").boundingBox();
    expect(motion!.y).toBeCloseTo(viewport!.y, 0);
    expect(viewport!.x).toBeLessThan(frame!.x);
    expect(viewport!.x + viewport!.width).toBeGreaterThan(frame!.x);
    expect(viewport!.y).toBeGreaterThanOrEqual(frame!.y);
    expect(viewport!.y + viewport!.height).toBeLessThanOrEqual(frame!.y + frame!.height);
    expect(overlaps(viewport!, photo!)).toBe(true);
    expect(await miniature.evaluate((element) => Number(getComputedStyle(element).zIndex))).toBeLessThan(
      await page.locator(".hero-portrait__image").evaluate((element) => Number(getComputedStyle(element).zIndex))
    );
    expect(text.some((bounds) => overlaps(viewport!, bounds))).toBe(false);
    const bubble = miniature.locator(".hero-miniature__bubble");
    if (width >= 1100) {
      await expect(bubble).toBeVisible();
      const bounds = await bubble.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(overlaps(bounds!, photo!)).toBe(false);
      expect(text.some((textBounds) => overlaps(bounds!, textBounds))).toBe(false);
    } else {
      await expect(bubble).toBeHidden();
    }
    expect(await miniature.locator(".hero-miniature__viewport").evaluate((element) => getComputedStyle(element).overflow)).toBe("visible");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("teclado cumprimenta e preserva foco visível", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const trigger = miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true });
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await trigger.focus();
  await expect(trigger).toBeFocused();
  expect(await trigger.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await page.keyboard.press("Tab");
  await waitForRest(miniature);
});

test("toque inicia cumprimento mantendo a foto estável e rolagem livre", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference" });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const miniature = page.locator(".hero-miniature");
    await expect(miniature).toHaveAttribute("data-ready", "true");
    await expect(miniature).toHaveAttribute("data-state", "greeting");
    await waitForRest(miniature);
    const frame = await page.locator(".hero-portrait__frame").boundingBox();
    await miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true }).tap();
    await expect(miniature).toHaveAttribute("data-state", "greeting");
    await expect(miniature.locator(".hero-miniature__avatar")).toBeVisible();
    await expect(miniature.locator(".hero-miniature__bubble")).toBeHidden();
    expect(await page.locator(".hero-portrait__frame").boundingBox()).toEqual(frame);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await waitForRest(miniature);
    await miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true }).tap();
    await expect(miniature).toHaveAttribute("data-state", "greeting");
  } finally {
    await context.close();
  }
});

test("cada visita cumprimenta mesmo com movimento reduzido, sem animar a arte", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const motion = miniature.locator(".hero-miniature__motion");
  const bubble = miniature.locator(".hero-miniature__bubble");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
  await expect(bubble).toBeVisible();
  const transform = await motion.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  await expect(motion).toHaveCSS("transform", transform);
  expect(await miniature.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length)).toBe(0);
});

test("movimento reduzido mantém a arte estática inclusive ao mudar a preferência", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const trigger = miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true });
  await trigger.hover();
  await trigger.focus();
  const transform = await miniature.locator(".hero-miniature__motion").evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(800);
  await expect(miniature.locator(".hero-miniature__motion")).toHaveCSS("transform", transform);
  const animations = await miniature.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length);
  expect(animations).toBe(0);
  await expect(page.locator(".hero-portrait__image img")).toBeVisible();
});

test("falha na arte remove só a miniatura e mantém foto e navegação", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/images/leticia-mini-avatar.webp", (route) => route.abort());
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Cumprimentar Letícia", exact: true })).toBeHidden();
  const photo = page.locator(".hero-portrait__image img");
  await expect(photo).toBeVisible();
  await expect(photo).toHaveJSProperty("complete", true);
  expect(await photo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  expect(errors).toEqual([]);
});
