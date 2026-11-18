import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { cx } from "../internal/cx";

export type CalloutTone = "info" | "warn" | "ok" | "bad";

export interface CalloutProps {
  tone?: CalloutTone;
  /** sem raio/borda lateral: faixa dentro de card */
  flush?: boolean;
  icon?: string;
  children: ReactNode;
}

const ICONE_PADRAO: Record<CalloutTone, string> = {
  info: "info",
  warn: "triangle-alert",
  ok: "circle-check",
  bad: "circle-x",
};

/**
 * Faça: use `tone="bad"` só para mensagens bloqueantes (vira `role="alert"`).
 * Não faça: empilhar vários Callout na mesma tela — prefira um só com a informação mais importante.
 */
export function Callout({ tone, flush, icon, children }: CalloutProps) {
  return (
    <div
      role={tone === "bad" ? "alert" : "note"}
      className={cx("e-callout", tone && `e-callout--${tone}`, flush && "e-callout--flush")}
    >
      <Icon
        name={icon || (tone ? ICONE_PADRAO[tone] : "info")}
        size={14}
        className="e-callout__icon"
        style={{ color: tone ? undefined : "var(--c-link)" }}
      />
      <span style={{ minWidth: 0 }}>{children}</span>
    </div>
  );
}
