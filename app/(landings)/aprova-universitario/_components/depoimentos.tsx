import { Pic } from "../_lib/picture";
import { conteudo, IMG } from "../_content";

export function Depoimentos() {
  const c = conteudo.depoimentos;
  return (
    <section id="depoimentos" className="au-sec au-sec--branca au-dep">
      <div className="au-dep__grid">
        <h2>{c.h2}</h2>
        <ul className="au-dep__cards">
          {c.itens.map((d) => (
            <li key={d.foto} className="au-dep__card">
              <blockquote>{d.texto}</blockquote>
              <div className="au-dep__autor">
                <Pic src={`${IMG}/${d.foto}`} alt="" width={60} height={60} />
                <div>
                  <span className="au-dep__nome">{d.nome}</span>
                  <strong className="au-dep__curso">{d.curso}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
