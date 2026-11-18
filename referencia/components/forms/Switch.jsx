import React from 'react';
export function Switch({ checked, onChange, children, ...rest }) {
  return <button type="button" role="switch" aria-checked={!!checked} className="e-switch" onClick={() => onChange && onChange(!checked)} {...rest}><span className="e-switch__track"><span className="e-switch__thumb" /></span>{children}</button>;
}
