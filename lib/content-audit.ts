type ContentAuditItem = {
  topic: string;
  status: string;
  detail: string;
  href?: string;
};

export const contentAudit: ContentAuditItem[] = [
  {
    topic: "Perfil GitHub",
    status: "Verificado",
    detail: "O nome público e a localidade Brasília, DF constam no perfil de leticiapaulap.",
    href: "https://github.com/leticiapaulap"
  },
  {
    topic: "Projeto público",
    status: "Verificado",
    detail: "Festa Fantasia: repositório, código, README, arquitetura e funcionalidades descritos publicamente. A URL de demonstração redirecionou para uma página intitulada “Halloween”, sem relação aparente com o projeto.",
    href: "https://github.com/leticiapaulap/Festa_Fantasia"
  },
  {
    topic: "Portfólio NEXO",
    status: "Código público",
    detail: "O repositório público contém a base do portfólio. A experiência imersiva e os refinamentos desta entrega estão disponíveis no workspace e aguardam publicação.",
    href: "https://github.com/leticiapaulap/LeticiaDePaula"
  },
  {
    topic: "Formação",
    status: "Informado em currículo",
    detail: "Análise e Desenvolvimento de Sistemas no Centro Universitário do Distrito Federal (UDF), cursando; conclusão prevista para o segundo semestre de 2026. A conclusão efetiva não é presumida."
  },
  {
    topic: "Histórico profissional",
    status: "Informado em currículo",
    detail: "Cargos, períodos e responsabilidades foram transcritos do currículo fornecido; resultados não informados e detalhes corporativos foram omitidos."
  },
  {
    topic: "Cursos e certificados",
    status: "Parcial",
    detail: "Nove certificados reais estão anexados, incluindo Desenvolvedor Profissional (Versátil TI) e Introdução à Análise de Dados — Microsoft Power BI (Fundação Bradesco). Outros cursos constam somente no currículo e permanecem como informação a validar; Oracle Dev Gym está informado como em andamento."
  },
  {
    topic: "Currículo para download",
    status: "Disponível com redação",
    detail: "A cópia pública remove o telefone pessoal, substitui o e-mail antigo pelo endereço profissional informado e elimina a referência antiga do PDF."
  },
  {
    topic: "Projetos corporativos",
    status: "Não publicados",
    detail: "Sem publicação de nomes, escopo, ferramentas ou funcionalidades sem autorização documental específica."
  },
  {
    topic: "LinkedIn",
    status: "Link informado",
    detail: "O perfil foi fornecido, mas o acesso automatizado público está indisponível; nenhum dado foi importado.",
    href: "https://www.linkedin.com/in/let%C3%ADcia-de-paulap/"
  }
];
