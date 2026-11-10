import { experiences } from "@/data/conteudo";

export function ExperienceSection() {
  return (
    <section className="section editorial-experience" data-section id="experiencia" aria-label="Experiência profissional">
      <div className="container">
        <ol className="career-timeline nexo-experience-list">
          {experiences.map((experience) => (
            <li className="nexo-experience-entry" id={`marco-${experience.id}`} key={experience.id}>
              <div className="nexo-experience-entry__company">
                <p>{experience.area}</p>
                <h2>{experience.organization}</h2>
                <strong className="career-role">{experience.role}</strong>
                <span className="career-period">{experience.period}</span>
              </div>
              <div className="nexo-experience-entry__facts">
                <p className="editorial-experience__context">{experience.context}</p>
                <h3 className="nexo-visually-hidden">Responsabilidades na {experience.organization}</h3>
                <ul className="nexo-experience-responsibilities">{experience.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                {experience.technologies.length ? <div className="editorial-experience__tools"><h3>Ferramentas</h3><ul>{experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div> : null}
                {experience.results.length ? <div className="editorial-experience__results"><h3>Resultados</h3><ul>{experience.results.map((result) => <li key={result}>{result}</li>)}</ul></div> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
