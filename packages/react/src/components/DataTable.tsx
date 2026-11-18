import type { ReactNode } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface DataTableColumn<Row> {
  key: string;
  label: string;
  /** CSS grid track, ex. "120px" ou "minmax(0,2fr)" */
  width?: string;
  render?: (row: Row) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: Array<DataTableColumn<Row>>;
  rows: Row[];
  onRow?: (row: Row) => void;
  /** vazio: sem linhas; carregando: skeleton; erro: "Tentar de novo"; sem-permissao: aviso de acesso */
  state?: "pronto" | "vazio" | "carregando" | "erro" | "sem-permissao";
  mensagemVazio?: string;
  mensagemErro?: string;
  onTentarDeNovo?: () => void;
}

function gridTemplate<Row>(columns: Array<DataTableColumn<Row>>): string {
  return columns.map((c) => c.width || "minmax(0,1fr)").join(" ");
}

function EstadoLista({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: "40px 20px",
        textAlign: "center",
        color: "var(--c-text-2)",
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Faça: cubra os 4 estados obrigatórios (vazio, carregando, erro, sem permissão) antes de ligar dados reais.
 * Não faça: deixar célula/cabeçalho quebrar linha — já vem com nowrap+ellipsis das classes `.e-table__*`.
 */
export function DataTable<Row>({
  columns,
  rows,
  onRow,
  state = "pronto",
  mensagemVazio = "Nada por aqui ainda.",
  mensagemErro = "Não foi possível carregar os dados.",
  onTentarDeNovo,
}: DataTableProps<Row>) {
  const tpl = gridTemplate(columns);

  const vazio = state === "pronto" && rows.length === 0;
  const mostrarEstado = state !== "pronto" || vazio;

  return (
    <div className="e-card" style={{ overflow: "hidden" }}>
      <div className="e-table" role="table">
        <div className="e-table__head" role="row" style={{ gridTemplateColumns: tpl }}>
          {columns.map((c) => (
            <span key={c.key} role="columnheader">
              {c.label}
            </span>
          ))}
        </div>

        {state === "carregando" &&
          [0, 1, 2].map((i) => (
            <div key={i} role="row" className="e-table__row" style={{ gridTemplateColumns: tpl }} aria-hidden="true">
              {columns.map((c) => (
                <span key={c.key} role="cell">
                  <span
                    style={{
                      display: "block",
                      height: 12,
                      borderRadius: 4,
                      background: "var(--c-surface-3)",
                      animation: "e-pulse 1.4s ease-in-out infinite",
                      width: "70%",
                    }}
                  />
                </span>
              ))}
            </div>
          ))}

        {state === "pronto" &&
          !vazio &&
          rows.map((row, i) => (
            <div
              key={i}
              role="row"
              className="e-table__row"
              style={{ gridTemplateColumns: tpl, cursor: onRow ? "pointer" : undefined }}
              onClick={onRow ? () => onRow(row) : undefined}
            >
              {columns.map((c) => (
                <span key={c.key} role="cell">
                  {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                </span>
              ))}
            </div>
          ))}
      </div>

      {mostrarEstado && (
        <>
          {state === "erro" ? (
            <EstadoLista>
              <Icon name="circle-alert" size={24} style={{ color: "var(--c-bad-fg)" }} />
              <span>{mensagemErro}</span>
              {onTentarDeNovo && (
                <Button variant="secondary" size="sm" icon="refresh-cw" onClick={onTentarDeNovo}>
                  Tentar de novo
                </Button>
              )}
            </EstadoLista>
          ) : state === "sem-permissao" ? (
            <EstadoLista>
              <Icon name="lock" size={24} />
              <span>Você não tem permissão para ver esta lista.</span>
            </EstadoLista>
          ) : state === "vazio" || vazio ? (
            <EstadoLista>
              <Icon name="inbox" size={24} />
              <span>{mensagemVazio}</span>
            </EstadoLista>
          ) : null}
        </>
      )}
    </div>
  );
}
