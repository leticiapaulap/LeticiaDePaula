import type { Certification, CertificationArea } from "@/lib/types";

export const certifications: Certification[] = [
  {
    name: "Fundamentos da Lei Geral de Proteção de Dados (LGPD)",
    institution: "Escola Nacional de Administração Pública (Enap)",
    area: "Privacidade e Administração",
    workload: "15 h",
    completionDate: "02/09/2026",
    status: "Concluído",
    certificateUrl: "/certificates/enap-fundamentos-lgpd.pdf",
    priority: 1
  },
  {
    name: "SEI! USAR 4.0",
    institution: "Escola Nacional de Administração Pública (Enap)",
    area: "Privacidade e Administração",
    workload: "25 h",
    completionDate: "14/08/2026",
    status: "Concluído",
    certificateUrl: "/certificates/enap-sei-usar-4.pdf",
    priority: 2
  },
  {
    name: "Introdução à Ciência de Dados — Modelos de Agrupamento",
    institution: "Escola Nacional de Administração Pública (Enap)",
    area: "IA e Dados",
    workload: "4 h",
    completionDate: "14/10/2026",
    status: "Concluído",
    certificateUrl: "/certificates/enap-modelos-de-agrupamento.pdf",
    priority: 3
  },
  {
    name: "Introdução à Análise de Dados e BI",
    institution: "DIO",
    area: "Dados e BI",
    workload: "10 h",
    completionDate: "01/04/2026",
    status: "Concluído",
    certificateUrl: "/certificates/dio-analise-de-dados-e-bi.pdf",
    priority: 4
  },
  {
    name: "Introdução à Análise de Dados com SQL",
    institution: "DIO",
    area: "Banco de Dados",
    workload: "3 h",
    completionDate: "11/02/2026",
    status: "Concluído",
    certificateUrl: "/certificates/dio-analise-de-dados-com-sql.pdf",
    priority: 5
  },
  {
    name: "Contribuindo em um Projeto Open Source no GitHub",
    institution: "DIO",
    area: "Desenvolvimento",
    workload: "1 h",
    completionDate: "01/04/2026",
    status: "Concluído",
    certificateUrl: "/certificates/dio-projeto-open-source-github.pdf",
    priority: 6
  },
  {
    name: "Introdução ao Excel e Power BI Dashboards com a Klabin 2026",
    institution: "Klabin · DIO",
    area: "Dados e BI",
    workload: "1 h",
    completionDate: "30/01/2026",
    status: "Concluído",
    certificateUrl: "/certificates/klabin-excel-power-bi.pdf",
    priority: 7
  },
  {
    name: "Desenvolvedor Profissional",
    institution: "Versátil TI",
    area: "Desenvolvimento",
    workload: "240 h",
    completionDate: "30/04/2026",
    status: "Concluído",
    certificateUrl: "/certificates/versatil-desenvolvedor-profissional.pdf",
    priority: 8
  },
  {
    name: "Introdução à Análise de Dados — Microsoft Power BI",
    institution: "Fundação Bradesco",
    area: "Dados e BI",
    workload: "5 h",
    completionDate: "17/09/2026",
    status: "Concluído",
    certificateUrl: "/certificates/bradesco-introducao-analise-dados-power-bi.pdf",
    priority: 9
  },
  {
    name: "Databases for Developers: Foundations",
    institution: "Oracle Dev Gym",
    area: "Banco de Dados",
    status: "Em andamento",
    priority: 10
  }
];

export const certificationAreas: Array<CertificationArea | "Todas"> = [
  "Todas",
  "Desenvolvimento",
  "Dados e BI",
  "Banco de Dados",
  "Ferramentas",
  "IA e Dados",
  "Privacidade e Administração"
];
