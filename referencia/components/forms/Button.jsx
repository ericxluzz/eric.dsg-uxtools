import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Icon } from '../core/Icon.jsx';
export function Button({ variant = 'primary', size = 'md', icon, iconRight, block, children, className, type = 'button', ...rest }) {
  return <button type={type} className={cx('e-btn', 'e-btn--' + variant, size !== 'md' && 'e-btn--' + size, block && 'e-btn--block', className)} {...rest}>
    {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}{children}{iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
  </button>;
}
