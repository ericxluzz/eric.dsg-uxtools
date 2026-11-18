import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function FilterChip({ children, onRemove }) { return <span className="e-filter">{children}<button aria-label={'Remover filtro ' + children} onClick={onRemove}><Icon name="x" size={12} /></button></span>; }
