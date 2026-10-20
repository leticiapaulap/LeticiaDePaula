import { projects } from "@/lib/projects";

export const heroProjects = projects.filter((project) => project.screenshots.length > 0).slice(0, 2);
