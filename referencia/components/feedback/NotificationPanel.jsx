import React from 'react';
import { Icon } from '../core/Icon.jsx';
const T = { ok: ['circle-check', 'var(--c-ok-bg)', 'var(--c-ok-fg)'], warn: ['clock', 'var(--c-warn-bg)', 'var(--c-warn-fg)'], info: ['inbox', 'var(--c-info-bg)', 'var(--c-info-fg)'], bad: ['alarm-clock', 'var(--c-bad-bg)', 'var(--c-bad-fg)'] };
export function NotificationPanel({ items = [], onReadAll, onItem }) {
  return <div className="e-notif" role="dialog" aria-label="Avisos">
    <div className="e-notif__head"><span style={{ fontSize: 14, fontWeight: 600 }}>Avisos</span><button className="e-btn e-btn--ghost e-btn--sm" onClick={onReadAll}>Marcar todos como lidos</button></div>
    <div style={{ maxHeight: 380, overflow: 'auto' }}>{items.map((n, i) => { const t = T[n.tone] || T.info; return <button key={i} className={'e-notif__item' + (n.unread ? ' e-notif__item--unread' : '')} onClick={() => onItem && onItem(n)}><span className="e-notif__icon" style={{ background: t[1], color: t[2] }}><Icon name={n.icon || t[0]} size={16} /></span><span style={{ minWidth: 0 }}><span className="e-notif__title" style={{ display: 'block' }}>{n.title}</span><span className="e-notif__sub">{n.sub}</span></span><span className="e-notif__time">{n.time}{n.unread && <span className="e-notif__dot" aria-label="não lido" />}</span></button>; })}</div>
  </div>;
}
