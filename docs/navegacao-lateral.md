# Navegação lateral — Letícia de Paula

## Resultado

Navegação principal em uma sidebar editorial de 232 px no desktop, com sete links reais e sem numeração: Início, Sobre mim, Projetos, Experiência, Competências, Formação e Contato. A página ativa recebe `aria-current="page"`, peso tipográfico, superfície suave e linha lateral. Abaixo de 1100 px, o conteúdo usa toda a largura e a navegação fica em um menu modal que entra pela esquerda.

As rotas, os cinco estudos de caso, o currículo digital/PDF, a trajetória, as competências e os certificados foram preservados. A abertura mantém uma chamada principal, “Conhecer projetos”, e um link textual para Sobre mim. Não há navegação sequencial obrigatória, contadores ou barras inferiores entre seções. “Capítulos” não aparece no texto público nem nos rótulos acessíveis verificados.

## Arquivos desta etapa

- `components/header.tsx`: reutiliza Header, ThemeToggle e Dialog do Radix; compartilha os links entre sidebar e drawer. Fecha o drawer ao selecionar uma seção, inclusive a atual, e ao mudar para desktop. Após navegar, o título da página recebe foco; ao dispensar o menu, o foco retorna ao botão; ao passar para desktop, retorna ao link ativo da sidebar.
- `app/navigation-layout.css`: sidebar com rolagem própria em janelas baixas; menu com safe areas, rolagem e controles de pelo menos 44 px; cabeçalho mobile de 64 px; área de conteúdo fluida; ajustes de colunas considerando a largura disponível depois da sidebar; impressão sem espaço reservado à navegação.
- `app/layout.tsx`: fallback de navegação sem JavaScript sem um cabeçalho mobile redundante. A sidebar desktop continua utilizável com links HTML.
- `components/contact-section.tsx`: remove o download PDF repetido. O PDF permanece no menu, enquanto o currículo digital continua no conteúdo de contato. Os perfis sociais aparecem no contato; a sidebar/menu omite essa repetição nessa rota.
- `tests/navigation-sidebar.spec.ts`: 17 regressões complementares para sidebar, teclado, foco, drawer, resize, janelas baixas, temas, PDF, perfis, terminologia e acessibilidade.
- Este relatório e `docs/validacao-navegacao-lateral.json`.

Não foi necessário excluir fisicamente componentes nesta etapa. Header, ThemeToggle, os dados de navegação, as transições entre páginas e o modal Radix foram reutilizados. Escape, clique fora, bloqueio da rolagem de fundo e confinamento do foco usam o comportamento modal do Radix já instalado. Nenhuma dependência nova, objeto 3D ou deploy foi adicionado.

## Validação executada

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd test
npm.cmd audit --omit=dev --json
```

- Typecheck e lint: aprovados.
- Build de produção e normalização da exportação estática: aprovados após repetir o comando em resposta ao aviso de segurança emitido pelo Next.js.
- Playwright/Chromium: **205 testes aprovados**, sem falhas ou skips na rodada final. A primeira rodada encontrou cinco falhas na consulta ao botão externo ao modal; o teste foi corrigido para considerar que o Radix retira esse botão da árvore de acessibilidade enquanto o modal está aberto. A suíte completa foi executada novamente.
- Cobertura: navegação direta, histórico, estado ativo em projetos, foco, teclado, Escape, clique fora, botão fechar, seleção atual, bloqueio/restauração de rolagem, redimensionamento, temas persistentes, PDF real, destinos sociais, filtros, certificados, reduced motion, ausência de WebGL obrigatório e navegação sem JavaScript.
- Layout: 13 páginas em 320, 375, 430, 768, 1024, 1280, 1440 e 1920 px sem overflow horizontal ou erros de runtime nos testes. Sidebar adicionalmente verificada em 1280 × 480 px.
- Axe: sem violações nas páginas e nos menus analisados, nos temas claro e escuro. Auditoria automatizada não substitui avaliação humana com tecnologias assistivas.
- Revisão visual: dez capturas em `.qa/sidebar-final/`, cobrindo abertura desktop/tablet/mobile, menu mobile e projetos/competências/contato em desktop de 1100 px e celular de 320 px. Nenhum problema visual bloqueante identificado.
- Relatórios completos: `playwright-report/index.html` e `test-results/results.json`. A disponibilidade externa de GitHub/LinkedIn não foi auditada; seus destinos e atributos foram verificados no navegador.

## Pendência real

O Next.js instalado, 16.4.0, emite aviso de segurança no build. `npm audit --omit=dev --json` confirmou uma dependência com classificação crítica e aponta atualização disponível. As dependências não foram alteradas nesta reformulação. A atualização de segurança deve ser tratada separadamente e validada antes de publicar uma nova versão. O projeto usa exportação estática; não foi feita uma avaliação de explorabilidade dos avisos neste modelo de hospedagem.

Nenhum deploy realizado.
