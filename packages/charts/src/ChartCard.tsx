import { useState } from "react";
import type { ReactNode } from "react";

export interface ChartTable {
  head: string[];
  rows: Array<Array<string | number>>;
}

export interface ChartCardProps {
  title: string;
  sub?: string;
  /** frase lida pelo leitor de tela, resumindo a conclusão do gráfico */
  summary: string;
  table: ChartTable;
  source?: string;
  children: ReactNode;
}

/**
 * Faça: título = conclusão ("68% concluídas no prazo"), não o tipo de gráfico ("Gráfico de linha").
 * Não faça: usar pizza; deixar sem `summary` — é o que um leitor de tela ouve no lugar do desenho.
 */
export function ChartCard({ title, sub, summary, table, children, source }: ChartCardProps) {
  const [mostrarTabela, setMostrarTabela] = useState(false);

  return (
    <section
      className="e-card"
      style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}
      aria-label={title}
    >
      <header style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: 15, lineHeight: "22px", fontWeight: 600 }}>{title}</h3>
          {sub && <div style={{ fontSize: 12, color: "var(--c-text-2)" }}>{sub}</div>}
        </div>
        <button
          type="button"
          className="e-btn e-btn--ghost e-btn--sm"
          aria-pressed={mostrarTabela}
          onClick={() => setMostrarTabela((v) => !v)}
        >
          {mostrarTabela ? "Ver gráfico" : "Ver dados"}
        </button>
      </header>
      {mostrarTabela ? (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {table.head.map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "6px 8px",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "var(--c-text-3)",
                    background: "var(--c-surface-2)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: "6px 8px", borderTop: "1px solid var(--c-border)" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div role="img" aria-label={summary}>
          {children}
        </div>
      )}
      {source && <footer style={{ fontSize: 11, color: "var(--c-text-2)" }}>{source}</footer>}
    </section>
  );
}
