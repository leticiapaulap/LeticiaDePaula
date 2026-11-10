# Experimento de fundo tecnológico da hero

Validação local em 10/11/2026. A imagem foi criada com a ferramenta nativa `image_gen`, sem CLI/API externa, e exportada para WebP com o Sharp já instalado no projeto. Nenhuma biblioteca foi acrescentada. Não houve commit, push ou deploy nesta etapa.

## Resultado visual

A imagem funciona como textura editorial de apoio: linhas finas e planos translúcidos aparecem nas bordas e na área inferior direita, com o centro mais livre. A baixa opacidade e o véu em gradiente mantêm nome, fotografia e botões como elementos principais. O efeito fica mais discreto no tema escuro, sem neon ou objetos literais de tecnologia.

A avaliação comparou a hero com o fundo CSS anterior e com a textura nos temas claro e escuro, em 1366 × 768, 1440 × 900, 1920 × 1080, 768 × 1024 e 390 × 844. Não foram identificados cortes, sobreposições ou rolagem horizontal.

Os textos encontrados ao iniciar esta etapa foram preservados, incluindo o nome em uma linha no código e somente o parágrafo “Por aqui, compartilho um pouco do que venho desenvolvendo.”. Esses ajustes já estavam presentes como alterações locais do usuário; não foram revertidos. O teste de composição foi alinhado a esse conteúdo atual.

## Assets salvos no projeto

| Arquivo | Dimensões | Tamanho |
| --- | --- | ---: |
| `public/images/fundo-tecnologico-hero-v1.webp` | 1600 × 900 | 13.970 bytes |
| `public/images/fundo-tecnologico-hero-v1-mobile.webp` | 800 × 450 | 3.792 bytes |

O arquivo menor é usado abaixo de 768 px. Os testes confirmam que cada viewport solicita somente sua versão. O PNG original gerado permanece na pasta padrão de imagens geradas do Codex; a página referencia exclusivamente os WebP locais, sem serviços externos.

## Implementação

- A imagem está no pseudo-elemento `::before` do contêiner decorativo `.hero-ambient`, exclusivo da inicial.
- A opacidade é de 30% no desktop claro, 24% no mobile claro e 16% no tema escuro.
- `::after` aplica um véu de gradientes com a cor de fundo do tema, protegendo principalmente a área de texto.
- No tema escuro, inversão de luminosidade, rotação de matiz e dessaturação são aplicadas somente à textura. A fotografia não recebe filtros ou sobreposições.
- A imagem é estática. As duas luzes CSS anteriores continuam com seu movimento lento e respeitam `prefers-reduced-motion`; nenhum novo movimento foi acrescentado.
- O contêiner tem `aria-hidden="true"`, `pointer-events: none`, contenção de pintura e recorte de overflow. Na impressão, permanece oculto.
- Páginas internas não apresentam a camada nem solicitam a imagem.

Não foram alteradas regras de layout, dimensões, enquadramento, moldura, ancoragem da miniatura, menu, botões, fontes ou SEO.

## Fallback CSS

Se o arquivo não carregar, os gradientes e as luzes CSS existentes continuam disponíveis, sem ícone de imagem quebrada e sem bloquear os links.

Para desativar a textura e voltar integralmente à alternativa anterior, altere somente o atributo do contêiner em `components/pagina-inicial/apresentacao-inicial.tsx`:

```tsx
<div className="hero-ambient" data-background="css" aria-hidden="true"><span /><span /></div>
```

O valor `technology` habilita a imagem; `css` deixa somente a iluminação abstrata. Não é necessária variável de ambiente ou biblioteca adicional. Ao mudar o código, gere novamente o build para atualizar o preview estático.

O modo CSS foi comparado com as capturas anteriores em desktop e mobile, nos dois temas, após carregar as imagens e estabilizar a miniatura: **quatro de quatro capturas idênticas pixel a pixel**. A falha de carregamento também foi simulada nos dois temas, com fotografia e navegação funcionais.

## Validação

| Verificação | Resultado |
| --- | --- |
| TypeScript | Aprovado |
| ESLint | Aprovado, sem avisos |
| Build de produção | Aprovado |
| Testes direcionados de composição e fundo | 24 aprovados |
| Suíte Playwright completa | **276 aprovados**, sem falhas, omissões ou testes instáveis |
| Acessibilidade automatizada da nova composição | Sem violações nos cenários desktop/mobile, claro/escuro |
| Geometria da inicial, textos, links e metadados | Idênticos antes/depois nos dez cenários |
| Pixels da fotografia | Idênticos antes/depois nos dez cenários |
| Páginas internas | **70 capturas idênticas pixel a pixel** |
| Assets anteriores | Todos os hashes preservados; somente dois arquivos novos |

Os testes adicionais verificam tamanho e carregamento dos WebP, seleção do arquivo móvel, camada estática, overlay, leitura e contraste, ausência de interferência nos controles, integridade da foto ao ativar/desativar a imagem, fallback com a requisição bloqueada e ausência de carregamento da textura nas páginas internas.

Evidências locais em `.qa/fundo-tecnologico/`, ignoradas pelo Git:

- `antes-e-depois.png` e `visao-geral-depois.png`.
- `before/` e `after/`: 80 capturas completas e medições em cada etapa.
- `summary.json`: comparação de layout, conteúdo, fotografia, assets e páginas internas.
- `fallback-css-*.png` e `fallback-summary.json`: alternativa sem imagem.
- `source-before.json`: estado dos arquivos antes da implementação.

## Arquivos desta etapa

- `components/pagina-inicial/apresentacao-inicial.tsx`: somente o atributo de seleção do fundo, além dos ajustes de texto já encontrados.
- `styles/pagina-inicial/apresentacao-fotografia-e-mini-leticia.css`: camada de imagem, overlay e adaptação ao tema/viewport.
- Os dois WebP novos em `public/images/`.
- `tests/pagina-inicial/fundo-tecnologico.spec.ts`: sete verificações adicionais.
- `tests/pagina-inicial/composicao.spec.ts`: expectativa dos textos atuais.
- `docs/fundo-tecnologico-hero.md`: este relatório, incluindo o prompt final.

## Prompt final

```text
Use case: stylized-concept. Asset type: original raster background texture for the editorial portfolio hero of Letícia de Paula, not a website mockup. Create one wide 16:9 abstract technology-inspired atmospheric image. Refined, quiet and bespoke, not a stock technology illustration. Warm ivory and off-white base (#f7f4ee), soft misty seafoam (#e2eeea), desaturated teal (#147d82) and extremely faint petrol-blue (#123a47) details. Very fine, sparse architectural grid fragments, precise hairline orthogonal paths, a few incomplete translucent geometric planes, with diffuse soft light and subtle paper-like material depth. Geometry concentrated at the outer edges and lower right; left-center and center remain very quiet for large typography and a separate portrait already in the site. Organic, asymmetrical editorial composition, all lines low contrast and delicate; broad gentle transitions. Overall predominantly light neutral paper, with muted teal accents, no harsh shadows. This is background artwork only: NO text, letters, numbers, code, logos, watermark, people, faces, laptops, keyboards, devices, circuit-board close-ups, icons, HUDs, data dashboards, stars, particles, flashy futuristic objects, neon or glowing nodes. No central focal object. Soft, elegant and almost imperceptible when displayed behind readable dark text. Generate at approximately 1920x1080 or another wide high-resolution aspect ratio. Opaque image.
```
