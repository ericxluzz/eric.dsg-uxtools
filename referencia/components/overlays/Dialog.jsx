import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Dialog({ open, title, sub, icon, tone, children, footer, onClose }) {
  if (!open) return null;
  const bg = tone === 'bad' ? 'var(--c-bad-bg)' : 'var(--c-soft)', fg = tone === 'bad' ? 'var(--c-bad-fg)' : 'var(--c-strong)';
  return <><div className="e-scrim" onClick={onClose} /><div role="dialog" aria-modal="true" aria-labelledby="e-dlg-t" className="e-dialog" style={{ animation: 'e-pop .15s ease-out' }}>
    <div className="e-dialog__head">{icon && <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 10, display: 'grid', placeItems: 'center', background: bg, color: fg }}><Icon name={icon} size={20} /></span>}<div style={{ flex: 1, minWidth: 0 }}><h2 id="e-dlg-t" className="e-dialog__title">{title}</h2>{sub && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--c-text-2)' }}>{sub}</p>}</div><button className="e-iconbtn" aria-label="Fechar" onClick={onClose}><Icon name="x" size={16} /></button></div>
    {children && <div className="e-dialog__body">{children}</div>}{footer && <div className="e-dialog__foot">{footer}</div>}
  </div></>;
}
