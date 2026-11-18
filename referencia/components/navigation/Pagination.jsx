import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Pagination({ page = 1, pages = 1, total, perPage = 20, onChange }) {
  const from = (page - 1) * perPage + 1, to = Math.min(page * perPage, total ?? page * perPage);
  const list = pages <= 7 ? Array.from({ length: pages }, (_, i) => i + 1) : [1, page > 3 ? '…' : 2, ...[page - 1, page, page + 1].filter((p) => p > 2 && p < pages - 1), page < pages - 2 ? '…' : pages - 1, pages].filter((v, i, a) => a.indexOf(v) === i);
  return <nav className="e-pager" aria-label="Paginação"><span style={{ whiteSpace: 'nowrap' }}>Mostrando {from}–{to}{total != null && ' de ' + total}</span><div className="e-pager__btns"><button className="e-pager__btn" aria-label="Anterior" disabled={page <= 1} onClick={() => onChange(page - 1)}><Icon name="chevron-left" size={14} /></button>{list.map((p, i) => p === '…' ? <span key={i} style={{ width: 20, textAlign: 'center' }}>…</span> : <button key={i} className="e-pager__btn" aria-current={p === page ? 'page' : undefined} onClick={() => onChange(p)}>{p}</button>)}<button className="e-pager__btn" aria-label="Próxima" disabled={page >= pages} onClick={() => onChange(page + 1)}><Icon name="chevron-right" size={14} /></button></div></nav>;
}
