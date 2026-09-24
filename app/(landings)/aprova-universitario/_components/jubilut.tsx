import { Pic } from "../_lib/picture";
import { Rich } from "../_lib/rich";
import { conteudo, IMG } from "../_content";
import { Icone } from "./icons";

export function Jubilut() {
  const c = conteudo.jubilut;
  return (
    <section id="jubilut" className="au-sec au-jubi">
      <div className="au-jubi__grid">
        <div className="au-jubi__texto">
          <h2>{c.h2}</h2>
          <p>{c.p1}</p>
          <p>{c.p2}</p>
        </div>
        <div className="au-jubi__foto">
          <Pic src={`${IMG}/jubilut`} alt={c.fotoAlt} width={684} height={504} />
        </div>
      </div>
      <ul className="au-jubi__selos">
        {c.selos.map((s) => (
          <li key={s.icone} className="au-card">
            <span className="au-card__icone"><Icone nome={s.icone} /></span>
            <p><Rich text={s.t} /></p>
          </li>
        ))}
      </ul>
    </section>
  );
}
