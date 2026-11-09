# Mini Letícia e acesso ao SENAPPEN

A hero mantém fotografia, recorte, dimensões, título, apresentação, botões, cores e navegação. A legenda “Pessoas. Ideias. Possibilidades.” e seu marcador foram removidos no refinamento final, junto dos estilos e do espaço que reservavam. A miniatura usa a ilustração transparente `Avatar Acenando com Cachos Ruivos.png`, fornecida para substituir a personagem anterior com celular. É uma imagem 2D, sem modelo, Canvas ou WebGL; sua entrada lateral e o aceno usam movimento suave, sem alterar a arte aprovada. Não há balão ou fala.

## Arte e saudação

`public/images/leticia-mini-avatar.webp` é a imagem original convertida para WebP com transparência, sem redesenhar ou recortar a personagem. Ela fica parcialmente atrás da fotografia; uma segunda camada recortada da mão acompanha o movimento do pulso durante o aceno. O restante da arte é preservado.

Para regenerar a imagem otimizada com o arquivo PNG original:

```powershell
node scripts/prepare-miniature.mjs "C:/Users/leticia.pereira/Downloads/Avatar Acenando com Cachos Ruivos.png"
```

`HeroMiniature` carrega GSAP após a imagem, sem bloquear a renderização da hero. A personagem entra automaticamente pela lateral após uma breve pausa, acena uma vez e permanece ao lado da moldura. É uma ilustração decorativa, não interativa e oculta de tecnologias assistivas. Não há texto, balão, ponteiro ou estados de hover/foco para fala.

A miniatura fica à esquerda, com o topo em 58% da altura da moldura (65% no mobile), e a foto à frente oculta de fato a lateral do corpo. A entrada começa 75% da largura da arte para dentro da foto e desliza para fora em 1,2 segundo, inclinando-se suavemente durante o aceno. Todas as camadas pertencem à moldura e não ocupam espaço no fluxo. Com movimento reduzido, a personagem aparece estática na posição final; ao ativar essa preferência durante a entrada, a animação é interrompida com segurança. Se a imagem ou o módulo de animação falhar, apenas a miniatura é ocultada. Sem JavaScript, foto e links continuam disponíveis.

As alturas de referência são 120 px no desktop, 102 px em tablets e 80 px no mobile, mantendo a proporção 579 × 768 do arquivo aprovado.

O espaçamento vertical da abertura foi compactado: padding do topo, conteúdo, intervalo entre colunas/linhas e colofão foram reduzidos, mantendo a ordem e o respiro dos elementos. A seção continua dimensionada pelo conteúdo; o rodapé permanece logo após a hero, sem altura mínima de viewport ou espaço reservado para a antiga fala.

## Espaçamento da página inicial

O vão antes do rodapé vinha de `.portfolio-content` com `min-height: 100svh` (descontando o cabeçalho no mobile), do crescimento de `main` com `flex: 1 0 auto` e do alongamento do item no grid. Regras limitadas à presença de `.personal-opening` removem essa altura mínima, usam `align-self: start` e deixam o main seguir a altura do conteúdo. Sidebar e páginas internas preservam suas regras. A moldura perdeu somente o padding inferior que reservava espaço para a legenda removida.

Nas capturas, a distância hero–rodapé caiu de 24,2 px em 1366 × 768, 145,6 px em 1440 × 900, 324,4 px em 1920 × 1080 e 248,8 px no tablet para zero. No mobile, retirar a legenda e seu espaço reduziu a hero em 32,1 px. Em janelas altas, o fundo pode continuar abaixo do rodapé, sem criar um vão entre ele e a hero.

## SENAPPEN

O cadastro existente `senappen-recebimentos` em `lib/projects.ts` recebeu o link público `https://mjsp-recebimentos-smtp.vercel.app/`. O card e a página `/projetos/senappen-recebimentos/` exibem “Acessar sistema”, com ícone discreto, nova aba e `rel="noopener noreferrer"`. A nota de divulgação foi ajustada para permitir o endereço público; descrições, funcionalidades, capa e condição de repositório privado foram preservadas.

Uma consulta pública GET confirmou HTTP 200. Nenhum formulário foi enviado, área restrita acessada ou captura da aplicação adicionada. Os testes de nova aba interceptam a navegação externa, sem interagir com o sistema real.

## Validação

### Remoção do balão e compactação da hero

O componente não contém texto de fala, balão, ponteiro, controles de hover/foco ou cálculos de posicionamento da fala. A entrada lateral e o aceno permanecem, com inicialização única da animação mesmo quando o evento `load` e a verificação da imagem em cache ocorrem juntos.

Comparação local do CSS anterior com a versão atual, na mesma build de produção: a hero ficou 40 px mais curta no desktop/tablet e 28 px no mobile. A fotografia mantém exatamente as mesmas dimensões. O rodapé começa imediatamente após a seção, sem vão adicional; o respiro restante inclui o colofão existente.

Foram capturadas dez resoluções (320 × 812, 375 × 667, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1100 × 900, 1366 × 768, 1440 × 900 e 1920 × 1080) nos temas claro e escuro. Nenhuma apresentou overflow horizontal ou balão residual. Capturas e medidas estão em `.qa/hero-spacing/final/`, com comparação em `.qa/hero-spacing/comparison.json`. A pasta `original/` usa somente o CSS anterior sobre a página atual para isolar a comparação dos espaçamentos.

Validação final em Chromium: `npm.cmd run typecheck`, `npm.cmd run lint` e `npm.cmd run build` aprovados; **266 testes passaram** em `npm.cmd test`, incluindo os 62 casos da hero. O teste de navegação contextual foi corrigido para verificar o link no card antes de navegar e, depois, na página de destino, evitando consultar um card que já saiu do DOM. Nenhum componente de projeto foi alterado. Arte, fotografia, moldura, sidebar, botões, tipografia, paleta, temas, páginas internas e projetos permanecem preservados. Nenhum deploy realizado.

### Histórico das etapas anteriores

Refinamento final: build de produção, TypeScript e ESLint aprovados; **61 testes** passaram nos arquivos `hero-miniature`, `hero-final-refinement`, `editorial-hero` e `hero-refinement`. Os 12 casos de apresentação sem interação cobrem 1366 × 768, 1440 × 900, 1920 × 1080, 768 × 1024, 390 × 844 e 375 × 667 em claro e escuro. Também foram verificados foco, toque, Escape, entrada em aproximadamente 400 ms, duração da fala, permanência do avatar, remontagem por navegação, movimento reduzido inicial/dinâmico, falha do asset, oclusão, foto, botões e acessibilidade.

Refinamento subsequente: removidos balão, fala, ponteiro, controles e cálculos de posicionamento associados; a miniatura mantém a entrada e o aceno automáticos. Padding vertical e gaps da hero foram reduzidos para aproximar o rodapé sem alterar a sidebar ou páginas internas.

Revisão real de 48 capturas antes/depois, durante a fala e em repouso, em `.qa/hero-final-refinement/before/` e `after/`, com relatórios JSON e folhas de comparação dos avatares. Sem erros de página, overflow horizontal, balão sobre o rosto/foto/textos ou legenda residual nas telas testadas. Validação automatizada em Chromium; outros navegadores não foram exercitados nesta etapa. Nenhum deploy realizado. Arte aprovada e fotografia mantêm os hashes anteriores.

Arquivos do refinamento final: `components/portal/hero-miniature.tsx`, `components/portal/hero-portrait.tsx`, `app/hero-portrait.css`, `app/navigation-layout.css`, `tests/hero-miniature.spec.ts`, `tests/hero-final-refinement.spec.ts` e este documento.

Comandos: `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build` e `npm.cmd test`.

Os testes cobrem carregamento da nova ilustração, saudação finita, hover sem reinício, teclado, toque repetido, oclusão, posição do balão, movimento reduzido inicial e dinâmico, falha do asset, foto/layout preservados, card único do SENAPPEN, destino e atributos do link. Capturas de revisão em desktop e mobile são mantidas fora do repositório. Nenhum deploy realizado.

Na correção de encaixe e fala, passaram build, TypeScript, ESLint e os 50 testes direcionados da hero. Após o ajuste final da inclinação e margem no mobile, passaram também os 15 casos de geometria/entrada: sete larguras (320, 375, 430, 768, 1024, 1100 e 1440 px), cada uma com movimento normal e reduzido, e a sequência de entrada escondida, surgimento lateral e recuo. A verificação usa oclusão real por hit-test e coordenadas do ponteiro SVG para confirmar a conexão com a boca, inclusive durante o recuo. Foto e arte aprovada mantêm os hashes anteriores; os demais componentes da hero não foram editados.

Validação original: TypeScript, ESLint e build de produção aprovados; 251 testes passaram. Revisão da substituição da personagem: build, typecheck, lint, os testes direcionados da miniatura e os 253 testes da suíte completa passaram. A etapa de posição e movimento da mão também atualiza e verifica a camada móvel do pulso, a posição abaixo do centro, a mensagem e o respeito ao movimento reduzido. SHA256 da fotografia original permanece `49ec0ea1fba33d4be393432b3946472a0798a63ad5613e3b6b11ec3adff915be`.

## Arquivos desta alteração

- `components/portal/hero-miniature.tsx` — novo controlador e apresentação da miniatura.
- `components/portal/hero-portrait.tsx` — integração na moldura existente.
- `app/hero-portrait.css` — camadas, oclusão, proporções e espaçamento da hero sem balão.
- `public/images/leticia-mini-avatar.webp` — ilustração sem celular fornecida por Letícia.
- `scripts/prepare-miniature.mjs` — preparação reproduzível do asset.
- `lib/projects.ts` — link público do SENAPPEN e nota de divulgação.
- `components/project-explorer.tsx` — acesso no card SENAPPEN existente.
- `app/projetos/[slug]/page.tsx` — atributos seguros e ícones decorativos dos links.
- `tests/hero-miniature.spec.ts` — novos testes da miniatura.
- `tests/editorial-hero.spec.ts` — expectativas atualizadas para a miniatura.
- `tests/hero-refinement.spec.ts` — layout e foto preservados com a miniatura.
- `tests/project-catalog.spec.ts` — link autorizado, card único e nova aba.
- `docs/personagem-3d-hero.md` — referência à implementação 2D atual.
- `docs/mini-leticia-senappen.md` — origem do asset, implementação e validação.

Outras alterações que já existiam no diretório de trabalho foram preservadas.
