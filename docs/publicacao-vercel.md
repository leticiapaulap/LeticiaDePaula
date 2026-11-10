# Publicação estática na Vercel

Correção e validação local em 10/11/2026. O objetivo desta alteração é corrigir `NEXT_NO_ROUTES_MANIFEST`, preservando o portfólio e seu modo estático. Nenhum comando de deploy foi executado e nenhuma configuração remota do painel foi alterada.

## Causa identificada

O `next.config.ts` já declara `output: "export"`, `trailingSlash: true` e imagens sem otimizador de servidor. O build produz HTML, CSS, JavaScript, imagens e dados estáticos de navegação em `out/`. O manifesto interno do Next.js é gerado normalmente em `.next/routes-manifest.json`, não em `out/routes-manifest.json`.

O `vercel.json` anterior combinava `framework: "nextjs"` com `outputDirectory: "out"`. O adaptador Next.js interpretava `out` como seu diretório de build e procurava ali os manifestos internos, correspondendo ao caminho exibido no erro. O código do adaptador oficial chama `getRoutesManifest` com o diretório de saída selecionado. Copiar ou fabricar um manifesto em `out` não corrige essa incompatibilidade.

A correção usa **Framework Preset Other**, representado por **`framework: null`**, para selecionar a publicação de arquivos estáticos. O `outputDirectory: "out"` passa a identificar o conteúdo pronto para servir. O `vercel.json` prevalece sobre os respectivos campos do painel.

## Por que preservar a exportação estática

As páginas não dependem de APIs, autenticação, cookies de servidor, Server Actions ou renderização por requisição. Filtros, tema e navegação são interações de cliente. As rotas de projetos usam `generateStaticParams()` e `dynamicParams = false`, gerando os seis slugs no build. `robots.ts` e `sitemap.ts` são explicitamente estáticos.

Não foi necessário migrar para execução por servidor nem alterar `next.config.ts`. O comando permanece:

```text
next build && node scripts/normalize-static-segments.mjs
```

O normalizador continua copiando os payloads `.txt` de segmentos para os caminhos estáticos esperados pelo cliente nesta versão do Next.js. A implementação funciona com os separadores da plataforma e não cria manifestos de servidor. Foram normalizados 14 caminhos nesta execução Windows. Em uma plataforma que já emita os nomes esperados, o script pode não ter arquivos para copiar.

Não foram acrescentados rewrites de todas as URLs para a página inicial: páginas inexistentes devem continuar retornando 404.

## Configurações do painel

Em **Project → Settings → Build and Deployment**, mantenha:

| Campo | Valor |
| --- | --- |
| Root Directory | Raiz do repositório, `./`, onde está `package.json`; nunca `out` |
| Framework Preset | **Other** |
| Install Command | **`npm ci`** |
| Build Command | **`npm run build`** |
| Output Directory | **`out`** |
| Node.js Version | **24.x** |

O arquivo versionado fixa o preset, a instalação, o build, a saída e as barras finais. Os cabeçalhos existentes de segurança e cache foram preservados. Não use `.next` como saída no modo Other e não mantenha o preset Next.js com o override `out`.

### Commit/push sem deploy

A solicitação desta etapa autoriza enviar a correção ao GitHub, mas não publicar. Como a integração Git/Vercel normalmente publica pushes, foi adicionada a configuração documentada:

```json
"git": {
  "deploymentEnabled": {
    "main": false
  }
}
```

Isso bloqueia o deploy automático da branch enviada, sem desativar outras branches. A regra não altera os arquivos exportados ou o adaptador. Quando a publicação for autorizada, poderá ser feita manualmente; para retomar o fluxo automático da `main`, remova essa regra ou altere seu valor para `true`. Essa retomada não foi executada nesta etapa.

## Node.js e o aviso `cache-dir`

O Next.js instalado é **16.4.5** e declara Node.js **>=20.9.0**. O ambiente local usa **24.19.0**, e a Vercel documenta suporte à principal **24.x**. O `engines.node` anterior, `>=22.19.0`, permitia selecionar principais futuras. Ele foi limitado a `24.x` no `package.json` e no registro raiz do lockfile. Nenhuma versão de dependência foi alterada.

Não há `.npmrc` no projeto, nem `vercel.ts`. Os arquivos npmrc de usuário/global informados pelo npm também não existem neste ambiente. Nenhuma variável local contendo `cache-dir` foi encontrada.

O aviso foi reproduzido em um processo filho temporário com `npm_config_cache_dir` e `npm config get cache`: o npm 11.17.0 emitiu `Unknown env config "cache-dir"` e terminou com código **0**. A variável temporária não foi persistida. Isso confirma o significado do aviso e que ele não explica a busca pelo manifesto no diretório incorreto.

No ambiente de build que apresenta o aviso, procure `npm_config_cache_dir` ou `NPM_CONFIG_CACHE_DIR` nas variáveis do projeto, configurações compartilhadas ou wrapper que invoca npm. Remova a opção desconhecida; se um cache personalizado for necessário, use **`NPM_CONFIG_CACHE`** ou `cache=...` em uma configuração npm apropriada. Não foi criado um `.npmrc` para mascarar uma variável externa. Sem acesso às variáveis remotas, não é possível afirmar qual componente do ambiente Vercel a está exportando.

## Validação além do build

O adaptador oficial **`@vercel/static-build@27.0.0`** e **`@vercel/routing-utils@6.6.1`** foram instalados somente em `.qa/`, como ferramentas temporárias, sem alterar as dependências do projeto.

O adaptador executou o `npm run build` real e empacotou `out/`. Na validação local foram reutilizadas as dependências já instaladas; a reinstalação foi omitida apenas nessa chamada de teste. A configuração destinada à Vercel mantém `npm ci`.

O resultado contém apenas referências a arquivos estáticos de `out`, sem funções ou arquivos de servidor. A ausência de `out/routes-manifest.json` foi verificada e aceita. Nenhum manifesto artificial foi criado.

As regras de URL, barras finais e cabeçalhos foram transformadas com `@vercel/routing-utils`. Um servidor de verificação local usou esse mapa real de arquivos e essas regras. Em Chromium, as 14 páginas públicas foram abertas diretamente por URLs sem barra final, seguiram os redirects 308 e foram atualizadas com sucesso. A navegação de cliente da listagem para Agenda Executiva e seu refresh também passaram. URLs desconhecidas retornaram 404.

Essa validação testa o empacotamento do adaptador e as regras estáticas localmente; não equivale a um deploy remoto ou a uma confirmação das configurações do painel Vercel.

| Verificação | Resultado |
| --- | --- |
| `npm run build` pelo adaptador oficial | Aprovado; exportação concluída |
| `.next/export-detail.json` | `success: true`, com saída `out` |
| Empacotamento estático | Aprovado, sem funções de servidor |
| Regras oficiais de publicação | Válidas; barras finais e cabeçalhos preservados |
| Acesso direto e atualização | 14 de 14 páginas aprovadas |
| Navegação de cliente para projeto | Aprovada |
| Página e slug inexistentes | HTTP 404 |
| Erros de execução/respostas inesperadas no navegador | Zero |
| `npm run typecheck` | Aprovado |
| `npm run lint` | Aprovado, sem avisos |
| Dependências do lockfile | Mesmas versões; somente engine do registro raiz mudou |
| Fontes da interface, dados, estilos e assets | Hashes preservados em relação ao início desta etapa |

## Rotas preservadas

```text
/
/sobre/
/projetos/
/experiencia/
/competencias/
/formacao/
/contato/
/curriculo/
/projetos/festa-fantasia/
/projetos/organizador-de-tarefas/
/projetos/senappen-recebimentos/
/projetos/dio-lab-open-source/
/projetos/agenda-executiva/
/projetos/portfolio-leticia-de-paula/
```

Os endereços sem a barra final continuam aceitos e redirecionam para a forma canônica. Slugs não foram alterados.

## Arquivos da correção

- `vercel.json`: preset Other, instalação reproduzível e bloqueio do deploy automático da `main` durante a revisão.
- `package.json` e `package-lock.json`: Node.js limitado à principal 24.x.
- `README.md`: instruções atuais de execução e publicação.
- `docs/publicacao-vercel.md`: este diagnóstico e os resultados.

As alterações visuais locais que já estavam presentes ao iniciar foram preservadas e ficam fora do commit desta correção. Não houve mudança de páginas, fotografia, mini Letícia, fundo, animações, menu, conteúdo, projetos ou temas.

As evidências e ferramentas temporárias ficam em `.qa/correcao-vercel/`: `adapter-output.json`, `routes-report.json`, snapshots de integridade e scripts de verificação. Não são dependências de produção nem acompanham o commit.

## Referências oficiais

- [Exportação estática do Next.js](https://nextjs.org/docs/app/guides/static-exports).
- [Framework e outputDirectory na configuração Vercel](https://vercel.com/docs/project-configuration/vercel-json).
- [Configuração de builds](https://vercel.com/docs/builds/configure-a-build).
- [Versões Node.js suportadas](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
- [Controle de deployments por branch](https://vercel.com/docs/project-configuration/git-configuration).
- [Configuração npm e variáveis de ambiente](https://docs.npmjs.com/cli/v11/using-npm/config/).
- [Código do adaptador estático](https://github.com/vercel/vercel/tree/main/packages/static-build).
- [Código do adaptador Next.js](https://github.com/vercel/vercel/tree/main/packages/next).
