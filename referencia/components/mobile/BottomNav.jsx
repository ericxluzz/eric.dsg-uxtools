import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function BottomNav({ items = [], value, onChange }) { return <nav className="e-m-bottomnav" aria-label="Navegação principal">{items.map((t) => <button key={t.value} className="e-m-tab" aria-current={t.value === value ? 'page' : undefined} onClick={() => onChange && onChange(t.value)}><span className="e-m-tab__pill"><Icon name={t.icon} size={20} /></span>{t.label}</button>)}</nav>; }
