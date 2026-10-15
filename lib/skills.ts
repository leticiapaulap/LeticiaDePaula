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
        name: "JavaScript",
        evidence: "experiencia-informada",
        context: "Conhecimento listado no currículo; sem projeto público associado aqui."
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
      },
      {
        name: "GraphQL",
        evidence: "experiencia-informada",
        context: "Conhecimento listado no currículo; sem implementação pública relacionada."
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
      },
      {
        name: "MySQL",
        evidence: "experiencia-informada",
        context: "Banco de dados listado no currículo; sem projeto público associado."
      }
    ]
  },
  {
    id: "data-bi",
    title: "Dados e BI",
    description: "Ferramentas declaradas no currículo; nenhuma relação com projeto é presumida.",
    items: [
      {
        name: "Power BI",
        evidence: "experiencia-informada",
        context: "Listada no currículo e em curso documentado; sem projeto público associado."
      },
      {
        name: "Excel",
        evidence: "experiencia-informada",
        context: "Listado no currículo e em curso documentado; sem projeto público associado."
      },
      {
        name: "SQL",
        evidence: "uso-publico",
        context: "Esquema e migrações do projeto Festa Fantasia são documentados publicamente.",
        projectSlugs: ["festa-fantasia"]
      }
    ]
  },
  {
    id: "automation",
    title: "Automação",
    description: "Conhecimentos declarados no currículo, sem projetos corporativos publicados.",
    items: [
      {
        name: "Python",
        evidence: "experiencia-informada",
        context: "Conhecimento e automação listados no currículo; sem projeto público associado."
      },
      {
        name: "Power Automate",
        evidence: "experiencia-informada",
        context: "Ferramenta de automação listada no currículo; sem fluxo corporativo publicado."
      }
    ]
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
      },
      {
        name: "Docker · Postman · DBeaver · VS Code",
        evidence: "experiencia-informada",
        context: "Ferramentas listadas no currículo; o uso em projetos específicos não foi associado."
      },
      {
        name: "SharePoint",
        evidence: "experiencia-informada",
        context: "Ferramenta listada no currículo, sem associação a projeto público."
      },
      {
        name: "SEI",
        evidence: "estudo",
        context: "SEI! USAR 4.0 concluído com certificado."
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
