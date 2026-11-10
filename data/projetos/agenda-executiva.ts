import type { Project } from "@/data/tipos";

export const agendaExecutiva: Project = {
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
};
