import { Icon } from "./Icon";

export interface PaginationProps {
  page: number;
  pages: number;
  total?: number;
  perPage?: number;
  onChange: (p: number) => void;
}

function listaPaginas(page: number, pages: number): Array<number | "…"> {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const meio = [page - 1, page, page + 1].filter((p) => p > 2 && p < pages - 1);
  const lista: Array<number | "…"> = [
    1,
    page > 3 ? "…" : 2,
    ...meio,
    page < pages - 2 ? "…" : pages - 1,
    pages,
  ];
  return lista.filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Faça: mostre "Mostrando X–Y de Z" sempre que `total` for conhecido; desabilite Anterior/Próxima nas pontas.
 * Não faça: usar para listas curtas que cabem numa tela só — pular paginação é melhor nesse caso.
 */
export function Pagination({ page = 1, pages = 1, total, perPage = 20, onChange }: PaginationProps) {
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total ?? page * perPage);
  const lista = listaPaginas(page, pages);

  return (
    <nav className="e-pager" aria-label="Paginação">
      <span style={{ whiteSpace: "nowrap" }}>
        Mostrando {from}–{to}
        {total != null && ` de ${total}`}
      </span>
      <div className="e-pager__btns">
        <button
          type="button"
          className="e-pager__btn"
          aria-label="Anterior"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          <Icon name="chevron-left" size={14} />
        </button>
        {lista.map((p, i) =>
          p === "…" ? (
            <span key={i} style={{ width: 20, textAlign: "center" }}>
              …
            </span>
          ) : (
            <button
              key={i}
              type="button"
              className="e-pager__btn"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className="e-pager__btn"
          aria-label="Próxima"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
        >
          <Icon name="chevron-right" size={14} />
        </button>
      </div>
    </nav>
  );
}
