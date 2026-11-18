export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon: string; /** obrigatório: nome acessível */ label: string; variant?: 'outline' | 'danger'; size?: 'sm' | 'md'; }
export declare function IconButton(props: IconButtonProps): JSX.Element;
