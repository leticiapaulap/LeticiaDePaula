import { siteUrl } from "@/lib/site";

export const professional = {
  name: "Letícia de Paula",
  monogram: "LP",
  headline: "Desenvolvimento web com atenção às pessoas e aos detalhes.",
  title: "Desenvolvimento Web",
  positioning:
    "Desenvolvimento web, dados e automação. Interfaces em React e TypeScript, com atenção à experiência de quem usa.",
  summary:
    "Desenvolvo interfaces e aplicações web com React, TypeScript, Node.js e PostgreSQL. Minha trajetória reúne experiências em tecnologia, suporte e dados geoespaciais. Curso Análise e Desenvolvimento de Sistemas no UDF e conecto esse aprendizado à construção de soluções práticas.",
  location: "Brasília, DF",
  email: "leticiapaulaads@gmail.com",
  github: "https://github.com/leticiapaulap",
  linkedin: "https://www.linkedin.com/in/let%C3%ADcia-de-paulap/",
  avatar: "https://avatars.githubusercontent.com/u/121705864?v=4",
  siteUrl,
  resumePdfPath: "/curriculo-leticia-de-paula.pdf" as string | null,
  resumePdfLabel: "Baixar currículo em PDF",
  about: [
    "Sou Letícia de Paula, de Brasília. Curso Análise e Desenvolvimento de Sistemas no Centro Universitário do Distrito Federal (UDF), com conclusão prevista para o segundo semestre de 2026.",
    "Minha trajetória passa pelo apoio a sistemas e automação na SENAPPEN, pela análise de dados geoespaciais na TCB Brasília e pelo suporte técnico na Age Fibra. São contextos diferentes que aproximam tecnologia, organização e cuidado com as pessoas.",
    "Nos projetos, gosto de conectar interface, dados e funcionamento. Festa Fantasia reúne React, TypeScript, Node.js e PostgreSQL em uma aplicação full stack. Este portfólio explora uma linguagem editorial com Next.js e uma escultura 3D, sem abrir mão da leitura e da navegação direta.",
    "Valorizo soluções compreensíveis, documentação útil e aprendizado contínuo. Meu objetivo é transformar necessidades reais em experiências digitais claras e bem cuidadas."
  ],
  principles: [
    {
      title: "Leitura de contexto",
      description:
        "Antes de propor tecnologia, entender a rotina, os dados disponíveis, as pessoas envolvidas e as restrições reais."
    },
    {
      title: "Organização para manter",
      description:
        "Criar interfaces, dados e documentações que continuem compreensíveis depois da primeira entrega."
    },
    {
      title: "Aprendizado aplicado",
      description:
        "Transformar cursos, projetos e demandas de trabalho em repertório técnico utilizável no dia a dia."
    }
  ]
} as const;
