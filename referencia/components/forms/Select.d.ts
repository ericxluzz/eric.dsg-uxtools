export interface SelectOption { value: string; label: string; }
export interface SelectProps { label: string; value?: string; options: (SelectOption | string)[]; onChange?: (v: string) => void; placeholder?: string; }
export declare function Select(props: SelectProps): JSX.Element;
