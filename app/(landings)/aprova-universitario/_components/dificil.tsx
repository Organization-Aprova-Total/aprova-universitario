import { Pic } from "../_lib/picture";
import { Rich } from "../_lib/rich";
import { conteudo, IMG } from "../_content";
import { ListaCheck } from "./lista-check";

export function Dificil() {
  const c = conteudo.dificil;
  return (
    <section id="o-problema" className="au-sec">
      <div className="au-duas">
        <div className="au-duas__texto">
          <h2>{c.h2}</h2>
          <p className="au-duas__sub">{c.sub}</p>
          <ListaCheck itens={c.itens} />
          <p className="au-duas__p"><Rich text={c.p} /></p>
        </div>
        <div className="au-duas__img">
          <Pic src={`${IMG}/plataforma-mockup`} alt={c.imagemAlt} width={1006} height={732} />
        </div>
      </div>
    </section>
  );
}
