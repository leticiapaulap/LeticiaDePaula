# Letícia de Paula — Portfólio profissional

Portfólio em Next.js e TypeScript, com páginas estáticas para apresentação, projetos, experiência, competências, formação e contato. A página inicial apresenta a fotografia principal e a mini Letícia animada em 2D, com a navegação lateral e o tema claro/escuro existentes.

**Comece pelo [MAPA DO PROJETO](docs/MAPA_DO_PROJETO.md).** O guia contém a árvore atual, a finalidade das pastas e a seção **ONDE ALTERAR CADA COISA?** para localizar fotografia, moldura, personagem, animação, textos, menu e rodapé.

## Executar localmente

Use Node.js 24.x, conforme `package.json`. A versão principal está limitada para manter o ambiente local e o build da Vercel alinhados.

```bash
npm ci
npm run dev
```

Desenvolvimento: `http://localhost:3000`. No PowerShell, use `npm.cmd` e `npx.cmd` se a política do sistema bloquear os scripts `.ps1`.

```bash
npm run typecheck
npm run lint
npm run build
npm test
npm run test:report
npm run preview
```

O build gera `out/`. Use `npm run build` para incluir a normalização dos segmentos de navegação estáticos desta versão do Next.js no Windows. O preview fica em `http://127.0.0.1:4173`; `npm start` executa o mesmo servidor. Para outra porta, defina `PORT`.

Para instalar o navegador dos testes, execute `npx playwright install chromium`. Para utilizar um Chromium já instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` com o caminho absoluto do executável.

## Estrutura atual

```text
app/                         Rotas, layout e arquivos especiais do Next.js
  projetos/[slug]/           Páginas de detalhes geradas no build
components/
  pagina-inicial/            Apresentação, fotografia e mini Letícia
    fotografia/              Fotografia principal e sua moldura
    mini-leticia/             Entrada lateral e aceno da personagem
  sobre/                     Apresentação profissional
  navegacao/                 Menu lateral e menu mobile
  projetos/                  Catálogo, filtros, imagens e retorno aos projetos
  experiencia/               Trajetória profissional
  competencias/              Conhecimentos e conexões com projetos
  formacao/                  Formação acadêmica e certificados
  contato/                   E-mail e perfis profissionais
  curriculo/                 Controles de impressão
  rodape/                    Rodapé compartilhado
  compartilhados/            Estrutura, estado, tema, transições e SEO
  legado/                    Componentes anteriores preservados
data/                        Conteúdo tipado separado por funcionalidade
  projetos/                  Um cadastro por projeto e catálogo central
  perfil/                    Identidade e informações profissionais
  pagina-inicial/            Configuração das fotografias
  experiencia/               Dados da trajetória
  competencias/              Grupos de competências
  formacao/                  Formação e certificações
  contato/                   Redes sociais
  navegacao/                 Rótulos e destinos do menu
  legado/                    Dados das composições anteriores
styles/                      CSS agrupado por área, mantendo a cascata existente
  pagina-inicial/            Apresentação, fotografia, mini Letícia e responsividade
  navegacao/                 Menu e transições de página
  compartilhados/            Bases, tema, tipografia, seções e catálogos
lib/                         Lógica de navegação, relações de competências e SEO
  legado/                    Geometria e suporte 3D anteriores preservados
public/                      Imagens e PDFs com URLs estáveis
scripts/                     Preview, build, preparação de assets e Lighthouse
tests/                       Testes por funcionalidade e auxiliares de navegação
docs/                        Mapa atual, orientações editoriais e histórico técnico
```

Configurações permanecem na raiz. `node_modules/`, `.next/`, `out/`, `.qa/`, `test-results/` e `playwright-report/` são dependências ou arquivos gerados, não locais para editar funcionalidades.

Pastas e arquivos internos usam português sem acentos e kebab-case. Convenções do framework, extensões, nomes de configuração, identificadores TypeScript e URLs públicas existentes são preservados. O alias `@/` aponta para a raiz do repositório.

A hero atual está em `components/pagina-inicial/`. A mini Letícia usa GSAP e a ilustração transparente existente; a hero não monta Canvas nem WebGL. Componentes 3D e galerias anteriores continuam em `components/legado/`, com seus dados e utilitários preservados. Eles não são a implementação da página inicial atual.

## Atualizar conteúdo

Edite os arquivos em `data/` correspondentes à funcionalidade. `data/conteudo.ts` reúne exportações para os consumidores existentes; não é um segundo cadastro.

| Conteúdo | Local |
| --- | --- |
| Identidade e informações profissionais | `data/perfil/perfil-profissional.ts` |
| Fotografia principal e retrato opcional de Sobre | `data/pagina-inicial/fotografias.ts` |
| Experiência profissional | `data/experiencia/trajetoria.ts` |
| Competências | `data/competencias/grupos.ts` |
| Formação acadêmica | `data/formacao/formacao-academica.ts` |
| Cursos e certificados | `data/formacao/certificacoes.ts` |
| Perfis sociais | `data/contato/redes-sociais.ts` |
| Rótulos e destinos do menu | `data/navegacao/itens-menu.ts` |
| Tipos dos dados | `data/tipos.ts` |

### Projetos

Os seis projetos têm arquivos próprios em `data/projetos/`: `festa-fantasia.ts`, `finanzy.ts`, `senappen-recebimentos.ts`, `dio-lab-open-source.ts`, `agenda-executiva.ts` e `portfolio-leticia-de-paula.ts`. `catalogo.ts` reúne os cadastros na ordem existente; SENAPPEN mantém o destaque principal.

Para adicionar um projeto:

1. Crie um arquivo em `data/projetos/` com um objeto compatível com `Project`, definido em `data/tipos.ts`.
2. Use `id` e `slug` únicos e preencha descrições, tecnologias, imagens e links com informações verificadas.
3. Registre o objeto em `data/projetos/catalogo.ts`. O link do estudo de caso deve apontar para `/projetos/SEU-SLUG/`.
4. Coloque capturas autorizadas em `public/projects/` e informe `src`, texto alternativo e legenda no cadastro. As imagens existentes conservam seus caminhos.
5. Quando houver evidência, relacione o slug às competências em `data/competencias/grupos.ts`.
6. Execute typecheck, lint, build e testes. A rota dinâmica e o sitemap incluem os projetos do catálogo.

Não renomeie slugs existentes ao organizar seus arquivos. `finanzy.ts`, por exemplo, mantém a URL `/projetos/organizador-de-tarefas/`. Dados e links externos ficam no cadastro; a exibição fica em `components/projetos/`; detalhes continuam em `app/projetos/[slug]/page.tsx`.

### Fotografias e documentos

As URLs públicas são determinadas pelos arquivos em `public/`. A organização preserva `public/images/`, `public/projects/`, `public/certificates/`, o currículo PDF e as imagens sociais nos caminhos existentes. O mapa identifica os assets de cada área.

A fotografia principal usa o JPEG original e as três variantes WebP em `public/images/`. A mini Letícia usa `public/images/leticia-mini-avatar.webp`. O retrato opcional de Sobre é configurado separadamente em `data/pagina-inicial/fotografias.ts`.

Certificações usam `certificateUrl` somente quando existe um PDF real em `public/certificates/`. Estudos em andamento não recebem botão de certificado. Fontes e pendências editoriais continuam em [docs/conteudo-interno.md](docs/conteudo-interno.md). O currículo `public/curriculo-leticia-de-paula.pdf` é independente: não é gerado automaticamente pela página `/curriculo/`.

## Rotas e configuração

As páginas permanecem em `/`, `/sobre/`, `/projetos/`, `/projetos/[slug]/`, `/experiencia/`, `/competencias/`, `/formacao/`, `/contato/` e `/curriculo/`. Slugs de projetos, links externos e URLs de imagens, PDFs, sitemap e robots conservam os caminhos existentes.

Copie `.env.example` para `.env.local` quando precisar configurar `NEXT_PUBLIC_SITE_URL`. Essa origem pública é usada no build para canonical, Open Graph, sitemap, robots e JSON-LD. Ao mudar o domínio, gere outro build. Metadados e resolução do endereço ficam em `lib/seo/`; os arquivos especiais do Next.js permanecem em `app/`.

O projeto usa Next.js App Router, React, TypeScript, Tailwind CSS, CSS global, Radix Dialog, next-themes, Lucide e GSAP. Three.js e React Three Fiber permanecem para o código legado. Manrope e Instrument Serif são processadas por `next/font`; o build pode precisar de rede para obter essas fontes.

## Scripts e verificações

| Comando ou script | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Verificação TypeScript |
| `npm run lint` | ESLint sem avisos |
| `npm run build` | Exportação estática e normalização dos segmentos |
| `npm start` ou `npm run preview` | Preview local de `out/` |
| `npm test` | Suíte Playwright existente |
| `npm run test:report` | Abrir relatório HTML |
| `npm run audit:performance` | Lighthouse, três execuções mobile e três desktop |
| `npm run assets` | Regenerar imagem social e capturas WebP |
| `scripts/prepare-hero-portrait.mjs` | Preparar variantes WebP da fotografia original |
| `scripts/prepare-miniature.mjs` | Preparar o avatar a partir do PNG aprovado informado por argumento |

Os scripts de preparação de imagens alteram arquivos em `public/`; execute-os somente quando quiser regenerar esses assets. A reorganização não exige regenerá-los.

Os testes ficam em `tests/pagina-inicial/`, `tests/navegacao/`, `tests/projetos/` e `tests/portfolio/`; auxiliares ficam em `tests/auxiliares/`. A suíte usa o build de produção e cobre rotas, imagens, temas, responsividade, mini Letícia, navegação, foco, filtros, documentos e verificações automatizadas de acessibilidade. Capturas e traces ficam em `test-results/`; o relatório HTML, em `playwright-report/`.

Para Lighthouse, inicie `npm run preview` antes da auditoria. `CHROME_PATH` seleciona o Chrome; `NEXO_AUDIT_URL` define a URL; `NEXO_AUDIT_OUTPUT` define a saída, cujo padrão é `.qa/performance/`. Execute sem outros testes concorrentes para reduzir interferência.

Somente `out/` é o diretório de publicação. Na Vercel, use **Framework Preset: Other**, **Install Command: `npm ci`**, **Build Command: `npm run build`**, **Output Directory: `out`** e **Node.js: 24.x**, com a raiz do projeto na pasta que contém `package.json`. O `vercel.json` fixa `framework: null` para selecionar Other e manter o adaptador estático; usar o preset Next.js com a saída `out` faz o adaptador procurar manifestos de servidor no diretório errado. A exportação estática, as barras finais e a normalização de segmentos são preservadas. Os cabeçalhos de segurança continuam no arquivo e no preview. O deploy automático da branch `main` está desativado por `git.deploymentEnabled.main: false`, para permitir commit e push sem publicar antes de autorização. Consulte [publicação na Vercel](docs/publicacao-vercel.md) para validação, avisos de ambiente e retomada da publicação.

## Documentação e histórico

O [MAPA DO PROJETO](docs/MAPA_DO_PROJETO.md) é o guia de manutenção atual. Os documentos abaixo registram etapas anteriores e suas condições, caminhos e resultados da época:

- [Mini Letícia, hero e SENAPPEN](docs/mini-leticia-senappen.md).
- [Fotografia da hero](docs/hero-foto-interativa.md).
- [Navegação lateral](docs/navegacao-lateral.md) e [navegação por capítulos](docs/navegacao-capitulos.md).
- [Projetos adicionais](docs/projetos-adicionais.md).
- [Galeria anterior da hero](docs/hero-galeria-projetos.md) e [base 3D anterior](docs/personagem-3d-hero.md).
- [Redesign editorial](docs/redesign-editorial.md), [pós-revisão](docs/pos-revisao.md), [refinamento pessoal](docs/refinamento-pessoal.md) e [auditoria de produção](docs/auditoria-producao.md).

Os relatórios JSON de `docs/` também são históricos; não representam uma execução nova após cada edição.
