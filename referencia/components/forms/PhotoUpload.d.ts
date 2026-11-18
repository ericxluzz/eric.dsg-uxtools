export interface PhotoUploadProps { photos?: string[]; max?: number; onAdd?: () => void; onRemove?: (i: number) => void; label?: string; }
export declare function PhotoUpload(props: PhotoUploadProps): JSX.Element;
