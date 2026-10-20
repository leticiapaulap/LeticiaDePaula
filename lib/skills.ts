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
        context: "Interfaces públicas em Festa Fantasia e neste portfólio; uso também documentado no portal privado da SENAPPEN.",
        projectSlugs: ["festa-fantasia", "senappen-recebimentos", "portfolio-leticia-de-paula"]
      },
      {
        name: "TypeScript",
        evidence: "uso-publico",
        context: "Código público em Festa Fantasia e neste portfólio; também utilizado no portal privado da SENAPPEN.",
        projectSlugs: ["festa-fantasia", "senappen-recebimentos", "portfolio-leticia-de-paula"]
      },
      {
        name: "JavaScript",
        evidence: "experiencia-informada",
        context: "Interface web do Finanzy, conferida na implementação local; código não público.",
        projectSlugs: ["organizador-de-tarefas"]
      },
      {
        name: "Vite",
        evidence: "uso-publico",
        context: "Ambiente de desenvolvimento do frontend de Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Tailwind CSS",
        evidence: "uso-publico",
        context: "Estilização responsiva em Festa Fantasia e neste portfólio.",
        projectSlugs: ["festa-fantasia", "portfolio-leticia-de-paula"]
      },
      {
        name: "Next.js",
        evidence: "uso-publico",
        context: "Rotas estáticas deste portfólio e aplicação no portal privado da SENAPPEN.",
        projectSlugs: ["senappen-recebimentos", "portfolio-leticia-de-paula"]
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
    description: "APIs, regras de negócio e integração entre sistemas.",
    items: [
      {
        name: "Node.js · APIs serverless",
        evidence: "uso-publico",
        context: "API pública de Festa Fantasia e implementação local do Finanzy, cujo código não é público.",
        projectSlugs: ["festa-fantasia", "organizador-de-tarefas"]
      },
      {
        name: "Java · Spring Boot",
        evidence: "uso-publico",
        context: "Módulo Java/Spring Boot do projeto Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "Spring Data JPA · Spring Security",
        evidence: "uso-publico",
        context: "Persistência e segurança no módulo Spring Boot.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "APIs REST",
        evidence: "uso-publico",
        context: "Endpoints para fluxos públicos e administrativos.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "GraphQL",
        evidence: "experiencia-informada",
        context: "Conhecimentos em consultas e integração de dados."
      }
    ]
  },
  {
    id: "database",
    title: "Banco de Dados",
    description: "Modelagem, consultas, persistência e migrações.",
    items: [
      {
        name: "PostgreSQL",
        evidence: "uso-publico",
        context: "Persistência pública em Festa Fantasia; também documentada nos projetos não públicos Finanzy e portal SENAPPEN.",
        projectSlugs: ["festa-fantasia", "organizador-de-tarefas", "senappen-recebimentos"]
      },
      {
        name: "SQL · Flyway",
        evidence: "uso-publico",
        context: "Migrações e restrições de unicidade em Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      },
      {
        name: "MySQL",
        evidence: "experiencia-informada",
        context: "Conhecimentos em bancos relacionais e consultas."
      }
    ]
  },
  {
    id: "data-bi",
    title: "Dados e BI",
    description: "Análise, organização e visualização de informações.",
    items: [
      {
        name: "Power BI",
        evidence: "experiencia-informada",
        context: "Estudos em análise de dados e construção de visualizações."
      },
      {
        name: "Excel",
        evidence: "experiencia-informada",
        context: "Organização de informações, planilhas e análise de dados."
      },
      {
        name: "SQL",
        evidence: "uso-publico",
        context: "Esquema relacional e migrações de Festa Fantasia.",
        projectSlugs: ["festa-fantasia"]
      }
    ]
  },
  {
    id: "automation",
    title: "Automação",
    description: "Estudos e ferramentas para simplificar rotinas.",
    items: [
      {
        name: "Python",
        evidence: "experiencia-informada",
        context: "Conhecimentos em Python e automação de rotinas."
      },
      {
        name: "Power Automate",
        evidence: "experiencia-informada",
        context: "Conhecimentos em criação de fluxos automatizados."
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
        context: "Versionamento dos projetos públicos e estudo de colaboração no fork educacional do DIO Lab.",
        projectSlugs: ["festa-fantasia", "dio-lab-open-source", "portfolio-leticia-de-paula"]
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
        context: "Ferramentas de apoio ao desenvolvimento, testes e consulta de dados."
      },
      {
        name: "SharePoint",
        evidence: "experiencia-informada",
        context: "Conhecimentos em organização e colaboração com documentos."
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
  "uso-publico": "Em projetos",
  "experiencia-informada": "Conhecimento técnico",
  estudo: "Em estudo",
  "a-validar": "Em estudo"
} as const;
