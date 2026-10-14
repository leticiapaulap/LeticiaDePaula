import { ArrowRight, FileText, GitBranch, Mail, MapPin, Network } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { professional } from "@/lib/data";

export function Hero() {
  return (
    <section className="hero" data-section id="inicio">
      <div className="container hero-grid">
        <Reveal>
          <p className="eyebrow">Desenvolvimento web | Aplicações documentadas</p>
          <h1>{professional.name}</h1>
          <p className="hero-lede">{professional.headline}</p>
          <p className="hero-positioning">{professional.positioning}</p>

          <div className="hero-actions" aria-label="Ações principais">
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
              <img src={professional.avatar} alt="Foto de perfil de Letícia de Paula no GitHub" />
            </div>

            <div className="signal-board">
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <FileText size={18} />
                </span>
                <div>
                  <strong>Festa Fantasia</strong>
                  <span>Aplicação web full stack documentada publicamente em React, TypeScript e PostgreSQL.</span>
                </div>
              </div>
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <FileText size={18} />
                </span>
                <div>
                  <strong>NEXO</strong>
                  <span>Portfólio em desenvolvimento com páginas diretas e conteúdo tipado.</span>
                </div>
              </div>
              <div className="metric-strip">
                <div className="metric-chip">
                  <strong>React</strong>
                  <span>Interface documentada</span>
                </div>
                <div className="metric-chip">
                  <strong>TypeScript</strong>
                  <span>Projeto documentado</span>
                </div>
                <div className="metric-chip">
                  <strong>Next.js</strong>
                  <span>Portfólio em andamento</span>
                </div>
              </div>
              <div className="signal-row">
                <span className="signal-icon" aria-hidden="true">
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>{professional.location}</strong>
                  <span>Localidade informada no perfil público do GitHub.</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
