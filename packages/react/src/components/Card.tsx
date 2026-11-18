import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export interface CardProps {
  title?: string;
  actions?: ReactNode;
  pad?: boolean;
  active?: boolean;
  hover?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Faça: profundidade só por borda 1px + fundo (sem sombra/degradê); título com nowrap+ellipsis.
 * Não faça: usar `hover` em cards que não são clicáveis.
 */
export function Card({ title, actions, pad = true, active, hover, children, className }: CardProps) {
  return (
    <section className={cx("e-card", active && "e-card--active", hover && "e-card--hover", className)}>
      {title && (
        <header className="e-card__head">
          <h3 className="e-card__title">{title}</h3>
          {actions}
        </header>
      )}
      <div style={pad ? { padding: "var(--e-pad-card)" } : undefined}>{children}</div>
    </section>
  );
}
