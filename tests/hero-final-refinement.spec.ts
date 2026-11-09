import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 375, height: 667 }
];

for (const theme of ["light", "dark"] as const) {
  test(`iluminação da moldura é sutil, responsiva ao hover e reduzida em movimento (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    await page.locator(".hero-portrait").evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));

    const stage = page.locator(".hero-portrait__stage");
    const frame = page.locator(".hero-portrait__frame");
    const photo = page.locator(".hero-portrait__image");
    const initialFrame = await frame.boundingBox();
    const initial = await stage.evaluate((element) => {
      const halo = getComputedStyle(element, "::before");
      const frameElement = element.querySelector<HTMLElement>(".hero-portrait__frame")!;
      const lightElement = element.querySelector<HTMLElement>(".hero-portrait__light")!;
      const photoImage = element.querySelector<HTMLImageElement>(".hero-portrait__image img")!;
      const edge = getComputedStyle(frameElement, "::after");
      const light = getComputedStyle(lightElement);
      return {
        haloOpacity: Number(halo.opacity),
        haloDuration: halo.animationDuration,
        edgeOpacity: Number(edge.opacity),
        lightOpacity: Number(light.opacity),
        lightDuration: light.animationDuration,
        imageFilter: getComputedStyle(photoImage).filter
      };
    });

    expect(initial.haloOpacity).toBeGreaterThan(0);
    expect(initial.haloOpacity).toBeLessThan(1);
    expect(initial.haloDuration).toBe("20s");
    expect(initial.edgeOpacity).toBeGreaterThan(0);
    expect(initial.edgeOpacity).toBeLessThan(1);
    expect(initial.lightOpacity).toBeGreaterThan(0);
    expect(initial.lightDuration).toBe("24s");
    expect(initial.imageFilter).toBe("none");

    await photo.hover();
    await expect.poll(() => stage.evaluate((element) => Number(getComputedStyle(element, "::before").opacity))).toBeGreaterThan(initial.haloOpacity);
    await expect.poll(() => frame.evaluate((element) => Number(getComputedStyle(element, "::after").opacity))).toBeGreaterThan(initial.edgeOpacity);
    expect(await frame.boundingBox()).toEqual(initialFrame);

    await page.emulateMedia({ reducedMotion: "reduce" });
    const reduced = await stage.evaluate((element) => ({
      haloAnimation: getComputedStyle(element, "::before").animationName,
      lightAnimation: getComputedStyle(element.querySelector<HTMLElement>(".hero-portrait__light")!).animationName,
      haloOpacity: Number(getComputedStyle(element, "::before").opacity)
    }));
    expect(reduced.haloAnimation).toBe("none");
    expect(reduced.lightAnimation).toBe("none");
    expect(reduced.haloOpacity).toBeGreaterThan(0);
    expect(await frame.boundingBox()).toEqual(initialFrame);
  });
}

for (const viewport of viewports) {
  for (const theme of ["light", "dark"] as const) {
    test(`apresentação automática e composição final em ${viewport.width}x${viewport.height} (${theme})`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
      const miniature = page.locator(".hero-miniature");
      const motion = miniature.locator(".hero-miniature__motion");
      await expect(miniature).toHaveAttribute("data-ready", "true");
      await expect(miniature).toHaveAttribute("aria-hidden", "true");
      await expect(miniature.locator("button, .hero-miniature__bubble, .hero-miniature__tail")).toHaveCount(0);
      await expect(page.getByText("Oi! Que bom ter você por aqui!", { exact: true })).toHaveCount(0);
      await expect(miniature).toHaveAttribute("data-state", "entering");

      const photo = await page.locator(".hero-portrait__image").boundingBox();
      const frame = await page.locator(".hero-portrait__frame").boundingBox();
      const initialCharacter = await motion.boundingBox();
      expect(initialCharacter!.x).toBeGreaterThanOrEqual(frame!.x);

      await expect(page.getByText("Pessoas. Ideias. Possibilidades.", { exact: true })).toHaveCount(0);
      await expect(page.locator(".hero-portrait figcaption")).toHaveCount(0);
      const hero = await page.locator("#portal").boundingBox();
      const footer = await page.locator(".site-footer").boundingBox();
      expect(footer!.y - hero!.y - hero!.height).toBeGreaterThanOrEqual(-1);
      expect(footer!.y - hero!.y - hero!.height).toBeLessThanOrEqual(32);
      if (viewport.width >= 768) expect(hero!.height).toBeLessThan(viewport.height * .9);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator(".hero-portrait__image img")).toHaveJSProperty("complete", true);

      await expect(miniature).toHaveAttribute("data-state", "rest");
      const settled = await motion.boundingBox();
      expect(settled!.x).toBeLessThan(photo!.x - 20);
      expect(settled!.x).toBeLessThan(frame!.x);
      await expect(miniature.locator(".hero-miniature__avatar")).toHaveAttribute("src", "/images/leticia-mini-avatar.webp");
      await page.waitForTimeout(300);
      expect(await motion.boundingBox()).toEqual(settled);
      await expect(miniature).toHaveAttribute("data-state", "rest");
      await page.screenshot({ path: testInfo.outputPath(`hero-sem-balao-${theme}.png`), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}
