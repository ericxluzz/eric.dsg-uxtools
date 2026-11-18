export interface FunnelStep {
  l: string;
  v: number;
}

export interface FunnelProps {
  steps: FunnelStep[];
}

/**
 * Faça: primeiro passo é sempre a base (100%); cada etapa seguinte mostra "% seguem" da anterior.
 * Não faça: usar para dados que não representam um funil real de conversão/avanço sequencial.
 */
export function Funnel({ steps }: FunnelProps) {
  const m = steps[0]?.v || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {steps.map((s, i) => (
        <div
          key={s.l}
          style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 92px", gap: 10, alignItems: "center", fontSize: 12 }}
        >
          <span className="e-nowrap" style={{ fontWeight: 500 }}>
            {s.l}
          </span>
          <span
            style={{
              height: 26,
              width: `${(s.v / m) * 100}%`,
              borderRadius: 6,
              background: "var(--c-chart-1)",
              opacity: 1 - i * 0.15,
              color: "#fff",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
            }}
          >
            {s.v}
          </span>
          <span style={{ color: "var(--c-text-2)", whiteSpace: "nowrap" }}>
            {i ? `${Math.round((s.v / steps[i - 1]!.v) * 100)}% seguem` : "início"}
          </span>
        </div>
      ))}
    </div>
  );
}
