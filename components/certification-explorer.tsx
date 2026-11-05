"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowDown, ExternalLink, Eye, Search, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { Certification } from "@/lib/types";
import { certificationAreas, certifications, type CertificationArea, type CertificationStatus } from "@/lib/data";

type AreaFilter = CertificationArea | "Todas";
type StatusFilter = CertificationStatus | "Todos";
const statusFilters: StatusFilter[] = ["Todos", "Concluído", "Em andamento"];
const normalizeSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
const initialCompletedCount = 6;

export function CertificationExplorer() {
  const [activeArea, setActiveArea] = useState<AreaFilter>("Todas");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("Todos");
  const [activeInstitution, setActiveInstitution] = useState("Todas as instituições");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<Certification | null>(null);
  const previewTrigger = useRef<HTMLButtonElement | null>(null);
  const institutions = useMemo(() => [...new Set(certifications.map((item) => item.institution))].sort((a, b) => a.localeCompare(b, "pt-BR")), []);
  const visibleCertifications = useMemo(() => certifications
    .filter((item) => activeArea === "Todas" || item.area === activeArea)
    .filter((item) => activeStatus === "Todos" || item.status === activeStatus)
    .filter((item) => activeInstitution === "Todas as instituições" || item.institution === activeInstitution)
    .filter((item) => normalizeSearch(`${item.name} ${item.institution} ${item.area}`).includes(normalizeSearch(query.trim())))
    .sort((a, b) => a.priority - b.priority), [activeArea, activeInstitution, activeStatus, query]);
  const hasFilters = Boolean(query || activeArea !== "Todas" || activeStatus !== "Todos" || activeInstitution !== "Todas as instituições");
  const renderCourse = (certification: Certification) => (
    <article className="certification-card editorial-certificate" key={`${certification.name}-${certification.institution}`}>
      <div className="certificate-title"><p className="context-label">{certification.area}</p><h4>{certification.name}</h4><span className="nexo-visually-hidden">{certification.status}</span><p className="certificate-institution">{certification.institution}</p></div>
      <div className="editorial-certificate__footer">
        {certification.workload || certification.completionDate ? <dl className="meta-list certificate-facts">{certification.workload ? <div><dt className="nexo-visually-hidden">Carga horária</dt><dd>{certification.workload}</dd></div> : null}{certification.completionDate ? <div><dt className="nexo-visually-hidden">Conclusão</dt><dd>{certification.completionDate}</dd></div> : null}</dl> : null}
        {certification.certificateUrl ? <div className="nexo-certificate-actions"><button className="text-action focusable" data-certificate-url={certification.certificateUrl} type="button" onClick={(event) => { previewTrigger.current = event.currentTarget; setPreview(certification); }} aria-label={`Ver certificado: ${certification.name}`}><Eye size={16} aria-hidden="true" />Ver certificado</button><noscript><a className="text-action focusable" href={certification.certificateUrl} rel="noreferrer" target="_blank">Abrir certificado em PDF<ExternalLink size={16} aria-hidden="true" /></a></noscript></div> : null}
      </div>
    </article>
  );

  return (
    <Dialog.Root open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}>
      <div className="certification-explorer editorial-certificate-library">
        <div className="editorial-certificate-filters">
          <div className="nexo-certification-search">
            <label className="nexo-certification-query"><span>Pesquisar curso</span><span className="editorial-search-field"><Search size={17} aria-hidden="true" /><input autoComplete="off" className="nexo-certification-input" onChange={(event) => setQuery(event.target.value)} placeholder="Nome, instituição ou área" type="search" value={query} /></span></label>
            <label className="nexo-certification-query"><span>Área</span><select aria-label="Área" className="nexo-certification-input" onChange={(event) => setActiveArea(event.target.value as AreaFilter)} value={activeArea}>{certificationAreas.map((area) => <option key={area}>{area}</option>)}</select></label>
            <label className="nexo-certification-query"><span>Instituição</span><select aria-label="Instituição" className="nexo-certification-input" onChange={(event) => setActiveInstitution(event.target.value)} value={activeInstitution}><option>Todas as instituições</option>{institutions.map((institution) => <option key={institution}>{institution}</option>)}</select></label>
          </div>
          <div className="editorial-library-results"><div className="filter-group editorial-status-filter" role="group" aria-label="Filtrar cursos por status">{statusFilters.map((status) => <button aria-pressed={activeStatus === status} className="filter-chip focusable" key={status} onClick={() => setActiveStatus(status)} type="button">{status}</button>)}</div><p className="nexo-results-count" role="status">{visibleCertifications.length === 1 ? "1 curso" : `${visibleCertifications.length} cursos`}</p>{hasFilters ? <button className="editorial-clear-filters focusable" type="button" onClick={() => { setQuery(""); setActiveArea("Todas"); setActiveStatus("Todos"); setActiveInstitution("Todas as instituições"); }}>Limpar filtros <X size={14} aria-hidden="true" /></button> : null}</div>
        </div>

        {visibleCertifications.length === 0 ? <div className="empty-state"><strong>Nenhum curso corresponde à pesquisa.</strong><span>Ajuste os filtros ou pesquise outro nome, instituição ou área.</span></div> : (["Concluído", "Em andamento"] as const).map((status) => {
          const items = visibleCertifications.filter((item) => item.status === status);
          if (!items.length) return null;
          const showSelection = status === "Concluído" && !hasFilters && items.length > initialCompletedCount;
          return (
            <section className="editorial-course-group" key={status} aria-labelledby={status === "Concluído" ? "completed-courses-title" : "ongoing-courses-title"}>
              <div className="editorial-course-group__heading"><h3 id={status === "Concluído" ? "completed-courses-title" : "ongoing-courses-title"}>{status === "Concluído" ? "Cursos concluídos e certificados" : "Em andamento"}</h3><span>{String(items.length).padStart(2, "0")}</span></div>
              <div className="certification-grid">{(showSelection ? items.slice(0, initialCompletedCount) : items).map(renderCourse)}</div>
              {showSelection ? <details className="editorial-more-courses"><summary className="focusable"><span className="editorial-more-courses__show">Ver todos os {items.length} cursos</span><span className="editorial-more-courses__hide">Mostrar seleção</span><ArrowDown size={16} aria-hidden="true" /></summary><div className="certification-grid">{items.slice(initialCompletedCount).map(renderCourse)}</div></details> : null}
            </section>
          );
        })}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="nexo-certificate-overlay" />
        <Dialog.Content className="nexo-certificate-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); previewTrigger.current?.focus({ preventScroll: true }); }}>
          <div className="nexo-certificate-dialog__header"><div><Dialog.Title>{preview?.name}</Dialog.Title><Dialog.Description>{preview?.institution}{preview?.workload ? ` · ${preview.workload}` : ""}{preview?.completionDate ? ` · ${preview.completionDate}` : ""}</Dialog.Description></div><Dialog.Close asChild><button className="nexo-menu-close focusable" type="button" aria-label="Fechar certificado"><X size={20} aria-hidden="true" /></button></Dialog.Close></div>
          {preview?.certificateUrl ? <><iframe title={`Certificado de ${preview.name}`} src={preview.certificateUrl} /><a className="secondary-action focusable" href={preview.certificateUrl} target="_blank" rel="noreferrer">Abrir PDF em outra aba<ExternalLink size={16} aria-hidden="true" /></a></> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
