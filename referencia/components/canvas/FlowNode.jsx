import React from 'react';
export function FlowNode({ n, title, prazo, setor, tags = [], selected, onClick, children }) {
  return <button className={'e-node' + (selected ? ' e-node--selected' : '')} onClick={onClick} aria-pressed={!!selected}>
    {selected && <span className="e-node__flag">Selecionada</span>}
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="e-node__n">{n}</span><span className="e-nowrap" style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>{prazo && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--c-text-2)', whiteSpace: 'nowrap' }}>{prazo}</span>}</span>
    {setor && <span className="e-nowrap" style={{ fontSize: 12, color: 'var(--c-text-2)' }}>{setor}</span>}
    {tags.length > 0 && <span style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>{tags.map((t) => <span key={t} className="e-badge e-badge--neu" style={{ height: 20, fontSize: 11 }}>{t}</span>)}</span>}
    {children}
  </button>;
}
export function FlowEdge({ label }) { return <div className="e-edge" style={{ paddingTop: 40 }}><span className="e-edge__port" /><span className="e-edge__line" />{label && <span className="e-edge__label">{label}</span>}<span className="e-edge__line" /><span className="e-edge__port" /></div>; }
export function AddStep({ onClick }) { return <div className="e-edge" style={{ paddingTop: 30 }}><span className="e-edge__line" style={{ background: 'none', borderTop: '2px dashed var(--c-link)' }} /><button className="e-add-step" onClick={onClick}>+ Adicionar etapa</button></div>; }
