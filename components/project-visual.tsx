import type { Project } from "@/lib/data";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const preview = project.screenshots[0];
  if (preview) {
    return <figure className="nexo-project-preview"><img src={preview.src} alt={preview.alt} loading="lazy" width={preview.width ?? 1440} height={preview.height ?? 960} /><figcaption>{preview.caption}</figcaption></figure>;
  }

  return (
    <div className={`nexo-project-visual tone-${project.media.tone} ${compact ? "compact" : ""}`}>
      <p className="nexo-project-visual__caption">Diagrama editorial · não é captura de tela</p>
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
          {project.media.nodes.map(({ title, detail }, index) => (
            <div className="nexo-project-node" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
        <p className="nexo-project-visual__footer">
          <span>{project.publicationStatus}</span>
          <span>VISÃO GERAL</span>
        </p>
      </div>
    </div>
  );
}
