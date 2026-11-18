export interface CalloutProps { tone?: 'info' | 'warn' | 'ok' | 'bad'; /** sem raio/borda lateral: faixa dentro de card */ flush?: boolean; icon?: string; children: React.ReactNode; }
export declare function Callout(props: CalloutProps): JSX.Element;
