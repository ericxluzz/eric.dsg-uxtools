import React from 'react';
const COR = { triagem: 'var(--c-stage-triagem)', vistoria: 'var(--c-stage-vistoria)', execucao: 'var(--c-stage-execucao)', conclusao: 'var(--c-stage-conclusao)' };
export function StageBadge({ stage = 'triagem', children }) {
  return <span className="e-stage"><span className="e-stage__sq" style={{ background: COR[stage] }} />{children}</span>;
}
