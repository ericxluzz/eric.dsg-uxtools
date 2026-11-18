import React from 'react';
export function ChoiceChips({ options = [], value, onChange, multi, label }) {
  const on = (v) => multi ? (value || []).includes(v) : value === v;
  const tog = (v) => onChange && onChange(multi ? (on(v) ? value.filter((x) => x !== v) : [...(value || []), v]) : v);
  return <div className="e-chips" role={multi ? 'group' : 'radiogroup'} aria-label={label}>{options.map((o) => { const v = o.value ?? o; return <button key={v} type="button" className="e-chip" role={multi ? undefined : 'radio'} aria-checked={multi ? undefined : on(v)} aria-pressed={multi ? on(v) : undefined} onClick={() => tog(v)}>{o.label ?? o}</button>; })}</div>;
}
