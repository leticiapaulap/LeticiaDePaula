import { education } from "@/data/conteudo";

export function EducationSection() {
  return (
    <section className="section editorial-education" data-section id="formacao" aria-labelledby="academic-title">
      <div className="container">
        <div className="editorial-library-heading"><h2 id="academic-title">Formação acadêmica</h2></div>
        <article className="editorial-education-panel">
          <div className="editorial-education-panel__body">
            <h3>{education.course}</h3>
            <p className="editorial-education-panel__institution">{education.institution}</p>
            <p>{education.note}</p>
            {education.areas.length ? <ul className="study-areas" aria-label="Áreas documentadas de estudo">{education.areas.map((area) => <li key={area}>{area}</li>)}</ul> : null}
          </div>
          <dl className="education-meta"><div><dt>Situação</dt><dd>{education.status}</dd></div><div><dt>Período</dt><dd>{education.period}</dd></div></dl>
        </article>
      </div>
    </section>
  );
}
