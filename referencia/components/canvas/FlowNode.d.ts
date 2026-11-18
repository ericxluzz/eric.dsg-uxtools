export interface FlowNodeProps { n: number; title: string; prazo?: string; setor?: string; tags?: string[]; selected?: boolean; onClick?: () => void; children?: React.ReactNode; }
export declare function FlowNode(props: FlowNodeProps): JSX.Element;
export declare function FlowEdge(props: { label?: string }): JSX.Element;
export declare function AddStep(props: { onClick?: () => void }): JSX.Element;
