import type { Project } from "@/data/tipos";

export const senappenRecebimentos: Project = {
  id: "senappen-recebimentos",
  slug: "senappen-recebimentos",
  title: "Sistema de Recebimentos Documentais — SENAPPEN",
  shortTitle: "Portal SENAPPEN",
  category: "Automação",
  featured: true,
  publicationStatus: "Repositório privado",
  status: "Projeto institucional · apresentação resumida",
  summary:
    "Sistema web desenvolvido para digitalizar e organizar o recebimento de documentos, com formulários específicos para unidades federativas e empresas, validação de informações, emissão de recibos e acompanhamento administrativo.",
  description:
    "Sistema web desenvolvido para digitalizar e organizar o recebimento de documentos, com formulários específicos para unidades federativas e empresas, validação de informações, emissão de recibos e acompanhamento administrativo.",
  problem:
    "Organizar recebimentos institucionais demanda padronização dos registros, rastreabilidade e confirmação de envio, sem comprometer a confidencialidade dos documentos.",
  solution:
    "O sistema organiza os fluxos de recebimento em formulários dedicados, valida os dados informados, emite recibos e facilita o acompanhamento dos registros.",
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  highlights: [
    "Fluxos distintos para UFs e empresas.",
    "Protocolos e comprovantes para acompanhar os recebimentos.",
    "Apresentação pública limitada ao contexto técnico geral."
  ],
  features: [
    "Formulários de recebimento para UFs e empresas.",
    "Geração de protocolo e recibo em PDF.",
    "Acompanhamento administrativo dos recebimentos."
  ],
  architecture: [
    "Interface e rotas de aplicação em Next.js e TypeScript.",
    "Persistência relacional com Prisma e PostgreSQL."
  ],
  learnings: [
    "Padronizar formulários e validações ajuda a manter registros consistentes.",
    "Recibos e registros facilitam o acompanhamento dos recebimentos.",
    "Documentar um projeto institucional exige separar a apresentação profissional das informações restritas."
  ],
  links: [
    { label: "Acessar sistema", href: "https://mjsp-recebimentos-smtp.vercel.app/", type: "demo" },
    { label: "Estudo de caso", href: "/projetos/senappen-recebimentos/", type: "case" }
  ],
  media: {
    kind: "technical",
    alt: "Visão geral do portal SENAPPEN: formulários, registros e comprovantes, sem dados internos",
    tone: "warm",
    nodes: [
      { title: "Recebimento", detail: "Formulários" },
      { title: "Registro", detail: "Protocolo · histórico" },
      { title: "Comprovante", detail: "PDF · notificações" }
    ]
  },
  screenshots: [
    {
      src: "/projects/senappen-recebimentos-home.webp",
      alt: "Página pública do Portal SENAPPEN — Oficina de Trabalho Prisional, com apresentação dos fluxos para unidades federativas, oficinas de trabalho e empresas habilitadas",
      caption: "Tela pública de apresentação do sistema SENAPPEN. Captura fornecida por Letícia de Paula.",
      width: 1905,
      height: 903,
      preserveAspectRatio: true
    }
  ],
  evidence: { level: "interno", sourceLabel: "Documentação técnica do projeto privado" },
  sensitiveNote:
    "Repositório privado. Esta página apresenta o contexto e as tecnologias em nível geral, com acesso à página pública do sistema. Código-fonte, documentos, credenciais e dados operacionais não são publicados neste portfólio."
};
