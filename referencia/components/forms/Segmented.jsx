import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Segmented({ options = [], value, onChange, label }) {
  return <div role="radiogroup" aria-label={label} className="e-seg">{options.map((o) => <button key={o.value} type="button" role="radio" aria-checked={o.value === value} className="e-seg__opt" onClick={() => onChange && onChange(o.value)}>{o.icon && <Icon name={o.icon} size={14} />}{o.label}</button>)}</div>;
}
