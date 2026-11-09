import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { heroCharacterModelPath, resolveHeroCharacterClip } from "../lib/hero-character";

for (const width of [768, 900, 1024, 1100, 1280, 1366, 1440, 1920]) {
  test(`retrato ampliado discretamente preserva o protagonismo do nome em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const figure = await page.locator(".hero-portrait").boundingBox();
    const image = await page.locator(".hero-portrait__image").boundingBox();
    const identity = await page.locator(".hero-identity").boundingBox();
    const details = await page.locator(".hero-details").boundingBox();
    expect(figure).not.toBeNull();
    expect(image).not.toBeNull();
    expect(identity).not.toBeNull();
    expect(details).not.toBeNull();
    expect(figure!.width).toBeLessThanOrEqual(308);
    expect(image!.width).toBeGreaterThanOrEqual(190);
    // The approved desktop crop grows at most 15% from its previous 238 px.
    expect(image!.width).toBeLessThanOrEqual(274);
    expect(image!.height / image!.width).toBeCloseTo(1.25, 2);
    expect(image!.width).toBeLessThan(identity!.width);
    expect(image!.x).toBeGreaterThan(identity!.x + identity!.width);

    const textCenter = (identity!.y + details!.y + details!.height) / 2;
    const imageCenter = image!.y + image!.height / 2;
    expect(Math.abs(imageCenter - textCenter)).toBeLessThan(90);
    if (width >= 1366) {
      const content = await page.locator(".personal-opening .nexo-portal__content").boundingBox();
      expect(content!.width).toBeGreaterThan(1000);
      expect(content!.width).toBeLessThanOrEqual(1240);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("apresentação comunica aplicações web, processos e automação sem repetir a frase genérica", async ({ page }) => {
  await page.goto("/");
  const details = page.locator(".hero-details");
  await expect(page.locator("main h1")).toHaveText(/Letícia\s*de Paula/);
  await expect(details).toContainText("Desenvolvo aplicações web e automações");
  await expect(details).toContainText("organizar processos");
  await expect(details).toContainText("simplificar tarefas");
  await expect(details).toContainText("transformar informações em soluções práticas");
  await expect(details).not.toContainText("Tecnologia com propósito.");
  await expect(details).not.toContainText("Desenvolvo interfaces e aplicações que conectam pessoas, dados e ideias");
  expect(await details.locator(":scope > p").count()).toBeLessThanOrEqual(2);
  await expect(details.getByRole("link")).toHaveText(["Conhecer projetos", "Minha trajetória"]);
});

for (const width of [320, 375, 430]) {
  test(`mobile ${width}px mantém foto compacta entre nome e apresentação`, async ({ page }) => {
    await page.setViewportSize({ width, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const title = await page.locator("main h1").boundingBox();
    const figure = await page.locator(".hero-portrait").boundingBox();
    const image = await page.locator(".hero-portrait__image").boundingBox();
    const details = await page.locator(".hero-details").boundingBox();
    expect(figure!.width).toBeLessThanOrEqual(261);
    expect(image!.width).toBeGreaterThanOrEqual(190);
    expect(image!.width).toBeLessThanOrEqual(240);
    expect(image!.height / image!.width).toBeCloseTo(1.25, 2);
    expect(title!.y + title!.height).toBeLessThanOrEqual(figure!.y);
    expect(figure!.y + figure!.height).toBeLessThanOrEqual(details!.y + 1);
    expect(figure!.x).toBeGreaterThanOrEqual(16);
    expect(figure!.x + figure!.width).toBeLessThanOrEqual(width - 15);
    await expect(page.locator(".hero-portrait__image img")).toHaveJSProperty("complete", true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("estrutura futura do GLB reconhece apenas os clipes existentes", () => {
  expect(heroCharacterModelPath).toBe("/models/leticia-mini.glb");
  const clips = ["Armature|Idle", "Peek", "Wave"];
  expect(resolveHeroCharacterClip(clips, "idle")).toBe("Armature|Idle");
  expect(resolveHeroCharacterClip(clips, "peek")).toBe("Peek");
  expect(resolveHeroCharacterClip(clips, "wave")).toBe("Wave");
  expect(resolveHeroCharacterClip(clips, "hide")).toBeUndefined();
  expect(resolveHeroCharacterClip([], "idle")).toBeUndefined();
});

for (const width of [375, 768, 1440]) {
  test(`miniatura 2D preserva foto e não carrega o boneco geométrico em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto("/");

    await expect(page.locator(".hero-portrait .hero-character, .hero-portrait .hero-character__interaction, .hero-portrait canvas")).toHaveCount(0);
    await expect(page.locator(".hero-miniature")).toHaveAttribute("data-ready", "true");
    await expect(page.locator(".hero-miniature")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".hero-miniature button, .hero-miniature__bubble")).toHaveCount(0);
    const photo = page.locator(".hero-portrait__image img");
    await expect(photo).toBeVisible();
    await expect(photo).toHaveJSProperty("complete", true);
    expect(await photo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(errors).toEqual([]);
  });
}

test("CTAs refinados preservam área de toque, contraste e foco sem deslocar o layout", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const actions = page.locator(".nexo-portal__actions");
  await expect(actions.getByRole("link")).toHaveCount(2);
  const primary = actions.getByRole("link", { name: "Conhecer projetos", exact: true });
  const secondary = actions.getByRole("link", { name: "Minha trajetória", exact: true });
  for (const action of [primary, secondary]) {
    const bounds = await action.boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
  }

  const before = await actions.boundingBox();
  await primary.hover();
  await expect.poll(() => actions.boundingBox()).toEqual(before);
  await primary.evaluate(async (element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  const hovered = await new AxeBuilder({ page }).include(".nexo-portal__actions").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(hovered.violations.map(({ id }) => id)).toEqual([]);

  await primary.focus();
  await page.keyboard.press("Tab");
  await expect(secondary).toBeFocused();
  expect(await secondary.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  const focused = await new AxeBuilder({ page }).include(".nexo-portal__actions").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(focused.violations.map(({ id }) => id)).toEqual([]);
});
