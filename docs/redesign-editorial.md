# Redesign editorial — Letícia de Paula

## Auditoria da versão anterior

A aplicação foi executada e os sete capítulos foram capturados antes das alterações em `.qa/before/`.

- **Abertura:** nome em até 112 px e galeria com telas em perspectiva, seletores, descrição e links competiam na mesma composição. A identidade pessoal e a exploração de projetos tinham o mesmo peso.
- **Escala e alinhamentos:** aberturas de capítulos usavam uma largura diferente do conteúdo. Títulos chegavam a 76 px; grandes ilustrações estendiam o cabeçalho e afastavam as informações profissionais.
- **Repetição:** cabeçalho da rota, motivo editorial e `SectionShell` repetiam título, descrição e cena. Sobre tinha outro bloco de chamada distante; contato repetia ações de e-mail.
- **Tema:** tokens claros existiam, mas cabeçalho, hero e corpo das rotas redefiniam cores escuras localmente. Trocar a preferência não compunha uma experiência clara consistente.
- **Projetos:** um showcase grande mostrava um projeto por vez, com descrição, funcionalidades, tecnologias e links antes do estudo de caso. As demais opções tinham pouco contexto.
- **Formação:** títulos em três níveis, monogramas de instituições e status repetidos aumentavam a altura dos cards. Filtros, metadados e ações ficavam desconectados.
- **Competências:** o mapa de relações e accordions extensos apresentavam as mesmas tecnologias duas vezes antes da informação contextual.
- **Experiência:** linhas decorativas, seleção e espaçamentos adicionavam peso à timeline. Empresa, cargo, período e responsabilidades precisavam de agrupamento.
- **Transições:** snapshots antigo e novo animavam simultaneamente, com saída de 180 ms, entrada de até 620 ms e animação adicional de montagem. Regras por fase sobrescreviam os nomes de animação, produzindo conteúdo de duas páginas visível ao mesmo tempo.

## Direção de arte e sistema

Marfim `#F5F2EC`, papel branco e areia `#E8E1D6` compõem o fundo e as superfícies. Grafite `#20262D` ancora textos e o CTA principal. Champanhe `#A48A67` aparece em detalhes; textos de destaque usam bronze mais escuro `#79603F`. O cinza secundário foi ajustado para `#59646E` para manter contraste sobre areia.

Instrument Serif permanece nos títulos editoriais; Manrope organiza texto e controles. O nome chega a 72 px em desktop e 44–48 px em mobile. Títulos das páginas usam escala fluida de 30–44 px, seções 26–32 px, corpo 15–16 px. O container comum tem máximo de 1160 px; composições usam proporções de 12 colunas, gaps de 24–40 px e cards com 20–28 px de padding.

O tema inicial passa a ser claro. Uma escolha anterior de tema permanece respeitada e persiste entre rotas e recargas. O tema escuro usa grafite, superfícies levemente elevadas e textos claros, com a mesma estrutura editorial.

## Composições implementadas

- **Abertura:** apresentação pessoal, nome, posicionamento, um CTA principal para projetos e currículo como ação secundária. O painel editorial de atuação usa apenas informações existentes. Não há galeria, fotografia inventada ou objetos 3D na abertura. `lib/portrait.ts` não contém fotografia local aprovada; a composição funciona sem ela.
- **Projetos:** cinco trabalhos visíveis em grade, com um destaque horizontal. Capturas reais onde existem; os outros três projetos continuam com diagramas identificados. Os cards concentram categoria, resumo, principais tecnologias e acesso ao estudo. Contexto, problema, solução, funcionalidades e arquitetura permanecem nas URLs individuais.
- **Sobre:** texto com largura de leitura limitada e princípios agrupados em superfície lateral. Todos os parágrafos profissionais permanecem disponíveis.
- **Experiência:** timeline com empresa, cargo, período e responsabilidades próximos. Navegação e seleção continuam funcionando. Não foram acrescentados resultados não verificados.
- **Competências:** seis categorias abertas à leitura; selecionar uma tecnologia revela evidência e projetos confirmados. A exploração por projeto permanece disponível em um painel recolhível compacto.
- **Formação:** formação acadêmica agrupada, biblioteca responsiva com nove cursos concluídos e um em andamento; pesquisa sem acentos, filtros por área/instituição/status e nove certificados PDF preservados.
- **Contato:** uma ação principal de e-mail, redes com nomes visíveis e acessos ao currículo. Sem escultura e sem espaçadores para preencher a tela.
- **Navegação:** header de 64 px com currículo, tema e menu. Pausa e modo de leitura ficam no menu. Barra de capítulos no fluxo sticky, anterior/próximo e URLs compartilháveis preservados.
- **Transições:** saída de 90 ms seguida de entrada de 160 ms com atraso de 90 ms. Removida a segunda animação de montagem. Header e controles possuem camadas próprias estáveis. Movimento reduzido e pausa continuam respeitados; gestos internos à galeria não trocam capítulos.
- **3D existente:** mantido como apoio de até 160 × 140 px nas páginas internas adequadas, sem competir com o conteúdo; oculto no mobile, abertura e contato. O carregamento permanece dinâmico, sob demanda, com fallback SVG e recuperação de contexto. A antiga galeria 3D deixou de integrar o bundle da cena ativa.

## Organização dos arquivos

`app/editorial.css` centraliza tokens, escala, abertura, frames de página, estudos de caso e currículo. `editorial-chapters.css`, `editorial-catalogs.css` e `editorial-navigation.css` organizam os componentes correspondentes. São importados ao final no layout para substituir as decisões visuais anteriores, preservando as regras funcionais existentes.

Os componentes foram reorganizados no projeto atual; rotas, dados profissionais, documentos e dependências foram preservados. Apenas a descrição do próprio portfólio foi atualizada para refletir a nova apresentação. Nenhuma biblioteca foi adicionada e nenhum deploy foi realizado.

Arquivos de implementação alterados ou criados:

- Sistema: `app/layout.tsx`, `app/editorial.css`, `app/editorial-chapters.css`, `app/editorial-catalogs.css`, `app/editorial-navigation.css`, `components/theme-provider.tsx`.
- Abertura e páginas: `components/portal/portal-hero.tsx`, `components/editorial-page.tsx`, `app/experiencia/page.tsx`.
- Capítulos: `components/profile-section.tsx`, `components/experience-section.tsx`, `components/skills-section.tsx`, `components/skill-connection-map.tsx`, `components/contact-section.tsx`.
- Catálogos: `components/project-explorer.tsx`, `components/project-visual.tsx`, `components/education-section.tsx`, `components/certifications-section.tsx`, `components/certification-explorer.tsx`, `lib/projects.ts`.
- Navegação e cena existente: `components/header.tsx`, `components/experience-navigation.tsx`, `components/chapter-transition.tsx`, `components/portal/sculpture-loader.tsx`, `components/portal/sculpture-scene.tsx`.
- Testes atualizados: `tests/chapters.spec.ts`, `tests/immersive.spec.ts`, `tests/portfolio.spec.ts`, `tests/post-review.spec.ts`, `tests/project-catalog.spec.ts`, `tests/refinement.spec.ts`. `tests/hero-gallery.spec.ts` foi substituído por `tests/editorial-hero.spec.ts` porque a galeria saiu da abertura.
- Relatórios: este documento e `docs/validacao-editorial.json`, que também contém o inventário completo de arquivos.

## Revisão e validação

Foram feitas duas rodadas de screenshots e inspeção com Chrome real via Playwright. Capturas locais: `.qa/after-pass1/`, `.qa/chapters-review/`, `.qa/catalogs/` e `.qa/final/`. Também foram inspecionadas capturas durante saída e entrada das transições em `.qa/navigation-transition-exit.png` e `.qa/navigation-transition-enter.png`.

Correções após a primeira revisão: superfícies claras que ainda herdavam cores antigas, linha duplicada da timeline, alinhamento das categorias, contraste de diagramas/tags, rótulo acessível do seletor de projeto e proteção de gestos da nova galeria.

Os testes foram atualizados para o comportamento solicitado, substituindo expectativas da galeria na hero, dos accordions grandes e dos controles removidos do header. A cobertura inclui as larguras 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px; os sete capítulos, currículo e cinco estudos; Axe nos dois temas; foco, teclado, histórico, filtros, certificados, metadados, navegação sem JavaScript, reduced motion e fallback WebGL.

Comandos de validação no Windows:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm.cmd test
```

Resultados finais registrados em `docs/validacao-editorial.json`. Artefatos completos da suíte em `test-results/` e relatório HTML em `playwright-report/`.

### Resultados finais

- Typecheck, lint, build de produção e `git diff --check`: aprovados.
- Playwright: **191 aprovados**, zero falhas, skips ou testes instáveis, em 105,5 segundos.
- Layout: 13 páginas × 8 larguras, sem overflow ou erros de runtime nos cenários executados.
- Axe: 26 verificações de página/tema, sem violações WCAG A/AA detectadas; isso complementa a inspeção manual de foco, legibilidade e composição.
- Lighthouse na abertura do build local, três medições por perfil: **100 em desempenho, acessibilidade e SEO**, tanto no mobile quanto no desktop. Mediana mobile: LCP 907 ms, CLS 0, TBT 14 ms. Mediana desktop: LCP 245 ms, CLS 0, TBT 0 ms. São medições locais, não dados de tráfego real.
- 52 capturas finais dos dois temas e duas larguras, mais capturas de hover, menu, diálogo e transições.

O build emitiu uma recomendação de atualização de segurança para o Next.js instalado e concluiu após repetir o comando. A atualização da dependência não foi realizada nesta reformulação visual.
