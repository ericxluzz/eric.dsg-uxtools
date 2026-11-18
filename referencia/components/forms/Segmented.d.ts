export interface SegmentedOption { value: string; label: string; icon?: string; }
export interface SegmentedProps { options: SegmentedOption[]; value?: string; onChange?: (v: string) => void; label?: string; }
export declare function Segmented(props: SegmentedProps): JSX.Element;
