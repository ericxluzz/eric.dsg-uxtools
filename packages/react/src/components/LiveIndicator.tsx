import type { ReactNode } from "react";

export interface LiveIndicatorProps {
  children?: ReactNode;
}

/**
 * Faça: use só quando os dados realmente atualizam sem reload (ponto 7px, não clicável).
 * Não faça: usar como botão ou link — é um indicador passivo de estado.
 */
export function LiveIndicator({ children = "Tempo real" }: LiveIndicatorProps) {
  return (
    <span className="e-live">
      <span className="e-live__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
