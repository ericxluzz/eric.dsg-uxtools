import React from 'react';
export function Kpi({ label, value, delta, tone }) {
  const c = { ok: 'var(--c-ok-fg)', bad: 'var(--c-bad-fg)', warn: 'var(--c-warn-fg)' }[tone] || 'var(--c-text-2)';
  return <div className="e-card e-kpi"><span className="e-kpi__label">{label}</span><span className="e-kpi__value">{value}</span>{delta && <span className="e-kpi__delta" style={{ color: c }}>{delta}</span>}</div>;
}
