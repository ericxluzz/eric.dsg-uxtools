import { Fragment } from "react";

export interface HeatmapProps {
  rows: string[];
  cols: string[];
  values: number[][];
  max?: number;
}

/**
 * Faça: use a escala sequencial `--c-seq-1..5` (claro → forte); texto branco só nas células 4–5.
 * Não faça: usar para mais de ~8 colunas sem rolagem horizontal — células pequenas demais perdem leitura.
 */
export function Heatmap({ rows, cols, values, max }: HeatmapProps) {
  const m = max || Math.max(...values.flat());
  const passo = (v: number) => Math.min(5, Math.max(1, Math.ceil((v / m) * 5)));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `44px repeat(${cols.length}, minmax(0,1fr))`,
        gap: 3,
        fontSize: 11,
      }}
    >
      <span />
      {cols.map((c) => (
        <span key={c} style={{ textAlign: "center", color: "var(--c-chart-axis)" }}>
          {c}
        </span>
      ))}
      {rows.map((r, i) => (
        <Fragment key={r}>
          <span style={{ color: "var(--c-chart-axis)", alignSelf: "center" }}>{r}</span>
          {values[i]!.map((v, j) => {
            const s = passo(v);
            return (
              <span
                key={j}
                title={`${r} ${cols[j]}: ${v}`}
                style={{
                  height: 30,
                  borderRadius: 5,
                  background: `var(--c-seq-${s})`,
                  color: s >= 4 ? "#fff" : "var(--c-text)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 600,
                }}
              >
                {v}
              </span>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
