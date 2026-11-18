import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Icon } from '../core/Icon.jsx';
const IC = { info: 'info', warn: 'triangle-alert', ok: 'circle-check', bad: 'circle-x' };
export function Callout({ tone, flush, icon, children }) {
  return <div role={tone === 'bad' ? 'alert' : 'note'} className={cx('e-callout', tone && 'e-callout--' + tone, flush && 'e-callout--flush')}><Icon name={icon || IC[tone] || 'info'} size={14} className="e-callout__icon" style={{ color: tone ? undefined : 'var(--c-link)' }} /><span style={{ minWidth: 0, textWrap: 'pretty' }}>{children}</span></div>;
}
