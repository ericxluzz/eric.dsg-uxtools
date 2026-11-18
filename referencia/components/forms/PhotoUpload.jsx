import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function PhotoUpload({ photos = [], max = 5, onAdd, onRemove, label = 'Fotos do local' }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text-2)' }}>{label} · {photos.length} de {max}</span><div className="e-upload">
    {photos.map((p, i) => <span key={i} className="e-upload__tile" style={{ backgroundImage: 'url(' + p + ')' }}><button className="e-upload__rm" aria-label="Remover foto" onClick={() => onRemove && onRemove(i)}><Icon name="x" size={12} /></button></span>)}
    {photos.length < max && <button type="button" className="e-upload__add" onClick={onAdd}><Icon name="camera" size={18} />Adicionar</button>}
  </div></div>;
}
