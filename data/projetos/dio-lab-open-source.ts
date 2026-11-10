import type { Project } from "@/data/tipos";

export const dioLabOpenSource: Project = {
  id: "dio-lab-open-source",
  slug: "dio-lab-open-source",
  title: "DIO Lab — Contribuindo em um Projeto Open Source no GitHub",
  shortTitle: "DIO Lab · Open Source",
  category: "Open Source",
  featured: false,
  publicationStatus: "Publicado",
  status: "Fork educacional · Digital Innovation One",
  summary:
    "Fork do laboratório da Digital Innovation One para estudar colaboração open source, versionamento com Git e documentação em Markdown.",
  description:
    "Laboratório educacional mantido pela Digital Innovation One. Meu perfil mantém um fork público do repositório, com acesso ao guia de contribuição e aos exemplos da comunidade; a autoria do projeto original é da DIO.",
  problem:
    "Aprender a colaborar em projetos open source exige conhecer as convenções do repositório e o fluxo entre fork, branch, commit e revisão.",
  solution:
    "O laboratório oferece um ambiente guiado para praticar esse fluxo com documentação e perfis em Markdown. O fork mantém acesso ao material e às convenções de colaboração do projeto original.",
  technologies: ["Git", "GitHub", "Markdown"],
  highlights: [
    "Fork público associado ao perfil leticiapaulap.",
    "Contexto de aprendizagem em colaboração e documentação.",
    "Crédito e acesso direto ao repositório original da DIO."
  ],
  features: [
    "Guia de contribuição para a comunidade.",
    "Orientações sobre fork, branches, commits e pull requests.",
    "Exemplos de perfis e documentação em Markdown."
  ],
  architecture: [
    "Repositório original mantido por digitalinnovationone/dio-lab-open-source.",
    "Fork educacional disponível em leticiapaulap/dio-lab-open-source.",
    "Diretório community para perfis e CONTRIBUTING.md com as orientações do laboratório."
  ],
  learnings: [
    "Ler as orientações do projeto é o primeiro passo antes de propor alterações.",
    "Convenções de commits e escopo de mudanças facilitam a revisão colaborativa.",
    "Markdown permite organizar documentação técnica de forma acessível."
  ],
  links: [
    { label: "Ver fork no GitHub", href: "https://github.com/leticiapaulap/dio-lab-open-source", type: "github" },
    { label: "Projeto original · DIO", href: "https://github.com/digitalinnovationone/dio-lab-open-source", type: "external" },
    { label: "Estudo de caso", href: "/projetos/dio-lab-open-source/", type: "case" }
  ],
  media: {
    kind: "technical",
    alt: "Diagrama do laboratório DIO: projeto original, fork educacional e guia de colaboração",
    tone: "berry",
    nodes: [
      { title: "Origem", detail: "Digital Innovation One" },
      { title: "Fork", detail: "leticiapaulap" },
      { title: "Estudo", detail: "Git · Markdown" }
    ]
  },
  screenshots: [],
  evidence: {
    level: "publico",
    sourceLabel: "Fork público do laboratório DIO",
    href: "https://github.com/leticiapaulap/dio-lab-open-source"
  }
};
