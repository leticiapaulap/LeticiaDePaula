# Navegação por capítulos — Letícia de Paula

## Arquitetura

O projeto existente já usava Next.js 16.4, React 19.3, App Router, exportação estática e rotas individuais. Foram mantidos o framework, as URLs, os dados profissionais, a biblioteca de certificados, os estudos de caso e os componentes de conteúdo. Os guias locais de layouts, navegação, exportação estática e View Transitions em `node_modules/next/dist/docs/` orientam a implementação.

`lib/chapters.ts` define uma única sequência: apresentação, sobre, projetos, experiências, competências, formação e contato. O menu, os controles e a navegação HTML sem JavaScript usam essa sequência. Cada rota continua exportando HTML e metadados próprios. A abertura contém sua apresentação; a exploração do restante acontece pelas rotas.

O layout mantém `ExperienceProvider` e uma única `SculptureLoader` entre navegações. As seções reutilizam os dados em `lib/`, o contexto de seleções mantém filtros e projeto selecionado ao abrir e fechar estudos de caso, e os diálogos de certificados mantêm seu próprio foco. Nenhum conteúdo é transferido para o canvas.

## Composição e movimento

- Apresentação: nome editorial e escultura original, com dissolução de entrada.
- Sobre: composição aberta, linha editorial e princípios; a fotografia continua opcional, conforme os dados reais disponíveis.
- Projetos: introdução compacta e moldura geométrica; uma visualização principal por vez, com entrada horizontal e aproximação suave.
- Experiências: eixo vertical e escultura de trajetória; entrada vertical acompanha a timeline completa.
- Competências: composição radial, categorias expansíveis e relações com os projetos; a transição aproxima a estrutura de conexões.
- Formação: composição em camadas, biblioteca, busca, filtros e documentos; entrada vertical mais curta.
- Contato: retorno da escultura, dissolução e encerramento com e-mail, perfis, currículo HTML e PDF.

`ChapterTransition` fica nas páginas, pois layouts persistentes não recebem as entradas e saídas de rota. Os links usam `transitionTypes`; o histórico nativo usa dissolução simples. O CSS varia o movimento por capítulo, com durações de 450–650 ms para o conteúdo. O corpo mantém opacidade integral durante sua entrada, preservando o contraste desde o primeiro quadro. A escultura reutiliza os alvos e a interpolação existentes de até 900 ms. Não foram adicionados shaders, bibliotecas de animação ou cenas WebGL paralelas.

Em navegadores sem View Transitions, o conteúdo continua entrando com CSS e os links continuam funcionando. Movimento reduzido e a pausa desativam também as animações dos pseudoelementos de View Transitions. Com movimento reduzido, a visita usa o SVG sem carregar o renderizador. Falha ou perda de contexto WebGL mantém o fallback vetorial.

## Interação e acessibilidade

A faixa de navegação fica no fluxo abaixo do header, com posição sticky. Assim, o início do conteúdo tem espaço reservado, sem um painel flutuando sobre textos no centro ou na base da tela. O scroll-padding considera as duas faixas. No mobile, a mesma área oferece anterior, próximo, seletor compacto e numeração, com alvos de pelo menos 44 px.

Links reais e `router.push` mantêm histórico, acesso direto e recarregamento. Não há listener de wheel, captura de rolagem, scroll snap ou altura fixa nos capítulos extensos. Estudos de caso, currículo e páginas desconhecidas não recebem controles ou atalhos entre capítulos.

O foco acompanha `main h1` após mudanças de rota, incluindo a apresentação e os estudos de caso, sem mudar a posição de leitura ao restaurar histórico. O indicador anuncia o capítulo atual. O menu tem links numerados, contenção de foco e fechamento por Escape; a navegação pelo menu evita devolver o foco ao botão após a troca de página.

Setas horizontais funcionam fora de controles, seleção de texto e diálogos. Gestos horizontais são opcionais, restritos ao conteúdo no mobile, com distância, direção e duração mínimas. Gestos verticais, nas bordas, cancelados ou com múltiplos toques não navegam. Galerias e controles internos preservam suas interações.

## Validação

Executada em 20/10/2026, no Windows, com Node.js 24.13.0 e Chromium 153.0.8010.12 disponível na máquina. O executável foi selecionado com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`, conforme a configuração existente do projeto.

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run typecheck` | Aprovado |
| `npm.cmd run lint` | Aprovado, sem avisos do ESLint |
| `npm.cmd run build` | Aprovado; HTML e segmentos estáticos gerados |
| `npx.cmd playwright test` | 144 testes aprovados, sem falhas ou testes ignorados; última execução em 3,9 minutos |
| `git diff --check` | Aprovado |

A suíte cobre dez rotas em 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px; auditorias axe nos temas claro e escuro; próximo/anterior; menu e seletor; acesso direto e recarregamento dos sete capítulos; histórico; foco e teclado; gestos e sua exclusão em controles; conteúdo extenso; galeria e retorno com seleção; filtros; certificados; currículo; links, PDFs e metadados; 404; JavaScript desativado; movimento reduzido; indisponibilidade e perda de contexto WebGL; persistência de um único canvas; fallback sem View Transitions; execução real da animação da galeria e outra navegação durante a transição.

Foram geradas capturas dos sete capítulos em 1440 × 960 e 375 × 812 px, nos formatos viewport e página completa, com inspeção visual de composições desktop e mobile, incluindo a abertura com WebGL. As verificações estruturais não identificaram overflow horizontal. Capturas e dados locais ficam em `.qa/chapters/`; os testes também geram imagens e traces em `test-results/` e relatório em `playwright-report/`.

Uma verificação adicional em emulação mobile confirmou o retorno à posição de leitura de 900 px pelo histórico nativo e o gesto horizontal de volta de Sobre para Apresentação. O resultado está em `.qa/chapters/history-check.json`.

Durante a revisão foram corrigidos o nome acessível do menu e a perda temporária de contraste causada pela opacidade do corpo na entrada. A execução final completa passou após essas correções. As primeiras tentativas sem um navegador compatível configurado não executaram os fluxos; os resultados finais usam o Chromium instalado.

Não foram executados novos testes em Firefox, Safari, aparelhos físicos, leitor de tela ou Lighthouse. Os relatórios de desempenho e das versões anteriores permanecem nos seus documentos originais. Nenhum deploy foi realizado.
