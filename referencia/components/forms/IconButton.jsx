import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Icon } from '../core/Icon.jsx';
export function IconButton({ icon, label, variant, size, className, ...rest }) {
  return <button type="button" aria-label={label} title={label} className={cx('e-iconbtn', variant && 'e-iconbtn--' + variant, size === 'sm' && 'e-iconbtn--sm', className)} {...rest}><Icon name={icon} size={size === 'sm' ? 14 : 16} /></button>;
}
