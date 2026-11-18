export interface PaginationProps { page: number; pages: number; total?: number; perPage?: number; onChange: (p: number) => void; }
export declare function Pagination(props: PaginationProps): JSX.Element;
