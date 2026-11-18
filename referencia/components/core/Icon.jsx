import React from 'react';
/** Ícone Lucide via <c-icon> (precisa de lucide UMD + assets/js/conecta-icons.js). */
export function Icon({ name, size = 16, stroke = 1.5, style, className, label }) {
  return React.createElement('c-icon', { name, size: String(size), stroke: String(stroke), style, class: className, role: label ? 'img' : undefined, 'aria-label': label, 'aria-hidden': label ? undefined : 'true' });
}
