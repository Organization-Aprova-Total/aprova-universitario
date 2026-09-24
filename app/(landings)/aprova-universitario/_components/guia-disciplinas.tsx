import Link from "next/link";
import { guia, disciplinasGuia } from "../_content/disciplinas-guia";

/**
 * Guia do ciclo básico: intro em texto corrido e um <details> por
 * disciplina (o que estuda, temas e link para a página dedicada). É a
 * seção de conteúdo para busca orgânica; fica depois do FAQ para não
 * interromper o fluxo de venda.
 */
export function GuiaDisciplinas() {
  return (
    <section id="guia-ciclo-basico" className="au-sec au-guia">
      <div className="au-guia__col">
        <h2>{guia.h2}</h2>
        {guia.intro.map((p) => <p key={p} className="au-guia__intro">{p}</p>)}
        <div className="au-guia__lista">
          {disciplinasGuia.map((d) => (
            <details key={d.slug} className="au-guia__item" name="au-guia">
              <summary>
                <h3>{d.nome}</h3>
                <span className="au-guia__seta" aria-hidden="true">+</span>
              </summary>
              <div className="au-guia__corpo">
                <p>{d.oQueEstuda}</p>
                <p className="au-guia__sub">{guia.topicosTitulo} {d.nome}:</p>
                <ul>{d.topicos.map((t) => <li key={t}>{t}</li>)}</ul>
                <p>{d.dificuldade}</p>
                <Link className="au-guia__link" href={`/aprova-universitario/${d.slug}`}>{guia.verPagina} {d.nome} →</Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
