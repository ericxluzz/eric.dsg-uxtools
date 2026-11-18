export interface QueueRowProps { kicker?: string; title: string; sub?: string; badges?: React.ReactNode; action?: React.ReactNode; /** barra lateral 3px de urgência */ bar?: 'ok' | 'warn' | 'info' | 'bad'; onClick?: () => void; }
export declare function QueueRow(props: QueueRowProps): JSX.Element;
