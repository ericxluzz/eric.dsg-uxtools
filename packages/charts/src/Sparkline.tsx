export interface SparklineProps {
  data: number[];
  color?: string;
  w?: number;
  h?: number;
}

/**
 * Faça: use dentro de cartões/tabelas para tendência rápida (sem eixos, sem rótulos).
 * Não faça: usar como único lugar onde um valor aparece — sempre acompanhe de um número.
 */
export function Sparkline({ data, color = "var(--c-chart-1)", w = 120, h = 32 }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const x = (i: number) => 2 + (i / (data.length - 1)) * (w - 4);
  const y = (v: number) => 3 + (h - 6) * (1 - (v - min) / (max - min || 1));
  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <path
        d={data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")}
        style={{ fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}
      />
      {last != null && <circle cx={x(data.length - 1)} cy={y(last)} r={3} style={{ fill: color }} />}
    </svg>
  );
}
