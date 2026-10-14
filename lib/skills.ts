import type { SkillGroup } from "@/lib/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "front-end",
    title: "Front-end",
    description: "Interfaces, aplicação cliente e apresentação responsiva.",
    items: [
      {
        name: "React",
        evidence: "uso-publico",
        context: "Documentado na interface do projeto Festa Fantasia e neste portfólio.",
        projectSlugs: ["festa-fantasia", "portfolio-leticia-de-paula"]
      },
      {
        name: "TypeScript",
        evidence: "uso-publico",
        context: "Utilizado nos dois projetos.",
        projectSlugs: ["festa-fantasia", "portfolio-leticia-de-paula"]
      },
      {
        name: "Vite",
        evidence: "uso-publico",
        context: "Documentado como ferramenta de desenvolvimento do frontend do Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Tailwind CSS",
        evidence: "uso-publico",
        context: "Documentado no frontend do Festa Fantasia e neste portfólio.",
        projectSlugs: ["festa-fantasia", "portfolio-leticia-de-paula"]
      },
      {
        name: "Next.js",
        evidence: "uso-publico",
        context: "Framework do projeto NEXO em desenvolvimento.",
        projectSlugs: ["portfolio-leticia-de-paula"]
      },
      {
        name: "Three.js · React Three Fiber",
        evidence: "uso-publico",
        context: "Escultura procedural e cena 3D deste portfólio.",
        projectSlugs: ["portfolio-leticia-de-paula"]
      }
    ]
  },
  {
    id: "back-end",
    title: "Back-end",
    description: "APIs e componentes de servidor documentados nos projetos.",
    items: [
      {
        name: "Node.js · APIs serverless",
        evidence: "uso-publico",
        context: "API de produção e handlers Vercel descritos no repositório Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Java · Spring Boot",
        evidence: "uso-publico",
        context: "Módulo Java/Spring Boot separado, mantido e documentado no mesmo repositório.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Spring Data JPA · Spring Security",
        evidence: "uso-publico",
        context: "Dependências e arquitetura documentadas para o módulo Spring Boot.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "APIs REST",
        evidence: "uso-publico",
        context: "Endpoints e fluxos públicos e administrativos documentados no projeto.",
        projectSlugs: ["festa-fantasia"]
      }
    ]
  },
  {
    id: "database",
    title: "Banco de Dados",
    description: "Persistência e migrações documentadas.",
    items: [
      {
        name: "PostgreSQL",
        evidence: "uso-publico",
        context: "Banco persistente documentado para a aplicação.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "SQL · Flyway",
        evidence: "uso-publico",
        context: "Restrições de unicidade e migrations documentadas no projeto.",
        projectSlugs: ["festa-fantasia"]
      }
    ]
  },
  {
    id: "data-bi",
    title: "Dados e BI",
    description: "Só são listadas ferramentas associadas a um projeto ou certificado verificável.",
    items: []
  },
  {
    id: "automation",
    title: "Automação",
    description: "Ainda sem artefato público ou documentação autorizada para apresentar.",
    items: []
  },
  {
    id: "tools-processes",
    title: "Ferramentas e processos",
    description: "Tecnologias e rotinas de desenvolvimento presentes nos projetos.",
    items: [
      {
        name: "Git · GitHub",
        evidence: "uso-publico",
        context: "Versionamento, histórico e documentação de projetos públicos.",
        projectSlugs: ["festa-fantasia", "portfolio-leticia-de-paula"]
      },
      {
        name: "Maven · Flyway",
        evidence: "uso-publico",
        context: "Build e migrações do módulo Spring Boot.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Vercel",
        evidence: "uso-publico",
        context: "Publicação documentada da interface e da API do Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      }
    ]
  }
];

export const skillEvidenceLabels = {
  "uso-publico": "Evidência em projeto",
  "experiencia-informada": "Experiência informada",
  estudo: "Estudo informado",
  "a-validar": "A validar"
} as const;
