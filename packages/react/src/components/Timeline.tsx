export interface TimelineItem {
  t: string;
  q?: string;
  who?: string;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Faça: use para histórico/auditoria em ordem cronológica (mais recente primeiro ou último, seja consistente).
 * Não faça: usar para passos de um fluxo em andamento — prefira Stepper.
 */
export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="e-timeline">
      {items.map((h, i) => (
        <li key={i} className="e-timeline__item">
          <span className="e-timeline__dot" style={h.color ? { background: h.color } : undefined} />
          <div className="e-timeline__t">{h.t}</div>
          <div className="e-timeline__q">{[h.q, h.who].filter(Boolean).join(" · ")}</div>
        </li>
      ))}
    </ol>
  );
}
