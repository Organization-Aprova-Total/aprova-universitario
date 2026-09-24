import { Rich } from "../_lib/rich";
import { conteudo, EMAIL_CONTATO } from "../_content";
import { Seta } from "./icons";

/** Acordeão em <details name>: um aberto por vez, nativo, sem JS. */
export function Faq() {
  const c = conteudo.faq;
  return (
    <section id="faq" className="au-sec au-sec--branca au-faq">
      <div className="au-faq__col">
        <h2>{c.h2}</h2>
        <div className="au-faq__lista">
          {c.itens.map((it) => (
            <details key={it.q} className="au-faq__item" name="au-faq">
              <summary>
                <h3>{it.q}</h3>
                <Seta />
              </summary>
              <p><Rich text={it.a} /></p>
            </details>
          ))}
        </div>
        <div className="au-faq__ajuda">
          <span>{c.ajuda}</span>
          <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a>
        </div>
      </div>
    </section>
  );
}
