import React from 'react';
export function Checkbox({ children, ...rest }) {
  return <label className="e-check"><input type="checkbox" {...rest} />{children}</label>;
}
