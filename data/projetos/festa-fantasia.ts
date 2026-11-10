import type { Project } from "@/data/tipos";

export const festaFantasia: Project = {
  id: "festa-fantasia",
  slug: "festa-fantasia",
  title: "Festa Fantasia - Concurso de Melhor Fantasia",
  shortTitle: "Festa Fantasia",
  category: "Desenvolvimento Web",
  featured: false,
  publicationStatus: "Publicado",
  status: "Aplicação web com código público",
  summary:
    "Sistema full stack para cadastro de fantasias, votação anônima por navegador, painel administrativo, QR Codes e resultado público com ranking.",
  description:
    "Aplicação criada para uma festa real, com experiência pública para participantes e convidados, área administrativa, controle de votação e publicação do resultado final.",
  problem:
    "Organizar um concurso de fantasias exigia cadastro dos participantes, controle de votação, prevenção de votos repetidos no mesmo navegador e uma forma simples de encerrar a votação e divulgar o ranking.",
  solution:
    "A solução combina frontend React mobile-first, API serverless na Vercel, persistência em PostgreSQL e um módulo Java/Spring Boot mantido no repositório. O fluxo anônimo usa cookie HttpOnly assinado e regra de unicidade no banco.",
  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Node.js serverless",
    "PostgreSQL",
    "JWT",
    "BCrypt",
    "Spring Boot",
    "Flyway",
    "Vercel"
  ],
  highlights: [
    "Frontend responsivo com rotas públicas e painel administrativo.",
    "API serverless implantada junto ao frontend, com PostgreSQL persistente.",
    "Fluxo de voto anônimo com cookie HttpOnly e controle de unicidade.",
    "Separação entre votos de teste e votos oficiais para reduzir risco operacional.",
    "Documentação pública com arquitetura, variáveis de ambiente e passos de execução."
  ],
  features: [
    "Cadastro de participantes e fantasias.",
    "Listagem pública para consulta das fantasias.",
    "Votação anônima por navegador.",
    "Painel administrativo para controle do concurso.",
    "Geração e uso de QR Codes.",
    "Encerramento da votação e página pública de resultado."
  ],
  architecture: [
    "frontend: aplicação React, TypeScript, Vite, Tailwind CSS e rotas públicas/admin.",
    "api e server: handler serverless para a Vercel, com módulos separados para domínio e infraestrutura.",
    "backend: módulo Spring Boot com Spring Data JPA, Spring Security e migrations Flyway.",
    "database: PostgreSQL persistente com tabelas para participantes, votos, códigos, configurações do evento e administradores."
  ],
  learnings: [
    "Projetar fluxos públicos exige cuidar de estados limite, como teste, votação oficial e encerramento.",
    "Segredos precisam ficar server-side; variáveis expostas ao frontend não devem carregar códigos administrativos.",
    "Documentar execução local, deploy e arquitetura facilita manutenção e revisão por outras pessoas."
  ],
  links: [
    {
      label: "Ver aplicação",
      href: "https://festa-fantasia.vercel.app/",
      type: "demo"
    },
    {
      label: "GitHub",
      href: "https://github.com/leticiapaulap/Festa_Fantasia",
      type: "github"
    },
    {
      label: "Estudo de caso",
      href: "/projetos/festa-fantasia/",
      type: "case"
    }
  ],
  media: {
    kind: "technical",
    alt: "Diagrama original dos componentes e fluxos documentados do projeto Festa Fantasia",
    tone: "teal",
    nodes: [
      { title: "Frontend", detail: "React · TypeScript" },
      { title: "API Vercel", detail: "Node.js · PostgreSQL" },
      { title: "Backend", detail: "Spring Boot" }
    ]
  },
  screenshots: [
    {
      src: "/projects/festa-fantasia-home.webp",
      alt: "Página atualizada do concurso Halloween, com apresentação do evento, cadastro de fantasias, participantes e contagem regressiva para a votação",
      caption: "Interface atualizada do Festa Fantasia / Halloween. Captura real fornecida por Letícia de Paula em 20/10/2026.",
      width: 1600,
      height: 760
    }
  ],
  evidence: {
    level: "publico",
    sourceLabel: "README público do repositório",
    href: "https://github.com/leticiapaulap/Festa_Fantasia"
  }
};
