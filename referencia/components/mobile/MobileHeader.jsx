import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function MobileHeader({ title, onBack, action }) { return <header className="e-m-header">{onBack ? <button className="e-m-iconbtn" aria-label="Voltar" onClick={onBack}><Icon name="arrow-left" size={20} /></button> : <span style={{ width: 8 }} />}<h1 className="e-m-header__title">{title}</h1>{action}</header>; }
