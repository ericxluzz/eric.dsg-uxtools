import { EIXO_ESTILO } from "./axis";

export interface LineChartProps {
  data: number[];
  goal?: number;
  height?: number;
  labels?: string[];
  color?: string;
  unit?: string;
}

/**
 * Faça: eixo sempre em 0 (sem truncar a base); mostre a meta como linha tracejada quando houver `goal`.
 * Não faça: usar para mais de ~12 pontos sem agrupar — nesse caso agregue por semana/mês antes.
 */
export function LineChart({ data, goal, height = 200, labels = [], color = "var(--c-chart-1)", unit = "" }: LineChartProps) {
  const W = 600;
  const H = height;
  const P = { l: 34, r: 56, t: 14, b: 24 };
  const max = Math.max(...data, goal || 0) * 1.15;
  const iw = W - P.l - P.r;
  const ih = H - P.t - P.b;
  const x = (i: number) => P.l + (i / (data.length - 1)) * iw;
  const y = (v: number) => P.t + ih - (v / max) * ih;
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block", overflow: "visible" }}>
      {[0, 0.5, 1].map((f) => {
        const yy = y((max * f) / 1.15);
        return (
          <g key={f}>
            <line
              x1={P.l}
              x2={W - P.r}
              y1={yy}
              y2={yy}
              style={{ stroke: "var(--c-chart-grid)", strokeDasharray: f ? "3 4" : "0" }}
            />
            <text x={P.l - 6} y={yy + 4} textAnchor="end" style={EIXO_ESTILO}>
              {Math.round((max * f) / 1.15)}
            </text>
          </g>
        );
      })}
      <path
        d={`${line} L${x(data.length - 1)} ${P.t + ih} L${P.l} ${P.t + ih} Z`}
        style={{ fill: color, opacity: 0.1 }}
      />
      {goal != null && (
        <g>
          <line
            x1={P.l}
            x2={W - P.r}
            y1={y(goal)}
            y2={y(goal)}
            style={{ stroke: "var(--c-chart-goal)", strokeWidth: 2, strokeDasharray: "6 4" }}
          />
          <text x={W - P.r + 6} y={y(goal) + 4} style={{ ...EIXO_ESTILO, fill: "var(--c-chart-goal)", fontWeight: 600 }}>
            Meta {goal}
          </text>
        </g>
      )}
      <path d={line} style={{ fill: "none", stroke: color, strokeWidth: 2.5, strokeLinejoin: "round", strokeLinecap: "round" }} />
      {last != null && (
        <>
          <circle cx={x(data.length - 1)} cy={y(last)} r={5} style={{ fill: color, stroke: "var(--c-surface)", strokeWidth: 2 }} />
          <text x={x(data.length - 1) + 9} y={y(last) - 8} style={{ fontSize: 13, fontWeight: 700, fill: "var(--c-text)" }}>
            {last}
            {unit}
          </text>
        </>
      )}
      {labels.map(
        (l, i) =>
          l && (
            <text key={i} x={x(i)} y={H - 4} textAnchor="middle" style={EIXO_ESTILO}>
              {l}
            </text>
          ),
      )}
    </svg>
  );
}
