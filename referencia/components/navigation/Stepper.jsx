import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Stepper({ steps = [], current = 0 }) {
  return <ol className="e-stepper" style={{ margin: 0, padding: 0, listStyle: 'none' }}>{steps.map((s, i) => <li key={i} className={'e-step' + (i < current ? ' e-step--done' : i === current ? ' e-step--current' : '')} aria-current={i === current ? 'step' : undefined}><span className="e-step__n">{i < current ? <Icon name="check" size={12} stroke={2.5} /> : i + 1}</span><span className="e-nowrap">{s}</span></li>)}</ol>;
}
