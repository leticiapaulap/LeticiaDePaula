# Hero com foto interativa — Letícia de Paula

## Composição

A abertura reúne nome, atuação em desenvolvimento web/dados/automação, posicionamento e descrição profissional. Mantém um botão principal, “Conhecer projetos”, e um link textual, “Minha trajetória”. A antiga coluna de frases foi substituída pelo retrato, com moldura arquitetônica, linha cobre, cantos turquesa e grade discreta.

No desktop, texto e retrato ficam em duas colunas dentro da área à direita da sidebar. No mobile, a ordem visual é nome/atuação, retrato e descrição/ações. A foto continua em destaque; as ações podem exigir rolagem natural em telas pequenas. Sidebar, menu mobile, rotas, projetos e demais páginas foram preservados.

## Foto e carregamento

- Origem: `C:/Users/leticia.pereira/Downloads/WhatsApp Image 2026-11-04 at 09.58.43.jpeg`.
- JPEG original em `public/images/leticia-de-paula.jpg`, com os mesmos 204.972 bytes e SHA256 `49ec0ea1fba33d4be393432b3946472a0798a63ad5613e3b6b11ec3adff915be`.
- Nenhuma geração, retoque, alteração de rosto, corpo, roupa, tatuagem, acessórios, pose ou cor. O recorte é uma janela CSS equivalente a x120/y300/largura660/altura825 sobre a fotografia de 1200 × 1600. Mantém rosto, cabelo, mãos e tatuagem visível e reduz o ambiente em volta.
- `picture` com WebP responsivo de 720, 960 e 1200 px e JPEG original de fallback. As variantes são somente redimensionamento/compressão, usando o Sharp já instalado: 85.370, 128.056 e 170.446 bytes respectivamente.
- `loading="eager"`, `fetchPriority="high"`, dimensões explícitas e proporção CSS reservada. Sem dependências novas.
- Para regenerar as variantes: `node scripts/prepare-hero-portrait.mjs`.

## Interação e acessibilidade

O retrato responde ao mouse preciso com rotação máxima de 2 graus e deslocamento máximo de 3 px; a linha externa se move no sentido oposto. Atualizações são agrupadas com `requestAnimationFrame`, sem atualizar estado React a cada movimento. A imagem volta ao repouso ao sair, cancelar o ponteiro ou perder o foco da janela.

Toque e `prefers-reduced-motion` desativam a resposta ao ponteiro. Mudanças nessa preferência durante a sessão também encerram o movimento. O modo reduzido desativa a entrada animada. Foto e links continuam disponíveis sem JavaScript; os detalhes gráficos são decorativos, sem controles extras no percurso de teclado.

A entrada do texto usa somente deslocamento leve para manter contraste estável desde o primeiro frame; a entrada do retrato tem fade breve. Não há partículas, animações infinitas, canvas ou WebGL na hero.

## Arquivos desta etapa

- `components/portal/portal-hero.tsx`: composição textual, link secundário e integração do retrato; componente, dados profissionais e CTA existentes reutilizados.
- `components/portal/hero-portrait.tsx`: novo retrato com imagem responsiva, moldura e controlador do ponteiro.
- `app/hero-portrait.css`: escala, layout, recorte, detalhes gráficos, responsividade, temas, movimento reduzido e impressão.
- `app/layout.tsx`: importação da folha específica após as regras existentes.
- `lib/portrait.ts`: configuração separada `heroPortrait`; a configuração existente de Sobre mim foi mantida.
- `scripts/prepare-hero-portrait.mjs`: geração reproduzível das variantes de entrega.
- `public/images/leticia-de-paula.jpg` e `leticia-de-paula-{720,960,1200}.webp`.
- `tests/editorial-hero.spec.ts`: 21 testes da hero e atualização das expectativas da composição anterior.
- Este documento e `docs/validacao-hero-foto.json`.

## Validação executada

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd test
```

- Typecheck e lint aprovados. Build de produção/exportação estática aprovado após repetição motivada pelo aviso de segurança do Next.js instalado.
- Playwright/Chromium: **214 testes aprovados**, sem falhas, skips ou instabilidades na rodada final. Inclui 21 casos da hero, ponteiro/reset, toque, reduced motion inicial e em tempo real, teclado, links, console, imagem, temas e fallback sem JavaScript; a suíte restante verifica sidebar, histórico, projetos, competências, documentos e certificados.
- A primeira rodada detectou contraste transitório durante o fade do CTA. O fade do texto foi removido e a suíte completa passou após a correção.
- Layout automático de 13 páginas em oito larguras; hero adicionalmente verificada em 1100 px. Sem overflow ou erros de runtime nos cenários finais executados.
- Axe sem violações nos cenários analisados, inclusive hero e menu nos temas claro/escuro. Não equivale a uma avaliação completa com usuários de tecnologias assistivas.
- Sete capturas finais inspecionadas em `.qa/hero-portrait/final/`: desktop 1440/1100, tablet 768, mobile 320/375/430 e tema escuro 1440. Sem problema visual bloqueante restante.
- Relatório da suíte em `playwright-report/index.html` e `test-results/results.json`.

## Performance medida

Lighthouse no build estático local, com throttling simulado. Medição desktop final: desempenho100, acessibilidade100, SEO100, LCP649ms, CLS0 e TBT0. Medição mobile isolada, sem a suíte concorrente: desempenho91, acessibilidade100, SEO100, LCP3457ms simulado (164ms observado localmente), CLS0 e TBT33ms.

A medição mobile anterior no mesmo build, concorrente com testes, marcou84/TBT249ms; foi preservada separadamente. São execuções locais pontuais, não medianas de produção. Os relatórios finais ficam em `.qa/hero-portrait-performance-final/`. O Lighthouse confirmou descoberta da imagem no HTML inicial, prioridade alta e ausência do aviso de desperdício de dimensão após a inclusão das variantes WebP.

## Pendências

Permanece o aviso de segurança do Next.js16.4.0 já registrado na etapa de navegação. A dependência não foi atualizada neste redesign. O LCP mobile simulado ainda pode ser melhorado com uma otimização mais ampla do carregamento; as medições atuais não representam tráfego real.

Nenhum deploy realizado.
