import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { withBasePath } from "@/lib/utils";
import { getLanding } from "@/config/landings";
import { Pic } from "../_lib/picture";
import { CHECKOUT_HREF, IMG, PRECO, conteudo } from "../_content";
import { guia, disciplinasGuia, disciplinaPorSlug } from "../_content/disciplinas-guia";
import { BarraOferta } from "../_components/barra-oferta";
import { Navbar } from "../_components/navbar";
import { ListaCheck } from "../_components/lista-check";
import { Seta } from "../_components/icons";
import { Rodape } from "../_components/rodape";
import "../aprova-universitario.css";

export const dynamic = "force-static";
export const dynamicParams = false;

const landing = getLanding("aprova-universitario");

export function generateStaticParams() {
  return disciplinasGuia.map((d) => ({ disciplina: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ disciplina: string }> }): Promise<Metadata> {
  const { disciplina } = await params;
  const d = disciplinaPorSlug(disciplina);
  if (!d) return {};
  const path = `${landing.path}/${d.slug}`;
  const ogImage = withBasePath(`${IMG}/og-image.png`);
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: path, siteName: siteConfig.name, type: "website", locale: "pt_BR", images: [{ url: ogImage, width: 1200, height: 630, alt: d.metaTitle, type: "image/png" }] },
    twitter: { card: "summary_large_image", title: d.metaTitle, description: d.metaDescription, images: [ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/**
 * Página dedicada de uma disciplina (/aprova-universitario/<slug>/).
 * Conteúdo em _content/disciplinas-guia.ts. Reaproveita navbar, rodapé,
 * barra de oferta e o CSS da LP principal. JSON-LD: Organization,
 * Breadcrumb e FAQPage (o Course fica só na página principal).
 */
export default async function DisciplinaPage({ params }: { params: Promise<{ disciplina: string }> }) {
  const { disciplina } = await params;
  const d = disciplinaPorSlug(disciplina);
  if (!d) notFound();
  const outras = disciplinasGuia.filter((x) => x.slug !== d.slug);
  const t = (s: string) => s.replace("{nome}", d.nome);

  return (
    <div className="au">
      <JsonLd id="ld-org" data={organizationJsonLd()} />
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Aprova Universitário", url: landing.path },
          { name: d.nome, url: `${landing.path}/${d.slug}` },
        ])}
      />
      <JsonLd id="ld-faq" data={faqJsonLd(d.faq)} />

      <BarraOferta />
      <Navbar />
      <main>
        <section className="au-dhero">
          <div className="au-dhero__col">
            <span className="au-dhero__pill">{guia.pill}</span>
            <h1>{d.h1}</h1>
            <p className="au-dhero__p">{d.resumo}</p>
            <a className="au-btn" href={CHECKOUT_HREF}>{guia.ctaHero}</a>
            <p className="au-dhero__nota">{conteudo.hero.nota}</p>
          </div>
          <div className="au-dhero__img">
            <Pic src={`${IMG}/${d.foto}`} alt={d.alt} width={600} height={600} priority />
          </div>
        </section>

        <section className="au-sec au-dsec">
          <div className="au-dsec__col">
            <h2>{guia.oQueEstudaTitulo} {d.nome}</h2>
            <p>{d.oQueEstuda}</p>
            <h3>{guia.topicosTitulo} {d.nome}</h3>
            <ListaCheck itens={d.topicos} className="au-lista--branca" />
          </div>
        </section>

        <section className="au-sec au-dsec au-dsec--cinza">
          <div className="au-dsec__col">
            <h2>{t(guia.dificuldadeTitulo)}</h2>
            <p>{d.dificuldade}</p>
            <h2>{t(guia.comoEstudarTitulo)}</h2>
            <p>{d.comoEstudar}</p>
            <ListaCheck itens={guia.comoEstudarItens} className="au-lista--branca" />
          </div>
        </section>

        <section id="oferta" className="au-sec au-comp">
          <div className="au-oferta">
            <p className="au-oferta__resumo">{guia.ofertaTitulo}</p>
            <p className="au-oferta__de">{conteudo.oferta.de} <s>{PRECO.de}</s> {conteudo.oferta.por}</p>
            <p className="au-oferta__valor">{PRECO.valor} <span>{PRECO.periodo}</span></p>
            <a className="au-btn" href={CHECKOUT_HREF}>{guia.cta}</a>
            <p className="au-oferta__garantia">
              <span aria-hidden="true">🛡</span>
              <span><strong>{conteudo.oferta.garantiaTitulo}.</strong> {conteudo.oferta.garantiaTexto}</span>
            </p>
          </div>
        </section>

        <section className="au-sec au-sec--branca au-faq">
          <div className="au-faq__col">
            <h2>{guia.faqTitulo} {d.nome}</h2>
            <div className="au-faq__lista">
              {d.faq.map((it) => (
                <details key={it.q} className="au-faq__item" name="au-faq">
                  <summary><h3>{it.q}</h3><Seta /></summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="au-sec au-dsec">
          <div className="au-dsec__col">
            <h2>{guia.outrasDisciplinas}</h2>
            <ul className="au-dlinks">
              {outras.map((o) => (
                <li key={o.slug}><Link href={`/aprova-universitario/${o.slug}`}>{o.nome}</Link></li>
              ))}
            </ul>
            <Link className="au-guia__link" href="/aprova-universitario">← {guia.voltar}</Link>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
