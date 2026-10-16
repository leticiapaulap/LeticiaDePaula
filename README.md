# NEXO — A Arquitetura das Ideias

Portfólio profissional de Letícia de Paula. O conceito NEXO conecta trajetória, projetos, competências e formação por meio de uma composição editorial e uma fita procedural em 3D. O conteúdo profissional é HTML estático e pode ser consultado por URL, por mecanismos de busca e sem WebGL.

Esta entrega refina a implementação das etapas anteriores. A auditoria, os resultados de testes e os limites de publicação estão em [docs/auditoria-producao.md](docs/auditoria-producao.md). O histórico técnico da experiência está em [docs/etapa-3.md](docs/etapa-3.md).

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
components/                Seções profissionais e controles
  portal/                  Portal, SVG, carregador e cena 3D
lib/                       Conteúdo tipado, relações e máquina de estados
public/                    Imagens públicas, currículo e nove certificados
scripts/                   Preview, normalização, imagens e Lighthouse
tests/                     Testes de rotas, acessibilidade e experiência
docs/                      Auditoria e documentação técnica
vercel.json                Build, diretório público, cache e cabeçalhos
```

Server Components e dados tipados geram as páginas HTML no build. Client Components atendem filtros, pesquisa, preferências e navegação imersiva. `ExperienceProvider` coordena fases e seleções; um contexto separado de seleções evita atualizar as listas quando só a cena ou as preferências mudam. O renderizador não controla a disponibilidade do conteúdo.

A escultura tem sete estados: Portal, Núcleo, Projetos, Experiência, Competências, Formação e Convergência. Os alvos compartilham topologia e são interpolados na GPU. A cena fica ancorada à área de arte do portal, tem presença discreta nas páginas internas e é ocultada no modo direto.

| Rota | Conteúdo |
| --- | --- |
| `/` | Portal, exploração e todas as seções profissionais |
| `/sobre/` | Apresentação, princípios e fontes |
| `/projetos/` | Galeria, filtros e estados vazios |
| `/projetos/festa-fantasia/` | Estudo de caso do projeto público |
| `/projetos/portfolio-leticia-de-paula/` | Estudo de caso do NEXO |
| `/experiencia/` | Cargos, períodos e atividades informados no currículo |
| `/competencias/` | Conhecimentos e relações documentadas com projetos |
| `/formacao/` | Formação acadêmica, 19 cursos, filtros e nove PDFs |
| `/contato/` | E-mail e perfis profissionais |
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

### Certificações e formação

Edite `lib/certifications.ts`: nome, instituição, área, carga horária, data de conclusão, status, nota editorial e prioridade. Somente um documento real deve receber `certificateUrl`, apontando para `public/certificates/`. Sem comprovante, use `A validar`; estudos em curso usam `Em andamento`.

A pesquisa ignora acentos e combina nome, instituição e área. Verifique os filtros, o diálogo e o link direto ao PDF depois de adicionar um arquivo. Os certificados atuais foram renderizados e conferidos; a conclusão de “Contribuindo em um Projeto Open Source no GitHub” é 01/04/2026, conforme o documento.

Os documentos recebidos em 16/10/2026 comprovam “Desenvolvedor Profissional”, Versátil TI, 240 h, concluído em 30/04/2026 (emissão em 12/05/2026), e “Introdução à Análise de Dados — Microsoft Power BI”, Fundação Bradesco, 5 h, concluído em 17/09/2026. O segundo é distinto do curso de BI da DIO. Na cópia pública da Fundação Bradesco foi removido o texto do rodapé com o endereço de impressão do portal e seus parâmetros; o conteúdo do certificado, QR e código de autenticidade foram preservados. Os originais fornecidos não foram modificados.

Atualize a formação acadêmica em `lib/education.ts` e as fontes em `lib/content-audit.ts`. A conclusão prevista no currículo não deve ser tratada como conclusão efetiva.

### Currículo e contato

Atualize `lib/profile.ts`, `lib/experiences.ts`, `lib/education.ts` e `lib/skills.ts`; o currículo HTML usa esses dados. Substitua `public/curriculo-leticia-de-paula.pdf` por uma cópia pública revisada. Revise o PDF separadamente: ele não é gerado automaticamente a partir do HTML. O arquivo atual tem duas páginas e não contém o telefone pessoal do currículo original.

Atualize os perfis em `lib/profile.ts` e `lib/social-links.ts`, mantendo-os consistentes. Links em documentos anexos também precisam de revisão. O PDF desta entrega tem idioma e metadados em português e links ativos de e-mail, GitHub e LinkedIn.

## Acessibilidade

O conteúdo relevante permanece fora do canvas. Há links de salto, landmarks, headings, labels, foco visível, navegação por teclado, alvos maiores, contraste por superfície e suporte a `prefers-reduced-motion`. Menu e certificados têm contenção e restauração de foco, fechamento por Escape e acesso direto aos PDFs.

O modo direto evita inicializar WebGL em uma visita nova. A indisponibilidade de WebGL, falha do renderizador ou perda de contexto mantém o fallback SVG e a navegação. Sem JavaScript, uma navegação HTML adicional e os links de documentos continuam disponíveis; filtros e controles que exigem scripts ficam ocultos.

Axe testa critérios automatizáveis de WCAG 2.2 AA. Isso não é certificação de conformidade: ainda é recomendada uma revisão humana com leitor de tela e aparelhos reais. Quatro certificados DIO/Klabin são PDFs de imagem; nome, instituição, data e carga horária também estão disponíveis no HTML.

## Performance e imagens

- Exportação estática e divisão de código por rota.
- Importação separada de WebGL, após restauração de preferências, visibilidade e tempo ocioso. No portal mobile, o SVG aparece imediatamente e o botão “Ativar cena 3D” permite optar pelo renderizador; entrar na exploração também o habilita.
- Renderização sob demanda, pausa de aba oculta e de modo direto; movimento contínuo somente no portal/núcleo da home em desktop, limitado a aproximadamente 30 atualizações por segundo. Páginas internas só mantêm uma cena já ativada ou a carregam por escolha explícita do visitante.
- Geometria e pixel ratio por dispositivo; sem texturas remotas nem pós-processamento.
- SVG imediato, texto sem animação de entrada e dimensões explícitas nas capturas.
- Captura NEXO em WebP, imagens abaixo da dobra com lazy loading e fontes locais após o build.
- Cache imutável somente para arquivos versionados em `/_next/static/`; documentos de nome estável podem ser atualizados a cada publicação.

`npm run assets` recria `public/og-leticia.png` a partir do SVG e `public/projects/nexo-portal.webp` a partir do PNG original. Os originais são fontes do processamento e foram preservados.

Metas: LCP ≤ 2,5 s; CLS ≤ 0,1; INP ≤ 200 ms. Consulte as medições reais e suas condições em [docs/auditoria-producao.md](docs/auditoria-producao.md). TBT de Lighthouse não é INP; métricas de campo precisam de tráfego real.

## Testes e auditorias

```bash
npx playwright install chromium
npm run build
npm test
npm run test:report
npm audit
```

Playwright serve `out/` e verifica dez rotas em 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px; testa contraste nos dois temas, menu, foco, filtros, busca, estados vazios, documentos, SEO, 404 e fallback. Os testes imersivos conferem a posição da arte, fases e perda de contexto. Screenshots e traces ficam em `test-results/`; o relatório HTML fica em `playwright-report/`.

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

O LinkedIn informado responde com bloqueio a acesso automatizado e precisa de conferência manual. A demonstração antiga de Festa Fantasia não é anunciada porque o destino anteriormente verificado não correspondia ao projeto. Cursos sem certificado permanecem marcados; a situação acadêmica, o vínculo profissional atual e futuros documentos dependem de atualização da proprietária. Nenhum resultado, diploma, vaga ou vínculo foi inventado.
