import { useId } from "react";
import type { ReactNode } from "react";

export interface TooltipProps {
  text: string;
  children: ReactNode;
}

/**
 * Faça: use para rótulos curtos de ícones/controles compactos; aparece no hover e no foco.
 * Não faça: colocar informação essencial só no Tooltip — ela precisa existir sem passar o mouse (toque não tem hover).
 */
export function Tooltip({ text, children }: TooltipProps) {
  const id = useId();
  return (
    <span className="e-has-tip" aria-describedby={id}>
      {children}
      <span role="tooltip" id={id} className="e-tooltip">
        {text}
      </span>
    </span>
  );
}
