import React from 'react';
export function FloatingField({ label, ...rest }) {
  return <label className="e-float"><span className="e-float__label">{label}</span><input className="e-float__input" {...rest} /></label>;
}
