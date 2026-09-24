import { Pic } from "../_lib/picture";
import { conteudo, CHECKOUT_HREF, LOGIN_HREF, SITE_HREF, IMG } from "../_content";

/**
 * Barra branca com logo, "Sou aluno" e "Assinar". No celular vira um
 * <details> com o botão hambúrguer: abre o menu amarelo sem JS.
 */
export function Navbar() {
  const c = conteudo.nav;
  const menu = (
    <div className="au-nav__menu">
      <a className="au-btn au-btn--fantasma" href={LOGIN_HREF}>{c.aluno}</a>
      <a className="au-btn au-btn--azul" href={CHECKOUT_HREF}>{c.assinar}</a>
    </div>
  );
  return (
    <header className="au-nav">
      <div className="au-nav__caixa">
        <a className="au-nav__logo" href={SITE_HREF} aria-label={c.logoAlt}>
          <Pic src={`${IMG}/logo-aprova-universitario-preto`} alt={c.logoAlt} width={600} height={67} priority />
        </a>
        {menu}
        <details className="au-nav__toggle">
          <summary aria-label={c.menu}><span /><span /><span /></summary>
          {menu}
        </details>
      </div>
    </header>
  );
}
