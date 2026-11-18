export interface DumbbellItem {
  l: string;
  a: number;
  b: number;
}

export interface DumbbellProps {
  items: DumbbellItem[];
  max?: number;
  unit?: string;
  from?: string;
  to?: string;
}

/**
 * Faça: use para comparar "antes × agora" (dois pontos por linha); seta ↓/↑ já indica se melhorou.
 * Não faça: usar quando a ordem dos dois pontos não importa — Dumbbell assume uma direção de mudança.
 */
export function Dumbbell({ items, max, unit = "", from = "Antes", to = "Agora" }: DumbbellProps) {
  const m = max || Math.max(...items.flatMap((i) => [i.a, i.b])) * 1.1;
  const p = (v: number) => `${(v / m) * 100}%`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, border: "2px solid var(--c-chart-7)" }} />
          {from}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "var(--c-chart-1)" }} />
          {to}
        </span>
      </div>
      {items.map((it) => {
        const lo = Math.min(it.a, it.b);
        const hi = Math.max(it.a, it.b);
        const melhorou = it.b < it.a;
        return (
          <div
            key={it.l}
            style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) 70px", gap: 10, alignItems: "center", fontSize: 12 }}
          >
            <span className="e-nowrap" style={{ fontWeight: 500 }}>
              {it.l}
            </span>
            <span style={{ position: "relative", height: 16 }}>
              <span
                style={{
                  position: "absolute",
                  top: 7,
                  height: 2,
                  left: p(lo),
                  width: `${((hi - lo) / m) * 100}%`,
                  background: melhorou ? "var(--c-chart-2)" : "var(--c-chart-late)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: `calc(${p(it.a)} - 6px)`,
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: "var(--c-surface)",
                  border: "2px solid var(--c-chart-7)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: `calc(${p(it.b)} - 6px)`,
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: "var(--c-chart-1)",
                }}
              />
            </span>
            <b style={{ fontWeight: 600, whiteSpace: "nowrap", color: melhorou ? "var(--c-ok-fg)" : "var(--c-bad-fg)" }}>
              {melhorou ? "↓" : "↑"} {String(Math.abs(it.b - it.a).toFixed(1)).replace(".", ",")}
              {unit}
            </b>
          </div>
        );
      })}
    </div>
  );
}
