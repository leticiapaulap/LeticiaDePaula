import { CertificationExplorer } from "@/components/formacao/catalogo-certificados";

export function CertificationsSection() {
  return (
    <section className="section editorial-certifications" data-section id="certificacoes" aria-labelledby="certification-library-title">
      <div className="container">
        <div className="editorial-library-heading"><h2 id="certification-library-title">Cursos e certificações</h2><p>Aprendizados em desenvolvimento, dados e tecnologia.</p></div>
        <CertificationExplorer />
      </div>
    </section>
  );
}
