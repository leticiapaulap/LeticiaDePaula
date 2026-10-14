import { ArrowDown, ArrowRight, GitBranch, Mail, Network } from "lucide-react";
import { SculptureLoader } from "@/components/portal/sculpture-loader";
import { professional } from "@/lib/profile";

export function PortalHero() {
  return (
    <section className="nexo-portal" id="portal" aria-labelledby="portal-title">
      <div className="nexo-architecture-lines" aria-hidden="true" />
      <div className="nexo-portal__frame" aria-hidden="true">
        <span>NEXO / 01</span>
        <span>IDEIAS EM MOVIMENTO</span>
      </div>

      <div className="nexo-portal__content">
        <div className="nexo-portal__copy">
          <p className="nexo-portal__eyebrow">
            <span className="nexo-status-dot" aria-hidden="true" />
            NEXO — A arquitetura das ideias
          </p>

          <h1 id="portal-title" className="nexo-portal__title">
            Letícia
            <br />
            <span>de Paula.</span>
          </h1>

          <p className="nexo-portal__statement">
            Ideias que ganham forma. Conhecimentos que se conectam. Soluções que evoluem.
          </p>
          <p className="nexo-portal__introduction">
            Uma abordagem prática de desenvolvimento web, documentação e atenção ao contexto — construída por{" "}
            {professional.name}.
          </p>

          <div className="nexo-portal__actions">
            <a className="nexo-button nexo-button--primary focusable" href="#exploracao">
              Explorar meu universo
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="nexo-button nexo-button--quiet focusable" href="#portfolio">
              Ver portfólio
            </a>
          </div>

          <nav className="nexo-socials" aria-label="Perfis e contato">
            <a href={professional.github} aria-label="GitHub de Letícia" target="_blank" rel="noreferrer">
              <GitBranch size={18} aria-hidden="true" />
            </a>
            <a href={professional.linkedin} aria-label="LinkedIn de Letícia" target="_blank" rel="noreferrer">
              <Network size={18} aria-hidden="true" />
            </a>
            <a href={`mailto:${professional.email}`} aria-label={`Enviar e-mail para ${professional.name}`}>
              <Mail size={18} aria-hidden="true" />
            </a>
            <span>{professional.title}</span>
          </nav>
        </div>

        <div className="nexo-portal__artwork">
          <div className="nexo-artwork__coordinates" aria-hidden="true">
            <span>BRASÍLIA</span>
            <span>15°47&apos;S — 47°52&apos;W</span>
          </div>
          <div className="nexo-artwork__orbit nexo-artwork__orbit--outer" aria-hidden="true" />
          <div className="nexo-artwork__orbit nexo-artwork__orbit--inner" aria-hidden="true" />
          <div className="nexo-artwork__axis" aria-hidden="true" />
          <svg
            className="nexo-artwork__fallback"
            viewBox="-180 -180 360 360"
            role="img"
            aria-label="Escultura abstrata de fita metálica entrelaçada"
          >
            <defs>
              <linearGradient id="nexo-ribbon-metal" x1="-0.65" y1="-0.8" x2="0.72" y2="0.8">
                <stop offset="0" stopColor="#f0ddbc" />
                <stop offset="0.25" stopColor="#b9a382" />
                <stop offset="0.52" stopColor="#f6e7ca" />
                <stop offset="0.76" stopColor="#89755b" />
                <stop offset="1" stopColor="#d8c3a1" />
              </linearGradient>
              <filter id="nexo-ribbon-soft-shadow" x="-45%" y="-45%" width="190%" height="190%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <path
              d="M-128-26c25-61 73-84 105-52 25 25 17 71 41 91 26 22 57 12 76-15 19-26 7-57 25-72 19-16 45-3 40 16-3 15-20 27-32 48-21 37-24 66-55 82-33 17-66-4-85-30-23-31-18-63-37-79-17-15-43-2-54 26-8 19-20 29-32 22-8-5-1-23 8-37Z"
              fill="#b9a382"
              opacity=".32"
              transform="translate(0 13)"
              filter="url(#nexo-ribbon-soft-shadow)"
            />
            <path
              d="M-128-26c25-61 73-84 105-52 25 25 17 71 41 91 26 22 57 12 76-15 19-26 7-57 25-72 19-16 45-3 40 16-3 15-20 27-32 48-21 37-24 66-55 82-33 17-66-4-85-30-23-31-18-63-37-79-17-15-43-2-54 26-8 19-20 29-32 22-8-5-1-23 8-37Z"
              fill="none"
              stroke="url(#nexo-ribbon-metal)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M-110-40c23-41 59-53 79-34 14 13 11 38 21 55m35 42c21 12 43 5 57-13"
              fill="none"
              stroke="#fff1d9"
              strokeWidth="1.1"
              opacity=".66"
            />
          </svg>

          <SculptureLoader />

          <div className="nexo-artwork__caption">
            <span>01</span>
            <span>CONEXÃO / FORMA / MOVIMENTO</span>
          </div>
        </div>
      </div>

      <a className="nexo-scroll-cue focusable" href="#exploracao" aria-label="Descer para a primeira área de exploração">
        <span>CONTINUE A EXPLORAR</span>
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
