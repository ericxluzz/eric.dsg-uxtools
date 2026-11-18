import React from 'react';
export function Count({ n, active, alert, label }) {
  return <span className={'e-count' + (active ? ' e-count--active' : alert ? ' e-count--alert' : '')} aria-label={label}>{n}</span>;
}
