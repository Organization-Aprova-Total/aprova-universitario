import { Fragment } from "react";

/**
 * Renderiza texto do _content com **negrito** em <strong>. Só isso: nada de
 * HTML cru no conteúdo.
 */
export function Rich({ text }: { text: string }) {
  const partes = text.split(/\*\*/);
  return (
    <>
      {partes.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}
