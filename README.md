# NEXO — A Arquitetura das Ideias

Portfólio profissional de Letícia de Paula, construído com Next.js App Router, React, TypeScript e Tailwind CSS. O site usa exportação estática e mantém a experiência editorial e a escultura procedural da primeira etapa, agora conectadas por uma camada de estados e seleções acessíveis.

## Executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. No Windows PowerShell, use `npm.cmd` caso a política de execução bloqueie `npm.ps1`.

Scripts disponíveis:

```bash
npm run typecheck
npm run lint
npm run build
```

## Tecnologias e decisões

- Next.js 16 App Router, React 19 e TypeScript.
- Tailwind CSS e CSS global com tokens próprios do NEXO.
- Three.js / React Three Fiber para a escultura procedural mantida entre rotas; a disponibilidade de WebGL 2 é verificada antes de montar a cena, e o SVG continua como fallback.
- Manrope e Instrument Serif fornecidas pelo Next.js.
- A estrutura existente foi mantida, sem migração de framework. Conteúdo e controles legíveis são HTML; filtros são interações client-side.
- O `ExperienceProvider` centraliza fase, preferências de movimento e seleções; a falta de WebGL não bloqueia a navegação ou o conteúdo.
- Falhas inesperadas do renderizador ficam isoladas em um limite de erro da cena, sem desmontar as páginas profissionais.
- Movimento contínuo pausa quando a aba fica oculta, por preferência do sistema ou pelo controle de animação no cabeçalho; a densidade geométrica e o pixel ratio diminuem no mobile.

## Experiência e rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Portal NEXO, sala inicial e modo direto com conteúdo profissional |
| `/sobre/` | Apresentação e matriz de fontes, evidências e pendências |
| `/projetos/` | Projetos publicados, filtros por categoria e estados vazios |
| `/projetos/[slug]/` | Estudos de caso gerados estaticamente |
| `/experiencia/` | Organizações informadas e detalhes aguardando validação |
| `/competencias/` | Competências organizadas por área e relacionadas a projetos documentados |
| `/formacao/` | Formação informada, cursos, filtros e situação de validação |
| `/contato/` | E-mail e perfis profissionais informados |
| `/curriculo/` | Currículo digital para leitura e impressão |

O link **Modo direto** na navegação leva às seções profissionais da página inicial; cada página acima também pode ser acessada por URL e compartilhada sem passar pelo Portal.

## Interatividade da etapa 3

Arquitetura, formas, fluxos de navegação, orçamento de renderização, verificação e limitações estão documentados em [docs/etapa-3.md](docs/etapa-3.md).

O estado compartilhado percorre **Portal → Núcleo → Projetos → Experiência → Competências → Formação → Convergência**. Mudanças de fase são derivadas de rotas e seções; uma nova fase substitui com segurança a transição pendente. O estado altera geometria, enquadramento da câmera, escala, iluminação e material da fita.

`components/portal/create-ribbon-geometry.ts` gera formas com topologia equivalente. A cena global pré-calcula alvos procedurais e interpola os vértices na GPU, sem trocar a malha a cada mudança de rota. Ela acompanha a navegação como elemento visual de baixa interferência nas páginas internas. A seleção de projetos e experiências e o mapa 2D de competências também atualizam a fase central. O mapa só liga tecnologias a projetos que aparecem explicitamente nos dados tipados.

Os botões de foco e navegação funcionam por teclado e toque. O controle **Pausar animações** no cabeçalho elimina movimento contínuo; em telas pequenas o mesmo controle continua disponível no menu. `prefers-reduced-motion` mantém os estados acessíveis sem deslocamentos. A galeria, a timeline e o mapa 2D continuam sendo o meio completo de navegação, sem exigir WebGL ou sequências animadas.

O modo direto é uma preferência independente da pausa e pode ser alternado sem perder a leitura. A galeria aceita setas, Home/End e swipe, mantém filtros ao retornar do estudo de caso e apresenta as informações imediatamente. O acervo permite visualizar PDFs reais em um diálogo com restauração de foco. Renderização sob demanda, qualidade por dispositivo e recuperação para SVG limitam o custo da experiência.

## Estrutura de conteúdo

Edite os arquivos tipados em `lib/`:

| Arquivo | Conteúdo |
| --- | --- |
| `profile.ts` | Identificação, apresentação, contato e disponibilidade do PDF |
| `projects.ts` | Projetos, estudos de caso, links e fontes |
| `experiences.ts` | Organizações informadas e estado de validação |
| `skills.ts` | Competências por área, contexto de uso e relações com projetos |
| `education.ts` | Formação acadêmica informada e pontos pendentes |
| `certifications.ts` | Cursos, instituição, situação, carga horária e arquivo de certificado |
| `social-links.ts` | Links profissionais |
| `content-audit.ts` | Matriz de conteúdo confirmado, informado, pendente ou não publicável |
| `types.ts` | Tipos compartilhados |
| `navigation.ts` | Destinos da navegação profissional |
| `experience-state.ts` | Fases e parâmetros visuais compartilhados da experiência |
| `data.ts` | Ponto central de exportação dos dados |

Para adicionar um projeto com página individual, crie um `slug` em `lib/projects.ts` e mantenha um link do tipo `case`; a rota usa `generateStaticParams` e é incluída no sitemap. Adicione capturas somente em `screenshots` quando existirem imagens reais e autorizadas. Os diagramas atuais são identificados como diagramas, não como telas do produto.

Cadastre cursos em `lib/certifications.ts`. Cursos declarados no currículo sem comprovante ficam como **A validar**; não trate cursos em andamento como concluídos e só preencha `certificateUrl` com um certificado real.

O currículo público em `public/curriculo-leticia-de-paula.pdf` é uma cópia de distribuição: o telefone pessoal foi removido e o contato foi atualizado para o e-mail profissional informado. Os sete PDFs reais usados na seção de formação ficam em `public/certificates/`. As experiências e a formação estão identificadas como informações do currículo, não como verificação independente de vínculo ou conclusão.

## Auditoria e limites de publicação

Fontes públicas consultadas:

- Perfil público do GitHub: <https://github.com/leticiapaulap>.
- Repositório público `Festa_Fantasia`: <https://github.com/leticiapaulap/Festa_Fantasia>, incluindo seu README de arquitetura e funcionalidades.
- Informações profissionais informadas pela proprietária do portfólio.

O repositório público `LeticiaDePaula` estava sem arquivos na consulta. O LinkedIn informado não pôde ser validado por acesso público durante a auditoria. O currículo e os certificados foram fornecidos localmente pela profissional; informações ainda não acompanhadas por certificado estão marcadas para validação.

O case Festa Fantasia usa o código e o README públicos como fonte; sua demonstração não é anunciada porque o endereço previamente documentado redirecionou para uma página sem relação aparente com o projeto. Não foram publicados nomes, tecnologias, fluxos ou resultados de projetos corporativos sem fonte e autorização. SENAPPEN, TCB Brasília e Age Fibra, cargos, períodos e responsabilidades são apresentados conforme o currículo fornecido; resultados e ferramentas específicos por vínculo não foram presumidos.

## Build e deploy

O projeto preserva `output: "export"` em `next.config.ts`; `npm run build` gera o diretório `out`. Para Vercel, configure o framework como Next.js. Em hospedagem estática, publique `out` e confira a configuração em `.openai/hosting.json`.

Use o script `npm run build`: além da compilação, ele normaliza os nomes dos segmentos de navegação estática gerados por esta versão do Next.js no Windows, evitando 404 no prefetch sem modificar o framework.

Antes de publicar, execute os scripts de tipo, lint e build. Revise as fontes em `lib/content-audit.ts` ao adicionar documentos ou autorização.
