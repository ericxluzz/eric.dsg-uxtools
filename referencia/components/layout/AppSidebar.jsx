import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { SideNav } from '../navigation/SideNav.jsx';
import { UserMenu } from '../navigation/UserMenu.jsx';
export function AppSidebar({ logo, name = 'Conecta+', sub = 'Painel de gestão', navTitle, items = [], value, onChange, footerItems = [], user, onSair }) {
  return <aside className="e-sidebar" aria-label="Menu principal">
    <div className="e-sidebar__brand">{logo && <span className="e-sidebar__logo"><img src={logo} alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} /></span>}<span><span className="e-sidebar__name" style={{ display: 'block' }}>{name}</span><span className="e-sidebar__sub">{sub}</span></span></div>
    <div className="e-sidebar__nav"><SideNav title={navTitle} items={items} value={value} onChange={onChange} /></div>
    <div className="e-sidebar__foot">{footerItems.map((f) => <button key={f.label} className="e-nav__item" onClick={f.onClick}><Icon name={f.icon} size={16} /><span className="e-nav__label">{f.label}</span></button>)}{user && <UserMenu {...user} onSair={onSair} />}</div>
  </aside>;
}
