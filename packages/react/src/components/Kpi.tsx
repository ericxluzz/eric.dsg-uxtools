import type { ReactNode } from "react";

export interface KpiProps {
  label: string;
  value: ReactNode;
  delta?: string;
  tone?: "ok" | "bad" | "warn";
}

const COR_DELTA: Record<"ok" | "bad" | "warn", string> = {
  ok: "var(--c-ok-fg)",
  bad: "var(--c-bad-fg)",
  warn: "var(--c-warn-fg)",
};

/**
 * Faça: `label` curto (uma linha, com ellipsis); `delta` com sinal explícito ("+12%", "-3").
 * Não faça: usar cor sozinha para indicar alta/baixa — o texto do `delta` já traz o sinal.
 */
export function Kpi({ label, value, delta, tone }: KpiProps) {
  const cor = tone ? COR_DELTA[tone] : "var(--c-text-2)";
  return (
    <div className="e-card e-kpi">
      <span className="e-kpi__label">{label}</span>
      <span className="e-kpi__value">{value}</span>
      {delta && <span className="e-kpi__delta" style={{ color: cor }}>{delta}</span>}
    </div>
  );
}
