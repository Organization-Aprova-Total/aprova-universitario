import { Rich } from "../_lib/rich";
import { conteudo } from "../_content";
import { Icone } from "./icons";

export function Solucao() {
  const c = conteudo.solucao;
  return (
    <section id="a-solucao" className="au-sec">
      <div className="au-sol">
        <div className="au-sol__intro">
          <h2>{c.h2}</h2>
          <p><Rich text={c.p1} /></p>
          <p><Rich text={c.p2} /></p>
        </div>
        {c.cards.map((card) => (
          <div key={card.icone} className="au-card">
            <span className="au-card__icone"><Icone nome={card.icone} /></span>
            <p><Rich text={card.t} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}
