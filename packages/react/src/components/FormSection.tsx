import type { ReactNode } from "react";

export interface FormSectionProps {
  n?: number;
  title: string;
  sub?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

/**
 * Faça: numere seções (`n`) em formulários longos para dar progresso visual.
 * Não faça: usar mais de ~5 seções numa única tela — considere um Stepper com várias páginas.
 */
export function FormSection({ n, title, sub, children, footer }: FormSectionProps) {
  return (
    <section className="e-formsec">
      <header className="e-formsec__head">
        {n != null && <span className="e-formsec__n">{n}</span>}
        <div style={{ minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h2>
          {sub && <div style={{ fontSize: 12, color: "var(--c-text-2)" }}>{sub}</div>}
        </div>
      </header>
      <div className="e-formsec__body">{children}</div>
      {footer && <div className="e-formsec__foot">{footer}</div>}
    </section>
  );
}
