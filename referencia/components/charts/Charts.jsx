import React from 'react';
/* ERIC · gráficos acessíveis. Cada gráfico: título que diz a conclusão, rótulo direto, role="img" + aria-label, e tabela "Ver dados". */
const S = { axis: { fontSize: 11, fill: 'var(--c-chart-axis)', fontFamily: 'inherit' } };
export function ChartCard({ title, sub, summary, table, children, source }) {
  const [tab, setTab] = React.useState(false);
  return <section className="e-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label={title}>
    <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><div style={{ minWidth: 0 }}><h3 style={{ margin: 0, fontSize: 15, lineHeight: '22px', fontWeight: 600, textWrap: 'pretty' }}>{title}</h3>{sub && <div style={{ fontSize: 12, color: 'var(--c-text-2)' }}>{sub}</div>}</div>
      <button className="e-btn e-btn--ghost e-btn--sm" aria-pressed={tab} onClick={() => setTab(!tab)}>{tab ? 'Ver gráfico' : 'Ver dados'}</button></header>
    {tab ? <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{table.head.map((h) => <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--c-text-3)', background: 'var(--c-surface-2)' }}>{h}</th>)}</tr></thead><tbody>{table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ padding: '6px 8px', borderTop: '1px solid var(--c-border)' }}>{c}</td>)}</tr>)}</tbody></table>
      : <div role="img" aria-label={summary}>{children}</div>}
    {source && <footer style={{ fontSize: 11, color: 'var(--c-text-2)' }}>{source}</footer>}
  </section>;
}
export function LineChart({ data = [], goal, height = 200, labels = [], color = 'var(--c-chart-1)', unit = '' }) {
  const W = 600, H = height, P = { l: 34, r: 56, t: 14, b: 24 }, max = Math.max(...data, goal || 0) * 1.15, iw = W - P.l - P.r, ih = H - P.t - P.b;
  const x = (i) => P.l + (i / (data.length - 1)) * iw, y = (v) => P.t + ih - (v / max) * ih;
  const line = data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
  const last = data[data.length - 1];
  return <svg viewBox={'0 0 ' + W + ' ' + H} width="100%" height={H} style={{ display: 'block', overflow: 'visible' }}>
    {[0, 0.5, 1].map((f) => <g key={f}><line x1={P.l} x2={W - P.r} y1={y(max * f / 1.15)} y2={y(max * f / 1.15)} style={{ stroke: 'var(--c-chart-grid)', strokeDasharray: f ? '3 4' : '0' }} /><text x={P.l - 6} y={y(max * f / 1.15) + 4} textAnchor="end" style={S.axis}>{Math.round(max * f / 1.15)}</text></g>)}
    <path d={line + ' L' + x(data.length - 1) + ' ' + (P.t + ih) + ' L' + P.l + ' ' + (P.t + ih) + ' Z'} style={{ fill: color, opacity: 0.1 }} />
    {goal != null && <g><line x1={P.l} x2={W - P.r} y1={y(goal)} y2={y(goal)} style={{ stroke: 'var(--c-chart-goal)', strokeWidth: 2, strokeDasharray: '6 4' }} /><text x={W - P.r + 6} y={y(goal) + 4} style={{ ...S.axis, fill: 'var(--c-chart-goal)', fontWeight: 600 }}>Meta {goal}</text></g>}
    <path d={line} style={{ fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinejoin: 'round', strokeLinecap: 'round' }} />
    <circle cx={x(data.length - 1)} cy={y(last)} r="5" style={{ fill: color, stroke: 'var(--c-surface)', strokeWidth: 2 }} />
    <text x={x(data.length - 1) + 9} y={y(last) - 8} style={{ fontSize: 13, fontWeight: 700, fill: 'var(--c-text)' }}>{last}{unit}</text>
    {labels.map((l, i) => l && <text key={i} x={x(i)} y={H - 4} textAnchor="middle" style={S.axis}>{l}</text>)}
  </svg>;
}
export function Sparkline({ data = [], color = 'var(--c-chart-1)', w = 120, h = 32 }) {
  const max = Math.max(...data), min = Math.min(...data), x = (i) => 2 + (i / (data.length - 1)) * (w - 4), y = (v) => 3 + (h - 6) * (1 - (v - min) / ((max - min) || 1));
  return <svg viewBox={'0 0 ' + w + ' ' + h} width={w} height={h} aria-hidden="true"><path d={data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ')} style={{ fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} /><circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="3" style={{ fill: color }} /></svg>;
}
export function RankBars({ items = [], max, goal, unit = '', best = 'low' }) {
  const m = max || Math.max(...items.map((i) => i.v)) * 1.1;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>{items.map((it) => { const hi = it.hi; return <div key={it.l} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr) 56px', gap: 10, alignItems: 'center', fontSize: 12 }}><span className="e-nowrap" style={{ fontWeight: hi ? 600 : 500 }}>{it.l}</span><span style={{ position: 'relative', height: 14 }}><span style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'var(--c-surface-2)' }} /><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: (it.v / m * 100) + '%', borderRadius: 4, background: hi ? (hi === 'bad' ? 'var(--c-chart-late)' : 'var(--c-chart-1)') : 'var(--c-chart-muted)' }} />{goal != null && <span style={{ position: 'absolute', top: -3, bottom: -3, left: (goal / m * 100) + '%', width: 2, background: 'var(--c-chart-goal)' }} />}</span><b style={{ fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap' }}>{String(it.v).replace('.', ',')}{unit}</b></div>; })}</div>;
}
export function StackedBars({ rows = [], series = [] }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: 12 }}>{series.map((s) => <span key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: s.c }} />{s.l}</span>)}</div>
    {rows.map((r) => <div key={r.l} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)', gap: 10, alignItems: 'center', fontSize: 12 }}><span className="e-nowrap" style={{ fontWeight: 500 }}>{r.l}</span><span style={{ display: 'flex', height: 22, gap: 2, borderRadius: 6, overflow: 'hidden' }}>{series.map((s, i) => r.v[i] > 0 && <span key={s.k} title={s.l + ': ' + r.v[i] + '%'} style={{ width: r.v[i] + '%', background: s.c, color: s.fg || '#fff', fontSize: 11, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{r.v[i] >= 10 ? r.v[i] + '%' : ''}</span>)}</span></div>)}</div>;
}
export function Heatmap({ rows = [], cols = [], values = [], max }) {
  const m = max || Math.max(...values.flat()), step = (v) => Math.min(5, Math.max(1, Math.ceil(v / m * 5)));
  return <div style={{ display: 'grid', gridTemplateColumns: '44px repeat(' + cols.length + ', minmax(0,1fr))', gap: 3, fontSize: 11 }}><span />{cols.map((c) => <span key={c} style={{ textAlign: 'center', color: 'var(--c-chart-axis)' }}>{c}</span>)}{rows.map((r, i) => <React.Fragment key={r}><span style={{ color: 'var(--c-chart-axis)', alignSelf: 'center' }}>{r}</span>{values[i].map((v, j) => { const s = step(v); return <span key={j} title={r + ' ' + cols[j] + ': ' + v} style={{ height: 30, borderRadius: 5, background: 'var(--c-seq-' + s + ')', color: s >= 4 ? '#fff' : 'var(--c-text)', display: 'grid', placeItems: 'center', fontWeight: 600 }}>{v}</span>; })}</React.Fragment>)}</div>;
}
export function Funnel({ steps = [] }) {
  const m = steps[0]?.v || 1;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{steps.map((s, i) => <div key={s.l} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr) 92px', gap: 10, alignItems: 'center', fontSize: 12 }}><span className="e-nowrap" style={{ fontWeight: 500 }}>{s.l}</span><span style={{ height: 26, width: (s.v / m * 100) + '%', borderRadius: 6, background: 'var(--c-chart-1)', opacity: 1 - i * 0.15, color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>{s.v}</span><span style={{ color: 'var(--c-text-2)', whiteSpace: 'nowrap' }}>{i ? Math.round(s.v / steps[i - 1].v * 100) + '% seguem' : 'início'}</span></div>)}</div>;
}
export function Dumbbell({ items = [], max, unit = '', from = 'Antes', to = 'Agora' }) {
  const m = max || Math.max(...items.flatMap((i) => [i.a, i.b])) * 1.1, p = (v) => (v / m * 100) + '%';
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><div style={{ display: 'flex', gap: 14, fontSize: 12 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 99, border: '2px solid var(--c-chart-7)' }} />{from}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--c-chart-1)' }} />{to}</span></div>
    {items.map((it) => { const lo = Math.min(it.a, it.b), hi = Math.max(it.a, it.b), better = it.b < it.a; return <div key={it.l} style={{ display: 'grid', gridTemplateColumns: '120px minmax(0,1fr) 70px', gap: 10, alignItems: 'center', fontSize: 12 }}><span className="e-nowrap" style={{ fontWeight: 500 }}>{it.l}</span><span style={{ position: 'relative', height: 16 }}><span style={{ position: 'absolute', top: 7, height: 2, left: p(lo), width: ((hi - lo) / m * 100) + '%', background: better ? 'var(--c-chart-2)' : 'var(--c-chart-late)' }} /><span style={{ position: 'absolute', top: 2, left: 'calc(' + p(it.a) + ' - 6px)', width: 12, height: 12, borderRadius: 99, background: 'var(--c-surface)', border: '2px solid var(--c-chart-7)' }} /><span style={{ position: 'absolute', top: 2, left: 'calc(' + p(it.b) + ' - 6px)', width: 12, height: 12, borderRadius: 99, background: 'var(--c-chart-1)' }} /></span><b style={{ fontWeight: 600, whiteSpace: 'nowrap', color: better ? 'var(--c-ok-fg)' : 'var(--c-bad-fg)' }}>{better ? '↓' : '↑'} {String(Math.abs(it.b - it.a).toFixed(1)).replace('.', ',')}{unit}</b></div>; })}</div>;
}
