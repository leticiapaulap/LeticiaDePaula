import type { Project } from "@/data/tipos";
import { festaFantasia } from "@/data/projetos/festa-fantasia";
import { finanzy } from "@/data/projetos/finanzy";
import { senappenRecebimentos } from "@/data/projetos/senappen-recebimentos";
import { dioLabOpenSource } from "@/data/projetos/dio-lab-open-source";
import { agendaExecutiva } from "@/data/projetos/agenda-executiva";
import { portfolioLeticiaDePaula } from "@/data/projetos/portfolio-leticia-de-paula";

export const projects: Project[] = [
  festaFantasia,
  finanzy,
  senappenRecebimentos,
  dioLabOpenSource,
  agendaExecutiva,
  portfolioLeticiaDePaula
];

export const projectCategories = [
  "Todos",
  "Aplicações Desktop",
  "Desenvolvimento Web",
  "Back-end",
  "Dados",
  "Automação",
  "Open Source",
  "Portfólio"
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
