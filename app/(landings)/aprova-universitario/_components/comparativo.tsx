import { conteudo, CHECKOUT_HREF, PRECO } from "../_content";
import { Icone } from "./icons";

const SIMBOLO = { sim: "✓", nao: "✕", parcial: "Parcial" } as const;

/** Tabela comparativa (rolagem horizontal no celular) e cartão de oferta. */
export function Comparativo() {
  const c = conteudo.comparativo;
  const o = conteudo.oferta;
  return (
    <section id="oferta" className="au-sec au-comp">
      <div className="au-comp__topo">
        <h2>{c.h2}</h2>
      </div>
      <div className="au-comp__tabela-wrap">
        <p className="au-comp__dica" aria-hidden="true">{c.dica}</p>
        <div className="au-comp__scroll" tabIndex={0}>
          <table className="au-tabela">
            <thead>
              <tr>
                <th scope="col"><span className="au-sr">Critério</span></th>
                {c.colunas.map((col, i) => (
                  <th key={col} scope="col" className={i === 0 ? "au-tabela__destaque" : undefined}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.linhas.map((l) => (
                <tr key={l.criterio}>
                  <th scope="row">{l.criterio}</th>
                  {l.valores.map((v, i) => (
                    <td key={i} className={`au-tabela__${v} ${i === 0 ? "au-tabela__destaque" : ""}`}>
                      <span aria-hidden={v !== "parcial" ? true : undefined}>{SIMBOLO[v]}</span>
                      {v !== "parcial" && <span className="au-sr">{c.rotulos[v]}</span>}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="au-tabela__preco">
                <th scope="row">{c.investimento.criterio}</th>
                {c.investimento.valores.map((v, i) => (
                  <td key={i} className={i === 0 ? "au-tabela__destaque" : undefined}>
                    <span className="au-tabela__nowrap">{v.valor}{"unidade" in v && <span className="au-tabela__unidade">{v.unidade}</span>}</span>
                    {"nota" in v && <><br /><span className="au-tabela__nota">{v.nota}</span></>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="au-oferta">
        <div className="au-oferta__titulo"><Icone nome="premio" /><span>{o.inclusoTitulo}</span></div>
        <ul className="au-oferta__bonus">
          {o.incluso.map((b) => <li key={b}><span aria-hidden="true">✓</span>{b}</li>)}
        </ul>
        <div className="au-oferta__linha" aria-hidden="true" />
        <p className="au-oferta__resumo">{o.resumo}</p>
        <p className="au-oferta__de">{o.de} <s>{PRECO.de}</s> {o.por}</p>
        <p className="au-oferta__valor">{PRECO.valor} <span>{PRECO.periodo}</span></p>
        <a className="au-btn" href={CHECKOUT_HREF}>{o.cta}</a>
        <p className="au-oferta__garantia">
          <span aria-hidden="true">🛡</span>
          <span><strong>{o.garantiaTitulo}.</strong> {o.garantiaTexto}</span>
        </p>
      </div>
    </section>
  );
}
