export interface AttachedFile { name: string; size?: string; progress?: number; error?: string; }
export interface FileAttachProps { files?: AttachedFile[]; accept?: string; onPick?: (e: any) => void; onRemove?: (i: number) => void; }
export declare function FileAttach(props: FileAttachProps): JSX.Element;
