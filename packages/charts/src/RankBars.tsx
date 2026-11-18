export interface RankBarsItem {
  l: string;
  v: number;
  hi?: "good" | "bad";
}

export interface RankBarsProps {
  items: RankBarsItem[];
  max?: number;
  goal?: number;
  unit?: string;
}

/**
 * Faça: destaque só 1–2 linhas com `hi` (good/bad); as demais ficam em `--c-chart-muted`.
 * Não faça: usar para comparar mais de ~10 itens — corte para o top N e um "ver todos".
 */
export function RankBars({ items, max, goal, unit = "" }: RankBarsProps) {
  const m = max || Math.max(...items.map((i) => i.v)) * 1.1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
      {items.map((it) => (
        <div
          key={it.l}
          style={{
            display: "grid",
            gridTemplateColumns: "120px minmax(0,1fr) 56px",
            gap: 10,
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <span className="e-nowrap" style={{ fontWeight: it.hi ? 600 : 500 }}>
            {it.l}
          </span>
          <span style={{ position: "relative", height: 14 }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: 4, background: "var(--c-surface-2)" }} />
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${(it.v / m) * 100}%`,
                borderRadius: 4,
                background: it.hi ? (it.hi === "bad" ? "var(--c-chart-late)" : "var(--c-chart-1)") : "var(--c-chart-muted)",
              }}
            />
            {goal != null && (
              <span
                style={{
                  position: "absolute",
                  top: -3,
                  bottom: -3,
                  left: `${(goal / m) * 100}%`,
                  width: 2,
                  background: "var(--c-chart-goal)",
                }}
              />
            )}
          </span>
          <b style={{ fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>
            {String(it.v).replace(".", ",")}
            {unit}
          </b>
        </div>
      ))}
    </div>
  );
}
