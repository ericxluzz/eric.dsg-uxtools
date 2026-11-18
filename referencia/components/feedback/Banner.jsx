import React from 'react';
import { Icon } from '../core/Icon.jsx';
const IC = { info: 'info', warn: 'triangle-alert', bad: 'circle-x' };
export function Banner({ tone = 'info', children, action, onClose }) {
  return <div role={tone === 'bad' ? 'alert' : 'status'} className={'e-banner e-banner--' + tone}><Icon name={IC[tone]} size={16} /><span className="e-banner__text">{children}</span>{action}{onClose && <button className="e-iconbtn e-iconbtn--sm" style={{ color: 'inherit' }} aria-label="Fechar aviso" onClick={onClose}><Icon name="x" size={14} /></button>}</div>;
}
