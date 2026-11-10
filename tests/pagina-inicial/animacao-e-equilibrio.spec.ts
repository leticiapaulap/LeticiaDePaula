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
      const pageEnd = await page.evaluate(() => document.documentElement.scrollHeight);
      // The hero absorbs spare height; the footer must finish the page instead
      // of leaving the viewport-height shell empty below a content-sized hero.
      expect(pageEnd - footer!.y - footer!.height).toBeLessThanOrEqual(2);
      expect(footer!.height).toBeLessThanOrEqual(110);
      if (viewport.width >= 768) {
        expect(Math.abs(footer!.y + footer!.height - viewport.height)).toBeLessThanOrEqual(2);
        const identity = await page.locator(".hero-identity").boundingBox();
        const details = await page.locator(".hero-details").boundingBox();
        const copyCenter = (identity!.y + details!.y + details!.height) / 2;
        expect(Math.abs(photo!.y + photo!.height / 2 - copyCenter)).toBeLessThan(90);
      }
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

for (const theme of ["light", "dark"] as const) {
  test(`luzes ambientais se movem sem deslocar a composição e respeitam movimento reduzido (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript((saved) => localStorage.setItem("theme", saved), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));
    await expect(page.locator(".hero-miniature")).toHaveAttribute("data-state", "rest");
    const ambient = page.locator(".hero-ambient");
    const lights = ambient.locator(":scope > span");
    await expect(ambient).toHaveAttribute("aria-hidden", "true");
    await expect(ambient).toHaveCSS("pointer-events", "none");
    await expect(lights).toHaveCount(2);
    const photo = page.locator(".hero-portrait__image");
    const originalBox = await photo.boundingBox();
    const originalPhoto = await photo.screenshot();
    const properties = await lights.evaluateAll((elements) => elements.map((element) => {
      const style = getComputedStyle(element);
      const animation = element.getAnimations()[0];
      animation.pause();
      animation.currentTime = 0;
      return { duration: Number(animation.effect!.getTiming().duration), background: style.backgroundImage,
        pointerEvents: style.pointerEvents, filter: style.filter, blend: style.mixBlendMode,
        keyframes: (animation.effect as KeyframeEffect).getKeyframes() };
    }));
    for (const property of properties) {
      expect(property.duration).toBeGreaterThanOrEqual(20000);
      expect(property.duration).toBeLessThanOrEqual(35000);
      expect(property.background).toContain("radial-gradient");
      expect(property.pointerEvents).toBe("none");
      expect(property.filter).toBe("none");
      expect(property.blend).toBe("normal");
      for (const frame of property.keyframes) {
        expect(Object.keys(frame).filter((key) => !["offset", "computedOffset", "easing", "composite"].includes(key))).toEqual(["transform"]);
      }
    }
    const transforms = await lights.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).transform));
    await lights.evaluateAll((elements) => elements.forEach((element) => {
      element.getAnimations()[0].currentTime = 14000;
    }));
    expect(await lights.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).transform))).not.toEqual(transforms);
    expect(await photo.boundingBox()).toEqual(originalBox);
    expect(originalPhoto.equals(await photo.screenshot())).toBe(true);
    await expect(photo.locator("img")).toHaveCSS("filter", "none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const light of await lights.all()) {
      await expect(light).toHaveCSS("animation-name", "none");
      await expect(light).toHaveCSS("will-change", "auto");
    }
    await page.getByRole("link", { name: "Conhecer projetos", exact: true }).click();
    await expect(page).toHaveURL(/\/projetos\/$/);
    await expect(page.locator(".hero-ambient")).toHaveCount(0);
  });
}

test("a abertura se adapta à altura disponível e permite rolagem natural em janelas baixas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const height of [600, 768, 900, 1080]) {
    await page.setViewportSize({ width: 1366, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const end = await page.evaluate(() => {
      const footer = document.querySelector(".site-footer")!.getBoundingClientRect();
      return { footer: footer.bottom, page: document.documentElement.scrollHeight };
    });
    expect(end.footer).toBeGreaterThanOrEqual(height - 1);
    expect(end.page - end.footer).toBeLessThanOrEqual(2);
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect(page.locator(".site-footer")).toBeInViewport();
    await expect(page.locator(".portfolio-sidebar")).toHaveCSS("height", `${height}px`);
  }
});
