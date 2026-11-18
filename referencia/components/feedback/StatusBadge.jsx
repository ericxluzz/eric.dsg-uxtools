import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function StatusBadge({ tone = 'neu', icon, dot, children }) {
  return <span className={'e-badge e-badge--' + tone}>{icon ? <Icon name={icon} size={13} /> : dot ? <span className="e-badge__dot" /> : null}{children}</span>;
}
