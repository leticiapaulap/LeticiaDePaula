# Refinamento pós-revisão — Letícia de Paula

## Auditoria e prioridades

Base: commit `8e43116`, em 16/10/2026. A aplicação mantém Next.js 16.4, React 19, exportação estática e uma cena Three.js carregada separadamente. Nenhuma reconstrução ou dependência adicional é necessária.

1. **Navegação:** o observador de rolagem atualiza a fase, mas não a URL. Corrigir a sincronização sem criar entradas de histórico a cada seção ou interromper âncoras e voltar/avançar.
2. **Continuidade:** os pequenos pontos de ancoragem isolam a escultura. Reservar uma composição lateral contínua no desktop e marcas de capítulo no mobile, mantendo uma única cena, pausa, movimento reduzido e fallback vetorial.
3. **Conteúdo:** a home replica oito seções integrais das páginas internas. Transformá-la em uma visão resumida, preservando seus identificadores de âncora e aprofundando nas rotas existentes.
4. **Componentes:** melhorar a leitura e o espaçamento dos accordions; reduzir as duas ações equivalentes de cada certificado a uma ação principal com alternativa no modal e sem JavaScript.
5. **Projetos:** reduzir a presença do próprio portfólio e destacar a aplicação real, sem preencher a galeria com trabalhos não comprovados ou expor repositórios privados.

## Fontes verificadas

- API pública do GitHub: `https://api.github.com/users/leticiapaulap/repos?per_page=100`, consultada nesta revisão. Retornou Festa_Fantasia, LeticiaDePaula e o fork dio-lab-open-source.
- O fork do laboratório não teve contribuições autorais confirmadas pela consulta de commits por autora; não será apresentado como projeto próprio.
- Metadados e documentação dos diretórios locais de projetos pessoais foram inspecionados. O gerenciador financeiro possui implementação local, mas não aparece na lista pública. Sua inclusão depende de autorização, solicitada à autora. Nenhum dado financeiro, credencial ou código corporativo será copiado.
- Repositórios locais de terceiros e aplicações corporativas não serão expostos para aumentar artificialmente a galeria.

Atualização posterior, em 20/10/2026: a autora solicitou expressamente a inclusão do organizador pessoal, do projeto privado da SENAPPEN e do DIO Lab. A inclusão mantém o fork identificado como educacional e os projetos não públicos sem código ou dados restritos. Consulte [projetos-adicionais.md](projetos-adicionais.md). As observações anteriores registram a decisão antes dessa autorização.

## Validação

Os resultados desta rodada serão registrados depois da execução. As medições da rodada anterior não representam automaticamente esta versão.
