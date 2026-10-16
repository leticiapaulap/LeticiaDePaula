import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/editorial-page";
import { ProfileSection } from "@/components/profile-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Sobre mim", "Conheça Letícia de Paula: desenvolvimento web, trajetória em tecnologia e dados, formação e forma de trabalhar.", "/sobre/");

export default function AboutPage() {
  return (
    <EditorialPage
      eyebrow="Sobre"
      title="Pessoas, contexto e tecnologia."
      description="Uma trajetória construída entre desenvolvimento, dados e aprendizado. Conheça minha forma de pensar e de transformar ideias em soluções."
    >
      <ProfileSection />

      <section className="section personal-about-contact" aria-labelledby="about-contact-title">
        <div className="container">
          <header className="section-heading">
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2 id="about-contact-title">Vamos construir algo juntos?</h2>
            </div>
            <p>Explore os projetos para conhecer meu trabalho ou entre em contato para uma conversa.</p>
          </header>

          <div className="project-links">
            <Link className="primary-action focusable" href="/projetos/">Conhecer projetos</Link>
            <Link className="secondary-action focusable" href="/contato/">Entrar em contato</Link>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
