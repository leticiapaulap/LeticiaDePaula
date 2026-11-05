import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
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
  },
  {
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
    id: "agenda-executiva",
    slug: "agenda-executiva",
    title: "Agenda Executiva — Gestão de Compromissos",
    shortTitle: "Agenda Executiva",
    category: "Desenvolvimento Web",
    featured: false,
    publicationStatus: "Publicado",
    status: "Aplicação web com acesso autorizado; versão desktop independente",
    summary:
      "Aplicação web desenvolvida para apoiar a organização e o acompanhamento de compromissos executivos, centralizando informações da agenda e facilitando a rotina administrativa.",
    description:
      "A versão web da Agenda Executiva reúne agenda, compromissos e tarefas em uma interface autenticada. O sistema publicado exige uma conta autorizada pelo gestor. O repositório também mantém uma aplicação desktop independente, sem sincronização de dados com a versão web.",
    problem:
      "A rotina administrativa de um gestor exige acompanhar compromissos e atividades sem perder de vista horários, prioridades e alterações na agenda.",
    solution:
      "A aplicação web usa Flask e uma interface em HTML, CSS e JavaScript para concentrar o calendário, a gestão de compromissos e as tarefas em um só lugar. A persistência é feita em PostgreSQL; uma versão desktop separada usa SQLite local e não compartilha dados com o sistema web.",
    technologies: [
      "Python",
      "Flask",
      "HTML",
      "CSS",
      "JavaScript",
      "SQLAlchemy",
      "PostgreSQL",
      "Flask-Login",
      "Flask-WTF",
      "Flask-Migrate · Alembic",
      "Gunicorn"
    ],
    highlights: [
      "Painel e calendário para acompanhar compromissos executivos.",
      "Gestão de compromissos e tarefas com pesquisa, filtros e prioridades.",
      "Acesso autenticado; as funções internas dependem de uma conta autorizada.",
      "Aplicação web Flask com persistência em PostgreSQL.",
      "Versão desktop independente, com dados locais em SQLite."
    ],
    features: [
      "Painel de acompanhamento da agenda e dos compromissos.",
      "Calendário para visualizar compromissos por data.",
      "Cadastro, edição, reagendamento e consulta de compromissos.",
      "Pesquisa e filtros para localizar atividades.",
      "Tarefas com prioridades e acompanhamento de estado.",
      "Acesso às funcionalidades internas protegido por autenticação."
    ],
    architecture: [
      "Web: aplicação Flask com interface em HTML, CSS e JavaScript, autenticação Flask-Login e formulários Flask-WTF.",
      "Persistência web: SQLAlchemy com PostgreSQL; migrações gerenciadas por Flask-Migrate e Alembic.",
      "Servidor de aplicação: Gunicorn, conforme a documentação de implantação do projeto.",
      "Desktop: aplicação independente em Python e CustomTkinter, com SQLite local; não sincroniza com a versão web."
    ],
    learnings: [
      "Uma aplicação administrativa pode reunir calendário e tarefas sem misturar suas finalidades.",
      "Separar as versões web e desktop evita pressupor sincronização entre bancos distintos.",
      "A autenticação define o limite entre a apresentação pública do sistema e suas funções internas."
    ],
    links: [
      {
        label: "Acessar sistema",
        href: "https://agenda-executiva.onrender.com/login",
        type: "demo"
      },
      {
        label: "GitHub",
        href: "https://github.com/leticiapaulap/Agenda_executiva",
        type: "github"
      }
    ],
    sensitiveNote:
      "A aplicação publicada exige uma conta autorizada pelo gestor; não há acesso público às funcionalidades internas. A captura da versão web mostra somente a tela pública de login, sem credenciais ou dados da agenda. As imagens adicionais são da versão desktop e usam dados fictícios.",
    media: {
      kind: "technical",
      alt: "Arquitetura web da Agenda Executiva com interface Flask, banco PostgreSQL e acesso autenticado",
      tone: "teal",
      nodes: [
        { title: "Interface", detail: "Flask · HTML · CSS · JavaScript" },
        { title: "Persistência", detail: "PostgreSQL · SQLAlchemy" },
        { title: "Acesso", detail: "Flask-Login · autenticado" }
      ]
    },
    cover: {
      src: "/projects/agenda-executiva-cover.webp",
      alt: "Tela pública de login da versão web da Agenda Executiva; campos de usuário e senha vazios",
      caption: "Tela pública de login da aplicação web. Nenhuma sessão foi iniciada.",
      width: 1600,
      height: 800
    },
    screenshots: [
      {
        src: "/projects/agenda-executiva-painel.webp",
        alt: "Painel inicial da versão desktop da Agenda Executiva com resumo do dia e próximos compromissos fictícios",
        caption: "Painel da versão desktop. Captura de validação com dados fictícios; não representa uma tela autenticada da versão web.",
        width: 1240,
        height: 820
      },
      {
        src: "/projects/agenda-executiva-calendario.webp",
        alt: "Calendário mensal da versão desktop da Agenda Executiva com compromissos fictícios sinalizados",
        caption: "Calendário da versão desktop. Captura de validação com dados fictícios.",
        width: 1240,
        height: 820
      },
      {
        src: "/projects/agenda-executiva-acoes.webp",
        alt: "Lista de compromissos fictícios com filtros e menu de ações da versão desktop da Agenda Executiva",
        caption: "Filtros e ações na versão desktop. Captura de validação com dados fictícios.",
        width: 1240,
        height: 820
      }
    ],
    evidence: {
      level: "publico",
      sourceLabel: "Repositório público e capturas de validação",
      href: "https://github.com/leticiapaulap/Agenda_executiva"
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
      "Portfólio profissional com abertura pessoal, navegação lateral, projetos e estudos de caso para apresentar trajetória, competências e trabalhos.",
    description:
      "Aplicação web autoral de apresentação profissional, com identidade visual editorial, navegação por seções, estudos de caso e imagens das interfaces dos projetos.",
    problem:
      "Currículos estáticos não permitem consultar estudos de caso, fontes, competências e conteúdos em evolução.",
    solution:
      "A implementação combina rotas estáticas em Next.js, conteúdo tipado e uma composição editorial que conecta apresentação pessoal, trajetória e estudos de caso sem depender de WebGL.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Lucide React"
    ],
    highlights: [
      "Portal e seções profissionais separados das fontes de conteúdo tipadas.",
      "Páginas individuais estáticas para estudos de caso documentados.",
      "Navegação direta com histórico nativo e menu lateral com acesso às páginas profissionais.",
      "Galeria editorial na seção Projetos, com capturas reais, composições tipográficas e estudos de caso.",
      "Composições e filtros acessíveis, com texto e links em HTML."
    ],
    features: [
      "Abertura pessoal e navegação entre páginas com URLs compartilháveis.",
      "Páginas profissionais, navegação direta e menu responsivo.",
      "Temas claro e azul-noturno com preferência persistente.",
      "Filtros funcionais de projetos e certificações.",
      "Currículo digital imprimível e download de PDF público."
    ],
    architecture: [
      "app: rotas principais, currículo digital, sitemap, robots e páginas dinâmicas de projetos.",
      "components/portal: abertura pessoal; estudos de cena procedural da versão anterior preservados no código, sem carregamento na interface atual.",
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
        { title: "Navegação", detail: "Páginas · URLs próprias" }
      ]
    },
    screenshots: [
      {
        src: "/projects/portfolio-projects.webp",
        alt: "Página atual de projetos do portfólio de Letícia de Paula, com navegação lateral e o projeto SENAPPEN em destaque",
        caption: "Seção de projetos da versão atual do portfólio de Letícia de Paula.",
        width: 1440,
        height: 1000
      },
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
  "Aplicações Desktop",
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
