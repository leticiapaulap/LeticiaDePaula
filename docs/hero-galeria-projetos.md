# Hero e navegação — Letícia de Paula

## Escopo

Esta revisão evolui o checkout existente em Next.js 16.4 e React 19.3, preservando App Router, exportação estática, os sete endereços de capítulos, os estudos de caso, os dados profissionais, cursos, certificados, currículo e preferências de leitura. Não há migração de framework, novas dependências ou publicação.

Os guias locais de View Transitions e exportação estática orientam a integração. A configuração dos capítulos e as transições de rota existentes são reutilizadas. A documentação da rodada anterior e suas medições permanecem em `docs/navegacao-capitulos.md`.

## Hero e projetos reais

A fita e seu fallback SVG foram retirados da abertura. A coluna esquerda mantém nome, apresentação, botões e links profissionais. Coordenadas, órbitas, linhas técnicas e chamada separada de próximo capítulo foram removidas. A coluna direita recebe duas telas digitais, selecionadas dos projetos realmente cadastrados.

O mesmo canvas persistente renderiza as telas com perspectiva, profundidade física, molduras, luz quente e reflexo discreto. Os materiais usam as capturas locais como texturas, sem inventar interfaces ou projetos. Seleção por clique aproxima o projeto e exibe suas tecnologias e o estudo de caso. A composição completa pode ser restaurada. As páginas internas mantêm a escultura existente como apoio visual.

Os controles HTML funcionam com teclado, mouse e toque. As setas nos seletores alternam projetos; Escape restaura a composição. O foco permanece no seletor ao restaurar a galeria. Essas interações não alteram a URL, não mudam o capítulo e não bloqueiam os controles principais.

No celular, uma captura por vez mantém a leitura prioritária e permite alternar entre os dois projetos por toque. Uma visita mobile à hero não inicia WebGL. Modo direto, movimento reduzido, indisponibilidade de WebGL e perda de contexto preservam as imagens e os links HTML.

## Origem das imagens

| Arquivo | Origem e tratamento |
| --- | --- |
| `public/projects/festa-fantasia-home.png` | Cópia integral do PNG anexado por Letícia nesta solicitação; a identidade SHA-256 com o arquivo recebido foi conferida. |
| `public/projects/festa-fantasia-home.webp` | Versão de 1600 × 760 px, qualidade 86, gerada a partir do PNG fornecido. Substitui a captura antiga na galeria e no estudo de caso. |
| `public/projects/portfolio-competencias.png` | Captura real do componente de mapa de competências do portfólio local, em 1120 × 744 px, sem alterar a interface. |
| `public/projects/portfolio-competencias.webp` | Versão WebP da mesma captura real, qualidade 86, usada para representar o portfólio na galeria. |

`scripts/optimize-assets.mjs` regenera as versões otimizadas. Os PNGs permanecem como fontes; a hero não usa a imagem histórica que continha a fita.

## Navegação e leitura

A navegação usa uma linha de 56 px no fluxo abaixo do header. Exibe capítulo atual, progresso fino, anterior e próximo com o nome do destino. O primeiro capítulo não tem ação anterior; o último oferece “Voltar ao início”. A seleção direta fica exclusivamente no menu principal, com sete links reais. Não há dropdown, seta vertical ou painel flutuante sobre o conteúdo.

URLs, histórico nativo, atalhos fora dos controles e rolagem natural continuam funcionando. As transições existentes conservam direção, profundidade moderada e dissolução, com mudanças simples no mobile e movimento reduzido. A navegação permanece disponível durante as animações. A entrada da galeria principal de projetos preserva o contraste das ações desde o primeiro quadro.

## Fotografia pessoal

`ProfessionalPortrait` recebe uma moldura com perspectiva CSS, profundidade, sombras e luz de borda. O arquivo da fotografia não é processado, recortado ou alterado; a imagem mantém altura automática e `object-fit: contain`. O tratamento é simplificado no mobile e com movimento reduzido.

Não foi fornecida uma fotografia pessoal nesta solicitação. `portrait` permanece `null`; nenhuma pessoa, pose, roupa ou detalhe corporal foi gerado ou modificado. Para integrar a fotografia autorizada, cadastre caminho local, descrição e dimensões originais em `lib/portrait.ts`.

## Arquivos desta revisão

| Área | Arquivos |
| --- | --- |
| Abertura e galeria | `components/portal/portal-hero.tsx`, `components/portal/hero-project-gallery.tsx`, `components/portal/project-gallery-scene.tsx`, `lib/hero-gallery.ts` |
| Renderizador compartilhado | `components/portal/sculpture-loader.tsx`, `components/portal/sculpture-scene.tsx`, `components/experience-provider.tsx` |
| Navegação e foco | `components/experience-navigation.tsx`, `components/header.tsx` |
| Composição e estilos | `app/hero.css`, `app/chapters.css`, `app/refinements.css`, `app/layout.tsx` |
| Retrato e imagens | `components/professional-portrait.tsx`, `components/project-visual.tsx`, `lib/projects.ts`, `lib/types.ts`, `scripts/optimize-assets.mjs`, quatro imagens de projetos listadas na tabela anterior |
| Testes | `tests/hero-gallery.spec.ts`, `tests/helpers/chapters.ts`, `tests/chapters.spec.ts`, `tests/immersive.spec.ts`, `tests/refinement.spec.ts`, `tests/post-review.spec.ts`, `tests/portfolio.spec.ts` |
| Documentação | `README.md`, `docs/hero-galeria-projetos.md` |

## Validação

Executada em 20/10/2026, no Windows, com Node.js 24.13.0 e Chromium 153.0.8010.12 instalado na máquina. O executável é selecionado por `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run typecheck` | Aprovado |
| `npm.cmd run lint` | Aprovado |
| `npm.cmd run build` | Aprovado; rotas e segmentos estáticos gerados |
| `npm.cmd run assets` | Aprovado; fontes preservadas e versões otimizadas regeneradas |
| `npx.cmd playwright test` | 150 testes aprovados em 3,1 minutos; zero falhas, ignorados ou intermitentes |
| Teste adicional da galeria WebGL | Aprovado em 6,4 segundos, incluindo perda de contexto na hero e retorno às capturas HTML |
| `git diff --check` | Aprovado |

A suíte completa cobre dez rotas em 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px, auditorias axe nos temas claro e escuro, menu e acesso direto, anterior/próximo e retorno ao início, histórico, teclado, foco, gestos, conteúdo extenso, seleção e estudos de caso, filtros, certificados, currículo, PDFs, metadados, 404 e navegação sem JavaScript.

Os testes da nova galeria verificam seleção por mouse, teclado e toque, aproximação e restauração, foco ao restaurar, tecnologias e links corretos, clique real por raycasting na tela WebGL, um único canvas persistente entre rotas, uma tela visível no mobile sem WebGL, movimento reduzido e isolamento dos gestos internos. A perda de contexto na abertura também foi verificada após a execução completa, com retorno ao fallback sem erros de console.

Foram inspecionadas capturas em 1440 × 960 px com WebGL e modo direto, em 375 × 812 px com emulação de toque, e dos estudos de caso com a imagem atualizada. As três configurações finais registraram zero erros de console ou de execução e nenhum overflow horizontal. Desktop imersivo manteve um canvas; desktop direto e mobile mantiveram zero canvases.

Durante a validação foram corrigidos os nomes acessíveis dos seletores e do retorno ao início, o contraste das ações durante a entrada e a verificação das imagens que ficam ocultas até serem selecionadas no mobile. As capturas e o relatório visual ficam em `.qa/hero-refinement/`; o teste adicional de perda de contexto usa `.qa/hero-refinement/context-loss/`. A suíte completa mantém relatórios em `test-results/` e `playwright-report/`.

Não foram executados novos testes em Safari, Firefox, aparelhos físicos, leitor de tela ou Lighthouse. Nenhuma fotografia pessoal foi fornecida para validação visual. Nenhum deploy foi realizado.
