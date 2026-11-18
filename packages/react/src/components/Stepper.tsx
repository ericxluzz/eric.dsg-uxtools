import { Icon } from "./Icon";

export interface StepperProps {
  steps: string[];
  current?: number;
}

/**
 * Faça: use para um fluxo linear em andamento (ex. abertura de solicitação em etapas).
 * Não faça: usar como navegação livre entre etapas já visitadas — Stepper só mostra progresso.
 */
export function Stepper({ steps, current = 0 }: StepperProps) {
  return (
    <ol className="e-stepper" style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {steps.map((s, i) => (
        <li
          key={i}
          className={
            "e-step" + (i < current ? " e-step--done" : i === current ? " e-step--current" : "")
          }
          aria-current={i === current ? "step" : undefined}
        >
          <span className="e-step__n">
            {i < current ? <Icon name="check" size={12} stroke={2.5} /> : i + 1}
          </span>
          <span className="e-nowrap">{s}</span>
        </li>
      ))}
    </ol>
  );
}
