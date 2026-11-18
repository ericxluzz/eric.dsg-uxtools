// ERIC · textos compostos (pt-BR). Ver referencia/guidelines/FORMATOS.md.

export interface FormatEnderecoOptions {
  rua: string;
  numero: string | number;
  bairro?: string;
}

/** Rua, número · Bairro */
export function formatEndereco({ rua, numero, bairro }: FormatEnderecoOptions): string {
  const base = `${rua}, ${numero}`;
  return bairro ? `${base} · ${bairro}` : base;
}

/**
 * número + substantivo no plural certo — ex. `formatContagem(1, "frente", "frentes")` → "1 frente".
 * Aceita um singular irregular (`plural`) para os casos em que não é só acrescentar "s".
 */
export function formatContagem(n: number, singular: string, plural: string = `${singular}s`): string {
  return `${n} ${n === 1 ? singular : plural}`;
}
