import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function SearchField({ placeholder = 'Buscar protocolo, endereço ou nome', shortcut = '/', ...rest }) {
  return <label className="e-search"><Icon name="search" size={15} /><input type="search" placeholder={placeholder} aria-label={placeholder} {...rest} />{shortcut && <span className="e-kbd">{shortcut}</span>}</label>;
}
