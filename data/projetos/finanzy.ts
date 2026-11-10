import type { Project } from "@/data/tipos";

export const finanzy: Project = {
  id: "organizador-de-tarefas",
  slug: "organizador-de-tarefas",
  title: "Finanzy — Organizador financeiro pessoal",
  shortTitle: "Organizador pessoal",
  category: "Desenvolvimento Web",
  featured: false,
  publicationStatus: "Em desenvolvimento",
  status: "Projeto pessoal · código não público",
  summary:
    "Organizador pessoal para acompanhar receitas, despesas, pagamentos fixos e metas, com resumo mensal e alertas de vencimento.",
  description:
    "O projeto do repositório Organizador_de_tarefas evoluiu para o Finanzy, um gerenciador financeiro pessoal com interface web, API e uma versão Java para execução local.",
  problem:
    "Acompanhar valores recebidos, despesas pagas e compromissos futuros exige uma visão que diferencie o saldo disponível do saldo previsto.",
  solution:
    "A aplicação reúne lançamentos, contas fixas, valores a receber e metas por categoria em um painel mensal. A estrutura inclui uma API Node.js preparada para Vercel com PostgreSQL e uma alternativa Java com persistência local.",
  technologies: ["JavaScript", "HTML", "CSS", "Node.js", "PostgreSQL", "Neon", "Java 21", "Maven"],
  highlights: [
    "Resumo mensal com separação entre saldo real e previsto.",
    "Acompanhamento de pagamentos fixos e recebimentos pendentes.",
    "Implementações web e Java local documentadas no mesmo repositório."
  ],
  features: [
    "Registro de receitas, gastos e valores a receber.",
    "Pagamentos fixos com vencimento e confirmação de pagamento.",
    "Metas por categoria e alertas de pendências.",
    "Resumo mensal de entradas, saídas e saldos.",
    "Login e criação de conta."
  ],
  architecture: [
    "Interface web em HTML, CSS e JavaScript.",
    "Endpoints Node.js para execução serverless, com persistência em PostgreSQL/Neon.",
    "Versão Java 21 com servidor web e armazenamento local em arquivos de propriedades."
  ],
  learnings: [
    "Separar valores previstos e confirmados torna a leitura financeira mais clara.",
    "Pagamentos recorrentes e recebimentos precisam de estados explícitos.",
    "Documentar as diferenças de persistência facilita executar as versões local e web."
  ],
  links: [
    { label: "Estudo de caso", href: "/projetos/organizador-de-tarefas/", type: "case" }
  ],
  media: {
    kind: "technical",
    alt: "Diagrama do Finanzy: interface web, API com PostgreSQL e alternativa Java local",
    tone: "teal",
    nodes: [
      { title: "Interface", detail: "HTML · CSS · JavaScript" },
      { title: "API", detail: "Node.js · PostgreSQL" },
      { title: "Versão local", detail: "Java 21 · arquivos" }
    ]
  },
  screenshots: [
    {
      src: "/projects/finanzy-login.webp",
      alt: "Tela de acesso do Finanzy, com opções para entrar ou criar conta e campos de e-mail e senha vazios",
      caption: "Tela de entrada do Finanzy, sem dados de usuário preenchidos.",
      width: 1906,
      height: 909
    }
  ],
  evidence: { level: "interno", sourceLabel: "Documentação e implementação local do projeto pessoal" },
  sensitiveNote:
    "O código não está disponível publicamente. Esta apresentação não inclui dados financeiros, contas de usuários ou credenciais; o diagrama é uma visão editorial, não uma captura da aplicação."
};
