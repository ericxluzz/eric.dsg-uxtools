import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface PageHeaderProps {
  kicker?: string;
  title: string;
  desc?: string;
  actions?: ReactNode;
  back?: string;
  onBack?: () => void;
}

/**
 * Faça: no máximo um botão de ação primária em `actions`; use `back` quando a tela tem um "pai" claro.
 * Não faça: repetir o `title` da página no `kicker` — o kicker é a categoria/contexto, não o nome.
 */
export function PageHeader({ kicker, title, desc, actions, back, onBack }: PageHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {back && (
        <button type="button" className="e-back" onClick={onBack}>
          <Icon name="arrow-left" size={15} />
          {back}
        </button>
      )}
      <div className="e-pagehead">
        <div style={{ minWidth: 0 }}>
          {kicker && <div className="e-pagehead__kicker">{kicker}</div>}
          <h1 className="e-pagehead__title">{title}</h1>
          {desc && <p className="e-pagehead__desc">{desc}</p>}
        </div>
        {actions && <div className="e-pagehead__actions">{actions}</div>}
      </div>
    </div>
  );
}
