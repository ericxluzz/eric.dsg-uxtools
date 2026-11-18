import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function EmptyState({ icon = 'inbox', title, children, action }) {
  return <div className="e-empty"><span className="e-empty__icon"><Icon name={icon} size={22} /></span><span className="e-empty__title">{title}</span>{children && <span style={{ maxWidth: 360, fontSize: 13 }}>{children}</span>}{action}</div>;
}
