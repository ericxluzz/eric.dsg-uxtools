/** @startingPoint section="Mobile" subtitle="Gaveta que sobe de baixo" viewport="390x420" */
export interface BottomSheetProps { open: boolean; title: string; children?: React.ReactNode; onClose?: () => void; }
export declare function BottomSheet(props: BottomSheetProps): JSX.Element;
