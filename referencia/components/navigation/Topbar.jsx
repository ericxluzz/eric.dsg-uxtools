import React from 'react';
export function Topbar({ children, right }) {
  return <header className="e-topbar">{children}<div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, flex: 'none' }}>{right}</div></header>;
}
