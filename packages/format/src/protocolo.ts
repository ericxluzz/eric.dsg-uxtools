// ERIC · protocolo de solicitação. Ver referencia/guidelines/FORMATOS.md.

export interface FormatProtocoloOptions {
  sigla: string;
  ano: number;
  numero: number;
}

/** SIGLA-AAAA-NNNNNN (mono na UI) — ex. AMA-2026-000105. */
export function formatProtocolo({ sigla, ano, numero }: FormatProtocoloOptions): string {
  return `${sigla.toUpperCase()}-${ano}-${String(numero).padStart(6, "0")}`;
}
