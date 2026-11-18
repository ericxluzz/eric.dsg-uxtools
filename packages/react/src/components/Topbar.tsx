import type { ReactNode } from "react";

export interface TopbarProps {
  children?: ReactNode;
  right?: ReactNode;
}

/**
 * Faça: 58px de altura (já no CSS); `children` é a área de busca, `right` fica sempre à direita.
 * Não faça: colocar mais de um botão de ação primária à direita.
 */
export function Topbar({ children, right }: TopbarProps) {
  return (
    <header className="e-topbar">
      {children}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, flex: "none" }}>
        {right}
      </div>
    </header>
  );
}
