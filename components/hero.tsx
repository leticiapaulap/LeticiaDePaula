import { ArrowRight, BarChart3, GitBranch, Mail, MapPin, Network, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { professional } from "@/lib/data";

export function Hero() {
  return (
    <section className="hero" data-section id="inicio">
      <div className="container hero-grid">
        <Reveal>
          <p className="eyebrow">Desenvolvimento de software | Dados | Automacao</p>
          <h1>{professional.name}</h1>
          <p className="hero-lede">{professional.title}</p>
          <p className="hero-positioning">{professional.positioning}</p>

          <div className="hero-actions" aria-label="Acoes principais">
            <a className="primary-action focusable" href="#projetos">
              Ver projetos
              <ArrowRight size={17} />
            </a>
            <a className="secondary-action focusable" href={`mailto:${professional.email}`}>
              <Mail size={17} />
              Entrar em contato
            </a>
          </div>

          <div className="hero-socials" aria-label="Links profissionais">
            <a className="focusable" href={professional.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitBranch size={19} />
            </a>
            <a
              className="focusable"
              href={professional.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Network size={19} />
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12}>
          <div className="portrait-panel" aria-label="Resumo visual do perfil profissional">
            <div className="portrait-image">
              <img src={professional.avatar} alt="Foto de perfil de Leticia de Paula no GitHub" />
            </div>

            <div className="signal-board">
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <Workflow size={18} />
                </span>
                <div>
                  <strong>Construcao de fluxos</strong>
                  <span>Interfaces, automacoes e processos tecnicos mais claros.</span>
                </div>
              </div>
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <BarChart3 size={18} />
                </span>
                <div>
                  <strong>Dados para operacao</strong>
                  <span>Organizacao de informacoes para suporte, gestao e decisao.</span>
                </div>
              </div>
              <div className="metric-strip">
                <div className="metric-chip">
                  <strong>Web</strong>
                  <span>React e TypeScript</span>
                </div>
                <div className="metric-chip">
                  <strong>Dados</strong>
                  <span>SQL e BI</span>
                </div>
                <div className="metric-chip">
                  <strong>TI</strong>
                  <span>Suporte B2B</span>
                </div>
              </div>
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>{professional.location}</strong>
                  <span>Disponivel para conversas profissionais e oportunidades em tecnologia.</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
