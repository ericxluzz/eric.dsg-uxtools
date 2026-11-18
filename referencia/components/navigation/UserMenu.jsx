import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Avatar } from '../surfaces/Avatar.jsx';
export function UserMenu({ name, role, photo, items = [], onSair }) {
  const [open, setOpen] = React.useState(false);
  return <div style={{ position: 'relative' }}>
    {open && <><div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 38 }} /><div role="menu" className="e-menu e-menu--up" style={{ zIndex: 39, padding: 6 }}>
      {items.map((m) => <button key={m.label} role="menuitem" className="e-menu__item" onClick={() => { setOpen(false); m.onClick && m.onClick(); }}><Icon name={m.icon} size={16} />{m.label}</button>)}
      <div className="e-menu__sep" /><button role="menuitem" className="e-menu__item e-menu__item--danger" onClick={() => { setOpen(false); onSair && onSair(); }}><Icon name="log-out" size={16} />Sair</button></div></>}
    <button className="e-user" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}><Avatar src={photo} name={name} /><span style={{ flex: 1, minWidth: 0 }}><span className="e-nowrap" style={{ display: 'block', fontSize: 13, fontWeight: 600 }}>{name}</span><span className="e-nowrap" style={{ display: 'block', fontSize: 11, color: 'var(--c-text-2)' }}>{role}</span></span><Icon name="chevrons-up-down" size={14} /></button>
  </div>;
}
