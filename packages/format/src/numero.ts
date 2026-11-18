// ERIC · formatos numéricos (pt-BR). Ver referencia/guidelines/FORMATOS.md.
const NBSP = " ";

/** 1.250 — ponto no milhar, sem casas decimais. */
export function formatNumero(n: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(n);
}

/** 94,5 — vírgula decimal. */
export function formatDecimal(n: number, casas = 1): string {
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(n);
}

/** 94% — sem espaço antes do símbolo. */
export function formatPorcentagem(n: number): string {
  return `${formatNumero(n)}%`;
}

/** R$ 1.250,00 */
export function formatMoeda(n: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(n)
    .replaceAll(NBSP, " ");
}
