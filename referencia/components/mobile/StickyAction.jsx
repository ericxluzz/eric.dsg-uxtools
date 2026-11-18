import React from 'react';
export function StickyAction({ children, secondary }) { return <div className="e-m-sticky" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}{secondary}</div>; }
export function MobileButton({ children, ...rest }) { return <button className="e-m-button" {...rest}>{children}</button>; }
