import { expect, type Page } from "@playwright/test";
import { chapters } from "../../lib/chapters";

export async function navigateToChapter(page: Page, phase: string) {
  const chapter = chapters.find((item) => item.phase === phase);
  if (!chapter) throw new Error(`Capítulo desconhecido: ${phase}`);
  await page.getByRole("button", { name: "Abrir menu de capítulos" }).click();
  await page.getByRole("navigation", { name: "Navegação compacta" }).getByRole("link", { name: chapter.label, exact: true }).click();
  await expect(page).toHaveURL(chapter.href);
}
