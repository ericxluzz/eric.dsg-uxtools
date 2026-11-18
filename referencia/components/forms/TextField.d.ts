/** @startingPoint section="Formulários" subtitle="Campo com rótulo, ajuda e erro" viewport="700x260" */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; icon?: string; required?: boolean; help?: string; error?: string; size?: 'md' | 'lg'; multiline?: boolean; }
export declare function TextField(props: TextFieldProps): JSX.Element;
