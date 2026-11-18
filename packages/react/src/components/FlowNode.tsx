import type { ReactNode } from "react";

export interface FlowNodeProps {
  n: number;
  title: string;
  prazo?: string;
  setor?: string;
  tags?: string[];
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

/**
 * Faça: numere os nós (`n`) na ordem do fluxo; use `selected` para o nó aberto no Inspector.
 * Não faça: usar mais de ~4 tags por nó — a linha de selos precisa continuar legível em 300px.
 */
export function FlowNode({ n, title, prazo, setor, tags = [], selected, onClick, children }: FlowNodeProps) {
  return (
    <button type="button" className={`e-node${selected ? " e-node--selected" : ""}`} onClick={onClick} aria-pressed={!!selected}>
      {selected && <span className="e-node__flag">Selecionada</span>}
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="e-node__n">{n}</span>
        <span className="e-nowrap" style={{ fontSize: 14, fontWeight: 600 }}>
          {title}
        </span>
        {prazo && (
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--c-text-2)", whiteSpace: "nowrap" }}>{prazo}</span>
        )}
      </span>
      {setor && (
        <span className="e-nowrap" style={{ fontSize: 12, color: "var(--c-text-2)" }}>
          {setor}
        </span>
      )}
      {tags.length > 0 && (
        <span style={{ display: "flex", gap: 6, overflow: "hidden" }}>
          {tags.map((t) => (
            <span key={t} className="e-badge e-badge--neu" style={{ height: 20, fontSize: 11 }}>
              {t}
            </span>
          ))}
        </span>
      )}
      {children}
    </button>
  );
}

export interface FlowEdgeProps {
  label?: string;
}

/** Faça: use entre dois FlowNode consecutivos no fluxo horizontal. Não faça: usar como seta solta fora do canvas. */
export function FlowEdge({ label }: FlowEdgeProps) {
  return (
    <div className="e-edge" style={{ paddingTop: 40 }}>
      <span className="e-edge__port" />
      <span className="e-edge__line" />
      {label && <span className="e-edge__label">{label}</span>}
      <span className="e-edge__line" />
      <span className="e-edge__port" />
    </div>
  );
}

export interface AddStepProps {
  onClick?: () => void;
}

/** Faça: use como última peça do fluxo para adicionar uma nova etapa. Não faça: duplicar — só um AddStep por ponta aberta. */
export function AddStep({ onClick }: AddStepProps) {
  return (
    <div className="e-edge" style={{ paddingTop: 30 }}>
      <span className="e-edge__line" style={{ background: "none", borderTop: "2px dashed var(--c-link)" }} />
      <button type="button" className="e-add-step" onClick={onClick}>
        + Adicionar etapa
      </button>
    </div>
  );
}
