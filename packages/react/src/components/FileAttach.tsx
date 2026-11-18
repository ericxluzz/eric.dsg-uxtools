import type { ChangeEvent } from "react";
import { Icon } from "./Icon";

export interface AttachedFile {
  name: string;
  size?: string;
  progress?: number;
  error?: string;
}

export interface FileAttachProps {
  files?: AttachedFile[];
  accept?: string;
  onPick?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (i: number) => void;
}

/**
 * Faça: mostre a barra de progresso enquanto `progress < 100`; erro substitui o tamanho do arquivo.
 * Não faça: remover o arquivo da lista silenciosamente em erro — deixe o usuário decidir (botão remover).
 */
export function FileAttach({
  files = [],
  accept = "PDF, JPG ou PNG · até 10 MB",
  onPick,
  onRemove,
}: FileAttachProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label className="e-drop">
        <Icon name="upload" size={20} style={{ color: "var(--c-link)" }} />
        <span>
          <b style={{ color: "var(--c-link)" }}>Escolher arquivo</b> ou arraste aqui
        </span>
        <span style={{ fontSize: 11 }}>{accept}</span>
        <input type="file" hidden onChange={onPick} />
      </label>
      {files.map((f, i) => (
        <div key={i} className="e-file">
          <span className="e-file__icon">
            <Icon name={f.error ? "file-x" : "file-text"} size={16} />
          </span>
          <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="e-file__name">{f.name}</span>
            {f.progress != null && f.progress < 100 ? (
              <span className="e-bar">
                <span className="e-bar__fill" style={{ width: `${f.progress}%` }} />
              </span>
            ) : (
              <span className="e-file__meta" style={{ color: f.error ? "var(--c-bad-fg)" : undefined }}>
                {f.error || f.size}
              </span>
            )}
          </span>
          <button
            type="button"
            className="e-iconbtn e-iconbtn--sm e-iconbtn--danger"
            aria-label={`Remover ${f.name}`}
            onClick={() => onRemove?.(i)}
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
