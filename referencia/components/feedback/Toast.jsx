import React from 'react';
import { Icon } from '../core/Icon.jsx';
const IC = { ok: 'circle-check', warn: 'triangle-alert', info: 'info', bad: 'circle-x' };
export function Toast({ tone = 'info', children }) {
  return <div role="status" aria-live="polite" className="e-toast"><Icon name={IC[tone]} size={16} className={'e-toast__icon--' + tone} />{children}</div>;
}
