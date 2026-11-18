export interface ProgressSegmentsProps { total?: number; done?: number; /** on=andamento · ok=concluído · warn=falta informação */ state?: 'on' | 'ok' | 'warn'; label?: string; }
export declare function ProgressSegments(props: ProgressSegmentsProps): JSX.Element;
