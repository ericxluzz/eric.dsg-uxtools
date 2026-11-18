export interface DrawerProps { open: boolean; title: string; children?: React.ReactNode; footer?: React.ReactNode; onClose?: () => void; }
export declare function Drawer(props: DrawerProps): JSX.Element;
