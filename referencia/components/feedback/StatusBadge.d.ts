/** @startingPoint section="Feedback" subtitle="Selos por status: verde, laranja, azul, vermelho, cinza" viewport="700x160" */
export interface StatusBadgeProps { /** ok=concluído · warn=pendente · info=ação/andamento · bad=atraso/erro · neu=neutro */ tone?: 'ok' | 'warn' | 'info' | 'bad' | 'neu'; icon?: string; dot?: boolean; children: React.ReactNode; }
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
