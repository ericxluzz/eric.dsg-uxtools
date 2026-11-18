/** @startingPoint section="Gráficos" subtitle="Linha, ranking, empilhado, calor, funil, antes/depois" viewport="700x420" */
export interface ChartCardProps { title: string; sub?: string; /** frase lida pelo leitor de tela */ summary: string; table: { head: string[]; rows: (string | number)[][] }; source?: string; children: React.ReactNode; }
export declare function ChartCard(p: ChartCardProps): JSX.Element;
export declare function LineChart(p: { data: number[]; goal?: number; height?: number; labels?: string[]; color?: string; unit?: string }): JSX.Element;
export declare function Sparkline(p: { data: number[]; color?: string; w?: number; h?: number }): JSX.Element;
export declare function RankBars(p: { items: { l: string; v: number; hi?: 'good' | 'bad' }[]; max?: number; goal?: number; unit?: string }): JSX.Element;
export declare function StackedBars(p: { rows: { l: string; v: number[] }[]; series: { k: string; l: string; c: string; fg?: string }[] }): JSX.Element;
export declare function Heatmap(p: { rows: string[]; cols: string[]; values: number[][]; max?: number }): JSX.Element;
export declare function Funnel(p: { steps: { l: string; v: number }[] }): JSX.Element;
export declare function Dumbbell(p: { items: { l: string; a: number; b: number }[]; max?: number; unit?: string; from?: string; to?: string }): JSX.Element;
