import { Pic } from "../_lib/picture";
import { conteudo, EMAIL_CONTATO, IMG, SITE_HREF, TERMOS_HREF, WHATSAPP_VENDAS } from "../_content";

export function Rodape() {
  const c = conteudo.rodape;
  return (
    <footer className="au-rodape">
      <div className="au-rodape__col">
        <a className="au-rodape__logo" href={SITE_HREF} aria-label={c.logoAlt}>
          <Pic src={`${IMG}/logo-aprova-universitario-branco`} alt={c.logoAlt} width={600} height={67} />
        </a>
        <a className="au-rodape__link" href={TERMOS_HREF}>{c.termos}</a>
        <div className="au-rodape__linha" aria-hidden="true" />
        <div className="au-rodape__vendas">
          <Pic src={`${IMG}/whatsapp`} alt="WhatsApp" width={96} height={96} />
          <p className="au-rodape__txt"><strong>{c.vendasRotulo}</strong><br />{WHATSAPP_VENDAS}</p>
        </div>
        <p className="au-rodape__txt">
          {c.empresa.map((l) => <span key={l}>{l}<br /></span>)}
          <a href={`mailto:${EMAIL_CONTATO}`}>{c.emailExibido}</a>
        </p>
        <p className="au-rodape__txt">{c.copyright}</p>
      </div>
    </footer>
  );
}
