import React from 'react';
export function Avatar({ src, name = '', size = 36 }) {
  const ini = name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();
  return <span className="e-avatar" style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }} aria-hidden={!!name}>{src ? <img src={src} alt="" /> : ini}</span>;
}
