import type { Certification, CertificationArea } from "@/lib/types";

export const certifications: Certification[] = [
  {
    name: "Databases for Developers: Foundations",
    institution: "Oracle Dev Gym",
    area: "Banco de Dados",
    status: "Em andamento",
    note: "Curso informado como em andamento. Não há data de conclusão nem certificado anexado.",
    priority: 1
  }
];

export const certificationAreas: Array<CertificationArea | "Todas"> = [
  "Todas",
  "Desenvolvimento",
  "Dados e BI",
  "Banco de Dados",
  "Ferramentas",
  "IA e Dados"
];
