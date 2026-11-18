export interface ChoiceChipsProps { options: ({ value: string; label: string } | string)[]; value?: string | string[]; onChange?: (v: any) => void; multi?: boolean; label?: string; }
export declare function ChoiceChips(props: ChoiceChipsProps): JSX.Element;
