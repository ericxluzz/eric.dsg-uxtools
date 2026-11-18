/** @startingPoint section="Navegação" subtitle="Abas com ponto de status e contador" viewport="700x120" */
export interface TabItem { value: string; label: string; count?: number; /** cor do ponto, ex. var(--c-stage-vistoria) */ dot?: string; }
export interface TabsProps { tabs: TabItem[]; value?: string; onChange?: (v: string) => void; label?: string; }
export declare function Tabs(props: TabsProps): JSX.Element;
