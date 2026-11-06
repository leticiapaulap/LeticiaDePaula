# Mini Letícia e acesso ao SENAPPEN

A hero mantém fotografia, recorte, dimensões, textos, cores e navegação. A miniatura usa a ilustração transparente `Avatar Acenando com Cachos Ruivos.png`, fornecida para substituir a personagem anterior com celular. É uma imagem 2D estática, sem modelo, Canvas ou WebGL; a saudação usa movimento suave e um balão, sem simular quadros que a arte não contém. A gravação fornecida ajudou a identificar o recorte anterior que deixava apenas parte da cabeça à mostra; não é enviada nem incorporada ao site.

## Arte e saudação

`public/images/leticia-mini-avatar.webp` é a imagem original convertida para WebP com transparência, sem redesenhar ou recortar a personagem. Ela fica parcialmente atrás da fotografia; uma segunda camada recortada da mão acompanha o movimento do pulso durante o aceno. O restante da arte é preservado.

Para regenerar a imagem otimizada com o arquivo PNG original:

```powershell
node scripts/prepare-miniature.mjs "C:/Users/leticia.pereira/Downloads/Avatar Acenando com Cachos Ruivos.png"
```

`HeroMiniature` carrega GSAP após a imagem. A saudação automática começa depois de 1,2 segundo a cada carregamento da página; nesse momento, uma camada recortada da mão oscila pelo pulso. Hover e foco por teclado permitem repetir o cumprimento, e o toque aciona a mesma resposta. O balão diz “Oi! Que bom ter você por aqui!” e aparece por alguns segundos. Com movimento reduzido, a personagem permanece estática e a mensagem ainda é exibida. Movimentos internos do cursor não reiniciam a sequência. Sair com o ponteiro, perder o foco ou pressionar Escape recolhe a saudação.

A miniatura fica à esquerda, com o topo em 58% da altura da moldura (65% no mobile), e a foto à frente oculta de fato a lateral do corpo. A entrada começa 75% da largura da arte para dentro da foto; ela desliza para fora em 1,4 segundo, inclina suavemente, acena e apresenta a fala. Depois de sete segundos, recolhe em 1,3 segundo e permanece parcialmente escondida, inclusive com o mouse parado. O retorno bloqueia reinícios causados por pequenas saídas e reentradas do ponteiro. Todas as camadas pertencem à moldura e acompanham seu deslocamento existente, sem mudar as dimensões da foto ou ocupar espaço no fluxo.

As alturas de referência são 120 px no desktop, 102 px em tablets e 80 px no mobile, mantendo a proporção 579 × 768 do arquivo aprovado. O balão aparece em todas essas telas, acima e à esquerda da cabeça, com largura limitada ao espaço lateral no mobile. Ele pertence a uma âncora na boca (57% da largura, 31% da altura da arte); seu ponteiro SVG acompanha a mesma transformação, sem flutuar no topo da hero ou cobrir a foto e os textos. Com movimento reduzido, a personagem permanece estática e o balão responde sem animação. Se imagem ou módulo de animação falhar, apenas a miniatura é ocultada. Sem JavaScript, foto e links continuam disponíveis.

## SENAPPEN

O cadastro existente `senappen-recebimentos` em `lib/projects.ts` recebeu o link público `https://mjsp-recebimentos-smtp.vercel.app/`. O card e a página `/projetos/senappen-recebimentos/` exibem “Acessar sistema”, com ícone discreto, nova aba e `rel="noopener noreferrer"`. A nota de divulgação foi ajustada para permitir o endereço público; descrições, funcionalidades, capa e condição de repositório privado foram preservadas.

Uma consulta pública GET confirmou HTTP 200. Nenhum formulário foi enviado, área restrita acessada ou captura da aplicação adicionada. Os testes de nova aba interceptam a navegação externa, sem interagir com o sistema real.

## Validação

Comandos: `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build` e `npm.cmd test`.

Os testes cobrem carregamento da nova ilustração, saudação finita, hover sem reinício, teclado, toque repetido, oclusão, posição do balão, movimento reduzido inicial e dinâmico, falha do asset, foto/layout preservados, card único do SENAPPEN, destino e atributos do link. Capturas de revisão em desktop e mobile são mantidas fora do repositório. Nenhum deploy realizado.

Na correção de encaixe e fala, passaram build, TypeScript, ESLint e os 50 testes direcionados da hero. Após o ajuste final da inclinação e margem no mobile, passaram também os 15 casos de geometria/entrada: sete larguras (320, 375, 430, 768, 1024, 1100 e 1440 px), cada uma com movimento normal e reduzido, e a sequência de entrada escondida, surgimento lateral e recuo. A verificação usa oclusão real por hit-test e coordenadas do ponteiro SVG para confirmar a conexão com a boca, inclusive durante o recuo. Foto e arte aprovada mantêm os hashes anteriores; os demais componentes da hero não foram editados.

Validação original: TypeScript, ESLint e build de produção aprovados; 251 testes passaram. Revisão da substituição da personagem: build, typecheck, lint, os testes direcionados da miniatura e os 253 testes da suíte completa passaram. A etapa de posição e movimento da mão também atualiza e verifica a camada móvel do pulso, a posição abaixo do centro, a mensagem e o respeito ao movimento reduzido. SHA256 da fotografia original permanece `49ec0ea1fba33d4be393432b3946472a0798a63ad5613e3b6b11ec3adff915be`.

## Arquivos desta alteração

- `components/portal/hero-miniature.tsx` — novo controlador e apresentação da miniatura.
- `components/portal/hero-portrait.tsx` — integração na moldura existente.
- `app/hero-portrait.css` — camadas, oclusão, proporções e balão.
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
