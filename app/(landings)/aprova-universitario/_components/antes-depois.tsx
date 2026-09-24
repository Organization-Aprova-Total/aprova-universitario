import { Pic } from "../_lib/picture";
import { conteudo, CHECKOUT_HREF, IMG, PRECO } from "../_content";
import { ListaCheck } from "./lista-check";

export function AntesDepois() {
  const c = conteudo.antesDepois;
  return (
    <section id="o-que-muda" className="au-sec au-muda">
      <h2>{c.h2}</h2>
      <div className="au-muda__grid">
        {c.cards.map((card) => (
          <article key={card.foto} className="au-card-img">
            <Pic src={`${IMG}/${card.foto}`} alt={card.alt} width={411} height={224} />
            <div className="au-card-img__corpo">
              <h3>{card.titulo}</h3>
              <p>{card.p}</p>
              <ListaCheck itens={card.itens} />
            </div>
          </article>
        ))}
      </div>
      <a className="au-btn" href={CHECKOUT_HREF}>{c.cta}</a>
      <span className="au-garantia">{PRECO.garantia}</span>
    </section>
  );
}
