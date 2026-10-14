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
    status: "Em desenvolvimento",
    detail: "Código disponível neste workspace. O repositório GitHub informado está vazio na data desta auditoria.",
    href: "https://github.com/leticiapaulap/LeticiaDePaula"
  },
  {
    topic: "Formação",
    status: "Parcial",
    detail: "Análise e Desenvolvimento de Sistemas informado; instituição, período e situação aguardam documento."
  },
  {
    topic: "Histórico profissional",
    status: "Pendente",
    detail: "Organizações informadas; cargos, vínculos, datas, atividades e resultados dependem do currículo atualizado."
  },
  {
    topic: "Cursos e certificados",
    status: "Pendente",
    detail: "Nenhum certificado foi localizado. O curso informado em andamento não possui data de conclusão."
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
