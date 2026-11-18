export interface ProgressSegmentsProps {
  total?: number;
  done?: number;
  /** on=andamento · ok=concluído · warn=falta informação */
  state?: "on" | "ok" | "warn";
  label?: string;
}

/**
 * Faça: use para progresso em etapas discretas e pequenas (ex. 4 documentos de uma OS).
 * Não faça: usar para percentuais livres — nesse caso prefira Meter ou ProgressBar.
 */
export function ProgressSegments({ total = 4, done = 0, state = "on", label }: ProgressSegmentsProps) {
  return (
    <div className="e-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={"e-progress__seg" + (i < done ? ` e-progress__seg--${state}` : "")} />
      ))}
    </div>
  );
}
