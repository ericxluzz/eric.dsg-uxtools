import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Count } from '../feedback/Count.jsx';
export function SideNav({ title, items = [], value, onChange }) {
  return <nav className="e-nav">{title && <div className="e-nav__title">{title}</div>}{items.map((n) => <button key={n.value} className="e-nav__item" aria-current={n.value === value ? 'page' : undefined} onClick={() => onChange && onChange(n.value)}><Icon name={n.icon} size={16} /><span className="e-nav__label">{n.label}</span>{n.count ? <Count n={n.count} active={n.value === value} /> : null}</button>)}</nav>;
}
