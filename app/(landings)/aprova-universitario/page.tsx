import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { getLanding } from "@/config/landings";
import { aprovaUniversitarioCourseJsonLd } from "./_lib/seo";
import { CHECKOUT_HREF, IMG, faqTextoPuro } from "./_content";
import { Navbar } from "./_components/navbar";
import { Hero } from "./_components/hero";
import { PraQuem } from "./_components/pra-quem";
import { Dificil } from "./_components/dificil";
import { AntesDepois } from "./_components/antes-depois";
import { Solucao } from "./_components/solucao";
import { Disciplinas } from "./_components/disciplinas";
import { Comparativo } from "./_components/comparativo";
import { Jubilut } from "./_components/jubilut";
import { Depoimentos } from "./_components/depoimentos";
import { BannerCta } from "./_components/banner-cta";
import { PlanosEnsino } from "./_components/planos-ensino";
import { Faq } from "./_components/faq";
import { Rodape } from "./_components/rodape";
import "./aprova-universitario.css";

export const dynamic = "force-static";

const landing = getLanding("aprova-universitario");

/**
 * /aprova-universitario: LP de venda do Aprova Universitário (11 disciplinas
 * do ciclo básico da saúde, R$ 79,00 por mês). Porte fiel do export Webflow.
 *
 * Server Components por padrão; a única ilha cliente é o formulário de
 * planos de ensino. Menu mobile e FAQ em <details> nativo; cards de
 * disciplina revelam a descrição por hover/foco em CSS.
 */
export default function AprovaUniversitarioPage() {
  return (
    <div className="au">
      <JsonLd id="ld-org" data={organizationJsonLd()} />
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Aprova Universitário", url: landing.path },
        ])}
      />
      {/* Preço do schema idêntico ao exibido: R$ 79,00 por mês. */}
      <JsonLd
        id="ld-course"
        data={aprovaUniversitarioCourseJsonLd({
          name: "Aprova Universitário: Anatomia, Bioquímica, Fisiologia e mais 8 disciplinas",
          description: landing.description,
          url: landing.path,
          image: `${IMG}/og-image.png`,
          checkout: CHECKOUT_HREF,
        })}
      />
      <JsonLd id="ld-faq" data={faqJsonLd(faqTextoPuro)} />

      <Navbar />
      <main>
        <Hero />
        <PraQuem />
        <Dificil />
        <AntesDepois />
        <Solucao />
        <Disciplinas />
        <Comparativo />
        <Jubilut />
        <Depoimentos />
        <BannerCta />
        <PlanosEnsino />
        <Faq />
      </main>
      <Rodape />
    </div>
  );
}
