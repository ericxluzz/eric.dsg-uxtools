import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}

/**
 * Faça: explique o porquê (sem resultado vs. nada cadastrado ainda) e ofereça uma ação clara.
 * Não faça: usar texto genérico ("Nada aqui") sem contexto da tela.
 */
export function EmptyState({ icon = "inbox", title, children, action }: EmptyStateProps) {
  return (
    <div className="e-empty">
      <span className="e-empty__icon">
        <Icon name={icon} size={22} />
      </span>
      <span className="e-empty__title">{title}</span>
      {children && <span style={{ maxWidth: 360, fontSize: 13 }}>{children}</span>}
      {action}
    </div>
  );
}
