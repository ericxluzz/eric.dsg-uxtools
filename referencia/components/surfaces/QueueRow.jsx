import React from 'react';
import { Icon } from '../core/Icon.jsx';
const BAR = { ok: 'var(--c-ok-solid)', warn: 'var(--c-stage-vistoria)', info: 'var(--c-primary)', bad: 'var(--c-bad-solid)' };
export function QueueRow({ kicker, title, sub, badges, action, bar, onClick }) {
  return <div className="e-row" style={{ '--e-row-bar': BAR[bar] || 'transparent' }} onClick={onClick}>
    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>{kicker && <span className="e-row__kicker">{kicker}</span>}<span className="e-row__title">{title}</span>{sub && <span className="e-row__sub">{sub}</span>}</span>
    <span className="e-row__badges">{badges}</span><span>{action}</span>
  </div>;
}
