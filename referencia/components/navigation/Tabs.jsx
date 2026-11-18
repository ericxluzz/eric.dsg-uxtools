import React from 'react';
import { Count } from '../feedback/Count.jsx';
export function Tabs({ tabs = [], value, onChange, label }) {
  return <div role="tablist" aria-label={label} className="e-tabs">{tabs.map((t) => { const sel = t.value === value; return <button key={t.value} role="tab" aria-selected={sel} className="e-tab" onClick={() => onChange && onChange(t.value)}>{t.dot && <span className="e-tab__dot" style={{ background: t.dot }} />}{t.label}{t.count != null && <Count n={t.count} active={sel} />}</button>; })}</div>;
}
