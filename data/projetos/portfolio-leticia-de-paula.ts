import type { Project } from "@/data/tipos";

export const portfolioLeticiaDePaula: Project = {
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
};
