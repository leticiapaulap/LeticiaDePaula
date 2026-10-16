import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/editorial-page";
import { ProfileSection } from "@/components/profile-section";
import { contentAudit } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Sobre mim", "Apresentação, formação informada e fontes de conteúdo do portfólio profissional de Letícia de Paula.", "/sobre/");

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="Sobre"
      title="Contexto antes do currículo."
      description="O que apresento, como trabalho e onde ainda faltam documentos. As informações são separadas por sua fonte e não por suposições."
    >
      <ProfileSection />

      <section className="section nexo-audit-section" aria-labelledby="content-audit-title">
        <div className="container">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Transparência editorial</p>
              <h2 id="content-audit-title">Fontes e pontos de validação.</h2>
            </div>
            <p>Um inventário do que pode ser confirmado publicamente e do que aguarda documentação ou autorização.</p>
          </header>

          <div className="nexo-audit-list">
            {contentAudit.map((item) => (
              <article className="nexo-audit-entry" key={item.topic}>
                <div className="nexo-audit-entry__topic">
                  <span>{item.topic}</span>
                  <strong>{item.status}</strong>
                </div>
                <p>{item.detail}</p>
                {item.href ? (
                  <Link className="nexo-audit-entry__link focusable" href={item.href} target="_blank" rel="noreferrer">
                    Abrir fonte
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
