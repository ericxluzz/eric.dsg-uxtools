import type { CSSProperties, ReactNode } from "react";

export type QueueRowBar = "ok" | "warn" | "info" | "bad";

export interface QueueRowProps {
  kicker?: string;
  title: string;
  sub?: string;
  badges?: ReactNode;
  action?: ReactNode;
  /** barra lateral 3px de urgência */
  bar?: QueueRowBar;
  onClick?: () => void;
}

const COR_BARRA: Record<QueueRowBar, string> = {
  ok: "var(--c-ok-solid)",
  warn: "var(--c-stage-vistoria)",
  info: "var(--c-primary)",
  bad: "var(--c-bad-solid)",
};

/**
 * Faça: use `bar` para sinalizar urgência na fila (nunca a única pista — `badges` reforça com texto).
 * Não faça: usar como linha de tabela — QueueRow é para filas/listas de cartão único, não grids de colunas.
 */
export function QueueRow({ kicker, title, sub, badges, action, bar, onClick }: QueueRowProps) {
  const style = { "--e-row-bar": bar ? COR_BARRA[bar] : "transparent" } as CSSProperties;
  return (
    <div className="e-row" style={style} onClick={onClick}>
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        {kicker && <span className="e-row__kicker">{kicker}</span>}
        <span className="e-row__title">{title}</span>
        {sub && <span className="e-row__sub">{sub}</span>}
      </span>
      <span className="e-row__badges">{badges}</span>
      <span>{action}</span>
    </div>
  );
}
