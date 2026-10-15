import type { Project } from "@/lib/data";

const publicSystemNodes = [
  ["01", "Frontend", "React · TypeScript"],
  ["02", "API Vercel", "Node.js · PostgreSQL"],
  ["03", "Backend", "Spring Boot"]
] as const;

const portfolioSystemNodes = [
  ["01", "Interface", "Next.js · React"],
  ["02", "Conteúdo", "Módulos tipados"],
  ["03", "Cena 3D", "Three.js · sob demanda"]
] as const;

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const preview = project.screenshots[0];
  if (preview) {
    return <figure className="nexo-project-preview"><img src={preview.src} alt={preview.alt} loading="lazy" width={1440} height={960} /><figcaption>{preview.caption}</figcaption></figure>;
  }
  const nodes = project.slug === "festa-fantasia" ? publicSystemNodes : portfolioSystemNodes;
  const label = project.slug === "festa-fantasia" ? "Arquitetura documentada" : "Arquitetura em desenvolvimento";

  return (
    <div className={`nexo-project-visual tone-${project.media.tone} ${compact ? "compact" : ""}`}>
      <p className="nexo-project-visual__caption">{label}</p>
      <div className="nexo-project-visual__diagram" role="img" aria-label={project.media.alt}>
        <div className="nexo-project-visual__entry">
          <span>01 / FLUXO DO PROJETO</span>
          <strong>{project.shortTitle}</strong>
        </div>

        <svg
          aria-hidden="true"
          className="nexo-project-visual__connections"
          preserveAspectRatio="none"
          viewBox="0 0 500 56"
        >
          <path d="M250 1v22M78 23h344M78 23v32m172-32v32m172-32v32" />
          <circle cx="78" cy="23" r="2" />
          <circle cx="250" cy="23" r="2" />
          <circle cx="422" cy="23" r="2" />
        </svg>

        <div className="nexo-project-visual__nodes">
          {nodes.map(([number, name, detail]) => (
            <div className="nexo-project-node" key={name}>
              <span>{number}</span>
              <strong>{name}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
        <p className="nexo-project-visual__footer">
          <span>{project.publicationStatus}</span>
          <span>REPOSITÓRIO / DOCUMENTAÇÃO</span>
        </p>
      </div>
    </div>
  );
}
