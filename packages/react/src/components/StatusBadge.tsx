import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface StatusBadgeProps {
  /** ok=concluído · warn=pendente · info=ação/andamento · bad=atraso/erro · neu=neutro */
  tone?: "ok" | "warn" | "info" | "bad" | "neu";
  icon?: string;
  dot?: boolean;
  children: ReactNode;
}

/**
 * Faça: sempre acompanhe a cor com texto (a cor nunca é o único sinal de status).
 * Não faça: usar sem `children`; inventar uma 6ª cor fora de ok/warn/info/bad/neu.
 */
export function StatusBadge({ tone = "neu", icon, dot, children }: StatusBadgeProps) {
  return (
    <span className={`e-badge e-badge--${tone}`}>
      {icon ? <Icon name={icon} size={13} /> : dot ? <span className="e-badge__dot" /> : null}
      {children}
    </span>
  );
}
