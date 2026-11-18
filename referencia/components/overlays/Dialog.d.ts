export interface DialogProps { open: boolean; title: string; sub?: string; icon?: string; tone?: 'bad'; children?: React.ReactNode; footer?: React.ReactNode; onClose?: () => void; }
export declare function Dialog(props: DialogProps): JSX.Element;
