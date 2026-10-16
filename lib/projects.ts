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
      tone: "teal"
    },
    screenshots: [
      {
        src: "/projects/festa-fantasia-home.webp",
        alt: "Tela pública do concurso Festa Fantasia, com o tema Halloween, cadastro de fantasias e área de votação",
        caption: "Aplicação publicada como Halloween. Captura real da página pública em 16/10/2026."
      }
    ],
    evidence: {
      level: "publico",
      sourceLabel: "README público do repositório",
      href: "https://github.com/leticiapaulap/Festa_Fantasia"
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
      "Portfólio editorial com escultura 3D, navegação acessível e uma apresentação integrada de projetos e trajetória.",
    description:
      "Uma experiência autoral que une linguagem editorial, uma escultura procedural e caminhos diretos para conhecer meu trabalho.",
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
      "Portal imersivo com fita metálica procedural em 3D e fallback vetorial em SVG.",
      "A escultura 3D é carregada à parte; texto e links permanecem em HTML."
    ],
    features: [
      "Portal imersivo e primeira área de exploração.",
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
      tone: "warm"
    },
    screenshots: [
      {
        src: "/projects/nexo-portal.webp",
        alt: "Captura real do portfólio de Letícia de Paula com apresentação pessoal e escultura metálica",
        caption: "Abertura do portfólio de Letícia de Paula."
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
