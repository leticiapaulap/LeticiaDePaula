# NEXO — auditoria de produção

## Escopo e método

Revisão da implementação existente em 15 e 16/10/2026. Preservar a identidade, as rotas, os documentos e a máquina de estados da etapa 3. Não executar deploy externo. Os arquivos não rastreados já presentes no workspace pertencem às etapas anteriores e devem ser preservados.

Inspeção inicial: `app/`, `components/`, `lib/`, `public/`, scripts, dependências, exportação estática e documentação do Next.js instalada em `node_modules/next/dist/docs/`. Validação prevista sobre o build exportado, com navegador Chromium local, Playwright, axe e Lighthouse. Metas: LCP ≤ 2,5 s, CLS ≤ 0,1 e INP ≤ 200 ms; resultados de laboratório não equivalem a dados reais de campo.

## Plano priorizado, antes das correções

| Prioridade | Constatação | Correção e evidência esperada |
| --- | --- | --- |
| P0 | Falta página 404 própria; `next start` não serve `output: export` | Criar recuperação em português e servidor de preview estático com status 404 real |
| P0 | Domínio fixo repetido; Open Graph herdado aponta para a home e usa SVG | Centralizar URL pública validada, metadados por rota, imagem PNG e sitemap consistente |
| P0 | Conteúdo profissional, PDFs e dependências exigem verificação antes da publicação | Conferir referências, integridade dos documentos públicos, links e auditoria de dependências; registrar limites externos |
| P1 | WebGL é sondado e importado imediatamente, inclusive ao restaurar modo direto; cena fica ativa fora de vista | Esperar preferência, visibilidade e tempo ocioso; suspender cena quando não contribui; medir antes/depois |
| P1 | Canvas mobile usa posição fixa em `50svh`, sem acompanhar altura real do texto | Conferir oito larguras e posicionar a cena sobre a área de arte sem sobrepor leitura |
| P1 | Estilos de fases e temas se sobrepõem; controles pequenos e foco pouco contrastante no papel | Refinar tokens locais, foco, alvos, formulários e diálogos com inspeção visual e axe |
| P1 | `Reveal` importa Framer Motion sem animação efetiva (`initial=false`, destino já visível) | Confirmar consumidores e remover custo sem esconder conteúdo ou mudar layout |
| P1 | Menu desktop só apresenta quatro destinos e oculta menu completo acima de 1100 px | Garantir acesso previsível a todas as páginas profissionais |
| P1 | Falta suíte automatizada reproduzível e registro atual de desempenho | Cobrir navegação, filtros, busca, documentos, temas, preferências, ausência de JS/WebGL, oito larguras e SEO |
| P2 | Componentes e estilos históricos aparentam não ter consumidores | Confirmar referências antes de remover; evitar reorganização sem benefício |
| P2 | README ainda descreve a etapa anterior e dados podem ficar obsoletos | Atualizar arquitetura, conteúdo, configuração, validação, limitações e deploy |

## 1. Resumo da aplicação

O NEXO mantém o portal artístico e apresenta dez rotas de conteúdo, dois estudos de caso, três experiências profissionais informadas, 19 cursos e nove certificados anexados. Currículo, projetos, competências e formação são HTML gerado no build; nenhuma informação profissional exige leitura do canvas.

## 2. Arquitetura final

Next.js App Router com `output: export`, barras finais e estudos de caso pré-gerados. Conteúdo e evidências ficam em módulos tipados em `lib/`. Seções editoriais e metadados são gerados estaticamente; filtros, busca, seleções e preferências são interações de cliente.

`ExperienceProvider` preserva a máquina de estados da etapa 3. Um contexto de seleções separado evita atualizar galeria, timeline e lista de competências quando apenas as preferências ou a disponibilidade da cena mudam. O carregador verifica preferência, intenção, visibilidade e disponibilidade do WebGL antes de importar o renderizador.

O portal desktop ativa a cena em tempo ocioso. O mobile começa com SVG e oferece o botão funcional “Ativar cena 3D”; entrar na exploração também habilita o carregamento. Páginas internas mantêm uma cena já ativada ou permitem ativação explícita pelo modo imersivo. A cena é acessória ao conteúdo.

## 3. Funcionalidades concluídas

- Rotas independentes, estudos de caso, retornos à galeria e página 404 em português com status HTTP 404.
- Retorno da 404 ao portal reancora a cena na área de arte, inclusive quando a fase lógica não muda; fluxo coberto por regressão automatizada.
- Galeria com categorias, estados vazios, seleção por teclado/toque e preservação de filtro ao retornar do case.
- Timeline navegável e mapa 2D de relações entre competências e projetos documentados.
- Pesquisa de cursos sem distinção de acentos; filtros por área, instituição e status, com limpeza de filtros.
- Nove certificados em diálogo, alternativa por link direto ao PDF e restauração de foco.
- Tema persistente, modo direto/imersivo, pausa persistente e movimento reduzido.
- Currículo digital indexável, impressão e download de PDF com metadados em português e links profissionais ativos.
- Fallback SVG para ausência ou perda de WebGL, isolamento de erro e navegação/conteúdo estáticos sem JavaScript.
- Metadados individuais, canonical, Open Graph/Twitter, imagem social PNG, sitemap, robots e JSON-LD de pessoa.

O formulário de contato não faz parte da aplicação: a ação disponível é um link de e-mail real. A busca implementada é a de cursos; a galeria usa filtros por categoria. Nenhum botão anuncia formulário ou busca global inexistente.

## 4. Melhorias visuais

Tokens locais passam a acompanhar a superfície de leitura, inclusive o papel da home dentro do tema escuro. Isso corrige textos claros sobre fundo claro, selos sem contraste e diferenças entre páginas internas e seções da home.

Títulos de seção e contato usam a mesma família editorial. A regra ampla de parágrafos do hero de projetos foi limitada ao texto introdutório para não aumentar legendas e diagramas. Cards isolados aproveitam a largura disponível no desktop; diagramas e itens de competências se reorganizam em telas pequenas. Na timeline mobile, rótulos e informações ficam empilhados para que as responsabilidades ocupem a largura disponível. Controles principais têm áreas de 44 px, campos de pesquisa usam 16 px e o foco acompanha o contraste da superfície.

A posição da escultura deriva da área de arte efetiva, em vez de um deslocamento fixo em `svh`. Transformações de entrada que prejudicavam o alinhamento foram removidas. O estágio permanece oculto até receber coordenadas; a presença de fundo nas páginas de leitura foi reduzida. Diálogos têm rolagem interna e alternativa de abertura do documento em outra aba.

## 5. Otimizações realizadas

- Remoção de `framer-motion`, `class-variance-authority`, `clsx` e `tailwind-merge`, após confirmar os consumidores. `Reveal` mantém seu HTML estático; a importação anterior não produzia uma entrada visual efetiva.
- Remoção do `Hero` antigo sem referências e do utilitário de classes cujo único consumidor restante pôde usar uma condição simples. Estilos históricos compartilhados foram preservados quando a remoção ampla aumentaria o risco da revisão.
- Captura NEXO: PNG de 510.766 bytes convertido em WebP de 41.792 bytes, redução de 91,8%. O PNG e o SVG social permanecem como fontes do processamento.
- Imagens com dimensões explícitas e carregamento tardio; fontes servidas localmente depois do build.
- WebGL separado do carregamento direto; preferência restaurada antes da sondagem; ausência de sondagem na visita em modo direto.
- Contextos de seleção isolados, renderização sob demanda, pausa em aba oculta e ausência de movimento contínuo nas páginas internas.
- Preview estático com compressão, tipos MIME corretos, cache e cabeçalhos equivalentes à configuração de hospedagem.
- ESLint ignora os relatórios gerados por Playwright, além dos artefatos de build e auditoria, evitando analisar código de ferramentas como código da aplicação.

### Orçamento da cena

| Qualidade | Vértices da fita | Triângulos da fita | DPR |
| --- | ---: | ---: | ---: |
| Mobile | 325 | 512 | 1 |
| Tablet | 707 | 1.200 | 1,15 |
| Desktop | 1.305 | 2.304 | 1,35 |

Os valores de topologia vêm do gerador: `(segmentos + 1) × (larguras + 1)` vértices e `segmentos × larguras × 2` triângulos. Há uma malha de fita, um material físico e três camadas auxiliares de linhas/pontos. Não há texturas remotas ou pós-processamento.

Instrumentação local de `drawElements`/`drawArrays` confirmou 2.304 triângulos no desktop e 512 no mobile. No portal desktop estabilizado foram observadas 31 chamadas de desenho em uma janela aproximada de um segundo, compatíveis com o temporizador de 30 Hz; após pausa, zero. No mobile estabilizado e no modo direto foram observadas zero chamadas na mesma janela. Esses números descrevem o cenário observado, não um limite universal de todas as transições.

Na visita desktop em modo direto foram observadas zero sondagens WebGL e 651.165 bytes de JavaScript decodificado; após ativar a cena, 1.587.801 bytes. A diferença confirma a separação de aproximadamente 937 KB do renderizador. Artefato local: `.qa/final/runtime-metrics.json`.

## 6. Acessibilidade

Foram corrigidos contraste, nomes acessíveis divergentes dos textos visíveis, alvos pequenos, foco, labels, controle de movimento e organização de leitura. O link de salto foca o `main`; menus e diálogos contêm e restauram foco, fecham por Escape e se adaptam à altura disponível.

O modo direto mantém o conteúdo integral e não inicia o renderizador numa visita nova. Sem JavaScript, há uma navegação HTML adicional, conteúdos profissionais e links de documentos; controles que dependem de script ficam ocultos. A pesquisa e os filtros não são simulados nesse cenário.

Quatro PDFs de DIO/Klabin são compostos por imagens e não fornecem texto selecionável. Nome, instituição, data e carga horária também estão no HTML. A geração de cópias acessíveis/OCR pode ser uma melhoria futura, preservando os originais emitidos.

A verificação automatizada cobre critérios A/AA de WCAG 2.0, 2.1 e 2.2 disponíveis no axe. Ela não equivale a uma declaração de conformidade integral. A referência de critérios é a [WCAG 2.2 do W3C](https://www.w3.org/WAI/WCAG22/quickref/).

## 7. Testes executados

Execução final em 16/10/2026: **120 testes aprovados**, zero falhas, zero testes ignorados e zero testes instáveis, em aproximadamente 198 segundos, com dois workers. Typecheck, ESLint, build e `git diff --check` também passaram. `npm audit` retornou zero vulnerabilidades conhecidas na consulta realizada.

| Grupo | Cobertura | Resultado |
| --- | --- | --- |
| Layout | Dez rotas × oito larguras: 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px | 80 verificações sem transbordamento detectado ou erro de execução |
| Acessibilidade das páginas | Dez rotas nos temas claro/escuro, incluindo regras WCAG 2.1 A | 20 cenários sem violações automáticas |
| Portal/menu | Oito larguras, posicionamento da cena, ativação mobile, Escape, foco e axe no menu | Oito cenários aprovados |
| Cena | Sete fases, renderização real e perda de contexto | Fallback e navegação preservados |
| Certificado em paisagem | Diálogo em 768 × 320 px | Fechamento e link alternativo acessíveis |
| Fluxos críticos | Menu por teclado, galeria/retorno, cursos e novos certificados, timeline/mapa, tema/pausa/modo, movimento reduzido, WebGL ausente, SEO/documentos/404 e ausência de JavaScript | Dez testes aprovados |

Uma checagem adicional percorreu 44 links internos, incluindo fragmentos, distribuídos por 20 caminhos: zero destinos inválidos. O clique real no download retornou `curriculo-leticia-de-paula.pdf` sem erro. Artefato local: `.qa/final/links.json`.

Foram capturadas e revisadas as dez páginas em 375 e 1440 px, além dos portais nas oito larguras, da cena ativa e do diálogo em altura reduzida. Capturas: `test-results/`; montagens e recortes de revisão: `.qa/final/`. As capturas de imagens tardias são feitas após sua entrada no viewport para evitar registrar placeholders como se fossem a tela final.

Resumo numérico versionado: [validacao-producao.json](validacao-producao.json). Relatório navegável dos testes: `playwright-report/index.html`. Evidências volumosas de laboratório permanecem locais e não fazem parte de `out/`.

Os PDFs foram extraídos e renderizados com PDF.js e canvas local, porque Python/Poppler não estavam disponíveis. Todas as páginas dos nove certificados e as duas páginas do currículo foram inspecionadas visualmente. Não foram encontrados anexos ou ações JavaScript; não foi identificado CPF ou telefone pessoal visível. A data do certificado de contribuição Open Source foi corrigida para 01/04/2026. O currículo conserva seu conteúdo e composição, com idioma `pt-BR`, título/autor corrigidos e links de GitHub/LinkedIn adicionados aos rótulos existentes.

Os dois PDFs recebidos em 16/10 foram incorporados: Desenvolvedor Profissional (Versátil TI, 240 h, conclusão em 30/04/2026, emissão em 12/05/2026) passou de `A validar` para `Concluído`; Introdução à Análise de Dados — Microsoft Power BI (Fundação Bradesco/Escola Virtual, 5 h, conclusão em 17/09/2026) foi acrescentado como curso distinto do certificado DIO. Na cópia pública da Fundação Bradesco, os operadores de texto do rodapé de impressão foram removidos do conteúdo do PDF, não apenas cobertos: a URL com identificador e parâmetro do portal não é distribuída. O certificado, o QR e o código de autenticidade continuam legíveis; os originais permanecem intactos fora de `public/`.

O perfil GitHub e os dois repositórios públicos foram consultados. A base do NEXO está no repositório; a afirmação antiga de repositório vazio foi removida. O LinkedIn respondeu 999 ao acesso automatizado e continua marcado como link informado, sujeito à conferência manual.

## 8. Resultados reais de performance

Metas de referência: LCP ≤ 2,5 s; CLS ≤ 0,1; INP ≤ 200 ms.

Ambiente: máquina de desenvolvimento Windows, Node.js 24.13.0, npm 11.6.2, Chromium 153 headless, Lighthouse 13.5.0, axe 4.14.0 e Playwright 1.64.1. O build exportado foi servido em `127.0.0.1:4173`, com gzip e cache para os assets versionados. Lighthouse foi executado depois dos testes, sem rodar a suíte simultaneamente. Em 16/10/2026 foram realizadas três visitas novas por perfil e calculadas as medianas, sem descartar a execução mobile mais lenta.

Perfil mobile: viewport emulado de 412 × 823 px, DPR 1,75, rede simulada de 1.638,4 Kbps/RTT 150 ms e CPU 4×. Perfil desktop: configuração oficial `desktop-config` do Lighthouse, viewport 1350 × 940 px, DPR 1, rede simulada de 10.240 Kbps/RTT 40 ms e CPU 1×. Esses perfis não representam teste em aparelhos físicos ou em macOS/iOS.

| Medição | Antes: mobile, uma execução | Depois: mobile, mediana de três | Depois: desktop, mediana de três |
| --- | ---: | ---: | ---: |
| Desempenho Lighthouse | 54/100 | 92/100 (79–93) | 100/100 (99–100) |
| LCP | 3,371 s | 2,945 s | 0,611 s |
| CLS | 0 | 0 | 0 |
| TBT | 1.939 ms | 180 ms | 56,5 ms |
| Acessibilidade Lighthouse | — | 100/100 | 100/100 |
| SEO Lighthouse | — | 100/100 | 100/100 |

LCP mobile variou entre 2,930 e 3,219 s; desktop, entre 0,591 e 0,647 s. TBT mobile variou entre 130 e 420 ms; desktop, entre 18,5 e 71,5 ms. CLS foi zero nas seis execuções finais. A variação entre visitas reforça o caráter de laboratório dessas medições, que não foram executadas em hardware dedicado.

O JavaScript decodificado da visita inicial mobile caiu de 1.720.111 para 629.542 bytes, redução de 63,4%. A transferência total observada caiu de 606.072 para 314.586 bytes, redução de 48,1%. Esse cenário mobile mostra o SVG inicial; a ativação opcional do 3D foi verificada separadamente com renderização real.

**A meta de LCP mobile ainda não foi atingida neste perfil de laboratório.** O título do portal foi identificado como elemento de LCP. Reduzir o custo de layout/hidratação inicial e revisar a estratégia de fontes são prioridades de uma próxima rodada de performance. A meta de CLS foi atendida nestes ensaios; métricas de campo continuam sem validação.

Relatórios completos JSON e HTML: `.qa/performance-final/mobile-1` a `mobile-3` e `desktop-1` a `desktop-3`. As configurações e os resultados individuais também constam no resumo JSON versionado.

A linha de base, antes das correções, teve uma execução mobile: desempenho 54/100, LCP 3,371 s, CLS 0 e TBT 1.939 ms. É uma amostra única, portanto não constitui uma distribuição estatística de desempenho anterior.

O teste local de interações confiáveis de teclado/ponteiro registrou eventos de até 72 ms no fluxo de filtros da home em modo direto, sem limitação artificial de CPU/rede. Esse é um resultado de Event Timing para aquele fluxo; **não é INP de campo** e não comprova a meta de 200 ms para visitantes reais.

## 9. Pendências e limites

### Informações externas

- Confirmar domínio definitivo e valor de `NEXT_PUBLIC_SITE_URL` antes de publicar.
- Conferir manualmente o LinkedIn, bloqueado para consulta automatizada.
- Atualizar situação acadêmica e vínculo profissional quando houver informação nova; cursos sem comprovante permanecem como `A validar`.
- Obter autorização documental antes de acrescentar qualquer projeto corporativo.
- Medir INP e outros dados de campo após publicação e tráfego real, conforme uma estratégia de coleta aprovada.

### Melhorias opcionais

- Revisão com leitor de tela e aparelhos reais; os testes desta entrega usam Chromium local.
- PDFs com texto pesquisável e estrutura acessível para os certificados de imagem, mantendo a origem dos documentos clara.
- CSP por hashes no build para reduzir a necessidade atual de scripts inline permitidos ao Next.js estático.
- Capturas e demonstrações adicionais de projetos quando estiverem disponíveis e autorizadas.

### Pendência técnica de performance

O LCP mobile de laboratório permanece cerca de 445 ms acima da meta de 2,5 s. Não há falha funcional crítica conhecida nos cenários executados; isso não encerra a meta de performance nem substitui medições reais após hospedagem. A entrega está validada para a próxima etapa de preview, com essa pendência explícita, e não é classificada como cumprimento integral dos critérios de produção. Nenhuma publicação foi executada para validar CDN, domínio ou configuração real do provedor.

## 10. Publicação

O procedimento completo está no README. A configuração versionada usa o preset Next.js, comando `npm run build`, saída `out`, barras finais e cabeçalhos de segurança/cache. O preview local escuta apenas em `127.0.0.1:4173`; é uma ferramenta de validação.

Depois de autorização explícita, criar um preview na Vercel com Node.js 24 e a origem pública escolhida. Conferir URLs internas, navegação client-side, PDF, diálogos, metadados, sitemap, robots e 404; repetir as medições na hospedagem antes de promover a produção. Para outro host estático, servir `diretorio/index.html`, preservar segmentos `.txt` de navegação e retornar `404.html` com status 404 para endereços ausentes.

A configuração foi conferida com a [documentação de projetos da Vercel](https://vercel.com/docs/project-configuration). As convenções do framework foram lidas na documentação da versão instalada em `node_modules/next/dist/docs/`.
