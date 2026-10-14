"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import {
  certificationAreas,
  certifications,
  type CertificationArea,
  type CertificationStatus
} from "@/lib/data";

type AreaFilter = CertificationArea | "Todas";
type StatusFilter = CertificationStatus | "Todos";

const statusFilters: StatusFilter[] = ["Todos", "Concluído", "Em andamento", "A validar"];
const statusClasses: Record<CertificationStatus, string> = {
  Concluído: "status-complete",
  "Em andamento": "status-progress",
  "A validar": "status-pending"
};

export function CertificationExplorer() {
  const [activeArea, setActiveArea] = useState<AreaFilter>("Todas");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("Todos");
  const [activeInstitution, setActiveInstitution] = useState("Todas as instituições");
  const [query, setQuery] = useState("");

  const institutions = useMemo(
    () => [...new Set(certifications.map((certification) => certification.institution))].sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    ),
    []
  );

  const visibleCertifications = useMemo(() => {
    return certifications
      .filter((certification) => activeArea === "Todas" || certification.area === activeArea)
      .filter((certification) => activeStatus === "Todos" || certification.status === activeStatus)
      .filter(
        (certification) =>
          activeInstitution === "Todas as instituições" || certification.institution === activeInstitution
      )
      .filter((certification) =>
        `${certification.name} ${certification.institution} ${certification.area}`
          .toLocaleLowerCase("pt-BR")
          .includes(query.trim().toLocaleLowerCase("pt-BR"))
      )
      .sort((a, b) => a.priority - b.priority);
  }, [activeArea, activeInstitution, activeStatus, query]);

  return (
    <div className="certification-explorer">
      <div className="nexo-certification-search">
        <label className="nexo-certification-query">
          <span>Pesquisar curso</span>
          <input
            autoComplete="off"
            className="nexo-certification-input"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nome, instituição ou área"
            type="search"
            value={query}
          />
        </label>
        <label className="nexo-certification-query">
          <span>Instituição</span>
          <select
            className="nexo-certification-input"
            onChange={(event) => setActiveInstitution(event.target.value)}
            value={activeInstitution}
          >
            <option>Todas as instituições</option>
            {institutions.map((institution) => (
              <option key={institution}>{institution}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="certification-controls">
        <div className="filter-group" role="group" aria-label="Filtrar cursos por área">
          {certificationAreas.map((area) => (
            <button
              aria-pressed={activeArea === area}
              className="filter-chip focusable"
              key={area}
              onClick={() => setActiveArea(area)}
              type="button"
            >
              {area}
            </button>
          ))}
        </div>

        <div className="filter-group" role="group" aria-label="Filtrar cursos por status">
          {statusFilters.map((status) => (
            <button
              aria-pressed={activeStatus === status}
              className="filter-chip focusable"
              key={status}
              onClick={() => setActiveStatus(status)}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {visibleCertifications.length === 0 ? (
        <div className="empty-state">
          <strong>Nenhum curso corresponde à pesquisa.</strong>
          <span>Ajuste os filtros ou pesquise outro nome, instituição ou área.</span>
        </div>
      ) : (
        <>
          <p className="nexo-results-count" aria-live="polite">
            {visibleCertifications.length === 1 ? "1 curso" : `${visibleCertifications.length} cursos`}
          </p>
          <div className="certification-grid">
          {visibleCertifications.map((certification) => (
            <article className="certification-card" key={`${certification.name}-${certification.institution}`}>
              <div>
                <span className={`status-pill ${statusClasses[certification.status]}`}>
                  {certification.status}
                </span>
                <p className="context-label">{certification.area}</p>
                <h3>{certification.name}</h3>
                <p>{certification.institution}</p>
              </div>

              <dl className="meta-list">
                {certification.workload ? (
                  <div>
                    <dt>Carga horária</dt>
                    <dd>{certification.workload}</dd>
                  </div>
                ) : null}
                {certification.completionDate ? (
                  <div>
                    <dt>Conclusão</dt>
                    <dd>{certification.completionDate}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Certificado</dt>
                  <dd>{certification.certificateUrl ? "Disponível" : "Não anexado"}</dd>
                </div>
              </dl>

              {certification.note ? <p className="card-note">{certification.note}</p> : null}

              {certification.certificateUrl ? (
                <a className="secondary-action focusable" href={certification.certificateUrl} rel="noreferrer" target="_blank">
                  <ExternalLink size={16} />
                  Ver certificado
                </a>
              ) : null}
            </article>
          ))}
          </div>
        </>
      )}
    </div>
  );
}
