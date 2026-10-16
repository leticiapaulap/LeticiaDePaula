# Letícia de Paula — refinamento de identidade e experiência

## Auditoria inicial e prioridades

Revisão incremental da base `ab51e9f`, sem reconstrução, publicação externa ou alteração das URLs existentes.

| Prioridade | Diagnóstico | Intervenção |
| --- | --- | --- |
| P0 | A marca anterior aparece no header, hero, rodapé, SEO, imagem social, projetos e capturas | Usar exclusivamente Letícia de Paula; atualizar capturas reais depois do refinamento |
| P0 | A barra inferior fixa cobre conteúdo durante a leitura e repete o menu | Mover o seletor de áreas para o fluxo da abertura; manter menu global acessível e retornos contextuais |
| P1 | A interface expõe auditoria editorial, ausência de documentos e mensagens de implementação | Transferir pendências para relatório interno; reescrever apresentação sem inventar fatos |
| P1 | A galeria mostra os mesmos dois projetos até três vezes e usa um diagrama como principal destaque | Uma vitrine visual com seleção e filtros preservados; capturas apenas de aplicações reais |
| P1 | A timeline repete contexto, cargo, modalidade e validação em grandes blocos | Compactar hierarquia empresa/cargo/período e manter atividades confirmadas |
| P1 | Competências e certificados têm densidade e repetição excessivas | Categorias expansíveis, relações úteis e biblioteca compacta de documentos confirmados |
| P1 | A escultura fica quase imperceptível nas páginas internas, sem área reservada | Ancorar uma única cena em áreas decorativas próprias, sem sobrepor textos; preservar fallback e modo direto |
| P2 | Não há fotografia pessoal local fornecida | Preparar componente opcional sem imagem fictícia, recorte ou rotação corporal simulada |

## Plano incremental

1. Identidade e conteúdo: metadados, marca pessoal, linguagem pública e separação de pendências.
2. Composição: abertura, navegação em fluxo, vitrine, timeline, categorias e certificados.
3. Profundidade: âncoras da cena existente, luz controlada e integração opcional de fotografia.
4. Validação: typecheck, ESLint, build, navegação, oito larguras, axe, capturas e Lighthouse com condições registradas.

## Preservado

Next.js App Router com export estático, dez rotas de conteúdo, slugs dos estudos de caso, paleta grafite/marfim/dourado, fontes editoriais, geometria procedural, máquina de estados, filtros, busca sem acentos, temas, preferências, documentos e navegação sem JavaScript/WebGL. Classes, chaves de armazenamento e nomes internos antigos podem permanecer para evitar migrações sem benefício ao visitante.

## Alterações implementadas

### Identidade pessoal e linguagem

- Header tipográfico com Letícia de Paula, monograma LP no ícone da aplicação, rodapé, breadcrumbs e retornos com o nome profissional.
- Título inicial, nome de exibição, Open Graph/Twitter e imagem social usam a identidade pessoal; metadados continuam específicos por rota.
- Apresentação em primeira pessoa, contato, formação, currículo, títulos e descrições foram revisados. A auditoria pública em Sobre foi removida; fontes e limites ficam em `docs/conteudo-interno.md`.
- A biblioteca pública apresenta nove cursos concluídos com documentos e um em andamento. Os nove registros sem conclusão confirmada permanecem no controle interno; nenhum foi promovido a concluído.

### Composição e navegação

- Nome com hierarquia maior na abertura, texto mais curto e dois caminhos claros: conhecer os projetos ou explorar a trajetória. Paleta, fontes, linhas arquitetônicas e escultura preservadas.
- Menu superior com Início, Sobre, Projetos e Contato; o menu completo mantém acesso a todas as páginas, preferências e currículo.
- O seletor de áreas foi removido do layout global e colocado em fluxo na exploração. Não há barra inferior fixa sobre a leitura, nem seletor repetido em todas as páginas internas.
- As aberturas internas reservam uma área decorativa própria e têm espaçamentos menores, sem duplicar paddings. A página de projetos elimina o segundo cabeçalho introdutório para antecipar a vitrine.

### Projetos e trajetória

- A galeria mantém filtros por categoria, teclado, swipe e retorno com seleção preservada, mas passa de múltiplas apresentações duplicadas a uma vitrine visual selecionável com composição assimétrica.
- Dois projetos reais, ambos com captura verdadeira, tecnologias, acesso ao código e estudos de caso nas URLs existentes. Festa Fantasia também oferece demonstração verificada. Não foram criados projetos ou preenchimentos fictícios.
- A captura de Festa Fantasia foi feita diretamente na URL configurada no repositório (`https://festa-fantasia.vercel.app/`), que redirecionou para `https://halloween-disney.vercel.app/`. O contexto público é um concurso de fantasias apresentado como Halloween. Página e `/api/settings` responderam 200; não houve erro de execução observado nessa visita, envio de cadastro ou voto. Isso não equivale a testar administração ou todo o backend.
- Captura do portfólio atualizada com a marca pessoal e a escultura real em WebGL, em 1440 × 960. A animação foi pausada pelo controle da própria aplicação durante a captura.
- Timeline mais enxuta: empresa, cargo e período têm hierarquia própria; atividades aparecem sem blocos repetidos de validação ou campos desconhecidos.
- Competências agrupadas em categorias expansíveis por teclado/toque. O mapa preserva somente relações já registradas com projetos reais; não há percentuais arbitrários de domínio.
- Certificados em cards compactos com instituição, situação, carga horária e data quando conhecidas. Sem mensagens de documento ausente ou botão de visualização sem arquivo.

### Profundidade e fotografia

- A mesma cena procedural é ancorada em espaços reservados da abertura e das seções; câmera, forma e material continuam ligados às fases e às seleções existentes. Não foram adicionados canvases, texturas ou pós-processamento.
- Páginas internas recebem fallback vetorial correspondente à fase e uma cena já ativada ou solicitada pelo modo imersivo. No mobile, a arte interna secundária é ocultada para priorizar conteúdo; a abertura mantém SVG e ativação opcional de 3D.
- A iluminação ambiente e a metalicidade mobile foram ajustadas para não depender de reflexos fortes. Pausa, movimento reduzido, visibilidade da aba e renderização sob demanda permanecem.
- `ProfessionalPortrait` foi integrado a Sobre e configurado com `null`, sem imagem substituta ou espaço vazio. Ao fornecer fotografia real, a moldura cria profundidade sem recortar, deformar, filtrar o rosto ou rotacionar a pessoa. Nenhuma foto foi gerada e não existe modelo 3D corporal.

### Acessibilidade e compatibilidade

- A revisão corrigiu texto de marca que uma regra antiga ocultava no rodapé mobile, além do contraste de rótulos e descrições sobre a superfície marfim.
- Foco, alvos de toque, Escape, restauração de foco dos diálogos e alternativas diretas aos PDFs preservados. Categorias usam `details/summary` nativos.
- Modo direto continua sem download do renderizador 3D. Sem JavaScript, há navegação de páginas, links a todos os estudos de caso e aos nove certificados; nenhum conteúdo profissional depende do canvas.
- Classes, nomes de arquivos e preferências internas antigos permanecem onde a renomeação apenas criaria riscos de compatibilidade. Não são marcas visíveis da aplicação.

## Validação desta revisão

Execução final em 16/10/2026, sobre o build exportado em `127.0.0.1:4173`, com Windows, Node.js 24.13.0, npm 11.6.2, Chromium 153 headless, Playwright 1.64.1 e axe 4.14.0.

| Verificação | Resultado observado |
| --- | --- |
| Typecheck, ESLint e build de produção | Aprovados |
| Suíte Playwright | 123 testes aprovados em aproximadamente 159 s; zero falhas, ignorados ou instáveis |
| Responsividade | Dez rotas × 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px; sem transbordamento ou exceção de execução detectados |
| Axe | Dez páginas nos dois temas, menu nas oito larguras e diálogo em 768 × 320; sem violações automáticas nas regras A/AA selecionadas de WCAG 2.0/2.1/2.2 |
| Fluxos | Menu, Escape/foco, filtros, busca, galeria/retorno, categorias, mapa, temas, preferências, modos, PDFs, 404, metadados e navegação sem JavaScript aprovados |
| Cena | Renderização real, sete fases, fallback por perda de contexto e área reservada de seis páginas internas; uma única cena por página, sem interseção com o bloco de leitura nos cenários medidos |
| Console adicional | Dez rotas em modo direto: zero erros de console ou exceções observados |
| Links internos | 44 links em 20 caminhos; zero destinos inválidos; download do currículo concluído |
| Dependências | `npm audit`: zero vulnerabilidades conhecidas na consulta |
| Integridade do diff | `git diff --check` aprovado |

Foram revisadas capturas das dez páginas em 375 e 1440 px, dos portais nas oito larguras, da cena interna e dos certificados compactos. Páginas completas estão em `test-results/`; montagens e recortes em `.qa/final/`; cena, console, biblioteca e instrumentação atual em `.qa/personal/`. Os arquivos de laboratório não são publicados em `out/`.

Resumo numérico versionado: [validacao-refinamento.json](validacao-refinamento.json). A versão anterior e seus relatórios permanecem como histórico. Os testes automatizados não constituem certificação integral WCAG nem substituem revisão com leitor de tela e dispositivos físicos.

## Performance medida, antes e depois

A base anterior foi `ab51e9f`, medida antes da alteração da aplicação nesta revisão. Foram realizadas três visitas novas mobile e três desktop antes e depois, sem a suíte de testes ou instalação de dependências concorrendo com Lighthouse. O ambiente é uma máquina de desenvolvimento, não hardware dedicado; houve variação importante no lote anterior. As medianas abaixo são observações locais, não uma prova isolada de causalidade nem dados de campo.

Lighthouse 13.5.0, gzip e cache de assets versionados no preview estático. Mobile: 412 × 823, DPR 1,75, rede simulada de 1.638,4 Kbps, RTT 150 ms e CPU 4×. Desktop: configuração oficial `desktop-config`, 1350 × 940, DPR 1, rede simulada de 10.240 Kbps, RTT 40 ms e CPU 1×. O alvo é a home em visita nova e modo imersivo padrão; no mobile, o SVG inicial precede a ativação opcional de WebGL.

| Mediana de três | Mobile antes | Mobile depois | Desktop antes | Desktop depois |
| --- | ---: | ---: | ---: | ---: |
| Performance Lighthouse | 52 (48–86) | 93 (86–94) | 89 (85–97) | 100 (100–100) |
| LCP | 4,334 s | 2,926 s | 0,608 s | 0,597 s |
| CLS | 0 | 0 | 0 | 0 |
| TBT | 1.560 ms | 125 ms | 276 ms | 28,5 ms |
| Acessibilidade Lighthouse | 100 | 100 | 100 | 100 |
| SEO Lighthouse | 100 | 100 | 100 | 100 |

O LCP final mobile variou entre 2,903 e 2,947 s; desktop, entre 0,580 e 0,636 s. TBT final: 115–240 ms no mobile e 11,5–52 ms no desktop. CLS foi zero nas seis execuções finais. As notas de acessibilidade e SEO do Lighthouse referem-se à home; a cobertura das outras páginas está na suíte axe/Playwright.

Na visita mobile, o JavaScript decodificado passou de 629.542 para 624.083 bytes e a transferência total de 314.586 para 308.050 bytes. No desktop imersivo, o JavaScript passou de 1.587.801 para 1.578.931 bytes, mas a transferência total cresceu de 582.782 para 595.319 bytes (aproximadamente 2,2%). Portanto, não houve redução de todos os custos: a composição e os registros visuais têm um custo mensurável, ainda que o renderizador continue separado.

Instrumentação adicional: no modo direto desktop, zero sondagens WebGL, zero desenhos e 642.844 bytes de scripts decodificados; com a cena ativada, 1.578.931 bytes. A fita mantém 2.304 triângulos desktop e 512 mobile. No portal desktop estabilizado foram observados 31 desenhos numa janela aproximada de um segundo; após pausa, zero. Mobile estabilizado e modo direto tiveram zero na mesma janela. Não foram criadas geometrias, materiais ou draw calls extras para a fotografia.

Um fluxo local de filtros em modo direto registrou eventos de até 80 ms sem limitação artificial de CPU/rede. **Isso não é INP de campo.** O TBT do Lighthouse também não comprova a meta de INP de 200 ms.

Relatórios brutos: `.qa/performance-personal-before/` e `.qa/performance-personal-after/`, com três JSON/HTML por perfil em cada lote. Todos os resultados individuais e as configurações constam no resumo versionado, sem descarte das visitas mais lentas.

## Pendências e próximos passos

### Dependem de informação ou autorização externa

- Receber a fotografia pessoal original e aprovar a composição antes de configurar `lib/portrait.ts`.
- Confirmar domínio definitivo, situação acadêmica e vínculo profissional quando houver atualização; não presumir conclusão ou alteração de cargo.
- Conferir o LinkedIn manualmente e obter autorização antes de incluir qualquer projeto corporativo.
- Autorizar a publicação externa; nenhuma foi executada e estas alterações permanecem no workspace, sem novo commit/push automático.

### Pendência técnica explícita

A mediana de LCP mobile permanece aproximadamente 426 ms acima da meta de 2,5 s neste perfil de laboratório. CLS atende à referência de 0,1 nos ensaios finais. INP real só poderá ser avaliado com coleta aprovada após hospedagem e tráfego. Não se declara cumprimento integral das metas de produção; a próxima rodada deve investigar o custo inicial de fontes/layout/hidratação e repetir as medições no provedor escolhido.

### Melhorias opcionais

- Revisão humana com leitor de tela, teclado e aparelhos físicos, incluindo iOS/Safari.
- Cópias acessíveis/OCR dos quatro certificados de imagem, preservando a autenticidade dos originais.
- Novas capturas de fluxos dos projetos quando estiverem disponíveis, autorizadas e sem dados pessoais.

## Publicação

O projeto mantém export estático, scripts, cabeçalhos e configuração Vercel existentes. O passo a passo está no README: confirmar `NEXT_PUBLIC_SITE_URL`, executar instalação/validação/build e, somente após autorização, criar preview hospedado e conferir rotas, arquivos, metadados, cache, 404 e métricas reais. Não houve reconstrução da aplicação, deploy, alteração de branch ou inclusão de dependências de runtime nesta revisão.
