import React from 'react';
export function BottomSheet({ open, title, children, onClose }) { if (!open) return null; return <><div className="e-scrim" onClick={onClose} /><div role="dialog" aria-modal="true" aria-label={title} className="e-m-sheet"><div className="e-m-sheet__handle" /><h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>{title}</h2>{children}</div></>; }
