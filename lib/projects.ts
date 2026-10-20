import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "festa-fantasia",
    slug: "festa-fantasia",
    title: "Festa Fantasia - Concurso de Melhor Fantasia",
    shortTitle: "Festa Fantasia",
    category: "Desenvolvimento Web",
    featured: true,
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
  },
  {
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
    screenshots: [],
    evidence: { level: "interno", sourceLabel: "Documentação e implementação local do projeto pessoal" },
    sensitiveNote:
      "O código não está disponível publicamente. Esta apresentação não inclui dados financeiros, contas de usuários ou credenciais; o diagrama é uma visão editorial, não uma captura da aplicação."
  },
  {
    id: "senappen-recebimentos",
    slug: "senappen-recebimentos",
    title: "SENAPPEN — Portal de Recebimentos",
    shortTitle: "Portal SENAPPEN",
    category: "Automação",
    featured: false,
    publicationStatus: "Repositório privado",
    status: "Projeto institucional · apresentação resumida",
    summary:
      "Portal institucional para organizar recebimentos de UFs e empresas, com protocolos, recibos em PDF e integração de notificações.",
    description:
      "Projeto institucional de recebimentos da SENAPPEN, apresentado em nível geral para preservar a confidencialidade. O fluxo reúne formulários, validação, registro e emissão de comprovantes.",
    problem:
      "Organizar recebimentos institucionais demanda padronização dos registros, rastreabilidade e confirmação de envio, sem comprometer a confidencialidade dos documentos.",
    solution:
      "O portal organiza formulários por perfil de acesso, gera protocolos e recibos e integra notificações por e-mail. O projeto também prevê armazenamento documental com SharePoint.",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Neon", "SMTP", "SharePoint"],
    highlights: [
      "Fluxos distintos para UFs e empresas.",
      "Protocolos e comprovantes para acompanhar os recebimentos.",
      "Apresentação pública limitada ao contexto técnico geral."
    ],
    features: [
      "Formulários de recebimento para UFs e empresas.",
      "Geração de protocolo e recibo em PDF.",
      "Notificações por e-mail e integração documental.",
      "Controle de acesso e trilha de auditoria."
    ],
    architecture: [
      "Interface e rotas de aplicação em Next.js, React e TypeScript.",
      "Persistência relacional com Prisma e PostgreSQL/Neon.",
      "Serviços para emissão de PDF, envio SMTP e integração com SharePoint."
    ],
    learnings: [
      "Padronizar formulários e validações ajuda a manter registros consistentes.",
      "Protocolos e comprovantes conectam envio, registro e acompanhamento.",
      "Documentar um projeto institucional exige separar a apresentação profissional das informações restritas."
    ],
    links: [
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
    screenshots: [],
    evidence: { level: "interno", sourceLabel: "Documentação técnica do projeto privado" },
    sensitiveNote:
      "Repositório privado. Esta página apresenta apenas o contexto e as tecnologias em nível geral. Código-fonte, endereços de acesso, documentos, credenciais e dados operacionais não são publicados neste portfólio."
  },
  {
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
  },
  {
    id: "nexo-portfolio",
    slug: "portfolio-leticia-de-paula",
    title: "Letícia de Paula — Portfólio profissional",
    shortTitle: "Portfólio pessoal",
    category: "Portfólio",
    featured: false,
    publicationStatus: "Em desenvolvimento",
    status: "Portfólio em desenvolvimento",
    summary:
      "Portfólio editorial com galeria 3D de projetos, navegação acessível por capítulos e uma apresentação integrada de projetos e trajetória.",
    description:
      "Uma experiência autoral que une linguagem editorial, uma galeria interativa de projetos reais e caminhos diretos para conhecer meu trabalho.",
    problem:
      "Currículos estáticos não permitem consultar estudos de caso, fontes, competências e conteúdos em evolução.",
    solution:
      "A implementação combina rotas estáticas em Next.js, conteúdo tipado, uma escultura vetorial e 3D opcional, e um modo direto para navegar sem WebGL.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "Radix UI",
      "Lucide React"
    ],
    highlights: [
      "Portal e seções profissionais separados das fontes de conteúdo tipadas.",
      "Páginas individuais estáticas para estudos de caso documentados.",
      "Navegação direta sem exigir a experiência imersiva.",
      "Galeria de projetos com telas em perspectiva, capturas reais e alternativa leve em HTML.",
      "A escultura 3D é carregada à parte; texto e links permanecem em HTML."
    ],
    features: [
      "Galeria interativa na abertura e navegação em sete capítulos.",
      "Páginas profissionais, navegação direta e menu responsivo.",
      "Fallback 2D para a escultura e funcionamento sem WebGL.",
      "Filtros funcionais de projetos e certificações.",
      "Currículo digital imprimível e download de PDF público."
    ],
    architecture: [
      "app: rotas principais, currículo digital, sitemap, robots e páginas dinâmicas de projetos.",
      "components/portal: experiência inicial, sala de navegação e escultura procedural carregada sob demanda.",
      "components: seções visuais, filtros client-side, header acessível e componentes de apoio.",
      "lib: dados profissionais, experiências, projetos, formação, competências, cursos e links sociais.",
      "public: imagens, currículo e certificados disponíveis para consulta."
    ],
    learnings: [
      "Separar dados e interface reduz o risco de inconsistência em um portfólio que tende a evoluir.",
      "Um site pessoal também precisa tratar ausência de documentos sem criar botões decorativos.",
      "Experiência visual forte não exige excesso de efeitos quando hierarquia e conteúdo estão bem resolvidos."
    ],
    links: [
      {
        label: "Estudo de caso",
        href: "/projetos/portfolio-leticia-de-paula/",
        type: "case"
      },
      {
        label: "GitHub",
        href: "https://github.com/leticiapaulap/LeticiaDePaula",
        type: "github"
      }
    ],
    media: {
      kind: "technical",
      alt: "Diagrama da arquitetura do portfólio de Letícia de Paula",
      tone: "warm",
      nodes: [
        { title: "Interface", detail: "Next.js · React" },
        { title: "Conteúdo", detail: "Módulos tipados" },
        { title: "Cena 3D", detail: "Three.js · sob demanda" }
      ]
    },
    screenshots: [
      {
        src: "/projects/portfolio-competencias.webp",
        alt: "Captura real do mapa de competências do portfólio de Letícia de Paula, com relações entre tecnologias e projetos",
        caption: "Mapa interativo de competências e projetos do portfólio de Letícia de Paula.",
        width: 1120,
        height: 744
      }
    ],
    evidence: {
      level: "publico",
      sourceLabel: "Código-fonte no GitHub",
      href: "https://github.com/leticiapaulap/LeticiaDePaula"
    }
  }
];

export const projectCategories = [
  "Todos",
  "Desenvolvimento Web",
  "Back-end",
  "Dados",
  "Automação",
  "Open Source",
  "Portfólio"
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
