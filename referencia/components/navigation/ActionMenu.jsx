import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function ActionMenu({ items = [], label = 'Mais ações' }) {
  const [open, setOpen] = React.useState(false);
  return <span className="e-actions"><button className="e-iconbtn" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="ellipsis" size={16} /></button>
    {open && <><span onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 39 }} /><div role="menu" className="e-menu">{items.map((m, i) => m === '-' ? <div key={i} className="e-menu__sep" /> : <button key={i} role="menuitem" className={'e-menu__item' + (m.danger ? ' e-menu__item--danger' : '')} onClick={() => { setOpen(false); m.onClick && m.onClick(); }}><Icon name={m.icon} size={15} />{m.label}</button>)}</div></>}
  </span>;
}
