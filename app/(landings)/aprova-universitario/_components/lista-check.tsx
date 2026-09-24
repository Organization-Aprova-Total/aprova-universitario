import { Check } from "./icons";

/** Lista com o check amarelo em círculo, igual ao design. */
export function ListaCheck({ itens, className = "" }: { itens: readonly string[]; className?: string }) {
  return (
    <ul className={`au-lista ${className}`}>
      {itens.map((t) => (
        <li key={t}>
          <span className="au-lista__check"><Check /></span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
