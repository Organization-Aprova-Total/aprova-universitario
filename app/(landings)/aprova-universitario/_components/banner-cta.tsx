import { withBasePath } from "@/lib/utils";
import { conteudo, CHECKOUT_HREF, IMG } from "../_content";

export function BannerCta() {
  const c = conteudo.banner;
  const estilo = { "--au-banner-fundo": `url(${withBasePath(`${IMG}/banner-fundo.webp`)})` } as React.CSSProperties;
  return (
    <section className="au-sec au-sec--branca au-banner">
      <div className="au-wrap">
        <div className="au-banner__caixa" style={estilo}>
          <div className="au-banner__col">
            <h2>{c.h2}</h2>
            <p>{c.p}</p>
            <a className="au-btn" href={CHECKOUT_HREF}>{c.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
