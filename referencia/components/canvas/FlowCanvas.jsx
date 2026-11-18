import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function FlowCanvas({ toolbar, zoom = 100, onZoomIn, onZoomOut, onFit, children, height = 520 }) {
  return <div className="e-canvas" style={{ height }} aria-label="Canvas do fluxo">
    <div style={{ position: 'sticky', top: 10, left: 10, zIndex: 3, height: 0, display: 'flex', justifyContent: 'space-between', padding: '0 10px', pointerEvents: 'none' }}>
      <div className="e-canvas__bar" role="toolbar" style={{ pointerEvents: 'auto', alignSelf: 'flex-start' }}>{toolbar}</div>
      <div className="e-canvas__bar" style={{ pointerEvents: 'auto', alignSelf: 'flex-start' }}><button className="e-iconbtn e-iconbtn--sm" aria-label="Diminuir zoom" onClick={onZoomOut}><Icon name="minus" size={14} /></button><span style={{ minWidth: 42, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 500 }}>{zoom}%</span><button className="e-iconbtn e-iconbtn--sm" aria-label="Aumentar zoom" onClick={onZoomIn}><Icon name="plus" size={14} /></button><button className="e-iconbtn e-iconbtn--sm" aria-label="Ajustar" onClick={onFit}><Icon name="scan" size={14} /></button></div>
    </div>
    <div style={{ padding: '64px 32px 32px', display: 'flex', alignItems: 'flex-start', width: 'max-content', minWidth: '100%', transform: 'scale(' + zoom / 100 + ')', transformOrigin: '0 0' }}>{children}</div>
  </div>;
}
