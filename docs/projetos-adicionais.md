# Projetos adicionais — 20/10/2026

Inclusão solicitada por Letícia de Paula: organizador de tarefas, projeto privado da SENAPPEN e DIO Lab. As páginas usam o catálogo tipado existente, sem mudança de arquitetura nem publicação externa.

## Fontes e limites

- **Organizador pessoal / Finanzy:** README, manifestos e estrutura da implementação local do repositório `Organizador_de_tarefas`. O nome atual da interface é Finanzy e o domínio documentado é organização financeira, não gestão de tarefas. A URL do estudo de caso preserva a referência ao organizador. O repositório não apareceu na consulta pública do GitHub; nenhum link de código ou demo é apresentado. Não foram copiados dados financeiros, credenciais nem telas autenticadas.
- **SENAPPEN — Portal de Recebimentos:** README e manifesto da cópia local do projeto privado. A pedido da autora, a página apresenta contexto e tecnologias em nível geral. Não divulga o endereço do repositório, endereços operacionais, código, dados de UFs/empresas, documentos ou capturas internas. Não atribui autoria exclusiva nem resultados quantitativos.
- **DIO Lab:** [fork público de leticiapaulap](https://github.com/leticiapaulap/dio-lab-open-source) e [guia de contribuição](https://github.com/leticiapaulap/dio-lab-open-source/blob/main/CONTRIBUTING.md), conferidos em 20/10/2026. É um fork educacional do [projeto original da Digital Innovation One](https://github.com/digitalinnovationone/dio-lab-open-source), não uma aplicação autoral. Não há alegação de pull request aceito ou implementação própria da plataforma.

O pedido atual autoriza a inclusão resumida dos projetos que a revisão anterior mantinha fora do catálogo. Não autoriza tornar os repositórios privados públicos, publicar dados restritos ou fazer deploy.

## Integração

- Cinco projetos no catálogo, filtros, navegação interna, links sem JavaScript, sitemap e estudos de caso estáticos.
- Diagramas específicos por projeto sem captura; identificados explicitamente como diagramas editoriais.
- Relações de competências limitadas ao uso verificado; contextos distinguem projetos públicos e não públicos.
- As duas capturas reais da hero são preservadas, sem aumento de telas, texturas ou cenas WebGL.

## Validação

Validação em Windows, Node.js 24.13.0 e Chromium 153.0.8010.12 local, em 20/10/2026:

- `npm.cmd run typecheck`, `npm.cmd run lint` e `npm.cmd run build`: aprovados. O export inclui as cinco páginas de projeto e treze rotas de conteúdo.
- `npx.cmd playwright test`: 187 testes aprovados na execução completa após os ajustes visuais, em 4,1 minutos. O relatório permanece em `test-results/results.json` e `playwright-report/`.
- Cobertura: treze rotas em oito larguras de 320 a 1920 px, axe nos dois temas, acesso direto, recarregamento, anterior/próximo, histórico, teclado, gestos, movimento reduzido, fallback sem WebGL, conteúdo extenso, filtros, documentos, metadados e navegação sem JavaScript.
- Os sete testes específicos do catálogo verificam seleção e retorno em desktop/mobile, filtros, links, atribuição ao projeto original da DIO, ausência de links privados, HTML estático e conexões de competências.
- Após o acabamento do texto de contagem no mapa, typecheck, lint e build foram repetidos com sucesso. Revalidação final: `npx.cmd playwright test tests/project-catalog.spec.ts --reporter=list --output=.qa/project-catalog/final-tests`, com sete testes aprovados em 21,5 segundos, incluindo espaçamento das legendas e altura do mapa. O relatório completo de 187 testes foi preservado.
- Inspeção visual adicional em 1440 × 960 e 375 × 812 px: legenda dos diagramas sem sobreposição, mapa com cinco projetos, zero overflow horizontal e zero erros de console/execução nas páginas verificadas. Capturas em `.qa/project-catalog/`.

A inspeção detectou e corrigiu a sobreposição da legenda dos diagramas e o crescimento excessivo do SVG do mapa. O SVG agora acompanha a altura natural dos grupos e projetos, sem determinar a altura do conteúdo. Não foram executados testes em aparelho físico nem uma nova medição Lighthouse. Nenhum deploy foi realizado.

## Arquivos desta inclusão

| Área | Arquivos |
| --- | --- |
| Catálogo, tipos e relações | `lib/projects.ts`, `lib/types.ts`, `lib/skills.ts` |
| Galeria e diagramas | `components/project-explorer.tsx`, `components/project-visual.tsx` |
| Mapa de competências | `components/skill-connection-map.tsx` |
| Layout e responsividade | `app/globals.css`, `app/experience.css`, `app/refinements.css` |
| Testes | `tests/project-catalog.spec.ts`, `tests/portfolio.spec.ts` |
| Documentação | `README.md`, `docs/projetos-adicionais.md`, `docs/conteudo-interno.md`, `docs/pos-revisao.md` |

As alterações anteriores da hero e da navegação por capítulos foram preservadas.
