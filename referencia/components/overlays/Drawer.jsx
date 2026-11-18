import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Drawer({ open, title, children, footer, onClose }) {
  if (!open) return null;
  return <><div className="e-scrim" onClick={onClose} /><aside role="dialog" aria-modal="true" aria-label={title} className="e-drawer"><div className="e-drawer__head"><h2 className="e-dialog__title e-nowrap" style={{ flex: 1 }}>{title}</h2><button className="e-iconbtn" aria-label="Fechar" onClick={onClose}><Icon name="x" size={16} /></button></div><div className="e-drawer__body">{children}</div>{footer && <div className="e-drawer__foot">{footer}</div>}</aside></>;
}
