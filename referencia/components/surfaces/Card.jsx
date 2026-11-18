import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
export function Card({ title, actions, pad = true, active, hover, children, className }) {
  return <section className={cx('e-card', active && 'e-card--active', hover && 'e-card--hover', className)}>
    {title && <header className="e-card__head"><h3 className="e-card__title">{title}</h3>{actions}</header>}
    <div style={pad ? { padding: 'var(--e-pad-card)' } : undefined}>{children}</div>
  </section>;
}
