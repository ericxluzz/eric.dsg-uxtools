import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function NotificationBell({ count = 0, open, onClick }) {
  return <button className="e-iconbtn e-bell" aria-label={count ? count + ' avisos novos' : 'Avisos'} aria-haspopup="dialog" aria-expanded={!!open} onClick={onClick}><Icon name="bell" size={17} />{count > 0 && <span className="e-bell__count" aria-hidden="true">{count > 9 ? '9+' : count}</span>}</button>;
}
