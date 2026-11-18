/** @startingPoint section="Modelos" subtitle="Canvas de diagrama com nós, ligações e zoom" viewport="700x420" */
export interface FlowCanvasProps { toolbar?: React.ReactNode; zoom?: number; onZoomIn?: () => void; onZoomOut?: () => void; onFit?: () => void; height?: number; children?: React.ReactNode; }
export declare function FlowCanvas(props: FlowCanvasProps): JSX.Element;
