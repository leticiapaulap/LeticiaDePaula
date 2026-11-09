import { expect, test, type Locator } from "@playwright/test";

async function waitForRest(miniature: Locator) {
  await expect(miniature).toHaveAttribute("data-state", "rest", { timeout: 15000 });
}

test("mini Letícia entra automaticamente pela lateral e permanece ao lado da foto", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const miniature = page.locator(".hero-miniature");
  const motion = miniature.locator(".hero-miniature__motion");
  const avatar = miniature.locator(".hero-miniature__avatar");
  const photo = page.locator(".hero-portrait__image");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "entering");
  await expect(avatar).toHaveAttribute("src", "/images/leticia-mini-avatar.webp");
  await expect(avatar).toHaveJSProperty("complete", true);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(579);
  expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalHeight)).toBe(768);
  await expect(page.locator(".hero-miniature__bubble, .hero-miniature__tail, .hero-miniature__trigger")).toHaveCount(0);
  await expect(page.getByText("Oi! Que bom ter você por aqui!", { exact: true })).toHaveCount(0);

  const photoBounds = await photo.boundingBox();
  await waitForRest(miniature);
  const characterBounds = await motion.boundingBox();
  expect(characterBounds!.x).toBeLessThan(photoBounds!.x - 30);
  expect(await miniature.evaluate((element) => element.getAttribute("aria-hidden"))).toBe("true");
});

for (const width of [320, 375, 390, 768, 1440]) {
  test(`miniatura sem balão mantém a posição lateral e a foto intacta em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const miniature = page.locator(".hero-miniature");
    const avatar = miniature.locator(".hero-miniature__avatar");
    const motion = miniature.locator(".hero-miniature__motion");
    const frame = page.locator(".hero-portrait__frame");
    const photo = page.locator(".hero-portrait__image");
    await expect(miniature).toHaveAttribute("data-ready", "true");
    await expect(miniature).toHaveAttribute("data-state", "rest");
    await expect(miniature).toBeVisible();
    await expect(avatar).toBeVisible();
    await expect(page.locator(".hero-miniature__bubble, .hero-miniature__tail, .hero-miniature__trigger")).toHaveCount(0);
    await expect(page.getByText("Oi! Que bom ter você por aqui!", { exact: true })).toHaveCount(0);

    const frameBounds = await frame.boundingBox();
    const photoBounds = await photo.boundingBox();
    const characterBounds = await miniature.boundingBox();
    const motionBounds = await motion.boundingBox();
    expect(characterBounds!.x).toBeLessThan(frameBounds!.x);
    expect(characterBounds!.x + characterBounds!.width).toBeGreaterThan(frameBounds!.x);
    expect(motionBounds!.x).toBeLessThan(photoBounds!.x);
    expect(await miniature.evaluate((element) => getComputedStyle(element).zIndex)).toBe("0");
    expect(await page.locator(".hero-portrait__image").evaluate((element) => getComputedStyle(element).zIndex)).toBe("1");
    expect(await avatar.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(579);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("movimento reduzido mantém miniatura estática sem desativar a foto", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const motion = miniature.locator(".hero-miniature__motion");
  const wavingArm = miniature.locator(".hero-miniature__wave-arm");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await waitForRest(miniature);

  const transform = await motion.evaluate((element) => getComputedStyle(element).transform);
  const armTransform = await wavingArm.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  await expect(motion).toHaveCSS("transform", transform);
  await expect(wavingArm).toHaveCSS("transform", armTransform);
  expect(await miniature.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length)).toBe(0);
  await expect(page.locator(".hero-portrait__image img")).toBeVisible();
});

test("mudar para movimento reduzido interrompe a entrada e deixa a miniatura visível", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const miniature = page.locator(".hero-miniature");
  const motion = miniature.locator(".hero-miniature__motion");
  await expect(miniature).toHaveAttribute("data-ready", "true");
  await expect(miniature).toHaveAttribute("data-state", "entering");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await waitForRest(miniature);

  const transform = await motion.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  await expect(motion).toHaveCSS("transform", transform);
  expect(await miniature.evaluate((element) => element.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length)).toBe(0);
  await expect(page.locator(".hero-portrait__image img")).toBeVisible();
});

test("falha na arte remove só a miniatura e mantém foto e navegação", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/images/leticia-mini-avatar.webp", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".hero-miniature")).toBeHidden();
  const photo = page.locator(".hero-portrait__image img");
  await expect(photo).toBeVisible();
  await expect(photo).toHaveJSProperty("complete", true);
  expect(await photo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/$/);
  expect(errors).toEqual([]);
});
