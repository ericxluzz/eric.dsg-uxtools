export interface UserMenuItem { label: string; icon: string; onClick?: () => void; }
export interface UserMenuProps { name: string; role: string; photo?: string; items?: UserMenuItem[]; onSair?: () => void; }
export declare function UserMenu(props: UserMenuProps): JSX.Element;
