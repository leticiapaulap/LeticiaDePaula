# Mapa do projeto LeticiaDePaula

Este é o guia da estrutura atual. Para localizar um elemento do portfólio no IntelliJ, comece pela tabela **ONDE ALTERAR CADA COISA?**. As pastas de componentes representam as áreas do site; `data/` guarda conteúdo e `lib/` guarda lógica reutilizável.

A reorganização mantém as rotas, os slugs, os nomes dos exports TypeScript, as classes CSS e os caminhos públicos dos assets. Os documentos anteriores em `docs/` são registros históricos: seus caminhos antigos descrevem a versão daquela etapa. Para manutenção atual, use este mapa.

Validação concluída em **10/11/2026**: TypeScript, ESLint, build de produção e os 266 testes existentes passaram. As 94 capturas comparadas com a referência anterior à reorganização foram idênticas. Consulte o [relatório da reorganização](validacao-reorganizacao.md) para o antes/depois, principais movimentações, verificações e evidências.

## Antes e depois

```text
ANTES                                      DEPOIS
app/                                       app/ — mesmas rotas e convenções
  rotas + 11 folhas CSS                    styles/ — folhas por área, mesma precedência
components/                                components/
  dezenas de componentes no mesmo nível      pagina-inicial/, navegacao/, rodape/, sobre/
  portal/ — hero atual + cenas anteriores    projetos/, experiencia/, competencias/, formacao/
                                             contato/, curriculo/, compartilhados/, legado/
lib/                                       data/ — conteúdo tipado separado por funcionalidade
  dados + lógica + dados de cenas antigas   lib/ — navegação, competências, SEO e auxiliares legados
  projects.ts com seis cadastros            data/projetos/ — catálogo + um arquivo por projeto
tests/                                     tests/ — agrupados por área do portfólio
  arquivos no mesmo nível
public/                                    public/ — mesmos arquivos e URLs
docs/                                      docs/ — histórico preservado + este mapa
scripts/ e configurações na raiz            scripts/ e configurações — mesmos comandos
```

| Principal arquivo anterior | Localização atual |
| --- | --- |
| `components/portal/portal-hero.tsx` | `components/pagina-inicial/apresentacao-inicial.tsx` |
| `components/portal/hero-portrait.tsx` | `components/pagina-inicial/fotografia/fotografia-principal.tsx` |
| `components/portal/hero-miniature.tsx` | `components/pagina-inicial/mini-leticia/mini-leticia-animada.tsx` |
| `components/header.tsx` | `components/navegacao/menu-lateral.tsx` |
| `components/footer.tsx` | `components/rodape/rodape.tsx` |
| `components/project-explorer.tsx` | `components/projetos/catalogo-projetos.tsx` |
| `components/certification-explorer.tsx` | `components/formacao/catalogo-certificados.tsx` |
| `lib/projects.ts` | `data/projetos/catalogo.ts` e os seis cadastros de `data/projetos/` |
| `lib/profile.ts` | `data/perfil/perfil-profissional.ts` |
| `lib/portrait.ts` | `data/pagina-inicial/fotografias.ts` |
| `lib/data.ts` e `lib/types.ts` | `data/conteudo.ts` e `data/tipos.ts` |
| `app/hero-portrait.css` | `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css` |
| `app/navigation-layout.css` | `styles/navegacao/menu-lateral-e-layout.css` |
| `app/editorial.css` | `styles/compartilhados/tema-e-tipografia.css` |
| `tests/hero-miniature.spec.ts` | `tests/pagina-inicial/mini-leticia.spec.ts` |
| Cenas anteriores em `components/portal/` | `components/legado/cenas-3d/` e `components/legado/galeria-projetos/` |

## Árvore de pastas

Árvore dos arquivos de manutenção. Dependências, builds, resultados de testes e configurações locais da IDE aparecem separadamente ao final, pois são gerados ou específicos da máquina.

```text
LeticiaDePaula/
├── app/                                      # Convenções e rotas do Next.js
│   ├── layout.tsx                            # Fontes, providers, menu, rodapé e imports CSS
│   ├── page.tsx                              # /
│   ├── not-found.tsx                         # Página 404
│   ├── icon.svg                              # Ícone do site
│   ├── robots.ts                             # robots.txt
│   ├── sitemap.ts                            # sitemap.xml
│   ├── sobre/page.tsx                        # /sobre/
│   ├── projetos/
│   │   ├── page.tsx                          # /projetos/
│   │   └── [slug]/page.tsx                   # Detalhes dos seis projetos
│   ├── experiencia/page.tsx                  # /experiencia/
│   ├── competencias/page.tsx                 # /competencias/
│   ├── formacao/page.tsx                     # /formacao/
│   ├── contato/page.tsx                      # /contato/
│   └── curriculo/page.tsx                    # /curriculo/
├── components/
│   ├── pagina-inicial/
│   │   ├── apresentacao-inicial.tsx          # Nome, textos, botões e composição da hero
│   │   ├── fotografia/
│   │   │   └── fotografia-principal.tsx      # Foto, moldura, brilho e encaixe da miniatura
│   │   └── mini-leticia/
│   │       └── mini-leticia-animada.tsx       # Entrada lateral, aceno e movimento reduzido
│   ├── navegacao/menu-lateral.tsx            # Sidebar e menu mobile
│   ├── rodape/rodape.tsx                     # Rodapé compartilhado
│   ├── sobre/
│   │   ├── apresentacao-profissional.tsx     # Texto de apresentação e princípios
│   │   └── retrato-profissional.tsx          # Retrato opcional da página Sobre
│   ├── projetos/
│   │   ├── secao-projetos.tsx                # Seção que recebe o catálogo
│   │   ├── catalogo-projetos.tsx             # Cards, destaque, filtros e seleção por teclado
│   │   ├── visual-projeto.tsx                # Capa, captura ou diagrama do projeto
│   │   └── voltar-aos-projetos.tsx           # Retorno ao catálogo com contexto
│   ├── experiencia/experiencia-profissional.tsx
│   ├── competencias/
│   │   ├── secao-competencias.tsx
│   │   └── mapa-conexoes.tsx                 # Relações entre competências e projetos
│   ├── formacao/
│   │   ├── formacao-academica.tsx
│   │   ├── secao-certificacoes.tsx
│   │   └── catalogo-certificados.tsx         # Pesquisa, filtros e visualização de PDFs
│   ├── contato/secao-contato.tsx
│   ├── curriculo/acoes-impressao.tsx
│   ├── compartilhados/
│   │   ├── estrutura/
│   │   │   ├── pagina-editorial.tsx          # Estrutura comum das páginas internas
│   │   │   ├── secao.tsx                     # Estrutura de seção reutilizável
│   │   │   └── bloco-conteudo.tsx            # Wrapper de conteúdo
│   │   ├── estado/provedor-navegacao.tsx     # Estado de navegação e seleções
│   │   ├── transicoes/transicao-pagina.tsx   # React ViewTransition entre páginas
│   │   ├── tema/
│   │   │   ├── provedor-tema.tsx
│   │   │   └── alternar-tema.tsx
│   │   └── seo/dados-estruturados.tsx        # JSON-LD
│   └── legado/                              # Recursos anteriores preservados
│       ├── pagina-inicial/
│       │   ├── visao-geral.tsx
│       │   └── salas-exploracao.tsx
│       ├── navegacao/
│       │   ├── guia-percurso.tsx
│       │   └── indicador-modo.tsx
│       ├── galeria-projetos/
│       │   ├── galeria-abertura.tsx
│       │   └── cena-galeria.tsx
│       ├── cenas-3d/
│       │   ├── acento-cenografico.tsx
│       │   ├── carregador-cena.tsx
│       │   ├── cena-escultura.tsx
│       │   ├── canvas-personagem.tsx
│       │   └── geometria-fitas.ts
│       └── curriculo/painel-download.tsx
├── data/                                    # Conteúdo tipado do portfólio
│   ├── conteudo.ts                           # Reexports; não duplica os cadastros
│   ├── tipos.ts                              # Contratos Project, Certification, Experience etc.
│   ├── pagina-inicial/fotografias.ts         # Foto da hero e retrato opcional de Sobre
│   ├── perfil/perfil-profissional.ts         # Nome, apresentação, princípios e contato
│   ├── navegacao/itens-menu.ts               # Rótulos do menu derivados das rotas
│   ├── contato/redes-sociais.ts
│   ├── experiencia/trajetoria.ts
│   ├── competencias/grupos.ts
│   ├── formacao/
│   │   ├── formacao-academica.ts
│   │   └── certificacoes.ts
│   ├── projetos/
│   │   ├── catalogo.ts                       # Lista, categorias e busca por slug
│   │   ├── festa-fantasia.ts
│   │   ├── finanzy.ts
│   │   ├── senappen-recebimentos.ts
│   │   ├── dio-lab-open-source.ts
│   │   ├── agenda-executiva.ts
│   │   └── portfolio-leticia-de-paula.ts
│   └── legado/
│       ├── galeria-projetos.ts
│       └── salas-exploracao.ts
├── lib/                                     # Lógica, sem cadastro duplicado de conteúdo
│   ├── navegacao/
│   │   ├── capitulos.ts                      # Rotas, fases e direção das transições
│   │   └── estado-navegacao.ts               # Máquina de estados e seleções
│   ├── competencias/relacoes-projetos.ts     # Consulta das relações dos dados
│   ├── seo/
│   │   ├── metadados.ts                      # Metadados das páginas
│   │   └── endereco-site.ts                  # Origem pública e URLs absolutas
│   └── legado/
│       ├── animacoes-personagem-3d.ts
│       └── geometria-fitas.ts
├── styles/                                  # Folhas globais, na ordem do layout
│   ├── pagina-inicial/
│   │   ├── apresentacao-fotografia-e-mini-leticia.css
│   │   └── galeria-e-base-da-abertura.css
│   ├── navegacao/
│   │   ├── menu-lateral-e-layout.css
│   │   └── transicoes-de-pagina.css
│   └── compartilhados/
│       ├── base.css
│       ├── interacoes-e-acessibilidade.css
│       ├── composicoes-de-secoes.css
│       ├── paginas-e-transicoes.css
│       ├── secoes-editoriais.css
│       ├── catalogos-de-projetos-e-formacao.css
│       └── tema-e-tipografia.css
├── public/                                  # Arquivos servidos por URLs públicas estáveis
│   ├── images/
│   │   ├── leticia-de-paula.jpg              # Original da fotografia
│   │   ├── leticia-de-paula-720.webp
│   │   ├── leticia-de-paula-960.webp
│   │   ├── leticia-de-paula-1200.webp
│   │   └── leticia-mini-avatar.webp          # Ilustração transparente da mini Letícia
│   ├── projects/
│   │   ├── senappen-recebimentos-home.webp
│   │   ├── agenda-executiva-cover.webp
│   │   ├── agenda-executiva-painel.webp
│   │   ├── agenda-executiva-calendario.webp
│   │   ├── agenda-executiva-acoes.webp
│   │   ├── finanzy-login.webp
│   │   ├── festa-fantasia-home.webp
│   │   ├── festa-fantasia-home.png
│   │   ├── portfolio-projects.webp
│   │   ├── portfolio-competencias.webp
│   │   ├── portfolio-competencias.png
│   │   ├── nexo-portal.webp
│   │   └── nexo-portal.png
│   ├── certificates/
│   │   ├── bradesco-introducao-analise-dados-power-bi.pdf
│   │   ├── dio-analise-de-dados-com-sql.pdf
│   │   ├── dio-analise-de-dados-e-bi.pdf
│   │   ├── dio-projeto-open-source-github.pdf
│   │   ├── enap-fundamentos-lgpd.pdf
│   │   ├── enap-modelos-de-agrupamento.pdf
│   │   ├── enap-sei-usar-4.pdf
│   │   ├── klabin-excel-power-bi.pdf
│   │   └── versatil-desenvolvedor-profissional.pdf
│   ├── curriculo-leticia-de-paula.pdf
│   ├── og-leticia.svg
│   └── og-leticia.png
├── scripts/
│   ├── serve-static.mjs                      # Preview local do build exportado
│   ├── normalize-static-segments.mjs         # Pós-build de segmentos estáticos do Next
│   ├── audit-performance.mjs                # Auditoria Lighthouse
│   ├── optimize-assets.mjs                   # Geração de assets a partir das fontes
│   ├── prepare-hero-portrait.mjs             # Geração das variantes WebP da foto
│   └── prepare-miniature.mjs                 # Preparação da ilustração transparente
├── tests/
│   ├── pagina-inicial/
│   │   ├── apresentacao.spec.ts
│   │   ├── composicao.spec.ts
│   │   ├── mini-leticia.spec.ts
│   │   └── animacao-e-equilibrio.spec.ts
│   ├── navegacao/
│   │   ├── navegacao-entre-paginas.spec.ts
│   │   ├── navegacao-responsiva.spec.ts
│   │   ├── menu-lateral.spec.ts
│   │   └── rolagem-historico-e-acessibilidade.spec.ts
│   ├── projetos/catalogo-projetos.spec.ts
│   ├── portfolio/
│   │   ├── layout-acessibilidade-e-conteudo.spec.ts
│   │   └── biblioteca-e-navegacao-contextual.spec.ts
│   └── auxiliares/navegacao.ts
├── docs/
│   ├── MAPA_DO_PROJETO.md                    # Este guia
│   ├── conteudo-interno.md                   # Fontes e pendências de conteúdo
│   ├── mini-leticia-senappen.md              # Histórico da miniatura e dos refinamentos
│   ├── projetos-adicionais.md
│   ├── navegacao-lateral.md
│   ├── navegacao-capitulos.md
│   ├── hero-foto-interativa.md
│   ├── hero-galeria-projetos.md
│   ├── personagem-3d-hero.md
│   ├── auditoria-producao.md
│   ├── etapa-3.md
│   ├── pos-revisao.md
│   ├── redesign-editorial.md
│   ├── refinamento-pessoal.md
│   ├── validacao-editorial.json
│   ├── validacao-hero-foto.json
│   ├── validacao-navegacao-lateral.json
│   ├── validacao-producao.json
│   ├── validacao-reorganizacao.md
│   └── validacao-refinamento.json
├── README.md                                # Execução, comandos e entrada para este mapa
├── AGENTS.md                                 # Instruções do repositório
├── package.json / package-lock.json
├── next.config.ts / next-env.d.ts
├── tsconfig.json / eslint.config.mjs
├── postcss.config.mjs / playwright.config.ts
├── vercel.json
├── .env.example
└── .gitignore
```

## Finalidade de cada pasta

| Pasta | Quando abrir |
| --- | --- |
| `app/` | Alterar a composição de uma rota, metadados do Next ou o layout global. Os arquivos `page.tsx` continuam nos mesmos caminhos. |
| `components/pagina-inicial/` | Trabalhar na hero atual, fotografia ou mini Letícia. |
| `components/sobre/`, `projetos/`, `experiencia/`, `competencias/`, `formacao/`, `contato/`, `curriculo/` | Encontrar a interface de uma área específica. |
| `components/navegacao/` e `components/rodape/` | Encontrar o menu compartilhado e o rodapé. |
| `components/compartilhados/` | Encontrar providers, estrutura, tema, SEO e transições usados por mais de uma área. |
| `data/` | Editar textos, cadastros e informações profissionais, sem alterar componentes. |
| `lib/` | Encontrar funções de navegação, relações entre competências/projetos e geração de metadados. |
| `styles/` | Localizar os estilos das áreas e a base compartilhada. A precedência é definida pelos imports do layout. |
| `public/` | Localizar as imagens e documentos publicados. O caminho após `public/` é a URL do arquivo. |
| `scripts/` | Encontrar ferramentas de build, preview, auditoria e preparação de imagens. |
| `tests/` | Executar ou manter verificações automatizadas por funcionalidade. |
| `docs/` | Consultar este mapa, fontes de conteúdo e registros das etapas anteriores. |
| Pastas `legado/` | Consultar implementações anteriores preservadas, sem confundir com os recursos carregados pelas rotas atuais. |

`.git/` guarda o histórico. `node_modules/` contém dependências; `.next/` e `out/` são saídas do Next/build. `.qa/`, `test-results/` e `playwright-report/` recebem evidências e relatórios locais. `.idea/` contém configurações da IDE; `.openai/` contém metadados de ferramentas já existentes. Essas pastas não fazem parte da reorganização manual do código. `next-env.d.ts` e `tsconfig.tsbuildinfo` podem ser atualizados automaticamente pelas ferramentas.

## ONDE ALTERAR CADA COISA?

| O que procurar | Caminho real e ponto de entrada |
| --- | --- |
| Texto, nome e botões da hero | `components/pagina-inicial/apresentacao-inicial.tsx`: `PortalHero`, título `#portal-title`, textos e links de navegação. |
| Dados da fotografia principal | `data/pagina-inicial/fotografias.ts`: `heroPortrait` com `src`, `alt`, largura e altura. |
| Arquivo original da fotografia | `public/images/leticia-de-paula.jpg`. As três variantes WebP ficam na mesma pasta. |
| Imagem servida e variantes responsivas | `components/pagina-inicial/fotografia/fotografia-principal.tsx`: `<picture>`, `srcSet` e `sizes`. |
| Moldura da fotografia | `components/pagina-inicial/fotografia/fotografia-principal.tsx` e `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css`: `.hero-portrait__frame`, `.hero-portrait__corner`, `.hero-portrait__rim`. |
| Brilho e iluminação da moldura | A mesma folha CSS: `.hero-portrait__stage::before`, `.hero-portrait__frame::after`, `.hero-portrait__light`, regras de hover e keyframes `hero-portrait-ambient` / `hero-portrait-light-pass`. |
| Recorte de apresentação da foto | A mesma folha CSS: `.hero-portrait__image` e `.hero-portrait__image img`. O recorte de apresentação é CSS; o arquivo original é separado. |
| Mini Letícia e sua integração | `components/pagina-inicial/mini-leticia/mini-leticia-animada.tsx`, incluído pela fotografia principal. |
| Arte da mini Letícia | `public/images/leticia-mini-avatar.webp`: imagem transparente 2D aprovada. |
| Entrada lateral e aceno da miniatura | `components/pagina-inicial/mini-leticia/mini-leticia-animada.tsx`: `presentation`, `activate`, `enter`, timeline GSAP e `wavingArm`. |
| Posição e tamanho da miniatura | `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css`: bloco `.hero-miniature`, `--miniature-height`, `top`, `right` e media queries logo após o bloco. |
| Movimento reduzido da miniatura | O componente da miniatura: `matchMedia`, `showRestingCharacter` e listener `changed`. |
| Entrada dos textos e fotografia | A folha CSS da hero: `hero-copy-arrive`, `hero-portrait-arrive`, `hero-node-arrive` e `prefers-reduced-motion`. |
| Layout e responsividade da hero | A folha CSS da hero: `.personal-opening .nexo-portal__content`, `grid-template-areas`, `@container portfolio-main` e media queries de 767/374 px. |
| Distância entre hero e rodapé | `styles/navegacao/menu-lateral-e-layout.css`: `.portfolio-content:has(> main .personal-opening)` e o `main` correspondente; respiros internos na folha CSS da hero. |
| Sidebar, menu mobile e foco | `components/navegacao/menu-lateral.tsx` e `styles/navegacao/menu-lateral-e-layout.css`. |
| Nomes dos itens do menu | `data/navegacao/itens-menu.ts`. Rotas e fases de navegação estão em `lib/navegacao/capitulos.ts`. |
| Rodapé | `components/rodape/rodape.tsx`. Estilos finais `.site-footer` e `.footer-inner` em `styles/compartilhados/tema-e-tipografia.css`. |
| Texto de apresentação profissional | `data/perfil/perfil-profissional.ts`; exibição em `components/sobre/apresentacao-profissional.tsx`. |
| Foto opcional de Sobre | `data/pagina-inicial/fotografias.ts`: `portrait` está `null`; componente em `components/sobre/retrato-profissional.tsx`. Essa opção é independente da foto da hero. |
| Alterar um projeto | Seu arquivo em `data/projetos/`; o registro central é `data/projetos/catalogo.ts`. |
| SENAPPEN | `data/projetos/senappen-recebimentos.ts`; capa em `public/projects/senappen-recebimentos-home.webp`. |
| Agenda Executiva | `data/projetos/agenda-executiva.ts`; capa e capturas `public/projects/agenda-executiva-*.webp`. |
| Links externos de um projeto | Campo `links` no arquivo daquele projeto em `data/projetos/`. |
| Cards, filtros e destaque dos projetos | `components/projetos/catalogo-projetos.tsx`; estilos em `styles/compartilhados/catalogos-de-projetos-e-formacao.css`. |
| Capa ou captura exibida no card | Campos `cover` / `screenshots` dos dados; escolha e renderização em `components/projetos/visual-projeto.tsx`. |
| Página de detalhes de projeto | `app/projetos/[slug]/page.tsx`, compartilhada pelos slugs do catálogo. |
| Experiência profissional | `data/experiencia/trajetoria.ts` e `components/experiencia/experiencia-profissional.tsx`. |
| Competências e relações com projetos | `data/competencias/grupos.ts`, `lib/competencias/relacoes-projetos.ts` e `components/competencias/`. |
| Formação e certificados | `data/formacao/`, `components/formacao/` e PDFs em `public/certificates/`. |
| E-mail e perfis profissionais | `data/perfil/perfil-profissional.ts` e `data/contato/redes-sociais.ts`; exibição em `components/contato/secao-contato.tsx` e no menu. |
| Currículo digital e PDF | `app/curriculo/page.tsx`, dados em `data/`, impressão em `components/curriculo/acoes-impressao.tsx`; documento independente em `public/curriculo-leticia-de-paula.pdf`. |
| Tema claro/escuro | `components/compartilhados/tema/`, controles do menu e tokens finais em `styles/compartilhados/tema-e-tipografia.css`. |
| Tipografia e fontes | `app/layout.tsx` configura Manrope/Instrument Serif; escalas e tokens em `styles/compartilhados/tema-e-tipografia.css`. |
| Transição entre páginas | `components/compartilhados/transicoes/transicao-pagina.tsx`, `lib/navegacao/capitulos.ts` e `styles/navegacao/transicoes-de-pagina.css`. |
| SEO e endereço público | `lib/seo/`, `components/compartilhados/seo/dados-estruturados.tsx`, metadados das rotas, `app/sitemap.ts` e `app/robots.ts`. |
| Compartilhamento social | `public/og-leticia.svg`, `public/og-leticia.png` e `lib/seo/metadados.ts`. |

## Componentes, dados e rotas

O fluxo normal é `app/.../page.tsx` → componente da funcionalidade → dados em `data/`. Funções de consulta e estado ficam em `lib/`. O alias `@/` continua apontando para a raiz do repositório, conforme `tsconfig.json`.

`data/conteudo.ts` reúne exports das fontes de conteúdo para os consumidores existentes. Ele não contém uma segunda cópia dos projetos, experiências ou certificações. Os nomes exportados, como `Project`, `projects`, `HeroPortrait` e `HeroMiniature`, foram mantidos para evitar mudanças de comportamento durante a movimentação.

As páginas continuam em `/`, `/sobre/`, `/projetos/`, `/projetos/[slug]/`, `/experiencia/`, `/competencias/`, `/formacao/`, `/contato/` e `/curriculo/`. Não renomeie pastas de rotas para organizar componentes: coloque os componentes na pasta funcional correspondente em `components/`.

## Projetos profissionais

Cada cadastro completo fica em seu próprio arquivo; o catálogo importa os seis objetos e mantém a ordem dos dados existente:

| Arquivo em `data/projetos/` | Slug público preservado |
| --- | --- |
| `festa-fantasia.ts` | `festa-fantasia` |
| `finanzy.ts` | `organizador-de-tarefas` |
| `senappen-recebimentos.ts` | `senappen-recebimentos` |
| `dio-lab-open-source.ts` | `dio-lab-open-source` |
| `agenda-executiva.ts` | `agenda-executiva` |
| `portfolio-leticia-de-paula.ts` | `portfolio-leticia-de-paula` |

O nome do arquivo `finanzy.ts` descreve o projeto atual, mas a URL continua `/projetos/organizador-de-tarefas/`. Não iguale os dois alterando o slug de um projeto existente.

`catalogo.ts` concentra `projects`, `projectCategories` e `getProjectBySlug`. SENAPPEN continua marcado com `featured: true`; o componente do catálogo apresenta os destaques primeiro e conserva a ordenação adicional da Agenda Executiva. A ordem central também alimenta a navegação anterior/próximo dos estudos de caso.

### Como adicionar um projeto

1. Crie `data/projetos/nome-do-projeto.ts`, seguindo um cadastro existente e o tipo `Project` de `data/tipos.ts`.
2. Defina `id` e `slug` únicos. Preencha os campos de descrição, contexto, problema, solução, tecnologias, funcionalidades, arquitetura, aprendizados e evidências.
3. Cadastre os links no campo `links`: `case` para `/projetos/seu-slug/`, `github` para repositório, `demo` para aplicação e `external` para outros destinos. Mantenha no próprio cadastro os links e as imagens daquele projeto.
4. Coloque novas capas/capturas autorizadas em uma subpasta descritiva de `public/projects/`, por exemplo `public/projects/nome-do-projeto/capa.webp`. Use a URL `/projects/nome-do-projeto/capa.webp` nos campos `cover` e `screenshots`, incluindo texto alternativo e dimensões corretas. Os arquivos antigos não precisam ser movidos.
5. Importe o objeto e inclua-o uma única vez no array `projects` de `data/projetos/catalogo.ts`. Mantenha o destaque da SENAPPEN ao adicionar os demais.
6. Caso haja relações comprovadas com competências, adicione o slug em `projectSlugs` dos itens pertinentes em `data/competencias/grupos.ts`.
7. Não crie manualmente outra página para o mesmo projeto: `app/projetos/[slug]/page.tsx` usa o catálogo para gerar os detalhes, e `app/sitemap.ts` inclui os slugs no sitemap.
8. Execute os comandos de validação e confira o catálogo, os detalhes, as imagens, os links e a navegação anterior/próximo.

## Estilos e precedência

Todas as onze folhas continuam globais e são importadas uma vez no início de `app/layout.tsx`, nesta ordem:

1. `styles/compartilhados/base.css` — Tailwind, reset, tokens/base e regras compartilhadas herdadas.
2. `styles/compartilhados/interacoes-e-acessibilidade.css` — interações, seleções, diálogo de certificados, foco, movimento reduzido e impressão.
3. `styles/compartilhados/composicoes-de-secoes.css` — composições de seções e componentes das etapas anteriores.
4. `styles/compartilhados/paginas-e-transicoes.css` — estrutura das páginas, transições e regras de capítulos.
5. `styles/pagina-inicial/galeria-e-base-da-abertura.css` — galeria anterior e declarações base ainda herdadas pela abertura atual.
6. `styles/compartilhados/secoes-editoriais.css` — apresentação profissional, experiência, competências e contato.
7. `styles/compartilhados/catalogos-de-projetos-e-formacao.css` — cards/filtros de projetos, formação e certificados.
8. `styles/navegacao/transicoes-de-pagina.css` — ViewTransition e regras de navegação existentes.
9. `styles/compartilhados/tema-e-tipografia.css` — paleta e tipografia finais, estrutura editorial, detalhes dos projetos, currículo e rodapé.
10. `styles/navegacao/menu-lateral-e-layout.css` — sidebar, menu mobile, layout global e container queries das páginas.
11. `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css` — composição final da hero, foto, moldura, brilho, miniatura e responsividade da abertura.

A ordem faz parte do resultado visual. Há seletores e variáveis sobrescritos por folhas posteriores; isso não representa automaticamente duplicação descartável. Não ordene esses imports alfabeticamente nem remova uma folha porque ela também contém seletores de uma versão antiga.

A folha final da hero permanece unida porque compartilha regras de grid, camadas, temas, responsividade e movimento reduzido entre texto, foto e miniatura. Os blocos usam nomes localizáveis: `.personal-opening` para a abertura; `.hero-portrait` para a fotografia; `.hero-miniature` para a personagem. Para ajustes de páginas internas, comece pelos arquivos editoriais indicados acima; regras base podem existir nas primeiras folhas.

## Imagens, documentos e animações

Os 30 arquivos públicos permaneceram nos mesmos caminhos, sem recorte, recompressão ou substituição. Manter `public/images/`, `public/projects/` e `public/certificates/` preserva URLs que podem estar salvas ou compartilhadas. Mover esses arquivos apenas para traduzir os diretórios quebraria esses endereços sem um mecanismo adicional de compatibilidade.

- Fotografia: o JPEG é a fonte original; os três WebP são variantes de entrega. O `<picture>` da fotografia principal escolhe a variante e o CSS determina a apresentação.
- Mini Letícia: a animação atual combina a ilustração WebP transparente com uma segunda camada da mesma imagem para o aceno. A timeline está no componente; não há arquivo de vídeo ou modelo 3D necessário à hero atual.
- Projetos: capas e capturas estão em `public/projects/`; os caminhos usados ficam nos cadastros de `data/projetos/`. A Agenda Executiva tem capa e três capturas adicionais; SENAPPEN tem sua captura de apresentação própria.
- Fontes de assets: PNG/SVG e variantes WebP existentes foram preservados. `nexo-portal.png` / `.webp` pertencem à apresentação anterior e continuam disponíveis, inclusive como entrada dos scripts de preparação; não foram excluídos por parecerem antigos.
- Documentos: o currículo e os nove certificados são arquivos independentes dos dados HTML. Alterar um texto em `data/` não regenera os PDFs.
- Fontes tipográficas: Manrope e Instrument Serif são configuradas por `next/font` em `app/layout.tsx`; o Next produz os arquivos de entrega no build.

### Código anterior preservado

Os doze arquivos em `components/legado/` guardam a visão geral anterior, salas de exploração, guia de percurso, indicador de modo, galeria/cena de projetos, cenas 3D, geometria e painel anterior de currículo. Eles não são importados pelas rotas atuais; suas dependências internas e importações dinâmicas foram mantidas. `data/legado/` contém os dados desses recursos e `lib/legado/` contém seus auxiliares.

`lib/legado/animacoes-personagem-3d.ts` preserva a referência planejada `/models/leticia-mini.glb` e a resolução de nomes de clipes. Esse GLB não está presente em `public/`; a referência é de uma estrutura anterior/futura, não de um asset que a miniatura atual carrega. Não remova código ou assets duvidosos sem examinar seus consumidores, scripts e documentos.

## Scripts e comandos

| Arquivo | Finalidade e execução |
| --- | --- |
| `scripts/serve-static.mjs` | Serve `out/` em `127.0.0.1:4173`; usado por `npm run preview`, `npm start` e Playwright. |
| `scripts/normalize-static-segments.mjs` | Ajusta segmentos de navegação da exportação estática; é chamado automaticamente ao final de `npm run build`. |
| `scripts/audit-performance.mjs` | Lighthouse mobile/desktop; `npm run audit:performance`, com preview disponível. |
| `scripts/optimize-assets.mjs` | Gera PNG/WebP a partir das fontes preservadas; `npm run assets`. Este comando regrava assets e só deve ser usado quando essa atualização for desejada. |
| `scripts/prepare-hero-portrait.mjs` | Gera variantes WebP a partir da fotografia original; `node scripts/prepare-hero-portrait.mjs`. |
| `scripts/prepare-miniature.mjs` | Prepara WebP de uma ilustração PNG transparente fornecida; `node scripts/prepare-miniature.mjs "caminho/ilustracao.png"`. |

Os scripts ficaram na raiz de `scripts/` e mantiveram seus nomes para conservar os comandos existentes. Não é necessário executar a preparação de imagens para compilar ou testar o portfólio.

Para validar mudanças de código no PowerShell:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd test
```

O build exporta as páginas para `out/`; os testes existentes usam o preview estático configurado em `playwright.config.ts`. Para testar uma área, use os novos caminhos, por exemplo:

```powershell
npm.cmd test -- tests/pagina-inicial
npm.cmd test -- tests/navegacao
npm.cmd test -- tests/projetos/catalogo-projetos.spec.ts
```

Os testes da página inicial cobrem composição, imagem, iluminação, miniatura e animações. Os de navegação cobrem sidebar, menu mobile, foco, histórico e rolagem. Os de projetos cobrem catálogo, seleção, links e detalhes; os de portfólio cobrem o conjunto das rotas, responsividade, acessibilidade e conteúdo. Os auxiliares de navegação ficam em `tests/auxiliares/navegacao.ts`.

## Convenção de nomenclatura

- Diretórios funcionais em português sem acentos: `pagina-inicial`, `mini-leticia`, `formacao`, `navegacao`.
- Arquivos e pastas em kebab-case, com nomes que descrevem sua finalidade: `fotografia-principal.tsx`, `catalogo-projetos.tsx`, `relacoes-projetos.ts`.
- Nomes obrigatórios do Next e das ferramentas preservados: `app`, `public`, `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `package.json`, `next.config.ts`, `tsconfig.json` e demais configurações da raiz.
- `MAPA_DO_PROJETO.md` usa o nome explicitamente solicitado para este guia. Os documentos anteriores mantêm seus nomes e locais para preservar links e registros históricos.
- Identificadores de código e classes existentes continuam iguais; nomes como `HeroMiniature` e `.hero-miniature` são pontos de busca dentro dos arquivos descritivos em português.
- Assets publicados conservam nomes e diretórios existentes para preservar URLs. Para novos assets, use nomes claros e agrupe por projeto/finalidade sem renomear os já publicados.
- Conteúdo novo vai em `data/`; interface em `components/`; funções reutilizáveis em `lib/`; estilos em `styles/`; verificações em `tests/`. Evite arquivos paralelos com sufixos `novo`, `final`, `ajuste` ou cadastros duplicados.

Ao acrescentar uma nova funcionalidade, atualize este mapa com os caminhos reais e confira seus imports normais, imports dinâmicos, testes, scripts e referências públicas.
