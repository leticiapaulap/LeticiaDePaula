import { test, expect } from "@playwright/test";

for (const width of [375, 1440]) {
  test(`navegação em fluxo e biblioteca editorial ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => localStorage.setItem("nexo-mode", "direct"));
    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Explorar a trajetória" });
    await navigation.scrollIntoViewIfNeeded();
    expect(await navigation.evaluate((element) => getComputedStyle(element).position)).not.toBe("fixed");
    const flow = await navigation.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const parent = element.closest(".nexo-exploration")!.getBoundingClientRect();
      return bounds.top >= parent.top && bounds.bottom <= parent.bottom;
    });
    expect(flow).toBe(true);
    await page.goto("/projetos/");
    await expect(navigation).toHaveCount(0);
    await expect(page.locator(".project-showcase__feature")).toHaveCount(1);
    await expect(page.locator(".project-showcase__media img")).toHaveAttribute("src", "/projects/festa-fantasia-home.webp");
    await expect(page.getByRole("link", { name: "Ver aplicação", exact: true })).toHaveAttribute("href", "https://festa-fantasia.vercel.app/");
    await page.goto("/formacao/");
    await expect(page.locator(".certification-card")).toHaveCount(10);
    const ongoing = page.locator(".certification-card").filter({ has: page.getByRole("heading", { name: "Databases for Developers: Foundations" }) });
    await expect(ongoing).toContainText("Em andamento");
    await expect(ongoing.getByRole("button", { name: /Visualizar certificado/ })).toHaveCount(0);
    await expect(ongoing.getByRole("link", { name: "Abrir PDF", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "A validar", exact: true })).toHaveCount(0);
    await page.goto("/sobre/");
    await expect(page.locator(".professional-portrait")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Fontes e pontos de validação." })).toHaveCount(0);
  });
}

test("uma única cena acompanha a composição das páginas internas", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await expect(page.locator(".nexo-scene-surface")).toHaveAttribute("data-ready", "true", { timeout: 20000 });
  for (const route of ["/projetos/", "/experiencia/", "/competencias/", "/formacao/", "/sobre/", "/contato/"]) {
    await page.goto(route);
    await page.getByRole("button", { name: "Ativar modo direto", exact: true }).click();
    await page.getByRole("button", { name: "Ativar modo imersivo", exact: true }).click();
    const anchor = page.locator(".route-hero-scene");
    await expect(anchor).toHaveAttribute("data-scene-active", "true");
    await expect(page.locator("canvas")).toHaveCount(1);
    await expect.poll(() => anchor.evaluate((element) => {
      const art = element.getBoundingClientRect();
      const stage = document.querySelector(".nexo-experience-stage")!.getBoundingClientRect();
      return Math.max(Math.abs(art.left - stage.left), Math.abs(art.top - stage.top), Math.abs(art.width - stage.width), Math.abs(art.height - stage.height));
    })).toBeLessThan(2);
    const overlapsCopy = await anchor.evaluate((element) => {
      const art = element.getBoundingClientRect();
      const copy = document.querySelector(".route-hero-copy")!.getBoundingClientRect();
      return art.left < copy.right && art.right > copy.left && art.top < copy.bottom && art.bottom > copy.top;
    });
    expect(overlapsCopy).toBe(false);
  }
});
