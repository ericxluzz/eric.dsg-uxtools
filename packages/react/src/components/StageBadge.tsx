import type { ReactNode } from "react";

export type Stage = "triagem" | "vistoria" | "execucao" | "conclusao";

export interface StageBadgeProps {
  stage?: Stage;
  children: ReactNode;
}

const COR: Record<Stage, string> = {
  triagem: "var(--c-stage-triagem)",
  vistoria: "var(--c-stage-vistoria)",
  execucao: "var(--c-stage-execucao)",
  conclusao: "var(--c-stage-conclusao)",
};

/**
 * Faça: use o texto da etapa junto do quadrado de cor (nunca só a cor).
 * Não faça: usar fora das 4 etapas do fluxo (triagem/vistoria/execução/conclusão).
 */
export function StageBadge({ stage = "triagem", children }: StageBadgeProps) {
  return (
    <span className="e-stage">
      <span className="e-stage__sq" style={{ background: COR[stage] }} />
      {children}
    </span>
  );
}
