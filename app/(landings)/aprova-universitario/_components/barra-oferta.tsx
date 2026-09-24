"use client";

import { useEffect, useState } from "react";
import { OFERTA_PRAZO, OFERTA_TEXTO } from "../_content";

/**
 * Barra de urgência com contagem regressiva, acima do header. Só renderiza
 * quando OFERTA_PRAZO (ISO) está definido e ainda não venceu. Sem JS ou
 * antes de hidratar, mostra só o texto; a contagem entra no cliente.
 */
export function BarraOferta() {
  const prazo = OFERTA_PRAZO ? new Date(OFERTA_PRAZO).getTime() : 0;
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    if (!prazo) return;
    const tick = () => setRestante(Math.max(0, prazo - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [prazo]);

  if (!prazo || Number.isNaN(prazo) || restante === 0) return null;

  const s = restante === null ? null : Math.floor(restante / 1000);
  const partes = s === null ? null : [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
  const rot = ["d", "h", "min", "s"];

  return (
    <div className="au-urgencia" role="status">
      <span>{OFERTA_TEXTO}</span>
      {partes && (
        <span className="au-urgencia__tempo" aria-label={`${partes[0]} dias, ${partes[1]} horas, ${partes[2]} minutos e ${partes[3]} segundos`}>
          {partes.map((n, i) => <span key={rot[i]}>{String(n).padStart(2, "0")}{rot[i]}</span>)}
        </span>
      )}
    </div>
  );
}
