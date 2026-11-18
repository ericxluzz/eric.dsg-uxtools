export interface SideNavItem { value: string; label: string; icon: string; count?: number; }
export interface SideNavProps { title?: string; items: SideNavItem[]; value?: string; onChange?: (v: string) => void; }
export declare function SideNav(props: SideNavProps): JSX.Element;
