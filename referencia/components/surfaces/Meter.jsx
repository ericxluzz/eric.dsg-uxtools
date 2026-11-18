import React from 'react';
export function Meter({ label, value, pct = 0, late = 0, goal, color = 'var(--c-primary)', valueColor }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12 }}><span className="e-nowrap" style={{ fontWeight: 600 }}>{label}</span><span style={{ whiteSpace: 'nowrap', fontWeight: 600, color: valueColor }}>{value}</span></div>
    <div className="e-meter"><span className="e-meter__fill" style={{ width: pct + '%', background: color, borderRadius: late ? '99px 0 0 99px' : undefined }} />{late > 0 && <span className="e-meter__fill" style={{ width: late + '%', background: 'var(--c-bad-solid)', borderRadius: '0 99px 99px 0' }} />}{goal != null && <span className="e-meter__goal" style={{ left: goal + '%' }} />}</div></div>;
}
