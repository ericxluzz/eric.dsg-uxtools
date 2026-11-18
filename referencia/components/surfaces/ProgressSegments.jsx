import React from 'react';
export function ProgressSegments({ total = 4, done = 0, state = 'on', label }) {
  return <div className="e-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}>{Array.from({ length: total }, (_, i) => <span key={i} className={'e-progress__seg' + (i < done ? ' e-progress__seg--' + state : '')} />)}</div>;
}
