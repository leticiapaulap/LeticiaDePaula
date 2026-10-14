export const professional = {
  name: "Leticia de Paula",
  monogram: "LP",
  title: "Desenvolvimento web, automacao e dados com foco em rotinas reais.",
  positioning:
    "Profissional de tecnologia com experiencia pratica em desenvolvimento, suporte tecnico, automacao de processos e organizacao de informacoes para tomada de decisao.",
  summary:
    "Leticia de Paula atua na intersecao entre desenvolvimento de software, dados e tecnologia da informacao. Seu trabalho combina construcao de interfaces, apoio a rotinas tecnicas, analise de informacoes e automacao para transformar necessidades operacionais em solucoes mais claras, rastreaveis e eficientes.",
  location: "Brasilia, DF",
  email: "leticiapaulaads@gmail.com",
  github: "https://github.com/leticiapaulap",
  linkedin: "https://www.linkedin.com/in/let%C3%ADcia-de-paulap/",
  avatar: "https://avatars.githubusercontent.com/u/121705864?v=4"
} as const;

export const navItems = [
  { label: "Inicio", href: "/#inicio", id: "inicio" },
  { label: "Perfil", href: "/#perfil", id: "perfil" },
  { label: "Experiencia", href: "/#experiencia", id: "experiencia" },
  { label: "Projetos", href: "/#projetos", id: "projetos" },
  { label: "Competencias", href: "/#competencias", id: "competencias" },
  { label: "Contato", href: "/#contato", id: "contato" }
] as const;

export const education = {
  course: "Analise e Desenvolvimento de Sistemas",
  note:
    "Formacao informada pela proprietaria do portfolio. Instituicao, periodo e situacao devem ser detalhados quando o curriculo atualizado estiver disponivel."
} as const;

export const experiences = [
  {
    organization: "SENAPPEN",
    context: "Tecnologia, automacao e dados",
    summary:
      "Atuacao relacionada a tecnologia da informacao, desenvolvimento, automacao de processos, dados e apoio a rotinas administrativas e tecnicas.",
    points: [
      "Apoio a demandas que conectam rotinas operacionais, informacao e tecnologia.",
      "Organizacao de dados e fluxos para tornar acompanhamentos mais claros.",
      "Identificacao de atividades repetitivas com potencial de automatizacao."
    ]
  },
  {
    organization: "TCB Brasilia",
    context: "Geolocalizacao e operacao",
    summary:
      "Experiencia relacionada a geolocalizacao, acompanhamento de informacoes operacionais e uso de tecnologia em contexto de mobilidade.",
    points: [
      "Contato com dados de localizacao e rotinas de acompanhamento.",
      "Leitura tecnica de informacoes para apoio a processos internos.",
      "Atencao a consistencia, registro e comunicacao de dados."
    ]
  },
  {
    organization: "Age Fibra",
    context: "Suporte B2B e atendimento tecnico",
    summary:
      "Experiencia em suporte B2B, atendimento tecnico e resolucao de demandas ligadas a tecnologia e conectividade.",
    points: [
      "Atendimento de demandas tecnicas com comunicacao objetiva.",
      "Triagem, registro e acompanhamento de ocorrencias.",
      "Interacao com rotinas de suporte em ambiente corporativo."
    ]
  }
] as const;

export const projects = [
  {
    title: "Festa Fantasia - Concurso de Melhor Fantasia",
    status: "Projeto full stack publicado",
    description:
      "Sistema para uma festa real com cadastro de fantasias, listagem publica, votacao anonima por navegador, painel administrativo, QR Codes, encerramento de votacao e resultado publico com ranking.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js serverless",
      "PostgreSQL",
      "JWT",
      "BCrypt",
      "Spring Boot",
      "Flyway"
    ],
    highlights: [
      "Frontend responsivo com rotas publicas e painel administrativo.",
      "API serverless na Vercel com PostgreSQL persistente.",
      "Fluxo de voto anonimo com cookie HttpOnly e regra de unicidade no banco.",
      "Separacao entre votos de teste e oficiais, com resultado publico ao final."
    ],
    repository: "https://github.com/leticiapaulap/Festa_Fantasia",
    live: "https://festa-fantasia.vercel.app"
  },
  {
    title: "LeticiaDePaula - Portfolio Profissional",
    status: "Portfolio em Next.js",
    description:
      "Portfolio profissional criado com App Router, TypeScript estrito, Tailwind CSS, tema claro e escuro, componentes acessiveis e exportacao estatica.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI"],
    highlights: [
      "Conteudo centralizado em dados tipados para facilitar manutencao.",
      "Design responsivo com narrativa editorial e case tecnico.",
      "Estrutura preparada para deploy em ambiente de producao."
    ],
    repository: "https://github.com/leticiapaulap/LeticiaDePaula",
    live: null
  },
  {
    title: "DIO Lab Open Source",
    status: "Pratica de contribuicao",
    description:
      "Repositorio do lab 'Contribuindo em um Projeto Open Source no GitHub' da Digital Innovation One.",
    stack: ["Git", "GitHub", "Open Source"],
    highlights: [
      "Pratica de fluxo de contribuicao em repositorio publico.",
      "Familiaridade com colaboracao, versionamento e organizacao de perfil tecnico."
    ],
    repository: "https://github.com/leticiapaulap/dio-lab-open-source",
    live: "https://digitalinnovationone.github.io/dio-lab-open-source/"
  }
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend e dados",
    items: ["Node.js", "APIs serverless", "PostgreSQL", "SQL", "JWT", "BCrypt"]
  },
  {
    title: "Automacao e BI",
    items: [
      "Automacao de processos",
      "Organizacao de dados",
      "Analise de informacoes",
      "Indicadores operacionais"
    ]
  },
  {
    title: "TI e suporte",
    items: [
      "Suporte B2B",
      "Triagem tecnica",
      "Registro de ocorrencias",
      "Comunicacao com usuarios"
    ]
  },
  {
    title: "Qualidade e entrega",
    items: [
      "Versionamento com Git",
      "Documentacao tecnica",
      "Build e deploy",
      "Acessibilidade"
    ]
  }
] as const;

export const workflow = [
  {
    title: "Entender a rotina",
    description:
      "Mapear a necessidade antes de escolher tecnologia, separando problema, dados, usuarios e restricoes."
  },
  {
    title: "Organizar a informacao",
    description:
      "Estruturar dados, telas e fluxos para que a solucao fique simples de operar e manter."
  },
  {
    title: "Construir com clareza",
    description:
      "Entregar interfaces, automacoes e registros com foco em usabilidade, consistencia e evolucao."
  }
] as const;
