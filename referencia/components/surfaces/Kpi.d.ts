export interface KpiProps { label: string; value: React.ReactNode; delta?: string; tone?: 'ok' | 'bad' | 'warn'; }
export declare function Kpi(props: KpiProps): JSX.Element;
