import { ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import { JourneyCompanion } from "@/components/journey-companion";
import { ModeLabel } from "@/components/experience-navigation";
import { ProjectVisual } from "@/components/project-visual";
import { SceneAccent } from "@/components/scene-accent";
import { certifications, education, experiences, professional, projects, skillGroups } from "@/lib/data";
import { phaseForSection } from "@/lib/experience-state";

const chapterNames: Record<string, string> = { sobre: "Sobre", projetos: "Projetos", experiencia: "Experiência", competencias: "Competências", formacao: "Formação", certificacoes: "Certificações", curriculo: "Currículo", contato: "Contato" };

function Chapter({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="home-chapter" data-section id={id} aria-labelledby={`preview-${id}`}>
      <header className="home-chapter__heading">
        <div><p className="eyebrow">{number} / {chapterNames[id]}</p><h2 id={`preview-${id}`}>{title}</h2></div>
        <SceneAccent phase={phaseForSection(id) ?? "nucleus"} className="home-chapter__mark" />
      </header>
      {children}
    </section>
  );
}

function ReadMore({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-action focusable home-read-more" href={href}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
}

export function HomeOverview() {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const certificateCount = certifications.filter((course) => course.certificateUrl).length;

  return (
    <div className="nexo-direct home-overview" id="portfolio">
      <header className="nexo-direct__intro">
        <ModeLabel />
        <div className="nexo-direct__heading">
          <div><h2>Um olhar sobre meu trabalho.</h2><p>Conheça os destaques. Aprofunde cada caminho no seu ritmo.</p></div>
          <a className="nexo-return-link focusable" href="#portal">Retornar ao portal</a>
        </div>
      </header>
      <div className="home-overview__layout container">
        <div className="home-overview__chapters">
          <Chapter id="sobre" number="01" title="Um pouco de contexto.">
            <p className="home-chapter__lead">{professional.summary}</p>
            <ReadMore href="/sobre/">Conhecer minha história</ReadMore>
          </Chapter>
          <Chapter id="projetos" number="02" title="Da ideia à aplicação.">
            <article className="home-featured-project">
              <Link className="home-featured-project__image focusable" href={`/projetos/${featuredProject.slug}/`}><ProjectVisual project={featuredProject} compact /></Link>
              <p className="context-label">PROJETO EM DESTAQUE / {featuredProject.category}</p>
              <h3>{featuredProject.shortTitle}</h3>
              <p>{featuredProject.summary}</p>
              <div className="tag-list">{featuredProject.technologies.slice(0, 4).map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
              <ReadMore href={`/projetos/${featuredProject.slug}/`}>Explorar estudo de caso</ReadMore>
            </article>
            <ReadMore href="/projetos/">Ver todos os projetos</ReadMore>
          </Chapter>
          <Chapter id="experiencia" number="03" title="Experiências que se conectam.">
            <p>Desenvolvimento, dados geoespaciais e suporte técnico: cada contexto amplia a forma de pensar e construir soluções.</p>
            <ol className="home-career-preview">{experiences.map((experience) => <li key={experience.id}><strong>{experience.organization}</strong><span>{experience.role}</span><small>{experience.period}</small></li>)}</ol>
            <ReadMore href="/experiencia/">Percorrer a trajetória profissional</ReadMore>
          </Chapter>
          <Chapter id="competencias" number="04" title="Repertório em prática.">
            <p>Da interface à persistência dos dados, tecnologias se conectam para construir experiências completas.</p>
            <ul className="home-skill-preview">{skillGroups.filter((group) => group.items.length > 0).map((group) => <li key={group.id}><strong>{group.title}</strong><span>{group.items.slice(0, 3).map((item) => item.name).join(" · ")}</span></li>)}</ul>
            <ReadMore href="/competencias/">Explorar competências e conexões</ReadMore>
          </Chapter>
          <Chapter id="formacao" number="05" title="Aprendizado contínuo.">
            <div className="home-education-preview"><h3>{education.course}</h3><p>{education.institution}</p><span>{education.status} · {education.period}</span></div>
            <ReadMore href="/formacao/">Conhecer minha formação</ReadMore>
          </Chapter>
          <Chapter id="certificacoes" number="06" title="Conhecimento em expansão.">
            <p><strong>{certificateCount} certificados disponíveis</strong> em desenvolvimento, dados, ferramentas e privacidade. Uma biblioteca para consultar cursos, instituições e documentos.</p>
            <ReadMore href="/formacao/#certificacoes">Consultar cursos e certificados</ReadMore>
          </Chapter>
          <Chapter id="curriculo" number="07" title="A trajetória em uma leitura.">
            <p>Experiências, formação e competências reunidas para uma consulta objetiva.</p>
            <div className="project-links"><Link className="secondary-action focusable" href="/curriculo/">Ler currículo digital<ArrowRight size={17} aria-hidden="true" /></Link>{professional.resumePdfPath ? <a className="text-action focusable" href={professional.resumePdfPath} download><Download size={17} aria-hidden="true" />Baixar currículo em PDF</a> : null}</div>
          </Chapter>
          <Chapter id="contato" number="08" title="Vamos conversar.">
            <p>Uma oportunidade, um projeto ou uma boa ideia? Vamos construir o próximo caminho.</p>
            <div className="project-links"><a className="primary-action focusable" href={`mailto:${professional.email}`}><Mail size={17} aria-hidden="true" />Enviar e-mail</a><ReadMore href="/contato/">Outras formas de contato</ReadMore></div>
          </Chapter>
        </div>
        <JourneyCompanion />
      </div>
    </div>
  );
}
