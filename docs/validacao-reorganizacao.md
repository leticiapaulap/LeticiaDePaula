# Validação da reorganização do portfólio

Verificação concluída em **10/11/2026**, no repositório `C:/Users/leticia.pereira/IdeaProjects/LeticiaDePaula`, usando Node.js 24.19.0 e as dependências existentes. O guia de manutenção é [MAPA_DO_PROJETO.md](MAPA_DO_PROJETO.md), com a árvore completa e a seção **ONDE ALTERAR CADA COISA?**.

## Estado encontrado e preservação do trabalho

A estrutura funcional e o mapa já estavam presentes como alterações locais não commitadas no início desta verificação. Esse trabalho foi preservado e auditado, sem refazer as movimentações. Nesta verificação foram acrescentados este relatório e sua referência no mapa; nenhuma correção de comportamento foi necessária.

A referência anterior à reorganização é o commit `5e7e3f7` e o snapshot local `.qa/reorganizacao/source-before.json`: os 97 arquivos desse snapshot correspondem ao commit, desconsiderando apenas finais de linha. Um segundo snapshot, `.qa/reorganizacao/revalidacao-2026-11-10/source-start.json`, preserva os arquivos encontrados nesta sessão antes da atualização da documentação.

Não foram feitos commit, deploy, alterações de dependências ou regeneração de imagens. Builds e testes atualizaram somente suas saídas habituais; `next-env.d.ts` é gerado automaticamente pelo Next.js.

## Estrutura antes e depois

```text
ANTES                                  DEPOIS
app/                                   app/ — mesmas páginas e rotas
  páginas e 11 folhas CSS               styles/ — CSS por área, mesma cascata
components/                            components/
  componentes no mesmo nível             pagina-inicial/fotografia/
  portal/ — hero e cenas anteriores       pagina-inicial/mini-leticia/
                                         navegacao/, rodape/, sobre/
                                         projetos/, experiencia/, competencias/
                                         formacao/, contato/, curriculo/
                                         compartilhados/, legado/
lib/                                   data/ — conteúdo por funcionalidade
  conteúdo, lógica e cenas antigas        projetos/ — catálogo e seis cadastros
  projects.ts — seis projetos           lib/ — navegação, competências, SEO e legado
tests/                                 tests/
  specs no mesmo nível                   pagina-inicial/, navegacao/
  helpers/                               projetos/, portfolio/, auxiliares/
public/                                public/ — mesmos arquivos e URLs
scripts/ e configurações                scripts/ e configurações — preservados
docs/                                  docs/ — mapa e relatório de validação
```

Os nomes funcionais usam português sem acentos e kebab-case. Convenções do framework, identificadores TypeScript, classes CSS e endereços públicos foram preservados. Assets mantêm os diretórios publicados `images/`, `projects/` e `certificates/` para conservar as URLs existentes.

## Principais arquivos movidos ou renomeados

| Caminho anterior | Caminho atual |
| --- | --- |
| `components/portal/portal-hero.tsx` | `components/pagina-inicial/apresentacao-inicial.tsx` |
| `components/portal/hero-portrait.tsx` | `components/pagina-inicial/fotografia/fotografia-principal.tsx` |
| `components/portal/hero-miniature.tsx` | `components/pagina-inicial/mini-leticia/mini-leticia-animada.tsx` |
| `components/header.tsx` | `components/navegacao/menu-lateral.tsx` |
| `components/footer.tsx` | `components/rodape/rodape.tsx` |
| `components/profile-section.tsx` | `components/sobre/apresentacao-profissional.tsx` |
| `components/project-explorer.tsx` | `components/projetos/catalogo-projetos.tsx` |
| `components/experience-section.tsx` | `components/experiencia/experiencia-profissional.tsx` |
| `components/skills-section.tsx` | `components/competencias/secao-competencias.tsx` |
| `components/education-section.tsx` | `components/formacao/formacao-academica.tsx` |
| `components/contact-section.tsx` | `components/contato/secao-contato.tsx` |
| `lib/projects.ts` | `data/projetos/catalogo.ts` e seis arquivos individuais de projetos |
| `lib/portrait.ts` | `data/pagina-inicial/fotografias.ts` |
| `lib/profile.ts` | `data/perfil/perfil-profissional.ts` |
| `app/hero-portrait.css` | `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css` |
| `app/navigation-layout.css` | `styles/navegacao/menu-lateral-e-layout.css` |
| `tests/hero-miniature.spec.ts` | `tests/pagina-inicial/mini-leticia.spec.ts` |

O inventário local completo contém 82 correspondências em `.qa/reorganizacao/movements.json`. O catálogo importa um cadastro por projeto; não houve duplicação de conteúdo. SENAPPEN permanece como único projeto com `featured: true`, com destaque principal. A Agenda Executiva conserva seu cadastro, capa, capturas e links.

## Resultados das verificações

| Verificação executada | Resultado |
| --- | --- |
| `npm.cmd run typecheck` | Aprovado; saída 0 |
| `npm.cmd run lint` | Aprovado; saída 0, sem avisos do ESLint |
| `npm.cmd run build` | Aprovado; exportação estática e normalização de segmentos concluídas |
| `npm.cmd test` | 266 aprovados em aproximadamente 2,6 minutos; zero falhas, ignorados ou instáveis |
| Comparação visual em Chromium | 94 de 94 capturas idênticas pixel a pixel |
| Conteúdo e SEO no navegador | Textos, títulos, metadados, canonical e JSON-LD iguais à referência |
| Links e imagens no navegador | Destinos, atributos e imagens iguais à referência |
| Assets públicos | 30 hashes SHA-256 iguais à referência; 30 respostas HTTP 200 com conteúdo idêntico |
| Erros de execução nas páginas comparadas | Zero |

A comparação visual utilizou os temas claro e escuro, altura de viewport de 900 px e larguras de 375, 768 e 1440 px nas oito páginas principais, nos seis estudos de caso e na página 404. A página inicial também foi comparada em 320 e 1920 px, nos dois temas. As capturas usam movimento reduzido para comparar o estado estável; a entrada automática, o aceno, as mudanças de preferência de movimento e a posição da mini Letícia são cobertos pela suíte Playwright existente, que passou integralmente.

A auditoria do código confirmou equivalência dos componentes, lógica e rotas após normalizar somente caminhos de imports e finais de linha. As 11 folhas CSS conservam o conteúdo e a ordem de importação. Os seis objetos de projetos, categorias, ordem e consulta por slug foram comparados em memória, sem diferenças. Os 11 arquivos de testes e seu auxiliar mantêm as mesmas asserções; seus laços geram os 266 casos executados.

## Rotas e funcionalidades preservadas

As rotas continuam `/`, `/sobre/`, `/projetos/`, `/experiencia/`, `/competencias/`, `/formacao/`, `/contato/` e `/curriculo/`. Os estudos de caso conservam estes slugs:

- `festa-fantasia`
- `organizador-de-tarefas`
- `senappen-recebimentos`
- `dio-lab-open-source`
- `agenda-executiva`
- `portfolio-leticia-de-paula`

Fotografia, moldura, iluminação, mini Letícia, animações, menu lateral/mobile, botões, temas, responsividade, conteúdo, tipografia, cores, SEO e links conservam as implementações anteriores. A suíte também verificou teclado, foco, filtros, navegação contextual, documentos e acesso sem JavaScript. A preservação dos links externos foi verificada nos dados e no HTML; sua disponibilidade remota não foi alterada nem é garantida por essa comparação.

## Arquivos antigos e evidências

Não foram encontrados arquivos exatamente duplicados no código, CSS ou assets. Os 12 componentes e quatro módulos de suporte fora do grafo das rotas atuais estão identificados em `legado/` e foram preservados. A referência antiga a `/models/leticia-mini.glb` permanece somente nesse suporte legado e no teste de sua constante; não é uma dependência da hero atual, que usa WebP e GSAP. Fontes PNG e regras CSS antigas também foram mantidas, pois têm consumidores ou participam da cascata.

As evidências locais ficam em diretórios ignorados pelo Git:

- `test-results/results.json` e `playwright-report/index.html`: execução atual da suíte.
- `.qa/reorganizacao/before/`: capturas e dados anteriores à reorganização.
- `.qa/reorganizacao/revalidacao-2026-11-10/report.json`: nova captura dos 94 cenários, com comparação de pixels.
- `.qa/reorganizacao/revalidacao-2026-11-10/summary.json`: resumo dos testes, comparação semântica, assets e erros.
- `.qa/reorganizacao/source-integrity.json`: inventário anterior de equivalência de fontes e imports, complementado pela nova auditoria.

Este relatório registra os resultados desta execução. Novas alterações exigem executar novamente os comandos de validação; os arquivos locais de evidência não acompanham um clone do repositório.
