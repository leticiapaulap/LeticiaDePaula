"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Eye, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { Certification } from "@/lib/types";
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
  const [preview, setPreview] = useState<Certification | null>(null);
  const previewTrigger = useRef<HTMLButtonElement | null>(null);

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
    <Dialog.Root open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}>
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

      <p className="nexo-results-count" role="status">{visibleCertifications.length === 1 ? "1 curso" : `${visibleCertifications.length} cursos`}</p>
      {query || activeArea !== "Todas" || activeStatus !== "Todos" || activeInstitution !== "Todas as instituições" ? <button className="secondary-action focusable" type="button" onClick={() => { setQuery(""); setActiveArea("Todas"); setActiveStatus("Todos"); setActiveInstitution("Todas as instituições"); }}>Limpar filtros</button> : null}

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
          <div className="certification-grid">
          {visibleCertifications.map((certification) => (
            <article className="certification-card" key={`${certification.name}-${certification.institution}`}>
              <div>
                <span className={`status-pill ${statusClasses[certification.status]}`}>
                  {certification.status}
                </span>
                <p className="context-label">{certification.area}</p>
                <h3>{certification.name}</h3>
                <button className="nexo-institution focusable" type="button" aria-label={`Filtrar cursos de ${certification.institution}`} onClick={() => setActiveInstitution(certification.institution)}>{certification.institution}</button>
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

              {certification.note ? <details className="nexo-archive-details"><summary className="focusable">Contexto do curso</summary><p className="card-note">{certification.note}</p></details> : null}

              {certification.certificateUrl ? (
                <div className="project-links">
                <button className="secondary-action focusable" type="button" onClick={(event) => { previewTrigger.current = event.currentTarget; setPreview(certification); }} aria-label={`Visualizar certificado: ${certification.name}`}><Eye size={16} aria-hidden="true" />Visualizar certificado</button>
                <a className="secondary-action focusable" href={certification.certificateUrl} rel="noreferrer" target="_blank">
                  <ExternalLink size={16} />
                  Abrir PDF
                </a>
                </div>
              ) : null}
            </article>
          ))}
          </div>
        </>
      )}
    </div>
    <Dialog.Portal>
      <Dialog.Overlay className="nexo-certificate-overlay" />
      <Dialog.Content className="nexo-certificate-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); previewTrigger.current?.focus({ preventScroll: true }); }}>
        <div className="nexo-certificate-dialog__header"><div><Dialog.Title>{preview?.name}</Dialog.Title><Dialog.Description>{preview?.institution} · Certificado fornecido pela profissional.</Dialog.Description></div><Dialog.Close asChild><button className="nexo-menu-close focusable" type="button" aria-label="Fechar certificado"><X size={20} aria-hidden="true" /></button></Dialog.Close></div>
        {preview?.certificateUrl ? <><iframe title={`Certificado de ${preview.name}`} src={preview.certificateUrl} /><a className="secondary-action focusable" href={preview.certificateUrl} target="_blank" rel="noreferrer">Abrir PDF em outra aba<ExternalLink size={16} aria-hidden="true" /></a></> : null}
      </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
  );
}
