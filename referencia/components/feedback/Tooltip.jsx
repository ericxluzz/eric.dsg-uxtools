import React from 'react';
export function Tooltip({ text, children }) { const id = React.useId(); return <span className="e-has-tip" aria-describedby={id}>{children}<span role="tooltip" id={id} className="e-tooltip">{text}</span></span>; }
