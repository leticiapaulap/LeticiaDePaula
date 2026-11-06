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

test("entrada automática parte de trás da foto e mantém a personagem visível ao dispensar a fala", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    let captured = false;
    const observer = new MutationObserver(() => {
      const root = document.querySelector('.hero-miniature[data-ready="true"]');
      if (!root) return;
      if (!captured) {
        const motion = root.querySelector(".hero-miniature__motion")!.getBoundingClientRect();
        const photo = document.querySelector(".hero-portrait__image")!.getBoundingClientRect();
        Reflect.set(window, "__miniatureInitial", { motionLeft: motion.left, photoLeft: photo.left, readyAt: performance.now() });
        captured = true;
      }
      if (root.getAttribute("data-state") === "greeting") {
        Reflect.set(window, "__miniatureGreetingAt", performance.now());
        observer.disconnect();
      }
    });
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-ready", "data-state"] });
  });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  const initial = await page.evaluate(() => Reflect.get(window, "__miniatureInitial") as { motionLeft: number; photoLeft: number; readyAt: number });
  // Even the transparent image box starts inside the photograph: all of the
  // actual character pixels are hidden by its foreground layer at this point.
  expect(initial.motionLeft).toBeGreaterThanOrEqual(initial.photoLeft);
  const bubble = miniature.locator(".hero-miniature__bubble");
  await expect(bubble).toHaveCSS("opacity", "1");
  const greetingAt = await page.evaluate(() => Reflect.get(window, "__miniatureGreetingAt") as number);
  expect(greetingAt - initial.readyAt).toBeGreaterThanOrEqual(250);
  expect(greetingAt - initial.readyAt).toBeLessThan(1000);
  const emerged = await miniature.locator(".hero-miniature__motion").boundingBox();
  const photo = await page.locator(".hero-portrait__image").boundingBox();
  expect(emerged!.x).toBeLessThan(photo!.x - 30);
  const connectionDistance = () => miniature.evaluate((root) => {
    const mouth = root.querySelector(".hero-miniature__mouth")!.getBoundingClientRect();
    const path = root.querySelector<SVGPathElement>(".hero-miniature__tail path")!;
    const matrix = path.getScreenCTM()!;
    const length = path.getTotalLength();
    return Math.min(...Array.from({ length: 201 }, (_, index) => {
      const point = path.getPointAtLength(length * index / 200);
      const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
      return Math.hypot(screen.x - mouth.x, screen.y - mouth.y);
    }));
  });
  expect(await connectionDistance()).toBeLessThan(4);
  // Escape dismisses the speech without putting the character back behind the photo.
  await miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true }).focus();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(180);
  expect(await connectionDistance()).toBeLessThan(4);
  await waitForRest(miniature);
  const rested = await miniature.locator(".hero-miniature__motion").boundingBox();
  const viewport = await miniature.locator(".hero-miniature__viewport").boundingBox();
  expect(rested!.x).toBeCloseTo(viewport!.x, 0);
  expect(rested!.x).toBeLessThan(photo!.x - 30);
  await expect(bubble).toHaveCSS("opacity", "0");
});

test("cumprimento inicial preserva a arte aprovada e termina sem repetir", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const bubble = miniature.locator(".hero-miniature__bubble");
  const avatar = miniature.locator(".hero-miniature__avatar");
  const wavingArm = miniature.locator(".hero-miniature__wave-arm");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(avatar).toHaveAttribute("src", "/images/leticia-mini-avatar.webp");
  await expect(avatar).toHaveJSProperty("complete", true);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(579);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalHeight)).toBe(768);
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect.poll(async () => wavingArm.evaluate((arm) => {
    const matrix = new DOMMatrix(getComputedStyle(arm).transform);
    return Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
  })).toBeLessThan(-1);
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

test("cada retorno pela navegação apresenta a miniatura novamente sem timelines antigas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".hero-miniature")).toHaveAttribute("data-state", "greeting");
  await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  await expect(page.locator(".hero-miniature")).toHaveCount(0);
  const navigation = page.getByRole("navigation", { name: "Navegação principal" }).first();
  await navigation.getByRole("link", { name: "Início", exact: true }).click();
  await expect(page).toHaveURL("/");
  const miniature = page.locator(".hero-miniature");
  await expect(miniature).toHaveCount(1);
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect(miniature.locator(".hero-miniature__bubble")).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});

test("hover repete a fala uma vez e preserva a personagem sem reiniciar por pequenos movimentos", async ({ page }) => {
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
  await expect(miniature.locator(".hero-miniature__bubble")).toBeVisible();
  await waitForRest(miniature);
  await expect(miniature.locator(".hero-miniature__bubble")).toHaveCSS("opacity", "0");
  for (const fraction of [.48, .52, .5]) {
    await page.mouse.move(bounds!.x + bounds!.width * fraction, bounds!.y + bounds!.height * .5);
  }
  await page.waitForTimeout(500);
  await expect(miniature).toHaveAttribute("data-state", "rest");
  await page.mouse.move(240, 10);
  await trigger.hover();
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await page.mouse.move(240, 10);
  await waitForRest(miniature);
});

for (const width of [320, 375, 768, 1440]) {
  test(`miniatura permanece visível com movimento reduzido e balão aponta para a boca em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const miniature = page.locator(".hero-miniature");
    const trigger = miniature.getByRole("button", { name: "Cumprimentar Letícia", exact: true });
    await expect(miniature).toHaveAttribute("data-ready", "true");
    await trigger.focus();
    await expect(miniature.locator(".hero-miniature__bubble")).toHaveCSS("opacity", "1");
    const viewport = await miniature.locator(".hero-miniature__viewport").boundingBox();
    const frame = await page.locator(".hero-portrait__frame").boundingBox();
    const photo = await page.locator(".hero-portrait__image").boundingBox();
    const text = [...await textBoxes(page.locator(".hero-identity")), ...await textBoxes(page.locator(".hero-details"))];
    const hitArea = await trigger.boundingBox();
    expect(hitArea!.width).toBeGreaterThanOrEqual(44);
    expect(hitArea!.height).toBeGreaterThanOrEqual(44);
    expect(viewport!.height).toBeLessThanOrEqual(131);
    const motion = await miniature.locator(".hero-miniature__motion").boundingBox();
    expect(viewport!.x).toBeLessThan(frame!.x);
    expect(viewport!.x + viewport!.width).toBeGreaterThan(frame!.x);
    expect(viewport!.y).toBeGreaterThanOrEqual(frame!.y);
    expect(viewport!.y + viewport!.height).toBeLessThanOrEqual(frame!.y + frame!.height);
    expect(viewport!.y).toBeGreaterThan(frame!.y + frame!.height * .5);
    expect(overlaps(viewport!, photo!)).toBe(true);
    expect(await miniature.evaluate((element) => Number(getComputedStyle(element).zIndex))).toBeLessThan(
      await page.locator(".hero-portrait__image").evaluate((element) => Number(getComputedStyle(element).zIndex))
    );
    expect(text.some((bounds) => overlaps(viewport!, bounds))).toBe(false);
    // Probe opaque torso pixels in the approved artwork, rather than relying
    // only on overlapping element boxes or their declared z-index.
    const torso = { x: motion!.x + motion!.width * .77, y: motion!.y + motion!.height * .6 };
    expect(torso.x).toBeGreaterThan(photo!.x);
    expect(await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest(".hero-portrait__image"), torso)).toBe(true);
    const mouth = await miniature.locator(".hero-miniature__mouth").boundingBox();
    expect(mouth).not.toBeNull();
    const mouthPoint = { x: mouth!.x + mouth!.width / 2, y: mouth!.y + mouth!.height / 2 };
    expect(mouthPoint.x).toBeLessThan(frame!.x);
    expect(mouthPoint.y).toBeGreaterThan(frame!.y + frame!.height * .6);
    expect(mouthPoint.y).toBeLessThan(frame!.y + frame!.height);
    expect(await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest(".hero-miniature__trigger"), mouthPoint)).toBe(true);
    const bubble = miniature.locator(".hero-miniature__bubble");
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
    const bounds = await bubble.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(overlaps(bounds!, photo!)).toBe(false);
    expect(text.some((textBounds) => overlaps(bounds!, textBounds))).toBe(false);
    await expect(page.locator(".hero-portrait figcaption")).toHaveCount(0);
    const tail = await miniature.locator(".hero-miniature__tail").evaluate((element, mouthPosition) => {
      const points = Array.from(element.querySelectorAll("path")).flatMap((path) => {
        const matrix = path.getScreenCTM();
        if (!matrix) return [];
        const length = path.getTotalLength();
        return Array.from({ length: 201 }, (_, index) => {
          const point = path.getPointAtLength(length * index / 200);
          const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
          return { x: screen.x, y: screen.y };
        });
      });
      return {
        distanceToMouth: Math.min(...points.map((point) => Math.hypot(point.x - mouthPosition.x, point.y - mouthPosition.y))),
        rightmostPoint: Math.max(...points.map((point) => point.x))
      };
    }, mouthPoint);
    expect(tail.distanceToMouth).toBeLessThan(4);
    expect(tail.rightmostPoint).toBeLessThan(photo!.x);
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
    await expect(miniature.locator(".hero-miniature__bubble")).toBeVisible();
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
  const wavingArm = miniature.locator(".hero-miniature__wave-arm");
  const bubble = miniature.locator(".hero-miniature__bubble");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "greeting");
  await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
  await expect(bubble).toBeVisible();
  const transform = await motion.evaluate((element) => getComputedStyle(element).transform);
  const armTransform = await wavingArm.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  await expect(motion).toHaveCSS("transform", transform);
  await expect(wavingArm).toHaveCSS("transform", armTransform);
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
