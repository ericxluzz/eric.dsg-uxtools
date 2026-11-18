export type ActionItem = { label: string; icon: string; danger?: boolean; onClick?: () => void } | '-';
export interface ActionMenuProps { items: ActionItem[]; label?: string; }
export declare function ActionMenu(props: ActionMenuProps): JSX.Element;
