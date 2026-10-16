import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";

export const skills = skillGroups.flatMap((group) => group.items.map((item) => ({ ...item, groupId: group.id, groupTitle: group.title })));

export const skillConnections = skills.flatMap((skill) =>
  (skill.projectSlugs ?? []).filter((slug) => projects.some((project) => project.slug === slug)).map((projectSlug) => ({ skillName: skill.name, groupId: skill.groupId, projectSlug }))
);

export function projectsForSkill(name: string | null) {
  return projects.filter((project) => skillConnections.some((connection) => connection.skillName === name && connection.projectSlug === project.slug));
}

export function skillsForProject(slug: string | null) {
  return skills.filter((skill) => skillConnections.some((connection) => connection.projectSlug === slug && connection.skillName === skill.name));
}
