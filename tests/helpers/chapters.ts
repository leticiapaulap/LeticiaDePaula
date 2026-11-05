import { expect, type Page } from "@playwright/test";
import { chapters } from "../../lib/chapters";
import { navItems } from "../../lib/navigation";

export async function navigateToChapter(page: Page, phase: string) {
  const chapter = chapters.find((item) => item.phase === phase);
  if (!chapter) throw new Error(`Capítulo desconhecido: ${phase}`);
  const section = navItems.find((item) => item.href === chapter.href);
  if (!section) throw new Error(`Seção desconhecida: ${phase}`);
  const desktopNav = page.getByRole("navigation", { name: "Navegação principal" }).first();
  if (await desktopNav.isVisible()) {
    await desktopNav.getByRole("link", { name: section.label, exact: true }).click();
  } else {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.getByRole("dialog").getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: section.label, exact: true }).click();
  }
  await expect(page).toHaveURL(chapter.href);
}
