# Mini Letícia e acesso ao SENAPPEN

A hero mantém fotografia, recorte, dimensões, textos, cores e navegação. A miniatura usa exclusivamente a arte fornecida em `Avatar 3D acenando com celular.gif`: apesar do nome do arquivo, a integração é uma imagem 2D transparente, sem modelo, Canvas ou WebGL.

## Arte e animação

O GIF foi inspecionado: nove quadros de 418 × 418, intervalo de 550 ms e repetição infinita na origem. A entrega usa `public/images/leticia-mini-sprite.webp` (161.748 bytes), com os mesmos nove quadros, recortados em uma área comum de 295 × 403 que preserva rosto, tronco, cabelo, celular e mão do cumprimento. A folha inteira nunca é exibida: uma janela mostra somente um quadro por vez.

Para regenerar com o arquivo original:

```powershell
node scripts/prepare-miniature.mjs "C:/Users/leticia.pereira/Downloads/Avatar 3D acenando com celular.gif"
```

`HeroMiniature` carrega GSAP após a imagem. A saudação começa depois de 1,2 segundo, usa deslocamento e inclinação pequenos, reproduz os quadros uma vez, exibe o balão por alguns segundos e retorna ao repouso. Hover e foco por teclado permitem cumprimentar novamente; movimentos internos do cursor não reiniciam a sequência. Sair com o ponteiro, perder o foco ou pressionar Escape recolhe a personagem. No toque, a saudação termina mesmo se o botão continuar focado.

O recorte da miniatura termina na borda superior da moldura. A fotografia e a borda frontal ocultam a parte inferior da personagem. Todas as camadas pertencem à própria moldura e acompanham seu deslocamento existente, sem mudar as dimensões da foto ou ocupar espaço no fluxo.

As alturas de referência são 120 px no desktop, 102 px em tablets e 86 px no mobile. O balão só aparece a partir de 1100 px, onde há espaço acima da foto. Com movimento reduzido, o quadro do cumprimento fica estático e o balão responde sem animação. Se imagem ou módulo de animação falhar, apenas a miniatura é ocultada. Sem JavaScript, foto e links continuam disponíveis.

## SENAPPEN

O cadastro existente `senappen-recebimentos` em `lib/projects.ts` recebeu o link público `https://mjsp-recebimentos-smtp.vercel.app/`. O card e a página `/projetos/senappen-recebimentos/` exibem “Acessar sistema”, com ícone discreto, nova aba e `rel="noopener noreferrer"`. A nota de divulgação foi ajustada para permitir o endereço público; descrições, funcionalidades, capa e condição de repositório privado foram preservadas.

Uma consulta pública GET confirmou HTTP 200. Nenhum formulário foi enviado, área restrita acessada ou captura da aplicação adicionada. Os testes de nova aba interceptam a navegação externa, sem interagir com o sistema real.

## Validação

Comandos: `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build` e `npm.cmd test`.

Os testes cobrem reprodução finita, hover sem reinício, teclado, toque repetido, oclusão, posição do balão, movimento reduzido inicial e dinâmico, falha do asset, foto/layout preservados, card único do SENAPPEN, destino e atributos do link. Capturas locais em `.qa/mini-greeting-*.png` e `.qa/mini-rest-320.png` permitem revisar desktop e mobile. Nenhum deploy realizado.

Resultado: TypeScript, ESLint e build de produção aprovados. Suíte completa: **251 testes aprovados**. Após o ajuste final de distância entre balão e rosto, o build e os **19 testes direcionados** da miniatura e dos projetos também passaram. Revisão visual em desktop/tablet/mobile, sem sobreposição indevida. SHA256 da fotografia original permanece `49ec0ea1fba33d4be393432b3946472a0798a63ad5613e3b6b11ec3adff915be`.

## Arquivos desta alteração

- `components/portal/hero-miniature.tsx` — novo controlador e apresentação da miniatura.
- `components/portal/hero-portrait.tsx` — integração na moldura existente.
- `app/hero-portrait.css` — camadas, oclusão, proporções e balão.
- `public/images/leticia-mini-sprite.webp` — quadros do GIF fornecido.
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
