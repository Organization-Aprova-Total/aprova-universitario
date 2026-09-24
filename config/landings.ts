/**
 * Registro das landing pages. `getLanding()` é type-safe: o build quebra se a
 * LP não estiver aqui. `enabled: false` tira a página do sitemap.
 */
export type Landing = {
  slug: string;
  title: string;
  description: string;
  path: string;
  enabled: boolean;
};

export const landings = {
  "aprova-universitario": {
    slug: "aprova-universitario",
    title: "Anatomia, Bioquímica e Fisiologia para o Ciclo Básico",
    description: "11 disciplinas do ciclo básico da saúde em aulas curtas e visuais, com mapas mentais, quizzes e mais de 2.100 questões. R$ 79,00 por mês, 7 dias de garantia.",
    path: "/aprova-universitario",
    enabled: true,
  },
} as const satisfies Record<string, Landing>;

export type LandingSlug = keyof typeof landings;

export function getLanding(slug: LandingSlug): Landing {
  return landings[slug];
}

export function enabledLandings(): Landing[] {
  return Object.values(landings).filter((l) => l.enabled);
}
