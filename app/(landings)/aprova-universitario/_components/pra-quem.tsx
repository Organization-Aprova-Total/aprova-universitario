import { Pic } from "../_lib/picture";
import { Rich } from "../_lib/rich";
import { conteudo, IMG } from "../_content";
import { ListaCheck } from "./lista-check";

export function PraQuem() {
  const c = conteudo.praQuem;
  return (
    <section id="pra-quem" className="au-sec">
      <div className="au-duas au-duas--img-esq">
        <div className="au-duas__texto">
          <h2>{c.h2}</h2>
          <ListaCheck itens={c.itens} />
          <p className="au-duas__p"><Rich text={c.p} /></p>
        </div>
        <div className="au-duas__img">
          <Pic src={`${IMG}/plataforma-celulares`} alt={c.imagemAlt} width={1006} height={732} />
        </div>
      </div>
    </section>
  );
}
