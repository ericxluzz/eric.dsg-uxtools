import React from 'react';
export function FormSection({ n, title, sub, children, footer }) {
  return <section className="e-formsec"><header className="e-formsec__head">{n != null && <span className="e-formsec__n">{n}</span>}<div style={{ minWidth: 0 }}><h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h2>{sub && <div style={{ fontSize: 12, color: 'var(--c-text-2)' }}>{sub}</div>}</div></header><div className="e-formsec__body">{children}</div>{footer && <div className="e-formsec__foot">{footer}</div>}</section>;
}
