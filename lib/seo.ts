import { siteConfig } from "@/config/site";

type Json = Record<string, unknown>;

/** Sanitiza o objeto para o <script type="application/ld+json">. */
export function jsonLd<T extends Json>(data: T): T {
  return data;
}

function abs(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const publicPath = process.env.NEXT_PUBLIC_PATH ?? "http://localhost:3000/";
  const basePath = new URL(publicPath).pathname.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  if (path === "/") return `${base}/`;
  return `${base}${basePath}${path.startsWith("/") ? path : `/${path}`}/`.replace(/\/{2,}$/, "/");
}

export function organizationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.social),
  });
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  });
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  });
}

export function courseJsonLd(input: { name: string; description: string; url: string; image: string; price: string }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: abs(input.url),
    image: abs(input.image),
    inLanguage: "pt-BR",
    provider: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    offers: { "@type": "Offer", price: input.price, priceCurrency: "BRL", availability: "https://schema.org/InStock", url: abs(input.url) },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT24W" },
  });
}
