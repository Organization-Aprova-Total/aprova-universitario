import { Pic } from "../_lib/picture";
import { conteudo, IMG } from "../_content";

/**
 * 11 cards. A descrição sobe por cima do card no hover (como a interação do
 * Webflow) e também no foco: cada card tem tabIndex para funcionar no
 * teclado e no toque, sem JS.
 */
export function Disciplinas() {
  const c = conteudo.disciplinas;
  return (
    <section id="disciplinas" className="au-sec au-disc">
      <h2>{c.h2}</h2>
      <ul className="au-disc__grid">
        {c.itens.map((d) => (
          <li key={d.foto} className="au-disc__item" tabIndex={0}>
            <div className="au-disc__frente">
              <Pic src={`${IMG}/${d.foto}`} alt={d.alt} width={600} height={600} />
              <h3>{d.nome}</h3>
            </div>
            <div className="au-disc__desc">
              <p>{d.p}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
