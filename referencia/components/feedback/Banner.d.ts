export interface BannerProps { tone?: 'info' | 'warn' | 'bad'; children: React.ReactNode; action?: React.ReactNode; onClose?: () => void; }
export declare function Banner(props: BannerProps): JSX.Element;
