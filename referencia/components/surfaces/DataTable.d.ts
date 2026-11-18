/** @startingPoint section="Superfícies" subtitle="Tabela em grid, sem quebra de linha" viewport="700x260" */
export interface DataTableColumn { key: string; label: string; /** CSS grid track, ex. "120px" ou "minmax(0,2fr)" */ width?: string; render?: (row: any) => React.ReactNode; }
export interface DataTableProps { columns: DataTableColumn[]; rows: any[]; onRow?: (row: any) => void; }
export declare function DataTable(props: DataTableProps): JSX.Element;
