export interface CountProps {
  n: number | string;
  active?: boolean;
  alert?: boolean;
  label?: string;
}

/**
 * Faça: use `label` quando o número precisar de contexto para leitor de tela (ex. "3 solicitações").
 * Não faça: usar `active` e `alert` juntos — escolha um destaque por vez.
 */
export function Count({ n, active, alert, label }: CountProps) {
  return (
    <span
      className={"e-count" + (active ? " e-count--active" : alert ? " e-count--alert" : "")}
      aria-label={label}
    >
      {n}
    </span>
  );
}
