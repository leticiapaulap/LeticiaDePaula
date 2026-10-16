# Etapa 3 — Interatividade do NEXO

Esta entrega acrescenta interatividade ao portal e às páginas profissionais existentes. A exportação continua estática; não há backend, cadastro ou publicação automática. Os dados profissionais e os estudos de caso continuam em `lib/`.

## Estado e transições

`lib/experience-state.ts` define os sete estados e seus parâmetros de câmera, alvo, orientação, escala, cor, iluminação e rugosidade. Também contém o reducer puro, a resolução de rotas/seções e a curva de interpolação. `ExperienceProvider`, no layout raiz, mantém:

- Fase atual, seção ativa e revisão da transição.
- Áreas visitadas, usadas nos pontos de convergência.
- Projeto, tecnologia e marco profissional selecionados.
- Categoria da galeria e endereço de retorno ao abrir um estudo de caso.
- Modo imersivo/direto, movimento e disponibilidade da cena.

Uma ação incrementa a revisão e substitui o destino anterior. `SceneRig` captura o enquadramento e os pesos de morph **atuais**, usando-os como origem da nova interpolação. Não há fila de animações nem obrigação de terminar a anterior. O indicador de transição tem um único temporizador cancelável no provider; ele não bloqueia a interface. A navegação repetida para a mesma seção é idempotente.

A duração visual é de 900 ms no desktop/tablet e 450 ms no mobile, com interpolação suave de início e fim. Um delta limitado impede grandes saltos depois de frames lentos. Movimento reduzido e pausa aplicam o destino imediatamente; novos controles continuam funcionando. O modo direto interrompe a renderização e preserva o ponto de leitura.

As rotas determinam a fase nas páginas internas. Na página inicial, uma leitura das posições das seções, agendada por `requestAnimationFrame`, acompanha o scroll convencional. O listener é passivo e só publica mudanças quando a seção muda. Não há captura obrigatória do scroll. Selecionar um projeto no mapa mantém a fase **Competências**; abrir seu estudo de caso muda para **Projetos**.

As preferências de modo e movimento ficam em `localStorage`, com tratamento para armazenamento bloqueado. Seleções, filtros de projetos e endereço de retorno sobrevivem à navegação client-side na mesma sessão do layout. Recarregar completamente a página reinicia essas seleções.

## Formas da mesma fita

| Estado | Transformação | Continuidade com o conteúdo |
| --- | --- | --- |
| Portal | Laço abstrato entrelaçado, com oscilação angular mínima no desktop | Identidade inicial e entrada da exploração |
| Núcleo | Três lóbulos e seis ramificações radiais | Escolha das áreas; pontos indicam áreas percorridas |
| Projetos | Contorno retangular suavizado, sugerindo planos de uma moldura | Projeto em foco ajusta discretamente câmera e orientação |
| Experiência | Percurso sinuoso vertical contínuo | Seleção do marco desloca suavemente o alvo vertical |
| Competências | Contorno com seis conexões radiais e linhas internas | As linhas reproduzem apenas relações presentes nos dados |
| Formação | Três voltas sobrepostas em níveis progressivos | Biblioteca, formação e certificados |
| Convergência | Retorno ao laço inicial com modulação de profundidade | Pontos das áreas visitadas acompanham o retorno à identidade |

`lib/ribbon-shapes.ts` descreve as curvas matemáticas sem depender de Three.js. A mesma fonte produz os caminhos SVG do fallback 2D. No SVG, a mudança de forma usa uma breve troca de opacidade, sem morph espacial.

## Arquitetura 3D

Há um único `SculptureLoader` no layout. `next/dynamic`, em um Client Component, separa o código Three.js/React Three Fiber do HTML inicial. Uma sondagem de WebGL 2 libera seu contexto imediatamente; o Canvas só é montado no modo imersivo com suporte disponível. Depois de montado, ele é mantido entre rotas e mudanças de modo.

Nesta instalação do Next.js 16.4, a exportação no Windows preserva separadores de diretório nos nomes dos segmentos RSC, enquanto o cliente solicita nomes com pontos. O passo `scripts/normalize-static-segments.mjs`, executado depois de `next build`, copia esses segmentos para os nomes esperados pelo cliente. Os arquivos originais são preservados, e exportações que já têm nomes corretos não precisam de cópias. Isso evita 404 no prefetch e mantém o mesmo layout/cena na navegação estática, sem alterações em `node_modules` ou regras especiais no servidor.

`createRibbonGeometry` produz malhas com índices e contagens equivalentes. A malha principal contém sete alvos de posição e normal. O morph é feito pela GPU com pesos interpolados; não há reconstrução da fita ou cálculo de normais a cada frame. A inicialização do `Mesh` recebe a geometria no construtor para inicializar corretamente os pesos de morph nesta versão de Three.js.

`SceneRig` é o único executor da interpolação de câmera, orientação, escala, material, luz e pesos. A câmera tem alvos definidos e amplitude pequena, sem controles livres ou captura do ponteiro. A correção de FOV considera a proporção real do Canvas e fica limitada a 68 graus. No mobile, os deslocamentos de orientação e alvo são reduzidos.

As linhas de competências usam um único buffer de segmentos, com cores atualizadas na seleção. Ramificações e pontos visitados usam geometrias pequenas reutilizadas. Linhas invisíveis não geram draw calls. A liberação de geometrias e materiais é explícita, incluindo trocas de qualidade.

`SceneRenderGuard` captura erros do renderizador durante o frame, e o limite de erro cobre falhas de montagem. `webglcontextlost` desmonta o Canvas e revela o SVG no mesmo espaço. O conteúdo e os controles HTML permanecem montados. Não há tentativa automática e repetida de recriar um contexto perdido; uma nova carga da página permite nova tentativa.

## Orçamento de renderização

| Qualidade | Largura | Segmentos da fita | Triângulos da fita | DPR máximo |
| --- | --- | --- | --- | --- |
| Mobile | abaixo de 768 px | 64 × 4 | 512 | 1 |
| Tablet | 768–1099 px | 100 × 6 | 1.200 | 1,15 |
| Desktop | a partir de 1100 px | 144 × 8 | 2.304 | 1,35 |

- `frameloop="demand"`: transições solicitam novos frames somente enquanto necessárias.
- Somente Portal e Núcleo têm movimento contínuo, restrito ao desktop e solicitado a 30 Hz.
- Projetos, timeline, mapa e formação param de renderizar depois da transição.
- Modo direto, pausa e aba oculta interrompem a renderização contínua.
- Sem sombras, pós-processamento, texturas externas ou ambientes HDR.
- Clearcoat apenas no desktop; uma luz adicional é removida no mobile.
- Entre um e três draw calls na cena estabilizada, conforme linhas/pontos visíveis.
- O mapa é HTML/SVG: não há raycasting ou eventos 3D necessários para consultar relações.

O posicionamento da cena usa uma moldura responsiva de baixa interferência. O indicador de seção é uma linha CSS junto ao título, sem deslocar o layout. Não há medição frágil para conectar pixels de objetos 3D a letras HTML. No mobile, os controles e relações em HTML têm prioridade, e a escultura funciona como acompanhamento visual discreto.

## Fluxos para revisão

1. **Explorar:** Portal → “Explorar meu universo” → Núcleo → uma área. O controle inferior permite selecionar qualquer uma das sete fases e retornar à área anterior. Links e scroll continuam convencionais.
2. **Leitura direta:** “Ver portfólio” no portal ativa o modo direto e vai ao conteúdo. O botão no cabeçalho/menu alterna os modos sem trocar de página ou perder a leitura; o estado é anunciado por uma região de status.
3. **Galeria:** destacar um projeto pelos botões, setas do teclado, Home/End ou swipe horizontal → informações imediatas → “Ver detalhes” → “Voltar aos projetos”. Categoria e seleção são preservadas durante a navegação client-side. Todas as fichas e links também continuam disponíveis fora da composição em foco.
4. **Timeline:** escolher um marco, usar anterior/próximo ou as setas/Home/End no controle → ver o destaque e a mudança de alvo da câmera. As três experiências completas, com organização, cargo, período, responsabilidades e contexto, permanecem no HTML.
5. **Competências:** selecionar React → dois projetos documentados; selecionar Python → explicação e ausência de projeto público associado. Selecionar Festa Fantasia no mapa → tecnologias relacionadas e link de estudo de caso. “Ver todas as conexões” limpa a seleção.
6. **Acervo:** pesquisar, combinar filtros ou escolher uma instituição → expandir contexto do curso → abrir certificado → fechar por botão ou Escape. O foco retorna ao botão de origem. O PDF também pode abrir em outra aba se o visualizador embutido do navegador não estiver disponível.
7. **Interromper:** pausar no cabeçalho ou no menu. Todas as funções permanecem disponíveis; a preferência de movimento reduzido do dispositivo tem prioridade.

## Verificação executada

Foram usados os comandos existentes de TypeScript, ESLint e build estático, além de verificações locais com Node e Chrome headless via CDP, sem instalar dependências de teste. Os resultados e capturas desta sessão ficam em `.qa/` (diretório já ignorado pelo repositório).

Na exportação estática, as **72 verificações de navegador passaram**, sem erros JavaScript ou recursos 404 capturados. O registro está em `.qa/stage3-results.json`. A cena foi exercitada no Chrome/Windows com Intel UHD Graphics 630 via ANGLE/Direct3D 11; isso não é um benchmark de outras GPUs.

As verificações do modelo cobrem navegação repetida/rápida, unicidade das fases visitadas, seleção bidirecional, resolução de rotas, limites de interpolação e topologia de todas as sete formas nas três qualidades. Foram examinados 16.359 vértices, com posições e normais finitas. Os 20 vínculos do mapa vêm de `projectSlugs`; Python não recebe associação inferida.

As verificações no navegador cobrem estados por seção, substituição de transições, alternância de modo com reutilização do Canvas, teclado da galeria e timeline, retorno com filtro, resultados vazios, conexões React/Python, seleção de projeto no mapa, busca/instituição, certificado real, Escape e restauração de foco, swipe, menu mobile, movimento reduzido, pausa, aba oculta, ausência de WebGL, perda de contexto e erro de renderização injetado.

Também foram verificadas as nove páginas profissionais, incluindo ambos os estudos de caso e o currículo, e larguras de 320, 375, 430, 768, 1024 e 1440 px, com limite de DPR e ausência de overflow horizontal. As verificações de toque, viewport, movimento reduzido e visibilidade da aba são emulações; não substituem testes em aparelhos físicos.

Não foi executada uma sessão com leitor de tela. Teclado, semântica dos controles, anúncios de status e restauração de foco foram tratados nesta implementação, mas a leitura assistiva real deve entrar na revisão final.

O teste de 40 seleções consecutivas encontrou contagens estáveis de buffers, texturas e contextos. A cena de projetos estabilizada parou de desenhar após a transição. Esse ensaio detecta regressões básicas de alocação, sem demonstrar ausência de vazamentos em sessões longas ou em todos os drivers.

Um teste adicional no build final alternou nove vezes entre qualidades mobile, tablet e desktop: os recursos retornaram às mesmas contagens, o Canvas foi preservado e a prévia real, a navegação para o case e o retorno continuaram funcionando sem erros de rede ou JavaScript.

## Limitações e atenção para a etapa 4

- Festa Fantasia não tem screenshots reais anexadas nem demonstração verificada. Seu diagrama de arquitetura continua explicitamente identificado; nenhuma tela do produto foi inventada. O NEXO usa uma captura real do próprio portal.
- O mapa espelha somente projetos e associações cadastrados. Uma tecnologia conhecida sem projeto documentado continua consultável, sem linhas fictícias.
- As formas intermediárias podem cruzar a própria fita: é uma superfície artística, sem simulação física ou colisões.
- A posição da escultura acompanha a composição por proporções responsivas; não tenta alinhar objetos 3D precisamente a cada elemento HTML.
- A seleção de projeto e a categoria não são persistidas depois de recarregar a página; o modo e a pausa são persistidos.
- A reprodução embutida de PDFs depende do navegador. O acesso direto ao arquivo continua disponível.
- Validar Safari/iOS, Android e GPUs de entrada em aparelhos físicos; medir LCP, INP, memória e aquecimento durante sessões maiores.
- Ao atualizar o Next.js, conferir se a normalização dos nomes de segmentos no Windows ainda é necessária. A captura do portal também deve ser atualizada quando a composição mudar.
- Ao ampliar o acervo, manter imagens reais otimizadas, correspondência de topologia, descarte de recursos e o orçamento de draw calls. Não aumentar luzes, DPR ou a quantidade de alvos sem medir.

A etapa 3 termina nesta entrega. Revisão geral, ajustes finais de produção e publicação ficam para a etapa 4.
