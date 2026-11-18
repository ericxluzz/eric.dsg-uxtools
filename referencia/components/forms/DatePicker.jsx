import React from 'react';
import { Icon } from '../core/Icon.jsx';
const M = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const fmt = (d) => d ? String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear() : '';
export function DatePicker({ label, value, onChange, today = new Date() }) {
  const [open, setOpen] = React.useState(false); const [view, setView] = React.useState(value || today);
  const y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, i) => new Date(y, m, i - first + 1));
  const same = (a, b) => a && b && a.toDateString() === b.toDateString();
  return <div className="e-field e-date"><span className="e-field__label">{label}</span>
    <button type="button" className="e-select__btn" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="calendar" size={15} /><span className="e-select__val">{fmt(value) || 'dd/mm/aaaa'}</span></button>
    {open && <div className="e-cal" role="dialog" aria-label="Escolher data"><div className="e-cal__head"><button className="e-iconbtn e-iconbtn--sm" aria-label="Mês anterior" onClick={() => setView(new Date(y, m - 1, 1))}><Icon name="chevron-left" size={14} /></button>{M[m]} {y}<button className="e-iconbtn e-iconbtn--sm" aria-label="Próximo mês" onClick={() => setView(new Date(y, m + 1, 1))}><Icon name="chevron-right" size={14} /></button></div>
      <div className="e-cal__grid">{['D','S','T','Q','Q','S','S'].map((d, i) => <span key={i} className="e-cal__dow">{d}</span>)}{cells.map((d, i) => <button key={i} className={'e-cal__day' + (d.getMonth() !== m ? ' e-cal__day--out' : '') + (same(d, today) ? ' e-cal__day--today' : '')} aria-selected={same(d, value)} onClick={() => { onChange && onChange(d); setOpen(false); }}>{d.getDate()}</button>)}</div></div>}
  </div>;
}
