export type ProfessionalPortraitData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export const portrait: ProfessionalPortraitData | null = null;

// The supplied photograph is served unchanged. Its presentation crop lives in CSS.
export const heroPortrait: ProfessionalPortraitData = {
  src: "/images/leticia-de-paula.jpg",
  alt: "Letícia de Paula, de óculos e camiseta verde, com tatuagem no braço, em um autorretrato no espelho.",
  width: 1200,
  height: 1600
};
