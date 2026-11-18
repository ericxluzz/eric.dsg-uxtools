import React from 'react';
export function Timeline({ items = [] }) {
  return <ol className="e-timeline">{items.map((h, i) => <li key={i} className="e-timeline__item"><span className="e-timeline__dot" style={h.color ? { background: h.color } : undefined} /><div className="e-timeline__t">{h.t}</div><div className="e-timeline__q">{[h.q, h.who].filter(Boolean).join(' · ')}</div></li>)}</ol>;
}
