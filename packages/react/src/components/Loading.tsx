export interface SpinnerProps {
  label?: string;
}

/** Faça: use dentro de botões (14px) ou isolado (18px) para ações em andamento. Não faça: usar no meio de uma página inteira — prefira Skeleton. */
export function Spinner({ label = "Carregando" }: SpinnerProps) {
  return <span className="e-spinner" role="status" aria-label={label} />;
}

export interface SkeletonProps {
  w?: number | string;
  h?: number;
  r?: number;
}

/** Faça: use para listas e telas carregando (nunca spinner no meio da página). Não faça: deixar `aria-hidden` fora — o skeleton é decorativo. */
export function Skeleton({ w = "100%", h = 12, r = 6 }: SkeletonProps) {
  return <span className="e-skel" aria-hidden="true" style={{ width: w, height: h, borderRadius: r }} />;
}

export interface ProgressBarProps {
  value: number;
  label?: string;
}

/** Faça: use para envio com progresso conhecido (upload, importação). Não faça: usar para espera indeterminada — prefira Spinner. */
export function ProgressBar({ value = 0, label }: ProgressBarProps) {
  return (
    <div className="e-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span className="e-bar__fill" style={{ width: `${value}%`, display: "block" }} />
    </div>
  );
}
