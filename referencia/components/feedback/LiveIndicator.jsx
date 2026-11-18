import React from 'react';
export function LiveIndicator({ children = 'Tempo real' }) { return <span className="e-live"><span className="e-live__dot" aria-hidden="true" />{children}</span>; }
