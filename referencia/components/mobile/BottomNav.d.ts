export interface BottomNavProps { items: { value: string; label: string; icon: string }[]; value?: string; onChange?: (v: string) => void; }
export declare function BottomNav(props: BottomNavProps): JSX.Element;
