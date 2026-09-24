import { siteConfig } from "@/config/site";
import { jsonLd } from "@/lib/seo";

/**
 * Course JSON-LD próprio desta LP: assinatura mensal (R$ 79,00 por mês),
 * 11 disciplinas do ciclo básico da saúde. O helper compartilhado não
 * modela preço recorrente; este aqui usa UnitPriceSpecification com
 * billingDuration de 1 mês. Preço idêntico ao exibido na página.
 */
function abs(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function aprovaUniversitarioCourseJsonLd(input: { name: string; description: string; url: string; image: string; checkout?: string }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: abs(input.url),
    image: abs(input.image),
    inLanguage: "pt-BR",
    educationalLevel: "Ensino superior",
    teaches:
      "Anatomia, Bioquímica, Fisiologia, Histologia, Patologia, Microbiologia, Imunologia, Genética, Parasitologia, Farmacologia e Embriologia",
    provider: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    instructor: {
      "@type": "Person",
      name: "Paulo Jubilut",
      jobTitle: "Professor de Biologia",
      sameAs: ["https://www.youtube.com/@aprovatotal", "https://www.instagram.com/aprovatotal"],
    },
    offers: {
      "@type": "Offer",
      price: "79.00",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: input.checkout ?? abs(input.url),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79.00",
        priceCurrency: "BRL",
        billingDuration: 1,
        unitCode: "MON",
      },
    },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT1H" },
  } as Record<string, unknown>);
}
