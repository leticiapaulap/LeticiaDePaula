# NEXO — A Arquitetura das Ideias

Portfólio profissional de Letícia de Paula, construído com Next.js App Router, React, TypeScript e Tailwind CSS. O site usa exportação estática e mantém a experiência editorial e a escultura procedural da primeira etapa, com páginas profissionais independentes para leitura direta.

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
- Three.js / React Three Fiber para a escultura procedural carregada à parte; a ilustração SVG permanece como alternativa sem WebGL.
- Manrope e Instrument Serif fornecidas pelo Next.js.
- A estrutura existente foi mantida, sem migração de framework. Conteúdo e controles legíveis são HTML; filtros são interações client-side.
- A cena tridimensional e as seções profissionais são separadas: a ausência de WebGL, de arquivos de currículo ou de conteúdo autorizado não bloqueia a navegação.

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
| `data.ts` | Ponto central de exportação dos dados |

Para adicionar um projeto com página individual, crie um `slug` em `lib/projects.ts` e mantenha um link do tipo `case`; a rota usa `generateStaticParams` e é incluída no sitemap. Adicione capturas somente em `screenshots` quando existirem imagens reais e autorizadas. Os diagramas atuais são identificados como diagramas, não como telas do produto.

Cadastre cursos em `lib/certifications.ts`. Não trate cursos em andamento como concluídos e só preencha `certificateUrl` com um certificado real. O PDF só será disponibilizado quando `resumePdfPath` em `lib/profile.ts` apontar para um documento atualizado em `public/`.

## Auditoria e limites de publicação

Fontes públicas consultadas:

- Perfil público do GitHub: <https://github.com/leticiapaulap>.
- Repositório público `Festa_Fantasia`: <https://github.com/leticiapaulap/Festa_Fantasia>, incluindo seu README de arquitetura e funcionalidades.
- Informações profissionais informadas pela proprietária do portfólio.

O repositório público `LeticiaDePaula` estava sem arquivos na consulta. O LinkedIn informado não pôde ser validado por acesso público durante a auditoria. Nenhum currículo PDF, certificado ou captura de tela real foi encontrado nos arquivos locais.

O case Festa Fantasia usa o código e o README públicos como fonte; sua demonstração não é anunciada porque o endereço previamente documentado redirecionou para uma página sem relação aparente com o projeto. Não foram publicados nomes, tecnologias, fluxos ou resultados de projetos corporativos sem fonte e autorização. SENAPPEN, TCB Brasília e Age Fibra aparecem somente como organizações informadas: cargo, período e atividades seguem pendentes de documentos.

## Build e deploy

O projeto preserva `output: "export"` em `next.config.ts`; `npm run build` gera o diretório `out`. Para Vercel, configure o framework como Next.js. Em hospedagem estática, publique `out` e confira a configuração em `.openai/hosting.json`.

Antes de publicar, execute os scripts de tipo, lint e build. Revise as fontes em `lib/content-audit.ts` ao adicionar documentos ou autorização.
