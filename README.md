# Letícia de Paula — Portfólio profissional

Portfólio profissional de Letícia de Paula. A abertura apresenta uma galeria 3D de projetos reais, com capturas de suas interfaces e acesso aos estudos de caso. Os capítulos conectam trajetória, competências e formação. Grafite, marfim e champanhe, tipografia editorial e navegação acessível formam a identidade visual. A única marca pública é o nome profissional. O conteúdo é HTML estático e pode ser consultado por URL, mecanismos de busca e sem WebGL.

Esta entrega evolui a implementação existente, sem reconstrução. A hero e os controles atuais estão documentados em [docs/hero-galeria-projetos.md](docs/hero-galeria-projetos.md). As revisões anteriores permanecem em [docs/navegacao-capitulos.md](docs/navegacao-capitulos.md), [docs/pos-revisao.md](docs/pos-revisao.md) e [docs/refinamento-pessoal.md](docs/refinamento-pessoal.md). Pendências e fontes de conteúdo ficam em [docs/conteudo-interno.md](docs/conteudo-interno.md), não na interface. Os relatórios anteriores preservam os resultados das versões que mediram.

## Tecnologias

- Next.js 16.4 App Router, React 19.3 e TypeScript 6.
- Tailwind CSS 4 e CSS com tokens próprios de cor, tipografia, espaço e movimento.
- Three.js e React Three Fiber, carregados dinamicamente e com renderização sob demanda.
- Radix Dialog para menus e certificados; Radix Tooltip, next-themes e Lucide React.
- Playwright, axe-core e Lighthouse para validação do build exportado.
- Sharp para preparar a imagem social PNG e a captura WebP.

Manrope e Instrument Serif são processadas por `next/font` e servidas localmente no site publicado. A primeira compilação precisa de acesso à rede para obter as fontes.

## Instalação e execução

Ambiente validado: Windows, Node.js 24.13.0 e npm 11.6.2. As ferramentas de auditoria exigem Node.js 22.19 ou superior; recomenda-se Node.js 24.

```bash
npm ci
npm run dev
```

Desenvolvimento: `http://localhost:3000`. No PowerShell, use `npm.cmd` e `npx.cmd` se a política do sistema bloquear os scripts `.ps1`.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

O build produz `out/`. O preview de produção está em `http://127.0.0.1:4173`; `npm start` executa o mesmo servidor estático. Para outra porta, defina `PORT`. O servidor local escuta apenas em `127.0.0.1` e não é um servidor de hospedagem pública.

Use sempre `npm run build`: o pós-processamento normaliza os segmentos estáticos de navegação produzidos no Windows por esta versão do Next.js. O comando também funciona quando não há caminhos a normalizar.

## Configuração

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL` à origem HTTPS definitiva, conforme o domínio configurado na hospedagem. O valor padrão mantém o endereço já presente no projeto; não pressupõe que esta nova entrega esteja publicada nele.

Essa variável pública é usada no build para canonical, Open Graph, sitemap, robots e JSON-LD. Aceita uma origem HTTP/HTTPS sem caminho, query, fragmento ou credenciais. Ao mudar o domínio, gere outro build. Nenhuma chave secreta é necessária.

O modo de leitura, a pausa de animação e o tema são preferências locais do navegador. Não há formulário que envie mensagens, backend de contato, cookies de rastreamento ou serviço de analytics nesta implementação. Links de contato abrem e-mail, GitHub ou LinkedIn.

## Arquitetura e estrutura

```text
app/                       Rotas, layout, metadados, sitemap, robots e 404
  projetos/[slug]/         Estudos de caso gerados no build
  globals.css              Tokens e estilos editoriais
  experience.css           Interação, responsividade, foco e impressão
  refinements.css          Acabamento visual e navegação por capítulos
  chapters.css             Composições, transições e controles dos capítulos
  hero.css                 Galeria de projetos, composição inicial e moldura do retrato
components/                Seções profissionais e controles
  chapter-transition.tsx   Transições de rota com React ViewTransition
  experience-navigation.tsx Navegação entre capítulos e modo de leitura
  portal/                  Portal, SVG, carregador e cena 3D
    hero-project-gallery.tsx Capturas, seleção acessível e links da abertura
    project-gallery-scene.tsx Telas reais em perspectiva no canvas compartilhado
lib/                       Conteúdo tipado, relações e máquina de estados
  chapters.ts              Ordem, URLs, títulos e motivos dos sete capítulos
public/                    Imagens públicas, currículo e nove certificados
scripts/                   Preview, normalização, imagens e Lighthouse
tests/                     Testes de rotas, acessibilidade e experiência
docs/                      Auditoria e documentação técnica
vercel.json                Build, diretório público, cache e cabeçalhos
```

Server Components e dados tipados geram as páginas HTML no build. Client Components atendem filtros, pesquisa, preferências e navegação imersiva. `ExperienceProvider` coordena fases e seleções; um contexto separado de seleções evita atualizar as listas quando só a cena ou as preferências mudam. O renderizador não controla a disponibilidade do conteúdo.

Um único canvas acompanha as rotas. Na abertura, ele exibe duas telas de projetos com capturas reais, molduras físicas, iluminação e seleção por clique. A escultura anterior permanece como apoio nas páginas internas, com alvos que compartilham topologia e são interpolados na GPU; ela não é renderizada na hero, nem como fallback. No celular, a galeria usa uma captura por vez em HTML e não inicia WebGL. Modo direto e movimento reduzido também mantêm a galeria em HTML.

Cada capítulo é uma rota HTML independente, carregável e compartilhável. A navegação mantém entradas reais no histórico do navegador, inclui anterior/próximo, seleção direta, teclado e gesto horizontal opcional no mobile. A rolagem não é capturada: timelines, galerias, competências e documentos extensos permanecem acessíveis em fluxo natural.

Os controles ficam em uma linha discreta de 56 px no fluxo abaixo do header, com número, nome atual, progresso fino, anterior e próximo com o nome do destino. O último capítulo oferece retorno ao início. Não há dropdown nem chamada separada de próximo capítulo. O menu principal contém os sete links diretos. Setas e gestos entre capítulos ficam desativados em controles internos, diálogos, galerias, estudos de caso e currículo. O foco acompanha o título após navegar; Escape no menu restaura o foco ao botão. As transições usam Next.js 16.4 e React 19.3, com dissolução no histórico e animações simplificadas no celular. Pausa e movimento reduzido desativam também as animações dos snapshots de navegação.

| Rota | Conteúdo |
| --- | --- |
| `/` | 01 — Apresentação |
| `/sobre/` | 02 — Sobre mim, princípios e fotografia opcional |
| `/projetos/` | 03 — Galeria, filtros e estados vazios |
| `/projetos/festa-fantasia/` | Estudo de caso do projeto público |
| `/projetos/organizador-de-tarefas/` | Finanzy, versão atual do organizador pessoal |
| `/projetos/senappen-recebimentos/` | Visão geral do portal privado da SENAPPEN |
| `/projetos/dio-lab-open-source/` | Fork educacional do laboratório da DIO |
| `/projetos/portfolio-leticia-de-paula/` | Estudo de caso do portfólio pessoal |
| `/experiencia/` | 04 — Cargos, períodos e atividades da trajetória |
| `/competencias/` | 05 — Conhecimentos e relações documentadas com projetos |
| `/formacao/` | 06 — Formação, cursos, filtros e certificados |
| `/contato/` | 07 — E-mail e perfis profissionais |
| `/curriculo/` | Currículo digital indexável e imprimível |
| URL desconhecida | Página 404 com caminhos para continuar |

## Atualizar conteúdo

Os arquivos em `lib/` são a fonte da interface. Preserve a diferença entre informação declarada no currículo, evidência em código e documento anexado.

### Projetos

1. Adicione um objeto compatível com `Project` em `lib/projects.ts`, com `id` e `slug` únicos.
2. Preencha contexto, problema, solução, tecnologias, arquitetura, aprendizados e fontes reais.
3. Inclua um link `type: "case"` apontando para `/projetos/SEU-SLUG/`. Links GitHub e demonstrações devem existir e corresponder ao projeto.
4. Para uma captura autorizada, coloque o arquivo em `public/projects/` e adicione `src`, `alt` e `caption` em `screenshots`. Os diagramas são identificados como diagramas.
5. Associe competências em `lib/skills.ts` apenas quando o projeto documentar seu uso.
6. Gere o build; `generateStaticParams` e o sitemap incluem o novo projeto automaticamente.

Categorias sem projetos têm estados vazios reais. Não publique fluxos, nomes de sistemas, resultados ou código corporativo sem autorização.

Os três projetos adicionais foram incluídos a pedido da autora, com fontes e limites registrados em [docs/projetos-adicionais.md](docs/projetos-adicionais.md). Projetos não públicos não recebem botões de repositório ou demo. Sem uma captura autorizada, cada projeto mostra um diagrama editorial próprio; não são simuladas interfaces. A galeria 3D da abertura continua usando apenas as duas capturas reais já disponíveis.

### Certificações e formação

Edite `lib/certifications.ts`: nome, instituição, área, carga horária, data de conclusão, status e prioridade. Somente um documento real deve receber `certificateUrl`, apontando para `public/certificates/`. Estudos em curso usam `Em andamento`, sem botão de visualização. Cursos cuja conclusão ainda não está confirmada ficam em `docs/conteudo-interno.md`, não recebem status de concluídos e não aparecem como pendências na biblioteca pública.

A pesquisa ignora acentos e combina nome, instituição e área. Verifique os filtros, o diálogo e o link direto ao PDF depois de adicionar um arquivo. Os certificados atuais foram renderizados e conferidos; a conclusão de “Contribuindo em um Projeto Open Source no GitHub” é 01/04/2026, conforme o documento.

Os documentos recebidos em 16/10/2026 comprovam “Desenvolvedor Profissional”, Versátil TI, 240 h, concluído em 30/04/2026 (emissão em 12/05/2026), e “Introdução à Análise de Dados — Microsoft Power BI”, Fundação Bradesco, 5 h, concluído em 17/09/2026. O segundo é distinto do curso de BI da DIO. Na cópia pública da Fundação Bradesco foi removido o texto do rodapé com o endereço de impressão do portal e seus parâmetros; o conteúdo do certificado, QR e código de autenticidade foram preservados. Os originais fornecidos não foram modificados.

Atualize a formação acadêmica em `lib/education.ts` e as fontes em `lib/content-audit.ts`. A conclusão prevista no currículo não deve ser tratada como conclusão efetiva.

### Currículo e contato

Atualize `lib/profile.ts`, `lib/experiences.ts`, `lib/education.ts` e `lib/skills.ts`; o currículo HTML usa esses dados. Substitua `public/curriculo-leticia-de-paula.pdf` por uma cópia pública revisada. Revise o PDF separadamente: ele não é gerado automaticamente a partir do HTML. O arquivo atual tem duas páginas e não contém o telefone pessoal do currículo original.

Atualize os perfis em `lib/profile.ts` e `lib/social-links.ts`, mantendo-os consistentes. Links em documentos anexos também precisam de revisão. O PDF desta entrega tem idioma e metadados em português e links ativos de e-mail, GitHub e LinkedIn.

## Acessibilidade

O conteúdo relevante permanece fora do canvas. Há links de salto, landmarks, headings, labels, foco visível, navegação por teclado, alvos maiores, contraste por superfície e suporte a `prefers-reduced-motion`. Menu e certificados têm contenção e restauração de foco, fechamento por Escape e acesso direto aos PDFs.

O modo direto evita inicializar WebGL em uma visita nova. Indisponibilidade de WebGL, falha do renderizador ou perda de contexto preservam as capturas HTML na abertura e o SVG nas páginas internas. Sem JavaScript, uma navegação HTML adicional, capturas, estudos de caso e links de documentos continuam disponíveis; filtros e controles que exigem scripts ficam ocultos.

Axe testa critérios automatizáveis de WCAG 2.2 AA. Isso não é certificação de conformidade: ainda é recomendada uma revisão humana com leitor de tela e aparelhos reais. Quatro certificados DIO/Klabin são PDFs de imagem; nome, instituição, data e carga horária também estão disponíveis no HTML.

## Performance e imagens

- Exportação estática e divisão de código por rota.
- Importação separada de WebGL, após restauração de preferências, visibilidade e tempo ocioso. A abertura mobile usa as capturas HTML e não carrega o renderizador.
- Renderização sob demanda, com pausa em aba oculta, fora da área visível e no modo direto; a galeria desktop é limitada a aproximadamente 24 atualizações por segundo. Os capítulos internos preservam seus estados da escultura e a ativação mobile explícita pelo modo imersivo. Movimento reduzido usa imagens HTML ou SVG sem iniciar WebGL.
- Geometria e pixel ratio por dispositivo; sem texturas remotas nem pós-processamento.
- Capturas HTML imediatas na abertura, SVG nas páginas internas e dimensões explícitas nas imagens. Animações de entrada do corpo preservam opacidade e contraste dos textos e ações.
- Capturas reais em WebP, imagens abaixo da dobra com lazy loading e fontes locais após o build.
- Cache imutável somente para arquivos versionados em `/_next/static/`; documentos de nome estável podem ser atualizados a cada publicação.

`npm run assets` recria a imagem social PNG e as capturas WebP a partir das fontes preservadas em `public/`. A captura atual do Festa Fantasia foi fornecida por Letícia de Paula e o mapa de competências foi capturado do próprio portfólio, sem simular interfaces. A imagem antiga `nexo-portal` permanece como fonte histórica e não aparece na hero.

Metas: LCP ≤ 2,5 s; CLS ≤ 0,1; INP ≤ 200 ms. Consulte as medições reais e suas condições em [docs/refinamento-pessoal.md](docs/refinamento-pessoal.md). TBT de Lighthouse não é INP; métricas de campo precisam de tráfego real.

## Testes e auditorias

```bash
npx playwright install chromium
npm run build
npm test
npm run test:report
npm audit
```

Playwright serve `out/` e verifica treze rotas em 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px; testa contraste nos dois temas, menu, foco, filtros, busca, estados vazios, documentos, SEO, 404 e fallback. Os testes imersivos conferem a posição da arte, fases e perda de contexto. O catálogo também tem testes específicos de acesso, histórico, seleção, privacidade, atribuição do fork e diagramas. Screenshots e traces ficam em `test-results/`; o relatório HTML fica em `playwright-report/`.

Se precisar usar um Chromium existente, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` com o caminho absoluto do executável. Esse ajuste é opcional e não é incluído no bundle.

Para Lighthouse, execute `npm run preview` em um terminal e, em outro:

```bash
npm run audit:performance
```

O script realiza três execuções mobile e três desktop, com relatórios JSON/HTML em `.qa/performance/`. Defina `CHROME_PATH` se o Chrome não for detectado; `NEXO_AUDIT_URL` altera o alvo e `NEXO_AUDIT_OUTPUT` altera a pasta dos relatórios. Execute sem outros testes concorrentes para reduzir interferência. A medição padrão usa a home imersiva em uma visita nova.

## Segurança e privacidade

Somente `out/` é publicado. Arquivos de ambiente, IDE, testes, relatório local e o repositório `.git` não fazem parte do diretório servido. O código não necessita de credenciais e os links externos usam `noreferrer`. Os documentos públicos foram inspecionados para conteúdo, anexos e JavaScript embutido.

`vercel.json` define proteção contra sniffing, restrição de enquadramento à mesma origem, política de referência, bloqueio de câmera/microfone/geolocalização e CSP compatível com os scripts inline do Next.js estático. O preview usa esses mesmos cabeçalhos para validá-los localmente. Uma CSP baseada em hashes pode ser uma evolução futura; não há geração de nonce de servidor no export estático.

## Deploy na Vercel

Esta entrega não executa publicação externa.

1. Confirme o domínio público e os dados profissionais ainda pendentes de atualização. Faça a revisão final dos PDFs que serão distribuídos.
2. Configure um projeto na Vercel a partir do repositório que você autorizar publicar. Use Node.js 24 e o preset Next.js.
3. Configure `NEXT_PUBLIC_SITE_URL` com a origem HTTPS pública escolhida para esse ambiente.
4. O arquivo `vercel.json` usa `npm run build` e diretório de saída `out`. Mantenha o pós-processamento dos segmentos estáticos.
5. Após autorização para publicar, crie um preview e teste navegação client-side, acesso direto a uma rota interna, PDF, diálogo, assets, `robots.txt`, `sitemap.xml`, canonical e 404 real.
6. Repita Lighthouse no domínio hospedado; compressão, CDN e hardware do visitante afetam os resultados.
7. Promova a produção somente após revisar o preview. Ao trocar domínio, atualize a variável e refaça o build.

Em outro host estático, publique exclusivamente `out/`, preserve as barras finais, sirva `diretorio/index.html` e use `404.html` para endereços ausentes com status HTTP 404. Não use fallback geral para `index.html`, pois isso mascara erros e prejudica SEO. Replique os cabeçalhos de `vercel.json` e habilite HTTPS e compressão no host.

## Pendências externas

O LinkedIn informado precisa de conferência manual. A demonstração de Festa Fantasia foi revisitada: a URL configurada no repositório redireciona à aplicação pública com tema Halloween; a página e a API de configurações responderam com sucesso em 16/10/2026. Captura e contexto de publicação estão registrados na auditoria. Não foram enviados cadastros ou votos. Situação acadêmica, vínculo atual e futuros documentos dependem de atualização da proprietária. Nenhum resultado, diploma, vaga ou vínculo foi inventado.

## Fotografia pessoal

`components/professional-portrait.tsx` está integrado à seção Sobre de forma opcional. Configure `portrait` em `lib/portrait.ts` somente após receber uma fotografia real e autorizada: `src`, texto alternativo, `width`, `height` e legenda opcional. Use um caminho local em `public/` e as dimensões verdadeiras da imagem. Com `null`, não há espaço vazio, imagem substituta nem download remoto.

A fotografia usa largura fluida, altura automática e `object-fit: contain`, sem recorte, filtros de rosto ou alteração de proporções. A profundidade é criada pela moldura com perspectiva CSS, luz discreta e sombras, preservando integralmente os pixels da fotografia. No mobile e com movimento reduzido, o tratamento espacial é simplificado. Nenhuma fotografia foi criada ou alterada nesta revisão; `portrait` permanece `null` até o recebimento do arquivo autorizado. Conferir pose, rosto, tatuagens, roupa, acessórios e enquadramento com a proprietária antes de publicar.
