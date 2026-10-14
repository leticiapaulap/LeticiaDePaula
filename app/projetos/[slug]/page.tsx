import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { getProjectBySlug, professional, projects } from "@/lib/data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projetos/${project.slug}/`
    },
    openGraph: {
      title: `${project.title} | ${professional.name}`,
      description: project.summary,
      url: `/projetos/${project.slug}/`,
      images: [
        {
          url: "/og-leticia.svg",
          width: 1200,
          height: 630,
          alt: "Prévia visual do portfólio profissional de Letícia de Paula"
        }
      ]
    }
  };
}

export const dynamicParams = false;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="project-detail-page">
      <div className="container">
        <nav className="nexo-breadcrumb nexo-breadcrumb--detail" aria-label="Breadcrumb">
          <Link className="focusable" href="/">
            NEXO
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="focusable" href="/projetos/">
            Projetos
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.shortTitle}</span>
        </nav>

        <Link className="text-action focusable back-link" href="/projetos/">
          <ArrowLeft size={16} />
          Galeria de projetos
        </Link>

        <header className="project-detail-hero">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <span className="nexo-publication-status">{project.publicationStatus}</span>
            <div className="project-links">
              {project.links
                .filter((link) => link.type !== "case")
                .map((link) => (
                  <a
                    className={link.type === "github" ? "secondary-action focusable" : "primary-action focusable"}
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.type === "github" ? <GitBranch size={17} /> : <ExternalLink size={17} />}
                    {link.label}
                  </a>
                ))}
            </div>
          </div>
          <ProjectVisual project={project} />
        </header>

        <div className="case-study-layout">
          <aside className="case-aside">
            <div>
              <span>Publicação</span>
              <strong>{project.publicationStatus}</strong>
            </div>
            <div>
              <span>Status do projeto</span>
              <strong>{project.status}</strong>
            </div>
            <div>
              <span>Fonte de validação</span>
              {project.evidence.href ? (
                <a href={project.evidence.href} rel="noreferrer" target="_blank">
                  {project.evidence.sourceLabel}
                </a>
              ) : (
                <strong>{project.evidence.sourceLabel}</strong>
              )}
            </div>
            <div>
              <span>Tecnologias</span>
              <div className="tag-list">
                {project.technologies.map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="case-content">
            <section>
              <h2>Visão geral e objetivo</h2>
              <p>{project.description}</p>
            </section>

            <section>
              <h2>Problema</h2>
              <p>{project.problem}</p>
            </section>

            <section>
              <h2>Solução implementada</h2>
              <p>{project.solution}</p>
            </section>

            <section>
              <h2>Funcionalidades principais</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Arquitetura e fluxo</h2>
              <ul>
                {project.architecture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Desafios e aprendizados</h2>
              <ul>
                {project.learnings.map((learning) => (
                  <li key={learning}>{learning}</li>
                ))}
              </ul>
            </section>

            {project.sensitiveNote ? (
              <section>
                <h2>Cuidados de divulgação</h2>
                <p>{project.sensitiveNote}</p>
              </section>
            ) : null}
          </div>
        </div>

        <section className="nexo-case-screenshots" aria-labelledby="case-screenshots-title">
          <div>
            <p className="eyebrow">Registro visual</p>
            <h2 id="case-screenshots-title">Imagens e capturas.</h2>
            <p>
              {project.screenshots.length > 0
                ? "Imagens incluídas a partir de arquivos do projeto."
                : "Não encontrei capturas de tela da aplicação no repositório. A ilustração nesta página é um diagrama técnico, não uma captura de produto."}
            </p>
          </div>
          {project.screenshots.length > 0 ? (
            <div className="nexo-case-screenshots__grid">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </section>

        <nav className="project-navigation" aria-label="Navegação entre projetos">
          <Link className="secondary-action focusable" href={`/projetos/${previousProject.slug}/`}>
            <ArrowLeft size={16} />
            {previousProject.shortTitle}
          </Link>
          <Link className="primary-action focusable" href={`/projetos/${nextProject.slug}/`}>
            {nextProject.shortTitle}
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </article>
  );
}
