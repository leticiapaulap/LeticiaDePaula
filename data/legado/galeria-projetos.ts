import { projects } from "@/data/projetos/catalogo";

export const heroProjects = projects.filter((project) => project.screenshots.length > 0).slice(0, 2);
