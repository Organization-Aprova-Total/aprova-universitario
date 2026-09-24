import { withBasePath } from "@/lib/utils";
import { Rich } from "../_lib/rich";
import { conteudo, CHECKOUT_HREF, IMG, VIDEO } from "../_content";

/**
 * Hero com vídeo de fundo (autoplay, mudo, em loop, como no design), véu
 * preto a 64% e texto centralizado. Com prefers-reduced-motion o vídeo some
 * e fica o poster como fundo (CSS).
 */
export function Hero() {
  const c = conteudo.hero;
  const poster = withBasePath(`${IMG}/hero-poster.webp`);
  const estilo = { "--au-hero-poster": `url(${poster})` } as React.CSSProperties;
  return (
    <section className="au-hero" style={estilo}>
      <video
        className="au-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={c.videoAlt}
      >
        <source src={withBasePath(`${VIDEO}/hero.webm`)} type="video/webm" />
        <source src={withBasePath(`${VIDEO}/hero.mp4`)} type="video/mp4" />
      </video>
      <div className="au-hero__veu" aria-hidden="true" />
      <div className="au-hero__conteudo">
        <h1>{c.h1}</h1>
        <p className="au-hero__p">{c.p}</p>
        <a className="au-btn" href={CHECKOUT_HREF}>{c.cta}</a>
        <p className="au-hero__autoridade"><Rich text={c.autoridade} /></p>
        <ul className="au-hero__prova" aria-label="Números do Aprova Universitário">
          {c.prova.map((p) => <li key={p.n}><strong>{p.n}</strong><span>{p.t}</span></li>)}
        </ul>
        <p className="au-hero__nota">{c.nota}</p>
      </div>
    </section>
  );
}
