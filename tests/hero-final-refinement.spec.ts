import { expect, test, type Locator } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

function overlaps(a: Box, b: Box) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

async function textBoxes(locator: Locator) {
  return locator.evaluate((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const boxes: Box[] = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      boxes.push(...Array.from(range.getClientRects(), ({ x, y, width, height }) => ({ x, y, width, height })));
    }
    return boxes;
  });
}

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
      const bubble = miniature.locator(".hero-miniature__bubble");
      const motion = miniature.locator(".hero-miniature__motion");
      // No hover, focus, click or touch is used before or during the introduction.
      await expect(miniature).toHaveAttribute("data-ready", "true");
      await expect(miniature).toHaveAttribute("data-state", "greeting");
      await expect(bubble).toHaveText("Oi! Que bom ter você por aqui!");
      await expect(bubble).toHaveCSS("opacity", "1");
      const speakingAt = Date.now();

      const photo = await page.locator(".hero-portrait__image").boundingBox();
      const balloon = await bubble.boundingBox();
      const text = [...await textBoxes(page.locator(".hero-identity")), ...await textBoxes(page.locator(".hero-details"))];
      expect(balloon!.x).toBeGreaterThanOrEqual(0);
      expect(balloon!.y).toBeGreaterThanOrEqual(0);
      expect(balloon!.x + balloon!.width).toBeLessThanOrEqual(viewport.width);
      expect(overlaps(balloon!, photo!)).toBe(false);
      expect(text.some((box) => overlaps(balloon!, box))).toBe(false);
      expect(await bubble.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(10);
      expect(await bubble.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

      const avatarGeometry = await miniature.evaluate((root) => {
        const group = root.querySelector<HTMLElement>(".hero-miniature__motion")!;
        const mouth = root.querySelector(".hero-miniature__mouth")!.getBoundingClientRect();
        const transform = new DOMMatrix(getComputedStyle(group).transform);
        // A conservative envelope of the face in the approved 579 x 768 asset.
        // Locate it from the mouth and the same transform, rather than from the
        // image's transparent rectangle, which does not describe facial pixels.
        const face = [[.37, .1], [.71, .1], [.71, .37], [.37, .37]].map(([x, y]) => {
          const dx = (x - .57) * group.offsetWidth;
          const dy = (y - .31) * group.offsetHeight;
          return { x: mouth.x + transform.a * dx + transform.c * dy, y: mouth.y + transform.b * dx + transform.d * dy };
        });
        const minX = Math.min(...face.map((point) => point.x));
        const minY = Math.min(...face.map((point) => point.y));
        const maxX = Math.max(...face.map((point) => point.x));
        const maxY = Math.max(...face.map((point) => point.y));
        const points = Array.from(root.querySelectorAll<SVGPathElement>(".hero-miniature__tail path")).flatMap((path) => {
          const matrix = path.getScreenCTM()!;
          const length = path.getTotalLength();
          return Array.from({ length: 301 }, (_, index) => {
            const point = path.getPointAtLength(length * index / 300);
            const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
            return { x: screen.x, y: screen.y };
          });
        });
        return {
          mouth: { x: mouth.x, y: mouth.y },
          face: { x: minX, y: minY, width: maxX - minX, height: maxY - minY },
          tailDistance: Math.min(...points.map((point) => Math.hypot(point.x - mouth.x, point.y - mouth.y))),
          tailRight: Math.max(...points.map((point) => point.x)),
          crossesEyes: points.some((point) => point.x > minX && point.x < maxX && point.y > minY && point.y < minY + (maxY - minY) * .65)
        };
      });
      expect(overlaps(balloon!, avatarGeometry.face)).toBe(false);
      expect(avatarGeometry.tailDistance).toBeLessThan(4);
      expect(avatarGeometry.tailRight).toBeLessThan(photo!.x);
      expect(avatarGeometry.crossesEyes).toBe(false);
      const gapX = Math.max(balloon!.x - avatarGeometry.mouth.x, 0, avatarGeometry.mouth.x - balloon!.x - balloon!.width);
      const gapY = Math.max(balloon!.y - avatarGeometry.mouth.y, 0, avatarGeometry.mouth.y - balloon!.y - balloon!.height);
      // The speech sits beside the head or just above it on narrow screens.
      const characterHeight = await miniature.locator(".hero-miniature__viewport").evaluate((element) => element.getBoundingClientRect().height);
      expect(Math.hypot(gapX, gapY)).toBeLessThan(characterHeight * .3);

      await expect(page.getByText("Pessoas. Ideias. Possibilidades.", { exact: true })).toHaveCount(0);
      await expect(page.locator(".hero-portrait figcaption")).toHaveCount(0);
      const hero = await page.locator("#portal").boundingBox();
      const footer = await page.locator(".site-footer").boundingBox();
      expect(footer!.y - hero!.y - hero!.height).toBeGreaterThanOrEqual(-1);
      expect(footer!.y - hero!.y - hero!.height).toBeLessThanOrEqual(32);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`hero-fala-${theme}.png`), fullPage: true });

      await expect(bubble).toHaveCSS("opacity", "0", { timeout: 8000 });
      const speakingDuration = Date.now() - speakingAt;
      expect(speakingDuration).toBeGreaterThanOrEqual(3500);
      expect(speakingDuration).toBeLessThan(6500);
      await expect(miniature).toHaveAttribute("data-state", "rest");
      const settled = await motion.boundingBox();
      const characterWindow = await miniature.locator(".hero-miniature__viewport").boundingBox();
      expect(settled!.x).toBeCloseTo(characterWindow!.x, 0);
      expect(settled!.x).toBeLessThan(photo!.x - 20);
      // Assert visible artwork at the face, not merely an uncropped image box.
      const mouth = await miniature.locator(".hero-miniature__mouth").boundingBox();
      expect(await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest(".hero-miniature__trigger"), mouth!)).toBe(true);
      await expect(miniature.locator(".hero-miniature__avatar")).toHaveAttribute("src", "/images/leticia-mini-avatar.webp");
      await page.waitForTimeout(300);
      expect(await motion.boundingBox()).toEqual(settled);
      await expect(miniature).toHaveAttribute("data-state", "rest");
      await page.screenshot({ path: testInfo.outputPath(`hero-repouso-${theme}.png`), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}
