export type EvidenceLevel = "publico" | "informado" | "interno" | "a-validar";

export type ProjectCategory =
  | "Desenvolvimento Web"
  | "Back-end"
  | "Dados"
  | "Automação"
  | "Open Source"
  | "Portfólio";

export type ProjectLinkType = "github" | "demo" | "case" | "external";

export type ProjectLink = {
  label: string;
  href: string;
  type: ProjectLinkType;
};

export type ProjectMedia = {
  kind: "technical";
  alt: string;
  tone: "teal" | "warm" | "berry";
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  featured: boolean;
  publicationStatus: "Publicado" | "Em desenvolvimento";
  status: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  highlights: string[];
  features: string[];
  architecture: string[];
  learnings: string[];
  links: ProjectLink[];
  media: ProjectMedia;
  screenshots: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  evidence: {
    level: EvidenceLevel;
    sourceLabel: string;
    href?: string;
  };
  sensitiveNote?: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  modality: string;
  area: string;
  featured?: boolean;
  context: string;
  responsibilities: string[];
  technologies: string[];
  results: string[];
};

export type SkillEvidence = "uso-publico" | "experiencia-informada" | "estudo" | "a-validar";

export type SkillItem = {
  name: string;
  evidence: SkillEvidence;
  context: string;
  projectSlugs?: string[];
};

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  items: SkillItem[];
};

export type EducationEntry = {
  course: string;
  institution: string;
  status: string;
  period: string;
  areas: string[];
  note: string;
};

export type CertificationArea =
  | "Desenvolvimento"
  | "Dados e BI"
  | "Banco de Dados"
  | "Ferramentas"
  | "IA e Dados"
  | "Privacidade e Administração";

export type CertificationStatus = "Concluído" | "Em andamento";

export type Certification = {
  name: string;
  institution: string;
  area: CertificationArea;
  workload?: string;
  completionDate?: string;
  status: CertificationStatus;
  certificateUrl?: string;
  note?: string;
  priority: number;
};
