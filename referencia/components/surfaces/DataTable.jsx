import React from 'react';
export function DataTable({ columns = [], rows = [], onRow }) {
  const tpl = columns.map((c) => c.width || 'minmax(0,1fr)').join(' ');
  return <div className="e-card" style={{ overflow: 'hidden' }}><div className="e-table" role="table">
    <div className="e-table__head" role="row" style={{ gridTemplateColumns: tpl }}>{columns.map((c) => <span key={c.key} role="columnheader">{c.label}</span>)}</div>
    {rows.map((r, i) => <div key={i} role="row" className="e-table__row" style={{ gridTemplateColumns: tpl, cursor: onRow ? 'pointer' : undefined }} onClick={onRow ? () => onRow(r) : undefined}>{columns.map((c) => <span key={c.key} role="cell">{c.render ? c.render(r) : r[c.key]}</span>)}</div>)}
  </div></div>;
}
