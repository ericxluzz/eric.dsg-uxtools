import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function PageHeader({ kicker, title, desc, actions, back, onBack }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>{back && <button className="e-back" onClick={onBack}><Icon name="arrow-left" size={15} />{back}</button>}
    <div className="e-pagehead"><div style={{ minWidth: 0 }}>{kicker && <div className="e-pagehead__kicker">{kicker}</div>}<h1 className="e-pagehead__title">{title}</h1>{desc && <p className="e-pagehead__desc">{desc}</p>}</div>{actions && <div className="e-pagehead__actions">{actions}</div>}</div></div>;
}
