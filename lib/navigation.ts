import { chapters } from "@/lib/chapters";

export const navItems = chapters.map((chapter) => ({
  label: chapter.label,
  href: chapter.href,
  id: chapter.phase === "portal" ? "inicio" : chapter.href.split("/")[1],
  path: chapter.href
}));
