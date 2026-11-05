import { chapters } from "@/lib/chapters";

const sectionLabels: Record<(typeof chapters)[number]["phase"], string> = {
  portal: "Início",
  nucleus: "Sobre mim",
  projects: "Projetos",
  experience: "Experiência",
  competencies: "Competências",
  education: "Formação",
  convergence: "Contato"
};

export const navItems = chapters.map((chapter) => ({
  label: sectionLabels[chapter.phase],
  href: chapter.href,
  id: chapter.phase === "portal" ? "inicio" : chapter.href.split("/")[1],
  path: chapter.href
}));
