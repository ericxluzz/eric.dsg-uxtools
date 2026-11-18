import React from 'react';
export function Spinner({ label = 'Carregando' }) { return <span className="e-spinner" role="status" aria-label={label} />; }
export function Skeleton({ w = '100%', h = 12, r = 6 }) { return <span className="e-skel" aria-hidden="true" style={{ width: w, height: h, borderRadius: r }} />; }
export function ProgressBar({ value = 0, label }) { return <div className="e-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}><span className="e-bar__fill" style={{ width: value + '%', display: 'block' }} /></div>; }
