import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');
import { Icon } from '../core/Icon.jsx';
export function TextField({ label, icon, required, help, error, size, multiline, id, className, ...rest }) {
  const fid = id || 'f-' + String(label || '').toLowerCase().replace(/\W+/g, '-');
  const Tag = multiline ? 'textarea' : 'input';
  return <label className={cx('e-field', className)} htmlFor={fid}>
    <span className="e-field__label">{icon && <Icon name={icon} size={13} style={{ color: 'var(--c-link)' }} />}{label}{required && <span className="e-field__req" aria-hidden="true">*</span>}</span>
    <Tag id={fid} className={cx('e-input', size === 'lg' && 'e-input--lg')} aria-invalid={error ? 'true' : undefined} aria-required={required || undefined} aria-describedby={error || help ? fid + '-d' : undefined} {...rest} />
    {error ? <span id={fid + '-d'} className="e-field__err"><Icon name="circle-alert" size={13} />{error}</span> : help ? <span id={fid + '-d'} className="e-field__help">{help}</span> : null}
  </label>;
}
