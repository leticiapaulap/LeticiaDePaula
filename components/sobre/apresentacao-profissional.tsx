import { professional } from "@/data/conteudo";
import { ProfessionalPortrait } from "@/components/sobre/retrato-profissional";
import { portrait } from "@/data/pagina-inicial/fotografias";

export function ProfileSection() {
  return (
    <section className="section editorial-profile" data-section id="sobre" aria-label="Apresentação pessoal">
      <div className="container">
        <div className={`profile-grid${portrait ? " profile-grid--portrait" : ""}`}>
          {portrait ? <ProfessionalPortrait portrait={portrait} /> : null}
          <div className="editorial-copy">
            <h2>Desenvolvimento com contexto.</h2>
            {professional.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className="editorial-profile__principles" aria-labelledby="principles-title">
            <h2 id="principles-title">Como trabalho</h2>
            <div className="workflow-list">
              {professional.principles.map((item) => (
                <article className="workflow-item" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
