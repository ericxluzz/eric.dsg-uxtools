/** @startingPoint section="Modelos" subtitle="Painel de avisos com não lidos" viewport="420x420" */
export interface NotificationItem { title: string; sub?: string; time: string; tone?: 'ok' | 'warn' | 'info' | 'bad'; icon?: string; unread?: boolean; }
export interface NotificationPanelProps { items: NotificationItem[]; onReadAll?: () => void; onItem?: (n: NotificationItem) => void; }
export declare function NotificationPanel(props: NotificationPanelProps): JSX.Element;
