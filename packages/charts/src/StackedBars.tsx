export interface StackedBarsSeries {
  k: string;
  l: string;
  c: string;
  fg?: string;
}

export interface StackedBarsRow {
  l: string;
  v: number[];
}

export interface StackedBarsProps {
  rows: StackedBarsRow[];
  series: StackedBarsSeries[];
}

/**
 * Faça: use quando as fatias somam 100% (ex. status de uma fila); rótulo numérico só a partir de 10%.
 * Não faça: usar mais de 4 séries — acima disso a legenda fica difícil de ler (ver README · Gráficos).
 */
export function StackedBars({ rows, series }: StackedBarsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 12 }}>
        {series.map((s) => (
          <span key={s.k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.c }} />
            {s.l}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r.l}
          style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr)", gap: 10, alignItems: "center", fontSize: 12 }}
        >
          <span className="e-nowrap" style={{ fontWeight: 500 }}>
            {r.l}
          </span>
          <span style={{ display: "flex", height: 22, gap: 2, borderRadius: 6, overflow: "hidden" }}>
            {series.map((s, i) => {
              const valor = r.v[i] ?? 0;
              return (
                valor > 0 && (
                  <span
                    key={s.k}
                    title={`${s.l}: ${valor}%`}
                    style={{
                      width: `${valor}%`,
                      background: s.c,
                      color: s.fg || "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {valor >= 10 ? `${valor}%` : ""}
                  </span>
                )
              );
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
