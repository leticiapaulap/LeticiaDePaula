import type { Certification, CertificationArea } from "@/lib/types";

const curriculumNote = "Informado no currículo fornecido; certificado não anexado.";

export const certifications: Certification[] = [
  {
    name: "Fundamentos da Lei Geral de Proteção de Dados (LGPD)",
    institution: "Escola Nacional de Administração Pública (Enap)",
    area: "Privacidade e Administração",
    workload: "15 h",
    completionDate: "02/09/2026",
    status: "Concluído",
    certificateUrl: "/certificates/enap-fundamentos-lgpd.pdf",
    note: "Certificado anexado; conclusão registrada pela Enap.",
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
    note: "Certificado anexado; conclusão registrada pela Enap.",
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
    note: "Certificado anexado; curso concluído em 14/10/2026.",
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
    note: "Certificado anexado; curso realizado de 16/05/2025 a 30/04/2026, com emissão em 12/05/2026.",
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
    note: "Certificado da Escola Virtual anexado; cópia pública sem o endereço de impressão do portal.",
    priority: 9
  },
  {
    name: "Full Stack Developer",
    institution: "Versátil TI",
    area: "Desenvolvimento",
    status: "A validar",
    note: curriculumNote,
    priority: 10
  },
  {
    name: "Master Java",
    institution: "Versátil TI",
    area: "Desenvolvimento",
    status: "A validar",
    note: curriculumNote,
    priority: 11
  },
  {
    name: "Linguagem Python",
    institution: "Versátil TI",
    area: "Desenvolvimento",
    status: "A validar",
    note: curriculumNote,
    priority: 12
  },
  {
    name: "Spring Boot e Angular 17+",
    institution: "Deal",
    area: "Desenvolvimento",
    workload: "91 h",
    status: "A validar",
    note: curriculumNote,
    priority: 13
  },
  {
    name: "Desenvolvimento Java",
    institution: "Udemy",
    area: "Desenvolvimento",
    workload: "13 h",
    status: "A validar",
    note: curriculumNote,
    priority: 14
  },
  {
    name: "Simplifica Python Express",
    institution: "Simplifica Treinamentos",
    area: "Desenvolvimento",
    workload: "10 h",
    status: "A validar",
    note: curriculumNote,
    priority: 15
  },
  {
    name: "GenAI & Dados",
    institution: "Fundação Bradesco",
    area: "IA e Dados",
    workload: "52 h",
    status: "A validar",
    note: curriculumNote,
    priority: 16
  },
  {
    name: "Trilha Banco de Dados",
    institution: "Fundação Bradesco",
    area: "Banco de Dados",
    workload: "38 h",
    status: "A validar",
    note: curriculumNote,
    priority: 17
  },
  {
    name: "Excel",
    institution: "Udemy",
    area: "Ferramentas",
    workload: "11,5 h",
    status: "A validar",
    note: curriculumNote,
    priority: 18
  },
  {
    name: "Databases for Developers: Foundations",
    institution: "Oracle Dev Gym",
    area: "Banco de Dados",
    status: "Em andamento",
    note: "Curso informado como em andamento no currículo; sem certificado de conclusão.",
    priority: 19
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
