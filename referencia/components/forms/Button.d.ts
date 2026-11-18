/** @startingPoint section="Formulários" subtitle="Primário, secundário, suave, sucesso, perigo" viewport="700x220" */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'success' | 'danger' | 'danger-ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** ícone Lucide à esquerda */ icon?: string; /** ícone Lucide à direita (ex. chevron-right) */ iconRight?: string;
  block?: boolean; children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
