import type { Project } from "@/lib/data";

const projectTopics: Record<string, string[]> = {
  "organizador-de-tarefas": ["Receitas e despesas", "Pagamentos fixos", "Metas pessoais"],
  "senappen-recebimentos": ["Recebimentos", "Protocolos", "Comprovantes"],
  "dio-lab-open-source": ["Colaboração", "Versionamento", "Documentação"]
};

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const preview = project.screenshots[0];
  if (preview) {
    return <figure className={`nexo-project-preview${compact ? " nexo-project-preview--compact" : ""}`}><img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" width={preview.width ?? 1440} height={preview.height ?? 960} />{compact ? null : <figcaption>{preview.caption}</figcaption>}</figure>;
  }

  const topics = projectTopics[project.slug] ?? project.media.nodes.map((node) => node.title);
  return (
    <div className={`nexo-project-visual project-concept${compact ? " compact" : ""}`} data-project-tone={project.media.tone}>
      <p className="project-concept__category">{project.category}</p>
      <p className="project-concept__title">{project.shortTitle}</p>
      <ul className="project-concept__topics" aria-label={`Áreas do projeto ${project.shortTitle}`}>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
    </div>
  );
}
