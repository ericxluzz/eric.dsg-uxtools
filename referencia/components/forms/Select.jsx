import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Select({ label, value, options = [], onChange, placeholder = 'Selecione' }) {
  const [open, setOpen] = React.useState(false);
  const cur = options.find((o) => (o.value ?? o) === value);
  return <div className="e-field"><span className="e-field__label">{label}</span><span className="e-select">
    <button type="button" className="e-select__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}><span className="e-select__val" style={{ color: cur ? undefined : 'var(--c-text-2)' }}>{cur ? (cur.label ?? cur) : placeholder}</span><Icon name="chevron-down" size={14} /></button>
    {open && <div role="listbox" className="e-menu">{options.map((o) => { const v = o.value ?? o; return <button key={v} type="button" role="option" aria-selected={v === value} className="e-menu__item" onClick={() => { onChange && onChange(v); setOpen(false); }}><span className="e-nav__label">{o.label ?? o}</span>{v === value && <Icon name="check" size={14} />}</button>; })}</div>}
  </span></div>;
}
